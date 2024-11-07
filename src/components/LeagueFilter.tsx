import React from 'react';
import { League } from '../types';

interface LeagueFilterProps {
  leagues: League[];
  selectedLeague: number | null;
  onSelectLeague: (leagueId: number | null) => void;
}

export const LeagueFilter: React.FC<LeagueFilterProps> = ({
  leagues,
  selectedLeague,
  onSelectLeague,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectLeague(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          selectedLeague === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        All Matches
      </button>
      {leagues.map((league) => (
        <button
          key={league.id}
          onClick={() => onSelectLeague(league.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${
            selectedLeague === league.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          <img 
            src={league.logo} 
            alt={league.name} 
            className="w-4 h-4 mr-2"
          />
          {league.name}
        </button>
      ))}
    </div>
  );
};