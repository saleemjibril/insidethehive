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
      const articlesData = response?.data || {};
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
            <div className="home__work-together__inner__grid-mini">
                <div className="home__work-together__inner__card">
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
                <div className="home__work-together__inner__card">
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
            </div>
            <div className="home__work-together__inner__grid">
                <div className="home__work-together__inner__card">
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
                <div className="home__work-together__inner__card">
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
                <div className="home__work-together__inner__card">
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
       </div>
    )
}