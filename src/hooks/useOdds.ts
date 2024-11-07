import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Odd {
  value: string;
  odd: string;
}

interface Bookmaker {
  id: number;
  name: string;
  bets: Array<{
    id: number;
    name: string;
    values: Odd[];
  }>;
}

interface OddsResponse {
  fixture: {
    id: number;
  };
  bookmakers: Bookmaker[];
}

const fetchOdds = async (fixtureId: number): Promise<OddsResponse> => {
  const response = await axios.get(`/api/odds/fixture/${fixtureId}`);
  return response.data.data[0];
};

export const useOdds = (fixtureId: number) => {
  return useQuery({
    queryKey: ['odds', fixtureId],
    queryFn: () => fetchOdds(fixtureId),
    enabled: !!fixtureId,
    staleTime: 60000 // 1 minute
  });
};