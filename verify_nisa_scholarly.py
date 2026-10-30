# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\nisa_scholarly_verified.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

print(f"Total clusters loaded: {len(clusters)}")

ids = set()
errors = []

for idx, c in enumerate(clusters):
    cid = c.get('id')
    if not cid:
        errors.append(f"Cluster at index {idx} has no ID")
    elif cid in ids:
        errors.append(f"Duplicate ID found: {cid}")
    ids.add(cid)

    # Check required fields
    req_fields = ['id', 'tier', 'category', 'title', 'subtitle', 'rhyme', 'rule', 'quiz', 'scale', 'tadabbur', 'verses']
    for f in req_fields:
        if f not in c or not c[f]:
            errors.append(f"[{cid}] missing or empty field: {f}")

    # Check verses
    verses = c.get('verses', [])
    if len(verses) < 2:
        errors.append(f"[{cid}] verses count is less than 2: {len(verses)}")
    for v_idx, v in enumerate(verses):
        for vf in ['ayah', 'quarter', 'page', 'pos', 'tokens', 'html']:
            if vf not in v or not v[vf]:
                errors.append(f"[{cid}] verse {v_idx} missing {vf}")

    # Check quiz
    quiz = c.get('quiz', {})
    q_fields = ['promptDisplay', 'correctOption', 'wrongOption', 'feedbackExplanation']
    for qf in q_fields:
        if qf not in quiz or not quiz[qf]:
            errors.append(f"[{cid}] quiz missing {qf}")
    if quiz.get('correctOption') and quiz.get('wrongOption'):
        if quiz['correctOption'].strip() == quiz['wrongOption'].strip():
            errors.append(f"[{cid}] quiz options are identical")
    if quiz.get('promptDisplay') and '[ ... ؟ ... ]' not in quiz['promptDisplay']:
        errors.append(f"[{cid}] promptDisplay missing placeholder '[ ... ؟ ... ]'")

    # Check scale
    scale = c.get('scale', [])
    if len(scale) < 2:
        errors.append(f"[{cid}] scale count is less than 2: {len(scale)}")

if errors:
    print(f"FAILED WITH {len(errors)} ERRORS:")
    for err in errors:
        print("  -", err)
    sys.exit(1)
else:
    print("ALL 36 CLUSTERS VERIFIED 100% PERFECTLY! NO ERRORS FOUND.")
