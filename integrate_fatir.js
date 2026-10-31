const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const fatirClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/fatir_scholarly_verified.json', 'utf8'));

const fatirData = {
  name: "سورة فاطر",
  totalAyahs: 45,
  clusters: fatirClusters
};

// 1. Add option to dropdown
const sabaOption = '<option value="saba">سورة سبأ (36 موضعاً محققاً)</option>';
const fatirOption = '\n                <option value="fatir">سورة فاطر (32 موضعاً محققاً)</option>';

if (!html.includes(sabaOption)) {
  console.error('FAIL: sabaOption not found!');
  process.exit(1);
}

if (!html.includes('value="fatir"')) {
  html = html.replace(sabaOption, sabaOption + fatirOption);
  console.log('Added fatir to dropdown.');
} else {
  console.log('fatir option already in dropdown.');
}

// 2. Add fatir to surahsData
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

const fatirJsonStr = ',\n    "fatir": ' + JSON.stringify(fatirData, null, 4);

// Check if fatir already in surahsData
if (!html.includes('"fatir": {')) {
  html = html.substring(0, lastBraceIdx) + fatirJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted fatir into surahsData.');
} else {
  console.log('fatir already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Fatir into index.html!');
