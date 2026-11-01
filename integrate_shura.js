const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const shuraClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/shura_scholarly_verified.json', 'utf8'));

const shuraData = {
  name: "سورة الشورى",
  totalAyahs: 53,
  clusters: shuraClusters
};

// 1. Add option to dropdown
const fussilatOption = '<option value="fussilat">سورة فصلت (28 موضعاً محققاً)</option>';
const shuraOption = '\n                <option value="shura">سورة الشورى (28 موضعاً محققاً)</option>';

if (!html.includes(fussilatOption)) {
  console.error('FAIL: fussilatOption not found!');
  process.exit(1);
}

if (!html.includes('value="shura"')) {
  html = html.replace(fussilatOption, fussilatOption + shuraOption);
  console.log('Added shura to dropdown.');
} else {
  console.log('shura option already in dropdown.');
}

// 2. Add shura to surahsData
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

const shuraJsonStr = ',\n    "shura": ' + JSON.stringify(shuraData, null, 4);

// Check if shura already in surahsData
if (!html.includes('"shura": {')) {
  html = html.substring(0, lastBraceIdx) + shuraJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted shura into surahsData.');
} else {
  console.log('shura already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ash-Shura into index.html!');
