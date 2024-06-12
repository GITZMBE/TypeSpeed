class TypingResult {
  time!: number;
  words!: number;
  wrong_words!: number;
  history: number[] = [];

  constructor(time: number, words: number, wrong_words: number, history: number[]) {
    this.time = time;
    this.words = words;
    this.wrong_words = wrong_words;
    this.history = history;
  }
};

export default TypingResult;