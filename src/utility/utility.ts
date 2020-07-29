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
  BADREQUESTMessage = "Bad Request",
  ServerErrorMessage = "Internal Server Error",
  SuccessMessage = "Success",
  ErrorMessage = "Error",
  WebServerTitle = "Web Server",
  WebServerBody = "Microservice Web Server",
  PageNotFoundTitlte = "Service Not Found",
  PageNotFoundBody = `404 - Service Not Found`,
  ListeningonPort = "Listening on Port",
  NotResponding = "Server did not response with any data",
}

//================Error================//
/**
 * Enumeration for API Status
 * @description
 * Enumeration having API Status details
 */
export enum Error_enum {
  Customer_UsernameEmpty = "Username cannot be empty",
  Customer_UsernameInvalid = "Enter valid username",
  Customer_PasswordInvalid = "Enter valid password",
  Customer_InvalidEmailAddress = "Invalid Email Address",
  Customer_Valid = "Valid",
  Customer_PasswordEmpty = "Password cannot be empty",
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
  Query_GetCustomer(username: string, password: string): string;
  Validate_GetCustomerDetails(
    data: Customer_GetCustomerDetails_interface
  ): Customer_GetCustomerDetails_interface;
  CheckUser_Authentication(data: User_Authentication): string;
}

/**
 * Interface - Authentication
 * @description
 * Interface for User Authentication
 */
export interface User_Authentication {
  length: number;
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
 * Interface - Proto_Utility
 * @description
 * Interface for Proto_Utility
 */
export interface Proto_Utility_interface {
  Validate_Data(data: string, type: string): boolean | string;
  GenerateMessage_graphql(data: GenerateMessage_graphql_input_interface): any;
}
