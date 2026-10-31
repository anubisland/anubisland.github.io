# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/quran_cache.json', encoding='utf-8') as f:
    d = json.load(f)

s29 = d['29']
print(f"Total ayahs in Surat Al-Ankabut: {len(s29['ayahs'])}")
for a in s29['ayahs']:
    print(f"Ayah {a['numberInSurah']}: Page {a['page']}, Juz {a['juz']}, Quarter {a['hizbQuarter']}")
    print(f"  {a['text']}")
