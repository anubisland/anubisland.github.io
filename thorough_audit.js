const fs = require('fs');
const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const currentCode = html.substring(startIdx, endIdx);
eval(currentCode.replace('const surahsData =', 'global.surahsData ='));

const surahs = global.surahsData;
let issues = [];

Object.keys(surahs).forEach(sKey => {
  const surah = surahs[sKey];
  console.log(`\nReviewing Surah: ${surah.name} (${surah.clusters.length} clusters)`);
  
  surah.clusters.forEach((c, idx) => {
    // 1. Verses count
    if (!c.verses || c.verses.length < 2) {
      issues.push(`[${sKey} -> ${c.id}] has fewer than 2 verses!`);
    }

    // 2. Diff tokens in verses html
    c.verses.forEach((v, vIdx) => {
      if (!v.html.includes('diff-token')) {
        issues.push(`[${sKey} -> ${c.id} -> verse ${v.ayah}] has NO diff-token highlight!`);
      }
      // Check if tokens array matches
      if (!v.tokens || v.tokens.length === 0) {
        issues.push(`[${sKey} -> ${c.id} -> verse ${v.ayah}] has empty tokens!`);
      }
    });

    // 3. Scale items
    if (!c.scale || c.scale.length < 2) {
      issues.push(`[${sKey} -> ${c.id}] has fewer than 2 scale items!`);
    }

    // 4. Rhyme & Rule
    if (!c.rhyme || c.rhyme.length < 10) {
      issues.push(`[${sKey} -> ${c.id}] missing or weak rhyme!`);
    }
    if (!c.rule || c.rule.length < 20) {
      issues.push(`[${sKey} -> ${c.id}] missing or weak rule!`);
    }

    // 5. Quiz integrity (supports legacy 2-option and modern 4-option schemas)
    if (!c.quiz) {
      issues.push(`[${sKey} -> ${c.id}] missing quiz!`);
    } else if (c.quiz.promptDisplay && c.quiz.correctOption && c.quiz.wrongOption) {
      if (c.quiz.correctOption.trim() === c.quiz.wrongOption.trim()) {
        issues.push(`[${sKey} -> ${c.id}] quiz options are identical!`);
      }
    } else if (c.quiz.question && Array.isArray(c.quiz.options) && c.quiz.options.length >= 2) {
      const u = new Set(c.quiz.options);
      if (u.size !== c.quiz.options.length) {
        issues.push(`[${sKey} -> ${c.id}] quiz options contain duplicates!`);
      }
      if (typeof c.quiz.correctIndex !== 'number' || c.quiz.correctIndex < 0 || c.quiz.correctIndex >= c.quiz.options.length) {
        issues.push(`[${sKey} -> ${c.id}] quiz correctIndex invalid!`);
      }
    } else {
      issues.push(`[${sKey} -> ${c.id}] incomplete quiz schema!`);
    }
  });
});

console.log('\n=======================================');
console.log('Total issues found across all surahs:', issues.length);
if (issues.length > 0) {
  console.log(issues.slice(0, 30));
} else {
  console.log('ALL CLUSTERS PASS HEURISTIC AUDIT PERFECTLY!');
}
