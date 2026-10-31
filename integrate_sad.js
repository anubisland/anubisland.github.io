const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const sadClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/sad_scholarly_verified.json', 'utf8'));

const sadData = {
  name: "سورة ص",
  totalAyahs: 88,
  clusters: sadClusters
};

// 1. Add option to dropdown
const saffatOption = '<option value="saffat">سورة الصافات (36 موضعاً محققاً)</option>';
const sadOption = '\n                <option value="sad">سورة ص (30 موضعاً محققاً)</option>';

if (!html.includes(saffatOption)) {
  console.error('FAIL: saffatOption not found!');
  process.exit(1);
}

if (!html.includes('value="sad"')) {
  html = html.replace(saffatOption, saffatOption + sadOption);
  console.log('Added sad to dropdown.');
} else {
  console.log('sad option already in dropdown.');
}

// 2. Add sad to surahsData
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

const sadJsonStr = ',\n    "sad": ' + JSON.stringify(sadData, null, 4);

// Check if sad already in surahsData
if (!html.includes('"sad": {')) {
  html = html.substring(0, lastBraceIdx) + sadJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted sad into surahsData.');
} else {
  console.log('sad already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Sad into index.html!');
