import { Result } from "@prisma/client";

export const calcTopResults = (results: Result[]) => {
  return results.sort((a, b) => b.wpm - a.wpm);
};