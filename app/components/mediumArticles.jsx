// components/MediumArticles.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getArticlesx } from '../apis';

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="episodes">
      {/* Header Skeleton */}
      <div className="episodes__title-group" style={{ marginBottom: '20px' }}>
        <div style={{
          width: '200px',
          height: '24px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{
          width: '100px',
          height: '24px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
      </div>

      {/* Search Input Skeleton */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          width: '100%',
          height: '48px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
      </div>

      {/* Filter Tags Skeleton */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          width: '150px',
          height: '16px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '10px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: `${Math.random() * 60 + 60}px`,
                height: '28px',
                backgroundColor: '#f0f0f0',
                borderRadius: '6px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Article Cards Skeleton */}
      <div className="episodes__cards">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="episodes__cards__card">
            <div className="episodes__cards__card__inner">
              <div className="episodes__cards__card__inner__details">
                {/* Title Skeleton */}
                <div style={{
                  width: '80%',
                  height: '24px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${index * 0.1}s`
                }}></div>
                
                {/* Description Skeleton */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    width: '100%',
                    height: '14px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    animationDelay: `${index * 0.1 + 0.2}s`
                  }}></div>
                  <div style={{
                    width: '85%',
                    height: '14px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    animationDelay: `${index * 0.1 + 0.3}s`
                  }}></div>
                  <div style={{
                    width: '60%',
                    height: '14px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    animationDelay: `${index * 0.1 + 0.4}s`
                  }}></div>
                </div>

                {/* Tags Skeleton */}
                <div className="episodes__cards__card__inner__details__tags">
                  {[...Array(3)].map((_, tagIndex) => (
                    <div
                      key={tagIndex}
                      style={{
                        width: `${Math.random() * 40 + 50}px`,
                        height: '20px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        animationDelay: `${index * 0.1 + tagIndex * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="episodes__cards__card__inner__preview">
                {/* Article Image Skeleton */}
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${index * 0.1 + 0.5}s`
                }}></div>

                {/* Date and Reading Time Skeleton */}
                <div className="episodes__cards__card__inner__preview__group">
                  <div style={{
                    width: '80px',
                    height: '14px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    animationDelay: `${index * 0.1 + 0.6}s`
                  }}></div>
                  <div style={{
                    width: '60px',
                    height: '14px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    animationDelay: `${index * 0.1 + 0.7}s`
                  }}></div>
                </div>

                {/* Read Button Skeleton */}
                <div style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${index * 0.1 + 0.8}s`
                }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default function MediumArticles({ 
  maxResults = 20,
  initialKeyword = ''
}) {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]); // Store all articles for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  
  // Pagination states for filtered results
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(maxResults);

  // Dynamic tags extracted from actual article content
  const [availableTags, setAvailableTags] = useState([]);

  // Fetch articles when component mounts
  useEffect(() => {
    fetchAllArticles();
  }, []);

  const fetchAllArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticlesx();
      console.log("getArticlesx", response);
      
      // Extract articles from the response structure
      const articlesData = response?.data || {};
      const articlesArray = Object.values(articlesData);
      
      console.log("All articles fetched:", articlesArray.length);
      setAllArticles(articlesArray);
      
      // Extract and set dynamic tags from article content
      const extractedTags = extractTagsFromArticles(articlesArray);
      setAvailableTags(extractedTags);
      
    } catch (err) {
      console.error('Error fetching Medium articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort articles
  const getFilteredAndSortedArticles = () => {
    let filtered = [...allArticles];
    
    // Filter by keyword
    if (keyword.trim()) {
      const searchTerm = keyword.toLowerCase().trim();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm) || 
        (article.content?.subtitle || '').toLowerCase().includes(searchTerm) ||
        (article.virtuals?.subtitle || '').toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by tag (searching in title and subtitle)
    if (selectedTag) {
      const tagTerm = selectedTag.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(tagTerm) || 
        (article.content?.subtitle || '').toLowerCase().includes(tagTerm) ||
        (article.virtuals?.subtitle || '').toLowerCase().includes(tagTerm) ||
        (article.virtuals?.tags || []).some(tag => 
          tag.name.toLowerCase().includes(tagTerm)
        )
      );
    }
    
    // Sort articles
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.firstPublishedAt);
      const dateB = new Date(b.createdAt || b.firstPublishedAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  };

  // Get paginated results
  const getPaginatedArticles = () => {
    const filtered = getFilteredAndSortedArticles();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      articles: filtered.slice(startIndex, endIndex),
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
    const { totalPages } = getPaginatedArticles();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // Extract meaningful tags/keywords from article content
  const extractTagsFromArticles = (articles) => {
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
      'just', 'now', 'how', 'what', 'when', 'where', 'who', 'why', 'article', 'blog', 'post', 'today', 'discussion',
      'writing', 'author', 'medium', 'story', 'series', 'part', 'new', 'latest', 'guide', 'tutorial', 'learn', 'learning'
    ]);
    
    // First collect tags from Medium's tag system
    const mediumTags = new Set();
    articles.forEach(article => {
      if (article.virtuals?.tags) {
        article.virtuals.tags.forEach(tag => {
          mediumTags.add(tag.name);
        });
      }
    });
    
    // Then extract from content
    articles.forEach(article => {
      const content = `${article.title} ${article.content?.subtitle || ''} ${article.virtuals?.subtitle || ''}`.toLowerCase();
      
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
    
    // Sort by frequency and take top tags that appear in multiple articles
    const minOccurrences = Math.max(1, Math.floor(articles.length * 0.1)); // At least 1 or 10% of articles
    const topTags = Object.entries(tagCounts)
      .filter(([word, count]) => count >= minOccurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15) // Limit to top 15 tags
      .map(([word]) => word);
    
    // Combine Medium tags with extracted tags
    const allTags = [...new Set([...Array.from(mediumTags), ...topTags])];
    
    console.log('Extracted tags:', allTags);
    console.log('Tag frequencies:', Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 20));
    
    return allTags;
  };

  // Helper function to extract tags from article content
  const getArticleTags = (article) => {
    // First try Medium's tags
    if (article.virtuals?.tags && article.virtuals.tags.length > 0) {
      return article.virtuals.tags.map(tag => tag.name);
    }
    
    // Fallback to content-based tags
    const content = `${article.title} ${article.content?.subtitle || ''} ${article.virtuals?.subtitle || ''}`.toLowerCase();
    return availableTags.filter(tag => 
      content.includes(tag.toLowerCase())
    );
  };

  // Helper function to format reading time
  const formatReadingTime = (readingTime) => {
    if (!readingTime) return '5 min read';
    const minutes = Math.ceil(readingTime);
    return `${minutes} min read`;
  };

  // Helper function to get article URL
  const getArticleUrl = (article) => {
    return `https://medium.com/@${article.creatorId}/${article.uniqueSlug}`;
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <div>Error loading articles: {error}</div>;

  const { articles: paginatedArticles, totalCount, totalPages } = getPaginatedArticles();

  return (
    <div className="episodes" id='all'>
      <div className="episodes__title-group">
        <div>Browse All our Articles ({totalCount} {totalCount === 1 ? 'article' : 'articles'})</div>
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
          placeholder="Search articles by title or description..."
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
          {availableTags.length === 0 && allArticles.length > 0 && (
            <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#666', marginLeft: '10px' }}>
              (Analyzing article content...)
            </span>
          )}
        </div>
        <div className="episodes__filters__group" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availableTags.length === 0 && allArticles.length > 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Extracting topics from your Medium articles...
            </div>
          ) : (
            availableTags.map(tag => (
            <div 
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedTag === tag ? '#FFD700' : '#FFF',
                color: selectedTag === tag ? '#17171c' : '#17171c',
                padding: '5px 8px',
                borderRadius: '6px',
                boxShadow: selectedTag === tag ? "" : "0 2px 8px rgba(0, 0, 0, 0.15)",
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
                padding: '5px 8px',
                borderRadius: '6px',
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
          Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} articles
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      )}

      <div className="episodes__cards">
        {paginatedArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            {allArticles.length === 0 ? 'No articles found.' : 'No articles match your current filters.'}
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
          paginatedArticles.map((article, index) => {
            const articleTags = getArticleTags(article);
            const publishDate = new Date(article.firstPublishedAt || article.createdAt);
            
            return (
              <div key={article.id} className="episodes__cards__card">
                <div className="episodes__cards__card__inner">
                  <div className="episodes__cards__card__inner__details">
                    <div className="episodes__cards__card__inner__details__title">
                      {article.title}
                    </div>
                    <div className="episodes__cards__card__inner__details__subtitle">
                      {(article?.description|| '').length > 200 
                        ? `${(article?.description || '').substring(0, 200)}...` 
                        : (article?.description|| 'Click to read this article on Medium')
                      }
                    </div>
                    <div className="episodes__cards__card__inner__details__tags">
                      {[...articleTags]?.slice(0, 4)?.map(tag => (
                        <div key={tag}>{tag}</div>
                      ))}
                      {articleTags.length === 0 && <div>Article</div>}
                    </div>
                  </div>

                  <div className="episodes__cards__card__inner__preview">
                    {/* Article Preview Image */}
                    {article.featuredImage?.url && (
                      <div style={{ width: '100%', marginBottom: '10px' }}>
                        <img 
                          src={`https://miro.medium.com/v2/resize:fit:800/1*${article.featuredImage?.url.split('*')[1]}`}
                          alt={article.title}
                          style={{ 
                            width: '100%', 
                            height: '150px', 
                            objectFit: 'cover', 
                            borderRadius: '8px' 
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="episodes__cards__card__inner__preview__group">
                      <div>{publishDate.toLocaleDateString()}</div>
                      <div>{formatReadingTime(article.virtuals?.readingTime)}</div>
                    </div>
                    
                    {/* Article Link Button */}
                    <div style={{ width: '100%', marginBottom: '10px'}}>
                      <a 
                        href={article.guid}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#1a1a1a',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          textAlign: 'center',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#FFD700';
                          e.target.style.color = '#000';
                          e.target.style.border = '1px solid #000';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#1a1a1a';
                          e.target.style.color = '#fff';
                        }}
                      >
                        Read on Medium →
                      </a>
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