import Proto_Customer from "../templates/class/ProtoCustomerClass";
import { oServe_Utility } from "../dev/UtilityClass";
import {
  User_Authentication_Request,
  Customer_GetCustomerDetails_interface,
  Error_Customer_enum,
  Status,
  Proto_Customer_interface,
} from "../utility/Interface";

/**
 * Class - Customer
 * @description
 * Customer Class contains Attributes and Methods for Application
 */
class Customer extends Proto_Customer implements Proto_Customer_interface {
  constructor() {
    super();
  }
  /**
   * Function - Validate Customer Details
   * @description
   * Function to Validate Customer Details
   * @params data: Input data to be validated
   * @returns Validation Status
   */
  Validate_GetCustomerDetails(
    data: Customer_GetCustomerDetails_interface
  ): Customer_GetCustomerDetails_interface {
    const username =
      data.username ?? Error_Customer_enum.Customer_UsernameInvalid;
    const password =
      data.password ?? Error_Customer_enum.Customer_PasswordInvalid;
    const result = Object.create(null);

    switch (username) {
      case Error_Customer_enum.Customer_UsernameInvalid:
        result.username = Error_Customer_enum.Customer_UsernameInvalid;
        break;
      default:
        if (
          oServe_Utility.Validate_Data(
            username,
            Error_Customer_enum.Customer_Empty
          )
        ) {
          result.username = Error_Customer_enum.Customer_UsernameEmpty;
          break;
        } else if (
          oServe_Utility.Validate_Data(
            username,
            Error_Customer_enum.Customer_Email
          ) === false
        ) {
          result.username = Error_Customer_enum.Customer_InvalidEmailAddress;
          break;
        } else {
          result.username = Error_Customer_enum.Customer_Valid;
          break;
        }
    }

    switch (password) {
      case Error_Customer_enum.Customer_PasswordInvalid:
        result.password = Error_Customer_enum.Customer_PasswordInvalid;
        break;
      default:
        if (
          oServe_Utility.Validate_Data(
            password,
            Error_Customer_enum.Customer_Empty
          )
        ) {
          result.password = Error_Customer_enum.Customer_PasswordEmpty;
          break;
        } else if (
          oServe_Utility.Validate_Data(
            password,
            Error_Customer_enum.Customer_Length
          ) === false
        ) {
          result.password = Error_Customer_enum.Customer_PasswordLength;
          break;
        } else {
          result.password = Error_Customer_enum.Customer_Valid;
          break;
        }
    }
    return result;
  }
  /**
   * Function - Check Customer from Postgresql
   * @description
   * Function to Check Customer from Postgresql
   * @params data: Input query result data to be validated
   * @returns Validation Status
   */
  CheckUser_Authentication(data: User_Authentication_Request) {
    const datacheck = data ?? Status.NotResponding;
    switch (datacheck) {
      case Status.NotResponding:
        throw Status.NotResponding;
      default:
        const validate =
          datacheck.length > 0
            ? Error_Customer_enum.Customer_Exist
            : Error_Customer_enum.Customer_NotExist;
        const payload = {
          status: validate,
          data: data,
        };
        return payload;
    }
  }
}

/**
 * Instance - Customer
 * @description
 * Instance having Attributes and Methods of Customer Class .
 */
export const oServe_Customer = new Customer();
