import React from 'react';
import { ShowCard } from './ShowCard';
import type { TVShow } from '../types/tvshow';

interface ShowListProps {
  shows: TVShow[];
  onShowClick: (show: TVShow) => void;
  className?: string;
}

export const ShowList: React.FC<ShowListProps> = ({ shows, onShowClick, className = '' }) => {
  if (shows.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No shows found</p>
        <p className="text-gray-400 text-sm mt-2">Try searching for popular shows like "Breaking Bad" or "Friends"</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ${className}`}>
      {shows.map((show) => (
        <ShowCard 
          key={show.id} 
          show={show} 
          onClick={() => onShowClick(show)}
        />
      ))}
    </div>
  );
};