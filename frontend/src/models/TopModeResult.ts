import { Result } from "@prisma/client";

export class TopModeResult {
  words10?: Result;
  words15?: Result;
  words20?: Result;
  time15?: Result;
  time30?: Result;
  time60?: Result;

  constructor(words10: Result | null, words15: Result | null, words20: Result | null, time15: Result | null, time30: Result | null, time60: Result | null) {
    this.words10 = words10;
    this.words15 = words15;
    this.words20 = words20;
    this.time15 = time15;
    this.time30 = time30;
    this.time60 = time60;
  }
}

export default TopModeResult;