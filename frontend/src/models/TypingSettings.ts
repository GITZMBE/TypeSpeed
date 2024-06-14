import DIFFECULTY from "./DIFFECULTY";

interface TypingSettings {
  difficulty: DIFFECULTY;
  wordsAmount: number | null;
  selectedTime: number | null;
};

export default TypingSettings;