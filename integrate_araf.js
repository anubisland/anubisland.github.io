const fs = require('fs');

// Read araf data
const arafClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json', 'utf8'));
console.log('Loaded araf clusters:', arafClusters.length);

// Read index.html
let html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

// Check if araf is already there
if (html.includes('"araf": {')) {
  console.log('Araf already present in index.html');
  process.exit(0);
}

// 1. Add option to select dropdown
// Find <option value="anam">
const anamOption = '<option value="anam">سورة الأنعام (40 موضعاً محققاً)</option>';
const arafOption = '<option value="anam">سورة الأنعام (40 موضعاً محققاً)</option>\n                <option value="araf">سورة الأعراف (40 موضعاً محققاً)</option>';

if (!html.includes(anamOption)) {
  console.error('Could not find anamOption in select!');
  process.exit(1);
}

html = html.replace(anamOption, arafOption);
console.log('Select option added.');

// 2. Add araf to surahsData
// The araf data structure inside surahsData:
/*
    "araf": {
        "name": "سورة الأعراف",
        "totalAyahs": 206,
        "clusters": [ ... ]
    }
*/

const arafObject = {
  name: "سورة الأعراف",
  totalAyahs: 206,
  clusters: arafClusters
};

const arafJsonStr = ',\n    "araf": ' + JSON.stringify(arafObject, null, 4);

// Find the end of "anam" inside surahsData
// Let's locate "anam": { and its closing brace
const anamStart = html.indexOf('"anam": {');
if (anamStart === -1) {
  console.error('Could not find "anam": {');
  process.exit(1);
}

// Find matching closing brace for "anam" object
let depth = 0;
let inStr = null;
let anamEnd = -1;
for (let i = anamStart + 8; i < html.length; i++) {
  const ch = html[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === inStr) { inStr = null; }
  } else {
    if (ch === '"' || ch === "'") { inStr = ch; }
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        anamEnd = i + 1;
        break;
      }
    }
  }
}

if (anamEnd === -1) {
  console.error('Could not find end of anam object');
  process.exit(1);
}

console.log('Found anam from', anamStart, 'to', anamEnd);

// Insert arafJsonStr right after anamEnd
html = html.substring(0, anamEnd) + arafJsonStr + html.substring(anamEnd);

fs.writeFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', html, 'utf8');
console.log('Successfully integrated Surah Al-Araf into index.html!');
