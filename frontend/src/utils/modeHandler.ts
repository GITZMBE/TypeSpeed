import { TypingSettings } from "../models";
import { Mode } from '@prisma/client';

/**
 * 
 * @param settings 
 * @returns returns a mode enum delared in prisma and defaults to WORDS10
 */
export const calculateMode = (settings: TypingSettings) => {
  if (settings.selectedTime) {
    switch (settings.selectedTime) {
      case 15:
        return Mode.TIME15;
      case 30:
        return Mode.TIME30;
      case 60:
        return Mode.TIME30;
      default:
        break;
    }
  } else if (settings.wordsAmount) {
    switch (settings.wordsAmount) {
      case 10:
        return Mode.WORDS10;
      case 15:
        return Mode.WORDS15;
      case 20:
        return Mode.WORDS20;
      default:
        break;
    }
  }
  return Mode.WORDS10;
};