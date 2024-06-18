import { Mode } from '@prisma/client';

class TypingResultDto {
  public wpm?: number;
  public acc?: number;
  public entries?: number;
  public time?: number;
  public errors?: number;
  public mode?: Mode;

  constructor(wpm: number, acc: number, entries: number, time: number, errors: number, mode: Mode) {
    this.wpm = wpm;
    this.acc = acc;
    this.entries = entries;
    this.time = time;
    this.errors = errors;
    this.mode = mode;
  }
};

export default TypingResultDto;