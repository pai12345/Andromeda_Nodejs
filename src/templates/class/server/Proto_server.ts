import { Request, Response, Express } from "express";
import { Proto_GraphQLServer_Interface } from "../../../utility/Interface";

/**
 * Template - GraphQLServer Prototype
 * @description
 * Base Template for GraphQLServer Prototype
 */
abstract class Proto_GraphQLServer implements Proto_GraphQLServer_Interface {
  abstract add_configuration(): Express;
  abstract check_header_tokens(
    req: Request,
    res: Response
  ): {
    req: Request;
    res: Response;
  };
  abstract propagate_headers(
    req: Request,
    res: Response
  ): {
    req: Request;
    res: Response;
  };
}

export default Proto_GraphQLServer;
