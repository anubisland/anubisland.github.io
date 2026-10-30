const fs = require('fs');

const path = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/yunus_scholarly_verified.json';
const clusters = JSON.parse(fs.readFileSync(path, 'utf8'));

const fixes = {
  yunus_03: {
    v2: '<span class="diff-token token-amber">فَذَٰلِكُمُ اللَّهُ رَبُّكُمُ الْحَقُّ</span> ۖ فَمَاذَا بَعْدَ الْحَقِّ إِلَّا الضَّلَالُ ۖ فَأَنَّىٰ تُصْرَفُونَ'
  },
  yunus_21: {
    v1: 'قُلْ مَن يَرْزُقُكُم مِّنَ السَّمَاءِ وَالْأَرْضِ أَمَّن يَمْلِكُ السَّمْعَ وَالْأَبْصَارَ وَمَن يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَمَن يُدَبِّرُ الْأَمْرَ ۚ <span class="diff-token token-cyan">فَسَيَقُولُونَ اللَّهُ ۚ فَقُلْ</span> أَفَلَا تَتَّقُونَ',
    v2: '<span class="diff-token token-amber">سَيَقُولُونَ لِلَّهِ ۚ قُلْ</span> أَفَلَا تَتَّقُونَ'
  },
  yunus_29: {
    v1: 'أَثُمَّ إِذَا مَا وَقَعَ آمَنتُم بِهِ ۚ آلْآنَ <span class="diff-token token-cyan">وَقَدْ كُنتُم بِهِ تَسْتَعْجِلُونَ</span>',
    v2: 'آلْآنَ <span class="diff-token token-amber">وَقَدْ عَصَيْتَ قَبْلُ</span> وَكُنتَ مِنَ الْمُفْسِدِينَ'
  },
  yunus_32: {
    v1: '<span class="diff-token token-cyan">وَلَا</span> يَحْزُنكَ قَوْلُهُمْ ۘ <span class="diff-token token-cyan">إِنَّ الْعِزَّةَ لِلَّهِ جَمِيعًا</span> ۚ هُوَ السَّمِيعُ الْعَلِيمُ',
    v2: '<span class="diff-token token-amber">فَلَا</span> يَحْزُنكَ قَوْلُهُمْ ۘ <span class="diff-token token-amber">إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ</span>'
  },
  yunus_35: {
    v1: 'وَقَالَ فِرْعَوْنُ <span class="diff-token token-cyan">ائْتُونِي</span> بِكُلِّ <span class="diff-token token-cyan">سَاحِرٍ</span> عَلِيمٍ',
    v2: '<span class="diff-token token-amber">يَأْتُوكَ</span> بِكُلِّ <span class="diff-token token-amber">سَحَّارٍ</span> عَلِيمٍ'
  }
};

clusters.forEach(c => {
  if (fixes[c.id]) {
    const f = fixes[c.id];
    if (f.v1) {
      if (c.verses[0].html) c.verses[0].html = f.v1;
      if (c.verses[0].textHtml) c.verses[0].textHtml = f.v1;
    }
    if (f.v2) {
      if (c.verses[1].html) c.verses[1].html = f.v2;
      if (c.verses[1].textHtml) c.verses[1].textHtml = f.v2;
    }
  }
});

fs.writeFileSync(path, JSON.stringify(clusters, null, 2), 'utf8');
console.log('Successfully applied surgical highlighting fixes to Yunus clusters!');
