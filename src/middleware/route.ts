import express from "express";
import { Status } from "../utility/Interface";

const app = express();

/**
 * Middleware - Route Validation
 * @description
 * Middleware to validate routes
 */
export const route_middleware = app.use(async (_req, res, next) => {
  try {
    res.status(Status.NotFound).send(Status.PageNotFoundTitlte);
    next();
  } catch (error) {
    res.status(error.esponse.status).send(error);
    next();
  }
});

export default route_middleware;
