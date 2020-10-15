import compression from "compression";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import oServe_Utility from "./dev/UtilityClass";
import session from "express-session";
import MongoDB_ConnectSession from "connect-mongodb-session";
import route_middleware from "./middleware/route";
import grpahql_middleware from "./middleware/graphql";
import generateEnv from "./config/config";
import { Status } from "./utility/Interface";

const PORT = generateEnv().PORT;
const MONGODB_URI = generateEnv().MongoDB.MONGODB_URI;
const app = express();
const MongoDB_SessionStore = MongoDB_ConnectSession(session);
const session_store = new MongoDB_SessionStore(
  {
    uri: `${MONGODB_URI}`,
    collection: "Session",
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  (error) => {
    if (error) {
      console.log(`${Status.MongoDB_session_error}:${error}`);
    }
  }
);

session_store.on("error", (error) => {
  console.log(`${Status.MongoDB_session_error}:${error}`);
  return error;
});

app.set("trust proxy", 1);
app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());

app.use(
  session({
    secret: oServe_Utility.GenerateSecretKey(),
    resave: false,
    saveUninitialized: false,
    store: session_store,
    cookie: {
      maxAge: 900,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(grpahql_middleware);
app.use(route_middleware);

const server = app.listen(PORT, () => {
  console.log(`${Status.ListeningonPort}: ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log(Status.Closing_http_server);
  server.close(() => {
    console.log(Status.Http_server_closed);
    process.exit(0);
  });
  process.exit(0);
});
