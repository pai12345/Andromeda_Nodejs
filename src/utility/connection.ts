import { Client } from "pg";

/**
 * Client - Postgresql
 * @description
 * Client for Postgresql Database Connection
 */
export const client = new Client({
  user: "postgresadmin",
  host: "192.168.1.2",
  database: "Commerce",
  password: "admin123",
  port: 31861,
});
client.connect();
