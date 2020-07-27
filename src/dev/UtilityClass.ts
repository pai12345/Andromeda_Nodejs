import { Proto_Utility } from "../templates/class/ProtoClass";
import { Status, User_Authentication, Util_enum } from "../utility/utility";

/**
 * Class - Utility
 * @description
 * Utility Class contains Attributes and Methods for Application
 */
class Utility extends Proto_Utility {
  readonly Status = Status;
  constructor() {
    super();
    this.Status;
  }
  Query_GetCustomer(username: string, password: string) {
    const query = `SELECT (public.customers_getcustomer_function('${username}','${password}')).*`;
    return query;
  }
  CheckUser_Authentication(data: User_Authentication) {
    const datacheck = data ?? Util_enum.NotResponding;
    switch (datacheck) {
      case Util_enum.NotResponding:
        return Util_enum.NotResponding;
      default:
        const validate = datacheck.length > 0 ? "Authenticated" : "Unkown";
        return validate;
    }
  }
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
export const oServe = new Utility();
