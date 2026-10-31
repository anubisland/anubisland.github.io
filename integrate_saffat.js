const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const saffatClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/saffat_scholarly_verified.json', 'utf8'));

const saffatData = {
  name: "سورة الصافات",
  totalAyahs: 182,
  clusters: saffatClusters
};

// 1. Add option to dropdown
const yasinOption = '<option value="yasin">سورة يس (36 موضعاً محققاً)</option>';
const saffatOption = '\n                <option value="saffat">سورة الصافات (36 موضعاً محققاً)</option>';

if (!html.includes(yasinOption)) {
  console.error('FAIL: yasinOption not found!');
  process.exit(1);
}

if (!html.includes('value="saffat"')) {
  html = html.replace(yasinOption, yasinOption + saffatOption);
  console.log('Added saffat to dropdown.');
} else {
  console.log('saffat option already in dropdown.');
}

// 2. Add saffat to surahsData
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

const saffatJsonStr = ',\n    "saffat": ' + JSON.stringify(saffatData, null, 4);

// Check if saffat already in surahsData
if (!html.includes('"saffat": {')) {
  html = html.substring(0, lastBraceIdx) + saffatJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted saffat into surahsData.');
} else {
  console.log('saffat already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah As-Saffat into index.html!');
