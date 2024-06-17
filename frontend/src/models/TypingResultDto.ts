

class TypingResultDto {
  public wpm?: number;
  public acc?: number;
  public entries?: number;
  public time?: number;
  public errors?: number;

  constructor(wpm: number, acc: number, entries: number, time: number, errors: number) {
    this.wpm = wpm;
    this.acc = acc;
    this.entries = entries;
    this.time = time;
    this.errors = errors;
  }
};

export default TypingResultDto;