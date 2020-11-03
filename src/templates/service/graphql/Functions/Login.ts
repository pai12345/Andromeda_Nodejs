import oServe_Customer from "../../../../dev/CustomerClass";
import oServe_Utility from "../../../../dev/UtilityClass";
import oServe_Mongo from "../../../../dev/DB_MongoClass";
import {
  Login_Resolver_interface,
  Error_Customer_enum,
  Status,
} from "../../../../utility/Interface";
import generateModel from "../../../model/MongoDB/customer";

const Login_Func = async (args: Login_Resolver_interface, req: any) => {
  try {
    const validate_inputdetails = oServe_Customer.Validate_GetCustomerDetails(
      args.input
    );

    if (validate_inputdetails.username !== Error_Customer_enum.Customer_Valid) {
      const error = oServe_Utility.ResultObj(
        Status.BADREQUEST,
        validate_inputdetails.username,
        args.input.username
      );
      return error;
    } else if (
      validate_inputdetails.password !== Error_Customer_enum.Customer_Valid
    ) {
      const error = oServe_Utility.ResultObj(
        Status.BADREQUEST,
        validate_inputdetails.password,
        args.input.password
      );
      return error;
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
        const check = oServe_Utility.NullishCoalesce(getCustomer);

        if (check !== Status.NotResponding) {
          const test_password = await oServe_Utility.CompareCryptPassword(
            password,
            getCustomer.password
          );

          if (test_password === false) {
            const error = oServe_Utility.ResultObj(
              Status.BADREQUEST,
              Error_Customer_enum.Customer_PasswordInvalid,
              null
            );
            return error;
          } else {
            const session_data = {
              Customer: {
                email: username,
                Loggedin: true,
                CSRF: {
                  token: oServe_Utility.GenerateCSRFToken().token,
                  secret: oServe_Utility.GenerateCSRFToken().secret,
                },
                JWT: {
                  token: oServe_Utility.GenerateJWT().token,
                  secret: oServe_Utility.GenerateJWT().secret,
                },
              },
            };
            req.session.data = session_data;
            const result = oServe_Utility.ResultObj(
              Status.Success,
              Status.SuccessMessage,
              getCustomer
            );
            return result;
          }
        } else {
          const error = oServe_Utility.ResultObj(
            Status.NotFound,
            Error_Customer_enum.Customer_NotExist,
            null
          );
          return error;
        }
      } else {
        const error = oServe_Utility.ResultObj(
          Status.ServerError,
          Status.ServerErrorMessage,
          message
        );
        return error;
      }
    }
  } catch (error) {
    return error;
  }
};
export default Login_Func;
