import oServe_Mongo from "../../dev/DB_MongoClass";
import generateSchema from "../schema/customer";
// import { MongoSchema_Enum } from "../../utility/Interface";

const Customer = oServe_Mongo.Define_Model(
  "Customer",
  generateSchema().Customer,
  "Customer"
);

const generateModel = () => {
  return {
    Customer: Customer,
  };
};

export default generateModel;
