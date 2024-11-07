import { useQuery } from '@tanstack/react-query';
import { getLeagues } from '../services/api';
import { League } from '../types';

export const useLeagues = () => {
  return useQuery<League[]>({
    queryKey: ['leagues'],
    queryFn: getLeagues,
    staleTime: Infinity // Leagues don't change often
  });
};