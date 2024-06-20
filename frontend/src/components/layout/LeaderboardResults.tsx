import { Icon } from 'components/ui';
import { format } from 'date-fns';
import { ExtendedResult } from 'models';
import React from 'react';

interface IProps {
  results: ExtendedResult[];
};

export const LeaderboardResults = ({ results = [] }: IProps) => {
  return (
    <div className='w-full'>
      <h2 className='w-full text-light text-3xl'>Leaderboard</h2>
      <div className='w-full flex text-sm text-secondary p-4'>
        <span className="basis-60">#</span>
        <span className="basis-full">account</span>
        <span className='basis-full'>wpm</span>
        <span className='basis-full'>raw</span>
        <span className='basis-full'>mode</span>
        <span className='basis-full'>date</span>
      </div>
      {results.length > 0 && results.map((result, i) => (
        <div key={i} className={`flex items-center px-4 py-2 ${ i === 0 ? 'text-yellowAcent' : 'text-light' } text-md font-semibold ${ i % 2 === 0 ? 'bg-dark' : 'bg-primary' } rounded-lg overflow-hidden`}>
          <span className='basis-60'>{ i === 0 ? <Icon icon='crown' className='text-yellowAcent' /> : i + 1 }</span>
          <span className='flex items-center gap-2 basis-full'>
            {result.user?.avatar ? <img src={result.user?.avatar} className='w-6 h-6 rounded-full' /> : <Icon icon='usercircle' className={`w-6 h-6 ${ i === 0 && 'text-yellowAcent' }`} />}
            {result.user.username}
          </span>
          <span className='flex items-center gap-2 basis-full'>{ result.wpm } { i === 0 && <Icon icon='crown' className='text-yellowAcent' />}</span>
          <span className='basis-full'>{ result.entries }</span>
          <span className='basis-full'>{ result.mode }</span>
          <p className='flex flex-col basis-full'>
            <span>{ format(result.createdAt, 'do MMMM yyyy') }</span>
            <span>{ format(result.createdAt, 'H:mm') }</span>
          </p>
        </div>
      ))}
    </div>
  )
};

export default LeaderboardResults;