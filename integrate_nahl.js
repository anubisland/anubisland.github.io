const fs = require('fs');

const nahlJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/nahl_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(nahlJsonPath)) {
  console.error('nahl_scholarly_verified.json not found!');
  process.exit(1);
}

const nahlClusters = JSON.parse(fs.readFileSync(nahlJsonPath, 'utf8'));
console.log('Loaded Nahl clusters:', nahlClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if nahl is already in surahsData
if (html.includes('"nahl": {')) {
  console.log('Nahl already present in index.html');
  process.exit(0);
}

// 2. Add select option
const hijrOption = '<option value="hijr">سورة الحجر (32 موضعاً محققاً)</option>';
const nahlOption = '<option value="hijr">سورة الحجر (32 موضعاً محققاً)</option>\n                <option value="nahl">سورة النحل (40 موضعاً محققاً)</option>';

if (!html.includes(hijrOption)) {
  console.error('Could not find hijrOption in select dropdown!');
  process.exit(1);
}

html = html.replace(hijrOption, nahlOption);
console.log('Added select option for Surah An-Nahl.');

// 3. Extract surahsData and insert nahl object
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

surahsData.nahl = {
  name: "سورة النحل",
  totalAyahs: 128,
  clusters: nahlClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah An-Nahl into index.html!');
