const fs = require('fs');

const path = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/tawbah_scholarly_verified.json';
const clusters = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('=== AUDITING SURAH AT-TAWBAH SCHOLARLY VERIFIED DATASET ===');
console.log('Total clusters in file:', clusters.length);

let errors = [];
let totalVerses = 0;
let quizCount = 0;
let validQuizzes = 0;
let overHighlightedVerses = 0;

clusters.forEach((c, idx) => {
  const expectedId = `tawbah_${String(idx + 1).padStart(2, '0')}`;
  if (c.id !== expectedId) {
    errors.push(`Cluster index ${idx} id mismatch: expected ${expectedId}, got ${c.id}`);
  }

  // Tier, category, scope
  if (c.tier !== 'surah') errors.push(`[${c.id}] invalid tier: ${c.tier}`);
  if (!['intra', 'inter'].includes(c.category)) errors.push(`[${c.id}] invalid category: ${c.category}`);
  if (!c.scope || c.scope.length < 3) errors.push(`[${c.id}] missing or deficient scope`);
  if (!c.title || c.title.length < 5) errors.push(`[${c.id}] missing or deficient title`);
  if (!c.subtitle || c.subtitle.length < 5) errors.push(`[${c.id}] missing or deficient subtitle`);
  if (!c.dabit || c.dabit.length < 5) errors.push(`[${c.id}] missing or deficient dabit`);
  if (!c.rhyme || c.rhyme.length < 5) errors.push(`[${c.id}] missing or deficient rhyme`);
  if (!c.rule || c.rule.length < 10) errors.push(`[${c.id}] missing or deficient rule`);
  if (!c.alBurhan || c.alBurhan.length < 20) errors.push(`[${c.id}] missing or deficient alBurhan`);

  // Tadabbur check
  if (!c.tadabbur || !Array.isArray(c.tadabbur) || c.tadabbur.length < 2) {
    errors.push(`[${c.id}] missing or deficient tadabbur`);
  } else {
    c.tadabbur.forEach((t, tIdx) => {
      if (!t.h || !t.d) errors.push(`[${c.id} tadabbur#${tIdx + 1}] missing h or d`);
    });
  }

  // Scale check
  if (!c.scale || !Array.isArray(c.scale) || c.scale.length < 2) {
    errors.push(`[${c.id}] missing or deficient scale`);
  } else {
    c.scale.forEach((s, sIdx) => {
      if (!s.word || !s.note) errors.push(`[${c.id} scale#${sIdx + 1}] missing word or note`);
    });
  }

  // Verses check
  if (!c.verses || c.verses.length < 2) {
    errors.push(`[${c.id}] has fewer than 2 verses: ${c.verses ? c.verses.length : 0}`);
  } else {
    totalVerses += c.verses.length;
  }

  // Highlighting and verse metadata check
  c.verses.forEach((v, vIdx) => {
    if (!v.surah) errors.push(`[${c.id} v#${vIdx + 1}] missing surah`);
    if (!v.surahName) errors.push(`[${c.id} v#${vIdx + 1}] missing surahName`);
    if (!v.ayah || typeof v.ayah !== 'number') errors.push(`[${c.id} v#${vIdx + 1}] invalid ayah number`);
    if (!v.page || typeof v.page !== 'number') errors.push(`[${c.id} v#${vIdx + 1}] invalid page number`);
    if (!v.juz || typeof v.juz !== 'number') errors.push(`[${c.id} v#${vIdx + 1}] invalid juz number`);
    if (!v.quarter) errors.push(`[${c.id} v#${vIdx + 1}] missing quarter`);
    if (!v.pos) errors.push(`[${c.id} v#${vIdx + 1}] missing pos`);
    if (!v.keyPhrase) errors.push(`[${c.id} v#${vIdx + 1}] missing keyPhrase`);
    if (!v.contextNote) errors.push(`[${c.id} v#${vIdx + 1}] missing contextNote`);

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

    // Verify token color class corresponding to verse position
    const expectedColor = vIdx === 0 ? 'token-cyan' : (vIdx === 1 ? 'token-amber' : 'token-emerald');
    tokens.forEach(t => {
      if (!t.cls.includes(expectedColor)) {
        errors.push(`[${c.id} v#${vIdx + 1}] token class mismatch: expected ${expectedColor}, got ${t.cls}`);
      }
    });

    const plainText = html.replace(/<[^>]+>/g, '').trim();
    const highlightedText = tokens.map(t => t.text).join(' ').trim();
    if (plainText.length > 30 && highlightedText.length >= plainText.length * 0.90) {
      errors.push(`[${c.id} v#${vIdx + 1}] over-highlighted: ${highlightedText.length} / ${plainText.length}`);
      overHighlightedVerses++;
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
      } else if (!q.promptDisplay || !q.correctOption || !q.wrongOption || !q.feedbackExplanation) {
        errors.push(`[${c.id}] quiz missing required fields (promptDisplay/correctOption/wrongOption/feedbackExplanation)`);
      } else {
        validQuizzes++;
      }
    }
  }
});

console.log('------------------------------------------------');
console.log('TOTAL CLUSTERS:', clusters.length, '(Target: 40)');
console.log('TOTAL VERSES COMPARED:', totalVerses, '(Avg:', (totalVerses / clusters.length).toFixed(1), 'per cluster)');
console.log('QUIZZES VERIFIED:', `${validQuizzes}/${quizCount} valid with 4 distinct options`);
console.log('OVER-HIGHLIGHTED VERSES:', overHighlightedVerses);
console.log('TOTAL ERRORS DETECTED:', errors.length);

if (errors.length > 0) {
  console.error('\nERRORS FOUND:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\n>>> 100% AUDIT PASS: Surah At-Tawbah dataset satisfies all scholarly standards! <<<');
}
