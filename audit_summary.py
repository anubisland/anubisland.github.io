# -*- coding: utf-8 -*-
import json
import re

path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\isra_scholarly_verified.json"
with open(path, "r", encoding="utf-8") as f:
    clusters = json.load(f)

print("=== STATISTICAL AUDIT REPORT FOR SURAH AL-ISRA ===")
print(f"Total Clusters: {len(clusters)}")
total_verses = sum(len(c["verses"]) for c in clusters)
print(f"Total Verses: {total_verses}")
print(f"Average Verses per Cluster: {total_verses/len(clusters):.2f}")
inter_count = sum(1 for c in clusters if c.get("category") == "inter_surah")
intra_count = sum(1 for c in clusters if c.get("category") == "intra_surah")
print(f"Inter-surah Clusters: {inter_count}")
print(f"Intra-surah Clusters: {intra_count}")

tokens_count = 0
for c in clusters:
    for v in c["verses"]:
        t = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', v["textHtml"])
        tokens_count += len(t)
print(f"Total Surgical Diff Tokens: {tokens_count}")

surahs_compared = set()
for c in clusters:
    for v in c["verses"]:
        surahs_compared.add(v["surah"])
print(f"Surahs Compared With Al-Isra ({len(surahs_compared)}): {', '.join(sorted(surahs_compared))}")
