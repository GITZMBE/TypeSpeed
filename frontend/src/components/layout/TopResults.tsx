import { Result } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { FaCrown } from 'react-icons/fa';

interface IProps {
  results: Result[];
};

export const TopResults = ({ results }: IProps) => {
  return (
    <div className='w-full'>
      {results.length > 0 && (
        <>
          <div className='w-full flex text-sm text-secondary p-4'>
            <span className='basis-full'>wpm</span>
            <span className='basis-full'>raw</span>
            <span className='basis-full'>acc</span>
            <span className='basis-full'>time</span>
            <span className='basis-full'>mode</span>
            <span className='basis-full'>errors</span>
            <span className='basis-full'>date</span>
             
          </div>
          {results.map((result, i) => (
            <div key={i} className={`flex items-center p-4 ${ i === 0 ? 'text-yellowAcent' : 'text-light' } text-md font-semibold ${ i % 2 === 0 ? 'bg-secondary' : 'bg-primary' } rounded-lg overflow-hidden`}>
              <span className='flex gap-2 items-center basis-full'>{ result.wpm } { i === 0 && <FaCrown />}</span>
              <span className='basis-full'>{ result.entries }</span>
              <span className='basis-full'>{ result.acc } %</span>
              <span className='basis-full'>{ result.time * 60 } s</span>
              <span className='basis-full'>{ result.mode }</span>
              <span className='basis-full'>{ result.errors }</span>
              <p className='flex flex-col basis-full'>
                <span>{ format(result.createdAt, 'do MMMM yyyy') }</span>
                <span>{ format(result.createdAt, 'H:mm') }</span>
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default TopResults;