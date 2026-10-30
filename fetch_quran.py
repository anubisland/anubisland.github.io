# -*- coding: utf-8 -*-
import urllib.request
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

cache_file = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\quran_cache.json"
surahs_to_fetch = [22, 4, 31, 23, 40, 41, 6, 10, 25, 85, 11, 2, 5, 16, 24, 14, 44, 32, 35, 18, 76, 48, 8, 30, 47, 29, 70, 7, 26, 67, 34, 58, 39, 3]

cache = {}
if os.path.exists(cache_file):
    try:
        with open(cache_file, "r", encoding="utf-8") as f:
            cache = json.load(f)
    except Exception:
        cache = {}

needed = [s for s in surahs_to_fetch if str(s) not in cache]
print(f"Needed surahs: {len(needed)}")
for s in needed:
    url = f"https://api.alquran.cloud/v1/surah/{s}/quran-uthmani"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))["data"]
            cache[str(s)] = data
            print(f"Fetched surah {s}: {data['name']}")
    except Exception as e:
        print(f"Failed surah {s}: {e}")

with open(cache_file, "w", encoding="utf-8") as f:
    json.dump(cache, f, ensure_ascii=False)
print("Quran cache ready.")
