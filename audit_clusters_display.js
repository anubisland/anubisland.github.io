const fs = require('fs');

const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');
const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);
const currentCode = html.substring(startIdx, endIdx);
eval(currentCode.replace('const surahsData =', 'global.surahsData ='));

const bq = global.surahsData.baqarah.clusters;
console.log('Baqarah clusters count: ' + bq.length);
for (let i = 0; i < Math.min(10, bq.length); i++) {
  console.log('=========================================');
  console.log('Cluster #' + (i+1) + ' [' + bq[i].id + '] - ' + bq[i].title);
  bq[i].verses.forEach(v => {
    console.log('  [Ayah ' + v.ayah + ']: ' + v.html);
  });
}
