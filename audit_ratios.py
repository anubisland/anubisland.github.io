# -*- coding: utf-8 -*-
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/kahf_scholarly_verified.json', encoding='utf-8'))
for c in data:
    for v_idx, v in enumerate(c['verses']):
        html = v.get('textHtml', '')
        tokens = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', html)
        clean = re.sub(r'<[^>]+>', '', html).strip()
        t_len = sum(len(t.strip()) for t in tokens)
        ratio = t_len / len(clean) if clean else 0
        if ratio > 0.60:
            print(f"{c['id']} v{v_idx}: ratio={ratio:.1%}, len={len(clean)}, token_len={t_len}, tokens={tokens}")
