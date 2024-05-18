import { ApiResource } from "../utils/types";

export interface User extends ApiResource {
  username?: string;
  roles?: string;
  password?: string;
  conversationUsers?: string[];
  conversationBots?: string[];
  userIdentifier?: string;
}
