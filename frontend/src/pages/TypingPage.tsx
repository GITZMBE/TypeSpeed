import React, { useEffect, useRef, useState } from "react";
import LetterCoordinate from "../models/LetterCoordinate";
import { useNavigate } from "react-router-dom";
import { Letter } from "../components/ui";
import TypingResult from "../models/TypingResult";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SettingsState, TypingResultState } from "../recoil/states";
import DIFFECULTY from "../models/DIFFECULTY";
import { Container, CurrentSpeedbar, Settingsbar } from "../components/layout";
import { calcAccuracy, calcCpm, calcNetWpm, calculateMode } from "../utils";
import TypingResultDto from "models/TypingResultDto";
import { saveResult } from "api/api";
var randomWord = require("random-word-by-length");

export const TypingPage = () => {
  const navigate = useNavigate();
  const setResult = useSetRecoilState(TypingResultState);
  const [settings, setSettings] = useRecoilState(SettingsState);
  
  const [testHasStarted, setTestHasStarted] = useState(false);
  const [time, setTime] = useState<number | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [displayWords, setDisplayWords] = useState<string[]>([]);

  const [currentWpm, setCurrentWpm] = useState<number | null>(null);
  const [currentCpm, setCurrentCpm] = useState<number | null>(null);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const wpmHistoryRef = useRef<number[]>(wpmHistory);

  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const [searchbarFocus, setSearchbarFocus] = useState<boolean>(true);

  const [correctLetters, setCorrectLetters] = useState<LetterCoordinate[]>([]);
  const [wrongLetters, setWrongLetters] = useState<LetterCoordinate[]>([]);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const wordIndexRef = useRef(wordIndex);
  const letterIndexRef = useRef(letterIndex);
  const correctLettersRef = useRef(correctLetters);
  const wrongLettersRef = useRef(wrongLetters);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    wordIndexRef.current = wordIndex;
  }, [wordIndex]);

  useEffect(() => {
    letterIndexRef.current = letterIndex;
  }, [letterIndex]);

  useEffect(() => {
    correctLettersRef.current = correctLetters;
  }, [correctLetters]);

  useEffect(() => {
    wrongLettersRef.current = wrongLetters;
  }, [wrongLetters]);

  useEffect(() => {
    wpmHistoryRef.current = wpmHistory;
  }, [wpmHistory]);

  useEffect(() => {
    if (words.length > 0 && displayWords.length > 0) return;
    FetchRandomWords()
      .then((res) => {
        setWords(res);
        setDisplayWords(res);
      });
  }, [words, displayWords]);

  const startTimer = () => {
    if (!settings.selectedTime || !time) return;

    let t = 1;
    intervalRef.current = setInterval(() => {
      const wpm = calcNetWpm(correctLettersRef.current.length + wrongLettersRef.current.length, t / 60, wrongLettersRef.current.length);
      setCurrentWpm(wpm);
      setWpmHistory((prevHistory) => [...prevHistory, wpm]);
      const cpm = calcCpm(correctLettersRef.current.length + wrongLettersRef.current.length, t / 60, wrongLettersRef.current.length);
      setCurrentCpm(cpm);
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
      const wpm = calcNetWpm(correctLettersRef.current.length + wrongLettersRef.current.length, (currentTime - startTime) / 1000 / 60, wrongLettersRef.current.length);
      setCurrentWpm(wpm);
      setWpmHistory((prevHistory) => [...prevHistory, wpm]);
      const cpm = calcCpm(correctLettersRef.current.length + wrongLettersRef.current.length, (currentTime - startTime) / 1000 / 60, wrongLettersRef.current.length);
      setCurrentCpm(cpm);
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
          setCorrectLetters((prev) => [...prev, new LetterCoordinate(wordIndex, activeWord.length)])
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
          setCorrectLetters((prev) => prev.filter(e => e.letterCoord !== words[wordIndexRef.current - 1].length && e.wordCoord !== wordIndex - 1));
          setLetterIndex(words[wordIndex - 1].length);
          setWordIndex(wordIndex - 1);
        }
      }
    }
  }, [searchbarFocus, displayWords, wordIndex, letterIndex]);

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
      difficulty: DIFFECULTY.RANDOM,
      wordsAmount: 10,
      selectedTime: null,
    });
    setTime(null);
    setWords([]);
    setCurrentWpm(null);
    setCurrentCpm(null);
    setWpmHistory([]);
    setWordIndex(0);
    setLetterIndex(0);
    setSearchbarFocus(false);
    setCorrectLetters([]);
    setWrongLetters([]);
    setStartTime(null);
    setEndTime(null);
  };

  const finishTest = async () => {
    if (!settings.selectedTime && !endTime) return;

    let dto: TypingResultDto;

    // words
    if (startTime && endTime) {
      const duration = Number(((endTime - startTime) / 1000 / 60).toFixed(3));
      setResult(
        new TypingResult(
          correctLettersRef.current.length,
          wrongLettersRef.current.length,
          duration,
          wpmHistory,
          calculateMode(settings)
        )
      );
      dto = new TypingResultDto(
        calcNetWpm(correctLettersRef.current.length + wrongLettersRef.current.length, duration, wrongLettersRef.current.length), 
        calcAccuracy(correctLettersRef.current.length + wrongLettersRef.current.length, duration, wrongLettersRef.current.length),
        correctLettersRef.current.length,
        duration,
        wrongLettersRef.current.length,
        calculateMode(settings)
      );
    // time
    } else if (!startTime && settings.selectedTime && !endTime) {
      setResult(
        new TypingResult(
          correctLettersRef.current.length,
          wrongLettersRef.current.length,
          Number((settings.selectedTime / 60).toFixed(3)),
          wpmHistoryRef.current,
          calculateMode(settings)
        )
      );
      dto = new TypingResultDto(
        calcNetWpm(correctLettersRef.current.length + wrongLettersRef.current.length, Number((settings.selectedTime / 60).toFixed(3)), wrongLettersRef.current.length), 
        calcAccuracy(correctLettersRef.current.length + wrongLettersRef.current.length, Number((settings.selectedTime / 60).toFixed(3)), wrongLettersRef.current.length),
        correctLettersRef.current.length,
        Number((settings.selectedTime / 60).toFixed(3)),
        wrongLettersRef.current.length,
        calculateMode(settings)
      );
    }

    saveResult(dto);
    navigate(`/result`);
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
            ? 8
            : settings.difficulty === DIFFECULTY.RANDOM 
            ? Math.floor(1 + Math.random() * 8) :
            Math.floor(1 + Math.random() * 8)
        );
        wordsArray.push(random);
      }
      return wordsArray;
    } catch (error) {
      return [];
    }
  };

  return (
    <Container
      onClick={(e: any) => {
        setSearchbarFocus(false);
      }}
    >
      <div className='w-full flex flex-col gap-4'>
        {testHasStarted && (
          <CurrentSpeedbar currentWpm={currentWpm} currentCpm={currentCpm} testHasStarted={testHasStarted} />
        )}
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
    </Container>
  );
};

export default TypingPage;
