const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const yasinClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/yasin_scholarly_verified.json', 'utf8'));

const yasinData = {
  name: "سورة يس",
  totalAyahs: 83,
  clusters: yasinClusters
};

// 1. Add option to dropdown
const fatirOption = '<option value="fatir">سورة فاطر (32 موضعاً محققاً)</option>';
const yasinOption = '\n                <option value="yasin">سورة يس (36 موضعاً محققاً)</option>';

if (!html.includes(fatirOption)) {
  console.error('FAIL: fatirOption not found!');
  process.exit(1);
}

if (!html.includes('value="yasin"')) {
  html = html.replace(fatirOption, fatirOption + yasinOption);
  console.log('Added yasin to dropdown.');
} else {
  console.log('yasin option already in dropdown.');
}

// 2. Add yasin to surahsData
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

const yasinJsonStr = ',\n    "yasin": ' + JSON.stringify(yasinData, null, 4);

// Check if yasin already in surahsData
if (!html.includes('"yasin": {')) {
  html = html.substring(0, lastBraceIdx) + yasinJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted yasin into surahsData.');
} else {
  console.log('yasin already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ya-Sin into index.html!');
