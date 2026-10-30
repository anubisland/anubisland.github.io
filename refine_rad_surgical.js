const fs = require('fs');

const path = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/rad_scholarly_verified.json';
const clusters = JSON.parse(fs.readFileSync(path, 'utf8'));

const fixes = {
  rad_09: {
    v1: 'عَالِمُ الْغَيْبِ وَالشَّهَادَةِ <span class="diff-token token-cyan">الْكَبِيرُ الْمُتَعَالِ</span>'
  },
  rad_11: {
    v1: '<span class="diff-token token-cyan">هُوَ الَّذِي</span> يُرِيكُمُ الْبَرْقَ خَوْفًا وَطَمَعًا <span class="diff-token token-cyan">وَيُنشِئُ السَّحَابَ الثِّقَالَ</span>',
    v2: '<span class="diff-token token-amber">وَمِنْ آيَاتِهِ</span> يُرِيكُمُ الْبَرْقَ خَوْفًا وَطَمَعًا <span class="diff-token token-amber">وَيُنَزِّلُ مِنَ السَّمَاءِ مَاءً</span> فَيُحْيِي بِهِ الْأَرْضَ بَعْدَ مَوْتِهَا'
  },
  rad_14: {
    v1: 'وَلِلَّهِ يَسْجُدُ <span class="diff-token token-cyan">مَن فِي السَّمَاوَاتِ وَالْأَرْضِ طَوْعًا وَكَرْهًا وَظِلَالُهُم بِالْغُدُوِّ وَالْآصَالِ ۩</span>',
    v2: 'وَلِلَّهِ يَسْجُدُ <span class="diff-token token-amber">مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مِن دَابَّةٍ</span> وَالْمَلَائِكَةُ وَهُمْ لَا يَسْتَكْبِرُونَ ۩'
  },
  rad_15: {
    v2: '<span class="diff-token token-amber">وَمَا يَسْتَوِي</span> الْأَعْمَىٰ وَالْبَصِيرُ * <span class="diff-token token-amber">وَلَا</span> الظُّلُمَاتُ وَلَا النُّورُ'
  },
  rad_16: {
    v2: 'اللَّهُ خَالِقُ كُلِّ شَيْءٍ ۖ <span class="diff-token token-amber">وَهُوَ عَلَىٰ كُلِّ شَيْءٍ وَكِيلٌ</span>'
  },
  rad_20: {
    v1: '<span class="diff-token token-cyan">الَّذِينَ يُوفُونَ بِعَهْدِ اللَّهِ وَلَا يَنقُضُونَ الْمِيثَاقَ</span> * وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ'
  },
  rad_22: {
    v1: 'سَلَامٌ عَلَيْكُم <span class="diff-token token-cyan">بِمَا صَبَرْتُمْ ۚ فَنِعْمَ عُقْبَى الدَّارِ</span>',
    v2: 'الَّذِينَ تَتَوَفَّاهُمُ الْمَلَائِكَةُ طَيِّبِينَ ۙ يَقُولُونَ سَلَامٌ عَلَيْكُمُ <span class="diff-token token-amber">ادْخُلُوا الْجَنَّةَ بِمَا كُنتُمْ تَعْمَلُونَ</span>'
  },
  rad_24: {
    v1: 'اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ ۚ <span class="diff-token token-cyan">وَفَرِحُوا بِالْحَيَاةِ الدُّنْيَا وَمَا الْحَيَاةُ الدُّنْيَا فِي الْآخِرَةِ إِلَّا مَتَاعٌ</span>',
    v2: 'اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ <span class="diff-token token-amber">مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ</span> ۚ إِنَّ اللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ'
  },
  rad_28: {
    v1: 'وَيَقُولُ الَّذِينَ كَفَرُوا لَسْتَ مُرْسَلًا ۚ قُلْ كَفَىٰ بِاللَّهِ <span class="diff-token token-cyan">شَهِيدًا بَيْنِي وَبَيْنَكُمْ وَمَنْ عِندَهُ عِلْمُ الْكِتَابِ</span>',
    v2: 'قُلْ كَفَىٰ بِاللَّهِ <span class="diff-token token-amber">بَيْنِي وَبَيْنَكُمْ شَهِيدًا</span> ۖ يَعْلَمُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ',
    v3: 'قُلْ كَفَىٰ بِاللَّهِ <span class="diff-token token-emerald">شَهِيدًا بَيْنِي وَبَيْنَكُمْ</span> ۚ إِنَّهُ كَانَ بِعِبَادِهِ خَبِيرًا بَصِيرًا'
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
    if (f.v3 && c.verses[2]) {
      if (c.verses[2].html) c.verses[2].html = f.v3;
      if (c.verses[2].textHtml) c.verses[2].textHtml = f.v3;
    }
  }
});

fs.writeFileSync(path, JSON.stringify(clusters, null, 2), 'utf8');
console.log('Successfully applied surgical highlighting fixes to Ar-Ra\'d clusters!');
