import mongoose from "mongoose";
import { Status } from "../utility/Interface";
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
      mongoose.set("useCreateIndex", true);

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
  /**
   * Function - Schema
   * @description
   * Function to define Schema
   */
  Define_Schema(data: any) {
    const { Schema } = mongoose;
    const newSchema = new Schema(data);
    return newSchema;
  }
  /**
   * Function - Model
   * @description
   * Function to define Model
   */
  Define_Model(
    schema_name: string,
    schema_definition: mongoose.Schema<any>,
    collection: any
  ) {
    const { model } = mongoose;
    const newmodel = model(schema_name, schema_definition, collection);
    return newmodel;
  }
}

/**
 * Instance - Mongo
 * @description
 * Instance having Attributes and Methods of Mongo Class .
 */
const oServe_Mongo = new Mongo();
export default oServe_Mongo;
