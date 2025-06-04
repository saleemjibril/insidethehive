// components/SpotifyPodcast.jsx
'use client';

import { useState, useEffect } from 'react';

export default function SpotifyPodcast({ 
  clientId,
  clientSecret,
  showId,  // This is the Spotify ID of your podcast/show
  maxResults = 20,
  initialKeyword = ''
}) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  
  // Filter states
  const [keyword, setKeyword] = useState(initialKeyword);
  
  // Pagination states
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalEpisodes, setTotalEpisodes] = useState(0);

  // Get Spotify Access Token
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
          },
          body: 'grant_type=client_credentials'
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to get Spotify access token');
        }

        const tokenData = await tokenResponse.json();
        setToken(tokenData.access_token);
      } catch (err) {
        console.error('Error getting Spotify token:', err);
        setError('Authentication error: ' + err.message);
        setLoading(false);
      }
    };

    getAccessToken();
  }, [clientId, clientSecret]);

  // Fetch podcast episodes when token is available
  useEffect(() => {
    if (!token) return;
    
    fetchEpisodes();
  }, [token, showId, maxResults, offset, keyword]);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      
      // Build query URL
      let apiUrl = `https://api.spotify.com/v1/shows/${showId}/episodes?limit=${maxResults}&offset=${offset}`;
      
      // Make the request
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch podcast episodes');
      }
      
      const data = await response.json();
      
      // Filter by keyword if provided
      let filteredEpisodes = data.items;
      if (keyword) {
        filteredEpisodes = filteredEpisodes.filter(episode => 
          episode.name.toLowerCase().includes(keyword.toLowerCase()) || 
          episode.description.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      
      setEpisodes(filteredEpisodes);
      setTotalEpisodes(data.total);
      setHasMore(data.next !== null);
    } catch (err) {
      console.error('Error fetching Spotify episodes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Reset pagination when applying new filters
    setOffset(0);
  };

  const goToNextPage = () => {
    setOffset(offset + maxResults);
    window.scrollTo(0, 0);
  };

  const goToPrevPage = () => {
    setOffset(Math.max(0, offset - maxResults));
    window.scrollTo(0, 0);
  };

  if (loading && !episodes.length) return <div>Loading podcast episodes...</div>;
  if (error) return <div>Error loading podcast: {error}</div>;

  return (
    <div>
      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-6 p-4 bg-gray-100 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              Search Episodes
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Search episodes..."
            />
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </form>

      {/* Episodes List */}
      {episodes.length === 0 ? (
        <div className="text-center py-8">No episodes found matching your filters.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {episodes.map((episode) => (
              <div key={episode.id} className="episode-item border rounded overflow-hidden shadow p-4">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
                    <img 
                      src={episode.images[0]?.url || '/api/placeholder/300/300'} 
                      alt={episode.name}
                      className="w-full rounded"
                    />
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-medium mb-2">{episode.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {new Date(episode.release_date).toLocaleDateString()} • {Math.floor(episode.duration_ms / 60000)} min
                    </p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{episode.description}</p>
                    
                    <iframe 
                      src={`https://open.spotify.com/embed/episode/${episode.id}`}
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowTransparency="true" 
                      allow="encrypted-media"
                      className="rounded"
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={goToPrevPage} 
              disabled={offset === 0}
              className={`px-4 py-2 rounded ${offset === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Previous Page
            </button>
            
            <div className="text-center text-gray-600">
              Showing {offset + 1} - {Math.min(offset + episodes.length, totalEpisodes)} of {totalEpisodes}
            </div>
            
            <button 
              onClick={goToNextPage} 
              disabled={!hasMore}
              className={`px-4 py-2 rounded ${!hasMore ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}