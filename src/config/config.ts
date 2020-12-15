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
  MONGODB_URI: `${process.env.DEV_MONGODB_TYPE}+${process.env.DEV_MONGODB_TYPEADDITION}://${process.env.DEV_MONGODB_USERNAME}:${process.env.DEV_MONGODB_PASSWORD}@${process.env.DEV_MONGODB_HOST}/${process.env.DEV_MONGODB_DATABASE}?retryWrites=${process.env.DEV_MONGODB_RETRYWRITES}&w=${process.env.DEV_MONGODB_WRITECONCERN}`,
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
