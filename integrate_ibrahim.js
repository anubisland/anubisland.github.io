const fs = require('fs');

const ibrahimJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/ibrahim_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(ibrahimJsonPath)) {
  console.error('ibrahim_scholarly_verified.json not found!');
  process.exit(1);
}

const ibrahimClusters = JSON.parse(fs.readFileSync(ibrahimJsonPath, 'utf8'));
console.log('Loaded Ibrahim clusters:', ibrahimClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if ibrahim is already in surahsData
if (html.includes('"ibrahim": {')) {
  console.log('Ibrahim already present in index.html');
  process.exit(0);
}

// 2. Add select option
const radOption = '<option value="rad">سورة الرعد (28 موضعاً محققاً)</option>';
const ibrahimOption = '<option value="rad">سورة الرعد (28 موضعاً محققاً)</option>\n                <option value="ibrahim">سورة إبراهيم (28 موضعاً محققاً)</option>';

if (!html.includes(radOption)) {
  console.error('Could not find radOption in select dropdown!');
  process.exit(1);
}

html = html.replace(radOption, ibrahimOption);
console.log('Added select option for Surah Ibrahim.');

// 3. Extract surahsData and insert ibrahim object
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

surahsData.ibrahim = {
  name: "سورة إبراهيم",
  totalAyahs: 52,
  clusters: ibrahimClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ibrahim into index.html!');
