import { useQuery } from '@tanstack/react-query';
import { getStandings } from '../services/api';
import { Standing } from '../types';

export const useStandings = (leagueId: number | null) => {
  const currentYear = new Date().getFullYear();
  
  return useQuery<Standing[]>({
    queryKey: ['standings', leagueId, currentYear],
    queryFn: () => getStandings(leagueId!, currentYear),
    enabled: !!leagueId,
    staleTime: 300000, // 5 minutes
    retry: 1
  });
};