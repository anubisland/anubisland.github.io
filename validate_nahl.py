# -*- coding: utf-8 -*-
import json
import re
import sys

# Ensure utf-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\nahl_scholarly_verified.json"
with open(path, "r", encoding="utf-8") as f:
    clusters = json.load(f)

print(f"Total clusters loaded: {len(clusters)}")
errors = []

expected_ids = [f"nahl_{i:02d}" for i in range(1, 41)]
actual_ids = [c["id"] for c in clusters]
if actual_ids != expected_ids:
    errors.append(f"ID mismatch: {actual_ids}")

for i, c in enumerate(clusters):
    cid = c["id"]
    # 1. verses count
    if len(c.get("verses", [])) < 2:
        errors.append(f"{cid}: verses count < 2 ({len(c.get('verses', []))})")
    
    # 2. tadabbur structure
    tad = c.get("tadabbur", [])
    if len(tad) != 2:
        errors.append(f"{cid}: tadabbur length != 2 ({len(tad)})")
    else:
        h1 = tad[0].get("h", "")
        h2 = tad[1].get("h", "")
        if h1 != "التوجيه البياني عند أئمة المتشابهات":
            errors.append(f"{cid}: tadabbur[0].h != 'التوجيه البياني عند أئمة المتشابهات' (got: {h1})")
        if h2 != "سر التفرقة واللطيفة التدبرية":
            errors.append(f"{cid}: tadabbur[1].h != 'سر التفرقة واللطيفة التدبرية' (got: {h2})")

    # 3. quiz structure
    quiz = c.get("quiz", {})
    opts = quiz.get("options", [])
    if len(opts) != 4:
        errors.append(f"{cid}: quiz options length != 4 ({len(opts)})")
    if len(set(opts)) != 4:
        errors.append(f"{cid}: duplicate options in quiz: {opts}")
    cidx = quiz.get("correctIndex", -1)
    if cidx not in [0, 1, 2, 3]:
        errors.append(f"{cid}: invalid correctIndex: {cidx}")
    if not quiz.get("explanation"):
        errors.append(f"{cid}: missing quiz explanation")
    if quiz.get("correctOption") != opts[cidx]:
        errors.append(f"{cid}: correctOption does not match options[correctIndex]: {quiz.get('correctOption')} vs {opts[cidx]}")

    # 4. surgical highlighting check
    for v_idx, v in enumerate(c.get("verses", [])):
        html = v.get("textHtml", "")
        if "diff-token" not in html:
            errors.append(f"{cid} verse {v_idx}: no diff-token found")
        tokens = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', html)
        if not tokens:
            errors.append(f"{cid} verse {v_idx}: regex failed to extract diff-token text")
        clean_html = re.sub(r"<[^>]+>", "", html).strip()
        for t in tokens:
            if len(t.strip()) >= len(clean_html) * 0.9 and len(clean_html) > 50:
                errors.append(f"{cid} verse {v_idx}: possible excessive highlight: '{t}' vs '{clean_html}'")

if errors:
    print(f"ERRORS FOUND ({len(errors)}):")
    for e in errors:
        print(" -", e)
else:
    print("ALL 40 CLUSTERS PASSED 100% OF SCHOLARLY AND STRUCTURAL AUDIT CHECKS!")
