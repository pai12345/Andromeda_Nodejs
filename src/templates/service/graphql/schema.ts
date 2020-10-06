import { buildASTSchema } from "graphql";
import gql from "graphql-tag";

export const typeDefs = buildASTSchema(gql`
  #Schema - Root
  schema {
    query: RootQuery
  }

  #Root - Query Interface
  interface RootQuery_Interface {
    Login(input: LoginInput): LoginResponse!
    Logout(input: LoginOut): LogOutResponse!
  }

  #Root - Query Type
  type RootQuery implements RootQuery_Interface {
    Login(input: LoginInput): LoginResponse!
    Logout(input: LoginOut): LogOutResponse!
  }

  #Login - Input
  input LoginInput {
    username: String!
    password: String!
  }

  #Login - Response Interface
  interface LoginResponse_Interface {
    status: String!
    data: [LoginResponse_data]!
  }

  #Login - Response Type
  type LoginResponse implements LoginResponse_Interface {
    status: String!
    data: [LoginResponse_data]!
  }

  #Login - Response Type: data Interface
  interface LoginResponse_data_Interface {
    customerid: Int!
    name: String!
    title: String
    address: String!
    email: String!
    contactnumber: String!
    dateofbirth: String
  }

  #Login - Response Type : data Type
  type LoginResponse_data implements LoginResponse_data_Interface {
    customerid: Int!
    name: String!
    title: String
    address: String!
    email: String!
    contactnumber: String!
    dateofbirth: String
  }

  #Logout - Input
  input LoginOut {
    username: String!
  }

  #Logout - Response Interface
  interface LogOutResponse_Interface {
    status: Boolean!
  }

  #Logout - Response Type
  type LogOutResponse implements LogOutResponse_Interface {
    status: Boolean!
  }
`);
