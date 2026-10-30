const fs = require('fs');
const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');
const startIdx = html.indexOf('const surahsData =');
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);
const code = html.substring(startIdx, endIdx);
eval(code.replace('const surahsData =', 'global.surahsData ='));

console.log('Current clusters in Al-Baqarah:', global.surahsData.baqarah.clusters.length);
global.surahsData.baqarah.clusters.forEach((c, i) => {
  const ayahs = c.verses.map(v => v.ayah).join(', ');
  console.log((i + 1) + '. [' + c.id + '] ' + c.title + ' (Ayahs: ' + ayahs + ')');
});
