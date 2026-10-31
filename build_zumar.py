# -*- coding: utf-8 -*-
"""
Builder script to combine all parts of Surat Az-Zumar into zumar_scholarly_verified.json
"""
import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

from zumar_part1 import PART1_CLUSTERS
from zumar_part2 import PART2_CLUSTERS
from zumar_part3 import PART3_CLUSTERS
from zumar_part4 import PART4_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS + PART3_CLUSTERS + PART4_CLUSTERS

print(f"Loaded {len(all_clusters)} clusters across 4 parts.")

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\zumar_scholarly_verified.json"

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully wrote {len(all_clusters)} clusters to: {out_path}")
