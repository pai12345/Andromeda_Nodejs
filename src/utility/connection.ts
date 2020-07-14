//Postgresql DB Connection
import { Client } from "pg";

/**
 * Connection to Postgresql Database
 */
export const client = new Client({
  user: "postgresadmin",
  host: "192.168.1.8",
  database: "Commerce",
  password: "admin123",
  port: 32528,
});
client.connect();

console.log(client);
