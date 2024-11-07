import React from 'react';
import { useStandings } from '../hooks/useStandings';
import { StandingRow } from './StandingRow';

interface LeagueStandingsProps {
  leagueId: number | null;
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ leagueId }) => {
  const { data: standings, isLoading, isError } = useStandings(leagueId);

  if (!leagueId || !standings?.length) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 text-center text-red-600">
        Failed to load standings
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">League Standings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MP</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GD</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings.map((standing) => (
              <StandingRow key={standing.team.id} standing={standing} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};