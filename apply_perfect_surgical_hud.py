# -*- coding: utf-8 -*-
import json
import re

# Refinements for Part 1
def refine_part1():
    from hud_part1 import part1_clusters
    
    # hud_01
    part1_clusters[0]['verses'][0]['textHtml'] = 'أَلَّا تَعْبُدُوا إِلَّا اللَّهَ ۚ <span class="diff-token token-cyan">إِنَّنِي</span> لَكُم مِّنْهُ <span class="diff-token token-cyan">نَذِيرٌ وَبَشِيرٌ</span>'
    part1_clusters[0]['verses'][0]['html'] = part1_clusters[0]['verses'][0]['textHtml']
    part1_clusters[0]['verses'][0]['tokens'] = ['إِنَّنِي', 'نَذِيرٌ وَبَشِيرٌ']
    
    part1_clusters[0]['verses'][1]['textHtml'] = 'أَن لَّا تَعْبُدُوا إِلَّا اللَّهَ ۖ <span class="diff-token token-amber">إِنِّي أَخَافُ عَلَيْكُمْ عَذَابَ يَوْمٍ أَلِيمٍ</span>'
    part1_clusters[0]['verses'][1]['html'] = part1_clusters[0]['verses'][1]['textHtml']
    part1_clusters[0]['verses'][1]['tokens'] = ['إِنِّي أَخَافُ عَلَيْكُمْ عَذَابَ يَوْمٍ أَلِيمٍ']
    
    # hud_02
    part1_clusters[1]['verses'][0]['textHtml'] = 'وَأَنِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ <span class="diff-token token-cyan">يُمَتِّعْكُم مَّتَاعًا حَسَنًا</span> إِلَىٰ أَجَلٍ مُّسَمًّى وَيُؤْتِ كُلَّ ذِي فَضْلٍ فَضْلَهُ'
    part1_clusters[1]['verses'][0]['html'] = part1_clusters[1]['verses'][0]['textHtml']
    part1_clusters[1]['verses'][0]['tokens'] = ['يُمَتِّعْكُم مَّتَاعًا حَسَنًا']
    
    part1_clusters[1]['verses'][1]['textHtml'] = 'وَيَا قَوْمِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ <span class="diff-token token-amber">يُرْسِلِ السَّمَاءَ عَلَيْكُم مِّدْرَارًا</span> وَيَزِدْكُمْ قُوَّةً إِلَىٰ قُوَّتِكُمْ وَلَا تَتَوَلَّوْا مُجْرِمِينَ'
    part1_clusters[1]['verses'][1]['html'] = part1_clusters[1]['verses'][1]['textHtml']
    part1_clusters[1]['verses'][1]['tokens'] = ['يُرْسِلِ السَّمَاءَ عَلَيْكُم مِّدْرَارًا']
    
    # hud_03
    part1_clusters[2]['verses'][0]['textHtml'] = 'وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ <span class="diff-token token-cyan">وَكَانَ عَرْشُهُ عَلَى الْمَاءِ</span> لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا'
    part1_clusters[2]['verses'][0]['html'] = part1_clusters[2]['verses'][0]['textHtml']
    part1_clusters[2]['verses'][0]['tokens'] = ['وَكَانَ عَرْشُهُ عَلَى الْمَاءِ']
    
    part1_clusters[2]['verses'][1]['textHtml'] = 'إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ <span class="diff-token token-amber">ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ</span> ۖ يُدَبِّرُ الْأَمْرَ'
    part1_clusters[2]['verses'][1]['html'] = part1_clusters[2]['verses'][1]['textHtml']
    part1_clusters[2]['verses'][1]['tokens'] = ['ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ']
    
    # hud_09
    part1_clusters[8]['verses'][0]['textHtml'] = '<span class="diff-token token-cyan">فَإِلَّمْ يَسْتَجِيبُوا لَكُمْ فَاعْلَمُوا</span> أَنَّمَا أُنزِلَ بِعِلْمِ اللَّهِ وَأَن لَّا إِلَٰهَ إِلَّا هُوَ ۖ فَهَلْ أَنتُم مُّسْلِمُونَ'
    part1_clusters[8]['verses'][0]['html'] = part1_clusters[8]['verses'][0]['textHtml']
    part1_clusters[8]['verses'][1]['textHtml'] = 'فَإِن لَّمْ يَسْتَجِيبُوا <span class="diff-token token-amber">لَكَ فَاعْلَمْ</span> أَنَّمَا يَتَّبِعُونَ أَهْوَاءَهُمْ ۚ وَمَنْ أَضَلُّ مِمَّنِ اتَّبَعَ هَوَاهُ بِغَيْرِ هُدًى مِّنَ اللَّهِ'
    part1_clusters[8]['verses'][1]['html'] = part1_clusters[8]['verses'][1]['textHtml']
    part1_clusters[8]['verses'][1]['tokens'] = ['لَكَ فَاعْلَمْ']
    
    # hud_10
    part1_clusters[9]['verses'][0]['textHtml'] = 'مَن كَانَ يُرِيدُ <span class="diff-token token-cyan">الْحَيَاةَ الدُّنْيَا وَزِينَتَهَا</span> نُوَفِّ إِلَيْهِمْ أَعْمَالَهُمْ فِيهَا وَهُمْ فِيهَا لَا يُبْخَسُونَ'
    part1_clusters[9]['verses'][0]['html'] = part1_clusters[9]['verses'][0]['textHtml']
    part1_clusters[9]['verses'][0]['tokens'] = ['الْحَيَاةَ الدُّنْيَا وَزِينَتَهَا']
    
    part1_clusters[9]['verses'][1]['textHtml'] = 'مَّن كَانَ يُرِيدُ <span class="diff-token token-amber">الْعَاجِلَةَ عَجَّلْنَا لَهُ</span> فِيهَا مَا نَشَاءُ لِمَن نُّرِيدُ ثُمَّ جَعَلْنَا لَهُ جَهَنَّمَ يَصْلَاهَا مَذْمُومًا مَّدْحُورًا'
    part1_clusters[9]['verses'][1]['html'] = part1_clusters[9]['verses'][1]['textHtml']
    part1_clusters[9]['verses'][1]['tokens'] = ['الْعَاجِلَةَ عَجَّلْنَا لَهُ']
    
    with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\hud_part1.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\npart1_clusters = ' + json.dumps(part1_clusters, ensure_ascii=False, indent=2) + '\n')
    print('Part 1 surgically refined.')

