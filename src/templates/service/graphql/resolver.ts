import { Login_Resolver_interface } from "../../../utility/Interface";
import Login_Func from "./Functions/Login";
import { RequestHandler } from "express";

export const resolvers = {
  Login: async (args: Login_Resolver_interface, req: RequestHandler) => {
    try {
      const Authenticate = await Login_Func(args, req);
      return Authenticate;
    } catch (error) {
      return error;
    }
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
