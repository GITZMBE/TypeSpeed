import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import StatsChart from "../components/StatsChart";
import TypingResult from "../models/TypingResult";
import { useRecoilState } from "recoil";
import { TypingResultState } from "../recoil/states";

const StatsPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useRecoilState(TypingResultState);

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
      <h1 className='text-5xl text-yellowAcent font-robotoMono'>StatsPage</h1>
      {result && (
        <>
          <div className="w-full h-2/5 flex gap-4">
            <div className="flex flex-col gap-4">

            </div>
            <StatsChart data={result} className="w-full" />
          </div>
          
          <div className='flex items-center gap-4 text-secondary'>
            <span>words: {result.words}</span>
            <span>time: {result.time.toFixed(3)} s</span>
            <span
              className={
                result.wrong_words > 1
                  ? "text-red-500"
                  : result.wrong_words > 0
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            >
              wrong words: {result.wrong_words}
            </span>
            <span className='text-2xl'>
              accuracy:{" "}
              {(
                (100 * (result.words - result.wrong_words)) /
                result.words
              ).toFixed(3)}
              %
            </span>
          </div>
          <p className='font-bold text-xl text-secondary'>
            {((60 * (result.words - result.wrong_words)) / result.time).toFixed(
              3
            )}{" "}
            wpm
          </p>
          <Link
            to='/typing'
            onClick={() => setResult(null)}
            className='text-5xl text-secondary hover:text-light'
          >
            Try again
          </Link>
        </>
      )}
    </div>
  );
};

export default StatsPage;