# Refinements for Part 2
def refine_part2():
    from hud_part2 import part2_clusters
    
    # hud_11
    part2_clusters[0]['verses'][0]['textHtml'] = 'أَفَمَن كَانَ عَلَىٰ بَيِّنَةٍ مِّن رَّبِّهِ وَيَتْلُوهُ شَاهِدٌ مِّنْهُ وَمِن قَبْلِهِ كِتَابُ مُوسَىٰ إِمَامًا وَرَحْمَةً ۚ <span class="diff-token token-cyan">أُولَٰئِكَ يُؤْمِنُونَ بِهِ</span> ۚ وَمَن يَكْفُرْ بِهِ مِنَ الْأَحْزَابِ فَالنَّارُ مَوْعِدُهُ'
    part2_clusters[0]['verses'][0]['html'] = part2_clusters[0]['verses'][0]['textHtml']
    part2_clusters[0]['verses'][0]['tokens'] = ['أُولَٰئِكَ يُؤْمِنُونَ بِهِ']
    
    part2_clusters[0]['verses'][1]['textHtml'] = 'وَمِن قَبْلِهِ كِتَابُ مُوسَىٰ إِمَامًا وَرَحْمَةً ۚ <span class="diff-token token-amber">وَهَٰذَا كِتَابٌ مُّصَدِّقٌ</span> لِّسَانًا عَرَبِيًّا لِّيُنذِرَ الَّذِينَ ظَلَمُوا وَبُشْرَىٰ لِلْمُحْسِنِينَ'
    part2_clusters[0]['verses'][1]['html'] = part2_clusters[0]['verses'][1]['textHtml']
    part2_clusters[0]['verses'][1]['tokens'] = ['وَهَٰذَا كِتَابٌ مُّصَدِّقٌ']
    
    # hud_12
    part2_clusters[1]['verses'][0]['textHtml'] = 'وَمَنْ أَظْلَمُ مِمَّنِ افْتَرَىٰ عَلَى اللَّهِ كَذِبًا ۚ <span class="diff-token token-cyan">أُولَٰئِكَ يُعْرَضُونَ عَلَىٰ رَبِّهِمْ</span> وَيَقُولُ الْأَشْهَادُ هَٰؤُلَاءِ الَّذِينَ كَذَبُوا عَلَىٰ رَبِّهِمْ ۚ أَلَا لَعْنَةُ اللَّهِ عَلَى الظَّالِمِينَ'
    part2_clusters[1]['verses'][0]['html'] = part2_clusters[1]['verses'][0]['textHtml']
    part2_clusters[1]['verses'][0]['tokens'] = ['أُولَٰئِكَ يُعْرَضُونَ عَلَىٰ رَبِّهِمْ']
    
    # hud_20
    part2_clusters[9]['verses'][0]['textHtml'] = 'قَالُوا يَا نُوحُ <span class="diff-token token-cyan">قَدْ جَادَلْتَنَا فَأَكْثَرْتَ جِدَالَنَا</span> فَأْتِنَا بِمَا تَعِدُنَا إِن كُنتَ مِنَ الصَّادِقِينَ'
    part2_clusters[9]['verses'][0]['html'] = part2_clusters[9]['verses'][0]['textHtml']
    part2_clusters[9]['verses'][0]['tokens'] = ['قَدْ جَادَلْتَنَا فَأَكْثَرْتَ جِدَالَنَا']
    
    part2_clusters[9]['verses'][1]['textHtml'] = 'قَالُوا أَجِئْتَنَا لِنَعْبُدَ اللَّهَ وَحْدَهُ وَنَذَرَ مَا كَانَ يَعْبُدُ آبَاؤُنَا <span class="diff-token token-amber">فَأْتِنَا بِمَا تَعِدُنَا</span> إِن كُنتَ مِنَ الصَّادِقِينَ'
    part2_clusters[9]['verses'][1]['html'] = part2_clusters[9]['verses'][1]['textHtml']
    part2_clusters[9]['verses'][1]['tokens'] = ['فَأْتِنَا بِمَا تَعِدُنَا']
    
    with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\hud_part2.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\npart2_clusters = ' + json.dumps(part2_clusters, ensure_ascii=False, indent=2) + '\n')
    print('Part 2 surgically refined.')

