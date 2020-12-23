import generateEnv from "./config/config";
import { Status } from "./utility/Interface";
import graphQLServer from "./dev/server/server";

const PORT = generateEnv().PORT;

//Initialse app
const app = graphQLServer.add_configuration();

//Server Listener
const server = app.listen(PORT, () => {
  console.log(`${Status.ListeningonPort}: ${PORT}`);
});

//Server graceful exit
process.on("SIGTERM", () => {
  console.log(Status.Closing_http_server);
  server.close(() => {
    console.log(Status.Http_server_closed);
    process.exit(0);
  });
  process.exit(0);
});
