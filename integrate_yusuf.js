const fs = require('fs');

const yusufJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/yusuf_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(yusufJsonPath)) {
  console.error('yusuf_scholarly_verified.json not found!');
  process.exit(1);
}

const yusufClusters = JSON.parse(fs.readFileSync(yusufJsonPath, 'utf8'));
console.log('Loaded Yusuf clusters:', yusufClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if yusuf is already in surahsData
if (html.includes('"yusuf": {')) {
  console.log('Yusuf already present in index.html');
  process.exit(0);
}

// 2. Add select option
const hudOption = '<option value="hud">سورة هود (40 موضعاً محققاً)</option>';
const yusufOption = '<option value="hud">سورة هود (40 موضعاً محققاً)</option>\n                <option value="yusuf">سورة يوسف (36 موضعاً محققاً)</option>';

if (!html.includes(hudOption)) {
  console.error('Could not find hudOption in select dropdown!');
  process.exit(1);
}

html = html.replace(hudOption, yusufOption);
console.log('Added select option for Surah Yusuf.');

// 3. Extract surahsData and insert yusuf object
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

surahsData.yusuf = {
  name: "سورة يوسف",
  totalAyahs: 111,
  clusters: yusufClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Yusuf into index.html!');
