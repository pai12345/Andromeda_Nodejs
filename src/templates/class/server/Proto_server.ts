import { Express } from "express";
import { Proto_GraphQLServer_Interface } from "../../../utility/Interface";

/**
 * Template - GraphQLServer Prototype
 * @description
 * Base Template for GraphQLServer Prototype
 */
abstract class Proto_GraphQLServer implements Proto_GraphQLServer_Interface {
  abstract add_configuration(): Express;
}

export default Proto_GraphQLServer;
