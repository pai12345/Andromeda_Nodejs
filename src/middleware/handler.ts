// import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { RequestHandler, NextFunction } from "express";
/**
 * Middleware - Generate Resolver Functions
 * @description
 * Middleware for Generating Resolver Functions
 */
const handler_middleware = async (handler: any) => {
  return async (args: any, req: RequestHandler, next: NextFunction) => {
    try {
      await handler(args, req, next);
    } catch (ex) {
      next(ex);
    }
  };
};

export default handler_middleware;
