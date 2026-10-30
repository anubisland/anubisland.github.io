# -*- coding: utf-8 -*-
path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\anfal_part3.py"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

bad_str = '<span class="diff-token token-cyan">'
good_str = '<span class=\\"diff-token token-cyan\\">'
text = text.replace(bad_str, good_str)

with open(path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed syntax in anfal_part3.py")
