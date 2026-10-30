# -*- coding: utf-8 -*-
import json
import re

json_path = r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\hud_scholarly_verified.json'

with open(json_path, encoding='utf-8') as f:
    clusters = json.load(f)

print(f'Total clusters: {len(clusters)}')
assert len(clusters) == 40, 'Should be 40 clusters'

for i, c in enumerate(clusters, 1):
    expected_id = f'hud_{i:02d}'
    assert c['id'] == expected_id, f'Mismatch ID: {c["id"]} != {expected_id}'
    
    # Check verses
    assert len(c['verses']) >= 2, f'{c["id"]}: Single verse singleton!'
    
    # Check surgical highlighting
    for v in c['verses']:
        html = v['textHtml']
        assert '<span class="diff-token' in html, f'{c["id"]}: Missing diff-token in verse'
        raw_text = re.sub(r'<[^>]+>', '', html)
        spans = re.findall(r'<span class="diff-token [^"]+">(.*?)</span>', html)
        total_span_len = sum(len(re.sub(r'<[^>]+>', '', s)) for s in spans)
        ratio = total_span_len / max(len(raw_text), 1)
        if ratio > 0.85:
            print(f'Warning: high highlight ratio in {c["id"]}: {ratio:.2f}')
            
    # Check binary tadabbur
    assert len(c['tadabbur']) == 2, f'{c["id"]}: tadabbur len != 2'
    assert c['tadabbur'][0]['h'] == 'التوجيه البياني عند أئمة المتشابهات', f'{c["id"]}: tadabbur[0] header mismatch'
    assert c['tadabbur'][1]['h'] == 'سر التفرقة واللطيفة التدبرية', f'{c["id"]}: tadabbur[1] header mismatch'
    
    # Check quiz
    q = c['quiz']
    assert len(q['options']) == 4, f'{c["id"]}: options != 4'
    assert len(set(q['options'])) == 4, f'{c["id"]}: duplicate options!'
    assert 0 <= q['correctIndex'] <= 3, f'{c["id"]}: invalid correctIndex'
    assert q['question'] and q['explanation'], f'{c["id"]}: empty question or explanation'

print('All 40 clusters passed 100% rigorous audit!')
