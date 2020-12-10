import { Status, Proto_MongoDB_Interface } from "../../utility/Interface";
import mongoose from "mongoose";

/**
 * Template - MongoDB Class Prototype
 * @description
 * Base Template for MongoDB Class Prototype
 */
abstract class Proto_MongoDB implements Proto_MongoDB_Interface {
  abstract Connect_DB(): Promise<{
    code: Status;
    message: Status | string;
  }>;
  abstract Disconnect_DB(): void;
  abstract Define_Schema(data: any): mongoose.Schema;
  abstract Define_Model(
    schema_name: string,
    schema_definition: mongoose.Schema,
    collection: any
  ): mongoose.Model<mongoose.Document>;
}

export default Proto_MongoDB;
