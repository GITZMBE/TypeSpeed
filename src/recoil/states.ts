import { atom } from "recoil";
import TypingResult from "../models/TypingResult";
import TypingSettings from "../models/TypingSettings";
import DIFFECULTY from "../models/DIFFECULTY";
import { User } from "@prisma/client";

export const TypingResultState = atom<TypingResult | null>({
  key: "TypingResult",
  default: null,
});

export const SettingsState = atom<TypingSettings>({
  key: "Settings",
  default: {
    difficulty: DIFFECULTY.RANDOM,
    wordsAmount: 10,
    selectedTime: null,
  }
});

export const CurrentUserState = atom<User | null>({
  key: "CurrentUser",
  default: null
});
