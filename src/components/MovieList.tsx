import React from 'react';
import { MovieCard } from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieListProps {
  movies: Movie[];
  className?: string;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, className = '' }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ${className}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};