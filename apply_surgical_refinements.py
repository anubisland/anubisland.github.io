# -*- coding: utf-8 -*-
"""
Script to apply surgical refinements to araf_data_part1..4
"""

# Let's update each part cleanly

# 1. Update araf_data_part1.py
with open("C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_part1.py", "r", encoding="utf-8") as f:
    p1 = f.read()

# araf_02
p1 = p1.replace(
    'قَالَ <span class=\\"diff-token token-cyan\\">فَاهْبِطْ مِنْهَا فَمَا يَكُونُ لَكَ أَن تَتَكَبَّرَ فِيهَا فَاخْرُجْ إِنَّكَ مِنَ الصَّاغِرِينَ</span>',
    'قَالَ <span class=\\"diff-token token-cyan\\">فَاهْبِطْ</span> مِنْهَا <span class=\\"diff-token token-cyan\\">فَمَا يَكُونُ لَكَ أَن تَتَكَبَّرَ فِيهَا فَاخْرُجْ إِنَّكَ مِنَ الصَّاغِرِينَ</span>'
)
p1 = p1.replace(
    'قَالَ <span class=\\"diff-token token-amber\\">فَاخْرُجْ مِنْهَا فَإِنَّكَ رَجِيمٌ</span>',
    'قَالَ <span class=\\"diff-token token-amber\\">فَاخْرُجْ</span> مِنْهَا <span class=\\"diff-token token-amber\\">فَإِنَّكَ رَجِيمٌ</span>'
)
p1 = p1.replace(
    'قَالَ <span class=\\"diff-token token-emerald\\">فَاخْرُجْ مِنْهَا فَإِنَّكَ رَجِيمٌ</span>',
    'قَالَ <span class=\\"diff-token token-emerald\\">فَاخْرُجْ</span> مِنْهَا <span class=\\"diff-token token-emerald\\">فَإِنَّكَ رَجِيمٌ</span>'
)

# araf_07
p1 = p1.replace(
    '<span class=\\"diff-token token-cyan\\">فَوَسْوَسَ لَهُمَا الشَّيْطَانُ لِيُبْدِيَ لَهُمَا مَا وُورِيَ عَنْهُمَا مِن سَوْآتِهِمَا وَقَالَ مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَذِهِ الشَّجَرَةِ إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ</span>',
    'فَوَسْوَسَ <span class=\\"diff-token token-cyan\\">لَهُمَا</span> الشَّيْطَانُ <span class=\\"diff-token token-cyan\\">لِيُبْدِيَ لَهُمَا مَا وُورِيَ عَنْهُمَا مِن سَوْآتِهِمَا وَقَالَ مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَذِهِ الشَّجَرَةِ إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ</span>'
)
p1 = p1.replace(
    '<span class=\\"diff-token token-amber\\">فَوَسْوَسَ إِلَيْهِ الشَّيْطَانُ قَالَ يَا آدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ</span>',
    'فَوَسْوَسَ <span class=\\"diff-token token-amber\\">إِلَيْهِ</span> الشَّيْطَانُ <span class=\\"diff-token token-amber\\">قَالَ يَا آدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ</span>'
)

# araf_09
p1 = p1.replace(
    '<span class=\\"diff-token token-amber\\">مِنْهَا خَلَقْنَاكُمْ وَفِيهَا نُعِيدُكُمْ وَمِنْهَا نُخْرِجُكُمْ تَارَةً أُخْرَىٰ</span>',
    'قَالَ اهْبِطَا مِنْهَا جَمِيعًا ۖ بَعْضُكُمْ لِبَعْضٍ عَدُوٌّ ۖ <span class=\\"diff-token token-amber\\">فَإِمَّا يَأْتِيَنَّكُم مِّنِّي هُدًى فَمَنِ اتَّبَعَ هُدَايَ فَلَا يَضِلُّ وَلَا يَشْقَىٰ</span>'
)

