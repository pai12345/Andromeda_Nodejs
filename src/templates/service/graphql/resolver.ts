import { oServe_Customer } from "../../../dev/CustomerClass";
import { client } from "../../../utility/connection";
import { Login_Resolver_interface } from "../../../utility/utility";

export const resolver = {
  Login: async (args: Login_Resolver_interface, _req: any) => {
    const validate_inputdetails = oServe_Customer.Validate_GetCustomerDetails(
      args.input
    );

    if (validate_inputdetails.username !== "Valid") {
      throw new Error(validate_inputdetails.username);
    } else if (validate_inputdetails.password !== "Valid") {
      throw new Error(validate_inputdetails.password);
    } else {
      const { username, password } = args.input;
      const text = oServe_Customer.Query_GetCustomer(username, password);
      const query = await client.query(text);
      const Authentication = oServe_Customer.CheckUser_Authentication(
        query.rows
      );
      return Authentication;
    }
  },
};
