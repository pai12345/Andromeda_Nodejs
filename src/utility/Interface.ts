import mongoose from "mongoose";
import { Express, Request, Response } from "express";
//=============================Enum================================//
/**
 * Enumeration for API Status
 * @description
 * Enumeration having details for API Status
 */
export enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
  Unavailable = 503,
  BADREQUEST = 400,
  BADREQUESTMessage = "Bad Request",
  ServerErrorMessage = "Server Error",
  SuccessMessage = "Success",
  ErrorMessage = "Error",
  WebServerTitle = "Web Server",
  WebServerBody = "Microservice Web Server",
  PageNotFoundTitlte = "Service Not Found",
  PageNotFoundBody = `404 - Service Not Found`,
  ListeningonPort = "Listening on Port",
  NotResponding = "Server did not response with any valid data",
  MongoDB_session_error = "Mongo session error",
  Closing_http_server = "Closing http server",
  Http_server_closed = "Http server closed",
  WelcomeMessage = "Andromeda GraphQL Server",
}

/**
 * Enumeration for MongoDB Schema
 * @description
 * Enumeration having details for MongoDB Schema
 */
export enum MongoSchema_Enum {
  Customer = "Customer",
}

/**
 * Enumeration for SQL Queries
 * @description
 * Enumeration having details for SQL Queries
 */
export enum SQLQueryGenerator {
  GetCustomer_withFilter = `SELECT (public.customers_getcustomer_function($1,$2)).*`,
}

//========EndPoint=========//
/**
 * Enumeration for API EndPoint
 * @description
 * Enumeration having details for API EndPoint
 */
export enum URL_enum {
  GraphQLEndpoint = "/api/Andromeda",
}

//================Error================//
/**
 * Enumeration for Error Check API Status
 * @description
 * Enumeration having details for Error Check API
 */
export enum Error_Customer_enum {
  Customer_UsernameEmpty = "Username cannot be empty",
  Customer_UsernameInvalid = "Enter valid username",
  Customer_PasswordInvalid = "Enter valid password",
  Customer_InvalidEmailAddress = "Invalid Email Address",
  Customer_Valid = "Valid",
  Customer_Exist = "Valid Customer",
  Customer_NotExist = "Customer does not Exist",
  Customer_Email = "Email",
  Customer_Empty = "Empty",
  Customer_Length = "Length",
  Customer_PasswordEmpty = "Password cannot be empty",
  Customer_UnkowntypeforValidation = "Unkown type for Validation",
  Customer_PasswordLength = "Password should be more than 4 characters of length",
}
//==============================Interface===================================//

//=============GetCustomer============//
/**
 * Interface - Proto_Customer
 * @description
 * Interface for User Authentication
 */
export interface Proto_Customer_interface {
  Validate_GetCustomerDetails(
    data: Customer_GetCustomerDetails_interface
  ): Customer_GetCustomerDetails_interface;
}

/**
 * Interface - Customer Validation
 * @description
 * Interface for validating customer
 */
export interface Customer_GetCustomerDetails_interface {
  username: string;
  password: string;
}

/**
 * Interface - Resolver Login
 * @description
 * Interface for Login Resolver
 */
export interface Login_Resolver_interface {
  input: { username: string; password: string };
}

//================Utility===============//

/**
 * Interface - GenerateMessage_graphql input
 * @description
 * Interface for GenerateMessage_graphql input
 */
export interface GenerateMessage_graphql_input_interface {
  message: string;
}

/**
 * Interface - GenerateMessage_graphql response
 * @description
 * Interface for GenerateMessage_graphql response
 */
export interface GenerateMessage_graphql_response_interface {
  message: string;
  statusCode: number;
  statusMessage: string;
}

/**
 * Interface - Proto_Utility
 * @description
 * Interface for Proto_Utility
 */
export interface Proto_Utility_interface {
  Validate_Data(data: string, type: string): boolean | string;
  GenerateMessage_graphql(
    data: GenerateMessage_graphql_input_interface
  ): GenerateMessage_graphql_response_interface;
}

/**
 * Interface - GenerateCSRFToken Response
 * @description
 * Interface for GenerateCSRFToken Response
 */
export interface GenerateCSRFToken_Response_Interface {
  token: string;
  secret: string;
}

/**
 * Interface - GenerateJWT Response
 * @description
 * Interface for GeneratGenerateJWTeCSRFToken Response
 */
export interface GenerateJWT_Response_Interface {
  token: string;
  secret: number;
}

/**
 * Interface - ResultObj Response
 * @description
 * Interface for ResultObj Response
 */
export interface ResultObj_Response_Interface {
  status: number;
  message: string;
  data: any;
}

/**
 * Interface - Connect_DB Response
 * @description
 * Interface for Connect_DB Response
 */
export interface Connect_DB_Response_Interface {
  code: Status;
  message: Status | string;
}

/**
 * Interface - Proto_MongoDB Class
 * @description
 * Interface for Proto_MongoDB Class
 */
export interface Proto_MongoDB_Interface {
  Connect_DB(): Promise<{
    code: Status;
    message: Status | string;
  }>;
  Disconnect_DB(): void;
  Define_Schema(data: any): mongoose.Schema;
  Define_Model(
    schema_name: string,
    schema_definition: mongoose.Schema,
    collection: any
  ): mongoose.Model<mongoose.Document>;
}

/**
 * Interface - Proto_GraphQLServer
 * @description
 * Interface for Proto_GraphQLServer
 */
export interface Proto_GraphQLServer_Interface {
  add_configuration(): Express;
  check_header_tokens(
    req: Request,
    res: Response
  ): {
    req: Request;
    res: Response;
  };
  propagate_headers(
    req: Request,
    res: Response
  ): {
    req: Request;
    res: Response;
  };
}
