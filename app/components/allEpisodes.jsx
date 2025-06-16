// components/SpotifyPodcast.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function AllEpisodes({ 
  clientId,
  clientSecret,
  showId,  // This is the Spotify ID of your podcast/show
  maxResults = 20,
  initialKeyword = ''
}) {
  const [episodes, setEpisodes] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]); // Store all episodes for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  
  // Filter states
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  
  // Pagination states for filtered results
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(maxResults);

  // Dynamic tags extracted from actual episode content
  const [availableTags, setAvailableTags] = useState([]);

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

  // Fetch ALL podcast episodes when token is available
  useEffect(() => {
    if (!token) return;
    
    fetchAllEpisodes();
  }, [token, showId]);

  const fetchAllEpisodes = async () => {
    try {
      setLoading(true);
      let allEpisodesData = [];
      let offset = 0;
      let hasMore = true;
      
      // Fetch all episodes in batches
      while (hasMore) {
        const apiUrl = `https://api.spotify.com/v1/shows/${showId}/episodes?limit=50&offset=${offset}`;
        
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcast episodes');
        }
        
        const data = await response.json();
        allEpisodesData = [...allEpisodesData, ...data.items];
        
        hasMore = data.next !== null;
        offset += 50;
        
        // Prevent infinite loop - limit to reasonable number
        if (offset > 2000) break;
      }
      
      console.log("All episodes fetched:", allEpisodesData.length);
      setAllEpisodes(allEpisodesData);
      
      // Extract and set dynamic tags from episode content
      const extractedTags = extractTagsFromEpisodes(allEpisodesData);
      setAvailableTags(extractedTags);
      
    } catch (err) {
      console.error('Error fetching Spotify episodes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort episodes
  const getFilteredAndSortedEpisodes = () => {
    let filtered = [...allEpisodes];
    
    // Filter by keyword
    if (keyword.trim()) {
      const searchTerm = keyword.toLowerCase().trim();
      filtered = filtered.filter(episode => 
        episode.name.toLowerCase().includes(searchTerm) || 
        episode.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by tag (searching in title and description)
    if (selectedTag) {
      const tagTerm = selectedTag.toLowerCase();
      filtered = filtered.filter(episode => 
        episode.name.toLowerCase().includes(tagTerm) || 
        episode.description.toLowerCase().includes(tagTerm)
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

  // Get paginated results
  const getPaginatedEpisodes = () => {
    const filtered = getFilteredAndSortedEpisodes();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      episodes: filtered.slice(startIndex, endIndex),
      totalCount: filtered.length,
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    };
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const goToNextPage = () => {
    const { totalPages } = getPaginatedEpisodes();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  // Extract meaningful tags/keywords from episode content
  const extractTagsFromEpisodes = (episodes) => {
    const tagCounts = {};
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were',
      'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'could', 'should', 'can', 'may', 'might', 'must', 'shall', 'about', 'above', 'across', 'after', 'against', 'along',
      'among', 'around', 'because', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'during',
      'except', 'from', 'inside', 'into', 'like', 'near', 'off', 'outside', 'over', 'since', 'through', 'throughout',
      'till', 'toward', 'under', 'until', 'up', 'upon', 'within', 'without', 'all', 'any', 'both', 'each', 'few',
      'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
      'just', 'now', 'how', 'what', 'when', 'where', 'who', 'why', 'podcast', 'episode', 'today', 'discussion', 'talk',
      'talking', 'interview', 'guest', 'host', 'show', 'series', 'part', 'new', 'latest', 'join', 'joins', 'welcome',
      'back', 'get', 'getting', 'going', 'go', 'come', 'coming', 'take', 'taking', 'make', 'making', 'see', 'seeing',
      'know', 'knowing', 'think', 'thinking', 'want', 'wanting', 'need', 'needing', 'look', 'looking', 'find', 'finding',
      'work', 'working', 'use', 'using', 'try', 'trying', 'help', 'helping', 'start', 'starting', 'end', 'ending',
      'tell', 'telling', 'ask', 'asking', 'give', 'giving', 'show', 'showing', 'play', 'playing', 'run', 'running'
    ]);
    
    episodes.forEach(episode => {
      const content = `${episode.name} ${episode.description}`.toLowerCase();
      
      // Remove special characters and split into words
      const words = content
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => 
          word.length > 2 && 
          word.length < 20 && 
          !commonWords.has(word) &&
          !/^\d+$/.test(word) // Remove pure numbers
        );
      
      // Count occurrences of each word
      words.forEach(word => {
        // Capitalize first letter for display
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        tagCounts[capitalizedWord] = (tagCounts[capitalizedWord] || 0) + 1;
      });
    });
    
    // Sort by frequency and take top tags that appear in multiple episodes
    const minOccurrences = Math.max(2, Math.floor(episodes.length * 0.05)); // At least 2 or 5% of episodes
    const topTags = Object.entries(tagCounts)
      .filter(([word, count]) => count >= minOccurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20) // Limit to top 20 tags
      .map(([word]) => word);
    
    // Add some manual crypto/finance related terms if they appear in content
    const manualTags = ['Bitcoin', 'Ethereum', 'Crypto', 'Blockchain', 'DeFi', 'NFT', 'Trading', 'Investment', 'Finance', 'Technology'];
    const foundManualTags = manualTags.filter(tag => 
      episodes.some(episode => 
        `${episode.name} ${episode.description}`.toLowerCase().includes(tag.toLowerCase())
      )
    );
    
    // Combine and deduplicate
    const allTags = [...new Set([...foundManualTags, ...topTags])];
    
    console.log('Extracted tags:', allTags);
    console.log('Tag frequencies:', Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 30));
    
    return allTags;
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
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

  if (loading) return <div>Loading podcast episodes...</div>;
  if (error) return <div>Error loading podcast: {error}</div>;

  const { episodes: paginatedEpisodes, totalCount, totalPages } = getPaginatedEpisodes();

  return (
    <div className="episodes">
      <div className="episodes__title-group">
        <div>Browse All Episodes ({totalCount} {totalCount === 1 ? 'episode' : 'episodes'})</div>
        <div onClick={toggleSort} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
          Sort by Date
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
          onChange={handleKeywordChange}
          placeholder="Search episodes by title or description..."
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Tag Filters */}
      <div className="episodes__filters" style={{ marginBottom: '30px' }}>
        <div className="episodes__filters__title" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Filter by Topic:
          {availableTags.length === 0 && allEpisodes.length > 0 && (
            <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#666', marginLeft: '10px' }}>
              (Analyzing episode content...)
            </span>
          )}
        </div>
        <div className="episodes__filters__group" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availableTags.length === 0 && allEpisodes.length > 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Extracting topics from your podcast episodes...
            </div>
          ) : (
            availableTags.map(tag => (
            <div 
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedTag === tag ? '#FFD700' : 'transparent',
                color: selectedTag === tag ? '#000' : '#FFF',
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedTag === tag ? '2px solid #FFD700' : '2px solid #ccc',
                fontSize: '14px',
                fontWeight: selectedTag === tag ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
                userSelect: 'none'
              }}
            >
              {tag}
            </div>
            ))
          )}
          {/* Clear filters button */}
          {(selectedTag || keyword) && (
            <div 
              onClick={() => {
                setSelectedTag('');
                setKeyword('');
                setCurrentPage(1);
              }}
              style={{
                cursor: 'pointer',
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid #dc3545',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                userSelect: 'none'
              }}
            >
              Clear Filters
            </div>
          )}
        </div>
      </div>

      {/* Results count and pagination info */}
      {totalCount > 0 && (
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px', padding: "0 20px" }}>
          Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} episodes
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      )}

      <div className="episodes__cards">
        {paginatedEpisodes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            {allEpisodes.length === 0 ? 'No episodes found.' : 'No episodes match your current filters.'}
            {(keyword || selectedTag) && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => {
                    setKeyword('');
                    setSelectedTag('');
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          paginatedEpisodes.map((episode, index) => {
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
                      {[...episodeTags]?.slice(0, 4)?.map(tag => (
                        <div key={tag}>{tag}</div>
                      ))}
                      {episodeTags.length === 0 && <div>Podcast</div>}
                    </div>
                  </div>

                  <div className="episodes__cards__card__inner__preview">
                    {/* Spotify Embed */}
                    <div style={{ width: '100%' }}>
                      <iframe 
                        src={`https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0`}
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        style={{ borderRadius: '12px' }}
                      ></iframe>
                    </div>

                    <div className="episodes__cards__card__inner__preview__group">
                      <div>{new Date(episode.release_date).toLocaleDateString()}</div>
                      <div>{formatDuration(episode.duration_ms)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '40px',
          padding: '20px'
        }}>
          <button 
            onClick={goToPrevPage} 
            disabled={currentPage === 1}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentPage === 1 ? '#ccc' : '#FFD700',
              color: '#000',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            ← Previous
          </button>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'center',
            color: '#666',
            fontSize: '14px'
          }}>
            Page {currentPage} of {totalPages}
          </div>
          
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentPage === totalPages ? '#ccc' : '#FFD700',
              color: '#000',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}