# Refinements for Part 3
def refine_part3():
    from hud_part3 import part3_clusters
    
    # hud_21
    part3_clusters[0]['verses'][0]['textHtml'] = 'أَمْ يَقُولُونَ افْتَرَاهُ ۖ قُلْ إِنِ افْتَرَيْتُهُ <span class="diff-token token-cyan">فَعَلَيَّ إِجْرَامِي</span> وَأَنَا بَرِيءٌ مِّمَّا تُجْرِمُونَ'
    part3_clusters[0]['verses'][0]['html'] = part3_clusters[0]['verses'][0]['textHtml']
    part3_clusters[0]['verses'][0]['tokens'] = ['فَعَلَيَّ إِجْرَامِي']
    
    part3_clusters[0]['verses'][1]['textHtml'] = 'وَإِن كَذَّبُوكَ فَقُل <span class="diff-token token-amber">لِّي عَمَلِي وَلَكُمْ عَمَلُكُمْ</span> ۖ أَنتُم بَرِيئُونَ مِمَّا أَعْمَلُ وَأَنَا بَرِيءٌ مِّمَّا تَعْمَلُونَ'
    part3_clusters[0]['verses'][1]['html'] = part3_clusters[0]['verses'][1]['textHtml']
    part3_clusters[0]['verses'][1]['tokens'] = ['لِّي عَمَلِي وَلَكُمْ عَمَلُكُمْ']
    
    # hud_22
    part3_clusters[1]['verses'][0]['textHtml'] = '<span class="diff-token token-cyan">وَاصْنَعِ الْفُلْكَ</span> بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَاطِبْنِي فِي الَّذِينَ ظَلَمُوا ۚ إِنَّهُم مُّغْرَقُونَ * <span class="diff-token token-cyan">وَيَصْنَعُ الْفُلْكَ</span> وَكُلَّمَا مَرَّ عَلَيْهِ مَلَأٌ مِّن قَوْمِهِ سَخِرُوا مِنْهُ'
    part3_clusters[1]['verses'][0]['html'] = part3_clusters[1]['verses'][0]['textHtml']
    part3_clusters[1]['verses'][0]['tokens'] = ['وَاصْنَعِ الْفُلْكَ', 'وَيَصْنَعُ الْفُلْكَ']
    
    part3_clusters[1]['verses'][1]['textHtml'] = '<span class="diff-token token-amber">فَأَوْحَيْنَا إِلَيْهِ أَنِ اصْنَعِ الْفُلْكَ</span> بِأَعْيُنِنَا وَوَحْيِنَا فَإِذَا جَاءَ أَمْرُنَا وَفَارَ التَّنُّورُ'
    part3_clusters[1]['verses'][1]['html'] = part3_clusters[1]['verses'][1]['textHtml']
    part3_clusters[1]['verses'][1]['tokens'] = ['فَأَوْحَيْنَا إِلَيْهِ أَنِ اصْنَعِ الْفُلْكَ']
    
    # hud_24
    part3_clusters[3]['verses'][0]['textHtml'] = '<span class="diff-token token-cyan">تِلْكَ</span> مِنْ أَنبَاءِ الْغَيْبِ <span class="diff-token token-cyan">نُوحِيهَا</span> إِلَيْكَ ۖ مَا كُنتَ تَعْلَمُهَا أَنتَ وَلَا قَوْمُكَ مِن قَبْلِ هَٰذَا ۖ فَاصْبِرْ ۖ إِنَّ الْعَاقِبَةَ لِلْمُتَّقِينَ'
    part3_clusters[3]['verses'][0]['html'] = part3_clusters[3]['verses'][0]['textHtml']
    part3_clusters[3]['verses'][0]['tokens'] = ['تِلْكَ', 'نُوحِيهَا']
    
    part3_clusters[3]['verses'][1]['textHtml'] = '<span class="diff-token token-amber">ذَٰلِكَ</span> مِنْ أَنبَاءِ الْغَيْبِ <span class="diff-token token-amber">نُوحِيهِ</span> إِلَيْكَ ۖ وَمَا كُنتَ لَدَيْهِمْ إِذْ أَجْمَعُوا أَمْرَهُمْ وَهُمْ يَمْكُرُونَ'
    part3_clusters[3]['verses'][1]['html'] = part3_clusters[3]['verses'][1]['textHtml']
    part3_clusters[3]['verses'][1]['tokens'] = ['ذَٰلِكَ', 'نُوحِيهِ']
    
    # hud_26
    part3_clusters[5]['verses'][0]['textHtml'] = 'مِن دُونِهِ ۖ <span class="diff-token token-cyan">فَكِيدُونِي جَمِيعًا ثُمَّ</span> لَا تُنظِرُونِ'
    part3_clusters[5]['verses'][0]['html'] = part3_clusters[5]['verses'][0]['textHtml']
    part3_clusters[5]['verses'][0]['tokens'] = ['فَكِيدُونِي جَمِيعًا ثُمَّ']
    
    part3_clusters[5]['verses'][1]['textHtml'] = 'قُلِ ادْعُوا شُرَكَاءَكُمْ <span class="diff-token token-amber">ثُمَّ كِيدُونِ فَلَا</span> تُنظِرُونِ'
    part3_clusters[5]['verses'][1]['html'] = part3_clusters[5]['verses'][1]['textHtml']
    part3_clusters[5]['verses'][1]['tokens'] = ['ثُمَّ كِيدُونِ فَلَا']
    
    # hud_28
    part3_clusters[7]['verses'][0]['textHtml'] = 'وَأُتْبِعُوا فِي هَٰذِهِ الدُّنْيَا لَعْنَةً وَيَوْمَ الْقِيَامَةِ ۗ أَلَا إِنَّ عَادًا كَفَرُوا رَبَّهُمْ ۗ أَلَا بُعْدًا لِّعَادٍ <span class="diff-token token-cyan">قَوْمِ هُودٍ</span>'
    part3_clusters[7]['verses'][0]['html'] = part3_clusters[7]['verses'][0]['textHtml']
    part3_clusters[7]['verses'][0]['tokens'] = ['قَوْمِ هُودٍ']
    
    part3_clusters[7]['verses'][1]['textHtml'] = 'كَأَن لَّمْ يَغْنَوْا فِيهَا ۗ أَلَا إِنَّ ثَمُودَ كَفَرُوا رَبَّهُمْ ۗ <span class="diff-token token-amber">أَلَا بُعْدًا لِّثَمُودَ</span>'
    part3_clusters[7]['verses'][1]['html'] = part3_clusters[7]['verses'][1]['textHtml']
    part3_clusters[7]['verses'][1]['tokens'] = ['أَلَا بُعْدًا لِّثَمُودَ']
    
    # hud_29
    part3_clusters[8]['verses'][0]['textHtml'] = 'قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ <span class="diff-token token-cyan">هُوَ أَنشَأَكُم مِّنَ الْأَرْضِ وَاسْتَعْمَرَكُمْ فِيهَا</span> فَاسْتَغْفِرُوهُ ثُمَّ تُوبُوا إِلَيْهِ ۚ إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ'
    part3_clusters[8]['verses'][0]['html'] = part3_clusters[8]['verses'][0]['textHtml']
    part3_clusters[8]['verses'][0]['tokens'] = ['هُوَ أَنشَأَكُم مِّنَ الْأَرْضِ وَاسْتَعْمَرَكُمْ فِيهَا']
    
    part3_clusters[8]['verses'][1]['textHtml'] = 'قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ <span class="diff-token token-amber">قَدْ جَاءَتْكُم بَيِّنَةٌ مِّن رَّبِّكُمْ</span> ۖ هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً'
    part3_clusters[8]['verses'][1]['html'] = part3_clusters[8]['verses'][1]['textHtml']
    part3_clusters[8]['verses'][1]['tokens'] = ['قَدْ جَاءَتْكُم بَيِّنَةٌ مِّن رَّبِّكُمْ']
    
    with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\hud_part3.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\npart3_clusters = ' + json.dumps(part3_clusters, ensure_ascii=False, indent=2) + '\n')
    print('Part 3 surgically refined.')

