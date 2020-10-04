import mongoose from "mongoose";
import { Status } from "../utility/utility";
import dotenv from "dotenv";
dotenv.config();

/**
 * Class - Mongo
 * @description
 * Class contains Attributes and Methods for MongDB
 */
class Mongo {
  readonly Status = Status;
  /**
   * Function - Connect
   * @description
   * Function to Connect MongoDB Instance
   */
  async Connect_DB() {
    try {
      mongoose.set("useUnifiedTopology", true);
      mongoose.set("useNewUrlParser", true);

      const connect = mongoose.connect(`${process.env.MONGODB_URI}`);
      await Promise.all([connect]);
      return { code: Status.Success, message: Status.SuccessMessage };
    } catch (error) {
      return { code: Status.ServerError, message: `${error}` };
    }
  }
  /**
   * Function - Disconnect
   * @description
   * Function to Disconnect MongoDB Instance
   */
  Disconnect_DB() {
    mongoose.disconnect();
  }
}

/**
 * Instance - Mongo
 * @description
 * Instance having Attributes and Methods of Mongo Class .
 */
const oServe_Mongo = new Mongo();
export default oServe_Mongo;
