# -*- coding: utf-8 -*-
import json
import os
import sys

from tawbah_part1 import part1_clusters
from tawbah_part2 import part2_clusters
from tawbah_part3 import part3_clusters
from tawbah_part4 import part4_clusters

all_clusters = part1_clusters + part2_clusters + part3_clusters + part4_clusters

print(f"Total clusters assembled: {len(all_clusters)}")

output_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\tawbah_scholarly_verified.json"

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully wrote {len(all_clusters)} clusters to {output_path}")
