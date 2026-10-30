# -*- coding: utf-8 -*-

def update_part2():
    path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\anfal_part2.py"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # anfal_11 v1
    content = content.replace(
        '"<span class=\\"diff-token token-cyan\\">ذَٰلِكُمْ فَذُوقُوهُ وَأَنَّ لِلْكَافِرِينَ عَذَابَ النَّارِ</span>"',
        '"<span class=\\"diff-token token-cyan\\">ذَٰلِكُمْ فَذُوقُوهُ وَأَنَّ لِلْكَافِرِينَ</span> عَذَابَ النَّارِ"'
    )

    # anfal_11 v2
    content = content.replace(
        '"وَرَأَى الْمُجْرِمُونَ النَّارَ ... كُلَّمَا أَرَادُوا أَن يَخْرُجُوا مِنْهَا أُعِيدُوا فِيهَا <span class=\\"diff-token token-amber\\">وَقِيلَ لَهُمْ ذُوقُوا عَذَابَ النَّارِ الَّذِي كُنتُم بِهِ تُكَذِّبُونَ</span>"',
        '"كُلَّمَا أَرَادُوا أَن يَخْرُجُوا مِنْهَا أُعِيدُوا فِيهَا <span class=\\"diff-token token-amber\\">وَقِيلَ لَهُمْ ذُوقُوا</span> عَذَابَ النَّارِ <span class=\\"diff-token token-amber\\">الَّذِي كُنتُم بِهِ تُكَذِّبُونَ</span>"'
    )

    # anfal_14 v1
    content = content.replace(
        '"<span class=\\"diff-token token-cyan\\">ذَٰلِكُمْ وَأَنَّ اللَّهَ مُوهِنُ كَيْدِ الْكَافِرِينَ</span>"',
        '"ذَٰلِكُمْ <span class=\\"diff-token token-cyan\\">وَأَنَّ اللَّهَ مُوهِنُ كَيْدِ الْكَافِرِينَ</span>"'
    )

    # anfal_14 v2
    content = content.replace(
        '"<span class=\\"diff-token token-amber\\">ذَٰلِكُمْ فَذُوقُوهُ وَأَنَّ لِلْكَافِرِينَ عَذَابَ النَّارِ</span>"',
        '"ذَٰلِكُمْ <span class=\\"diff-token token-amber\\">فَذُوقُوهُ وَأَنَّ لِلْكَافِرِينَ عَذَابَ النَّارِ</span>"'
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("part2 updated.")

def update_part3():
    path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\anfal_part3.py"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # anfal_19 v2 (Al-Ma'idah 98): add full verse context so it's not over-highlighted
    content = content.replace(
        '"<span class=\\"diff-token token-amber\\">اعْلَمُوا أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ وَأَنَّ اللَّهَ غَفُورٌ رَّحِيمٌ</span>"',
        '"<span class=\\"diff-token token-amber\\">اعْلَمُوا</span> أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ <span class=\\"diff-token token-amber\\">وَأَنَّ اللَّهَ غَفُورٌ رَّحِيمٌ</span>"'
    )

    # anfal_22 v2:
    content = content.replace(
        '"<span class=\\"diff-token token-amber\\">وَمَكَرُوا وَمَكَرَ اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ</span>"',
        '"<span class=\\"diff-token token-amber\\">وَمَكَرُوا وَمَكَرَ</span> اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ"'
    )

    # anfal_24 v1 & v2:
    content = content.replace(
        '"<span class=\\"diff-token token-cyan\\">وَمَا كَانَ اللَّهُ لِيُعَذِّبَهُمْ وَأَنتَ فِيهِمْ ۚ وَمَا كَانَ اللَّهُ مُعَذِّبَهُمْ وَهُمْ يَسْتَغْفِرُونَ</span>"',
        '"وَمَا <span class=\\"diff-token token-cyan\\">كَانَ</span> اللَّهُ <span class=\"diff-token token-cyan\">لِيُعَذِّبَهُمْ وَأَنتَ فِيهِمْ</span> ۚ وَمَا كَانَ اللَّهُ مُعَذِّبَهُمْ وَهُمْ يَسْتَغْفِرُونَ"'
    )

    content = content.replace(
        '"<span class=\\"diff-token token-amber\\">وَمَا لَهُمْ أَلَّا يُعَذِّبَهُمُ اللَّهُ وَهُمْ يَصُدُّونَ عَنِ الْمَسْجِدِ الْحَرَامِ وَمَا كَانُوا أَوْلِيَاءَهُ</span>"',
        '"وَمَا <span class=\\"diff-token token-amber\\">لَهُمْ أَلَّا</span> يُعَذِّبَهُمُ اللَّهُ <span class=\\"diff-token token-amber\\">وَهُمْ يَصُدُّونَ عَنِ الْمَسْجِدِ الْحَرَامِ</span> وَمَا كَانُوا أَوْلِيَاءَهُ ۚ إِنْ أَوْلِيَاؤُهُ إِلَّا الْمُتَّقُونَ وَلَٰكِنَّ أَكْثَرَهُمْ لَا يَعْلَمُونَ"'
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("part3 updated.")

if __name__ == "__main__":
    update_part2()
    update_part3()
