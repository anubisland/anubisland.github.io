import re

for part in ["part1", "part2", "part3", "part4"]:
    file_path = f"C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app\\araf_data_{part}.py"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # replace unescaped class="..." with class=\"...\"
    # but not class=\"...\"
    fixed = re.sub(r'class="([^"\\]+)"', r'class=\"\1\"', content)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(fixed)
    print(f"{part} cleaned")
