const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const ahzabClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/ahzab_scholarly_verified.json', 'utf8'));

const ahzabData = {
  name: "سورة الأحزاب",
  totalAyahs: 73,
  clusters: ahzabClusters
};

// 1. Add option to dropdown
const sajdahOption = '<option value="sajdah">سورة السجدة (27 موضعاً محققاً)</option>';
const ahzabOption = '\n                <option value="ahzab">سورة الأحزاب (36 موضعاً محققاً)</option>';

if (!html.includes(sajdahOption)) {
  console.error('FAIL: sajdahOption not found!');
  process.exit(1);
}

if (!html.includes('value="ahzab"')) {
  html = html.replace(sajdahOption, sajdahOption + ahzabOption);
  console.log('Added ahzab to dropdown.');
} else {
  console.log('ahzab option already in dropdown.');
}

// 2. Add ahzab to surahsData
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

const ahzabJsonStr = ',\n    "ahzab": ' + JSON.stringify(ahzabData, null, 4);

// Check if ahzab already in surahsData
if (!html.includes('"ahzab": {')) {
  html = html.substring(0, lastBraceIdx) + ahzabJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted ahzab into surahsData.');
} else {
  console.log('ahzab already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Ahzab into index.html!');
