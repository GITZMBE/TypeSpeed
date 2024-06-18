import { Result, User } from "@prisma/client";

export interface ExtendedUser extends User {
  results: Result[];
}

export default ExtendedUser;