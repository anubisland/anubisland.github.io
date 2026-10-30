const fs = require('fs');

const radJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/rad_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(radJsonPath)) {
  console.error('rad_scholarly_verified.json not found!');
  process.exit(1);
}

const radClusters = JSON.parse(fs.readFileSync(radJsonPath, 'utf8'));
console.log('Loaded Rad clusters:', radClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if rad is already in surahsData
if (html.includes('"rad": {')) {
  console.log('Rad already present in index.html');
  process.exit(0);
}

// 2. Add select option
const yusufOption = '<option value="yusuf">سورة يوسف (36 موضعاً محققاً)</option>';
const radOption = '<option value="yusuf">سورة يوسف (36 موضعاً محققاً)</option>\n                <option value="rad">سورة الرعد (28 موضعاً محققاً)</option>';

if (!html.includes(yusufOption)) {
  console.error('Could not find yusufOption in select dropdown!');
  process.exit(1);
}

html = html.replace(yusufOption, radOption);
console.log('Added select option for Surah Ar-Ra\'d.');

// 3. Extract surahsData and insert rad object
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

surahsData.rad = {
  name: "سورة الرعد",
  totalAyahs: 43,
  clusters: radClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ar-Ra\'d into index.html!');
