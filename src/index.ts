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
      console.log(`Mongo session error:${error}`);
    }
  }
);

session_store.on("error", (error) => {
  console.log(`Mongo session_store error:${error}`);
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
  console.log(`${oServe_Utility.Status.ListeningonPort}: ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
  process.exit(0);
});
