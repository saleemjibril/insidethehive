// lib/medium.js
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'dc:creator']
  }
});

export async function getMediumPosts(username) {
  try {
    const feed = await parser.parseURL(`https://medium.com/feed/@`);
    
    return feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item['dc:creator'] || item.creator,
      categories: item.categories || [],
      contentSnippet: item.contentSnippet,
      content: item['content:encoded'] || item.content,
      guid: item.guid
    }));
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}
