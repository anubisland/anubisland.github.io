const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const muhammadClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/muhammad_scholarly_verified.json', 'utf8'));

const muhammadData = {
  name: "سورة محمد",
  totalAyahs: 38,
  clusters: muhammadClusters
};

// 1. Add option to dropdown
const ahqafOption = '<option value="ahqaf">سورة الأحقاف (24 موضعاً محققاً)</option>';
const muhammadOption = '\n                <option value="muhammad">سورة محمد (22 موضعاً محققاً)</option>';

if (!html.includes(ahqafOption)) {
  console.error('FAIL: ahqafOption not found!');
  process.exit(1);
}

if (!html.includes('value="muhammad"')) {
  html = html.replace(ahqafOption, ahqafOption + muhammadOption);
  console.log('Added muhammad to dropdown.');
} else {
  console.log('muhammad option already in dropdown.');
}

// 2. Add muhammad to surahsData
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

const muhammadJsonStr = ',\n    "muhammad": ' + JSON.stringify(muhammadData, null, 4);

// Check if muhammad already in surahsData
if (!html.includes('"muhammad": {')) {
  html = html.substring(0, lastBraceIdx) + muhammadJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted muhammad into surahsData.');
} else {
  console.log('muhammad already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Muhammad into index.html!');
