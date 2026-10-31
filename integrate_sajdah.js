const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const sajdahClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/sajdah_scholarly_verified.json', 'utf8'));

const sajdahData = {
  name: "سورة السجدة",
  totalAyahs: 30,
  clusters: sajdahClusters
};

// 1. Add option to dropdown
const luqmanOption = '<option value="luqman">سورة لقمان (30 موضعاً محققاً)</option>';
const sajdahOption = '\n                <option value="sajdah">سورة السجدة (27 موضعاً محققاً)</option>';

if (!html.includes(luqmanOption)) {
  console.error('FAIL: luqmanOption not found!');
  process.exit(1);
}

if (!html.includes('value="sajdah"')) {
  html = html.replace(luqmanOption, luqmanOption + sajdahOption);
  console.log('Added sajdah to dropdown.');
} else {
  console.log('sajdah option already in dropdown.');
}

// 2. Add sajdah to surahsData
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

const sajdahJsonStr = ',\n    "sajdah": ' + JSON.stringify(sajdahData, null, 4);

// Check if sajdah already in surahsData
if (!html.includes('"sajdah": {')) {
  html = html.substring(0, lastBraceIdx) + sajdahJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted sajdah into surahsData.');
} else {
  console.log('sajdah already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah As-Sajdah into index.html!');
