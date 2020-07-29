import { RequestHandler } from "express";
import { oServe_Utility } from "../dev/UtilityClass";
// import { client } from "../utility/connection";
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
export const Request_404: RequestHandler = async (_req, res, next) => {
  try {
    const path_Templates = path.resolve("./dist/404NotFound.html");
    res.status(oServe_Utility.Status.NotFound).sendFile(path_Templates);
  } catch (e) {
    next(e);
    res.status(oServe_Utility.Status.Unavailable).send(e.message);
  }
};

// /**
//  * API - To Authenticate User
//  * @description Authenticate User
//  * @param res Response Body
//  * @param next To Next Middleware function
//  */
// export const Request_AuthenticateUser: RequestHandler = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { username, password } = req.body;
//     const text = oServe.Query_GetCustomer(username, password);
//     const query = await client.query(text);
//     const Authentication = oServe.CheckUser_Authentication(query.rows);
//     res.status(oServe.Status.Success).send(Authentication);
//   } catch (e) {
//     next(e);
//     res.status(oServe.Status.ServerError).send(e.message);
//   }
// };
