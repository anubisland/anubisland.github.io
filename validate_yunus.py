# -*- coding: utf-8 -*-
import sys
import re

sys.path.append(r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app")

from yunus_part1 import part1_clusters
from yunus_part2 import part2_clusters
from yunus_part3 import part3_clusters
from yunus_part4 import part4_clusters

all_clusters = part1_clusters + part2_clusters + part3_clusters + part4_clusters
print(f"Total clusters loaded: {len(all_clusters)}")

expected_ids = [f"yunus_{i:02d}" for i in range(1, 37)]
actual_ids = [c["id"] for c in all_clusters]

assert actual_ids == expected_ids, f"IDs mismatch: {set(expected_ids) - set(actual_ids)}"

for c in all_clusters:
    cid = c["id"]
    # 1. Zero singletons
    assert len(c["verses"]) >= 2, f"{cid}: verses length < 2"
    
    # 2. Tadabbur structure
    assert len(c["tadabbur"]) == 2, f"{cid}: tadabbur length != 2"
    assert c["tadabbur"][0]["h"] == "التوجيه البياني عند أئمة المتشابهات", f"{cid}: tadabbur 0 heading mismatch"
    assert c["tadabbur"][1]["h"] == "سر التفرقة واللطيفة التدبرية", f"{cid}: tadabbur 1 heading mismatch"
    
    # 3. Quiz structure
    q = c["quiz"]
    assert len(q["options"]) == 4, f"{cid}: options length != 4"
    assert len(set(q["options"])) == 4, f"{cid}: duplicate options: {q['options']}"
    assert 0 <= q["correctIndex"] < 4, f"{cid}: invalid correctIndex"
    assert len(q["explanation"]) > 10, f"{cid}: explanation too short"
    
    # 4. Surgical highlighting
    for v in c["verses"]:
        html = v["textHtml"]
        assert "diff-token" in html, f"{cid}: missing diff-token in verse {v['ayah']}"
        tokens = re.findall(r'<span class="diff-token[^"]*">(.*?)</span>', html)
        assert len(tokens) > 0, f"{cid}: no diff-token spans found in verse {v['ayah']}"
        for tok in tokens:
            # Token must not be empty and must not cover the entire verse
            clean_tok = tok.strip()
            assert len(clean_tok) > 0, f"{cid}: empty token in verse {v['ayah']}"
            assert len(clean_tok) < len(html) * 0.85, f"{cid}: token too long: {tok}"

print("=== VERIFICATION PASSED: ALL 36 YUNUS CLUSTERS COMPLY 100% WITH ALL CRITERIA ===")
