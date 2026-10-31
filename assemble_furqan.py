# -*- coding: utf-8 -*-
"""
Assemble Al-Furqan Scholarly Verified Mutashabihat
Combines Part 1, 2, 3, 4 into furqan_scholarly_verified.json
"""

import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

from furqan_part1 import PART1_CLUSTERS
from furqan_part2 import PART2_CLUSTERS
from furqan_part3 import PART3_CLUSTERS
from furqan_part4 import PART4_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS + PART3_CLUSTERS + PART4_CLUSTERS

print(f"Total clusters assembled: {len(all_clusters)}")

output_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\furqan_scholarly_verified.json"

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Saved successfully to: {output_path}")
