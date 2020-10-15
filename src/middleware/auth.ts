import express from "express";
import oServe_Utility from "../dev/UtilityClass";

const app = express();

/**
 * Middleware - Preflight Check
 * @description
 * Middleware for request/response Preflight
 */
export const auth_middleware = app.use(async (req, res, next) => {
  try {
    console.log(req);
    res.header("x-auth-token", oServe_Utility.GenerateJWT().token);
    res.header("x-csrf-token", oServe_Utility.GenerateCSRFToken().token);
    console.log(res);
    return next();
  } catch (error) {
    res.status(error.esponse.status).send(error);
    next();
  }
});

export default auth_middleware;
