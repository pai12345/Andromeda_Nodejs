import oServe_Customer from "../../../../dev/CustomerClass";
import oServe_Utility from "../../../../dev/UtilityClass";
import oServe_Mongo from "../../../../dev/DB_MongoClass";
import {
  Login_Resolver_interface,
  Error_Customer_enum,
} from "../../../../utility/Interface";
import generateModel from "../../../model/MongoDB/customer";

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
      const openconnection_MongoDB = await oServe_Mongo.Connect_DB();
      const { code, message } = openconnection_MongoDB;

      if (code === 200) {
        const { username, password } = args.input;
        const customer_Model = generateModel().Customer;
        const getCustomer: any = await customer_Model
          .findOne({ email: username })
          .select(
            "_id customerid name title address email contactnumber dateofbirth password"
          )
          .lean();
        oServe_Mongo.Disconnect_DB();
        const CheckCustomer = oServe_Customer.CheckUser_Authentication(
          getCustomer
        );
        const { status } = CheckCustomer;

        if (status === Error_Customer_enum.Customer_Exist) {
          const hashed_password = await oServe_Utility.CryptPassword(password);
          const test_password = await oServe_Utility.CompareCryptPassword(
            getCustomer.password,
            hashed_password
          );
          if (test_password === false) {
            CheckCustomer.status = Error_Customer_enum.Customer_PasswordInvalid;
            return CheckCustomer;
          } else {
            const session_data = {
              Customer: {
                email: username,
                Loggedin: true,
                CSRF: {
                  token: oServe_Utility.GenerateCSRFToken().token,
                  secret: oServe_Utility.GenerateCSRFToken().secret,
                },
              },
            };
            req.session.data = session_data;
          }
        }
        return CheckCustomer;
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
