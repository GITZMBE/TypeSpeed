import React, { useEffect, useRef, useState } from "react";
import LetterCoordinate from "../models/LetterCoordinate";
import { useNavigate } from "react-router-dom";
import Letter from "../components/Letter";
import TypingResult from "../models/TypingResult";
import { useSetRecoilState } from "recoil";
import { TypingResultState } from "../recoil/states";
import DIFFECULTY from "../models/DIFFECULTY";
import TypingSettings from "../models/TypingSettings";
import HorizontalDivider from "../components/HorizontalDivider";
import { TbSquareLetterA } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
var randomWord = require("random-word-by-length");

const TypePage = () => {
  const navigate = useNavigate();
  const setResult = useSetRecoilState(TypingResultState);
  const [settings, setSettings] = useState<TypingSettings>({
    difficulty: DIFFECULTY.NORMAL,
    wordsAmount: null,
    selectedTime: null,
  });
  const [settingsType, setSettingsType] = useState<string>("words");
  const [testHasStarted, setTestHasStarted] = useState(false);
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
    FetchRandomWords()
      .then((res) => {
        setWords(res);
        setDisplayWords(res);
      });
  }, [words, displayWords]);

  const startTimer = () => {
    if (!settings.selectedTime || !time) return;

    let t = 1;
    const interval = setInterval(() => {
      if (time === t && settings.selectedTime) {
        finishTest();
        clearInterval(interval);
        return;
      }
      setTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      t++;
    }, 1000);
  };

  const startTest = () => {
    if (wordIndex === 0 && letterIndex === 0) {
      if (settings.wordsAmount) {
        setResult(null);
        setStartTime(new Date().getTime());
        setTestHasStarted(true);
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

  const setToDefault = () => {
    setSettings({
      difficulty: DIFFECULTY.NORMAL,
      wordsAmount: null,
      selectedTime: null,
    });
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

  const finishTest = () => {
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000;
      setResult(
        new TypingResult(
          duration,
          displayWords.length,
          calculateWrongWords(wrongLetters)
        )
      );
      navigate(`/stats`);
      setToDefault();
      return;
    };
    if (settings.selectedTime) {
      setResult(
        new TypingResult(
          settings.selectedTime,
          wordIndexRef.current,
          calculateWrongWords(wrongLettersRef.current)
        )
      );
      navigate(`/stats`);
      setToDefault();
      return;
    }
  };

  useEffect(() => {
    finishTest();
  }, [startTime, endTime]);

  useEffect(() => {
    FetchRandomWords().then((res) => {
      setWords(res);
      return res;
    });
    if (!settings.wordsAmount) {
      setDisplayWords(words);
      return;
    }
    const newWordArray = [];
    for (let i = 0; i < settings.wordsAmount; i++) {
      newWordArray.push(words[i]);
    }
    setDisplayWords(newWordArray);
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

  // const wpm = startTime ? (60 * wordIndex / ((new Date().getTime() - startTime) / 1000 / 60)) : undefined;
  // const cpm = startTime ? (60 * correctLetters.length / ((new Date().getTime() - startTime) / 1000 / 60)) : undefined;

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
            {/* <p>{wpm ? wpm.toFixed(2) : undefined} wpm</p>
            <p>{cpm ? cpm.toFixed(2) : undefined} cpm</p> */}
          </div>
        </div>
          <div className={`w-full flex transition-opacity duration-300 ${testHasStarted && "opacity-0"}`}>
            <div className='flex justify-center items-center'>
              {[DIFFECULTY.EASY, DIFFECULTY.NORMAL, DIFFECULTY.HARD].map((d) => (
                <button
                  key={d}
                  className={`text-xl ${
                    settings.difficulty === d
                      ? "text-yellowAcent"
                      : "text-secondary hover:text-light"
                  } p-2 text-nowrap`}
                  onClick={() => setSettings({ ...settings, difficulty: d })}
                >
                  {DIFFECULTY[d]}
                </button>
              ))}
            </div>
            <HorizontalDivider />
            <div className="flex flex-grow">
              {["time", "words"].map(type => (
                <button key={type} onClick={() => setSettingsType(type)} className={`flex items-center gap-2 text-xl ${ settingsType === type ? "text-yellowAcent" : "text-secondary hover:text-light"} p-2`}>{type === "words" ? (<TbSquareLetterA size={24} />) : type === "time" ? (<MdAccessTimeFilled size={24} />) : (<></>)} {type}</button>
              ))}
            </div>
            <HorizontalDivider />
            {settingsType === "time" ? (
              <div className='flex justify-center items-center'>
                {[10, 30, 60, null].map((leng) => (
                  <button
                    key={leng}
                    className={`text-xl ${
                      settings.selectedTime === leng
                        ? "text-yellowAcent"
                        : "text-secondary hover:text-light"
                    } p-2 text-nowrap`}
                    onClick={() =>
                      leng === null
                        ? (setSettings((prevSettings) => ({
                            ...prevSettings,
                            selectedTime: leng,
                          })),
                          setTime(leng))
                        : (setSettings((prevSettings) => ({
                            ...prevSettings,
                            selectedTime: leng,
                          })),
                          setTime(leng),
                          setSettings((prevSettings) => ({
                            ...prevSettings,
                            wordsAmount: null,
                          })))
                    }
                  >
                    {leng === null ? "No limit" : leng}
                  </button>
                ))}
              </div>
            ) : settingsType === "words" ? (
              <div className='flex justify-center items-center'>
                  {[10, 15, 20, null].map((leng) => (
                    <button
                      key={leng}
                      className={`text-xl ${
                        settings.wordsAmount === leng
                          ? "text-yellowAcent"
                          : "text-secondary hover:text-light"
                      } p-2 text-nowrap`}
                      onClick={() =>
                        leng === null
                          ? setSettings((prevSettings) => ({
                              ...prevSettings,
                              wordsAmount: leng,
                            }))
                          : (setSettings((prevSettings) => ({
                              ...prevSettings,
                              wordsAmount: leng,
                            })),
                            setSettings((prevSettings) => ({
                              ...prevSettings,
                              selectedTime: null,
                            })),
                            setTime(null))
                      }
                    >
                      {leng === null ? "No limit" : leng}
                    </button>
                  ))}
              </div>
            ) : (<></>)}
          </div>
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

export default TypePage;
