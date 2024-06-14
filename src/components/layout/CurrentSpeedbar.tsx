import React from "react";

interface IProps {
  currentWpm: number | null;
  currentCpm: number | null;
  testHasStarted: boolean;
}

export const CurrentSpeedbar = ({ currentWpm, currentCpm, testHasStarted }: IProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 justify-center items-center text-xl text-secondary transition-opacity duration-300 opacity-0 ${ testHasStarted && 'opacity-100' }`}>
      <h2 className="text-3xl text-yellowAcent">Current Speed</h2>
      <div className='flex gap-12 items-center'>
        {currentWpm && <p>{currentWpm.toFixed(0)} wpm</p>}
        {currentCpm && <p>{currentCpm.toFixed(0)} cpm</p>}
      </div>
    </div>
  );
};

export default CurrentSpeedbar;
