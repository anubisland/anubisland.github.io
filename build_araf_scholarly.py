# -*- coding: utf-8 -*-
"""
Master Builder and Auditor for Surah Al-A'raf Scholarly Verified Dataset.
Compiles 40 clusters from parts 1-4, validates all standards, and outputs:
C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_scholarly_verified.json
"""

import json
import os
import re
import sys

from araf_data_part1 import clusters_part1
from araf_data_part2 import clusters_part2
from araf_data_part3 import clusters_part3
from araf_data_part4 import clusters_part4

all_clusters = clusters_part1 + clusters_part2 + clusters_part3 + clusters_part4

print(f"Loaded total clusters: {len(all_clusters)}")

# Verification checks
errors = []

if len(all_clusters) != 40:
    errors.append(f"Expected exactly 40 clusters, found {len(all_clusters)}")

expected_ids = [f"araf_{i:02d}" for i in range(1, 41)]
found_ids = [c["id"] for c in all_clusters]

if found_ids != expected_ids:
    errors.append(f"Cluster IDs mismatch! Expected {expected_ids[:3]}...{expected_ids[-1]}, found {found_ids[:3]}...{found_ids[-1]}")

total_verses = 0
for idx, c in enumerate(all_clusters):
    cid = c["id"]
    
    # Check required fields
    required_keys = ["id", "title", "category", "scope", "verses", "dabit", "alBurhan", "tadabbur", "quiz"]
    for k in required_keys:
        if k not in c or not c[k]:
            errors.append(f"[{cid}] Missing or empty required key: '{k}'")
            
    # Check verses
    verses = c.get("verses", [])
    if len(verses) < 2:
        errors.append(f"[{cid}] Has fewer than 2 verses: {len(verses)}")
    total_verses += len(verses)
    
    for v_idx, v in enumerate(verses):
        v_keys = ["surah", "ayah", "page", "juz", "textHtml", "html", "keyPhrase", "tokens", "contextNote"]
        for vk in v_keys:
            if vk not in v or v[vk] is None:
                errors.append(f"[{cid} v#{v_idx+1}] Missing verse field: '{vk}'")
                
        # Check surgical highlighting
        html = v.get("html", "")
        matches = re.findall(r'<span class="diff-token ([^"]+)">([^<]+)</span>', html)
        if not matches:
            errors.append(f"[{cid} v#{v_idx+1}] No diff-token found in html: {html[:60]}")
        else:
            plain_text = re.sub(r'<[^>]+>', '', html).strip()
            highlighted_text = " ".join([m[1] for m in matches]).strip()
            if len(highlighted_text) >= len(plain_text) * 0.90 and len(plain_text) > 30:
                errors.append(f"[{cid} v#{v_idx+1}] Over-highlighted verse! Highlighted length {len(highlighted_text)} vs Plain length {len(plain_text)}")
                
    # Check quiz
    quiz = c.get("quiz", {})
    q_keys = ["question", "targetVerse", "options", "correctIndex", "explanation"]
    for qk in q_keys:
        if qk not in quiz:
            errors.append(f"[{cid}] Missing quiz field: '{qk}'")
            
    opts = quiz.get("options", [])
    if len(opts) != 4:
        errors.append(f"[{cid}] Quiz must have exactly 4 options, found {len(opts)}")
    if len(set(opts)) != len(opts):
        errors.append(f"[{cid}] Quiz has duplicate options: {opts}")
        
    c_idx = quiz.get("correctIndex", -1)
    if c_idx < 0 or c_idx >= len(opts):
        errors.append(f"[{cid}] Quiz correctIndex {c_idx} out of range")

print(f"Total compared verses across 40 clusters: {total_verses}")
print(f"Total audit errors found: {len(errors)}")

if errors:
    print("\n--- ALL VALIDATION ERRORS ---")
    for err in errors:
        print("ERROR:", err)
    sys.exit(1)

# Write output file
out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\araf_scholarly_verified.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

file_size = os.path.getsize(out_path)
print(f"\nSUCCESS! File written to: {out_path}")
print(f"File size: {file_size} bytes ({file_size/1024:.2f} KB)")
