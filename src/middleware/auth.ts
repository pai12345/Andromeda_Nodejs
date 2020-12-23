import { RequestHandler } from "express";
import graphQLServer from "../dev/server/server";

/**
 * Middleware - Preflight Check
 * @description
 * Middleware for request/response Preflight
 */

const auth_middleware: RequestHandler = async (req, res, next) => {
  try {
    //Check Header Tokens for JWT and CSRF
    graphQLServer.check_header_tokens(req, res);

    //Check Header Tokens for Istio
    graphQLServer.propagate_headers(req, res);

    return next();
  } catch (error) {
    res.status(error.esponse.status).send(error);
    next();
  }
};

export default auth_middleware;
