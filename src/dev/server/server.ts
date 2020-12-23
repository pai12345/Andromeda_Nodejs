import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import session_middleware from "../../middleware/session";
import auth_middleware from "../../middleware/auth";
import grpahql_middleware from "../../middleware/graphql";
import route_middleware from "../../middleware/route";
import express, { json } from "express";
import { Proto_GraphQLServer_Interface } from "../../utility/Interface";
import Proto_GraphQLServer from "../../templates/class/server/Proto_server";

class GraphQLServer
  extends Proto_GraphQLServer
  implements Proto_GraphQLServer_Interface {
  constructor() {
    super();
  }
  /**
   * Function - Add Configuration
   * @description
   * Function having configuration details for express app
   */
  add_configuration() {
    const app = express();
    const cors_option = {
      origin: "http://localhost:3000",
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
    return app;
  }
}

/**
 * Instance - GraphQLServer
 * @description
 * Instance of GraphQLServer Class
 */
const graphQLServer = new GraphQLServer();
export default graphQLServer;
