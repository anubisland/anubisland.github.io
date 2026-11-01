const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const ahqafClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/ahqaf_scholarly_verified.json', 'utf8'));

const ahqafData = {
  name: "سورة الأحقاف",
  totalAyahs: 35,
  clusters: ahqafClusters
};

// 1. Add option to dropdown
const jathiyahOption = '<option value="jathiyah">سورة الجاثية (24 موضعاً محققاً)</option>';
const ahqafOption = '\n                <option value="ahqaf">سورة الأحقاف (24 موضعاً محققاً)</option>';

if (!html.includes(jathiyahOption)) {
  console.error('FAIL: jathiyahOption not found!');
  process.exit(1);
}

if (!html.includes('value="ahqaf"')) {
  html = html.replace(jathiyahOption, jathiyahOption + ahqafOption);
  console.log('Added ahqaf to dropdown.');
} else {
  console.log('ahqaf option already in dropdown.');
}

// 2. Add ahqaf to surahsData
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

const ahqafJsonStr = ',\n    "ahqaf": ' + JSON.stringify(ahqafData, null, 4);

// Check if ahqaf already in surahsData
if (!html.includes('"ahqaf": {')) {
  html = html.substring(0, lastBraceIdx) + ahqafJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted ahqaf into surahsData.');
} else {
  console.log('ahqaf already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Ahqaf into index.html!');
