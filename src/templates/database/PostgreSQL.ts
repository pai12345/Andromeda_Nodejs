import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

/**
 * DB Connection - PostgreSQL
 * @description
 * Connection Details for PostgreSQL Database
 */
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
