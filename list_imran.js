const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/imran_clusters_ready.json', 'utf8'));
console.log('Total clusters in imran_clusters_ready.json:', data.length);
data.forEach((c, idx) => {
  const versesSummary = c.verses ? c.verses.map(v => (v.surah || 'آل عمران') + ' ' + v.ayah).join(' | ') : 'none';
  console.log((idx + 1) + '. [' + c.id + '] ' + c.title + ' -> ' + versesSummary);
});
