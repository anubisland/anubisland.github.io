const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const hujuratClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/hujurat_scholarly_verified.json', 'utf8'));

const hujuratData = {
  name: "سورة الحجرات",
  totalAyahs: 18,
  clusters: hujuratClusters
};

// 1. Add option to dropdown after fath
const fathOption = '<option value="fath">سورة الفتح (21 موضعاً محققاً)</option>';
const hujuratOption = '\n                <option value="hujurat">سورة الحجرات (17 موضعاً محققاً)</option>';

if (html.includes(fathOption)) {
  if (!html.includes('value="hujurat"')) {
    html = html.replace(fathOption, fathOption + hujuratOption);
    console.log('Added hujurat to dropdown.');
  } else {
    console.log('hujurat option already in dropdown.');
  }
} else {
  console.log('fathOption not found!');
}

// 2. Add hujurat to surahsData
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

const hujuratJsonStr = ',\n    "hujurat": ' + JSON.stringify(hujuratData, null, 4);

// Check if hujurat already in surahsData
if (!html.includes('"hujurat": {')) {
  html = html.substring(0, lastBraceIdx) + hujuratJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted hujurat into surahsData.');
} else {
  console.log('hujurat already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Hujurat into index.html!');
