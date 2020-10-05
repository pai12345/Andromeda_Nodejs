import { buildASTSchema } from "graphql";
import gql from "graphql-tag";

export const typeDefs = buildASTSchema(gql`
  schema {
    query: LoginQuery
  }

  input LoginInput {
    username: String!
    password: String!
  }

  interface LoginResponse_Interface {
    status: String!
    data: [LoginResponse_data]!
  }

  type LoginResponse implements LoginResponse_Interface {
    status: String!
    data: [LoginResponse_data]!
  }

  interface LoginResponse_data_Interface {
    customerid: Int!
    name: String!
    title: String
    address: String!
    email: String!
    contactnumber: String!
    dateofbirth: String
  }

  type LoginResponse_data implements LoginResponse_data_Interface {
    customerid: Int!
    name: String!
    title: String
    address: String!
    email: String!
    contactnumber: String!
    dateofbirth: String
  }

  interface LoginQuery_Interface {
    Login(input: LoginInput): LoginResponse!
  }

  type LoginQuery implements LoginQuery_Interface {
    Login(input: LoginInput): LoginResponse!
  }
`);
