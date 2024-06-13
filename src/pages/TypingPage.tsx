import React, { useEffect, useRef, useState } from "react";
import LetterCoordinate from "../models/LetterCoordinate";
import { useNavigate } from "react-router-dom";
import { Letter } from "../components/ui";
import TypingResult from "../models/TypingResult";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SettingsState, TypingResultState } from "../recoil/states";
import DIFFECULTY from "../models/DIFFECULTY";
import { Settingsbar } from "../components/layout";
var randomWord = require("random-word-by-length");

const TypingPage = () => {
  const navigate = useNavigate();
  const setResult = useSetRecoilState(TypingResultState);
  const [settings, setSettings] = useRecoilState(SettingsState);
  
  const [testHasStarted, setTestHasStarted] = useState(false);
  const [time, setTime] = useState<number | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [displayWords, setDisplayWords] = useState<string[]>([]);

  const [currentWpm, setCurrentWpm] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const historyRef = useRef<number[]>(history);

  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const [searchbarFocus, setSearchbarFocus] = useState<boolean>(false);

  const [correctLetters, setCorrectLetters] = useState<LetterCoordinate[]>([]);
  const [wrongLetters, setWrongLetters] = useState<LetterCoordinate[]>([]);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const wordIndexRef = useRef(wordIndex);
  const letterIndexRef = useRef(letterIndex);
  const wrongLettersRef = useRef(wrongLetters);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    wordIndexRef.current = wordIndex;
  }, [wordIndex]);

  useEffect(() => {
    wrongLettersRef.current = wrongLetters;
  }, [wrongLetters]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    if (words.length > 0 && displayWords.length > 0) return;
    FetchRandomWords()
      .then((res) => {
        setWords(res);
        setDisplayWords(res);
      });
  }, [words, displayWords]);

  const calculateWrongWords = (wrongLetters: LetterCoordinate[]) => {
    let wrongWords: LetterCoordinate[] = [];
    for (const letterCoord of wrongLetters) {
      const isOtherLetterInWord = wrongWords.some(
        (c) => c.wordCoord === letterCoord.wordCoord
      );
      if (isOtherLetterInWord) {
        continue;
      }
      wrongWords = [...wrongWords, letterCoord];
    }
    return wrongWords.length;
  };

  const calcWpm = (elapsedTimeInMs: number) => {
    const fullWords = wordIndexRef.current - calculateWrongWords(wrongLettersRef.current);
    const notCompletedWords = letterIndexRef.current / displayWords[wordIndexRef.current].length;
    return Math.round(1000 * 60 * (fullWords + notCompletedWords) / elapsedTimeInMs);
  };

  const startTimer = () => {
    if (!settings.selectedTime || !time) return;

    let t = 1;
    intervalRef.current = setInterval(() => {
      const currentWpm = calcWpm(t * 1000);
      setCurrentWpm(currentWpm);
      setHistory((prevHistory) => [...prevHistory, currentWpm]);
      if (settings.selectedTime && t === time) {
        finishTest();
        clearInterval(intervalRef.current!);
        return;
      }
      setTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      t++;
    }, 1000);
  };

  const startHistoryTimer = () => {
    if (!startTime) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (
        wordIndex === displayWords.length - 1 &&
        letterIndex === displayWords[displayWords.length - 1].length
      ) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        return;
      }
      const currentTime = new Date().getTime();
      const currentWpm = calcWpm(currentTime - startTime);
      setCurrentWpm(currentWpm);
      setHistory((prevHistory) => [...prevHistory, currentWpm]);
    }, 1000);
  };
  
  const startTest = () => {
    if (wordIndex === 0 && letterIndex === 0) {
      // words
      if (settings.wordsAmount) {
        setResult(null);
        setStartTime(new Date().getTime());
        setTestHasStarted(true);
      // time
      } else if (settings.selectedTime) {
        startTimer();
        setTestHasStarted(true);
      }
    }
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
      const activeWord = displayWords[wordIndex];
      const activeLetter = activeWord[letterIndex];

      startTest();

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
    if (settings.wordsAmount) {
      if (
        wordIndex === displayWords.length - 1 &&
        letterIndex === displayWords[displayWords.length - 1].length
      ) {
        setEndTime(new Date().getTime());
      }
    }
  }, [wordIndex, letterIndex]);

  const setToDefault = () => {
    setTestHasStarted(false);
    setSettings({
      difficulty: DIFFECULTY.NORMAL,
      wordsAmount: 10,
      selectedTime: null,
    });
    setTime(null);
    setWords([]);
    setCurrentWpm(null);
    setHistory([]);
    setWordIndex(0);
    setLetterIndex(0);
    setSearchbarFocus(false);
    setCorrectLetters([]);
    setWrongLetters([]);
    setStartTime(null);
    setEndTime(null);
  };

  const finishTest = () => {
    if (!settings.selectedTime && !endTime) return;

    // words
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000;
      setResult(
        new TypingResult(
          duration,
          displayWords.length,
          calculateWrongWords(wrongLetters),
          history
        )
      );
    // time
    } else if (!startTime && settings.selectedTime && !endTime) {
      setResult(
        new TypingResult(
          settings.selectedTime,
          wordIndexRef.current,
          calculateWrongWords(wrongLettersRef.current),
          historyRef.current
        )
      );
    }
    
    navigate(`/stats`);
    setToDefault();
  };

  useEffect(() => {
    if (settings.wordsAmount && startTime) {
      startHistoryTimer();
    }
    finishTest();
  }, [startTime, endTime]);

  useEffect(() => {
    if (!settings.wordsAmount) {
      setDisplayWords(words);
      return;
    }
    const newWordArray = [];
    for (let i = 0; i < settings.wordsAmount; i++) {
      newWordArray.push(words[i]);
    }
    setDisplayWords(newWordArray);
  }, [words]);

  useEffect(() => {
    FetchRandomWords().then(setWords);
    if (settings.selectedTime) {
      setTime(settings.selectedTime);
      return;
    }
    setTime(null);
  }, [settings]);

  const FetchRandomWords = async (): Promise<string[]> => {
    try {
      const wordsArray: string[] = [];
      for (const _ of new Array(100)) {
        const random: string = randomWord(
          settings.difficulty === DIFFECULTY.EASY
            ? 3
            : settings.difficulty === DIFFECULTY.NORMAL
            ? 6
            : settings.difficulty === DIFFECULTY.HARD
            ? undefined
            : undefined
        );
        wordsArray.push(random);
      }
      return wordsArray;
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
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex flex-col justify-center items-center text-xl text-secondary'>
          <h2>Current Speed</h2>
          <div className='flex gap-8 items-center'>
            {(testHasStarted && currentWpm) && (
              <p>{currentWpm} wpm</p>
            )}
            {/* <p>{cpm ? cpm.toFixed(2) : undefined} cpm</p> */}
          </div>
        </div>
        <Settingsbar testHasStarted={testHasStarted} />
      </div>
      {(testHasStarted && time) && <div className='w-full text-3xl text-yellowAcent'>{time}</div>}
      <div
        onClick={(e: any) => {
          if (settings.wordsAmount || settings.selectedTime) {
            setSearchbarFocus(true);
            e.stopPropagation();
          }
        }}
        className='w-full h-64 flex overflow-y-hidden'
      >
        <div className='flex flex-wrap h-fit'>
          {displayWords.map((word, i) => (
            <div key={i} className='word h-fit flex gap-[1px] m-2'>
              {word.split("").map((letter, j) => (
                <Letter
                  key={j}
                  correctLetters={correctLetters}
                  wrongLetters={wrongLetters}
                  word={word}
                  wordIndex={wordIndex}
                  letterIndex={letterIndex}
                  currentWordIndex={i}
                  currentLetterIndex={j}
                  searchbarFocus={searchbarFocus}
                  letter={letter}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingPage;
