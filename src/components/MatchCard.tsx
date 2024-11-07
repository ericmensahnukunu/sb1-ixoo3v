import React, { useState } from 'react';
import { format } from 'date-fns';
import { Match } from '../types';
import { MatchDetails } from './MatchDetails';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusDisplay = () => {
    if (match.fixture.status.short === 'LIVE') {
      return <span className="text-red-600 font-bold">{match.fixture.status.elapsed}'</span>;
    } else if (match.fixture.status.short === 'FT') {
      return <span className="text-gray-600">FT</span>;
    } else {
      return <span className="text-gray-600">
        {format(new Date(match.fixture.date), 'HH:mm')}
      </span>;
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="text-sm text-gray-600 mb-2 flex items-center">
          <img 
            src={match.league.logo} 
            alt={match.league.name} 
            className="w-5 h-5 mr-2"
          />
          {match.league.name}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="font-semibold flex items-center">
              <img 
                src={match.teams.home.logo} 
                alt={match.teams.home.name} 
                className="w-4 h-4 mr-2"
              />
              {match.teams.home.name}
            </div>
            <div className="font-semibold flex items-center">
              <img 
                src={match.teams.away.logo} 
                alt={match.teams.away.name} 
                className="w-4 h-4 mr-2"
              />
              {match.teams.away.name}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold">{match.goals.home ?? '-'}</div>
            <div className="font-semibold">{match.goals.away ?? '-'}</div>
          </div>
          <div className="ml-4 w-16 text-center">
            {getStatusDisplay()}
          </div>
        </div>
      </div>

      {showDetails && (
        <MatchDetails match={match} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}