import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getMatches, getLiveMatches } from '../services/api';
import { Match } from '../types';

export const useMatches = (selectedDate: Date) => {
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  const { data: scheduledMatches = [], isLoading: isScheduledLoading } = useQuery<Match[]>({
    queryKey: ['matches', formattedDate],
    queryFn: () => getMatches(formattedDate)
  });

  const { data: liveMatches = [], isLoading: isLiveLoading } = useQuery<Match[]>({
    queryKey: ['live-matches'],
    queryFn: getLiveMatches,
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const allMatches = [...liveMatches, ...scheduledMatches];
  const isLoading = isScheduledLoading || isLiveLoading;

  return { matches: allMatches, isLoading };
};