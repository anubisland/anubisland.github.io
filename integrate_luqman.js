const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const luqmanClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/luqman_scholarly_verified.json', 'utf8'));

const luqmanData = {
  name: "سورة لقمان",
  totalAyahs: 34,
  clusters: luqmanClusters
};

// 1. Add option to dropdown
const rumOption = '<option value="rum">سورة الروم (36 موضعاً محققاً)</option>';
const luqmanOption = '\n                <option value="luqman">سورة لقمان (30 موضعاً محققاً)</option>';

if (!html.includes(rumOption)) {
  console.error('FAIL: rumOption not found!');
  process.exit(1);
}

if (!html.includes('value="luqman"')) {
  html = html.replace(rumOption, rumOption + luqmanOption);
  console.log('Added luqman to dropdown.');
} else {
  console.log('luqman option already in dropdown.');
}

// 2. Add luqman to surahsData
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

const luqmanJsonStr = ',\n    "luqman": ' + JSON.stringify(luqmanData, null, 4);

// Check if luqman already in surahsData
if (!html.includes('"luqman": {')) {
  html = html.substring(0, lastBraceIdx) + luqmanJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted luqman into surahsData.');
} else {
  console.log('luqman already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Luqman into index.html!');
