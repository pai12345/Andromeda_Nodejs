import generateEnv from "./config/config";
import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import session_middleware from "./middleware/session";
import auth_middleware from "./middleware/auth";
import grpahql_middleware from "./middleware/graphql";
import route_middleware from "./middleware/route";
import { Status } from "./utility/Interface";

const PORT = generateEnv().PORT;
const app = express();
const cors_option = {
  origin: ["http://localhost:3000"],
  exposedHeaders: ["x-auth-token", "x-csrf-token"],
  credentials: true,
};

//Set to app
app.set("trust proxy", 1);

//Std Middelwares
app.use(json());
app.use(cors(cors_option));
app.use(helmet());
app.use(compression());

//Custom Middelwares
app.use(session_middleware);
app.use(auth_middleware);
app.use(grpahql_middleware);
app.use(route_middleware);

//Server Listener
const server = app.listen(PORT, () => {
  console.log(`${Status.ListeningonPort}: ${PORT}`);
});

//Server graceful exit
process.on("SIGTERM", () => {
  console.log(Status.Closing_http_server);
  server.close(() => {
    console.log(Status.Http_server_closed);
    process.exit(0);
  });
  process.exit(0);
});
