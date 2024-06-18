import { Result } from '@prisma/client';
import { getUserResults } from 'api/api';
import { ResultsHistory, TopResults } from 'components/layout';
import React, { useEffect, useState } from 'react';
import { calcTopResults } from 'utils';

export const StatsPage = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const res = await getUserResults();

    if ('message' in res) return;

    setResults(res);
  };

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-center items-center gap-8'>
      <h2 className='w-full text-light text-3xl'>Top Results</h2>
      <TopResults results={calcTopResults(results)} />
      <h2 className='w-full text-light text-3xl'>History</h2>
      <ResultsHistory results={results} />
    </div>
  )
};

export default StatsPage;