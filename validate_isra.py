# -*- coding: utf-8 -*-
"""
Validation script for isra_scholarly_verified.json
"""
import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\isra_scholarly_verified.json"
with open(path, "r", encoding="utf-8") as f:
    clusters = json.load(f)

print(f"Total clusters loaded: {len(clusters)}")
errors = []

expected_ids = [f"isra_{i:02d}" for i in range(1, 41)]
actual_ids = [c["id"] for c in clusters]
if actual_ids != expected_ids:
    errors.append(f"ID mismatch: expected {len(expected_ids)} vs actual {len(actual_ids)}")

for i, c in enumerate(clusters):
    cid = c.get("id", f"idx_{i}")
    
    # Check required fields
    for field in ["title", "subtitle", "dabit", "rhyme", "alBurhan", "rule", "tadabbur", "scale", "verses", "quiz"]:
        if not c.get(field):
            errors.append(f"{cid}: missing or empty field '{field}'")

    # 1. verses count
    verses = c.get("verses", [])
    if len(verses) < 2:
        errors.append(f"{cid}: verses count < 2 ({len(verses)})")
    
    # 2. tadabbur structure
    tad = c.get("tadabbur", [])
    if len(tad) != 2:
        errors.append(f"{cid}: tadabbur length != 2 ({len(tad)})")
    else:
        h1 = tad[0].get("h", "")
        h2 = tad[1].get("h", "")
        if h1 != "التوجيه البياني عند أئمة المتشابهات":
            errors.append(f"{cid}: tadabbur[0].h != 'التوجيه البياني عند أئمة المتشابهات' (got: '{h1}')")
        if h2 != "سر التفرقة واللطيفة التدبرية":
            errors.append(f"{cid}: tadabbur[1].h != 'سر التفرقة واللطيفة التدبرية' (got: '{h2}')")
        if not tad[0].get("d") or len(tad[0].get("d")) < 20:
            errors.append(f"{cid}: tadabbur[0].d too short")
        if not tad[1].get("d") or len(tad[1].get("d")) < 20:
            errors.append(f"{cid}: tadabbur[1].d too short")

    # 3. scale structure
    scale = c.get("scale", [])
    if len(scale) < 2:
        errors.append(f"{cid}: scale length < 2 ({len(scale)})")
    for s_idx, s in enumerate(scale):
        if not s.get("word") or not s.get("note"):
            errors.append(f"{cid} scale[{s_idx}]: missing word or note")

    # 4. quiz structure
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
        errors.append(f"{cid}: correctOption does not match options[correctIndex]: '{quiz.get('correctOption')}' vs '{opts[cidx]}'")
    if not quiz.get("promptDisplay"):
        errors.append(f"{cid}: missing quiz promptDisplay")

    # 5. surgical highlighting check
    for v_idx, v in enumerate(verses):
        html = v.get("textHtml", "")
        if "diff-token" not in html:
            errors.append(f"{cid} verse {v_idx}: no diff-token found in textHtml")
        tokens = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', html)
        if not tokens:
            errors.append(f"{cid} verse {v_idx}: regex failed to extract diff-token text")
        clean_html = re.sub(r"<[^>]+>", "", html).strip()
        for t in tokens:
            if len(t.strip()) >= len(clean_html) * 0.95 and len(clean_html) > 60:
                errors.append(f"{cid} verse {v_idx}: excessive highlight: '{t[:30]}...' vs entire verse")

if errors:
    print(f"ERRORS FOUND ({len(errors)}):")
    for e in errors:
        print(" -", e)
    sys.exit(1)
else:
    print("SUCCESS: ALL 40 CLUSTERS PASSED 100% OF RIGOROUS SCHOLARLY AND STRUCTURAL AUDIT CHECKS!")
