import { oServe_Utility } from "./dev/UtilityClass";
import express, { json } from "express";
// import router from "./routes/route";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { Schema_ValidateCustomer } from "./templates/service/graphql/schema";
import { resolver } from "./templates/service/graphql/resolver";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());

// app.use("/api/", router);
app.use(
  "/api/Andromeda",
  graphqlHTTP({
    schema: Schema_ValidateCustomer,
    rootValue: resolver,
    graphiql: false,
    customFormatErrorFn: (error) => {
      return oServe_Utility.GenerateMessage_graphql(error);
    },
  })
);

app.listen(PORT, () => {
  console.log(`${oServe_Utility.Status.ListeningonPort}: ${PORT}`);
});
