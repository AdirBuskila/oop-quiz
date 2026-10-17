# -*- coding: utf-8 -*-
"""clang++ checks for 18A-B. Run: PYTHONUTF8=1 py tools/verify/18A-B/verify.py
Compiles the code exactly as transcribed in tools/gen/gen_18A-B.py. Exits 1 on the first disagreement with the key."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vlib import *

Q = load_gen("18A-B")
N = lambda n, i=0: code_of(Q[n], i, nums=True)
C = lambda n, i=0: code_of(Q[n], i)

# Q1: each return type with a matching return statement
base = C(1)
res = {}
for t in ["int", "int*", "int&", "T"]:
    res[t] = build(base.replace("___ f()", t + " f()"), name="q01")["ok"]
check("Q1 which compile", res, {"int": False, "int*": False, "int&": True, "T": False})
check("Q2 out", build(C(2), run=True, name="q02")["out"], "3")
check("Q3 out", build(C(3), run=True, name="q03")["out"], "123")
check("Q4 error lines", build(N(4), name="q04")["lines"], [4, 5])
check("Q5 error lines", build(N(5), name="q05")["lines"], [4])
# Q6
base = C(6)
res = {t: build(base.replace("_____", t), run=True, name="q06") for t in ["new X", "X()", "this", "*this"]}
check("Q6 per option", {t: (r["out"] if r["ok"] else "no-compile") for t, r in res.items()},
      {"new X": "no-compile", "X()": "no-compile", "this": "no-compile", "*this": "1"})
# Q7
cases = {
    "a member <<(int)": "class X { public: void operator<<(int) {} };",
    "b member <<(int,X)": "class X { public: void operator<<(int, X) {} };",
    "c free <<(int,X)": "class X {}; void operator<<(int, X) {}",
}
res = {k: build(v + "\nint main() { X x; 2 << x; }", name="q07")["ok"] for k, v in cases.items()}
check("Q7 which compile", res, {"a member <<(int)": False, "b member <<(int,X)": False, "c free <<(int,X)": True})
# Q8
cases = {
    "a ctor X(int)": "class X { public: X(int) {} };",
    "b member operator=": "class X { public: X() {} void operator=(int) {} };",
    "c free operator=": "class X { public: X() {} };  void operator=(X&, int) {}",
}
res = {k: build(v + "\nint main() { X x = 5; }", name="q08")["ok"] for k, v in cases.items()}
check("Q8 which compile", res, {"a ctor X(int)": True, "b member operator=": False, "c free operator=": False})
# Q9
cases = {
    "a ctor X(int)": "class X { public: X() {} X(int) {} };",
    "b member operator()(int)": "class X { public: void operator()(int) {} };",
    "c free function f(int)": "class X {}; void f(int) {}",
}
res = {k: build(v + "\nint main() { X x; x(5); }", name="q09")["ok"] for k, v in cases.items()}
check("Q9 which compile", res, {"a ctor X(int)": False, "b member operator()(int)": True, "c free function f(int)": False})
# Q10, Q11
check("Q10 public field reachable from main", build("class X { public: int f; };\nint main() { X x; return x.f; }", name="q10")["ok"], True)
pre = "class X { private: int f; public: int g() { return f; } };\n"
check("Q11 X reaches f", build(pre + "int main() {}", name="q11")["ok"], True)
check("Q11 main cannot", build(pre + "int main() { X x; return x.f; }", name="q11b")["ok"], False)
check("Q11 derived cannot", build(pre + "class D : public X { public: int h() { return f; } };", name="q11c")["ok"], False)
check("Q13 out", build(C(13), run=True, name="q13")["out"], "1")
check("Q14 out", build(C(14), run=True, name="q14")["out"], "13")
# Q16
pre = C(16)
check("Q16 X abstract", build(pre + "\nint main() { X x; }", name="q16a")["ok"], False)
check("Q16 Y ok", build(pre + "\nint main() { Y y; }", name="q16b")["ok"], True)
check("Q16 Z ok", build(pre + "\nint main() { Z z; }", name="q16c")["ok"], True)
check("Q17 error lines", build(N(17), name="q17")["lines"], [4, 5])
check("Q18 out", build(C(18), run=True, name="q18")["out"], "0912")
check("Q19 error lines", build(N(19), name="q19")["lines"], [3])
check("Q21 out", build(C(21), run=True, name="q21")["out"], "1")
# Q22
cases = {
    "a X::operator+(Y)": "class Y {}; class X { public: void operator+(Y) {} };",
    "b Y::operator+(X)": "class X {}; class Y { public: void operator+(X) {} };",
    "c X::operator+(X,Y)": "class Y {}; class X { public: void operator+(X, Y) {} };",
    "d Y::operator+(X,Y)": "class X {}; class Y { public: void operator+(X, Y) {} };",
}
res = {k: build(v + "\nint main() { X x; Y y; x + y; }", name="q22")["ok"] for k, v in cases.items()}
check("Q22 which compile", res, {"a X::operator+(Y)": True, "b Y::operator+(X)": False, "c X::operator+(X,Y)": False, "d Y::operator+(X,Y)": False})
# Q23
base = "#include <iostream>\nclass X{ public: int p; };\n"
main = "\nint main() { X x; std::cout << x; }"
cases = {
    "a member function": "class X { public: std::ostream& operator<<(std::ostream& o) { return o; } };",
    "b free non-friend": "class X {}; std::ostream& operator<<(std::ostream& o, const X&) { return o; }",
    "c free friend": "class X { friend std::ostream& operator<<(std::ostream&, const X&); }; std::ostream& operator<<(std::ostream& o, const X&) { return o; }",
}
res = {k: build("#include <iostream>\n" + v + main, name="q23")["ok"] for k, v in cases.items()}
check("Q23 which compile (b and c both do; key is b)", res, {"a member function": False, "b free non-friend": True, "c free friend": True})
check("Q24 out", build(C(24), run=True, name="q24")["out"], "121")
check("Q25 error lines", build(N(25), name="q25")["lines"], [8])
print("ALL OK 18A-B")
