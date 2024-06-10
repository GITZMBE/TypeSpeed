import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const StatsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState<string>();
  const [words, setWords] = useState<string>();
  const [wrongWords, setWrongWords] = useState<string>();

  useEffect(() => {
    setTime(searchParams.get('time') || '0');
    setWords(searchParams.get('words') || '0');
    setWrongWords(searchParams.get('wrongWords') || '0');
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl text-yellowAcent font-robotoMono">StatsPage</h1>
      {(time && words) && (
        <>
          <div className="flex gap-4 text-secondary">
            <span>words: {words}</span>
            <span>time: {Number(time).toFixed(3)} s</span>
            <span className="text-red-500">wrong words: {Number(wrongWords)}</span>
          </div>
          <p className="font-bold text-xl text-secondary">{(60 * (Number(words) - Number(wrongWords)) / Number(time)).toFixed(3)} wpm</p>
          <Link to="/typing" className="text-5xl text-secondary hover:text-light">Try again</Link>
        </>
      )}
    </div>
  );
};

export default StatsPage;
