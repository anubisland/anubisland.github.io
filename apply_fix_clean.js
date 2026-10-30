const fs = require('fs');

const arafJsonPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json';
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';

// 1. Read and update index.html
let html = fs.readFileSync(htmlPath, 'utf8');

// Normalize surahsData in index.html
const marker = 'const surahsData = ';
const start = html.indexOf(marker);
let depth = 0;
let inStr = null;
let end = -1;
const jsonStart = html.indexOf('{', start);
for (let i = jsonStart; i < html.length; i++) {
  const ch = html[i];
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

const objStr = html.substring(jsonStart, end);
const surahsData = eval('(' + objStr + ')');

// Update araf in surahsData
if (surahsData.araf && surahsData.araf.clusters) {
  surahsData.araf.clusters.forEach(c => {
    const alBurhan = c.alBurhan || '';
    const tadabburStr = typeof c.tadabbur === 'string' 
      ? c.tadabbur 
      : (Array.isArray(c.tadabbur) && c.tadabbur.length > 0 ? (c.tadabbur[1] ? c.tadabbur[1].d : c.tadabbur[0].d) : '');

    c.tadabbur = [
      {
        h: "التوجيه البياني عند أئمة المتشابهات",
        d: alBurhan
      },
      {
        h: "سر التفرقة واللطيفة التدبرية",
        d: tadabburStr
      }
    ];
  });
  console.log('Updated surahsData.araf.clusters in memory');
}

const newObjStr = JSON.stringify(surahsData, null, 4);
html = html.substring(0, jsonStart) + newObjStr + html.substring(end);

// 2. Update HTML elements in the third column to have dynamic IDs
html = html.replace(
  '<span>سر التفرقة بالسياق في سورة البقرة</span>',
  '<span id="contextDeckSurahTitle">سر التفرقة بالسياق في سورة البقرة</span>'
);

html = html.replace(
  'اختبر حفظك لهذا الموضع في البقرة',
  '<span id="launchQuizBtnText">اختبر حفظك لهذا الموضع في سورة البقرة</span>'
);

html = html.replace(
  'أكمل الفراغ باللفظ الصحيح الدقيق لهذا الموضع في سورة البقرة:',
  '<span id="quizInstructionPrompt">أكمل الفراغ باللفظ الصحيح الدقيق لهذا الموضع في سورة البقرة:</span>'
);

// 3. Update loadCluster using index boundaries
const blockStart = html.indexOf('// تحديث التدبر في العمود الثالث');
const blockEnd = html.indexOf('// ضبط حجم الخط الحي A+ / A-', blockStart);

if (blockStart === -1 || blockEnd === -1) {
  console.error('Could not find blockStart or blockEnd!');
  process.exit(1);
}

const newBlock = `// تحديث التدبر في العمود الثالث
            const meta = surahsData[currentSurah] || { name: 'سورة البقرة' };
            const contextTitleEl = document.getElementById('contextDeckSurahTitle');
            if (contextTitleEl) {
                contextTitleEl.textContent = \`سر التفرقة بالسياق في \${meta.name}\`;
            }
            const quizBtnTextEl = document.getElementById('launchQuizBtnText');
            if (quizBtnTextEl) {
                quizBtnTextEl.textContent = \`اختبر حفظك لهذا الموضع في \${meta.name}\`;
            }

            const tadabburList = document.getElementById('tadabburList');
            if (tadabburList) {
                tadabburList.innerHTML = '';
                let tItems = [];
                if (Array.isArray(cluster.tadabbur)) {
                    tItems = cluster.tadabbur;
                } else if (typeof cluster.tadabbur === 'string' && cluster.tadabbur.trim()) {
                    if (cluster.alBurhan) {
                        tItems.push({ h: "التوجيه البياني عند أئمة المتشابهات", d: cluster.alBurhan });
                    }
                    tItems.push({ h: "سر التفرقة واللطيفة التدبرية", d: cluster.tadabbur });
                }

                tItems.forEach(t => {
                    const row = document.createElement('div');
                    row.className = 'tadabbur-item-row';
                    row.innerHTML = \`
                        <strong>\${t.h}:</strong>
                        <span>\${t.d}</span>
                    \`;
                    tadabburList.appendChild(row);
                });
            }

            // تحديث الضابط الشعري
            const rhymeEl = document.getElementById('rhymeLine');
            if (rhymeEl) {
                const rhymeText = cluster.rhyme || cluster.dabit || '';
                rhymeEl.textContent = rhymeText ? \`« \${rhymeText} »\` : '« ضابط الحفظ المعتمد »';
            }
            const ruleSummaryEl = document.getElementById('ruleSummary');
            if (ruleSummaryEl) {
                const ruleText = cluster.rule || cluster.dabit || '';
                ruleSummaryEl.innerHTML = \`<strong>ضابط الحفظ:</strong> \${ruleText}\`;
            }
        }

        `;

html = html.substring(0, blockStart) + newBlock + html.substring(blockEnd);
console.log('loadCluster updated cleanly!');

// 4. Update openTestModal instruction prompt dynamically
const oldModalInstruction = `document.getElementById('quizBadgeAyah').textContent = \`\${surahName} • الموضع #\${activeIndex + 1} • آية \${target.ayah}\`;`;
const newModalInstruction = `document.getElementById('quizBadgeAyah').textContent = \`\${surahName} • الموضع #\${activeIndex + 1} • آية \${target.ayah}\`;
            const quizPromptLabel = document.getElementById('quizInstructionPrompt');
            if (quizPromptLabel) {
                quizPromptLabel.textContent = \`أكمل الفراغ باللفظ الصحيح الدقيق لهذا الموضع في \${surahName}:\`;
            }`;

if (html.includes(oldModalInstruction)) {
  html = html.replace(oldModalInstruction, newModalInstruction);
  console.log('openTestModal updated with dynamic prompt!');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('SUCCESS! index.html completely updated and saved!');
