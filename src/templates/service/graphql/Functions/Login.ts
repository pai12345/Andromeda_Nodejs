import oServe_Customer from "../../../../dev/CustomerClass";
import oServe_Utility from "../../../../dev/UtilityClass";
import oServe_Mongo from "../../../../dev/DB_MongoClass";
import {
  Login_Resolver_interface,
  Error_Customer_enum,
} from "../../../../utility/Interface";
import generateModel from "../../../model/customer";

const Login_Func = async (args: Login_Resolver_interface, req: any) => {
  try {
    const validate_inputdetails = oServe_Customer.Validate_GetCustomerDetails(
      args.input
    );
    if (validate_inputdetails.username !== Error_Customer_enum.Customer_Valid) {
      throw new Error(validate_inputdetails.username);
    } else if (
      validate_inputdetails.password !== Error_Customer_enum.Customer_Valid
    ) {
      throw new Error(validate_inputdetails.password);
    } else {
      req.session.isLoggedin = true;

      const { username, password } = args.input;

      const execute_password_hashing = oServe_Utility.CryptPassword(password);
      const execute_openconnection_MongoDB = oServe_Mongo.Connect_DB();

      const [hashed_password, openconnection_MongoDB] = await Promise.all([
        execute_password_hashing,
        execute_openconnection_MongoDB,
      ]);

      const { code, message } = openconnection_MongoDB;

      if (code === 200) {
        const customer_Model = generateModel().Customer;
        const getCustomer: any = await customer_Model
          .findOne({ email: username })
          .select("password")
          .lean();
        oServe_Mongo.Disconnect_DB();
        const CheckCustomer = oServe_Customer.CheckUser_Authentication(
          getCustomer
        );
        const { status } = CheckCustomer;

        if (status === "Valid Customer") {
          const test_password = await oServe_Utility.CompareCryptPassword(
            getCustomer[0].password,
            hashed_password
          );
          if (test_password) {
            return Error_Customer_enum.Customer_Exist;
          } else {
            return Error_Customer_enum.Customer_PasswordInvalid;
          }
        } else {
          return status;
        }
      } else {
        return message;
      }
      // const text = SQLQueryGenerator.GetCustomer_withFilter;
      // const query = await oServe_Utility.Query(text, [username, password]);
      // const Authentication = oServe_Customer.CheckUser_Authentication(query);
      // return Authentication;
    }
  } catch (error) {
    return error;
  }
};
export default Login_Func;
