const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { Jimp, distance } = require('jimp');

async function download(url, dest) {
  const res = await fetch(url);
  const buffer = await res.buffer();
  fs.writeFileSync(dest, buffer);
}

const map = require('./faculty_images_map.json');
const uniqueUrls = [...new Set(map.map(m => m.url))];

const thumbnails = [
  { name: 'Bhalerao', file: 'public/images/leadership/shilpa-bhalerao.jpg' },
  { name: 'Kate', file: 'public/images/leadership/vandana-kate.jpg' },
  { name: 'Nigam', file: 'public/images/leadership/nidhi-nigam.jpg' },
  { name: 'Bansal', file: 'public/images/leadership/chanchal-bansal.jpg' }
];

async function run() {
  if (!fs.existsSync('temp_images')) fs.mkdirSync('temp_images');
  console.log("Downloading", uniqueUrls.length, "images...");
  
  const downloadedFiles = [];
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    const ext = url.split('.').pop() || 'jpg';
    const dest = `temp_images/img_${i}.${ext}`;
    try {
      await download(url, dest);
      downloadedFiles.push(dest);
    } catch(e) { console.error("Failed to download", url); }
  }

  console.log("Comparing images...");
  for (const thumb of thumbnails) {
     const thumbImg = await Jimp.read(thumb.file);
     let bestMatch = null;
     let bestDist = Infinity;
     for (const file of downloadedFiles) {
        try {
          const highRes = await Jimp.read(file);
          // Scale highRes down to thumbnail size for comparison
          highRes.resize({ w: thumbImg.bitmap.width, h: thumbImg.bitmap.height });
          const diff = distance(thumbImg, highRes);
          if (diff < bestDist) {
            bestDist = diff;
            bestMatch = file;
          }
        } catch(e) {}
     }
     console.log(`Thumbnail: ${thumb.name} -> Best Match: ${bestMatch} (distance: ${bestDist})`);
     if (bestMatch && bestDist < 0.2) {
        // Copy the high res image over the old one
        fs.copyFileSync(bestMatch, thumb.file);
        console.log(`Replaced ${thumb.file} with high-res version!`);
     } else {
        console.log(`No confident match found for ${thumb.name}.`);
     }
  }
}

run().catch(console.error);
