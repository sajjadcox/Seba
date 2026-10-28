import json
from pathlib import Path
from urllib.parse import urlparse
ROOT = Path(__file__).resolve().parents[1] / "data"
def load(n): return json.loads((ROOT/n).read_text(encoding="utf-8"))
categories, subcategories, services, sources = [load(n) for n in ["categories.json","subcategories.json","services.json","official-sources.json"]]
def unique(items,key,label):
    vals=[x.get(key) for x in items]
    if len(vals)!=len(set(vals)): raise SystemExit(f"Duplicate {label}")
for items,key,label in [(categories,"id","category ID"),(categories,"slug","category slug"),(subcategories,"id","subcategory ID"),(subcategories,"slug","subcategory slug"),(services,"id","service ID"),(services,"slug","service slug"),(sources,"id","source ID")]:
    unique(items,key,label)
cat_ids={x["id"] for x in categories}; sub_ids={x["id"] for x in subcategories}; source_ids={x["id"] for x in sources}
errors=[]
for s in subcategories:
    if s["categoryId"] not in cat_ids: errors.append(f'{s["id"]}: missing category')
for s in services:
    if s["categoryId"] not in cat_ids: errors.append(f'{s["id"]}: missing category')
    if s.get("subcategoryId") and s["subcategoryId"] not in sub_ids: errors.append(f'{s["id"]}: missing subcategory')
    if any(x not in source_ids for x in s.get("sourceIds",[])): errors.append(f'{s["id"]}: missing source')
    u=s.get("officialUrl")
    if u:
        p=urlparse(u)
        if p.scheme not in ("http","https") or not p.netloc: errors.append(f'{s["id"]}: malformed URL')
    if s["verification"]["status"]=="not-researched" and s.get("isActive"): errors.append(f'{s["id"]}: inactive placeholder is active')
if errors: print("\\n".join(errors)); raise SystemExit(1)
print(f"OK: {len(categories)} categories, {len(subcategories)} subcategories, {len(services)} services, {len(sources)} sources.")
print("Structural validation only; URL ownership and live status are not checked by this script.")
