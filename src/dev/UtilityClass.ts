import Proto_Utility from "../templates/class/ProtoUtilityClass";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import {
  Status,
  Error_enum,
  Proto_Utility_interface,
  GenerateMessage_graphql_input_interface,
} from "../utility/utility";

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
      case "Email":
        return isEmail(data);
      case "Empty":
        return isEmpty(data);
      case "Length":
        return isLength(data, { min: 4 });
      default:
        throw new Error("Unkown type for Validation");
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
    switch (data.message) {
      case Error_enum.Customer_UsernameEmpty:
        messageobject.message = Error_enum.Customer_UsernameEmpty;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_enum.Customer_InvalidEmailAddress:
        messageobject.message = Error_enum.Customer_InvalidEmailAddress;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_enum.Customer_PasswordEmpty:
        messageobject.message = Error_enum.Customer_PasswordEmpty;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_enum.Customer_PasswordLength:
        messageobject.message = Error_enum.Customer_PasswordLength;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_enum.Customer_Valid:
        messageobject.message = Error_enum.Customer_Valid;
        messageobject.statusCode = Status.Success;
        messageobject.statusMessage = Status.SuccessMessage;
        return messageobject;
      case Error_enum.Customer_UsernameInvalid:
        messageobject.message = Error_enum.Customer_UsernameInvalid;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      case Error_enum.Customer_PasswordInvalid:
        messageobject.message = Error_enum.Customer_PasswordInvalid;
        messageobject.statusCode = Status.BADREQUEST;
        messageobject.statusMessage = Status.BADREQUESTMessage;
        return messageobject;
      default:
        messageobject.message = Status.NotResponding;
        messageobject.statusCode = Status.ServerError;
        messageobject.statusMessage = Status.ServerErrorMessage;
        return messageobject;
    }
  }
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
export const oServe_Utility = new Sub_Utility();
