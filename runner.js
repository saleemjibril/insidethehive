const SpotifyPodcastScraper = require('./scraper'); // Using debug version

async function runScraper() {
  const scraper = new SpotifyPodcastScraper();
  
  try {
    console.log('Starting Spotify podcast scraper...');
    
    // Initialize browser
    await scraper.initialize();
    console.log('Browser initialized');
    
    // Login to Spotify
    // REPLACE THESE WITH YOUR ACTUAL SPOTIFY LOGIN CREDENTIALS
    const email = 'saleemjibril5@gmail.com';
    const password = 'Saleemjay0@';
    
    console.log('Attempting to login...');
    await scraper.loginToSpotify(email, password);
    
    // Your podcast episode URLs
    // REPLACE THESE WITH YOUR ACTUAL EPISODE URLs
    const episodeUrls = [
        "https://open.spotify.com/episode/3i6lztasGCUkVHFnr0FDXk",
        "https://open.spotify.com/episode/5Ma89CrIcvdpzuTIdYwHlb",
        "https://open.spotify.com/episode/1yvGvMTmiR7vjBCPovtKde",
        "https://open.spotify.com/episode/1ukhYUWq5Z5i7q4YzNBEYV",
        "https://open.spotify.com/episode/63iWrBgJW345WgOM3dwkzE",
        "https://open.spotify.com/episode/6ttG2rVuUWoFQB2GSPXpN3",
        "https://open.spotify.com/episode/43xdfTu2dZqVTA3gK48UrE",
        "https://open.spotify.com/episode/6quS9PdtzxbwBqSUgLzbSG",
        "https://open.spotify.com/episode/6DmPihFZkU1dk0WEElxFk5",
        "https://open.spotify.com/episode/5WlGdcABjJfcmWnzFzr4WY",
        "https://open.spotify.com/episode/2n0eesUmASUdu6U8qTnIdf",
        "https://open.spotify.com/episode/2O7v1e26GFn4FrN4v544zt",
        "https://open.spotify.com/episode/1WICc1vuHZQcpX22kvb2T7",
        "https://open.spotify.com/episode/5fj0YHCVzOr24R91gOshaj",
        "https://open.spotify.com/episode/3mtXCafAlBDh0L8K8nFvfG",
        "https://open.spotify.com/episode/2sA4qEQJqZngDOdJA9zEeB",
        "https://open.spotify.com/episode/2qLgsnYdeLaGi53kribm8M",
        "https://open.spotify.com/episode/4qpxJthAxmm8agEdiMKdCr",
        "https://open.spotify.com/episode/7oOaPeNtQsSlIfbKwI1Xsw",
        "https://open.spotify.com/episode/2STeRYrk5HZluAEQVEKSxj",
        "https://open.spotify.com/episode/5BFlw4A0WaOWvXt4RX7PcS",
        "https://open.spotify.com/episode/6seq6fkyWOXOy7KwzI2jYn",
        "https://open.spotify.com/episode/0JlrZI4YPGpO2kcWnwfUY9",
        "https://open.spotify.com/episode/7Joz0sX8kRku4G6iIWcGSc",
        "https://open.spotify.com/episode/3iilCQyCViq0mhGkAoeoNx",
        "https://open.spotify.com/episode/6jqX5EuDmCEnChQiGxpp85",
        "https://open.spotify.com/episode/3V6pv4EkXoQmutVo5M2v5P",
        "https://open.spotify.com/episode/352eRD42kUKUCivdORKQCH",
        "https://open.spotify.com/episode/1PVzpBbbJ9gUWVGYQImROX",
        "https://open.spotify.com/episode/0hZdmg70il5iMgMMJMvS9t",
        "https://open.spotify.com/episode/1XYmD3Geql2VyqLewVkJyz",
        "https://open.spotify.com/episode/0NxqYhwY6rK215RszSuu43",
        "https://open.spotify.com/episode/0Rb1vGP3Obj71pm3V0STTU",
        "https://open.spotify.com/episode/46xWy9gzawGeKsWDFQPGqD",
        "https://open.spotify.com/episode/0G1Sqxv87GDYwv4ZPnUsJ8",
        "https://open.spotify.com/episode/4Rx43NqV5UzhHKVlRBOdjb",
        "https://open.spotify.com/episode/0WWYN5bGACRPOW4ZQFoei1",
        "https://open.spotify.com/episode/45vmmLPgDKqVzcZ5WfypgL",
        "https://open.spotify.com/episode/5IKSOLyhRlZQ4GxZaEtOpy",
        "https://open.spotify.com/episode/1kt0X3Ck8J3kjsvvOdfKbx",
        "https://open.spotify.com/episode/44akTJ7gsrOy35JHxy9Amr",
        "https://open.spotify.com/episode/1RjnKtPK0nK8Mbioz3guN0",
        "https://open.spotify.com/episode/2pbb3Yyd2wR0GFCerLRlvw",
        "https://open.spotify.com/episode/6ApY0Qo5eJ8CVOhSC13vwt",
        "https://open.spotify.com/episode/6uTW0k1SQhzqgG4bFniok9",
        "https://open.spotify.com/episode/7yO7m2kCcb1gxhEfTQnLmC",
        "https://open.spotify.com/episode/4PMcMH58CdwjZueVIkiFjl",
        "https://open.spotify.com/episode/5bXe3DEaAO2ncON7qMO5Ek",
        "https://open.spotify.com/episode/6iBOaYFOIXrQ6SMPGESg2l",
        "https://open.spotify.com/episode/2lPUm58duJ2cIbyuQQOreY"
      ]
    
    console.log('Starting to scrape episodes...');
    
    // Scrape comments from all episodes
    const allComments = await scraper.scrapeMultipleEpisodes(episodeUrls);
    
    // Save comments to JSON file
    await scraper.saveCommentsToFile(allComments, 'my-podcast-comments.json');
    
    // Display results
    console.log('\n=== SCRAPING RESULTS ===');
    Object.keys(allComments).forEach(url => {
      console.log(`\nEpisode: ${url}`);
      console.log(`Comments found: ${allComments[url].length}`);
      
      // Show first few comments as preview
      allComments[url].slice(0, 3).forEach((comment, index) => {
        console.log(`  ${index + 1}. ${comment.author}: ${comment.text.substring(0, 100)}...`);
      });
    });
    
    console.log('\n✅ Scraping completed successfully!');
    console.log('Comments saved to: my-podcast-comments.json');
    
  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
  } finally {
    // Always close the browser
    await scraper.close();
    console.log('Browser closed');
  }
}

// Run the scraper
runScraper();