const fs = require('fs');

const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');
const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);
const currentCode = html.substring(startIdx, endIdx);
eval(currentCode.replace('const surahsData =', 'global.surahsData ='));

const surahs = global.surahsData;

const results = [];

Object.keys(surahs).forEach(sKey => {
  const surah = surahs[sKey];
  surah.clusters.forEach((c, idx) => {
    const clusterInfo = {
      surah: sKey,
      index: idx + 1,
      id: c.id,
      title: c.title,
      versesCount: c.verses.length,
      verses: []
    };
    c.verses.forEach(v => {
      const tokens = [];
      const regex = /<span class="diff-token ([^"]+)">([^<]+)<\/span>/g;
      let m;
      while ((m = regex.exec(v.html)) !== null) {
        tokens.push({ cls: m[1], text: m[2] });
      }
      // Check plain text length vs highlighted text length
      const plainText = v.html.replace(/<[^>]+>/g, '').trim();
      const highlightedText = tokens.map(t => t.text).join(' ').trim();
      const isEntireVerseHighlighted = (highlightedText.length >= plainText.length * 0.85);

      clusterInfo.verses.push({
        ayah: v.ayah,
        surahName: v.surahName || surah.name,
        plainText: plainText,
        tokens: tokens,
        isEntireVerseHighlighted: isEntireVerseHighlighted
      });
    });
    results.push(clusterInfo);
  });
});

console.log('Total clusters analyzed:', results.length);

// Find clusters where entire verse is highlighted
const fullHighlighted = results.filter(c => c.verses.some(v => v.isEntireVerseHighlighted));
console.log('Clusters where entire verse is highlighted (BAD UX):', fullHighlighted.length);
fullHighlighted.forEach(c => {
  console.log(`[${c.surah} #${c.index} ${c.id}] ${c.title}`);
  c.verses.forEach(v => {
    if (v.isEntireVerseHighlighted) {
      console.log(`   Ayah ${v.ayah}: entire verse highlighted! tokens: ${v.tokens.map(t=>t.text).join(' | ')}`);
    }
  });
});
