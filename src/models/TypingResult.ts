class TypingResult {
  correctEntries: number;
  wrongEntries: number;
  time!: number;
  history: number[] = [];

  constructor(correctEntries: number, wrongEntries: number, time: number, history: number[]) {
    this.correctEntries = correctEntries;
    this.wrongEntries = wrongEntries;
    this.time = time;
    this.history = history;
  }
};

export default TypingResult;