import { ApiResource } from "../utils/types";

export interface Message extends ApiResource {
  createdAt?: string;
  text?: string;
  conversation?: string;
  userKind?: number;
}
