import React from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface DateNavigationProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateNavigation: React.FC<DateNavigationProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
      <button
        onClick={() => onDateChange(subDays(selectedDate, 1))}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      
      <span className="font-semibold">
        {format(selectedDate, 'EEEE, MMMM d')}
      </span>
      
      <button
        onClick={() => onDateChange(addDays(selectedDate, 1))}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}