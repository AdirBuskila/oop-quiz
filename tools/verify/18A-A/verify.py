# -*- coding: utf-8 -*-
"""clang++ checks for 18A-A. Run: PYTHONUTF8=1 py tools/verify/18A-A/verify.py
Compiles the code exactly as transcribed in tools/gen/gen_18A-A.py. Exits 1 on the first disagreement with the key."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vlib import *

Q = load_gen("18A-A")
N = lambda n, i=0: code_of(Q[n], i, nums=True)

# Q1 snippet in a function
check("Q1 error lines", build("void t(){" + N(1) + "\n}", name="q01").get("lines"), [4])
# Q2, Q3
check("Q2 out", build(N(2), run=True, name="q02")["out"], "35")
check("Q3 out", build(N(3), run=True, name="q03")["out"], "321")
# Q4: line 5 error; b is a function declaration
check("Q4 error lines", build(N(4), name="q04")["lines"], [5])
r = build("#include <type_traits>\nclass X {};\nint main() { X a; X b(); static_assert(std::is_function<decltype(b)>::value, \"\"); X d = X(); }", name="q04b")
check("Q4 b is a function (compiles)", r["ok"], True)
# Q5
check("Q5 error lines", build(N(5), name="q05")["lines"], [14])
# Q6: substitute each option
base = code_of(Q[6])
res = {t: build(base.replace("____", t), name="q06")["ok"] for t in ["X", "X*", "const X *", "const X &"]}
check("Q6 which compile", res, {"X": False, "X*": False, "const X *": True, "const X &": False})
# Q7
base = N(7)
res = {t: build(base.replace("____", t), name="q07")["lines"] for t in ["int*", "const int *", "int * const", "const int * const"]}
check("Q7 error lines per type", res, {"int*": [], "const int *": [5], "int * const": [4], "const int * const": [4, 5]})
# Q8
cases = {
    "ctor X(int) only": "class X { public: X(int) {} };",
    "member operator=(int)": "class X { public: void operator=(int) {} };",
    "member void f(int) (not operator=)": "class X { public: void f(int) {} };",
    "free function f(int)": "class X {}; void f(int) {}",
    "free operator=(X&,int)": "class X {}; void operator=(X&, int) {}",
}
res = {k: build(v + "\nint main() { X x; x = 5; }", name="q08")["ok"] for k, v in cases.items()}
check("Q8 which compile", res, {"ctor X(int) only": False, "member operator=(int)": True, "member void f(int) (not operator=)": False,
                                "free function f(int)": False, "free operator=(X&,int)": False})
# Q9
cases = {
    "a member ++()": "class X { public: X& operator++() { return *this; } };",
    "b free ++() no params": "class X {}; X& operator++() { static X x; return x; }",
    "c member ++(int)": "class X { public: X operator++(int) { return *this; } };",
    "d free ++(X&)": "class X {}; X& operator++(X& x) { return x; }",
}
res = {k: build(v + "\nint main() { X x; x++; }", name="q09")["ok"] for k, v in cases.items()}
check("Q9 which compile", res, {"a member ++()": False, "b free ++() no params": False, "c member ++(int)": True, "d free ++(X&)": False})
# Q10: protected inheritance
pre = "class X { public: int f; };\nclass Y : protected X { public: int gy() { return f; } };\nclass Z : public Y { public: int gz() { return f; } };\n"
check("Q10 Y and derived reach f", build(pre + "int main() {}", name="q10")["ok"], True)
check("Q10 main cannot reach f", build(pre + "int main() { Y y; return y.f; }", name="q10b")["ok"], False)
check("Q10 X itself reaches f (it is public in X)", build(pre + "int main() { X x; return x.f; }", name="q10c")["ok"], True)
# Q11, Q12
check("Q11 out", build(N(11), run=True, name="q11")["out"], "1342")
pre = "class X { protected: int f; public: int gx() { return f; } };\nclass D : public X { public: int gd() { return f; } };\n"
check("Q12 X and derived reach f", build(pre + "int main() {}", name="q12")["ok"], True)
check("Q12 main cannot reach f", build(pre + "int main() { X x; return x.f; }", name="q12b")["ok"], False)
check("Q12 unrelated class cannot reach f", build(pre + "class U { public: int g(X& x) { return x.f; } };\nint main() {}", name="q12c")["ok"], False)
# Q15, Q16, Q18, Q21, Q23
check("Q15 out", build(N(15), run=True, name="q15")["out"], "2")
check("Q16 out", build(N(16), run=True, name="q16")["out"], "132")
check("Q18 out", build(N(18), run=True, name="q18")["out"], "2")
check("Q21 out", build(N(21), run=True, name="q21")["out"], "0")
check("Q23 out", build(N(23), run=True, name="q23")["out"], "121")
# Q17: substitute each option
base = N(17)
res = {}
for t in ["this()", "X::f()", "this->f()", "x.f()"]:
    r = build(base.replace("______", t), run=True, timeout=5, name="q17")
    res[t] = r["out"] if r["ok"] and r["rc"] == 0 else ("no-compile" if not r["ok"] else "crash/timeout")
check("Q17 per option", res, {"this()": "no-compile", "X::f()": "12", "this->f()": "crash/timeout", "x.f()": "no-compile"})
# Q19 (held): the real error lines
check("Q19 error lines (no option matches)", build(N(19), name="q19")["lines"], [8, 11, 12])
# Q20: remove each field
base = code_of(Q[20])
res = {}
for field in ["int a;", "int *b;", "int &c;", None]:
    s = base.replace("    " + field + "\n", "") if field else base
    res[field] = build(s, name="q20")["ok"]
check("Q20 which removal compiles", res, {"int a;": False, "int *b;": False, "int &c;": True, None: False})
# Q22: matching return statement per option
base = N(22)
bodies = {"int": "{ return 0; }", "void": "{ }", "X": "{ return x; }", "std::ostream&": "{ return os; }"}
res = {t: build(base.replace("_____", t).replace("{...}", b), name="q22")["ok"] for t, b in bodies.items()}
check("Q22 which compile", res, {"int": False, "void": False, "X": False, "std::ostream&": True})
# Q24, Q25
check("Q24 error lines", build(N(24), name="q24")["lines"], [7, 8])
check("Q25 error lines", build(N(25), name="q25")["lines"], [7])
print("ALL OK 18A-A")
