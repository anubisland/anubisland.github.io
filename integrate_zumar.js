const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const zumarClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/zumar_scholarly_verified.json', 'utf8'));

const zumarData = {
  name: "سورة الزمر",
  totalAyahs: 75,
  clusters: zumarClusters
};

// 1. Add option to dropdown
const sadOption = '<option value="sad">سورة ص (30 موضعاً محققاً)</option>';
const zumarOption = '\n                <option value="zumar">سورة الزمر (35 موضعاً محققاً)</option>';

if (!html.includes(sadOption)) {
  console.error('FAIL: sadOption not found!');
  process.exit(1);
}

if (!html.includes('value="zumar"')) {
  html = html.replace(sadOption, sadOption + zumarOption);
  console.log('Added zumar to dropdown.');
} else {
  console.log('zumar option already in dropdown.');
}

// 2. Add zumar to surahsData
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

const zumarJsonStr = ',\n    "zumar": ' + JSON.stringify(zumarData, null, 4);

// Check if zumar already in surahsData
if (!html.includes('"zumar": {')) {
  html = html.substring(0, lastBraceIdx) + zumarJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted zumar into surahsData.');
} else {
  console.log('zumar already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Az-Zumar into index.html!');
