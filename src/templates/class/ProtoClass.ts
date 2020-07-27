import { User_Authentication } from "../../utility/utility";
/**
 * Template - Utility Class
 * @description
 * Base Template for Utility Class
 */
export abstract class Proto_Utility {
  abstract Query_GetCustomer(username: string, password: string): string;
  abstract CheckUser_Authentication(data: User_Authentication): string;
}
