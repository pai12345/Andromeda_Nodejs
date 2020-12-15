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
  MONGODB_URI: `${process.env.TYPE}+${process.env.TYPEADDITION}://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=${process.env.RETRYWRITES}&w=${process.env.WRITECONCERN}`,
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
