import React from 'react';
import { Standing } from '../types';

interface StandingRowProps {
  standing: Standing;
}

export const StandingRow: React.FC<StandingRowProps> = ({ standing }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <span className={`
            ${standing.description === 'Promotion' ? 'text-green-600' : ''}
            ${standing.description === 'Relegation' ? 'text-red-600' : ''}
          `}>
            {standing.rank}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img src={standing.team.logo} alt="" className="h-6 w-6 flex-shrink-0" />
          <span className="ml-3 text-sm">{standing.team.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.played}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.win}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.draw}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.lose}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.goalsFor}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.goalsAgainst}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{standing.goalsDiff}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{standing.points}</td>
    </tr>
  );
};