import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
import generateEnv from "../../config/config";

/**
 * DB Connection - PostgreSQL
 * @description
 * Connection Details for PostgreSQL Database
 */
const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  PGDATABASE,
} = generateEnv().PostgreSQL;

const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;
const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
