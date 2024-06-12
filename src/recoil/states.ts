import { atom } from "recoil";
import TypingResult from "../models/TypingResult";

export const TypingResultState = atom<TypingResult | null>({
  key: "TypeResultState",
  default: null,
});
