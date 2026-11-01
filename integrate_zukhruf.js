const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const zukhrufClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/zukhruf_scholarly_verified.json', 'utf8'));

const zukhrufData = {
  name: "سورة الزخرف",
  totalAyahs: 89,
  clusters: zukhrufClusters
};

// 1. Add option to dropdown
const shuraOption = '<option value="shura">سورة الشورى (28 موضعاً محققاً)</option>';
const zukhrufOption = '\n                <option value="zukhruf">سورة الزخرف (34 موضعاً محققاً)</option>';

if (!html.includes(shuraOption)) {
  console.error('FAIL: shuraOption not found!');
  process.exit(1);
}

if (!html.includes('value="zukhruf"')) {
  html = html.replace(shuraOption, shuraOption + zukhrufOption);
  console.log('Added zukhruf to dropdown.');
} else {
  console.log('zukhruf option already in dropdown.');
}

// 2. Add zukhruf to surahsData
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker);
if (endIdx === -1) {
  console.error('FAIL: endMarker not found!');
  process.exit(1);
}

// Find the last closing `};` before `let currentSurah =`
const lastBraceIdx = html.lastIndexOf('};', endIdx);
if (lastBraceIdx === -1) {
  console.error('FAIL: lastBraceIdx not found!');
  process.exit(1);
}

const zukhrufJsonStr = ',\n    "zukhruf": ' + JSON.stringify(zukhrufData, null, 4);

// Check if zukhruf already in surahsData
if (!html.includes('"zukhruf": {')) {
  html = html.substring(0, lastBraceIdx) + zukhrufJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted zukhruf into surahsData.');
} else {
  console.log('zukhruf already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Az-Zukhruf into index.html!');
