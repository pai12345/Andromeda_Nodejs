import { Proto_Utility } from "../templates/class/ProtoClass";
import { Status } from "../utility/utility";

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
  Query_All_Table(data: string) {
    const query = `SELECT * FROM ${data}`;
    return query;
  }
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
export const oServe = new Utility();
