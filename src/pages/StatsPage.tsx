import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const StatsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState<string | null>(null);
  const [words, setWords] = useState<string | null>(null);
  const [wrongWords, setWrongWords] = useState<string | null>(null);

  useEffect(() => {
    setTime(searchParams.get('time'));
    setWords(searchParams.get('words'));
    setWrongWords(searchParams.get('wrong_words') || '0');
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl text-yellowAcent font-robotoMono">StatsPage</h1>
      {(time && words) && (
        <>
          <div className="flex items-center gap-4 text-secondary">
            <span>words: {words}</span>
            <span>time: {Number(time).toFixed(3)} s</span>
            <span className={Number(wrongWords) > 1 ? "text-red-500" : Number(wrongWords) > 0 ? "text-yellow-500" : "text-green-500"}>wrong words: {Number(wrongWords)}</span>
            <span className="text-2xl">accuracy: {(100 * (Number(words) - Number(wrongWords)) / Number(words)).toFixed(3)}%</span>
          </div>
          <p className="font-bold text-xl text-secondary">{(60 * (Number(words) - Number(wrongWords)) / Number(time)).toFixed(3)} wpm</p>
          <Link to="/typing" className="text-5xl text-secondary hover:text-light">Try again</Link>
        </>
      )}
    </div>
  );
};

export default StatsPage;
