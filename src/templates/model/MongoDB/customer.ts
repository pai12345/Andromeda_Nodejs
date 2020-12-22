import generateSchema from "../../schema/MongoDB/customer";
import oServe_Mongo from "../../../dev/db_MongoClass";

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
