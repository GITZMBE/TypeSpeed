import { Result } from '@prisma/client';
import { getUserResults } from 'api/api';
import { ResultsHistory } from 'components/layout';
import React, { useEffect, useState } from 'react';

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
    <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
      <ResultsHistory results={results} />
    </div>
  )
};

export default StatsPage;