# Refinements for Part 4
def refine_part4():
    from hud_part4 import part4_clusters
    
    # hud_31
    part4_clusters[0]['verses'][0]['textHtml'] = 'وَلَقَدْ جَاءَتْ رُسُلُنَا إِبْرَاهِيمَ بِالْبُشْرَىٰ قَالُوا سَلَامًا ۖ قَالَ سَلَامٌ ۖ فَمَا لَبِثَ أَن جَاءَ بِعِجْلٍ <span class="diff-token token-cyan">حَنِيذٍ</span>'
    part4_clusters[0]['verses'][0]['html'] = part4_clusters[0]['verses'][0]['textHtml']
    part4_clusters[0]['verses'][0]['tokens'] = ['حَنِيذٍ']
    
    part4_clusters[0]['verses'][1]['textHtml'] = 'فَرَاغَ إِلَىٰ أَهْلِهِ فَجَاءَ بِعِجْلٍ <span class="diff-token token-amber">سَمِينٍ</span> ۖ فَقَرَّبَهُ إِلَيْهِمْ قَالَ أَلَا تَأْكُلُونَ'
    part4_clusters[0]['verses'][1]['html'] = part4_clusters[0]['verses'][1]['textHtml']
    part4_clusters[0]['verses'][1]['tokens'] = ['سَمِينٍ']
    
    # hud_32
    part4_clusters[1]['verses'][0]['textHtml'] = 'فَلَمَّا رَأَىٰ أَيْدِيَهُمْ لَا تَصِلُ إِلَيْهِ نَكِرَهُمْ وَأَوْجَسَ مِنْهُمْ خِيفَةً ۚ <span class="diff-token token-cyan">قَالُوا لَا تَخَفْ إِنَّا أُرْسِلْنَا إِلَىٰ قَوْمِ لُوطٍ</span>'
    part4_clusters[1]['verses'][0]['html'] = part4_clusters[1]['verses'][0]['textHtml']
    part4_clusters[1]['verses'][0]['tokens'] = ['قَالُوا لَا تَخَفْ إِنَّا أُرْسِلْنَا إِلَىٰ قَوْمِ لُوطٍ']
    
    part4_clusters[1]['verses'][1]['textHtml'] = 'إِذْ دَخَلُوا عَلَيْهِ فَقَالُوا سَلَامًا قَالَ إِنَّا مِنكُمْ وَجِلُونَ * <span class="diff-token token-amber">قَالُوا لَا تَوْجَلْ إِنَّا نُبَشِّرُكَ بِغُلَامٍ عَلِيمٍ</span>'
    part4_clusters[1]['verses'][1]['html'] = part4_clusters[1]['verses'][1]['textHtml']
    part4_clusters[1]['verses'][1]['tokens'] = ['قَالُوا لَا تَوْجَلْ إِنَّا نُبَشِّرُكَ بِغُلَامٍ عَلِيمٍ']
    
    # hud_33
    part4_clusters[2]['verses'][0]['textHtml'] = 'فَلَمَّا ذَهَبَ عَنْ إِبْرَاهِيمَ الرَّوْعُ وَجَاءَتْهُ الْبُشْرَىٰ <span class="diff-token token-cyan">يُجَادِلُنَا فِي قَوْمِ لُوطٍ</span> ۚ إِنَّ إِبْرَاهِيمَ لَحَلِيمٌ أَوَّاهٌ مُّنِيبٌ'
    part4_clusters[2]['verses'][0]['html'] = part4_clusters[2]['verses'][0]['textHtml']
    part4_clusters[2]['verses'][0]['tokens'] = ['يُجَادِلُنَا فِي قَوْمِ لُوطٍ']
    
    part4_clusters[2]['verses'][1]['textHtml'] = '<span class="diff-token token-amber">قَالَ إِنَّ فِيهَا لُوطًا</span> ۚ قَالُوا نَحْنُ أَعْلَمُ بِمَن فِيهَا ۖ لَنُنَجِّيَنَّهُ وَأَهْلَهُ إِلَّا امْرَأَتَهُ كَانَتْ مِنَ الْغَابِرِينَ'
    part4_clusters[2]['verses'][1]['html'] = part4_clusters[2]['verses'][1]['textHtml']
    part4_clusters[2]['verses'][1]['tokens'] = ['قَالَ إِنَّ فِيهَا لُوطًا']
    
    # hud_34
    part4_clusters[3]['verses'][0]['textHtml'] = '<span class="diff-token token-cyan">وَلَمَّا جَاءَتْ</span> رُسُلُنَا لُوطًا سِيءَ بِهِمْ وَضَاقَ بِهِمْ ذَرْعًا <span class="diff-token token-cyan">وَقَالَ هَٰذَا يَوْمٌ عَصِيبٌ</span>'
    part4_clusters[3]['verses'][0]['html'] = part4_clusters[3]['verses'][0]['textHtml']
    part4_clusters[3]['verses'][0]['tokens'] = ['وَلَمَّا جَاءَتْ', 'وَقَالَ هَٰذَا يَوْمٌ عَصِيبٌ']
    
    part4_clusters[3]['verses'][1]['textHtml'] = '<span class="diff-token token-amber">وَلَمَّا أَن جَاءَتْ</span> رُسُلُنَا لُوطًا سِيءَ بِهِمْ وَضَاقَ بِهِمْ ذَرْعًا <span class="diff-token token-amber">وَقَالُوا لَا تَخَفْ وَلَا تَحْزَنْ</span>'
    part4_clusters[3]['verses'][1]['html'] = part4_clusters[3]['verses'][1]['textHtml']
    part4_clusters[3]['verses'][1]['tokens'] = ['وَلَمَّا أَن جَاءَتْ', 'وَقَالُوا لَا تَخَفْ وَلَا تَحْزَنْ']
    
    # hud_35
    part4_clusters[4]['verses'][0]['textHtml'] = 'فَأَسْرِ بِأَهْلِكَ بِقِطْعٍ مِّنَ اللَّيْلِ وَلَا يَلْتَفِتْ مِنكُمْ أَحَدٌ <span class="diff-token token-cyan">إِلَّا امْرَأَتَكَ ۖ إِنَّهُ مُصِيبُهَا مَا أَصَابَهُمْ</span> ۚ إِنَّ مَوْعِدَهُمُ الصُّبْحُ ۚ أَلَيْسَ الصُّبْحُ بِقَرِيبٍ'
    part4_clusters[4]['verses'][0]['html'] = part4_clusters[4]['verses'][0]['textHtml']
    part4_clusters[4]['verses'][0]['tokens'] = ['إِلَّا امْرَأَتَكَ ۖ إِنَّهُ مُصِيبُهَا مَا أَصَابَهُمْ']
    
    part4_clusters[4]['verses'][1]['textHtml'] = 'فَأَسْرِ بِأَهْلِكَ بِقِطْعٍ مِّنَ اللَّيْلِ <span class="diff-token token-amber">وَاتَّبِعْ أَدْبَارَهُمْ</span> وَلَا يَلْتَفِتْ مِنكُمْ أَحَدٌ <span class="diff-token token-amber">وَامْضُوا حَيْثُ تُؤْمَرُونَ</span>'
    part4_clusters[4]['verses'][1]['html'] = part4_clusters[4]['verses'][1]['textHtml']
    part4_clusters[4]['verses'][1]['tokens'] = ['وَاتَّبِعْ أَدْبَارَهُمْ', 'وَامْضُوا حَيْثُ تُؤْمَرُونَ']
    
    # hud_36
    part4_clusters[5]['verses'][0]['textHtml'] = 'فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا <span class="diff-token token-cyan">عَلَيْهَا</span> حِجَارَةً مِّن سِجِّيلٍ <span class="diff-token token-cyan">مَّنضُودٍ</span>'
    part4_clusters[5]['verses'][0]['html'] = part4_clusters[5]['verses'][0]['textHtml']
    part4_clusters[5]['verses'][0]['tokens'] = ['عَلَيْهَا', 'مَّنضُودٍ']
    
    part4_clusters[5]['verses'][1]['textHtml'] = 'فَجَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا <span class="diff-token token-amber">عَلَيْهِمْ</span> حِجَارَةً مِّن سِجِّيلٍ'
    part4_clusters[5]['verses'][1]['html'] = part4_clusters[5]['verses'][1]['textHtml']
    part4_clusters[5]['verses'][1]['tokens'] = ['عَلَيْهِمْ']
    
    # hud_37
    part4_clusters[6]['verses'][0]['textHtml'] = 'قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ <span class="diff-token token-cyan">وَلَا تَنقُصُوا الْمِكْيَالَ وَالْمِيزَانَ</span> ۚ إِنِّي أَرَاكُم بِخَيْرٍ وَإِنِّي أَخَافُ عَلَيْكُمْ <span class="diff-token token-cyan\">عَذَابَ يَوْمٍ مُّحِيطٍ</span>'
    part4_clusters[6]['verses'][0]['html'] = part4_clusters[6]['verses'][0]['textHtml']
    part4_clusters[6]['verses'][0]['tokens'] = ['وَلَا تَنقُصُوا الْمِكْيَالَ وَالْمِيزَانَ', 'عَذَابَ يَوْمٍ مُّحِيطٍ']
    
    part4_clusters[6]['verses'][1]['textHtml'] = 'قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ قَدْ جَاءَتْكُم بَيِّنَةٌ مِّن رَّبِّكُمْ ۖ <span class="diff-token token-amber">فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ</span> وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ'
    part4_clusters[6]['verses'][1]['html'] = part4_clusters[6]['verses'][1]['textHtml']
    part4_clusters[6]['verses'][1]['tokens'] = ['فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ']
    
    # hud_38
    part4_clusters[7]['verses'][0]['textHtml'] = 'وَمَا أُرِيدُ أَنْ أُخَالِفَكُمْ إِلَىٰ مَا أَنْهَاكُمْ عَنْهُ ۚ إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ <span class="diff-token token-cyan">عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ</span>'
    part4_clusters[7]['verses'][0]['html'] = part4_clusters[7]['verses'][0]['textHtml']
    part4_clusters[7]['verses'][0]['tokens'] = ['عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ']
    
    part4_clusters[7]['verses'][1]['textHtml'] = 'قَدْ كَانَتْ لَكُمْ أُسْوَةٌ حَسَنَةٌ فِي إِبْرَاهِيمَ وَالَّذِينَ مَعَهُ ... <span class="diff-token token-amber">رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا</span> وَإِلَيْكَ الْمَصِيرُ'
    part4_clusters[7]['verses'][1]['html'] = part4_clusters[7]['verses'][1]['textHtml']
    part4_clusters[7]['verses'][1]['tokens'] = ['رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا']
    
    # hud_40
    part4_clusters[9]['verses'][0]['textHtml'] = 'وَلِلَّهِ غَيْبُ السَّمَاوَاتِ وَالْأَرْضِ وَإِلَيْهِ يُرْجَعُ الْأَمْرُ كُلُّهُ <span class="diff-token token-cyan">فَاعْبُدْهُ وَتَوَكَّلْ عَلَيْهِ</span> ۚ وَمَا رَبُّكَ بِغَافِلٍ عَمَّا تَعْمَلُونَ'
    part4_clusters[9]['verses'][0]['html'] = part4_clusters[9]['verses'][0]['textHtml']
    part4_clusters[9]['verses'][0]['tokens'] = ['فَاعْبُدْهُ وَتَوَكَّلْ عَلَيْهِ']
    
    part4_clusters[9]['verses'][1]['textHtml'] = 'وَقُلِ الْحَمْدُ لِلَّهِ <span class="diff-token token-amber">سَيُرِيكُمْ آيَاتِهِ فَتَعْرِفُونَهَا</span> ۚ وَمَا رَبُّكَ بِغَافِلٍ عَمَّا تَعْمَلُونَ'
    part4_clusters[9]['verses'][1]['html'] = part4_clusters[9]['verses'][1]['textHtml']
    part4_clusters[9]['verses'][1]['tokens'] = ['سَيُرِيكُمْ آيَاتِهِ فَتَعْرِفُونَهَا']
    
    with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\hud_part4.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\npart4_clusters = ' + json.dumps(part4_clusters, ensure_ascii=False, indent=2) + '\n')
    print('Part 4 surgically refined.')

refine_part1()
refine_part2()
refine_part3()
refine_part4()
