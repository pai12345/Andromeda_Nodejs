import express from "express";
import oServe_Utility from "../dev/UtilityClass";

const app = express();

/**
 * Middleware - Preflight Check
 * @description
 * Middleware for Preflight request/response
 */
export const router_preset = app.use(async (req, res, next) => {
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

export default router_preset;
