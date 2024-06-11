import React, { useEffect, useRef, useState } from "react";
import LetterCoordinate from "../classes/LetterCoordinate";
import { useNavigate } from "react-router-dom";
import Letter from "../components/Letter";

const TypePage = () => {
  const navigate = useNavigate();
  const [sentenceLength, setSentenceLength] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [displayWords, setDisplayWords] = useState<string[]>([]);

  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const [searchbarFocus, setSearchbarFocus] = useState<boolean>(false);

  const [correctLetters, setCorrectLetters] = useState<LetterCoordinate[]>([]);
  const [wrongLetters, setWrongLetters] = useState<LetterCoordinate[]>([]);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const wordIndexRef = useRef(wordIndex);
  const wrongLettersRef = useRef(wrongLetters);

  useEffect(() => {
    wordIndexRef.current = wordIndex;
  }, [wordIndex]);

  useEffect(() => {
    wrongLettersRef.current = wrongLetters;
  }, [wrongLetters]);

  useEffect(() => {
    if (words.length > 0 && displayWords.length > 0) return;
    FetchRandomWords().then(res => {
      setWords(res); 
      return res;
    }).then(w => {
      w.length > 0 && setDisplayWords(w)
    });
  }, [words, displayWords]);
  
  const startTimer = () => {
    if (!selectedTime || !time) return;

    let t = 1;
    const interval = setInterval(() => {
      if (time === t) {
        navigate(`/stats?time=${selectedTime}&words=${wordIndexRef.current}&wrong_words=${calculateWrongWords(wrongLettersRef.current)}`);
        setToDefault();
        clearInterval(interval);
        return;
      }
      setTime(prevTime => prevTime !== null ? prevTime - 1 : null);
      t++;
    }, 1000);
  };

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
      const activeWord = words[wordIndex];
      const activeLetter = activeWord[letterIndex];

      if (wordIndex === 0 && letterIndex === 0) {
        if (sentenceLength) {
          setStartTime(new Date().getTime());
        } else if (selectedTime) {
          startTimer();
        }
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
          setLetterIndex(words[wordIndex - 1].length);
          setWordIndex(wordIndex - 1);
        }
      }
    }
  }, [searchbarFocus, wordIndex, letterIndex]);

  useEffect(() => {
    if (sentenceLength) {
      if (
        wordIndex === displayWords.length - 1 &&
        letterIndex === displayWords[displayWords.length - 1].length
      ) {
        setEndTime(new Date().getTime());
      }
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
    setSentenceLength(null);
    setSelectedTime(null);
    setTime(null);
    setWords([]);
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
      navigate(`/stats?time=${duration}&words=${displayWords.length}&wrong_words=${calculateWrongWords(wrongLetters)}`);
      setToDefault();
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (!sentenceLength) return;
    const newWordArray = [];
    for (let i = 0; i < sentenceLength; i++) {
      newWordArray.push(words[i]);
    }
    setDisplayWords(newWordArray);
  }, [sentenceLength]);

  const FetchRandomWords = async (): Promise<string[]> => {
    try {
      const url: string = "https://random-word-api.herokuapp.com/word?number=100";
      const response = await fetch(url);
      const words = await response.json();
      return words;
    } catch (error) {
      return [];
    }
  };

  return (
    <div
      onClick={(e: any) => {
        setSearchbarFocus(false);
      }}
      className='w-full max-w-7xl h-full flex flex-col gap-8 justify-center items-center'
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex">
          {
            [10, 30, 60, null].map((leng) => (
              <button key={leng} className={`text-xl ${ time === leng ? "text-yellowAcent" : "text-secondary hover:text-light" } p-2 text-nowrap`} onClick={() => leng === null ? (setSelectedTime(leng), setTime(leng)) : (setSelectedTime(leng), setTime(leng), setSentenceLength(null))}>{ leng === null ? "no limit" : leng }</button>
            ))
          }
        </div>
        { time && (
          <div className="text-3xl text-secondary">
            {time}
          </div>
        )}
        <div className="flex">
          {
            [10, 15, 20, null].map((leng) => (
              <button key={leng} className={`text-xl ${ sentenceLength === leng ? "text-yellowAcent" : "text-secondary hover:text-light" } p-2 text-nowrap`} onClick={() => leng === null ? setSentenceLength(leng) : (setSentenceLength(leng), setSelectedTime(null), setTime(null))}>{ leng === null ? "no limit" : leng }</button>
            ))
          }
        </div>
      </div>
      <div
        onClick={(e: any) => {
          if (sentenceLength || selectedTime) {
            setSearchbarFocus(true);
            e.stopPropagation();
          }
        }}
        className='w-full h-64 flex overflow-y-hidden'
      >
        <div className="flex flex-wrap h-fit">
          {displayWords.map((word, i) => (
            <div key={i} className='word h-fit flex gap-[1px] m-2'>
              {word.split("").map((letter, j) => (
                <Letter key={j} correctLetters={correctLetters} wrongLetters={wrongLetters} word={word} wordIndex={wordIndex} letterIndex={letterIndex} currentWordIndex={i} currentLetterIndex={j} searchbarFocus={searchbarFocus} letter={letter} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypePage;
