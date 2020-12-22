import session from "express-session";
import MongoDB_ConnectSession from "connect-mongodb-session";
import oServe_Utility from "../dev/utilityClass";
import express from "express";
import generateEnv from "../config/config";
import { Status } from "../utility/Interface";

const app = express();
const MONGODB_URI = generateEnv().MongoDB.MONGODB_URI;
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

/**
 * Middleware - GrpahQL Http
 * @description
 * Middleware defining GraphQL Http and configurations
 */
const session_middleware = app.use(
  session({
    secret: oServe_Utility.GenerateSecretKey(),
    resave: false,
    saveUninitialized: false,
    store: session_store,
    cookie: {
      maxAge: 1800000,
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

session_store.on("error", (error) => {
  return error;
});

export default session_middleware;
