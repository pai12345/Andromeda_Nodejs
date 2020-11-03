import { Login_Resolver_interface } from "../../../utility/Interface";
import Login_Func from "./Functions/Login";
import { RequestHandler } from "express";

/**
 * Function - Resolver function
 * @description
 * Function having details for Resolver function.
 */
const resolvers = {
  /**
   * Function - Login
   * @description
   * Function having details for Login function.
   * @param args: arguments for Login Function
   * @param req: request handler function for Login
   * @return Customer Details
   */
  Login: async (args: Login_Resolver_interface, req: RequestHandler) => {
    const Authenticate = await Login_Func(args, req);
    return Authenticate;
  },

  Logout: async (_args: any, req: any) => {
    try {
      req.session.destroy((err: any) => {
        if (err) {
          return `Session Deletion Error: ${err}`;
        }
        console.log("User sesssion deleted");
        return "User sesssion deleted";
      });
      return { status: true };
    } catch (error) {
      return error;
    }
  },
};

export default resolvers;
