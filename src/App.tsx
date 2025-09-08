import React, { useState, useEffect } from 'react';
import { Tv, Sparkles } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ShowList } from './components/ShowList';
import { ShowModal } from './components/ShowModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { tvmazeApi } from './services/tvmazeApi';
import type { TVShow, SearchResponse } from './types/tvshow';

function App() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Load popular shows on initial load
  useEffect(() => {
    const loadPopularShows = async () => {
      try {
        setLoading(true);
        setError(null);
        // Search for some popular shows to display initially
        const popularQueries = ['breaking bad', 'friends', 'game of thrones', 'the office', 'stranger things'];
        const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
        const response: SearchResponse = await tvmazeApi.searchShows(randomQuery);
        const showsData = response.map(result => result.show);
        setShows(showsData.slice(0, 12)); // Show first 12 results
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shows');
      } finally {
        setLoading(false);
      }
    };

    loadPopularShows();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setShows([]);
      setHasSearched(false);
      setSearchQuery('');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      setHasSearched(true);
      
      const response: SearchResponse = await tvmazeApi.searchShows(query);
      const showsData = response.map(result => result.show);
      setShows(showsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search shows');
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowClick = (show: TVShow) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center mb-6">
            <Tv className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">FlixFrame</h1>
            <Sparkles className="w-6 h-6 text-purple-500 ml-2" />
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for TV shows and movies..."
            className="max-w-2xl mx-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        {hasSearched && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? 'Searching...' : `Search Results for "${searchQuery}"`}
            </h2>
            {!loading && shows.length > 0 && (
              <p className="text-gray-600">
                Found {shows.length} show{shows.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Welcome Message */}
        {!hasSearched && !loading && (
          <div className="text-center py-12 mb-8">
            <Tv className="w-24 h-24 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Amazing TV Shows & Movies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Search through thousands of TV shows and movies. Get detailed information, ratings, 
              and more about your favorite entertainment.
            </p>
            <div className="text-sm text-gray-500">
              <p>Try searching for: "Breaking Bad", "Friends", "Game of Thrones", or "The Office"</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <LoadingSpinner size="lg" className="min-h-[400px]" />
        )}

        {/* Error State */}
        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Shows Grid */}
        {!loading && !error && (
          <ShowList 
            shows={shows} 
            onShowClick={handleShowClick}
          />
        )}

        {/* No Results */}
        {!loading && !error && hasSearched && shows.length === 0 && (
          <div className="text-center py-20">
            <Tv className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No shows found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or check for typos
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Try searching for popular shows like "Breaking Bad" or "Friends"</p>
              <p>• Use simpler keywords</p>
              <p>• Check your spelling</p>
            </div>
          </div>
        )}

        {/* Featured Shows Section (when not searching) */}
        {!hasSearched && !loading && shows.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Shows</h2>
            <ShowList 
              shows={shows} 
              onShowClick={handleShowClick}
            />
          </div>
        )}
      </main>

      {/* Show Modal */}
      <ShowModal 
        show={selectedShow}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;