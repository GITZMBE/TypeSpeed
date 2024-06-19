import { Result } from "@prisma/client";

export const calcLevel = (xp: number) => {
  return xp;
};

export const calcXpEared = (result: Result) => {
  let modifier = 1;
  if (Math.round(result.acc) === 100) {
    modifier += .5;
  }
  if (result.errors === 0) {
    modifier += .25;
  }
  const accuracyModifier = (result.acc - 50) / 50;
  return Math.round(result.time) * 2 * modifier * accuracyModifier;
};
