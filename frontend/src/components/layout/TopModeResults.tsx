import { Mode, Result } from '@prisma/client';
import { ModeResults } from 'models';
import TopModeResult from 'models/TopModeResult';
import React, { useEffect, useState } from 'react';
import { calcTopResults, filterModeResults } from 'utils';

interface IProps {
  results: Result[];
}

export const TopModeResults = ({ results }: IProps) => {
  const [modeResults, setModeResults] = useState<ModeResults>(new ModeResults([], [], [], [], [], []));
  const [topModeResult, setTopModeResult] = useState<TopModeResult>(null);

  useEffect(() => {
    setModeResults(new ModeResults(
      filterModeResults(results, Mode.WORDS10),
      filterModeResults(results, Mode.WORDS15),
      filterModeResults(results, Mode.WORDS20),
      filterModeResults(results, Mode.TIME15),
      filterModeResults(results, Mode.TIME30),
      filterModeResults(results, Mode.TIME60),
    ));
  }, [results]);

  useEffect(() => {
    setTopModeResult(new TopModeResult(
      calcTopResults(modeResults.words10)[0],
      calcTopResults(modeResults.words15)[0],
      calcTopResults(modeResults.words20)[0],
      calcTopResults(modeResults.time15)[0],
      calcTopResults(modeResults.time30)[0],
      calcTopResults(modeResults.time60)[0]
    ));
  }, [modeResults]);

  return (
    <div className='w-full flex flex-col sm:flex-row items-center gap-4'>
      {topModeResult && (
        <>
          <div className='w-full flex flex-grow justify-between items-center gap-4 py-4 px-8 bg-secondary rounded-lg'>
            <div className='flex basis-16 flex-col items-center gap-2'>
              <span className='text-sm font-medium text-primary'>15 s</span>
              <span className='text-light text-3xl font-semibold'>{ topModeResult?.time15?.wpm || '-' }</span>
              <span className='text-light text-2xl font-semibold'>{ topModeResult?.time15?.acc ? topModeResult?.time15?.acc + ' %' : '-' }</span>
            </div>
            <div className='flex basis-16 flex-col items-center gap-2'>
              <span className='text-sm font-medium text-primary'>30 s</span>
              <span className='text-light text-3xl font-semibold'>{ topModeResult?.time30?.wpm || '-' }</span>
              <span className='text-light text-2xl font-semibold'>{ topModeResult?.time30?.acc ? topModeResult?.time30?.acc + ' %' : '-' }</span>
            </div>
            <div className='flex basis-16 flex-col items-center gap-2'>
              <span className='text-sm font-medium text-primary'>60 s</span>
              <span className='text-light text-3xl font-semibold'>{ topModeResult?.time60?.wpm || '-' }</span>
              <span className='text-light text-2xl font-semibold'>{ topModeResult?.time60?.acc ? topModeResult?.time60?.acc + ' %' : '-' }</span>
            </div>
          </div>
          <div className='w-full flex flex-grow justify-between items-center gap-4 py-4 px-8 bg-secondary rounded-lg'>
            <div className='flex basis-16 flex-col items-center gap-2'>
              <span className='text-sm font-medium text-primary'>10</span>
              <span className='text-light text-3xl font-semibold'>{ topModeResult?.words10?.wpm || '-' }</span>
              <span className='text-light text-2xl font-semibold'>{ topModeResult?.words10?.acc ? topModeResult?.words10?.acc + ' %' : '-' }</span>
            </div>
            <div className='flex basis-16 flex-col items-center gap-2'>
              <span className='text-sm font-medium text-primary'>15</span>
              <span className='text-light text-3xl font-semibold'>{ topModeResult?.words15?.wpm || '-' }</span>
              <span className='text-light text-2xl font-semibold'>{ topModeResult?.words15?.acc ? topModeResult?.words15?.acc + ' %' : '-' }</span>
            </div>
            <div className='flex basis-16 flex-col items-center gap-2'>
              <span className='text-sm font-medium text-primary'>20</span>
              <span className='text-light text-3xl font-semibold'>{ topModeResult?.words20?.wpm || '-' }</span>
              <span className='text-light text-2xl font-semibold'>{ topModeResult?.words20?.acc ? topModeResult?.words20?.acc + ' %' : '-' }</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TopModeResults;