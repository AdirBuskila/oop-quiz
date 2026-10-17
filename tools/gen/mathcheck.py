# Collect every math span in a raw exam JSON -> stdout payload for render_math.js
import json, re, sys
d = json.load(open(sys.argv[1], encoding="utf-8"))
RX = re.compile(r"\$\$(.+?)\$\$|\$(.+?)\$", re.S)
items = []
def add(s):
    for m in RX.finditer(s or ""):
        items.append({"tex": m.group(1) or m.group(2), "display": bool(m.group(1))})
for q in d["questions"]:
    add(q["question"]); add(q.get("explanation"))
    for o in q["options"]:
        if o["type"] == "math": items.append({"tex": o["value"], "display": False})
        elif o["type"] == "text": add(o["value"])
for c in d.get("contexts", {}).values(): add(c.get("text"))
sys.stderr.write(f"{len(items)} spans\n")
print(json.dumps({"items": items}))
