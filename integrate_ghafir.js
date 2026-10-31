const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const ghafirClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/ghafir_scholarly_verified.json', 'utf8'));

const ghafirData = {
  name: "سورة غافر",
  totalAyahs: 85,
  clusters: ghafirClusters
};

// 1. Add option to dropdown
const zumarOption = '<option value="zumar">سورة الزمر (35 موضعاً محققاً)</option>';
const ghafirOption = '\n                <option value="ghafir">سورة غافر (34 موضعاً محققاً)</option>';

if (!html.includes(zumarOption)) {
  console.error('FAIL: zumarOption not found!');
  process.exit(1);
}

if (!html.includes('value="ghafir"')) {
  html = html.replace(zumarOption, zumarOption + ghafirOption);
  console.log('Added ghafir to dropdown.');
} else {
  console.log('ghafir option already in dropdown.');
}

// 2. Add ghafir to surahsData
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

const ghafirJsonStr = ',\n    "ghafir": ' + JSON.stringify(ghafirData, null, 4);

// Check if ghafir already in surahsData
if (!html.includes('"ghafir": {')) {
  html = html.substring(0, lastBraceIdx) + ghafirJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted ghafir into surahsData.');
} else {
  console.log('ghafir already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ghafir into index.html!');
