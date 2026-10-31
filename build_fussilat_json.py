# -*- coding: utf-8 -*-
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

from fussilat_part1 import PART1_CLUSTERS
from fussilat_part2 import PART2_CLUSTERS
from fussilat_part3 import PART3_CLUSTERS
from fussilat_part4 import PART4_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS + PART3_CLUSTERS + PART4_CLUSTERS

print(f"Total clusters assembled: {len(all_clusters)}")

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\fussilat_scholarly_verified.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Saved successfully to: {out_path}")
