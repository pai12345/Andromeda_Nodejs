import Proto_Utility from "../../templates/class/helper/Proto_helper";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import {
  Status,
  Error_Customer_enum,
  Proto_Utility_interface,
  GenerateMessage_graphql_input_interface,
} from "../../utility/Interface";
import pool from "../../templates/database/PostgreSQL";
import bcrypt from "bcryptjs";
import Tokens from "csrf";
import jwt from "jsonwebtoken";
/**
 * Class - Utility
 * @description
 * Utility Class contains Attributes and Methods for Application
 */
class Sub_Utility extends Proto_Utility implements Proto_Utility_interface {
  readonly Status = Status;
  constructor() {
    super();
    this.Status;
  }
  /**
   * Function - Validate
   * @description
   * Function to Validate Data
   * @params data: Input data to be validated
   * @params type: Type of Validation
   * @returns true | false
   */
  Validate_Data(data: string, type: string) {
    switch (type) {
      case Error_Customer_enum.Customer_Email:
        return isEmail(data);
      case Error_Customer_enum.Customer_Empty:
        return isEmpty(data);
      case Error_Customer_enum.Customer_Length:
        return isLength(data, { min: 4 });
      default:
        throw new Error(Error_Customer_enum.Customer_UnkowntypeforValidation);
    }
  }
  /**
   * Function - GraphQL Error | Success Message Structure
   * @description
   * Function to generate GraphQL Error Message Structure
   * @params data: Input data
   * @returns Message Object
   */
  GenerateMessage_graphql(data: GenerateMessage_graphql_input_interface) {
    const messageobject = Object.create(null);
    const data_validate = data.message ?? Status.NotResponding;

    switch (data_validate) {
      case Error_Customer_enum.Customer_UsernameEmpty:
        messageobject.message = Error_Customer_enum.Customer_UsernameEmpty;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_Customer_enum.Customer_InvalidEmailAddress:
        messageobject.message =
          Error_Customer_enum.Customer_InvalidEmailAddress;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_Customer_enum.Customer_PasswordEmpty:
        messageobject.message = Error_Customer_enum.Customer_PasswordEmpty;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_Customer_enum.Customer_PasswordLength:
        messageobject.message = Error_Customer_enum.Customer_PasswordLength;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_Customer_enum.Customer_Valid:
        messageobject.message = Error_Customer_enum.Customer_Valid;
        messageobject.statusCode = Status.Success;
        messageobject.statusMessage = Status.SuccessMessage;
        return messageobject;
      case Error_Customer_enum.Customer_UsernameInvalid:
        messageobject.message = Error_Customer_enum.Customer_UsernameInvalid;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_Customer_enum.Customer_PasswordInvalid:
        messageobject.message = Error_Customer_enum.Customer_PasswordInvalid;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      default:
        messageobject.message = data_validate;
        messageobject.statusCode = Status.ServerError;
        messageobject.statusMessage = Status.ServerErrorMessage;
        return messageobject;
    }
  }
  /**
   * Function - Query
   * @param sql - SQL query
   * @returns Result query data
   */
  async Query(sql: string, params: string[]) {
    const client = await pool.connect();
    try {
      const query = await client.query(sql, params);
      return query.rows;
    } catch (err) {
      return err;
    } finally {
      client.release();
    }
  }
  /**
   * Function - CryptPassword
   * @param passowrd - password
   * @returns Hashed Password
   */
  async CryptPassword(password: string) {
    try {
      return bcrypt.hash(password, 1);
    } catch (error) {
      return error;
    }
  }
  /**
   * Function - CompareCryptPassword
   * @param passowrd - password original
   * @param hash - password hash
   * @returns Boolean
   */
  async CompareCryptPassword(password: string, hash: string) {
    try {
      const compare = await bcrypt.compare(password, hash);
      return compare;
    } catch (error) {
      return error;
    }
  }
  /**
   * Function - Generate Secret
   * @description
   * Function to generate Secrets
   */
  GenerateSecretKey() {
    return Math.random().toString(36);
  }
  /**
   * Function - Generate CSRF
   * @description
   * Function generate CSRF Token
   */
  GenerateCSRFToken() {
    const csrf = new Tokens();
    const secret = csrf.secretSync();
    const token = csrf.create(secret);
    return { token: token, secret: secret };
  }
  /**
   * Function - Generate JWT
   * @description
   * Function generate JWT Token
   */
  GenerateJWT() {
    const secret = Math.random();
    const token = jwt.sign({ code: Math.random().toString(36) }, `${secret}`);
    return { token: token, secret: secret };
  }
  ResultObj(status: number, message: string, data: any) {
    const result = {
      status: status,
      message: message,
      data: data,
    };
    return result;
  }
  /**
   * Function for Nullish Coalescing
   * @description
   * Function to check if value is null | undefined
   */
  NullishCoalesce(data: any) {
    const validate = data ?? false;
    return validate;
  }
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
const oServe_Utility = new Sub_Utility();
export default oServe_Utility;
