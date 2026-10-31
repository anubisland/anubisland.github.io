# -*- coding: utf-8 -*-
"""
Assembler script for saffat_scholarly_verified.json
Combines parts 1-4 into a single scholarly verified JSON file.
"""
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

from saffat_part1 import PART1_CLUSTERS
from saffat_part2 import PART2_CLUSTERS
from saffat_part3 import PART3_CLUSTERS
from saffat_part4 import PART4_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS + PART3_CLUSTERS + PART4_CLUSTERS

print(f"Total clusters to assemble: {len(all_clusters)}")

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\saffat_scholarly_verified.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully assembled and wrote to {out_path}")
