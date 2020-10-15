import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8000;
const PostgreSQL = {
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT,
};
const MongoDB = {
  MONGODB_URI: process.env.MONGODB_URI,
};

const generateEnv = () => {
  return {
    env: env,
    PORT: PORT,
    PostgreSQL: PostgreSQL,
    MongoDB: MongoDB,
  };
};

export default generateEnv;
