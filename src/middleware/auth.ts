import oServe_Utility from "../dev/helper/helper";
import { RequestHandler } from "express";

/**
 * Middleware - Preflight Check
 * @description
 * Middleware for request/response Preflight
 */

const auth_middleware: RequestHandler = async (req, res, next) => {
  try {
    console.log(`Request:${req}`);
    res.header("x-auth-token", oServe_Utility.GenerateJWT().token);
    res.header("x-csrf-token", oServe_Utility.GenerateCSRFToken().token);
    console.log(`Result:${res}`);
    return next();
  } catch (error) {
    res.status(error.esponse.status).send(error);
    next();
  }
};

export default auth_middleware;
