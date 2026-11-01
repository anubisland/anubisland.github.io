# -*- coding: utf-8 -*-
"""
Combines parts 1-4 into shura_scholarly_verified.json
"""
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

from shura_part1 import PART1_CLUSTERS
from shura_part2 import PART2_CLUSTERS
from shura_part3 import PART3_CLUSTERS
from shura_part4 import PART4_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS + PART3_CLUSTERS + PART4_CLUSTERS
print(f"Total clusters to write: {len(all_clusters)}")

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\shura_scholarly_verified.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully saved to: {out_path}")
