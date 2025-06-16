// components/SpotifyPodcast.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

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
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  
  // Pagination states
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalEpisodes, setTotalEpisodes] = useState(0);

  // Predefined tags/categories (you can customize these)
  const availableTags = ['DeFi', 'NFTs', 'Ethereum', 'Investing', 'Regulation', 'Bitcoin', 'Vitalik'];

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
  }, [token, showId, maxResults, offset]);

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
      
      setEpisodes(data.items);
      setTotalEpisodes(data.total);
      setHasMore(data.next !== null);
    } catch (err) {
      console.error('Error fetching Spotify episodes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter episodes based on keyword and selected tag
  const getFilteredAndSortedEpisodes = () => {
    let filtered = episodes;
    
    // Filter by keyword
    if (keyword) {
      filtered = filtered.filter(episode => 
        episode.name.toLowerCase().includes(keyword.toLowerCase()) || 
        episode.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // Filter by tag (searching in title and description)
    if (selectedTag) {
      filtered = filtered.filter(episode => 
        episode.name.toLowerCase().includes(selectedTag.toLowerCase()) || 
        episode.description.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }
    
    // Sort episodes
    filtered.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
    setOffset(0); // Reset pagination when changing filters
  };

  const goToNextPage = () => {
    setOffset(offset + maxResults);
    window.scrollTo(0, 0);
  };

  const goToPrevPage = () => {
    setOffset(Math.max(0, offset - maxResults));
    window.scrollTo(0, 0);
  };

  // Helper function to extract tags from episode content
  const getEpisodeTags = (episode) => {
    const content = `${episode.name} ${episode.description}`.toLowerCase();
    return availableTags.filter(tag => 
      content.includes(tag.toLowerCase())
    );
  };

  // Helper function to format duration
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  if (loading && !episodes.length) return <div>Loading podcast episodes...</div>;
  if (error) return <div>Error loading podcast: {error}</div>;

  const filteredEpisodes = getFilteredAndSortedEpisodes();

  return (
    <div className="episodes">
      <div className="episodes__title-group">
        <div>Browse All Episodes</div>
        <div onClick={toggleSort} style={{ cursor: 'pointer' }}>
          Sort
          <Image 
            width={20} 
            height={20} 
            src="/assets/icons/upDown.svg" 
            alt="Sort"
            style={{ 
              transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          />
        </div>
      </div>

      {/* Search Input */}
      <div className="episodes__search" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search episodes..."
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      <div className="episodes__filters">
        <div className="episodes__filters__title">Filters:</div>
        <div className="episodes__filters__group">
          {availableTags.map(tag => (
            <div 
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedTag === tag ? '#007bff' : 'transparent',
                color: selectedTag === tag ? 'white' : 'inherit',
                padding: '5px 10px',
                borderRadius: '15px',
                border: selectedTag === tag ? 'none' : '1px solid #ccc'
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="episodes__cards">
        {filteredEpisodes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            No episodes found matching your filters.
          </div>
        ) : (
          filteredEpisodes.map((episode, index) => {
            const episodeTags = getEpisodeTags(episode);
            return (
              <div key={episode.id} className="episodes__cards__card">
                <div className="episodes__cards__card__inner">
                  <div className="episodes__cards__card__inner__details">
                    <div className="episodes__cards__card__inner__details__title">
                      {episode.name}
                    </div>
                    <div className="episodes__cards__card__inner__details__subtitle">
                      {episode.description.length > 200 
                        ? `${episode.description.substring(0, 200)}...` 
                        : episode.description
                      }
                    </div>
                    <div className="episodes__cards__card__inner__details__tags">
                      {episodeTags.map(tag => (
                        <div key={tag}>{tag}</div>
                      ))}
                      {episodeTags.length === 0 && <div>Podcast</div>}
                    </div>
                  </div>

                  <div className="episodes__cards__card__inner__preview">
                    <div className="episodes__cards__card__inner__preview__image">
                      <Image
                        objectFit="cover"
                        layout="fill"
                        alt=""
                        src={episode.images[0]?.url || "/assets/podcast-placeholder.jpg"}
                        // alt={episode.name}
                      />
                    </div>

                    <div className="episodes__cards__card__inner__preview__group">
                      <div>{new Date(episode.release_date).toLocaleDateString()}</div>
                      <div>{formatDuration(episode.duration_ms)}</div>
                    </div>

                    {/* Spotify Embed */}
                    <div style={{ marginTop: '10px', width: '100%' }}>
                      <iframe 
                        src={`https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0`}
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        style={{ borderRadius: '12px' }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {episodes.length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '40px',
          padding: '20px 0'
        }}>
          <button 
            onClick={goToPrevPage} 
            disabled={offset === 0}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: offset === 0 ? '#ccc' : '#007bff',
              color: 'white',
              cursor: offset === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous Page
          </button>
          
          <div style={{ color: '#666' }}>
            Showing {Math.min(offset + 1, totalEpisodes)} - {Math.min(offset + episodes.length, totalEpisodes)} of {totalEpisodes}
          </div>
          
          <button 
            onClick={goToNextPage} 
            disabled={!hasMore}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: !hasMore ? '#ccc' : '#007bff',
              color: 'white',
              cursor: !hasMore ? 'not-allowed' : 'pointer'
            }}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}