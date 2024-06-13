import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatsChart from "../components/StatsChart";
import { useRecoilState } from "recoil";
import { TypingResultState } from "../recoil/states";
import Tippy from '@tippyjs/react';
import ToolTip from "../components/ToolTip";

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
              <div className="flex flex-col gap-2">
                <span className="text-4xl text-secondary font-medium">wpm</span>
                <ToolTip content={
                  <span className="text-xl text-light">
                    {((60 * (result.words - result.wrong_words)) / result.time).toFixed(3)} wpm
                  </span>
                }>
                  <span className='w-fit font-bold text-6xl text-yellowAcent'>
                    {((60 * (result.words - result.wrong_words)) / result.time).toFixed(0)}
                  </span>
                </ToolTip>
                
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl text-secondary font-medium">acc</span>
                <ToolTip content={
                  <span className='w-fit text-xl text-light'>
                    {((100 * (result.words - result.wrong_words)) / result.words).toFixed(3)} %
                  </span>
                }>
                  <span className='font-bold text-6xl text-yellowAcent'>
                    {((100 * (result.words - result.wrong_words)) / result.words).toFixed(0)}%
                  </span>
                </ToolTip>                
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <StatsChart data={result} className="w-full max-w-[80vw] h-full" />
            </div>
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
          </div>
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
