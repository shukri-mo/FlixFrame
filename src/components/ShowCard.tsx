import React from 'react';
import { Calendar, Star, Play, Globe } from 'lucide-react';
import { tvmazeApi } from '../services/tvmazeApi';
import type { TVShow } from '../types/tvshow';

interface ShowCardProps {
  show: TVShow;
  onClick: () => void;
}

export const ShowCard: React.FC<ShowCardProps> = ({ show, onClick }) => {
  const getRatingDisplay = () => {
    if (!show.rating.average) return null;
    return (
      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${tvmazeApi.getRatingColor(show.rating.average)}`}>
        <Star className="w-3 h-3 inline mr-1" />
        {show.rating.average.toFixed(1)}
      </div>
    );
  };

  const getStatusBadge = () => {
    const statusColors = {
      'Running': 'bg-green-100 text-green-800',
      'Ended': 'bg-red-100 text-red-800',
      'To Be Determined': 'bg-yellow-100 text-yellow-800',
      'In Development': 'bg-blue-100 text-blue-800'
    };
    
    const colorClass = statusColors[show.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {show.status}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Show Poster */}
      <div className="relative overflow-hidden bg-gray-200 aspect-[3/4]">
        <img
          src={tvmazeApi.getImageUrl(show.image)}
          alt={show.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        {getRatingDisplay()}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Show Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {show.name}
        </h3>
        
        {/* Status and Year */}
        <div className="flex items-center justify-between mb-3">
          {getStatusBadge()}
          {show.premiered && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {tvmazeApi.formatDate(show.premiered)}
            </div>
          )}
        </div>

        {/* Genres */}
        {show.genres && show.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {show.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
              >
                {genre}
              </span>
            ))}
            {show.genres.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs">
                +{show.genres.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Summary */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {tvmazeApi.stripHtmlTags(show.summary)}
        </p>

        {/* Network/Channel */}
        {(show.network || show.webChannel) && (
          <div className="flex items-center text-xs text-gray-500">
            <Globe className="w-3 h-3 mr-1" />
            {show.network?.name || show.webChannel?.name}
          </div>
        )}
      </div>
    </div>
  );
};