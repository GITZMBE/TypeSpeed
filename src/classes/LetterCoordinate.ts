class LetterCoordinate {
  wordCoord: number;
  letterCoord: number;

  constructor(wordIndex: number, letterIndex: number) {
    this.wordCoord = wordIndex;
    this.letterCoord = letterIndex;
  }
}

export default LetterCoordinate;