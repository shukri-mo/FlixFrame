import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-50';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden bg-gray-200 aspect-[2/3]">
        <img
          src={tmdbApi.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/500x750/e5e7eb/9ca3af?text=No+Poster';
          }}
        />
        
        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getRatingColor(movie.vote_average)}`}>
            <Star className="w-3 h-3 inline mr-1" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {movie.title}
        </h3>
        
        {movie.release_date && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(movie.release_date)}
          </div>
        )}

        {movie.overview && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {movie.overview}
          </p>
        )}
      </div>
    </Link>
  );
};