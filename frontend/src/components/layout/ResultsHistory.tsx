import { Result } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { sliceResult } from 'utils';

interface IProps {
  results: Result[];
};

export const ResultsHistory = ({ results }: IProps) => {
  const [displayResults, setDisplayResults] = useState([]);
  const [quantity, setQuantity] = useState(10);

  useEffect(() => {
    setDisplayResults(sliceResult(results, quantity));
  }, [results, quantity]);

  return results.length > 0 && (
    <div className='w-full'>
      <h2 className='w-full text-light text-3xl'>History</h2>
      <div className='w-full flex text-sm text-secondary p-4'>
        <span className='basis-full'>wpm</span>
        <span className='basis-full'>raw</span>
        <span className='basis-full'>acc</span>
        <span className='basis-full'>time</span>
        <span className='basis-full'>mode</span>
        <span className='basis-full'>errors</span>
        <span className='basis-full'>date</span>             
      </div>
      {displayResults.map((result, i) => (
        <div key={i} className={`flex items-center px-4 py-2 text-light text-md font-semibold ${ i % 2 === 0 ? 'bg-dark' : 'bg-primary' } rounded-lg overflow-hidden`}>
          <span className='basis-full'>{ result.wpm }</span>
          <span className='basis-full'>{ result.entries }</span>
          <span className='basis-full'>{ result.acc } %</span>
          <span className='basis-full'>{ (result.time * 60).toFixed(3) } s</span>
          <span className='basis-full'>{ result.mode }</span>
          <span className='basis-full'>{ result.errors }</span>
          <p className='flex flex-col basis-full'>
            <span>{ format(result.createdAt, 'do MMMM yyyy') }</span>
            <span>{ format(result.createdAt, 'H:mm') }</span>
          </p>
        </div>
      ))}
      {displayResults.length < results.length && (
        <button onClick={_ => setQuantity(prev => prev + 10 > results.length ? results.length : prev + 10)} className='w-full p-2 mt-2 font-semibold text-light hover:text-dark bg-dark hover:bg-light rounded-lg transition'>Load more</button>
      )}
    </div>
  )
}

export default ResultsHistory;