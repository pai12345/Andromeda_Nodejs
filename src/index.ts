import { oServe_Utility } from "./dev/UtilityClass";
import { URL_enum } from "./utility/utility";
import express, { json } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { typeDefs } from "./templates/service/schema";
import { resolvers } from "./templates/service/resolver";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());

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

app.listen(PORT, () => {
  console.log(`${oServe_Utility.Status.ListeningonPort}: ${PORT}`);
});
