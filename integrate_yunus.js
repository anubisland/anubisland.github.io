const fs = require('fs');

const yunusJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/yunus_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(yunusJsonPath)) {
  console.error('yunus_scholarly_verified.json not found!');
  process.exit(1);
}

const yunusClusters = JSON.parse(fs.readFileSync(yunusJsonPath, 'utf8'));
console.log('Loaded Yunus clusters:', yunusClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if yunus is already in surahsData
if (html.includes('"yunus": {')) {
  console.log('Yunus already present in index.html');
  process.exit(0);
}

// 2. Add select option
const tawbahOption = '<option value="tawbah">سورة التوبة (40 موضعاً محققاً)</option>';
const yunusOption = '<option value="tawbah">سورة التوبة (40 موضعاً محققاً)</option>\n                <option value="yunus">سورة يونس (36 موضعاً محققاً)</option>';

if (!html.includes(tawbahOption)) {
  console.error('Could not find tawbahOption in select dropdown!');
  process.exit(1);
}

html = html.replace(tawbahOption, yunusOption);
console.log('Added select option for Surah Yunus.');

// 3. Extract surahsData and insert yunus object
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

surahsData.yunus = {
  name: "سورة يونس",
  totalAyahs: 109,
  clusters: yunusClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Yunus into index.html!');
