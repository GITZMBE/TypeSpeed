import { Result } from "@prisma/client";
import { LevelInfo } from "models/LevelInfo";

export const addUnitToXp = (xp: number) => {
  if (xp >= 1000) {
    return (xp / 1000).toFixed(1) + 'k';
  } else {
    return xp.toString();
  }
};

export const calcLevel = (xp: number): LevelInfo => {
  const base = 50;
  let level = 1;
  let remainingXp = xp;

  while (remainingXp >= level * base) {
    remainingXp -= level * base;
    level++;
  }

  const nextLevelXp = (level + 1) * base;
  const xpToNextLevel = nextLevelXp - remainingXp;

  return { level, xpForLevel: remainingXp + xpToNextLevel, remainingXp: remainingXp, xpToNextLevel: xpToNextLevel };
};

export const calcEaredXp = (result: Result) => {
  let modifier = 0;
  if (Math.round(result.acc) === 100) {
    modifier += .5;
  }
  if (result.errors === 0) {
    modifier += .25;
  }
  const accuracyModifier = (result.acc - 50) / 50;
  return Math.round(result.time * 60) * 2 * modifier * accuracyModifier;
};
