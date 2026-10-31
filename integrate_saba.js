const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const sabaClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/saba_scholarly_verified.json', 'utf8'));

const sabaData = {
  name: "سورة سبأ",
  totalAyahs: 54,
  clusters: sabaClusters
};

// 1. Add option to dropdown
const ahzabOption = '<option value="ahzab">سورة الأحزاب (36 موضعاً محققاً)</option>';
const sabaOption = '\n                <option value="saba">سورة سبأ (36 موضعاً محققاً)</option>';

if (!html.includes(ahzabOption)) {
  console.error('FAIL: ahzabOption not found!');
  process.exit(1);
}

if (!html.includes('value="saba"')) {
  html = html.replace(ahzabOption, ahzabOption + sabaOption);
  console.log('Added saba to dropdown.');
} else {
  console.log('saba option already in dropdown.');
}

// 2. Add saba to surahsData
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

const sabaJsonStr = ',\n    "saba": ' + JSON.stringify(sabaData, null, 4);

// Check if saba already in surahsData
if (!html.includes('"saba": {')) {
  html = html.substring(0, lastBraceIdx) + sabaJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted saba into surahsData.');
} else {
  console.log('saba already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Saba into index.html!');
