const fs = require('fs');

const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');
const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);
const currentCode = html.substring(startIdx, endIdx);
eval(currentCode.replace('const surahsData =', 'global.surahsData ='));

const surahs = global.surahsData;

['baqarah', 'aal_imran', 'nisa'].forEach(sKey => {
  const surah = surahs[sKey];
  console.log(`\n================================================================`);
  console.log(`SURAH: ${surah.name} (${surah.clusters.length} clusters)`);
  console.log(`================================================================`);
  
  surah.clusters.forEach((c, idx) => {
    console.log(`\n#${idx + 1} [${c.id}] ${c.title}`);
    c.verses.forEach(v => {
      // Extract what is inside <span class="diff-token ...">...</span>
      const matches = [...v.html.matchAll(/<span class="diff-token ([^"]+)">([^<]+)<\/span>/g)];
      const highlightedTokens = matches.map(m => `[${m[1]}: "${m[2]}"]`).join(', ');
      console.log(`  Ayah ${v.ayah}: ${highlightedTokens}`);
    });
  });
});
