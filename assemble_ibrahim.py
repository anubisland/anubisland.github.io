# -*- coding: utf-8 -*-
"""
Assemble all 4 parts of Surah Ibrahim (28 clusters) into ibrahim_scholarly_verified.json
معراج الإتقان في متشابهات القرآن
"""
import json
import sys
import os

app_dir = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app"
sys.path.append(app_dir)

try:
    from ibrahim_part1 import part1_clusters
    print(f"Loaded part 1: {len(part1_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 1: {e}")
    sys.exit(1)

try:
    from ibrahim_part2 import part2_clusters
    print(f"Loaded part 2: {len(part2_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 2: {e}")
    sys.exit(1)

try:
    from ibrahim_part3 import part3_clusters
    print(f"Loaded part 3: {len(part3_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 3: {e}")
    sys.exit(1)

try:
    from ibrahim_part4 import part4_clusters
    print(f"Loaded part 4: {len(part4_clusters)} clusters")
except Exception as e:
    print(f"Error loading part 4: {e}")
    sys.exit(1)

all_clusters = part1_clusters + part2_clusters + part3_clusters + part4_clusters
print(f"Total assembled clusters: {len(all_clusters)}")

# Validate structure for each cluster
for i, c in enumerate(all_clusters, 1):
    assert c["id"] == f"ibrahim_{i:02d}", f"ID mismatch at {i}: {c['id']}"
    assert len(c["verses"]) >= 2, f"Singleton found at {c['id']}"
    assert len(c["tadabbur"]) == 2, f"Tadabbur structure incorrect at {c['id']}"
    assert c["tadabbur"][0]["h"] == "التوجيه البياني عند أئمة المتشابهات", f"Tadabbur 0 header error at {c['id']}"
    assert c["tadabbur"][1]["h"] == "سر التفرقة واللطيفة التدبرية", f"Tadabbur 1 header error at {c['id']}"
    assert "quiz" in c, f"Missing quiz at {c['id']}"
    quiz = c["quiz"]
    assert len(quiz["options"]) == 4, f"Options length not 4 at {c['id']}"
    assert len(set(quiz["options"])) == 4, f"Duplicate options at {c['id']}"
    assert 0 <= quiz["correctIndex"] <= 3, f"Invalid correctIndex at {c['id']}"
    for v in c["verses"]:
        assert '<span class="diff-token' in v["textHtml"], f"Missing diff-token in verse {v.get('surah')} ayah {v.get('ayah')} in {c['id']}"

out_path = os.path.join(app_dir, "ibrahim_scholarly_verified.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully validated and saved to {out_path} ({os.path.getsize(out_path)} bytes)")
