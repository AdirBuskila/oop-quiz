"""23B-A clang++ verification of the graded-copy key. Run: PYTHONUTF8=1 py tools/verify/23B-A/check.py
Reads tools/raw/23B-A.json (the shipped code). Q3's second `f(a, b, c)++` is printed without `;` (the exam says to ignore
missing semicolons), so the harness adds it. ASCII output only."""
import sys, json, pathlib, re
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

CODE = "23B-A"
RAW = pathlib.Path(__file__).resolve().parents[2] / "raw" / (CODE + ".json")
PRE = "#include <iostream>\n#include <vector>\nusing namespace std;\n"
NPRE = PRE.count("\n")
data = json.loads(RAW.read_text(encoding="utf-8"))


def blocks(text):
    return re.findall(r"```cpp\n(.*?)\n```", text, re.S)


def norm(s):
    return " ".join(s.replace("’", "'").lower().split())


for q in data["questions"]:
    n = q["num"]
    bl = blocks(q["question"])
    if not bl or n in (5, 13):
        continue
    c = bl[0].replace("f(a, b, c)++\n", "f(a, b, c)++;\n")
    key = q.get("correctId")
    if q["question"].startswith("בכמה שורות"):
        lines = sorted(err_lines(PRE + c))
        rel = [l - NPRE for l in lines]
        print("Q%d error lines=%s -> %d (key %s)" % (n, rel, len(rel), key))
        for r in rel:
            print("     %d: %s" % (r, c.split("\n")[r - 1].strip()))
        continue
    st, out = run(PRE + c)
    if st != "OK":
        errs = [l.strip()[-100:] for l in out.splitlines() if "error" in l][:3]
        print("Q%d COMPILE_ERROR %s (key %s: %s)" % (n, errs, key, [o["value"] for o in q["options"] if o["id"] == key]))
        continue
    match = [o["id"] for o in q["options"] if norm(o["value"]) == norm(out)]
    print("Q%d OK output=%r matches=%s (key %s)" % (n, out, match, key))

# Q13: the three equivalences, compiled with a class that has global operator<< / operator>>
T = ("struct A { int v; };\nostream& operator<<(ostream& o, const A& a){ return o << a.v << ';'; }\n"
     "istream& operator>>(istream& i, A& a){ return i >> a.v; }\n")
print("Q13 I  cout<<a1 vs operator<<(cout,a1) both compile:", compiles(PRE + T + "int main(){ A a1{1}; cout << a1; operator<<(cout,a1); }"))
print("Q13 II operator>>(a1,cin) (wrong argument order) fails:", not compiles(PRE + T + "int main(){ A a1{1}; cin >> a1; operator>>(a1,cin); }"))
s, o = run(PRE + T + "int main(){ A a1{1}, a2{2}; cout<<a1<<a2; cout << ' '; operator<<(operator<<(cout, a1), a2); }")
print("Q13 III same output for both forms:", s, repr(o), o.split(" ")[0] == o.split(" ")[1].strip() if " " in o else None)
