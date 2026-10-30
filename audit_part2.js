const fs = require('fs');
const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const currentCode = html.substring(startIdx, endIdx);
eval(currentCode.replace('const surahsData =', 'global.surahsData ='));

const bq = global.surahsData.baqarah.clusters;

console.log('--- Inspecting Baqarah clusters 11 to 25 ---');
for (let i = 10; i < 25; i++) {
  const c = bq[i];
  console.log(`\n#${i+1} [${c.id}] ${c.title}`);
  c.verses.forEach(v => {
    const highlightedMatches = v.html.match(/<span class="diff-token[^"]*">([\s\S]*?)<\/span>/g);
    const highlighted = highlightedMatches ? highlightedMatches.map(m => m.replace(/<[^>]+>/g, '')).join(' | ') : 'NONE';
    console.log(`   Ayah ${v.ayah}: Highlighted: "${highlighted}"`);
  });
}
