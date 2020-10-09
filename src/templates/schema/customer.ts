import oServe_Mongo from "../../dev/DB_MongoClass";

const Customer = oServe_Mongo.Define_Schema({
  customerid: { type: Number, unique: true },
  name: String,
  title: { type: String, enum: ["Mr", "Ms", "Mrs"] },
  address: String,
  email: { type: String, required: true, unique: true },
  contactnumber: Number,
  dateofbirth: String,
  password: { type: String, unique: true, required: true },
});

const generateSchema = () => {
  return {
    Customer: Customer,
  };
};

export default generateSchema;
