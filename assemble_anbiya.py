# -*- coding: utf-8 -*-
"""
Assemble Al-Anbiya Scholarly Verified Mutashabihat
Combines Part 1, 2, 3, 4 into anbiya_scholarly_verified.json
"""

import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

from anbiya_part1 import CLUSTERS_PART1
from anbiya_part2 import CLUSTERS_PART2
from anbiya_part3 import CLUSTERS_PART3
from anbiya_part4 import CLUSTERS_PART4

all_clusters = CLUSTERS_PART1 + CLUSTERS_PART2 + CLUSTERS_PART3 + CLUSTERS_PART4

print(f"Total clusters assembled: {len(all_clusters)}")

output_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\anbiya_scholarly_verified.json"

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Saved successfully to: {output_path}")
