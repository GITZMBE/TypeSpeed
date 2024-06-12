class TypingResult {
  time!: number;
  words!: number;
  wrong_words!: number;

  constructor(time: number, words: number, wrong_words: number) {
    this.time = time;
    this.words = words;
    this.wrong_words = wrong_words;
  }
};

export default TypingResult;