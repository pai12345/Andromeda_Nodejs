import { Client } from "pg";

/**
 * Client - Postgresql
 * @description
 * Client for Postgresql Database Connection
 */
export const client = new Client({
  user: "postgresadmin",
  host: "192.168.1.6",
  database: "Commerce",
  password: "admin123",
  port: 31995,
});
client.connect();

// console.log(client);
