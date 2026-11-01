const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const jathiyahClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/jathiyah_scholarly_verified.json', 'utf8'));

const jathiyahData = {
  name: "سورة الجاثية",
  totalAyahs: 37,
  clusters: jathiyahClusters
};

// 1. Add option to dropdown
const dukhanOption = '<option value="dukhan">سورة الدخان (26 موضعاً محققاً)</option>';
const jathiyahOption = '\n                <option value="jathiyah">سورة الجاثية (24 موضعاً محققاً)</option>';

if (!html.includes(dukhanOption)) {
  console.error('FAIL: dukhanOption not found!');
  process.exit(1);
}

if (!html.includes('value="jathiyah"')) {
  html = html.replace(dukhanOption, dukhanOption + jathiyahOption);
  console.log('Added jathiyah to dropdown.');
} else {
  console.log('jathiyah option already in dropdown.');
}

// 2. Add jathiyah to surahsData
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

const jathiyahJsonStr = ',\n    "jathiyah": ' + JSON.stringify(jathiyahData, null, 4);

// Check if jathiyah already in surahsData
if (!html.includes('"jathiyah": {')) {
  html = html.substring(0, lastBraceIdx) + jathiyahJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted jathiyah into surahsData.');
} else {
  console.log('jathiyah already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Jathiyah into index.html!');
