const https = require('https');

function getPhotosForKeyword(keyword) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const matches = html.match(/https:\/\/images\.unsplash\.com\/photo-[0-9a-z-]+/g) || [];
        const unique = Array.from(new Set(matches.map(u => u.split('?')[0]))).filter(u => !u.includes('placeholder'));
        resolve(unique.slice(0, 15));
      });
    }).on('error', () => resolve([]));
  });
}

async function scrapeAll() {
  const categories = ['hedgehog', 'guinea-pig', 'hamster', 'ferret', 'turtle', 'tortoise', 'rabbit', 'parrot', 'bird', 'dog', 'cat'];
  const results = {};
  for (const cat of categories) {
    const urls = await getPhotosForKeyword(cat);
    console.log(`Found ${urls.length} images for ${cat}`);
    results[cat] = urls;
  }
  const fs = require('fs');
  fs.writeFileSync('./seed/scraped_images.json', JSON.stringify(results, null, 2));
  console.log('Saved to seed/scraped_images.json');
}

scrapeAll();
