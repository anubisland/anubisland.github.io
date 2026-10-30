import json
import re

with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\taha_scholarly_verified.json', encoding='utf-8') as f:
    clusters = json.load(f)

for c in clusters:
    cid = c['id']
    for v_idx, v in enumerate(c['verses']):
        html = v.get('textHtml', '')
        tokens = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', html)
        clean = re.sub(r'<[^>]+>', '', html).strip()
        tok_len = sum(len(t.strip()) for t in tokens)
        ratio = tok_len / len(clean) if len(clean) > 0 else 0
        if ratio >= 0.70:
            print(f'{cid} v{v_idx}: ratio={ratio:.1%}, tok_len={tok_len}, clean_len={len(clean)}')
