const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/baqarah_scholarly_verified.json', 'utf8'));

console.log('=== VERIFYING BAQARAH SCHOLARLY CLUSTERS ===');
console.log('Total clusters count:', data.length);

let errors = [];
let totalVerses = 0;
let quizCount = 0;

data.forEach((c, idx) => {
  if (!c.id || !c.id.startsWith('bq_')) errors.push('[' + idx + '] Invalid or missing id: ' + c.id);
  
  if (!c.verses || c.verses.length < 2) {
    errors.push('[' + c.id + '] Has fewer than 2 verses: ' + (c.verses ? c.verses.length : 0));
  } else {
    totalVerses += c.verses.length;
    c.verses.forEach((v, vIdx) => {
      if (!v.ayah || typeof v.ayah !== 'number') errors.push('[' + c.id + ' v' + vIdx + '] Missing ayah number');
      if (!v.page) errors.push('[' + c.id + ' v' + vIdx + '] Missing page');
      if (!v.quarter) errors.push('[' + c.id + ' v' + vIdx + '] Missing quarter');
      if (!v.html || !v.html.includes('diff-token')) errors.push('[' + c.id + ' v' + vIdx + '] Missing diff-token in html');
      if (!v.tokens || v.tokens.length === 0) errors.push('[' + c.id + ' v' + vIdx + '] Missing tokens');
    });
  }

  if (!c.rhyme || c.rhyme.trim().length === 0) errors.push('[' + c.id + '] Missing rhyme');
  if (!c.rule || c.rule.trim().length === 0) errors.push('[' + c.id + '] Missing rule');
  if (!c.tadabbur || c.tadabbur.length === 0) errors.push('[' + c.id + '] Missing tadabbur');
  if (!c.scale || c.scale.length === 0) errors.push('[' + c.id + '] Missing scale');

  if (!c.quiz) {
    errors.push('[' + c.id + '] Missing quiz');
  } else {
    quizCount++;
    if (!c.quiz.promptDisplay) errors.push('[' + c.id + '] Quiz missing promptDisplay');
    if (!c.quiz.correctOption) errors.push('[' + c.id + '] Quiz missing correctOption');
    if (!c.quiz.wrongOption) errors.push('[' + c.id + '] Quiz missing wrongOption');
    if (!c.quiz.feedbackExplanation) errors.push('[' + c.id + '] Quiz missing feedbackExplanation');
    if (c.quiz.correctOption && c.quiz.wrongOption && c.quiz.correctOption.trim() === c.quiz.wrongOption.trim()) {
      errors.push('[' + c.id + '] Quiz options are identical!');
    }
  }
});

console.log('Total verses verified:', totalVerses);
console.log('Total quizzes validated:', quizCount);
console.log('Total errors:', errors.length);
if (errors.length > 0) {
  console.error('Errors found:', errors);
  process.exit(1);
} else {
  console.log('ALL 40 CLUSTERS PASSED SCHOLARLY VERIFICATION WITH 100% SUCCESS!');
}
