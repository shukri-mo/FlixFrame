const TVMAZE_BASE_URL = 'https://api.tvmaze.com';

import type { SearchResponse, TVShow } from '../types/tvshow';

class TVMazeApi {
  private async fetchFromAPI<T>(endpoint: string): Promise<T> {
    const url = `${TVMAZE_BASE_URL}${endpoint}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async searchShows(query: string): Promise<SearchResponse> {
    if (!query.trim()) {
      return [];
    }
    return this.fetchFromAPI<SearchResponse>(`/search/shows?q=${encodeURIComponent(query)}`);
  }

  async getShowById(id: number): Promise<TVShow> {
    return this.fetchFromAPI<TVShow>(`/shows/${id}`);
  }

  getImageUrl(imageObj: { medium: string; original: string } | null, size: 'medium' | 'original' = 'medium'): string {
    if (!imageObj) {
      return 'https://via.placeholder.com/210x295/1f2937/9ca3af?text=No+Image';
    }
    return imageObj[size];
  }

  stripHtmlTags(html: string | null): string {
    if (!html) return 'No summary available.';
    return html.replace(/<[^>]*>/g, '').trim();
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  getRatingColor(rating: number | null): string {
    if (!rating) return 'text-gray-500 bg-gray-100';
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }
}

export const tvmazeApi = new TVMazeApi();