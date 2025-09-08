import React from 'react';
import { X, Star, Calendar, Clock, Globe, ExternalLink, Tv, Users } from 'lucide-react';
import { tvmazeApi } from '../services/tvmazeApi';
import type { TVShow } from '../types/tvshow';

interface ShowModalProps {
  show: TVShow | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShowModal: React.FC<ShowModalProps> = ({ show, isOpen, onClose }) => {
  if (!isOpen || !show) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatRuntime = (runtime: number | null) => {
    if (!runtime) return 'Unknown';
    return `${runtime} min`;
  };

  const formatSchedule = () => {
    if (!show.schedule.days.length) return 'No schedule available';
    const days = show.schedule.days.join(', ');
    const time = show.schedule.time || 'Time TBA';
    return `${days} at ${time}`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Hero Section */}
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
            {show.image && (
              <img
                src={tvmazeApi.getImageUrl(show.image, 'original')}
                alt={show.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{show.name}</h1>
              {show.rating.average && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold">{show.rating.average.toFixed(1)}/10</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  {tvmazeApi.stripHtmlTags(show.summary)}
                </p>
              </div>

              {/* Genres */}
              {show.genres && show.genres.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {show.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              <div className="flex flex-wrap gap-4">
                {show.officialSite && (
                  <a
                    href={show.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Site
                  </a>
                )}
                {show.externals.imdb && (
                  <a
                    href={`https://www.imdb.com/title/${show.externals.imdb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    IMDb
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Show Poster */}
              <div className="text-center">
                <img
                  src={tvmazeApi.getImageUrl(show.image)}
                  alt={show.name}
                  className="w-48 mx-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Show Details */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Show Details</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Tv className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium">{show.status}</span>
                  </div>

                  {show.premiered && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Premiered:</span>
                      <span className="ml-2 font-medium">{new Date(show.premiered).toLocaleDateString()}</span>
                    </div>
                  )}

                  {show.ended && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Ended:</span>
                      <span className="ml-2 font-medium">{new Date(show.ended).toLocaleDateString()}</span>
                    </div>
                  )}

                  {show.runtime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Runtime:</span>
                      <span className="ml-2 font-medium">{formatRuntime(show.runtime)}</span>
                    </div>
                  )}

                  {(show.network || show.webChannel) && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Network:</span>
                      <span className="ml-2 font-medium">{show.network?.name || show.webChannel?.name}</span>
                    </div>
                  )}

                  {show.schedule.days.length > 0 && (
                    <div className="flex items-start">
                      <Users className="w-4 h-4 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <span className="text-gray-600">Schedule:</span>
                        <div className="ml-2 font-medium">{formatSchedule()}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-gray-600">Language:</span>
                    <span className="ml-2 font-medium">{show.language}</span>
                  </div>

                  <div className="flex items-center">
                    <Tv className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">{show.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};