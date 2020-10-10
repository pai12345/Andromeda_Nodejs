import express from "express";
const app = express();

/**
 * Middleware - Route Validation
 * @description
 * Middleware to validate routes
 */
const route_validate = app.use(async (_req, res, next) => {
  try {
    res.status(404).send("Service Not Found");
    next();
  } catch (error) {
    res.status(error.esponse.status).send(error);
    next();
  }
});

export default route_validate;
