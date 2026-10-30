const fs = require('fs');

const tawbahJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/tawbah_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

const tawbahClusters = JSON.parse(fs.readFileSync(tawbahJsonPath, 'utf8'));
console.log('Loaded Tawbah clusters:', tawbahClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// Ensure select option exists
const anfalOption = '<option value="anfal">سورة الأنفال (36 موضعاً محققاً)</option>';
const tawbahOption = '<option value="anfal">سورة الأنفال (36 موضعاً محققاً)</option>\n                <option value="tawbah">سورة التوبة (40 موضعاً محققاً)</option>';

if (!html.includes('value="tawbah"')) {
  if (html.includes(anfalOption)) {
    html = html.replace(anfalOption, tawbahOption);
    console.log('Added select option for Surah At-Tawbah.');
  }
}

// Extract surahsData and update tawbah object
const marker = 'const surahsData = ';
const start = html.indexOf(marker);
const jsonStart = html.indexOf('{', start);
let depth = 0;
let inStr = null;
let end = -1;

for (let i = jsonStart; i < html.length; i++) {
  const ch = html[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === inStr) { inStr = null; }
  } else {
    if (ch === '"' || ch === "'") { inStr = ch; }
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
}

const objStr = html.substring(jsonStart, end);
const surahsData = eval('(' + objStr + ')');

surahsData.tawbah = {
  name: "سورة التوبة",
  totalAyahs: 129,
  clusters: tawbahClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated updated Surah At-Tawbah into index.html!');
