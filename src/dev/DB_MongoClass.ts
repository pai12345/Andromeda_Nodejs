import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * Class - Mongo
 * @description
 * Class contains Attributes and Methods for MongDB
 */
class Mongo {
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
      return "Success";
    } catch (error) {
      return `Error in Connection to MongoDB: ${error}`;
    }
  }
  /**
   * Function - Disconnect
   * @description
   * Function to Disconnect MongoDB Instance
   */
  Disconnect_DB() {
    mongoose.disconnect();
    return "Success";
  }
}

/**
 * Instance - Mongo
 * @description
 * Instance having Attributes and Methods of Mongo Class .
 */
const oServe_Mongo = new Mongo();
export default oServe_Mongo;
