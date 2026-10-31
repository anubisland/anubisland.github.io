# -*- coding: utf-8 -*-
import urllib.request
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

cache_file = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\quran_cache.json"
cache = {}
if os.path.exists(cache_file):
    with open(cache_file, "r", encoding="utf-8") as f:
        cache = json.load(f)

for s in [27, 28, 20]:
    if str(s) not in cache:
        url = f"https://api.alquran.cloud/v1/surah/{s}/quran-uthmani"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))['data']
                cache[str(s)] = data
                print(f"Fetched {s}: {data['name']}")
        except Exception as e:
            print(f"Failed {s}: {e}")

with open(cache_file, "w", encoding="utf-8") as f:
    json.dump(cache, f, ensure_ascii=False)
print(f"Total surahs in cache: {len(cache)}")
