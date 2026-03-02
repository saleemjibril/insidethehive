"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Categories() {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const cardRefs = useRef([]);

    // Categories data with proper letter arrays
    const categories = [
        {
            id: 'blockchain',
            image: '/assets/blockchain1.jpg',
            letters: ['B', 'L', 'O', 'C', 'K', 'C', 'H', 'A', 'I', 'N'],
            colors: {
                title: '#fff',
                button: '#fff',
                brand: '#fff'
            }
        },
        {
            id: 'crypto',
            image: '/assets/cryptopayment4.jpg',
            letters: ['C', 'R', 'Y', 'P', 'T', 'O', '', '', 'P', 'A', 'Y', 'M', 'E', 'N', 'T', 'S'],
            colors: {
                title: '#fff',
                button: '#fff',
                brand: '#fff'
            }
        },
        {
            id: 'web3',
            image: '/assets/web3gaming.jpg',
            letters: ['W', 'E', 'B', '3', '', '', 'G', 'A', 'M', 'I', 'N', 'G'],
            colors: {
                title: '#fff',
                button: '#fff',
                brand: '#fff'
            }
        },
        {
            id: 'nft',
            image: '/assets/nft.jpg',
            letters: ['N', 'F', 'T', 's'],
            colors: {
                title: '#fff',
                button: '#fff',
                brand: '#fff'
            }
        },
        {
            id: 'creator-and-socialfi',
            image: '/assets/nft.jpg',
            letters: ['Creator', 'and', 'Socialfi'],
            colors: {
                title: '#fff',
                button: '#fff',
                brand: '#fff'
            }
        }
    ];

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setVisibleCards(prev => new Set([...prev, index]));
                    }
                });
            },
            { threshold: 0.3 }
        );

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="categories">
            {categories.map((category, index) => (
                <div
                    key={category.id}
                    ref={el => cardRefs.current[index] = el}
                    data-index={index}
                    className={`categories__card ${visibleCards.has(index) ? 'visible' : ''}`}
                >
                    <div className="categories__card__image">
                        <img src={category.image} alt={category.id} />
                    </div>
                    
                    <div className="categories__card__title">
                        {category.letters.map((letter, letterIndex) => (
                            <div
                                key={letterIndex}
                                className="letter"
                                style={{
                                    '--delay': `${letterIndex * 0.1}s`,
                                    color: category.colors.title
                                }}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>

                    <div className="categories__card__button-group">
                        <Link href={`/categories/${category.id}`}>
                            <button
                                style={{
                                    borderColor: category.colors.button,
                                    color: category.colors.button
                                }}
                            >
                                view episodes
                            </button>
                        </Link>
                        <div 
                            className="brand-text"
                            style={{ color: category.colors.brand }}
                        >
                            INSIDETHEHIVE
                        </div>
                    </div>
                </div>
            ))}

        
        </div>
    );
}