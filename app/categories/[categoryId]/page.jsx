'use client';

import { useParams } from 'next/navigation';
import AllEpisodes from '../../components/allEpisodes';

const categoryInfo = {
  'blockchain': {
    title: 'Blockchain Episodes',
    description: 'Explore episodes about blockchain technology',
    image: '/assets/blockchain1.jpg',
    keywords: ['blockchain']
  },
  'crypto': {
    title: 'Crypto Payments',
    description: 'Episodes about cryptocurrency and digital payments',
    image: '/assets/cryptopayment4.jpg',
    keywords: ['crypto', 'payments']
  },
  'web3': {
    title: 'Web3 & Gaming',
    description: 'Discover the intersection of Web3 and gaming',
    image: '/assets/web3gaming.jpg',
    keywords: ['web3', 'gaming']
  },
  'nft': {
    title: 'NFTs',
    description: 'Learn about non-fungible tokens and digital collectibles',
    image: '/assets/nft.jpg',
    keywords: ['nft']
  },
  'creator-and-socialfi': {
    title: 'Creator & SocialFi',
    description: 'Episodes about creators and social finance',
    image: '/assets/nft.jpg',
    keywords: ['creator', 'socialfi']
  }
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId;
  const category = categoryInfo[categoryId] || { title: 'Category', description: '' };

  return (
    <div className="category-page">
      <div className="category-page__header">
        <div className="category-page__header__content">
          <h1 className="category-page__header__title">{category.title}</h1>
          <p className="category-page__header__description">{category.description}</p>
        </div>
      </div>

      <div className="category-page__episodes">
        <AllEpisodes
          clientId={"34a81146217d4ccaa855f8e53f8163ac"}
          clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
          showId={"0wOOX8mdQUoRP1adnxV9VD"}
          categoryKeywords={category.keywords}
        />
      </div>
    </div>
  );
}
