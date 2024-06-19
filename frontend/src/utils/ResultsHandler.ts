import { Mode, Result } from "@prisma/client";

export const sliceResult = (results: Result[], quantity: number = results.length) => {
  return results.slice(0, quantity);
};

export const calcTopResults = (results: Result[], quantity: number = results.length) => {
  const sorted = [...results].sort((a, b) => b.wpm - a.wpm);
  return sliceResult(sorted, quantity);
};

export const sortResultDate = (results: Result[], quantity: number = results.length) => {
  const sorted = [...results].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return sliceResult(sorted, quantity);
};

export const filterModeResults = (results: Result[], mode: Mode) => {
  return results.filter(result => result.mode === mode);
};
