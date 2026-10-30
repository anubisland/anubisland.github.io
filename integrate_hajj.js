const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const hajjClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/hajj_scholarly_verified.json', 'utf8'));

const hajjData = {
  name: "سورة الحج",
  totalAyahs: 78,
  clusters: hajjClusters
};

// 1. Add option to dropdown
const anbiyaOption = '<option value="anbiya">سورة الأنبياء (40 موضعاً محققاً)</option>';
const hajjOption = '\n                <option value="hajj">سورة الحج (36 موضعاً محققاً)</option>';

if (!html.includes(anbiyaOption)) {
  console.error('FAIL: anbiyaOption not found!');
  process.exit(1);
}

if (!html.includes('value="hajj"')) {
  html = html.replace(anbiyaOption, anbiyaOption + hajjOption);
  console.log('Added hajj to dropdown.');
} else {
  console.log('hajj option already in dropdown.');
}

// 2. Add hajj to surahsData
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

const hajjJsonStr = ',\n    "hajj": ' + JSON.stringify(hajjData, null, 4);

// Check if hajj already in surahsData
if (!html.includes('"hajj": {')) {
  html = html.substring(0, lastBraceIdx) + hajjJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted hajj into surahsData.');
} else {
  console.log('hajj already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Hajj into index.html!');
