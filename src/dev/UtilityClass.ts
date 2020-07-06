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
}

/**
 * Instance - Utility
 * @description
 * Instance having Attributes and Methods of Uitlity Class .
 */
export const oServe = new Utility();
