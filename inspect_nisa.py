import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\nisa_clusters_ready.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total clusters in nisa_clusters_ready.json: {len(data)}")
for i, c in enumerate(data):
    verses = [f"{v.get('surah', 'النساء')}:{v.get('ayah')}" for v in c.get('verses', [])]
    print(f"{i+1:02d}. [{c['id']}] {c['title']} -> {', '.join(verses)}")

