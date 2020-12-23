import {
  Proto_Utility_interface,
  GenerateMessage_graphql_input_interface,
  GenerateCSRFToken_Response_Interface,
  GenerateJWT_Response_Interface,
  ResultObj_Response_Interface,
} from "../../../utility/Interface";

/**
 * Template - Utility Class Prototype
 * @description
 * Base Template for Utility Class Prototype
 */
abstract class Proto_Utility implements Proto_Utility_interface {
  abstract Validate_Data(data: string, type: string): boolean | string;
  abstract GenerateMessage_graphql(
    data: GenerateMessage_graphql_input_interface
  ): { message: string; statusCode: number; statusMessage: string };
  abstract Query(sql: string, params: string[]): any;
  abstract CryptPassword(password: string): Promise<any>;
  abstract CompareCryptPassword(password: string, hash: string): Promise<any>;
  abstract GenerateSecretKey(): string;
  abstract GenerateCSRFToken(): GenerateCSRFToken_Response_Interface;
  abstract GenerateJWT(): GenerateJWT_Response_Interface;
  abstract ResultObj(
    status: number,
    message: string,
    data: any
  ): ResultObj_Response_Interface;
  abstract NullishCoalesce(data: any): any;
}

export default Proto_Utility;
