import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TypingResultState } from "../recoil/states";
import ToolTip from "../components/ui/ToolTip";
import StatsChart from "../components/layout/StatsChart";
import { calcAccuracy, calcCpm, calcNetWpm } from "../utils";
import { Container } from "components/layout";

const ResultPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useRecoilState(TypingResultState);

  useEffect(() => {
    if (!result) {
      navigate("/");
      return;
    }
  }, [result, navigate]);

  return (
    <Container>
      <h1 className='text-5xl text-yellowAcent font-robotoMono'>Result</h1>
      {result && (
        <>
          <div className="w-full h-2/5 flex gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-4xl text-secondary font-medium">wpm</span>
                <ToolTip content={
                  <span className="text-xl text-light">
                    {calcNetWpm(result.correctEntries + result.wrongEntries, result.time, result.wrongEntries)} wpm
                  </span>
                }>
                  <span className='w-fit font-bold text-6xl text-yellowAcent'>
                    {calcNetWpm(result.correctEntries + result.wrongEntries, result.time, result.wrongEntries).toFixed(0)}
                  </span>
                </ToolTip>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl text-secondary font-medium">cpm</span>
                <ToolTip content={
                  <span className="text-xl text-light">
                    {calcCpm(result.correctEntries + result.wrongEntries, result.time, result.wrongEntries)} cpm
                  </span>
                }>
                  <span className='w-fit font-bold text-6xl text-yellowAcent'>
                    {calcCpm(result.correctEntries + result.wrongEntries, result.time, result.wrongEntries).toFixed(0)}
                  </span>
                </ToolTip>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl text-secondary font-medium">acc</span>
                <ToolTip content={
                  <span className='w-fit text-xl text-light'>
                    {calcAccuracy(result.correctEntries + result.wrongEntries, result.time, result.wrongEntries)} %
                  </span>
                }>
                  <span className='font-bold text-6xl text-yellowAcent'>
                    {calcAccuracy(result.correctEntries + result.wrongEntries, result.time, result.wrongEntries).toFixed(0)}%
                  </span>
                </ToolTip>                
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <StatsChart data={result} className="w-full max-w-[80vw] h-full min-h-[40vh]" />
            </div>
          </div>
          <div className='flex items-center gap-4 text-secondary'>
            <span>raw: {result.correctEntries + result.wrongEntries}</span>
            <span>time: {(result.time * 60).toFixed(3)} s</span>
            <span
              className={
                result.wrongEntries > 1
                  ? "text-red-500"
                  : result.wrongEntries > 0
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            >
              inaccuracies: {result.wrongEntries}
            </span>
          </div>
          <Link
            to='/typing'
            onClick={() => setResult(null)}
            className='text-5xl text-secondary hover:text-light focus:text-light p-4 focus:border-2 rounded-lg outline-none'
          >
            Try again
          </Link>
        </>
      )}
    </Container>
  );
};

export default ResultPage;
