import { Mode, Result } from "@prisma/client";

export const calcTopResults = (results: Result[]) => {
  return results.sort((a, b) => b.wpm - a.wpm);
};

export const filterModeResults = (results: Result[], mode: Mode) => {
  return results.filter(result => result.mode === mode);
};
