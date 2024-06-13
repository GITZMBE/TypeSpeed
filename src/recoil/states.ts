import { atom } from "recoil";
import TypingResult from "../models/TypingResult";
import TypingSettings from "../models/TypingSettings";
import DIFFECULTY from "../models/DIFFECULTY";

export const TypingResultState = atom<TypingResult | null>({
  key: "TypingResult",
  default: null,
});

export const SettingsState = atom<TypingSettings>({
  key: "Settings",
  default: {
    difficulty: DIFFECULTY.NORMAL,
    wordsAmount: null,
    selectedTime: null,
  }
});
