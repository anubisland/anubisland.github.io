const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const dukhanClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/dukhan_scholarly_verified.json', 'utf8'));

const dukhanData = {
  name: "سورة الدخان",
  totalAyahs: 59,
  clusters: dukhanClusters
};

// 1. Add option to dropdown
const zukhrufOption = '<option value="zukhruf">سورة الزخرف (34 موضعاً محققاً)</option>';
const dukhanOption = '\n                <option value="dukhan">سورة الدخان (26 موضعاً محققاً)</option>';

if (!html.includes(zukhrufOption)) {
  console.error('FAIL: zukhrufOption not found!');
  process.exit(1);
}

if (!html.includes('value="dukhan"')) {
  html = html.replace(zukhrufOption, zukhrufOption + dukhanOption);
  console.log('Added dukhan to dropdown.');
} else {
  console.log('dukhan option already in dropdown.');
}

// 2. Add dukhan to surahsData
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

const dukhanJsonStr = ',\n    "dukhan": ' + JSON.stringify(dukhanData, null, 4);

// Check if dukhan already in surahsData
if (!html.includes('"dukhan": {')) {
  html = html.substring(0, lastBraceIdx) + dukhanJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted dukhan into surahsData.');
} else {
  console.log('dukhan already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ad-Dukhan into index.html!');
