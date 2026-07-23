const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function run() {
  const res = await fetch('https://aitr.ac.in/computer-science-and-information-technology-csit/');
  const text = await res.text();
  const $ = cheerio.load(text);
  
  // Find all elements that have inline styles with background-image OR are in css
  // In elementor, usually there's a widget container with the image and another widget with the text.
  $('.elementor-widget-wrap').each((i, wrap) => {
     const textContent = $(wrap).text().replace(/\s+/g, ' ').trim();
     if (textContent.includes("Bhalerao") || textContent.includes("Kate") || textContent.includes("Bansal") || textContent.includes("Nigam")) {
       console.log("FOUND NAME IN WRAPPER:", textContent);
       // Now try to find the class of the parent or something that might have the image
       const parentSection = $(wrap).closest('.elementor-section');
       const classes = parentSection.attr('class') || '';
       console.log("PARENT CLASSES:", classes);
     }
  });

  // Let's also just extract all text blocks and their nearest background image
  $('.elementor-widget-text-editor, .elementor-heading-title').each((i, el) => {
     const t = $(el).text().trim();
     if (t.includes("Bhalerao") || t.includes("Kate") || t.includes("Bansal") || t.includes("Nigam")) {
         console.log("FOUND TEXT NODE:", t);
         // Find the closest column
         const col = $(el).closest('.elementor-column');
         console.log("COLUMN HTML SNIPPET:", col.html().substring(0, 200));
     }
  });
}
run();
