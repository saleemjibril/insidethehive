"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Skeleton Loader Component for Testimonials
const TestimonialsSkeleton = ({ duplicateCount = 2 }) => {
  const skeletonItems = Array(12).fill(null);
  const duplicatedSkeletonItems = Array(duplicateCount).fill(skeletonItems).flat();

  return (
    <div className="testimonials">
      <div className="testimonials__title">
        <div className="testimonials__title__img">
          <Image src="/assets/logo.png" width={20} height={20} alt="" />
        </div>
        Some comments from our latest episodes
      </div>
      
      <div className="testimonials__slider testimonials__slider-left">
        {duplicatedSkeletonItems.map((_, index) => (
          <div className="testimonials__slider__card skeleton-card" key={`skeleton-left-${index}`}>
            <div className="skeleton-text-1"></div>
            <div className="skeleton-text-2"></div>
            <div className="skeleton-text-3"></div>
            <div className="skeleton-profile">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="testimonials__slider testimonials__slider-right">
        {duplicatedSkeletonItems.map((_, index) => (
          <div className="testimonials__slider__card skeleton-card" key={`skeleton-right-${index}`}>
            <div className="skeleton-text-1"></div>
            <div className="skeleton-text-2"></div>
            <div className="skeleton-text-3"></div>
            <div className="skeleton-profile">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .skeleton-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          cursor: default;
          transition: none;
        }
        
        .skeleton-card:hover {
          transform: none;
        }
        
        .skeleton-text-1, .skeleton-text-2, .skeleton-text-3 {
          height: 14px;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .skeleton-text-1 { width: 100%; }
        .skeleton-text-2 { width: 90%; animation-delay: 0.1s; }
        .skeleton-text-3 { width: 75%; animation-delay: 0.2s; margin-bottom: 16px; }
        
        .skeleton-profile {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .skeleton-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          animation-delay: 0.3s;
        }
        
        .skeleton-info {
          flex: 1;
        }
        
        .skeleton-title {
          height: 14px;
          width: 120px;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 6px;
          animation-delay: 0.4s;
        }
        
        .skeleton-subtitle {
          height: 12px;
          width: 60px;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          animation-delay: 0.5s;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function Testimonials({ 
  clientId,
  clientSecret,
  showId,
  maxEpisodes = 24 // How many episodes to fetch for comments
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
      console.log("Fetched episodes for testimonials:", data);
      
      setEpisodes(data.items);
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

  // Helper function to truncate description for use as "comment"
  const truncateDescription = (description, maxLength = 200) => {
    if (!description) return "Great episode! Really enjoyed the insights shared.";
    const stripped = description.replace(/<[^>]*>/g, ''); // Remove HTML tags
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength).trim() + '...';
  };

  // Helper function to get episode info
  const getEpisodeInfo = (episode, index) => {
    const seasonMatch = episode.name.match(/S(\d+)/i) || episode.description?.match(/Season (\d+)/i);
    const episodeMatch = episode.name.match(/E(\d+)/i) || episode.description?.match(/Episode (\d+)/i);
    
    const season = seasonMatch ? seasonMatch[1] : '1';
    const episodeNum = episodeMatch ? episodeMatch[1] : (episodes.length - index).toString();
    
    return `S${season} . E${episodeNum}`;
  };

  // Helper function to get podcast title
  const getEpisodeTitle = (episodeName) => {
    const words = episodeName.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : episodeName;
  };

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

  // Show skeleton loader while loading
  if (loading) {
    return <TestimonialsSkeleton duplicateCount={duplicateCount} />;
  }
  
  if (error) {
    return (
      <div className="testimonials">
        <div className="testimonials__title">
          <div className="testimonials__title__img">
            <Image src="/assets/logo.png" width={20} height={20} alt="" />
          </div>
          Some comments from our latest episodes
        </div>
        <div className="testimonials__error">
          Error loading episodes: {error}
        </div>
      </div>
    );
  }
  
  if (episodes.length === 0) {
    return (
      <div className="testimonials">
        <div className="testimonials__title">
          <div className="testimonials__title__img">
            <Image src="/assets/logo.png" width={20} height={20} alt="" />
          </div>
          Some comments from our latest episodes
        </div>
        <div className="testimonials__empty">
          No episodes found
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials">
      <div className="testimonials__title">
        <div className="testimonials__title__img">
          <Image src="/assets/logo.png" width={20} height={20} alt="" />
        </div>
        Some comments from our latest episodes
      </div>
      <div className="testimonials__slider testimonials__slider-left">
        {duplicatedItemsLeft?.map((episode, index) => (
          <div 
            className="testimonials__slider__card" 
            key={`${episode.id}-${index}`}
            onClick={() => {
              if (episode?.external_urls?.spotify) {
                window.open(episode.external_urls.spotify, "_blank", "noopener,noreferrer");
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="testimonials__slider__card__text">
              {truncateDescription(episode?.description)}
            </div>

            <div className="testimonials__slider__card__profile">
              <img 
                src={episode?.images?.[0]?.url || '/assets/podcast1.jpg'} 
                width={46} 
                height={46} 
                alt={episode?.name || 'Episode'} 
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />

              <div>
                <div className="testimonials__slider__card__profile__title">
                  {getEpisodeTitle(episode?.name)}
                </div>
                <div className="testimonials__slider__card__profile__subtitle">
                  {getEpisodeInfo(episode, index)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonials__slider testimonials__slider-right">
        {duplicatedItemsRight?.map((episode, index) => (
          <div 
            className="testimonials__slider__card" 
            key={`${episode.id}-${index}-right`}
            onClick={() => {
              if (episode?.external_urls?.spotify) {
                window.open(episode.external_urls.spotify, "_blank", "noopener,noreferrer");
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="testimonials__slider__card__text">
              {truncateDescription(episode?.description)}
            </div>

            <div className="testimonials__slider__card__profile">
              <img 
                src={episode?.images?.[0]?.url || '/assets/podcast2.jpg'} 
                width={46} 
                height={46} 
                alt={episode?.name || 'Episode'} 
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />

              <div>
                <div className="testimonials__slider__card__profile__title">
                  {getEpisodeTitle(episode?.name)}
                </div>
                <div className="testimonials__slider__card__profile__subtitle">
                  {getEpisodeInfo(episode, index + episodesLeft.length)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
