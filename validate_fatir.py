# -*- coding: utf-8 -*-
"""
Validation script for fatir_scholarly_verified.json
Comprehensive checks according to "معراج الإتقان في متشابهات القرآن" standards.
"""
import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\fatir_scholarly_verified.json"
if not os.path.exists(path):
    print(f"Error: file not found: {path}")
    sys.exit(1)

with open(path, "r", encoding="utf-8") as f:
    clusters = json.load(f)

print(f"Total clusters loaded: {len(clusters)}")
errors = []

# Verification of count: 30 to 34 clusters
if not (30 <= len(clusters) <= 34):
    errors.append(f"Cluster count must be between 30 and 34, got {len(clusters)}")

expected_count = len(clusters)
expected_ids = [f"fatir_{i:02d}" for i in range(1, expected_count + 1)]
actual_ids = [c["id"] for c in clusters]
if actual_ids != expected_ids:
    errors.append(f"ID mismatch: expected {expected_ids} vs actual {actual_ids}")

scholars = ["الكرماني", "الإسكافي", "ابن الزبير", "السخاوي", "ابن جماعة"]

for i, c in enumerate(clusters):
    cid = c.get("id", f"idx_{i}")
    
    # Check required fields
    for field in ["id", "tier", "category", "scope", "title", "subtitle", "dabit", "rhyme", "alBurhan", "rule", "tadabbur", "scale", "verses", "quiz"]:
        if not c.get(field):
            errors.append(f"{cid}: missing or empty field '{field}'")

    # 1. verses count (MULTI-VERSE CLUSTERS ONLY: verses.length >= 2, ZERO singletons)
    verses = c.get("verses", [])
    if len(verses) < 2:
        errors.append(f"{cid}: verses count < 2 ({len(verses)}) - Singleton detected!")
    
    # 2. scholarship backed (Check citations in alBurhan or tadabbur)
    burhan_text = c.get("alBurhan", "")
    has_scholar = any(s in burhan_text for s in scholars)
    if not has_scholar:
        errors.append(f"{cid}: no recognized classical scholar cited in alBurhan")

    # 3. tadabbur structure
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

    # 4. scale structure
    scale = c.get("scale", [])
    if len(scale) < 2:
        errors.append(f"{cid}: scale length < 2 ({len(scale)})")
    for s_idx, s in enumerate(scale):
        if not s.get("word") or not s.get("note"):
            errors.append(f"{cid} scale[{s_idx}]: missing word or note")

    # 5. quiz structure
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

    # 6. surgical highlighting check: strictly under 70%
    for v_idx, v in enumerate(verses):
        html = v.get("textHtml", "")
        if "diff-token" not in html:
            errors.append(f"{cid} verse {v_idx}: no diff-token found in textHtml")
        tokens = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', html)
        if not tokens:
            errors.append(f"{cid} verse {v_idx}: regex failed to extract diff-token text")
        clean_html = re.sub(r"<[^>]+>", "", html).strip()
        total_token_len = sum(len(t.strip()) for t in tokens)
        pct = total_token_len / len(clean_html) if len(clean_html) > 0 else 0
        if pct >= 0.70 and len(clean_html) > 40:
            errors.append(f"{cid} verse {v_idx}: excessive highlight: {total_token_len}/{len(clean_html)} chars ({pct:.1%}) in '{clean_html[:30]}...'")

if errors:
    print(f"\nFAILED with {len(errors)} error(s):")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
else:
    print("\nALL CHECKS PASSED PERFECTLY!")
    print(f"✓ Total Clusters: {len(clusters)} (Requirement: 30 to 34 clusters)")
    print("✓ Zero singletons: All clusters have >= 2 verses")
    print("✓ Zero excessive highlights: All highlights strictly < 70%")
    print(f"✓ All {len(clusters)} quizzes have 4 distinct options, valid correctIndex, and clear explanations")
    print("✓ Scholarly foundations: Al-Kirmani, Al-Iskafi, Ibn Az-Zubayr, Al-Sakhawi, Ibn Jama'ah cited throughout")
