import { ApiResource } from "../utils/types";

export interface Conversation extends ApiResource {
  createdAt?: string;
  nbMessages?: number;
  user?: string;
  bot?: string;
  messages?: string[];
}
