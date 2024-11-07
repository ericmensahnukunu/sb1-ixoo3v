import React, { useState } from 'react';
import { MatchCard } from '../components/MatchCard';
import { LeagueFilter } from '../components/LeagueFilter';
import { DateNavigation } from '../components/DateNavigation';
import { LeagueStandings } from '../components/LeagueStandings';
import { useMatches } from '../hooks/useMatches';
import { useLeagues } from '../hooks/useLeagues';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

const LiveScoresContent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  
  const { matches, isLoading } = useMatches(selectedDate);
  const { data: leagues = [] } = useLeagues();

  const filteredMatches = matches.filter(match => 
    !selectedLeague || match.league.id === selectedLeague
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Live Scores</h1>
      
      <DateNavigation
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <LeagueFilter
        leagues={leagues}
        selectedLeague={selectedLeague}
        onSelectLeague={setSelectedLeague}
      />
      
      <div className="space-y-4 mt-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <MatchCard key={match.fixture.id} match={match} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matches found for the selected date
          </div>
        )}
      </div>

      <LeagueStandings leagueId={selectedLeague} />
    </div>
  );
};

export const LiveScores: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <LiveScoresContent />
  </QueryClientProvider>
);