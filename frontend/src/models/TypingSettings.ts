import DIFFECULTY from "./DIFFECULTY";

export interface TypingSettings {
  difficulty: DIFFECULTY;
  wordsAmount: number | null;
  selectedTime: number | null;
};

export default TypingSettings;