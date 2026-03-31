/** Shared category config for `/categories/[categoryId]` page + layout metadata. */
export const CATEGORY_ROUTES = {
  blockchain: {
    title: "Blockchain Episodes",
    description: "Explore episodes about blockchain technology",
    image: "/assets/blockchain1.jpg",
    keywords: ["blockchain"],
  },
  crypto: {
    title: "Crypto Payments",
    description: "Episodes about cryptocurrency and digital payments",
    image: "/assets/cryptopayment4.jpg",
    keywords: ["crypto", "payments"],
  },
  web3: {
    title: "Web3 & Gaming",
    description: "Discover the intersection of Web3 and gaming",
    image: "/assets/web3gaming.jpg",
    keywords: ["web3", "gaming"],
  },
  nft: {
    title: "NFTs",
    description: "Learn about non-fungible tokens and digital collectibles",
    image: "/assets/nft.jpg",
    keywords: ["nft"],
  },
  "creator-and-socialfi": {
    title: "Creator & SocialFi",
    description: "Episodes about creators and social finance",
    image: "/assets/nft.jpg",
    keywords: ["creator", "socialfi"],
  },
};

export function getCategoryRoute(categoryId) {
  return (
    CATEGORY_ROUTES[categoryId] || {
      title: "Episodes",
      description: "Inside The Hive podcast episodes by category.",
      image: undefined,
      keywords: [],
    }
  );
}
