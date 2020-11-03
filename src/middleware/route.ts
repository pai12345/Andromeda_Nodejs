import { RequestHandler } from "express";
import { Status } from "../utility/Interface";

/**
 * Middleware - Route Validation
 * @description
 * Middleware to validate routes
 */
const route_middleware: RequestHandler = async (_req, res) => {
  try {
    res.status(Status.NotFound).send(Status.PageNotFoundTitlte);
  } catch (error) {
    res.status(error.esponse.status).send(error);
  }
};

export default route_middleware;
