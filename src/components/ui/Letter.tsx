import React from "react";
import LetterCoordinate from "../../models/LetterCoordinate";

interface IProps {
  correctLetters: LetterCoordinate[];
  wrongLetters: LetterCoordinate[];
  word: string;
  wordIndex: number;
  letterIndex: number;
  currentWordIndex: number;
  currentLetterIndex: number;
  searchbarFocus: boolean;
  letter: string;
}

export const Letter = ({
  correctLetters,
  wrongLetters,
  word,
  wordIndex,
  letterIndex,
  currentWordIndex,
  currentLetterIndex,
  searchbarFocus,
  letter,
}: IProps) => {
  return (
    <p
      className={`letter selection:bg-transparent font-robotoMono text-3xl ${
        correctLetters.some(
          (coord) =>
            coord.letterCoord === currentLetterIndex &&
            coord.wordCoord === currentWordIndex
        )
          ? "text-light"
          : wrongLetters.some(
              (coord) =>
                coord.letterCoord === currentLetterIndex &&
                coord.wordCoord === currentWordIndex
            )
          ? "text-redAcent"
          : "text-secondary"
      } ${
        letterIndex === word.length &&
        currentLetterIndex === word.length - 1 &&
        currentWordIndex === wordIndex &&
        searchbarFocus
          ? "border-r-[2px] animate-blinkRightBorder"
          : currentWordIndex === wordIndex &&
            currentLetterIndex === letterIndex &&
            searchbarFocus
          ? "border-l-[2px] animate-blinkLeftBorder"
          : "border-l-0"
      }`}
    >
      {letter}
    </p>
  );
};

export default Letter;
