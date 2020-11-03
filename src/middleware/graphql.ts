import { graphqlHTTP } from "express-graphql";
import resolvers from "../templates/service/graphql/resolver";
import { typeDefs } from "../templates/service/graphql/schema";
import { URL_enum } from "../utility/Interface";
import oServe_Utility from "../dev/UtilityClass";
import express from "express";

const app = express();

/**
 * Middleware - GrpahQL Http
 * @description
 * Middleware defining GraphQL Http and configurations
 */
const grpahql_middleware = app.use(
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

export default grpahql_middleware;
