const fs = require('fs');

// Function to update the 3 clusters in an array of clusters
function updateClusters(clusters) {
  clusters.forEach(c => {
    if (c.id === 'araf_02') {
      c.verses.forEach(v => {
        if (v.ayah === 13) {
          v.html = 'قَالَ <span class="diff-token token-cyan">فَاهْبِطْ</span> مِنْهَا فَمَا يَكُونُ لَكَ أَن تَتَكَبَّرَ فِيهَا فَاخْرُجْ إِنَّكَ <span class="diff-token token-cyan">مِنَ الصَّاغِرِينَ</span>';
          v.textHtml = v.html;
          v.tokens = ['فَاهْبِطْ', 'مِنَ الصَّاغِرِينَ'];
        } else if (v.ayah === 34) {
          v.html = 'قَالَ <span class="diff-token token-amber">فَاخْرُجْ</span> مِنْهَا فَإِنَّكَ <span class="diff-token token-amber">رَجِيمٌ</span>';
          v.textHtml = v.html;
          v.tokens = ['فَاخْرُجْ', 'رَجِيمٌ'];
        } else if (v.ayah === 77) {
          v.html = 'قَالَ <span class="diff-token token-emerald">فَاخْرُجْ</span> مِنْهَا فَإِنَّكَ <span class="diff-token token-emerald">رَجِيمٌ</span>';
          v.textHtml = v.html;
          v.tokens = ['فَاخْرُجْ', 'رَجِيمٌ'];
        }
      });
    }

    if (c.id === 'araf_04') {
      c.verses.forEach(v => {
        if (v.ayah === 16) {
          v.html = 'قَالَ فَبِمَا أَغْوَيْتَنِي <span class="diff-token token-cyan">لَأَقْعُدَنَّ لَهُمْ صِرَاطَكَ الْمُسْتَقِيمَ</span> * ثُمَّ لَآتِيَنَّهُم مِّن بَيْنِ أَيْدِيهِمْ وَمِنْ خَلْفِهِمْ وَعَنْ أَيْمَانِهِمْ وَعَن شَمَائِلِهِمْ ۖ وَلَا تَجِدُ أَكْثَرَهُمْ شَاكِرِينَ';
          v.textHtml = v.html;
          v.tokens = ['لَأَقْعُدَنَّ لَهُمْ صِرَاطَكَ الْمُسْتَقِيمَ'];
        } else if (v.ayah === 39) {
          v.html = 'قَالَ <span class="diff-token token-amber">رَبِّ</span> بِمَا أَغْوَيْتَنِي <span class="diff-token token-amber">لَأُزَيِّنَنَّ لَهُمْ فِي الْأَرْضِ</span> وَلَأُغْوِيَنَّهُمْ أَجْمَعِينَ';
          v.textHtml = v.html;
          v.tokens = ['رَبِّ', 'لَأُزَيِّنَنَّ لَهُمْ فِي الْأَرْضِ'];
        } else if (v.ayah === 82) {
          v.html = 'قَالَ <span class="diff-token token-emerald">فَبِعِزَّتِكَ</span> لَأُغْوِيَنَّهُمْ أَجْمَعِينَ';
          v.textHtml = v.html;
          v.tokens = ['فَبِعِزَّتِكَ'];
        }
      });
    }

    if (c.id === 'araf_07') {
      c.verses.forEach(v => {
        if (v.ayah === 20) {
          v.html = 'فَوَسْوَسَ <span class="diff-token token-cyan">لَهُمَا</span> الشَّيْطَانُ لِيُبْدِيَ لَهُمَا مَا وُورِيَ عَنْهُمَا مِن سَوْآتِهِمَا وَقَالَ مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَذِهِ الشَّجَرَةِ <span class="diff-token token-cyan">إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ</span>';
          v.textHtml = v.html;
          v.tokens = ['لَهُمَا', 'إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ'];
        } else if (v.ayah === 120) {
          v.html = 'فَوَسْوَسَ <span class="diff-token token-amber">إِلَيْهِ</span> الشَّيْطَانُ قَالَ يَا آدَمُ هَلْ أَدُلُّكَ <span class="diff-token token-amber">عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ</span>';
          v.textHtml = v.html;
          v.tokens = ['إِلَيْهِ', 'عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ'];
        }
      });
    }
  });
}

// 1. Update araf_scholarly_verified.json
const arafClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json', 'utf8'));
updateClusters(arafClusters);
fs.writeFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json', JSON.stringify(arafClusters, null, 2), 'utf8');
console.log('araf_scholarly_verified.json updated directly!');

// 2. Update index.html
const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
const content = fs.readFileSync(htmlPath, 'utf8');

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

// Update araf in surahsData
if (surahsData.araf && surahsData.araf.clusters) {
  updateClusters(surahsData.araf.clusters);
  console.log('surahsData.araf.clusters updated in memory!');
}

const newObjStr = JSON.stringify(surahsData, null, 4);
const newHtml = content.substring(0, jsonStart) + newObjStr + content.substring(end);
fs.writeFileSync(htmlPath, newHtml, 'utf8');
console.log('index.html surahsData updated directly and cleanly!');