# araf_10
p1 = p1.replace(
    'يَا بَنِي آدَمَ <span class=\\"diff-token token-cyan\\">قَدْ أَنزَلْنَا عَلَيْكُمْ لِبَاسًا يُوَارِي سَوْآتِكُمْ وَرِيشًا ۖ وَلِبَاسُ التَّقْوَىٰ ذَٰلِكَ خَيْرٌ ۚ ذَٰلِكَ مِنْ آيَاتِ اللَّهِ لَعَلَّهُمْ يَذَّكَّرُونَ</span>',
    'يَا بَنِي آدَمَ <span class=\\"diff-token token-cyan\\">قَدْ أَنزَلْنَا عَلَيْكُمْ لِبَاسًا يُوَارِي سَوْآتِكُمْ وَرِيشًا ۖ وَلِبَاسُ التَّقْوَىٰ ذَٰلِكَ خَيْرٌ</span> ۚ ذَٰلِكَ مِنْ آيَاتِ اللَّهِ لَعَلَّهُمْ يَذَّكَّرُونَ'
)

with open("C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_part1.py", "w", encoding="utf-8") as f:
    f.write(p1)

print("Part 1 updated")


# 2. Update araf_data_part2.py
with open("C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_part2.py", "r", encoding="utf-8") as f:
    p2 = f.read()

# araf_12
p2 = p2.replace(
    '<span class=\\"diff-token token-cyan\\">قُلْ إِنَّمَا حَرَّمَ رَبِّيَ الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ وَالْإِثْمَ وَالْبَغْيَ بِغَيْرِ الْحَقِّ وَأَن تُشْرِكُوا بِاللَّهِ مَا لَمْ يُنَزِّلْ بِهِ سُلْطَانًا وَأَن تَقُولُوا عَلَى اللَّهِ مَا لَا تَعْلَمُونَ</span>',
    'قُلْ <span class=\\"diff-token token-cyan\\">إِنَّمَا حَرَّمَ رَبِّيَ الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ</span> وَالْإِثْمَ وَالْبَغْيَ بِغَيْرِ الْحَقِّ وَأَن تُشْرِكُوا بِاللَّهِ مَا لَمْ يُنَزِّلْ بِهِ سُلْطَانًا وَأَن تَقُولُوا عَلَى اللَّهِ مَا لَا تَعْلَمُونَ'
)
p2 = p2.replace(
    '<span class=\\"diff-token token-amber\\">قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ أَلَّا تُشْرِكُوا بِهِ شَيْئًا ۖ ... وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ</span>',
    'قُلْ <span class=\\"diff-token token-amber\\">تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ أَلَّا تُشْرِكُوا بِهِ شَيْئًا</span> ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا ... وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ'
)

# araf_17
p2 = p2.replace(
    'وَإِذَا صُرِفَتْ أَبْصَارُهُمْ تِلْقَاءَ أَصْحَابِ النَّارِ قَالُوا <span class=\\"diff-token token-cyan\">رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ</span>',
    'وَإِذَا صُرِفَتْ أَبْصَارُهُمْ تِلْقَاءَ أَصْحَابِ النَّارِ قَالُوا <span class=\\"diff-token token-cyan\">رَبَّنَا لَا تَجْعَلْنَا مَعَ</span> الْقَوْمِ الظَّالِمِينَ'
)
p2 = p2.replace(
    '<span class=\\"diff-token token-amber\\">رَّبِّ فَلَا تَجْعَلْنِي فِي الْقَوْمِ الظَّالِمِينَ</span>',
    'قُل رَّبِّ إِمَّا تُرِيَنِّي مَا يُوعَدُونَ * <span class=\\"diff-token token-amber\\">رَّبِّ فَلَا تَجْعَلْنِي فِي</span> الْقَوْمِ الظَّالِمِينَ'
)
p2 = p2.replace(
    'فَقَالُوا عَلَى اللَّهِ تَوَكَّلْنَا <span class=\\"diff-token token-emerald\">رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ</span>',
    'فَقَالُوا عَلَى اللَّهِ تَوَكَّلْنَا <span class=\\"diff-token token-emerald\">رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ</span> الظَّالِمِينَ'
)

