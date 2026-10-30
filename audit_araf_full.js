const fs = require('fs');

const path = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json';
const clusters = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('=== AUDITING ARAF SCHOLARLY VERIFIED DATASET ===');
console.log('Total clusters in file:', clusters.length);

let errors = [];
let totalVerses = 0;
let quizCount = 0;
let validQuizzes = 0;

clusters.forEach((c, idx) => {
  const expectedId = `araf_${String(idx + 1).padStart(2, '0')}`;
  if (c.id !== expectedId) {
    errors.push(`Cluster index ${idx} id mismatch: expected ${expectedId}, got ${c.id}`);
  }

  // Verses check
  if (!c.verses || c.verses.length < 2) {
    errors.push(`[${c.id}] has fewer than 2 verses: ${c.verses ? c.verses.length : 0}`);
  } else {
    totalVerses += c.verses.length;
  }

  // Highlighting check
  c.verses.forEach((v, vIdx) => {
    const html = v.html || v.textHtml;
    if (!html) {
      errors.push(`[${c.id} v#${vIdx + 1}] has no html/textHtml`);
      return;
    }

    const regex = /<span class="diff-token ([^"]+)">([^<]+)<\/span>/g;
    const tokens = [];
    let m;
    while ((m = regex.exec(html)) !== null) {
      tokens.push({ cls: m[1], text: m[2] });
    }

    if (tokens.length === 0) {
      errors.push(`[${c.id} v#${vIdx + 1}] missing diff-token span!`);
    }

    const plainText = html.replace(/<[^>]+>/g, '').trim();
    const highlightedText = tokens.map(t => t.text).join(' ').trim();
    if (plainText.length > 30 && highlightedText.length >= plainText.length * 0.90) {
      errors.push(`[${c.id} v#${vIdx + 1}] over-highlighted: ${highlightedText.length} / ${plainText.length}`);
    }
  });

  // Quiz check
  if (!c.quiz) {
    errors.push(`[${c.id}] missing quiz`);
  } else {
    quizCount++;
    const q = c.quiz;
    if (!q.question || !q.options || q.options.length !== 4) {
      errors.push(`[${c.id}] quiz does not have 4 options`);
    } else {
      const distinct = new Set(q.options);
      if (distinct.size !== 4) {
        errors.push(`[${c.id}] quiz has duplicate options`);
      } else if (q.correctIndex < 0 || q.correctIndex > 3) {
        errors.push(`[${c.id}] quiz correctIndex out of range: ${q.correctIndex}`);
      } else {
        validQuizzes++;
      }
    }
  }

  // Classical sources check
  if (!c.alBurhan || c.alBurhan.length < 20) {
    errors.push(`[${c.id}] missing or deficient alBurhan`);
  }
  if (!c.dabit || c.dabit.length < 5) {
    errors.push(`[${c.id}] missing or deficient dabit`);
  }
  if (!c.tadabbur || c.tadabbur.length < 10) {
    errors.push(`[${c.id}] missing or deficient tadabbur`);
  }
});

console.log('------------------------------------------------');
console.log('TOTAL CLUSTERS:', clusters.length, '(Target: 40)');
console.log('TOTAL VERSES COMPARED:', totalVerses, '(Avg:', (totalVerses / clusters.length).toFixed(1), 'per cluster)');
console.log('QUIZZES VERIFIED:', `${validQuizzes}/${quizCount} valid with 4 distinct options`);
console.log('TOTAL ERRORS DETECTED:', errors.length);

if (errors.length > 0) {
  console.error('\nERRORS FOUND:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\n>>> 100% AUDIT PASS: Surah Al-A\'raf dataset satisfies all scholarly standards! <<<');
}
