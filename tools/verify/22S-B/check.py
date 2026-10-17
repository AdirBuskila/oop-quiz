"""22S-B clang++ verification. Run: PYTHONUTF8=1 py tools/verify/22S-B/check.py
Reads tools/raw/22S-B.json (so the checked code is the shipped code), compiles/runs every code question and
compares the output with each option (whitespace-normalised). Prints ASCII only."""
import sys, json, pathlib, re
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

CODE = "22S-B"
RAW = pathlib.Path(__file__).resolve().parents[2] / "raw" / (CODE + ".json")
PRE = "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n"
data = json.loads(RAW.read_text(encoding="utf-8"))


def code_of(text):
    m = re.search(r"```cpp\n(.*?)\n```", text, re.S)
    return m.group(1) if m else None


def norm(s):
    return " ".join(s.replace("’", "'").lower().split())


for q in data["questions"]:
    c = code_of(q["question"])
    if c is None:
        continue
    if q["num"] == 14:
        for o in q["options"]:
            body = code_of(o["value"])
            ok = compiles(PRE + c + "\n" + body + "\nint main(){}")
            print("Q14 option %s compiles=%s" % (o["id"], ok))
        continue
    st, out = run(PRE + c)
    if st != "OK":
        print("Q%d COMPILE_ERROR: %s" % (q["num"], [l.strip()[-110:] for l in out.splitlines() if "error" in l][:3]))
        print("   options claiming compile error:", [o["id"] for o in q["options"] if "קומפילציה" in o["value"] or "מתקמפלת" in o["value"]])
        continue
    match = [o["id"] for o in q["options"] if norm(o["value"]) == norm(out)]
    print("Q%d OK output=%r matches=%s" % (q["num"], out, match))
