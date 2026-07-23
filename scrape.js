const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function run() {
  const res = await fetch('https://aitr.ac.in/computer-science-and-information-technology-csit/');
  const text = await res.text();
  const $ = cheerio.load(text);
  
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt') || '';
    if(src) {
      console.log(src, alt);
    }
  });

  console.log("--- Background Images ---");
  const bgs = text.match(/background-image:\s*url\((['"]?)(.*?)\1\)/g);
  if (bgs) {
    bgs.forEach(b => console.log(b));
  }
}
run();
