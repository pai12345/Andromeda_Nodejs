import { RequestHandler } from "express";
import oServe_Utility from "../../../../dev/UtilityClass";
import path from "path";

/**
 * Page - Home
 * @description Generate Home Page
 * @param res Response Body
 * @param next To Next Middleware function
 */
const Request_HomePage: RequestHandler = async (_req, res, next) => {
  try {
    const path_Templates = path.resolve("./dist/index.html");
    res.status(oServe_Utility.Status.Success).sendFile(path_Templates);
  } catch (e) {
    next(e);
    res.status(oServe_Utility.Status.ServerError).send(e.message);
  }
};

/**
 * Page - 404 Not Found
 * @description Generate 404 Not Found Page
 * @param res Response Body
 * @param next To Next Middleware function
 */
const Request_404: RequestHandler = async (_req, res, next) => {
  try {
    const path_Templates = path.resolve("./dist/404NotFound.html");
    res.status(oServe_Utility.Status.NotFound).sendFile(path_Templates);
  } catch (e) {
    next(e);
    res.status(oServe_Utility.Status.Unavailable).send(e.message);
  }
};

/**
 * Function - Generate controller
 * @description
 * Function to generate controller function
 * */
const generateController = () => {
  return {
    Request_HomePage: Request_HomePage,
    Request_404: Request_404,
  };
};

export default generateController;
