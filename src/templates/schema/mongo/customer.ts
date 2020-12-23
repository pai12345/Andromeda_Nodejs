import oServe_Mongo from "../../../dev/mongo/mongo";

const Customer = oServe_Mongo.Define_Schema({
  customerid: { type: Number, unique: true },
  name: { type: String },
  title: { type: String, enum: ["Mr", "Ms", "Mrs"] },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  contactnumber: { type: Number },
  dateofbirth: { type: Date },
  password: { type: String, unique: true, required: true },
});

const generateSchema = () => {
  return {
    Customer: Customer,
  };
};

export default generateSchema;
