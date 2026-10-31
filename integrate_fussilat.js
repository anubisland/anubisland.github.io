const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const fussilatClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/fussilat_scholarly_verified.json', 'utf8'));

const fussilatData = {
  name: "سورة فصلت",
  totalAyahs: 54,
  clusters: fussilatClusters
};

// 1. Add option to dropdown
const ghafirOption = '<option value="ghafir">سورة غافر (34 موضعاً محققاً)</option>';
const fussilatOption = '\n                <option value="fussilat">سورة فصلت (28 موضعاً محققاً)</option>';

if (!html.includes(ghafirOption)) {
  console.error('FAIL: ghafirOption not found!');
  process.exit(1);
}

if (!html.includes('value="fussilat"')) {
  html = html.replace(ghafirOption, ghafirOption + fussilatOption);
  console.log('Added fussilat to dropdown.');
} else {
  console.log('fussilat option already in dropdown.');
}

// 2. Add fussilat to surahsData
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

const fussilatJsonStr = ',\n    "fussilat": ' + JSON.stringify(fussilatData, null, 4);

// Check if fussilat already in surahsData
if (!html.includes('"fussilat": {')) {
  html = html.substring(0, lastBraceIdx) + fussilatJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted fussilat into surahsData.');
} else {
  console.log('fussilat already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Fussilat into index.html!');
