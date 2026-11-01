const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const fathClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/fath_scholarly_verified.json', 'utf8'));

const fathData = {
  name: "سورة الفتح",
  totalAyahs: 29,
  clusters: fathClusters
};

// 1. Add option to dropdown
const muhammadOption = '<option value="muhammad">سورة محمد (22 موضعاً محققاً)</option>';
const fathOption = '\n                <option value="fath">سورة الفتح (21 موضعاً محققاً)</option>';

if (html.includes(muhammadOption)) {
  if (!html.includes('value="fath"')) {
    html = html.replace(muhammadOption, muhammadOption + fathOption);
    console.log('Added fath to dropdown.');
  } else {
    console.log('fath option already in dropdown.');
  }
} else {
  console.log('muhammadOption not found, trying ahqaf...');
}

// 2. Add fath to surahsData
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

const fathJsonStr = ',\n    "fath": ' + JSON.stringify(fathData, null, 4);

// Check if fath already in surahsData
if (!html.includes('"fath": {')) {
  html = html.substring(0, lastBraceIdx) + fathJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted fath into surahsData.');
} else {
  console.log('fath already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Fath into index.html!');
