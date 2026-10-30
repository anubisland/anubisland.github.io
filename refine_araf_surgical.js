const fs = require('fs');

function refine(text) {
  // 1. araf_02
  text = text.replace(
    'قَالَ <span class=\\"diff-token token-cyan\\">فَاهْبِطْ</span> مِنْهَا <span class=\\"diff-token token-cyan\\">فَمَا يَكُونُ لَكَ أَن تَتَكَبَّرَ فِيهَا فَاخْرُجْ إِنَّكَ مِنَ الصَّاغِرِينَ</span>',
    'قَالَ <span class=\\"diff-token token-cyan\\">فَاهْبِطْ</span> مِنْهَا فَمَا يَكُونُ لَكَ أَن تَتَكَبَّرَ فِيهَا فَاخْرُجْ إِنَّكَ <span class=\\"diff-token token-cyan\\">مِنَ الصَّاغِرِينَ</span>'
  );
  text = text.replace(
    'قَالَ <span class=\\"diff-token token-amber\\">فَاخْرُجْ</span> مِنْهَا <span class=\\"diff-token token-amber\\">فَإِنَّكَ رَجِيمٌ</span>',
    'قَالَ <span class=\\"diff-token token-amber\\">فَاخْرُجْ</span> مِنْهَا فَإِنَّكَ <span class=\\"diff-token token-amber\\">رَجِيمٌ</span>'
  );
  text = text.replace(
    'قَالَ <span class=\\"diff-token token-emerald\\">فَاخْرُجْ</span> مِنْهَا <span class=\\"diff-token token-emerald\\">فَإِنَّكَ رَجِيمٌ</span>',
    'قَالَ <span class=\\"diff-token token-emerald\\">فَاخْرُجْ</span> مِنْهَا فَإِنَّكَ <span class=\\"diff-token token-emerald\\">رَجِيمٌ</span>'
  );

  // 2. araf_04
  text = text.replace(
    'قَالَ فَبِمَا أَغْوَيْتَنِي <span class=\\"diff-token token-cyan\\">لَأَقْعُدَنَّ لَهُمْ صِرَاطَكَ الْمُسْتَقِيمَ * ثُمَّ لَآتِيَنَّهُم مِّن بَيْنِ أَيْدِيهِمْ وَمِنْ خَلْفِهِمْ وَعَنْ أَيْمَانِهِمْ وَعَن شَمَائِلِهِمْ ۖ وَلَا تَجِدُ أَكْثَرَهُمْ شَاكِرِينَ</span>',
    'قَالَ فَبِمَا أَغْوَيْتَنِي <span class=\\"diff-token token-cyan\\">لَأَقْعُدَنَّ لَهُمْ صِرَاطَكَ الْمُسْتَقِيمَ</span> * ثُمَّ لَآتِيَنَّهُم مِّن بَيْنِ أَيْدِيهِمْ وَمِنْ خَلْفِهِمْ وَعَنْ أَيْمَانِهِمْ وَعَن شَمَائِلِهِمْ ۖ وَلَا تَجِدُ أَكْثَرَهُمْ شَاكِرِينَ'
  );
  text = text.replace(
    'قَالَ رَبِّ بِمَا أَغْوَيْتَنِي <span class=\\"diff-token token-amber\\">لَأُزَيِّنَنَّ لَهُمْ فِي الْأَرْضِ وَلَأُغْوِيَنَّهُمْ أَجْمَعِينَ</span>',
    'قَالَ <span class=\\"diff-token token-amber\\">رَبِّ</span> بِمَا أَغْوَيْتَنِي <span class=\\"diff-token token-amber\\">لَأُزَيِّنَنَّ لَهُمْ فِي الْأَرْضِ</span> وَلَأُغْوِيَنَّهُمْ أَجْمَعِينَ'
  );
  text = text.replace(
    'قَالَ <span class=\\"diff-token token-emerald\\">فَبِعِزَّتِكَ لَأُغْوِيَنَّهُمْ أَجْمَعِينَ</span>',
    'قَالَ <span class=\\"diff-token token-emerald\\">فَبِعِزَّتِكَ</span> لَأُغْوِيَنَّهُمْ أَجْمَعِينَ'
  );

  // 3. araf_07
  text = text.replace(
    'فَوَسْوَسَ <span class=\\"diff-token token-cyan\\">لَهُمَا</span> الشَّيْطَانُ <span class=\\"diff-token token-cyan\\">لِيُبْدِيَ لَهُمَا مَا وُورِيَ عَنْهُمَا مِن سَوْآتِهِمَا وَقَالَ مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَذِهِ الشَّجَرَةِ إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ</span>',
    'فَوَسْوَسَ <span class=\\"diff-token token-cyan\\">لَهُمَا</span> الشَّيْطَانُ لِيُبْدِيَ لَهُمَا مَا وُورِيَ عَنْهُمَا مِن سَوْآتِهِمَا وَقَالَ مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَذِهِ الشَّجَرَةِ <span class=\\"diff-token token-cyan\\">إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ</span>'
  );
  text = text.replace(
    'فَوَسْوَسَ <span class=\\"diff-token token-amber\\">إِلَيْهِ</span> الشَّيْطَانُ <span class=\\"diff-token token-amber\\">قَالَ يَا آدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ</span>',
    'فَوَسْوَسَ <span class=\\"diff-token token-amber\\">إِلَيْهِ</span> الشَّيْطَانُ قَالَ يَا آدَمُ هَلْ أَدُلُّكَ <span class=\\"diff-token token-amber\\">عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ</span>'
  );

  return text;
}

// 1. Update araf_scholarly_verified.json
let arafJson = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json', 'utf8');
arafJson = refine(arafJson);
fs.writeFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/araf_scholarly_verified.json', arafJson, 'utf8');
console.log('araf_scholarly_verified.json refined.');

// 2. Update index.html
let html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');
html = refine(html);
fs.writeFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', html, 'utf8');
console.log('index.html refined.');
