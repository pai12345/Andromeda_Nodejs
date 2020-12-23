import generateSchema from "../../schema/mongo/customer";
import oServe_Mongo from "../../../dev/mongo/mongo";

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
