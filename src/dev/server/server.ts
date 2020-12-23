import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import session_middleware from "../../middleware/session";
import auth_middleware from "../../middleware/auth";
import grpahql_middleware from "../../middleware/graphql";
import route_middleware from "../../middleware/route";
import express, { json, Request, Response } from "express";
import { Proto_GraphQLServer_Interface } from "../../utility/Interface";
import Proto_GraphQLServer from "../../templates/class/server/Proto_server";
import oServe_Utility from "../../dev/helper/helper";

/**
 * Class - GraphQLServer
 * @description
 * Class having implementation details for GraphQL server
 */
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

  /**
   * Function - Check Header Tokens
   * @param req Express Request Object
   * @param res Express Response Object
   * @description Function to Check Header Tokens
   */
  check_header_tokens(req: Request, res: Response) {
    try {
      const headers = req.headers;
      const jwt = oServe_Utility.NullishCoalesce(headers["x-auth-token"]);
      const csrf = oServe_Utility.NullishCoalesce(headers["x-csrf-token"]);

      if (jwt === false) {
        //set JWT Token
        res.header("x-auth-token", oServe_Utility.GenerateJWT().token);
      }
      if (csrf === false) {
        //set CSRF Token
        res.header("x-csrf-token", oServe_Utility.GenerateCSRFToken().token);
      }
      return { req: req, res: res };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Function - Propagate Headers
   * @param req Express Request Object
   * @param res Express Response Object
   * @description Function to Propagate Headers
   */
  propagate_headers(req: Request, res: Response) {
    try {
      let i;
      const headers = req.headers;
      const validate_headers = [
        "x-request-id",
        "x-b3-traceid",
        "x-b3-spanid",
        "x-b3-parentspanid",
        "x-b3-sampled",
        "x-b3-flags",
        "b3",
        "x-ot-span-context",
        "x-cloud-trace-context",
        "traceparent",
        "grpc-trace-bin",
      ];

      for (i in headers) {
        if (i in validate_headers) {
          res.header(i, headers[i]);
        }
      }

      return { req: req, res: res };
    } catch (error) {
      throw new Error(error);
    }
  }
}

/**
 * Instance - GraphQLServer
 * @description
 * Instance of GraphQLServer Class
 */
const graphQLServer = new GraphQLServer();
export default graphQLServer;
