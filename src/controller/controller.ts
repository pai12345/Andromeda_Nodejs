import { RequestHandler } from "express";
import { oServe } from "../dev/UtilityClass";
import path from "path";

/**
 * Page - Home
 * @description Generate Home Page
 * @param res Response Body
 * @param next To Next Middleware function
 */
export const Request_HomePage: RequestHandler = async (_req, res, next) => {
  try {
    const path_Templates = path.resolve("./dist/index.html");
    res.status(oServe.Status.Success).sendFile(path_Templates);
  } catch (e) {
    next(e);
    res.status(oServe.Status.ServerError).send(e.message);
  }
};

/**
 * Page - 404 Not Found
 * @description Generate 404 Not Found Page
 * @param res Response Body
 * @param next To Next Middleware function
 */
export const Request_404: RequestHandler = async (_req, res, next) => {
  try {
    const path_Templates = path.resolve("./dist/404NotFound.html");
    res.status(oServe.Status.NotFound).sendFile(path_Templates);
  } catch (e) {
    next(e);
    res.status(oServe.Status.Unavailable).send(e.message);
  }
};
