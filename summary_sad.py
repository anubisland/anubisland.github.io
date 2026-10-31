import sys, json
sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\sad_scholarly_verified.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Count: {len(data)}")
verse_counts = [len(c['verses']) for c in data]
print(f"Total verses across clusters: {sum(verse_counts)}")
print(f"Min verses per cluster: {min(verse_counts)}, Max: {max(verse_counts)}")
print("\nCluster titles summary:")
for c in data:
    print(f"  {c['id']}: {c['title']} ({len(c['verses'])} verses) - Quiz correct: {c['quiz']['options'][c['quiz']['correctIndex']]}")
