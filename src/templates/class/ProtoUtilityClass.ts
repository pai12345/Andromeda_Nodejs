import {
  Proto_Utility_interface,
  GenerateMessage_graphql_input_interface,
} from "../../utility/utility";

/**
 * Template - Utility Class Prototype
 * @description
 * Base Template for Utility Class Prototype
 */
abstract class Proto_Utility implements Proto_Utility_interface {
  abstract Validate_Data(data: string, type: string): boolean | string;
  abstract GenerateMessage_graphql(
    data: GenerateMessage_graphql_input_interface
  ): any;
}

export default Proto_Utility;
