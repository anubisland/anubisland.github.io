const fs = require('fs');

const bqRefined = require('./refine_baqarah.js');
const imRefined = require('./refine_aal_imran.js');
const nsRefined = require('./refine_nisa.js');

let html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate surahsData block');
  process.exit(1);
}

const currentCode = html.substring(startIdx, endIdx);
eval(currentCode.replace('const surahsData =', 'global.surahsData ='));

const surahs = global.surahsData;

function applyRefinementToSurah(surahKey, refMap) {
  const clusters = surahs[surahKey].clusters;
  let updatedCount = 0;
  
  clusters.forEach(c => {
    if (refMap[c.id]) {
      const refinedVerses = refMap[c.id];
      refinedVerses.forEach((rv, vIdx) => {
        if (c.verses[vIdx]) {
          c.verses[vIdx].html = rv.html;
          
          // Extract text inside diff-token spans to set c.verses[vIdx].tokens
          const tokens = [];
          const regex = /<span class="diff-token [^"]+">([^<]+)<\/span>/g;
          let m;
          while ((m = regex.exec(rv.html)) !== null) {
            tokens.push(m[1].trim());
          }
          if (tokens.length > 0) {
            c.verses[vIdx].tokens = tokens;
          }
        }
      });
      updatedCount++;
    }
  });
  console.log(`Updated ${updatedCount}/${clusters.length} clusters in ${surahKey}`);
}

applyRefinementToSurah('baqarah', bqRefined);
applyRefinementToSurah('aal_imran', imRefined);
applyRefinementToSurah('nisa', nsRefined);

// Serialize surahsData cleanly back to index.html
const updatedJSON = JSON.stringify(surahs, null, 4);
const newDeclaration = `const surahsData = ${updatedJSON};\n\n    `;

const newHtml = html.substring(0, startIdx) + newDeclaration + html.substring(endIdx);
fs.writeFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', newHtml, 'utf8');
console.log('Successfully wrote refined clusters to index.html');
