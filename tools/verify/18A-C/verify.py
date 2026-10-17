# -*- coding: utf-8 -*-
"""clang++ checks for 18A-C. Run: PYTHONUTF8=1 py tools/verify/18A-C/verify.py
Compiles the code exactly as transcribed in tools/gen/gen_18A-C.py. Exits 1 on the first disagreement with the key."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vlib import *

Q = load_gen("18A-C")
N = lambda n, i=0: code_of(Q[n], i, nums=True)
C = lambda n, i=0: code_of(Q[n], i)

base = C(1)
res = {t: build(base.replace("___ f()", t + " f()"), name="q01")["ok"] for t in ["int", "int*", "int&", "T"]}
check("Q1 which compile", res, {"int": False, "int*": False, "int&": True, "T": False})
r = build(C(2), name="q02")
check("Q2 compile error (X passed as X*)", r["ok"], False)
check("Q2 with g(&x) it would print 5 (the student's reading)", build(C(2).replace("g(x);", "g(&x);"), run=True, name="q02b")["out"], "5")
check("Q3 out", build(C(3), run=True, name="q03")["out"], "12")
check("Q4 error lines", build(N(4), name="q04")["lines"], [4, 5])
check("Q5 error lines", build(N(5), name="q05")["lines"], [4])
base = C(6)
res = {t: build(base.replace("_____", t), run=True, name="q06") for t in ["new X", "X()", "this", "*this"]}
check("Q6 per option", {t: (r["out"] if r["ok"] else "no-compile") for t, r in res.items()},
      {"new X": "no-compile", "X()": "no-compile", "this": "no-compile", "*this": "1"})
cases = {
    "a member +(int)": "class X { public: void operator+(int) {} };",
    "b member +(int,X)": "class X { public: void operator+(int, X) {} };",
    "c free +(int,X)": "class X {}; void operator+(int, X) {}",
}
res = {k: build(v + "\nint main() { X x; 2 + x; }", name="q07")["ok"] for k, v in cases.items()}
check("Q7 which compile", res, {"a member +(int)": False, "b member +(int,X)": False, "c free +(int,X)": True})
cases = {
    "ctor X(int)": "class X { public: X(int) {} };",
    "member operator=": "class X { public: X() {} void operator=(int) {} };",
    "free operator=": "class X { public: X() {} }; void operator=(X&, int) {}",
    "as is": "class X {};",
}
res = {k: build(v + "\nint main() { X x(5); }", name="q08")["ok"] for k, v in cases.items()}
check("Q8 which compile", res, {"ctor X(int)": True, "member operator=": False, "free operator=": False, "as is": False})
check("Q9 compiles as printed", build(C(9), name="q09")["ok"], True)
check("Q10 public field reachable from main", build("class X { public: int f; };\nint main() { X x; return x.f; }", name="q10")["ok"], True)
pre = C(11) + "\n"
check("Q11 main cannot reach the default-private f", build(pre + "int main() { X x; return x.f; }", name="q11a")["ok"], False)
check("Q11 derived cannot", build(pre + "class D : public X { public: int h() { return f; } };", name="q11b")["ok"], False)
check("Q11 X itself can", build("class X { int f; public: int g() { return f; } };", name="q11c")["ok"], True)
check("Q13 out", build(C(13), run=True, name="q13")["out"], "2")
check("Q14 out", build(C(14), run=True, name="q14")["out"], "13")
pre = C(16)
check("Q16 X abstract", build(pre + "\nint main() { X x; }", name="q16a")["ok"], False)
check("Q16 Y ok", build(pre + "\nint main() { Y y; }", name="q16b")["ok"], True)
check("Q16 Z ok", build(pre + "\nint main() { Z z; }", name="q16c")["ok"], True)
# Q17: each of lines 3-6 on its own inside main
lines = N(17).split("\n")
tpl = lines[0]
res = {}
for ln in (3, 4, 5, 6):
    src = tpl + "\nvoid main() {\n" + lines[ln - 1] + "\n}\n"
    res[ln] = build(src, name="q17")["ok"]
check("Q17 which lines compile on their own", res, {3: False, 4: False, 5: False, 6: True})
check("Q18 out", build(C(18), run=True, name="q18")["out"], "0129")
check("Q19 error lines", build(N(19), name="q19")["lines"], [3])
# Q21
cases = {
    "a X derives from Y": "class Y {}; class X : public Y {};",
    "b Y derives from X": "class X {}; class Y : public X {};",
    "c X has a field of type Y": "class Y {}; class X { Y f; };",
    "d Y has a field of type X": "class X {}; class Y { X f; };",
}
res = {k: build(v + "\nint main() { Y y; X &x = y; }", name="q21")["ok"] for k, v in cases.items()}
check("Q21 which compile", res, {"a X derives from Y": False, "b Y derives from X": True, "c X has a field of type Y": False, "d Y has a field of type X": False})
cases = {
    "a member X::+(Y)": "class Y {}; class X { public: void operator+(Y) {} };",
    "b Y::+(X)": "class X {}; class Y { public: void operator+(X) {} };",
    "c X::+(X,Y)": "class Y {}; class X { public: void operator+(X, Y) {} };",
    "d Y::+(X,Y)": "class X {}; class Y { public: void operator+(X, Y) {} };",
}
res = {k: build(v + "\nint main() { X x; Y y; x + y; }", name="q22")["ok"] for k, v in cases.items()}
check("Q22 which compile", res, {"a member X::+(Y)": True, "b Y::+(X)": False, "c X::+(X,Y)": False, "d Y::+(X,Y)": False})
cases = {
    "a member function": "class X { public: std::istream& operator>>(std::istream& i) { return i; } };",
    "b free non-friend": "class X {}; std::istream& operator>>(std::istream& i, X&) { return i; }",
    "c free friend": "class X { friend std::istream& operator>>(std::istream&, X&); }; std::istream& operator>>(std::istream& i, X&) { return i; }",
}
res = {k: build("#include <iostream>\n" + v + "\nint main() { X x; std::cin >> x; }", name="q23")["ok"] for k, v in cases.items()}
check("Q23 which compile (b and c both do; key is b by analogy)", res, {"a member function": False, "b free non-friend": True, "c free friend": True})
check("Q24 out", build(C(24), run=True, name="q24")["out"], "123")
check("Q25 error lines", build(N(25), name="q25")["lines"], [8])
print("ALL OK 18A-C")
