const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function run() {
  console.log("Launching Brave...");
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    headless: "new"
  });

  const page = await browser.newPage();
  console.log("Navigating to AITR CSIT page...");
  await page.goto('https://aitr.ac.in/computer-science-and-information-technology-csit/', { waitUntil: 'networkidle0' });

  console.log("Extracting images...");
  const facultyPhotos = await page.evaluate(() => {
    const results = [];
    const targets = ['Bhalerao', 'Kate', 'Bansal', 'Nigam'];
    const elements = Array.from(document.querySelectorAll('.elementor-widget-text-editor, .elementor-heading-title'));
    
    for (const el of elements) {
      const text = el.innerText || el.textContent;
      let matchedTarget = targets.find(t => text.includes(t));
      if (matchedTarget) {
        // Go up a bit higher to ensure we capture the whole block
        const container = el.closest('.elementor-container') || el.closest('.elementor-section');
        if (container) {
          // Check all descendants for a background image
          const allDescendants = Array.from(container.querySelectorAll('*'));
          for (const d of allDescendants) {
            const style = window.getComputedStyle(d);
            const bgImg = style.backgroundImage;
            if (bgImg && bgImg !== 'none' && !bgImg.includes('data:image')) {
               // extract URL
               const match = bgImg.match(/url\((['"]?)(.*?)\1\)/);
               if (match && match[2]) {
                 results.push({ name: matchedTarget, url: match[2] });
               }
            }
          }
        }
      }
    }
    return results;
  });

  console.log("Found photos mapping:");
  console.log(facultyPhotos);
  
  // Save to json
  fs.writeFileSync('faculty_images_map.json', JSON.stringify(facultyPhotos, null, 2));

  await browser.close();
}

run().catch(console.error);
