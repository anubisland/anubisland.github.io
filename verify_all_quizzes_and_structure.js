const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const marker = 'const surahsData = ';
const start = content.indexOf(marker);
let depth = 0;
let inStr = null;
let end = -1;
const jsonStart = content.indexOf('{', start);
for (let i = jsonStart; i < content.length; i++) {
  const ch = content[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === inStr) { inStr = null; }
  } else {
    if (ch === '"' || ch === "'") { inStr = ch; }
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
}

const objStr = content.substring(jsonStart, end);
const surahsData = eval('(' + objStr + ')');

let totalClusters = 0;
let totalVerses = 0;
let quizStats = { total: 0, valid: 0, withDistinctOptions: 0 };
let errors = [];

Object.keys(surahsData).forEach(sKey => {
  const surah = surahsData[sKey];
  console.log(`\n========================================`);
  console.log(`Surah: ${surah.name} (${sKey}) - Total: ${surah.clusters.length} clusters`);
  
  surah.clusters.forEach((c, idx) => {
    totalClusters++;
    
    // Check verses
    if (!c.verses || c.verses.length < 2) {
      errors.push(`[${c.id}] has fewer than 2 verses: ${c.verses ? c.verses.length : 0}`);
    } else {
      totalVerses += c.verses.length;
    }

    // Check quiz
    if (c.quiz) {
      quizStats.total++;
      if (c.quiz.promptDisplay && c.quiz.correctOption && c.quiz.wrongOption) {
        if (c.quiz.correctOption.trim() === c.quiz.wrongOption.trim()) {
          errors.push(`[${c.id}] quiz options are identical! "${c.quiz.correctOption}"`);
        } else {
          quizStats.withDistinctOptions++;
        }
      } else if (c.quiz.question && c.quiz.options) {
        const u = new Set(c.quiz.options);
        if (u.size !== c.quiz.options.length) {
          errors.push(`[${c.id}] quiz options have duplicates: ${JSON.stringify(c.quiz.options)}`);
        } else {
          quizStats.withDistinctOptions++;
        }
      } else {
        errors.push(`[${c.id}] unrecognized quiz schema!`);
      }
    }
  });
});

console.log(`\n========================================`);
console.log(`TOTAL SURAHS: ${Object.keys(surahsData).length}`);
console.log(`TOTAL CLUSTERS: ${totalClusters}`);
console.log(`TOTAL VERSES COMPARED: ${totalVerses}`);
console.log(`QUIZ INTEGRITY: ${quizStats.withDistinctOptions}/${quizStats.total} valid & distinct`);
console.log(`TOTAL ERRORS FOUND: ${errors.length}`);
if (errors.length > 0) {
  console.error('Errors:', errors);
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED! 100% PERFECT INTEGRITY!');
}
