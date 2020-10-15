import express, { json } from "express";
import session from "express-session";
import MongoDB_ConnectSession from "connect-mongodb-session";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import generateEnv from "./config/config";
import auth_middleware from "./middleware/auth";
import grpahql_middleware from "./middleware/graphql";
import route_middleware from "./middleware/route";
import { Status } from "./utility/Interface";
import oServe_Utility from "./dev/UtilityClass";

const PORT = generateEnv().PORT;
const MONGODB_URI = generateEnv().MongoDB.MONGODB_URI;
const app = express();
const cors_option = {
  origin: "*",
  exposedHeaders: ["x-auth-token", "x-csrf-token"],
};
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
app.use(cors(cors_option));
app.use(helmet());
app.use(compression());

app.use(
  session({
    secret: oServe_Utility.GenerateSecretKey(),
    resave: false,
    saveUninitialized: false,
    store: session_store,
    cookie: {
      maxAge: 180000,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(auth_middleware);
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
