# -*- coding: utf-8 -*-
"""
Builder Script for Surah Al-Jathiyah Dataset.
معراج الإتقان في متشابهات القرآن - سورة الجاثية
"""

import json
import os
import sys

from jathiyah_part1 import CLUSTERS_PART1
from jathiyah_part2 import CLUSTERS_PART2

all_clusters = CLUSTERS_PART1 + CLUSTERS_PART2

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\jathiyah_scholarly_verified.json"

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully wrote {len(all_clusters)} clusters to {out_path}")
