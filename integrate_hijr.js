const fs = require('fs');

const hijrJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/hijr_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(hijrJsonPath)) {
  console.error('hijr_scholarly_verified.json not found!');
  process.exit(1);
}

const hijrClusters = JSON.parse(fs.readFileSync(hijrJsonPath, 'utf8'));
console.log('Loaded Hijr clusters:', hijrClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if hijr is already in surahsData
if (html.includes('"hijr": {')) {
  console.log('Hijr already present in index.html');
  process.exit(0);
}

// 2. Add select option
const ibrahimOption = '<option value="ibrahim">سورة إبراهيم (28 موضعاً محققاً)</option>';
const hijrOption = '<option value="ibrahim">سورة إبراهيم (28 موضعاً محققاً)</option>\n                <option value="hijr">سورة الحجر (32 موضعاً محققاً)</option>';

if (!html.includes(ibrahimOption)) {
  console.error('Could not find ibrahimOption in select dropdown!');
  process.exit(1);
}

html = html.replace(ibrahimOption, hijrOption);
console.log('Added select option for Surah Al-Hijr.');

// 3. Extract surahsData and insert hijr object
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

surahsData.hijr = {
  name: "سورة الحجر",
  totalAyahs: 99,
  clusters: hijrClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Hijr into index.html!');