with open("C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_part2.py", "w", encoding="utf-8") as f:
    f.write(p2)

print("Part 2 updated")


# 3. Update araf_data_part3.py
with open("C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_part3.py", "r", encoding="utf-8") as f:
    p3 = f.read()

# araf_22
p3 = p3.replace(
    '<span class=\\"diff-token token-cyan\">قَالَ الْمَلَأُ مِن قَوْمِهِ إِنَّا لَنَرَاكَ فِي ضَلَالٍ مُّبِينٍ</span>',
    '<span class=\\"diff-token token-cyan\">قَالَ الْمَلَأُ مِن قَوْمِهِ إِنَّا لَنَرَاكَ فِي ضَلَالٍ مُّبِينٍ</span> ۖ قَالَ يَا قَوْمِ لَيْسَ بِي ضَلَالَةٌ'
)
p3 = p3.replace(
    '<span class=\\"diff-token token-amber\">فَقَالَ الْمَلَأُ الَّذِينَ كَفَرُوا مِن قَوْمِهِ مَا نَرَاكَ إِلَّا بَشَرًا مِّثْلَنَا وَمَا نَرَاكَ اتَّبَعَكَ إِلَّا الَّذِينَ هُمْ أَرَاذِلُنَا بَادِيَ الرَّأْيِ</span>',
    '<span class=\\"diff-token token-amber\">فَقَالَ الْمَلَأُ الَّذِينَ كَفَرُوا مِن قَوْمِهِ مَا نَرَاكَ إِلَّا بَشَرًا مِّثْلَنَا</span> وَمَا نَرَاكَ اتَّبَعَكَ إِلَّا الَّذِينَ هُمْ أَرَاذِلُنَا بَادِيَ الرَّأْيِ وَمَا نَرَىٰ لَكُمْ عَلَيْنَا مِن فَضْلٍ بَلْ نَظُنُّكُمْ كَاذِبِينَ'
)

# araf_25
p3 = p3.replace(
    '<span class=\\"diff-token token-cyan\">فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ</span>',
    '<span class=\\"diff-token token-cyan\">فَأَخَذَتْهُمُ الرَّجْفَةُ</span> فَأَصْبَحُوا فِي <span class=\\"diff-token token-cyan\">دَارِهِمْ</span> جَاثِمِينَ'
)
p3 = p3.replace(
    '<span class=\\"diff-token token-amber\">وَأَخَذَ الَّذِينَ ظَلَمُوا الصَّيْحَةُ فَأَصْبَحُوا فِي دِيَارِهِمْ جَاثِمِينَ</span>',
    'وَأَخَذَ الَّذِينَ ظَلَمُوا <span class=\\"diff-token token-amber\">الصَّيْحَةُ</span> فَأَصْبَحُوا فِي <span class=\\"diff-token token-amber\">دِيَارِهِمْ</span> جَاثِمِينَ'
)

# araf_30
p3 = p3.replace(
    '<span class=\\"diff-token token-amber\">كَأَن لَّمْ يَغْنَوْا فِيهَا ۗ أَلَا بُعْدًا لِّمَدْيَنَ كَمَا بَعِدَتْ ثَمُودُ</span>',
    'فَأَصْبَحُوا فِي دِيَارِهِمْ جَاثِمِينَ * كَأَن لَّمْ يَغْنَوْا فِيهَا ۗ <span class=\\"diff-token token-amber\">أَلَا بُعْدًا لِّمَدْيَنَ كَمَا بَعِدَتْ ثَمُودُ</span>'
)

with open("C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_part3.py", "w", encoding="utf-8") as f:
    f.write(p3)

print("Part 3 updated")
