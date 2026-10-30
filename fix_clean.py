# -*- coding: utf-8 -*-
"""
Fix surgical highlights by modifying python objects directly
"""
import sys
import os

app_dir = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app"
sys.path.append(app_dir)

import isra_part3
import isra_part4

# --- PART 3 ---
p3 = isra_part3.part1_clusters if hasattr(isra_part3, 'part1_clusters') else isra_part3.part3_clusters

# 1. isra_21 (index 0)
v0 = p3[0]["verses"][0]
v0["textHtml"] = '<span class="diff-token token-emerald">أَفَأَصْفَاكُمْ رَبُّكُم بِالْبَنِينَ</span> وَاتَّخَذَ مِنَ الْمَلَائِكَةِ إِنَاثًا ۚ <span class="diff-token token-emerald">إِنَّكُمْ لَتَقُولُونَ قَوْلًا عَظِيمًا</span>'
v0["html"] = v0["textHtml"]
v0["tokens"] = ["أَفَأَصْفَاكُمْ رَبُّكُم بِالْبَنِينَ", "إِنَّكُمْ لَتَقُولُونَ قَوْلًا عَظِيمًا"]

v1 = p3[0]["verses"][1]
v1["textHtml"] = '<span class="diff-token token-amber">أَمِ اتَّخَذَ مِمَّا يَخْلُقُ بَنَاتٍ</span> وَأَصْفَاكُم بِالْبَنِينَ'
v1["html"] = v1["textHtml"]
v1["tokens"] = ["أَمِ اتَّخَذَ مِمَّا يَخْلُقُ بَنَاتٍ"]

# 2. isra_22 (index 1)
v0 = p3[1]["verses"][0]
v0["textHtml"] = 'وَلَقَدْ صَرَّفْنَا فِي هَٰذَا الْقُرْآنِ <span class="diff-token token-emerald">لِيَذَّكَّرُوا وَمَا يَزِيدُهُمْ إِلَّا نُفُورًا</span>'
v0["html"] = v0["textHtml"]
v0["tokens"] = ["لِيَذَّكَّرُوا وَمَا يَزِيدُهُمْ إِلَّا نُفُورًا"]

v1 = p3[1]["verses"][1]
v1["textHtml"] = 'وَلَقَدْ صَرَّفْنَا <span class="diff-token token-amber">لِلنَّاسِ</span> فِي هَٰذَا الْقُرْآنِ <span class="diff-token token-amber">مِن كُلِّ مَثَلٍ فَأَبَىٰ أَكْثَرُ النَّاسِ إِلَّا كُفُورًا</span>'
v1["html"] = v1["textHtml"]
v1["tokens"] = ["لِلنَّاسِ", "مِن كُلِّ مَثَلٍ فَأَبَىٰ أَكْثَرُ النَّاسِ إِلَّا كُفُورًا"]

# 3. isra_27 (index 6)
v0 = p3[6]["verses"][0]
v0["textHtml"] = 'وَقَالُوا أَإِذَا كُنَّا <span class="diff-token token-emerald">عِظَامًا وَرُفَاتًا</span> أَإِنَّا لَمَبْعُوثُونَ <span class="diff-token token-emerald">خَلْقًا جَدِيدًا</span>'
v0["html"] = v0["textHtml"]
v0["tokens"] = ["عِظَامًا وَرُفَاتًا", "خَلْقًا جَدِيدًا"]

# Re-write isra_part3.py
import json
with open(os.path.join(app_dir, "isra_part3.py"), "w", encoding="utf-8") as f:
    f.write('# -*- coding: utf-8 -*-\n"""\nSurah Al-Isra Mutashabihat - Part 3 (Clusters 21 to 30)\n"""\n\npart3_clusters = ' + json.dumps(p3, ensure_ascii=False, indent=4) + "\n")
print("isra_part3.py successfully updated!")


# --- PART 4 ---
p4 = isra_part4.part4_clusters

# 1. isra_32 (index 1)
v1 = p4[1]["verses"][1]
v1["textHtml"] = 'وَمَا مَنَعَ النَّاسَ أَن يُؤْمِنُوا إِذْ جَاءَهُمُ الْهُدَىٰ <span class="diff-token token-amber">إِلَّا أَن قَالُوا أَبَعَثَ اللَّهُ بَشَرًا رَّسُولًا</span>'
v1["html"] = v1["textHtml"]
v1["tokens"] = ["إِلَّا أَن قَالُوا أَبَعَثَ اللَّهُ بَشَرًا رَّسُولًا"]

v2 = p4[1]["verses"][2]
v2["textHtml"] = 'وَمَا مَنَعَ النَّاسَ أَن يُؤْمِنُوا إِذْ جَاءَهُمُ الْهُدَىٰ <span class="diff-token token-sky">وَيَسْتَغْفِرُوا رَبَّهُمْ إِلَّا أَن تَأْتِيَهُم سُنَّةُ الْأَوَّلِينَ أَوْ يَأْتِيَهُمُ الْعَذَابُ قُبُلًا</span>'
v2["html"] = v2["textHtml"]
v2["tokens"] = ["وَيَسْتَغْفِرُوا رَبَّهُمْ إِلَّا أَن تَأْتِيَهُم سُنَّةُ الْأَوَّلِينَ أَوْ يَأْتِيَهُمُ الْعَذَابُ قُبُلًا"]

# 2. isra_39 (index 8)
v0 = p4[8]["verses"][0]
v0["textHtml"] = '<span class="diff-token token-emerald">قُل لَّئِنِ اجْتَمَعَتِ الْإِنسُ وَالْجِنُّ</span> عَلَىٰ أَن يَأْتُوا بِمِثْلِ هَٰذَا الْقُرْآنِ لَا يَأْتُونَ بِمِثْلِهِ <span class="diff-token token-emerald">وَلَوْ كَانَ بَعْضُهُمْ لِبَعْضٍ ظَهِيرًا</span>'
v0["html"] = v0["textHtml"]
v0["tokens"] = ["قُل لَّئِنِ اجْتَمَعَتِ الْإِنسُ وَالْجِنُّ", "وَلَوْ كَانَ بَعْضُهُمْ لِبَعْضٍ ظَهِيرًا"]

# Re-write isra_part4.py
with open(os.path.join(app_dir, "isra_part4.py"), "w", encoding="utf-8") as f:
    f.write('# -*- coding: utf-8 -*-\n"""\nSurah Al-Isra Mutashabihat - Part 4 (Clusters 31 to 40)\n"""\n\npart4_clusters = ' + json.dumps(p4, ensure_ascii=False, indent=4) + "\n")
print("isra_part4.py successfully updated!")
