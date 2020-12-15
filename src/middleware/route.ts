import { RequestHandler } from "express";
import { Status } from "../utility/Interface";

/**
 * Middleware - Route Validation
 * @description
 * Middleware to validate routes
 */
const route_middleware: RequestHandler = async (req, res) => {
  try {
    let status: number;
    let message: string;

    if (req.originalUrl === "/") {
      status = Status.Success;
      message = Status.WelcomeMessage;
    } else {
      status = Status.NotFound;
      message = Status.PageNotFoundTitlte;
    }
    res.status(status).send(message);
  } catch (error) {
    res.status(error.esponse.status).send(error);
  }
};

export default route_middleware;
