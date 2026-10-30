const fs = require('fs');

const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const marker = 'const surahsData = ';
const jsonStart = html.indexOf('{', html.indexOf(marker));
let depth = 0, inStr = null, end = -1;
for (let i = jsonStart; i < html.length; i++) {
  const ch = html[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === inStr) inStr = null;
  } else {
    if (ch === '"' || ch === "'") inStr = ch;
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
}

const surahsData = eval('(' + html.substring(jsonStart, end) + ')');
console.log('Surahs in index.html:', Object.keys(surahsData));
console.log('Surah Hud clusters:', surahsData.hud.clusters.length);
console.log('hud_01 title:', surahsData.hud.clusters[0].title);
console.log('hud_40 title:', surahsData.hud.clusters[39].title);
console.log('hud_01 dabit:', surahsData.hud.clusters[0].dabit);
console.log('hud_40 dabit:', surahsData.hud.clusters[39].dabit);
