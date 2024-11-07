import React from 'react';
import { Match } from '../types';
import { useOdds } from '../hooks/useOdds';

interface MatchDetailsProps {
  match: Match;
  onClose: () => void;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ match, onClose }) => {
  const { data: odds, isLoading } = useOdds(match.fixture.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{match.league.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-12 h-12" />
              <span className="text-lg font-semibold">{match.teams.home.name}</span>
            </div>
            <div className="text-2xl font-bold">
              {match.goals.home ?? '-'} - {match.goals.away ?? '-'}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">{match.teams.away.name}</span>
              <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-12 h-12" />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Loading odds...</div>
          ) : odds?.bookmakers ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Betting Odds</h3>
              {odds.bookmakers.map((bookmaker) => (
                <div key={bookmaker.id} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{bookmaker.name}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {bookmaker.bets[0]?.values.map((odd, index) => (
                      <div key={index} className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">{odd.value}</div>
                        <div className="font-semibold">{odd.odd}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No odds available</div>
          )}
        </div>
      </div>
    </div>
  );
};