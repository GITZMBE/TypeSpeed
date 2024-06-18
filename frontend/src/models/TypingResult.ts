import { Mode } from '@prisma/client';

class TypingResult {
  correctEntries: number;
  wrongEntries: number;
  time!: number;
  history: number[] = [];
  mode: Mode;

  constructor(correctEntries: number, wrongEntries: number, time: number, history: number[], mode: Mode) {
    this.correctEntries = correctEntries;
    this.wrongEntries = wrongEntries;
    this.time = time;
    this.history = history;
    this.mode = mode;
  }
};

export default TypingResult;