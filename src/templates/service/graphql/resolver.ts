import { oServe_Customer } from "../../../dev/CustomerClass";
import { oServe_Utility } from "../../../dev/UtilityClass";
import {
  Login_Resolver_interface,
  Error_Customer_enum,
  SQLQueryGenerator,
} from "../../../utility/Interface";

export const resolvers: any = {
  Login: async (args: Login_Resolver_interface, _req: any) => {
    try {
      const validate_inputdetails = oServe_Customer.Validate_GetCustomerDetails(
        args.input
      );
      if (
        validate_inputdetails.username !== Error_Customer_enum.Customer_Valid
      ) {
        throw new Error(validate_inputdetails.username);
      } else if (
        validate_inputdetails.password !== Error_Customer_enum.Customer_Valid
      ) {
        throw new Error(validate_inputdetails.password);
      } else {
        const { username, password } = args.input;
        const text = SQLQueryGenerator.GetCustomer_withFilter;
        const query = await oServe_Utility.Query(text, [username, password]);
        const Authentication = oServe_Customer.CheckUser_Authentication(query);
        return Authentication;
      }
    } catch (error) {
      return error;
    }
  },
  Logout: async (_args: any, _req: any) => {
    try {
      return { status: true };
    } catch (error) {
      return error;
    }
  },
};
