const fs = require('fs');

const anfalJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/anfal_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

const anfalClusters = JSON.parse(fs.readFileSync(anfalJsonPath, 'utf8'));
console.log('Loaded Anfal clusters:', anfalClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if anfal is already in surahsData
if (html.includes('"anfal": {')) {
  console.log('Anfal already present in index.html');
  process.exit(0);
}

// 2. Add select option
const arafOption = '<option value="araf">سورة الأعراف (40 موضعاً محققاً)</option>';
const anfalOption = '<option value="araf">سورة الأعراف (40 موضعاً محققاً)</option>\n                <option value="anfal">سورة الأنفال (36 موضعاً محققاً)</option>';

if (!html.includes(arafOption)) {
  console.error('Could not find arafOption in select dropdown!');
  process.exit(1);
}

html = html.replace(arafOption, anfalOption);
console.log('Added select option for Surah Al-Anfal.');

// 3. Extract surahsData and insert anfal object
const marker = 'const surahsData = ';
const start = html.indexOf(marker);
let depth = 0;
let inStr = null;
let end = -1;
const jsonStart = html.indexOf('{', start);
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

surahsData.anfal = {
  name: "سورة الأنفال",
  totalAyahs: 75,
  clusters: anfalClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Anfal into index.html!');
