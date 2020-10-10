import compression from "compression";
import cors from "cors";
import express, { json } from "express";
import { graphqlHTTP } from "express-graphql";
import helmet from "helmet";
import oServe_Utility from "./dev/UtilityClass";
import { resolvers } from "./templates/service/graphql/resolver";
import { typeDefs } from "./templates/service/graphql/schema";
import { URL_enum } from "./utility/Interface";
import session from "express-session";
import MongoDB_ConnectSession from "connect-mongodb-session";
import route_validate from "./middleware/route";

const PORT = process.env.PORT || 8000;
const app = express();
const MongoDB_SessionStore = MongoDB_ConnectSession(session);
const session_store = new MongoDB_SessionStore(
  {
    uri: `${process.env.MONGODB_URI}`,
    collection: "Session",
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  (error) => {
    if (error) {
      console.log(`Mongo session error:${error}`);
    }
  }
);

session_store.on("error", (error) => {
  console.log(`Mongo session_store error:${error}`);
  return error;
});

app.set("trust proxy", 1);

app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());

app.use(
  session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: false,
    store: session_store,
    cookie: {
      maxAge: 300,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(
  URL_enum.GraphQLEndpoint,
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (error) => {
      return oServe_Utility.GenerateMessage_graphql(error);
    },
  })
);

app.use(route_validate);

const server = app.listen(PORT, () => {
  console.log(`${oServe_Utility.Status.ListeningonPort}: ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
  process.exit(0);
});
