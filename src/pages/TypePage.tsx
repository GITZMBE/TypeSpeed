import React, { useEffect, useState } from "react";
import LetterCoordinate from "../classes/LetterCoordinate";
import { useNavigate } from "react-router-dom";
import Letter from "../components/Letter";

const TypePage = () => {
  const navigate = useNavigate();
  const [sentence, setSentence] = useState<string>("");
  const [wordArray, setWordArray] = useState<string[]>([]);

  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const [searchbarFocus, setSearchbarFocus] = useState<boolean>(false);

  const [correctLetters, setCorrectLetters] = useState<LetterCoordinate[]>([]);
  const [wrongLetters, setWrongLetters] = useState<LetterCoordinate[]>([]);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (sentence === "") {
      FetchRandomWord()
        .then(word => {
          return FetchDefinition(word);
        })
        .then(object => {
          if (object?.title === undefined) {
            for (const obj of object) {
              for (const meaning of obj.meanings) {
                for (const def of meaning.definitions) {
                  setSentence((prevSentence) => prevSentence + def.definition);
                }
              }
            }
          }
        });
      setSentence(sentence.trim());
    }
  }, [sentence]);

  useEffect(() => {
    setWordArray(sentence.split(" "));
  }, [sentence]);

  useEffect(() => {
    if (searchbarFocus) {
      document.addEventListener("keypress", KeyPress);
      document.addEventListener("keydown", KeyDown);
    } else {
      document.removeEventListener("keypress", KeyPress);
      document.removeEventListener("keydown", KeyDown);
    }

    return () => {
      document.removeEventListener("keypress", KeyPress);
      document.removeEventListener("keydown", KeyDown);
    };

    function KeyPress(e: any): void {
      const pressedKey = e.key;
      const activeWord = wordArray[wordIndex];
      const activeLetter = activeWord[letterIndex];

      if (wordIndex === 0 && letterIndex === 0) {
        setStartTime(new Date().getTime());
      }

      if (letterIndex < activeWord.length) {
        setLetterIndex(letterIndex + 1);
        if (pressedKey === activeLetter) {
          let arr: LetterCoordinate[] = [
            ...correctLetters,
            new LetterCoordinate(wordIndex, letterIndex),
          ];
          setCorrectLetters(arr);
        } else {
          let arr: LetterCoordinate[] = [
            ...wrongLetters,
            new LetterCoordinate(wordIndex, letterIndex),
          ];
          setWrongLetters(arr);
        }
      } else {
        if (pressedKey === " ") {
          setWordIndex(wordIndex + 1);
          setLetterIndex(0);
        }
      }
    }

    function KeyDown(e: any): void {
      const keyDown = e.key;
      if (keyDown === "Backspace") {
        if (letterIndex > 0) {
          setLetterIndex(letterIndex - 1);
          if (
            correctLetters.some(
              (coord) =>
                coord.letterCoord === letterIndex - 1 &&
                coord.wordCoord === wordIndex
            )
          ) {
            const filteredArray: LetterCoordinate[] = correctLetters.filter(
              (coord) =>
                coord.letterCoord !== letterIndex - 1 ||
                coord.wordCoord !== wordIndex
            );
            setCorrectLetters(filteredArray);
          }
          if (
            wrongLetters.some(
              (coord) =>
                coord.letterCoord === letterIndex - 1 &&
                coord.wordCoord === wordIndex
            )
          ) {
            const filteredArray: LetterCoordinate[] = wrongLetters.filter(
              (coord) =>
                coord.letterCoord !== letterIndex - 1 ||
                coord.wordCoord !== wordIndex
            );
            setWrongLetters(filteredArray);
          }
        } else if (letterIndex === 0 && wordIndex > 0) {
          setLetterIndex(wordArray[wordIndex - 1].length);
          setWordIndex(wordIndex - 1);
        }
      }
    }
  }, [searchbarFocus, wordIndex, letterIndex]);

  useEffect(() => {
    if (
      wordIndex === wordArray.length - 1 &&
      letterIndex === wordArray[wordArray.length - 1].length
    ) {
      setEndTime(new Date().getTime());
    }
  }, [wordIndex, letterIndex]);

  const calculateWrongWords = (wrongLetters: LetterCoordinate[]) => {
    let wrongWords: LetterCoordinate[] = [];
    for (const letterCoord of wrongLetters) {
      const isOtherLetterInWord = wrongWords.some(c => c.wordCoord === letterCoord.wordCoord);
      if (isOtherLetterInWord) {
        continue;
      }
      wrongWords = [...wrongWords, letterCoord];
    }
    return wrongWords.length;
  };

  const setToDefault = () => {
    setSentence("");
    setWordArray([]);
    setWordIndex(0);
    setLetterIndex(0);
    setSearchbarFocus(false);
    setCorrectLetters([]);
    setWrongLetters([]);
    setStartTime(null);
    setEndTime(null);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000;
      navigate(`/stats?time=${duration}&words=${wordArray.length}&wrong_words=${calculateWrongWords(wrongLetters)}`);
      setToDefault();
    }
  }, [startTime, endTime]);

  const FetchRandomWord = async (): Promise<string> => {
    try {
      const url: string = "https://random-word-api.herokuapp.com/word";
      const response = await fetch(url);
      const results = await response.json();
      const word: string = await results[0];
      return word;
    } catch (error) {
      return "";
    }
  };

  const FetchDefinition = async (word: string): Promise<any> => {
    const url: string = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const results = await response.json();
    return results;
  };

  return (
    <div
      onClick={(e: any) => {
        setSearchbarFocus(false);
      }}
      className='w-full h-full flex flex-col gap-8 justify-center items-center'
    >
      <div
        onClick={(e: any) => {
          setSearchbarFocus(true);
          e.stopPropagation();
        }}
        className='flex flex-wrap'
      >
        {wordArray.map((word, i) => (
          <div key={i} className='word flex gap-[1px] m-2'>
            {word.split("").map((letter, j) => (
              <Letter key={j} correctLetters={correctLetters} wrongLetters={wrongLetters} word={word} wordIndex={wordIndex} letterIndex={letterIndex} currentWordIndex={i} currentLetterIndex={j} searchbarFocus={searchbarFocus} letter={letter} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypePage;
