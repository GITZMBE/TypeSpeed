import TypingSettings from "src/models/TypingSettings";
import { Mode } from '@prisma/client';

export const calculateMode = (settings: TypingSettings): Mode | void => {
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
  }
  if (settings.wordsAmount) {
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
};