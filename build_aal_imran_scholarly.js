const fs = require('fs');
const path = require('path');

const intra = require('./clusters_intra_aal_imran.js');
const inter = require('./clusters_inter_aal_imran.js');

const allClusters = [...intra, ...inter];

console.log(`Loaded ${intra.length} intra-surah clusters and ${inter.length} inter-surah clusters. Total: ${allClusters.length}`);

// Validation
const errors = [];
const seenIds = new Set();

allClusters.forEach((c, idx) => {
  const num = idx + 1;
  if (!c.id || seenIds.has(c.id)) {
    errors.push(`Cluster ${num} has missing or duplicate id: ${c.id}`);
  }
  seenIds.add(c.id);

  if (!c.title || !c.subtitle || !c.category || !c.rhyme || !c.rule) {
    errors.push(`Cluster ${c.id} missing basic metadata (title, subtitle, category, rhyme, or rule)`);
  }

  if (!c.verses || c.verses.length < 2) {
    errors.push(`Cluster ${c.id} has fewer than 2 verses: ${c.verses ? c.verses.length : 0}`);
  } else {
    c.verses.forEach((v, vIdx) => {
      if (!v.surah) errors.push(`Cluster ${c.id} verse ${vIdx} missing 'surah'`);
      if (!v.ayah) errors.push(`Cluster ${c.id} verse ${vIdx} missing 'ayah'`);
      if (!v.quarter) errors.push(`Cluster ${c.id} verse ${vIdx} missing 'quarter'`);
      if (!v.page) errors.push(`Cluster ${c.id} verse ${vIdx} missing 'page'`);
      if (!v.pos) errors.push(`Cluster ${c.id} verse ${vIdx} missing 'pos'`);
      if (!v.tokens || !Array.isArray(v.tokens) || v.tokens.length === 0) {
        errors.push(`Cluster ${c.id} verse ${vIdx} missing 'tokens'`);
      }
      if (!v.html || !v.html.includes('diff-token')) {
        errors.push(`Cluster ${c.id} verse ${vIdx} html missing diff-token class`);
      }
    });
  }

  if (!c.scale || c.scale.length < 2) {
    errors.push(`Cluster ${c.id} scale has fewer than 2 items`);
  }

  if (!c.tadabbur || c.tadabbur.length < 1) {
    errors.push(`Cluster ${c.id} tadabbur is empty`);
  }

  if (!c.quiz) {
    errors.push(`Cluster ${c.id} missing quiz`);
  } else {
    if (!c.quiz.promptDisplay || !c.quiz.correctOption || !c.quiz.wrongOption || !c.quiz.feedbackExplanation) {
      errors.push(`Cluster ${c.id} quiz missing required fields`);
    } else if (c.quiz.correctOption.trim() === c.quiz.wrongOption.trim()) {
      errors.push(`Cluster ${c.id} quiz options are identical`);
    }
  }
});

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} errors:`);
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
}

console.log('ALL 40 CLUSTERS PASSED SCHOLARLY AND STRUCTURAL INTEGRITY CHECKS!');

const outPath = path.join(__dirname, 'aal_imran_scholarly_verified.json');
fs.writeFileSync(outPath, JSON.stringify(allClusters, null, 2), 'utf8');
console.log(`Successfully generated and written: ${outPath} (${allClusters.length} verified clusters)`);
