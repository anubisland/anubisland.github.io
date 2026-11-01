# -*- coding: utf-8 -*-
"""
Builder and Integrator for Surah Ad-Dukhan Scholarly Verified Mutashabihat Dataset
معراج الإتقان في متشابهات القرآن - سورة الدخان
"""

import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

from dukhan_part1 import PART1_CLUSTERS
from dukhan_part2 import PART2_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS

print(f"Loaded {len(PART1_CLUSTERS)} from Part 1, {len(PART2_CLUSTERS)} from Part 2.")
print(f"Total clusters: {len(all_clusters)}")

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\dukhan_scholarly_verified.json"

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Saved successfully to {out_path}")
