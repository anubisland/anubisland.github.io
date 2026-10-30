const fs = require('fs');

const hudJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/hud_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

if (!fs.existsSync(hudJsonPath)) {
  console.error('hud_scholarly_verified.json not found!');
  process.exit(1);
}

const hudClusters = JSON.parse(fs.readFileSync(hudJsonPath, 'utf8'));
console.log('Loaded Hud clusters:', hudClusters.length);

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check if hud is already in surahsData
if (html.includes('"hud": {')) {
  console.log('Hud already present in index.html');
  process.exit(0);
}

// 2. Add select option
const yunusOption = '<option value="yunus">سورة يونس (36 موضعاً محققاً)</option>';
const hudOption = '<option value="yunus">سورة يونس (36 موضعاً محققاً)</option>\n                <option value="hud">سورة هود (40 موضعاً محققاً)</option>';

if (!html.includes(yunusOption)) {
  console.error('Could not find yunusOption in select dropdown!');
  process.exit(1);
}

html = html.replace(yunusOption, hudOption);
console.log('Added select option for Surah Hud.');

// 3. Extract surahsData and insert hud object
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

surahsData.hud = {
  name: "سورة هود",
  totalAyahs: 123,
  clusters: hudClusters
};

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Hud into index.html!');
