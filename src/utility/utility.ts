//=============================Enum================================//
/**
 * Enumeration for API Status
 * @description
 * Enumeration having API Status details
 */
export enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
  Unavailable = 503,
  BADREQUEST = 400,
  SuccessMessage = "Success",
  ErrorMessage = "Error",
  WebServerTitle = "Web Server",
  WebServerBody = "Microservice Web Server",
  PageNotFoundTitlte = "Service Not Found",
  PageNotFoundBody = `404 - Service Not Found`,
  ListeningonPort = "Listening on Port",
}

//============Utility=============//
/**
 * Enumeration for Utility
 * @description
 * Enumeration having details for Utility
 */
export enum Util_enum {
  NotResponding = "Server did not response with any data",
}
//===============Interface===============//
/**
 * Interface - Authentication
 * @description
 * Interface for User Authentication
 */
export interface User_Authentication {
  length: number;
}
