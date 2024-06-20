import { Result, User } from "@prisma/client";

export interface ExtendedResult extends Result {
  user: User;
};

export default ExtendedResult;