import {
  User_Authentication_Request,
  User_Authentication_Response,
  Customer_GetCustomerDetails_interface,
  Proto_Customer_interface,
} from "../../utility/Interface";

/**
 * Template - Customers Class Prototype
 * @description
 * Base Template for Customers Class Prototype
 */
abstract class Proto_Customer implements Proto_Customer_interface {
  abstract Validate_GetCustomerDetails(
    data: Customer_GetCustomerDetails_interface
  ): Customer_GetCustomerDetails_interface;
  abstract CheckUser_Authentication(
    data: User_Authentication_Request
  ): User_Authentication_Response;
}

export default Proto_Customer;
