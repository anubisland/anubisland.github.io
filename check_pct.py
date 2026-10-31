import sys, re
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app")
from sad_part1 import PART1_CLUSTERS
from sad_part2 import PART2_CLUSTERS
from sad_part3 import PART3_CLUSTERS

all_clusters = PART1_CLUSTERS + PART2_CLUSTERS + PART3_CLUSTERS
print(f"Total: {len(all_clusters)}")
high_pct_count = 0
for c in all_clusters:
    cid = c['id']
    for v_idx, v in enumerate(c.get('verses', [])):
        html = v.get('textHtml', '')
        tokens = re.findall(r'<span class="diff-token[^"]*">([^<]+)</span>', html)
        clean = re.sub(r'<[^>]+>', '', html).strip()
        t_len = sum(len(t.strip()) for t in tokens)
        pct = t_len / len(clean) if len(clean) > 0 else 0
        if pct >= 0.70:
            high_pct_count += 1
            print(f"{cid} v{v_idx}: pct={pct:.1%} clean_len={len(clean)} token_len={t_len} text='{clean[:40]}...'")

print(f"High pct count: {high_pct_count}")
