"""23S-A clang++ verification. Run: PYTHONUTF8=1 py tools/verify/23S-A/check.py
Reads tools/raw/23S-A.json (the shipped code). The prefix is only <iostream> + using namespace std (the exam's stated
assumption): with <vector> included, Q3's own `struct vector` would clash with std::vector. ASCII output only."""
import sys, json, pathlib, re
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

CODE = "23S-A"
RAW = pathlib.Path(__file__).resolve().parents[2] / "raw" / (CODE + ".json")
PRE = "#include <iostream>\nusing namespace std;\n"
NPRE = PRE.count("\n")
data = json.loads(RAW.read_text(encoding="utf-8"))


def code_of(text):
    m = re.search(r"```cpp\n(.*?)\n```", text, re.S)
    return m.group(1) if m else None


def norm(s):
    return " ".join(s.replace("’", "'").lower().split())


for q in data["questions"]:
    c = code_of(q["question"])
    n = q["num"]
    if c is None:
        continue
    if n == 8:
        continue
    if "שגיאות קומפילציה" in q["question"].split("\n")[0]:
        for std in ("c++14", "c++17"):
            lines = sorted(err_lines(PRE + c, std))
            rel = [l - NPRE for l in lines]
            print("Q%d [%s] error lines=%s -> %d" % (n, std, rel, len(rel)))
            if std == "c++17":
                for r in rel:
                    print("     %d: %s" % (r, c.split("\n")[r - 1].strip()))
        # link step for Q4
        if n == 4:
            print("   Q4 full build:", run(PRE + c)[0], [l.strip()[-80:] for l in run(PRE + c)[1].splitlines() if "undefined" in l][:2])
        continue
    st, out = run(PRE + c)
    if st != "OK":
        print("Q%d COMPILE_ERROR: %s" % (n, [l.strip()[-110:] for l in out.splitlines() if "error" in l][:3]))
        continue
    match = [o["id"] for o in q["options"] if norm(o["value"]) == norm(out)]
    print("Q%d OK output=%r matches=%s" % (n, out, match))

# Q2: which declarations are copy constructors (compile each, copy-init a Point from a Point)
for name, decl in (("by value", "Point(Point const src) {}"), ("by pointer", "Point(Point const *src) {}"), ("by ref", "Point(Point const &src) {}")):
    ok = compiles("class Point { public: Point(){} %s };\nint main(){ Point a; Point b(a); }" % decl)
    ok_decl = compiles("class Point { public: %s };\nint main(){}" % decl)
    print("Q2 %-10s declaration compiles=%s ; usable as copy ctor (Point b(a)) =%s" % (name, ok_decl, ok))
# Q7: private inheritance
base = "class B { public: int pu; protected: int pr; private: int pv; };\nclass D : private B { void f() { %s } };\nint main(){}"
print("Q7 derived reaches pu/pr/not pv:", [compiles(base % s) for s in ("pu=1;", "pr=1;", "pv=1;")],
      "; private inheritance compiles:", compiles("class B { public: int pu; };\nclass D : private B {};\nint main(){}"),
      "; outside access to pu fails:", not compiles("class B { public: int pu; };\nclass D : private B {};\nint main(){ D d; d.pu = 1; }"))
# Q8: operator% as a member
for k, args in enumerate(("", "int", "int, int")):
    print("Q8 operator%% with %d args compiles=%s" % (k, compiles("class A { public: A operator%%(%s); };\nint main(){}" % args)))
