"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <div className="latest-episode__card__skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-episode"></div>
            </div>
            
            <style jsx>{`
                .latest-episode__card__skeleton {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                }
                
                .skeleton-image {
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(90deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.2) 50%, 
                        rgba(255, 255, 255, 0.1) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                    border-radius: 8px 8px 0 0;
                }
                
                .skeleton-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .skeleton-title {
                    height: 20px;
                    width: 80%;
                    background: linear-gradient(90deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.2) 50%, 
                        rgba(255, 255, 255, 0.1) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                    border-radius: 4px;
                    animation-delay: 0.2s;
                }
                
                .skeleton-episode {
                    height: 16px;
                    width: 40%;
                    background: linear-gradient(90deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.2) 50%, 
                        rgba(255, 255, 255, 0.1) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                    border-radius: 4px;
                    animation-delay: 0.4s;
                }
                
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .skeleton-image {
                        height: 150px;
                    }
                    
                    .skeleton-content {
                        padding: 15px;
                    }
                    
                    .skeleton-title {
                        height: 18px;
                    }
                    
                    .skeleton-episode {
                        height: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default function LatestEpisode({ 
  clientId,
  clientSecret,
  showId
}) {
    const containerRef = useRef(null);
    const decorativeIconsRef = useRef([]);
    const subsubtitleRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const iconsRef = useRef(null);
    const cardRef = useRef(null);
    
    // Spotify API state
    const [latestEpisode, setLatestEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

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

    // Fetch latest episode when token is available
    useEffect(() => {
        if (!token) return;
        
        fetchLatestEpisode();
    }, [token, showId]);

    const fetchLatestEpisode = async () => {
        try {
            setLoading(true);
            
            const response = await fetch(
                `https://api.spotify.com/v1/shows/${showId}/episodes?limit=1&offset=0`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch latest episode');
            }
            
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                setLatestEpisode(data.items[0]);
            }
        } catch (err) {
            console.error('Error fetching latest episode:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get episode info
    const getEpisodeInfo = (episode) => {
        if (!episode) return 'S1 . E1';
        
        const seasonMatch = episode.name.match(/S(\d+)/i) || episode.description.match(/Season (\d+)/i);
        const episodeMatch = episode.name.match(/E(\d+)/i) || episode.description.match(/Episode (\d+)/i);
        
        const season = seasonMatch ? seasonMatch[1] : '1';
        const episodeNum = episodeMatch ? episodeMatch[1] : '1';
        
        return `S${season} . E${episodeNum}`;
    };

    // Helper function to get podcast title
    const getPodcastTitle = (episodeName) => {
        if (!episodeName) return 'Latest Episode';
        
        const words = episodeName.split(' ');
        return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : episodeName;
    };

    useEffect(() => {
        const container = containerRef.current;
        const decorativeIcons = decorativeIconsRef.current;
        const subsubtitle = subsubtitleRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;
        const icons = iconsRef.current;
        const card = cardRef.current;

        // Set initial states
        gsap.set(decorativeIcons, { opacity: 0, scale: 0, rotation: 45 });
        gsap.set(subsubtitle, { opacity: 0, y: 30 });
        gsap.set(title, { opacity: 0, y: 50, scale: 0.9 });
        gsap.set(subtitle, { opacity: 0, y: 30 });
        gsap.set(icons, { opacity: 0, y: 40 });
        gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment for debugging
            }
        });

        // Animate decorative icons with stagger
        // Check if it's mobile device
        const isMobile = window.innerWidth <= 768;
        
        tl.to(decorativeIcons, {
            opacity: isMobile ? 0.4 : 1, // 0.4 on mobile, 1 on desktop
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
                amount: 1.5,
                from: "random"
            }
        });

        // Animate main content
        tl.to(subsubtitle, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=1");

        tl.to(title, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");

        tl.to(icons, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");

        tl.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");

        // Continuous floating animation for decorative icons
        decorativeIcons.forEach((icon, index) => {
            if (icon) {
                gsap.to(icon, {
                    y: "random(-20, 20)",
                    x: "random(-15, 15)",
                    rotation: "random(-15, 15)",
                    duration: "random(3, 6)",
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.2
                });
            }
        });

        // Hover animation for platform icons
        const platformIcons = icons?.querySelectorAll('img');
        platformIcons?.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Card hover animation
        if (card) {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.02,
                    y: -10,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const addToDecorativeRefs = (el) => {
        if (el && !decorativeIconsRef.current.includes(el)) {
            decorativeIconsRef.current.push(el);
        }
    };

    return (
        <div className="latest-episode" id="latest" ref={containerRef}>
            {/* Decorative podcast icons */}
            <div className="latest-episode__decorative-icons">
                <div className="decorative-icon decorative-icon--1" ref={addToDecorativeRefs}>
                    <Image width={40} height={40} alt="" src="/assets/icons/mic.svg" />
                </div>
                <div className="decorative-icon decorative-icon--2" ref={addToDecorativeRefs}>
                    <Image width={40} height={40} alt="" src="/assets/icons/bitcoin.svg" />
                </div>
                <div className="decorative-icon decorative-icon--3" ref={addToDecorativeRefs}>
                    <Image width={40} height={40} alt="" src="/assets/icons/loud.svg" />
                </div>
                <div className="decorative-icon decorative-icon--4" ref={addToDecorativeRefs}>
                    <Image width={40} height={40} alt="" src="/assets/icons/diamond.svg" />
                </div>
                <div className="decorative-icon decorative-icon--5" ref={addToDecorativeRefs}>
                    <Image width={40} height={40} alt="" src="/assets/icons/applepod.svg" />
                </div>
                <div className="decorative-icon decorative-icon--6" ref={addToDecorativeRefs}>
                    <Image width={40} height={40} alt="" src="/assets/icons/eth.svg" />
                </div>
                <div className="decorative-icon decorative-icon--7" ref={addToDecorativeRefs}>
                    <Image width={35} height={35} alt="" src="/assets/icons/spotify.svg" />
                </div>
                <div className="decorative-icon decorative-icon--8" ref={addToDecorativeRefs}>
                    <Image width={38} height={38} alt="" src="/assets/icons/youtube.svg" />
                </div>
                <div className="decorative-icon decorative-icon--9" ref={addToDecorativeRefs}>
                    <Image width={32} height={32} alt="" src="/assets/icons/headphone.svg" />
                </div>
                <div className="decorative-icon decorative-icon--10" ref={addToDecorativeRefs}>
                    <Image width={36} height={36} alt="" src="/assets/icons/soundwave.svg" />
                </div>
                <div className="decorative-icon decorative-icon--11" ref={addToDecorativeRefs}>
                    <Image width={34} height={34} alt="" src="/assets/icons/eth.svg" />
                </div>
                <div className="decorative-icon decorative-icon--12" ref={addToDecorativeRefs}>
                    <Image width={38} height={38} alt="" src="/assets/icons/play-button.svg" />
                </div>
            </div>

            <div className="latest-episode__subsubtitle" ref={subsubtitleRef}>
                <div>Web3</div>
                <Image width={20} height={20} alt="" src="/assets/icons/dot.svg" />
                <div>Podcast</div>
                <Image width={20} height={20} alt="" src="/assets/icons/dot.svg" />
                <div>Innovation</div>
            </div>
            
            <div className="latest-episode__title" ref={titleRef}>
                Inside<span>The Hive</span>
            </div>
            
            <div className="latest-episode__subtitle" ref={subtitleRef}>
                Available on all streaming platforms. Listen and subscribe!
            </div>

            <div className="latest-episode__icons" ref={iconsRef}>
                <Image width={40} height={40} alt="" src="/assets/icons/youtube.svg" />
                <Image width={40} height={40} alt="" src="/assets/icons/spotify.svg" />
                <Image width={35} height={38} alt="" src="/assets/icons/castBox.png" />
                <Image width={45} height={25} alt="" src="/assets/icons/soundclouds.png" />
                <Image width={40} height={40} alt="" src="/assets/icons/applePodcast.svg" />
            </div>
            
            <div className="latest-episode__card" ref={cardRef}>
                {loading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <div className="latest-episode__card__error">
                        <div>Error loading episode</div>
                    </div>
                ) : latestEpisode ? (
                    <>
                        <div className="latest-episode__card__image"
                             onClick={() => {
                                 window.open(latestEpisode?.uri, "_blank", "noopener,noreferrer");
                             }}
                             style={{ cursor: 'pointer' }}>
                            <Image 
                                width={1400} 
                                height={400} 
                                src={latestEpisode.images?.[0]?.url || '/assets/podcast-placeholder.jpg'} 
                                alt={latestEpisode.name}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        
                        <div className="latest-episode__card__group">
                            <div>{getPodcastTitle(latestEpisode.name)}</div>
                            <div>{getEpisodeInfo(latestEpisode)}</div>
                        </div>
                    </>
                ) : (
                    <div className="latest-episode__card__fallback">
                        <div className="latest-episode__card__image">
                            <Image width={1400} height={400} src="https://i.scdn.co/image/ab6765630000ba8a27354e81d74b3dba7b846e03" alt="" />
                        </div>
                        
                        <div className="latest-episode__card__group">
                            <div>Podcast title</div>
                            <div>S1 . E3</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}