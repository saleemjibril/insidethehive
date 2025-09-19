"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { getArticlesx } from "../apis";
import Link from "next/link";

export default function WorkTogether(params) {
    const [allArticles, setAllArticles] = useState([]); // Store all articles for filtering
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  // Fetch articles when component mounts
  useEffect(() => {
    fetchAllArticles();
  }, []);

  const fetchAllArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getArticlesx();
      console.log("getArticlesx", response);
      
      // Handle the new response structure
      if (response.error) {
        setError(response.error);
        setAllArticles([]);
        return;
      }
      
      // Extract articles from the response structure
      const articlesData = response?.data?.data || {};
      const articlesArray = Object.values(articlesData);
      
      console.log("All articles fetched:", articlesArray.length);
      setAllArticles(articlesArray);
      
    } catch (err) {
      console.error('Error fetching Medium articles:', err);
      setError(err.message || 'Failed to fetch articles');
      setAllArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get article URL
  const getArticleUrl = (article) => {
    if (!article) return null;
    
    // Check if article has the necessary properties for Medium URL
    if (article.creatorId && article.uniqueSlug) {
      return `https://medium.com/@${article.creatorId}/${article.uniqueSlug}`;
    }
    
    // Fallback to guid if available
    if (article.guid) {
      return article.guid;
    }
    
    return null;
  };

  // Handle article click
  const handleArticleClick = (article) => {
    const url = getArticleUrl(article);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

    // Loading state
    if (loading) {
      return (
        <div className="home__work-together" id="articles">
          <div className="home__work-together__inner">
            <div className="home__work-together__inner__title">
              Read <span>our</span> articles
            </div>
            <div className="loading-message">
              Loading articles...
            </div>
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="home__work-together" id="articles">
          <div className="home__work-together__inner">
            <div className="home__work-together__inner__title">
              Read <span>our</span> articles
            </div>
            <div className="error-message">
              <p>Unable to load articles at the moment.</p>
              <p>{error}</p>
              <button onClick={fetchAllArticles} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
       <div className="home__work-together" id="articles">
         <div className="home__work-together__inner">
            <div className="home__work-together__inner__title">
            Read <span>our</span> articles
            </div>
            <div className="home__work-together__inner__grid">
                <div 
                  className="home__work-together__inner__card"
                  onClick={() => handleArticleClick(allArticles[0])}
                  style={{ cursor: getArticleUrl(allArticles[0]) ? 'pointer' : 'default' }}
                >
                {/* Article Image */}
                {allArticles[0]?.featuredImage?.url && (
                  <div className="home__work-together__inner__card__image">
                    <Image
                    width={400}
                    height={150}
                      src={`https://miro.medium.com/v2/resize:fit:400/1*${allArticles[0].featuredImage.url.split('*')[1]}`}
                      alt={allArticles[0]?.title || "Article image"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}

                      style={{width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '14px'}}
                    />
                  </div>
                )}
                
                <div className="home__work-together__inner__card__number">
                    1
                    </div>
                <div className="home__work-together__inner__card__title">
                {allArticles[0]?.title?.slice(0, 70) || "No article available"}...
                    </div>
                <div className="home__work-together__inner__card__subtitle">
                {allArticles[0]?.description?.slice(0, 100) || "No description available"}...
                    </div>

                </div>
                <div 
                  className="home__work-together__inner__card"
                  onClick={() => handleArticleClick(allArticles[1])}
                  style={{ cursor: getArticleUrl(allArticles[1]) ? 'pointer' : 'default' }}
                >
                {/* Article Image */}
                {allArticles[1]?.featuredImage?.url && (
                  <div className="home__work-together__inner__card__image">
                    <Image 
                    width={400}
                    height={150}
                      src={`https://miro.medium.com/v2/resize:fit:400/1*${allArticles[1].featuredImage.url.split('*')[1]}`}
                      alt={allArticles[1]?.title || "Article image"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                        style={{width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '14px'}}

                    />
                  </div>
                )}
                
                <div className="home__work-together__inner__card__number">
                    2
                    </div>
                <div className="home__work-together__inner__card__title">
                {allArticles[1]?.title?.slice(0, 50) || "No article available"}...
                    </div>
                <div className="home__work-together__inner__card__subtitle">
                {allArticles[1]?.description?.slice(0, 100) || "No description available"}...
                    </div>

                </div>
                <div 
                  className="home__work-together__inner__card"
                  onClick={() => handleArticleClick(allArticles[2])}
                  style={{ cursor: getArticleUrl(allArticles[2]) ? 'pointer' : 'default' }}
                >
                {/* Article Image */}
                {allArticles[2]?.featuredImage?.url && (
                  <div className="home__work-together__inner__card__image">
                    <Image 
                    width={400}
                    height={150}
                      src={`https://miro.medium.com/v2/resize:fit:400/1*${allArticles[2].featuredImage.url.split('*')[1]}`}
                      alt={allArticles[2]?.title || "Article image"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      style={{width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '14px'}}

                    />
                  </div>
                )}
                
                <div className="home__work-together__inner__card__number">
                    3
                    </div>
                <div className="home__work-together__inner__card__title">
                {allArticles[2]?.title?.slice(0, 50) || "No article available"}...
                    </div>
                <div className="home__work-together__inner__card__subtitle">
                {allArticles[2]?.description?.slice(0, 100) || "No description available"}...
                    </div>

                </div>
                <div 
                  className="home__work-together__inner__card"
                  onClick={() => handleArticleClick(allArticles[3])}
                  style={{ cursor: getArticleUrl(allArticles[3]) ? 'pointer' : 'default' }}
                >
                {/* Article Image */}
                {allArticles[3]?.featuredImage?.url && (
                  <div className="home__work-together__inner__card__image">
                    <Image 
                    width={400}
                    height={150}
                      src={`https://miro.medium.com/v2/resize:fit:400/1*${allArticles[3].featuredImage.url.split('*')[1]}`}
                      alt={allArticles[3]?.title || "Article image"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      style={{width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '14px'}}

                    />
                  </div>
                )}
                
                <div className="home__work-together__inner__card__number">
                    4
                    </div>
                <div className="home__work-together__inner__card__title">
                {allArticles[3]?.title?.slice(0, 50) || "No article available"}...
                    </div>
                <div className="home__work-together__inner__card__subtitle">
                {allArticles[3]?.description?.slice(0, 100) || "No description available"}...
                    </div>

                </div>
                <div 
                  className="home__work-together__inner__card"
                  onClick={() => handleArticleClick(allArticles[4])}
                  style={{ cursor: getArticleUrl(allArticles[4]) ? 'pointer' : 'default' }}
                >
                {/* Article Image */}
                {allArticles[4]?.featuredImage?.url && (
                  <div className="home__work-together__inner__card__image">
                    <Image 
                    width={400}
                    height={150}
                      src={`https://miro.medium.com/v2/resize:fit:400/1*${allArticles[4].featuredImage.url.split('*')[1]}`}
                      alt={allArticles[4]?.title || "Article image"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      style={{width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '14px'}}

                    />
                  </div>
                )}
                
                <div className="home__work-together__inner__card__number">
                    5
                    </div>
                <div className="home__work-together__inner__card__title">
                {allArticles[4]?.title?.slice(0, 50) || "No article available"}...
                    </div>
                <div className="home__work-together__inner__card__subtitle">
                {allArticles[4]?.description?.slice(0, 100) || "No description available"}...
                    </div>

                </div>
                <div 
                  className="home__work-together__inner__card"
                  onClick={() => handleArticleClick(allArticles[5])}
                  style={{ cursor: getArticleUrl(allArticles[5]) ? 'pointer' : 'default' }}
                >
                {/* Article Image */}
                {allArticles[5]?.featuredImage?.url && (
                  <div className="home__work-together__inner__card__image">
                    <Image 
                    width={400}
                    height={150}
                      src={`https://miro.medium.com/v2/resize:fit:400/1*${allArticles[5].featuredImage.url.split('*')[1]}`}
                      alt={allArticles[5]?.title || "Article image"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      style={{width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '14px'}}

                    />
                  </div>
                )}
                
                <div className="home__work-together__inner__card__number">
                    6
                    </div>
                <div className="home__work-together__inner__card__title">
                {allArticles[5]?.title?.slice(0, 50) || "No article available"}...
                    </div>
                <div className="home__work-together__inner__card__subtitle">
                {allArticles[5]?.description?.slice(0, 100) || "No description available"}...
                    </div>

                </div>
            </div>
         

            <div className="home__work-together__inner__button-group">
            <Link href={"/articles"} prefetch={true}>
            <button>
                Read our articles

<Image src={"/assets/icons/rightArrowLight.svg"} width={18} height={18} alt="Right Arrow" />
                </button>
            </Link>
            
            </div>
        </div>
        
        <style jsx>{`
          .home__work-together__inner__card {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .home__work-together__inner__card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                        border-radius: 0;
          }
          
          .home__work-together__inner__card[style*="pointer"]:hover::after {
            content: "Click to read on Medium →";
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(255, 215, 0, 0.9);
            color: #1a1a2e;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            opacity: 0;
            transform: translateY(10px);
            animation: slideUp 0.3s ease forwards;
          }
          
          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
         
          .loading-message, .error-message {
            text-align: center;
            padding: 40px 20px;
            color: #666;
            font-size: 16px;
          }
          
          .error-message p {
            margin: 10px 0;
          }
          
          .retry-button {
            background: #FFD700;
            color: #1a1a2e;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 15px;
            transition: all 0.3s ease;
          }
          
          .retry-button:hover {
            background: #ffed4e;
            transform: translateY(-2px);
          }
        `}</style>
       </div>
    )
}