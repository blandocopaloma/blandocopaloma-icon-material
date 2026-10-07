#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "images"
OUT = ROOT / "materials.js"

CATEGORIES = [
    ("other", "その他", "その他の素材"),
    ("monster", "モンスター", "モンスター・魔物"),
    ("skill", "技能", "技能・能力"),
    ("sky", "空・天候", "空・天候"),
    ("buildings", "建物・場所", "建物・場所"),
    ("facilities", "施設・サービス", "施設・サービス"),
    ("vehicles", "乗り物", "乗り物"),
    ("plants", "植物", "植物"),
    ("food", "食べ物", "食べ物"),
    ("human", "人間", "人間"),
    ("equipment", "装備", "装備"),
    ("animals", "動物", "動物"),
    ("weapons", "武器", "武器"),
    ("objects", "物", "物"),
]

EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}

def js_string(s):
    return json.dumps(s, ensure_ascii=False)

category_data = [
    {"name": name, "slug": folder, "description": description}
    for folder, name, description in CATEGORIES
]

items = []
for folder, category, _description in CATEGORIES:
    directory = IMAGES / folder
    if not directory.exists():
        continue
    for path in sorted(directory.iterdir(), key=lambda p: p.name.casefold()):
        if not path.is_file() or path.suffix.lower() not in EXTENSIONS:
            continue
        name = path.stem
        image = path.relative_to(ROOT).as_posix()
        item_id = f"{folder}-{path.stem}"
        items.append({
            "id": item_id,
            "name": name,
            "category": category,
            "image": image,
            "tags": []
        })

lines = ["// このファイルはGitHub Actionsによって自動生成されます。", "", "const CATEGORIES = " + json.dumps(category_data, ensure_ascii=False) + ";", "", "const MATERIALS = ["]
for i, item in enumerate(items):
    comma = "," if i < len(items) - 1 else ""
    lines.append(
        "  { id: %s, name: %s, category: %s, image: %s, tags: %s }%s"
        % (
            js_string(item["id"]),
            js_string(item["name"]),
            js_string(item["category"]),
            js_string(item["image"]),
            json.dumps(item["tags"], ensure_ascii=False),
            comma
        )
    )
lines += ["];", ""]
OUT.write_text("\n".join(lines), encoding="utf-8")
print(f"Generated {len(items)} materials.")
