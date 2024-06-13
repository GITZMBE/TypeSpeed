import { User } from "@prisma/client";

export interface ExtendedUser extends User {
  results: string[];
}

export default ExtendedUser;