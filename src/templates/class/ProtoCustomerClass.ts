import {
  User_Authentication,
  Customer_GetCustomerDetails_interface,
  Proto_Customer_interface,
} from "../../utility/utility";

/**
 * Template - Customers Class Prototype
 * @description
 * Base Template for Customers Class Prototype
 */
abstract class Proto_Customer implements Proto_Customer_interface {
  abstract Query_GetCustomer(username: string, password: string): string;
  abstract Validate_GetCustomerDetails(
    data: Customer_GetCustomerDetails_interface
  ): Customer_GetCustomerDetails_interface;
  abstract CheckUser_Authentication(data: User_Authentication): string;
}

export default Proto_Customer;
