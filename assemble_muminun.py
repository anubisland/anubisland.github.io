# -*- coding: utf-8 -*-
"""
Assemble Al-Mu'minun Scholarly Verified Mutashabihat
Combines Part 1, 2, 3, 4 into muminun_scholarly_verified.json
"""

import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

# Ensure we import from current directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from muminun_part1 import CLUSTERS_PART1
from muminun_part2 import CLUSTERS_PART2
from muminun_part3 import CLUSTERS_PART3
from muminun_part4 import CLUSTERS_PART4

all_clusters = CLUSTERS_PART1 + CLUSTERS_PART2 + CLUSTERS_PART3 + CLUSTERS_PART4

print(f"Total clusters assembled: {len(all_clusters)}")

output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "muminun_scholarly_verified.json")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Saved successfully to: {output_path}")
