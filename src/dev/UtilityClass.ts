import { Proto_Utility } from "../templates/class/ProtoClass";
import { Status, User_Authentication } from "../utility/utility";

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
  Query_AuthenticateUser(username: string, password: string) {
    const query = `SELECT name, password FROM public."Customers" WHERE name='${username}' AND password=crypt('${password}', password)`;
    return query;
  }
  CheckUser_Authentication(data: User_Authentication) {
    if (data.length > 0) {
      return "Authenticated";
    } else {
      return "Unkown";
    }
  }
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
export const oServe = new Utility();
