# -*- coding: utf-8 -*-
"""
Assemble all 4 parts of Surah Ar-Ra'd (28 clusters) into rad_scholarly_verified.json
"""
import json
import sys
import os

app_dir = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app"
sys.path.append(app_dir)

try:
    from rad_part1 import part1_clusters
    print(f"Loaded part 1: {len(part1_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 1: {e}")
    sys.exit(1)

try:
    from rad_part2 import part2_clusters
    print(f"Loaded part 2: {len(part2_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 2: {e}")
    sys.exit(1)

try:
    from rad_part3 import part3_clusters
    print(f"Loaded part 3: {len(part3_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 3: {e}")
    sys.exit(1)

try:
    from rad_part4 import part4_clusters
    print(f"Loaded part 4: {len(part4_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 4: {e}")
    sys.exit(1)

all_clusters = part1_clusters + part2_clusters + part3_clusters + part4_clusters
print(f"Total assembled clusters: {len(all_clusters)}")

out_path = os.path.join(app_dir, "rad_scholarly_verified.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully saved to {out_path} ({os.path.getsize(out_path)} bytes)")
