const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function run() {
  const res = await fetch('https://aitr.ac.in/computer-science-and-information-technology-csit/');
  const text = await res.text();
  const $ = cheerio.load(text);
  
  $('.elementor-widget-text-editor, .elementor-heading-title').each((i, el) => {
     const t = $(el).text().trim();
     if (t.includes("Bhalerao") || t.includes("Kate") || t.includes("Bansal") || t.includes("Nigam")) {
         console.log("=== NAME:", t.split('E-mail')[0].split('Email')[0].trim());
         // Find the closest section or column that contains this text
         // Then search within that section/column for background images or img tags.
         const section = $(el).closest('.elementor-container, .elementor-section');
         
         const html = section.html() || '';
         // look for background-image:url(...) or src="..."
         const bgs = html.match(/background-image:\s*url\((['"]?)(.*?)\1\)/g);
         if (bgs) {
             console.log("  Backgrounds found in section:");
             bgs.forEach(b => console.log("   ", b));
         }
         
         // try grabbing images
         section.find('img').each((i, img) => {
             const src = $(img).attr('src');
             if(src) console.log("  IMG src:", src);
         });
     }
  });
}
run();
