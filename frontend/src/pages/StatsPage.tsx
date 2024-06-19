import { Result } from '@prisma/client';
import { getUserResults } from 'api/api';
import { Container, ResultsHistory, TopModeResults, TopResults } from 'components/layout';
import React, { useEffect, useState } from 'react';
import { calcTopResults, sortResultDate } from 'utils';

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
    <Container>
      <TopModeResults results={results} />
      <TopResults results={calcTopResults(results, 5)} />
      <ResultsHistory results={sortResultDate(results)} />
    </Container>
  )
};

export default StatsPage;