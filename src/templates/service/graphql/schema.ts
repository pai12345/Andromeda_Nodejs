import { buildSchema } from "graphql";

export const Schema_ValidateCustomer = buildSchema(`
input LoginInput {
  username: String!
  password: String!
}

type RootQuery{
  Login(input:LoginInput): String!
}

schema {
  query: RootQuery
}
`);
