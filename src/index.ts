import compression from 'compression';
import cors from 'cors';
import express, {json} from 'express';
import {graphqlHTTP} from 'express-graphql';
import helmet from 'helmet';

import {oServe_Utility} from './dev/UtilityClass';
import {resolvers} from './templates/service/resolver';
import {typeDefs} from './templates/service/schema';
import {URL_enum} from './utility/utility';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(json());
app.use(cors({origin: '*'}));
app.use(helmet());
app.use(compression());

app.use(URL_enum.GraphQLEndpoint, graphqlHTTP({
          schema: typeDefs,
          rootValue: resolvers,
          graphiql: true,
          customFormatErrorFn: (error) => {
            return oServe_Utility.GenerateMessage_graphql(error);
          },
        }));

const server = app.listen(PORT, () => {
  console.log(`${oServe_Utility.Status.ListeningonPort}: ${PORT}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
  process.exit(0);
});
