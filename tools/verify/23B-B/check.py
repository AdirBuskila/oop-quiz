"""23B-B clang++ verification. Run: PYTHONUTF8=1 py tools/verify/23B-B/check.py
Reads tools/raw/23B-B.json (the shipped code), runs every program, compares output with the options, and for
"how many lines have errors" questions lists the erroring source lines. ASCII output only."""
import sys, json, pathlib, re
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

CODE = "23B-B"
RAW = pathlib.Path(__file__).resolve().parents[2] / "raw" / (CODE + ".json")
PRE = "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n"
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
    if q["question"].startswith("בכמה שורות"):
        src = PRE + c
        lines = sorted(err_lines(src))
        rel = [l - NPRE for l in lines]
        print("Q%d error lines=%s -> %d" % (n, rel, len(rel)))
        for r in rel:
            print("     %d: %s" % (r, c.split("\n")[r - 1].strip()))
        continue
    if n == 6:
        print("Q6 (rule) members returning non-const reference/pointer to private data: g, h -> 2")
        continue
    st, out = run(PRE + c)
    if st != "OK":
        print("Q%d COMPILE_ERROR: %s" % (n, [l.strip()[-110:] for l in out.splitlines() if "error" in l][:3]))
        continue
    match = [o["id"] for o in q["options"] if norm(o["value"]) == norm(out)]
    print("Q%d OK output=%r matches=%s" % (n, out, match))

# Q7: friend statements
T = "class B { public: void f(); void g(); };\nint main(){}\n"
print("Q7 I  (friend of one member function of B):", compiles("class B; class A { friend void B::f(); };\n") is False,
      "(forward-declared B cannot name members; B defined first:)",
      compiles("class A; class B { public: void f(); void g(); };\nclass A { int p; friend void B::f(); };\nvoid B::f(){ A a; a.p = 1; }\nint main(){}"))
print("Q7 I' g() must NOT access:",
      not compiles("class A; class B { public: void f(); void g(); };\nclass A { int p; friend void B::f(); };\nvoid B::g(){ A a; a.p = 1; }\nint main(){}"))
print("Q7 III both friends:",
      compiles("class B { public: void f(); };\nclass A { int p; friend void f(); friend void B::f(); };\nvoid f(){ A a; a.p = 1; }\nvoid B::f(){ A a; a.p = 2; }\nint main(){}"))
# Q14: struct facts
print("Q14 struct with private field compiles:", compiles("struct S { private: int x; public: S():x(0){} };\nint main(){ S s; }"))
print("Q14 struct with member function compiles:", compiles("struct S { int x; int f(){ return x; } };\nint main(){ S s; s.x=1; s.f(); }"))
print("Q14 struct variable without the word struct compiles:", compiles("struct S { int x; };\nint main(){ S s; s.x = 1; }"))
# Q15: private ctors
print("Q15 class with only private ctors compiles (A false):", compiles("class C { C(){} };\nint main(){}"))
print("Q15 static factory can still create objects (B false):", compiles("class C { C(){} public: static C make(){ return C(); } };\nint main(){ C c = C::make(); }"))
print("Q15 direct creation from main fails:", not compiles("class C { C(){} };\nint main(){ C c; }"))
