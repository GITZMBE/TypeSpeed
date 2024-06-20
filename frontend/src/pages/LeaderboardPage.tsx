import { getTopResults } from 'api/api';
import { Container, LeaderboardResults } from 'components/layout';
import { ExtendedResult } from 'models';
import React, { useEffect, useState } from 'react'

export const LeaderboardPage = () => {
  const [topResults, setTopResults] = useState<ExtendedResult[]>([]);

  useEffect(() => {
    getTopResults().then(setTopResults);
  }, []);

  return (
    <Container>
      <LeaderboardResults results={topResults} />
    </Container>
  )
}

export default LeaderboardPage;