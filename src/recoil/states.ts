import { atom } from "recoil";
import TypingResult from "../classes/TypingResult";

export const TypeResultState = atom<TypingResult | undefined>({
  key: "TypeResultState",
  default: undefined
});