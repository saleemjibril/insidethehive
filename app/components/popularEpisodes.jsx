"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PopularEpisodes({ 
  clientId,
  clientSecret,
  showId,
  maxEpisodes = 24 // How many episodes to show in the slider
}) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [duplicateCount, setDuplicateCount] = useState(2);

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

    if (clientId && clientSecret && showId) {
      getAccessToken();
    }
  }, [clientId, clientSecret, showId]);

  // Fetch podcast episodes when token is available
  useEffect(() => {
    if (!token) return;
    
    fetchEpisodes();
  }, [token, showId, maxEpisodes]);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `https://api.spotify.com/v1/shows/${showId}/episodes?limit=${maxEpisodes}&offset=0`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch podcast episodes');
      }
      
      const data = await response.json();
      
      // Sort episodes by popularity (using release date as proxy, newest first)
      const sortedEpisodes = data.items.sort((a, b) => 
        new Date(b.release_date) - new Date(a.release_date)
      );
      
      setEpisodes(sortedEpisodes);
    } catch (err) {
      console.error('Error fetching Spotify episodes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const calculateDuplicates = () => {
      const viewportWidth = window.innerWidth;
      const newDuplicateCount = Math.ceil((viewportWidth * 3) / (300 + 20)) + 1;
      setDuplicateCount(newDuplicateCount);
    };

    calculateDuplicates();
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, []);

  // Split episodes into left and right sliders
  const splitEpisodes = () => {
    if (episodes.length === 0) return { left: [], right: [] };
    
    const mid = Math.ceil(episodes.length / 2);
    return {
      left: episodes.slice(0, mid),
      right: episodes.slice(mid)
    };
  };

  const { left: episodesLeft, right: episodesRight } = splitEpisodes();
  
  const duplicatedItemsLeft = Array(duplicateCount).fill(episodesLeft).flat();
  const duplicatedItemsRight = Array(duplicateCount).fill(episodesRight).flat();

  useEffect(() => {
    if (episodesLeft.length > 0) {
      document.documentElement.style.setProperty(
        "--item-count",
        episodesLeft.length
      );
    }
  }, [episodesLeft.length]);

  // Helper function to get episode number from Spotify data
  const getEpisodeInfo = (episode, index) => {
    // Try to extract season and episode info from description or name
    const seasonMatch = episode.name.match(/S(\d+)/i) || episode.description.match(/Season (\d+)/i);
    const episodeMatch = episode.name.match(/E(\d+)/i) || episode.description.match(/Episode (\d+)/i);
    
    const season = seasonMatch ? seasonMatch[1] : '1';
    const episodeNum = episodeMatch ? episodeMatch[1] : (episodes.length - index).toString();
    
    return `S${season} . E${episodeNum}`;
  };

  // Helper function to get podcast show title
  const getPodcastTitle = (episodeName) => {
    // Extract a shorter title from the episode name
    const words = episodeName.split(' ');
    return words.length > 4 ? words.slice(0, 4).join(' ') + '...' : episodeName;
  };

  if (loading) return <div>Loading popular episodes...</div>;
  if (error) return <div>Error loading episodes: {error}</div>;
  if (episodes.length === 0) return <div>No episodes found</div>;

  return (
    <div className="pop-episodes" id="popular">
      <div className="pop-episodes__title">
        Popular <span>Episodes</span>
      </div>
      <div className="pop-episodes__slider pop-episodes__slider-left">
        {duplicatedItemsLeft?.map((episode, index) => (
          <div className="pop-episodes__slider__card" key={`${episode.id}-${index}`}
           onClick={() => {
              window.open(episode?.uri, "_blank", "noopener,noreferrer");
            }}
          >
            <div className="pop-episodes__slider__card__image">
              <img
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                src={episode.images?.[0]?.url || '/assets/podcast-placeholder.jpg'}
                alt={episode.name}
              />
            </div>

            <div className="pop-episodes__slider__card__group">
              <div>{getPodcastTitle(episode.name)}</div>
              <div>{getEpisodeInfo(episode, index)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pop-episodes__slider pop-episodes__slider-right">
        {duplicatedItemsRight?.map((episode, index) => (
          <div className="pop-episodes__slider__card" key={`${episode.id}-${index}-right`}
           onClick={() => {
              window.open(episode?.uri, "_blank", "noopener,noreferrer");
            }}
          >
            <div className="pop-episodes__slider__card__image">
              <img
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                src={episode.images?.[0]?.url || '/assets/podcast-placeholder.jpg'}
                alt={episode.name}
              />
            </div>

            <div className="pop-episodes__slider__card__group">
              <div>{getPodcastTitle(episode.name)}</div>
              <div>{getEpisodeInfo(episode, index + episodesLeft.length)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}