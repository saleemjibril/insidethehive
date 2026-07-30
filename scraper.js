const puppeteer = require('puppeteer');

class SpotifyPodcastScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: false, // Keep this false to see what's happening
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: 100 // Slow down actions to see them
    });
    this.page = await this.browser.newPage();
    
    // Set viewport
    await this.page.setViewport({ width: 1280, height: 720 });
    
    // Set user agent
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  }

  async loginToSpotify(email, password) {
    try {
      console.log('Navigating to Spotify login...');
      await this.page.goto('https://accounts.spotify.com/en/login?&allow_password=1&continue=https%3A%2F%2Fopen.spotify.com%2F%3Fflow_ctx%3D5d7a5d11-5db0-4d9a-8d0c-a428a5528ade%3A1760900412&flow_ctx=5d7a5d11-5db0-4d9a-8d0c-a428a5528ade%3A1760900412');
      
      // Wait for login form
      await this.page.waitForSelector('#login-username');
      
      // Fill login credentials
      await this.page.type('#login-username', email);
      await this.page.type('#login-password', password);
      
      // Click login button
      await this.page.click('#login-button');
      
      // Wait for redirect
      await this.page.waitForNavigation();
      
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async debugPageContent(episodeUrl) {
    try {
      console.log(`\n=== DEBUGGING PAGE CONTENT ===`);
      console.log(`URL: ${episodeUrl}`);
      
      await this.page.goto(episodeUrl, { waitUntil: 'networkidle2' });
      
      // Wait for page to load
      console.log('Waiting for page to load...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Take a screenshot for debugging
      await this.page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
      console.log('Screenshot saved as debug-screenshot.png');
      
      // Check page title
      const title = await this.page.title();
      console.log(`Page title: ${title}`);
      
      // Check if we're actually on an episode page
      const pageContent = await this.page.evaluate(() => {
        return {
          url: window.location.href,
          hasEpisodeContent: !!document.querySelector('[data-testid="episode"]') || 
                           !!document.querySelector('[data-testid="episode-page"]') ||
                           !!document.querySelector('h1'),
          episodeTitle: document.querySelector('h1')?.textContent,
          bodyText: document.body.innerText.substring(0, 500),
          allDataTestIds: Array.from(document.querySelectorAll('[data-testid]')).map(el => el.getAttribute('data-testid')).slice(0, 20)
        };
      });
      
      console.log('Page analysis:', pageContent);
      
      // Look for any comment-related elements
      const commentElements = await this.page.evaluate(() => {
        const possibleSelectors = [
          '[data-testid*="comment"]',
          '[class*="comment"]',
          '[class*="Comment"]', 
          'div[role="textbox"]',
          'textarea',
          '.comments',
          '.Comments',
          '[aria-label*="comment"]',
          '[aria-label*="Comment"]'
        ];
        
        const foundElements = [];
        
        possibleSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            foundElements.push({
              selector: selector,
              count: elements.length,
              sampleText: elements[0].textContent?.substring(0, 100)
            });
          }
        });
        
        return foundElements;
      });
      
      console.log('Comment-related elements found:', commentElements);
      
      // Check if comments section might be behind a button/tab
      const interactiveElements = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, [role="button"], [role="tab"]'));
        return buttons
          .filter(btn => btn.textContent?.toLowerCase().includes('comment') || 
                        btn.textContent?.toLowerCase().includes('discussion') ||
                        btn.textContent?.toLowerCase().includes('reviews'))
          .map(btn => ({
            text: btn.textContent.trim(),
            classes: btn.className,
            dataTestId: btn.getAttribute('data-testid')
          }));
      });
      
      console.log('Interactive elements (comments/discussion):', interactiveElements);
      
      return {
        pageContent,
        commentElements,
        interactiveElements
      };
      
    } catch (error) {
      console.error('Debug failed:', error);
      return null;
    }
  }

  async scrapeEpisodeComments(episodeUrl) {
    try {
      // First, debug the page
      const debugInfo = await this.debugPageContent(episodeUrl);
      
      // Try to find comments with multiple strategies
      console.log('\n=== ATTEMPTING TO FIND COMMENTS ===');
      
      // Strategy 1: Look for obvious comment selectors
      let comments = await this.page.evaluate(() => {
        const selectors = [
          '[data-testid="comment"]',
          '[data-testid*="comment"]',
          '.comment',
          '.Comment',
          '[class*="comment"]',
          '[class*="Comment"]'
        ];
        
        const commentsData = [];
        
        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            const text = element.textContent?.trim();
            if (text && text.length > 5) {
              commentsData.push({
                author: 'Unknown',
                text: text,
                timestamp: 'Unknown',
                scraped_at: new Date().toISOString(),
                foundWith: selector
              });
            }
          });
        });
        
        return commentsData;
      });
      
      console.log(`Found ${comments.length} comments with basic selectors`);
      
      // Strategy 2: Look for any user-generated content
      if (comments.length === 0) {
        console.log('Trying to find any user-generated content...');
        
        comments = await this.page.evaluate(() => {
          const textElements = document.querySelectorAll('p, div, span');
          const possibleComments = [];
          
          textElements.forEach(element => {
            const text = element.textContent?.trim();
            // Look for text that might be comments (longer than 10 chars, not navigation/UI text)
            if (text && 
                text.length > 10 && 
                text.length < 500 &&
                !text.includes('Spotify') &&
                !text.includes('Play') &&
                !text.includes('Share') &&
                !text.match(/^\d+:\d+$/)) { // Not timestamps
              
              possibleComments.push({
                author: 'Unknown',
                text: text,
                timestamp: 'Unknown',
                scraped_at: new Date().toISOString(),
                foundWith: 'content-search'
              });
            }
          });
          
          // Remove duplicates and limit results
          const unique = possibleComments.filter((comment, index, self) => 
            index === self.findIndex(c => c.text === comment.text)
          ).slice(0, 10);
          
          return unique;
        });
        
        console.log(`Found ${comments.length} possible comments with content search`);
      }
      
      return comments;
      
    } catch (error) {
      console.error('Error scraping comments:', error);
      return [];
    }
  }

  async scrapeMultipleEpisodes(episodeUrls) {
    const allComments = {};
    
    for (const url of episodeUrls) {
      console.log(`\n=== Processing: ${url} ===`);
      const comments = await this.scrapeEpisodeComments(url);
      allComments[url] = comments;
      
      console.log(`Found ${comments.length} comments for this episode`);
      
      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return allComments;
  }

  async saveCommentsToFile(comments, filename = 'podcast_comments.json') {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(comments, null, 2));
    console.log(`Comments saved to ${filename}`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

module.exports = SpotifyPodcastScraper;