# -*- coding: utf-8 -*-
"""clang++ checks for 19A-A. Run: PYTHONUTF8=1 py tools/verify/19A-A/verify.py
Compiles the code exactly as transcribed in tools/gen/gen_19A-A.py (plus small demo programs for the concept questions).
Exits 1 on the first disagreement with the key."""
import sys, pathlib, re, subprocess
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vlib import *

Q = load_gen("19A-A")
N = lambda n, i=0: code_of(Q[n], i, nums=True)
C = lambda n, i=0: code_of(Q[n], i)
sq = lambda s: re.sub(r"\s+", " ", s).strip()

# Q1: as printed (no ';' on line 5) it is an error on line 5; with the typo fixed, none
check("Q1 printed code: error only on line 5 (missing ;)", build("void t(){" + N(1) + "\n}", name="q01p")["lines"], [5])
check("Q1 with ';' added: no error", build("void t(){" + N(1) + ";\n}", name="q01b")["lines"], [])
check("Q2 out", build(C(2), run=True, name="q02")["out"], "35")
r = build(C(3), name="q03")
check("Q3 compile error (ambiguous)", (r["ok"], "ambiguous" in r["err"]), (False, True))
check("Q4 out", sq(build(C(4), run=True, name="q04")["out"]), "15")
# Q5: friend direction
src = "class B { friend class A; int b; public: B():b(1){} };\nclass A { int a; public: A():a(2){} int rb(B& x){ return x.b; } };\n"
check("Q5 A reads B private", build(src + "int main(){}", name="q05a")["ok"], True)
check("Q5 friendship is one-way (B member reading A.a fails)",
      build("class A { int a; };\nclass B { friend class A; int b; public: int h(A& x){ return x.a; } };\nint main(){}", name="q05c")["ok"], False)
# Q6
src = '#include <iostream>\nclass A { public: ~A() { std::cout << "D"; } };\nint main() { A *a = new A; std::cout << "1"; delete a; std::cout << "2"; { A *b = new A; } std::cout << "3"; }'
check("Q6 destructor only at delete (the second pointer leaks)", build(src, run=True, name="q06")["out"], "1D23")
check("Q7 out", build(C(7), run=True, name="q07")["out"], "231114342")
# Q8
base = "class A{};\n"
res = {
    "ctor": build(base + "int main(){ A a; }", name="q08a")["ok"],
    "assign": build(base + "int main(){ A a, b; a = b; }", name="q08b")["ok"],
    "==": build(base + "int main(){ A a, b; bool r = (a == b); }", name="q08c")["ok"],
    "dtor": build(base + "int main(){ A* a = new A; a->~A(); }", name="q08d")["ok"],
}
check("Q8 only == missing", res, {"ctor": True, "assign": True, "==": False, "dtor": True})
# Q9: count copy ctor calls (copy elision off, so the return copy is visible)
src = '#include <iostream>\nstruct A { A(){} A(const A&){ std::cout << "C"; } A& operator=(const A&){ std::cout << "="; return *this; } };\n'
src += 'A mk(){ A a; return a; }\nvoid take(A){}\nint main(){ A a; take(a); std::cout << "|"; A b = mk(); std::cout << "|"; b = a; }\n'
f = TMP / "q09.cpp"
f.write_text(src, encoding="utf-8")
subprocess.run([CXX, "-std=c++14", "-fno-elide-constructors", "-Wno-everything", str(f), "-o", str(TMP / "q09b.exe")], check=True)
out = subprocess.run([str(TMP / "q09b.exe")], capture_output=True, text=True).stdout
check("Q9 copy ctor on pass/return, only operator= on assignment", out, "C|CC|=")
# Q10
base = C(10)
res = {t: build(base.replace("_____", t), name="q10")["ok"] for t in ["this->K", "K+k", "new int(*k+K)", "k"]}
check("Q10 which compile", res, {"this->K": False, "K+k": False, "new int(*k+K)": True, "k": False})
# Q11
res = {
    "public member from main": build("class X { public: const int c; X() : c(1) {} };\nint main() { X x; x.c = 2; }", name="q11a")["ok"],
    "from a member function": build("class X { const int c; public: X() : c(1) {} void f() { c = 2; } };", name="q11b")["ok"],
    "from ctor body": build("class X { const int c; public: X() { c = 1; } };", name="q11c")["ok"],
    "init list (the only legal way)": build("class X { const int c; public: X() : c(1) {} };", name="q11d")["ok"],
}
check("Q11 assignment never allowed", res, {"public member from main": False, "from a member function": False, "from ctor body": False, "init list (the only legal way)": True})
# Q12
res = {
    "const": build("class X { const int c; public: X() {} };", name="q12a")["ok"],
    "reference": build("class X { int &r; public: X() {} };", name="q12b")["ok"],
    "base without default ctor": build("class B { public: B(int) {} };\nclass D : public B { public: D() {} };", name="q12c")["ok"],
    "all OK with init list": build("class B { public: B(int) {} };\nint g = 0;\nclass D : public B { const int c; int &r; public: D() : B(1), c(2), r(g) {} };", name="q12d")["ok"],
}
check("Q12 all three need an init list", res, {"const": False, "reference": False, "base without default ctor": False, "all OK with init list": True})
check("Q13 out", build(C(13), run=True, name="q13")["out"], "acbBCA")
check("Q14 out", build(C(14), run=True, name="q14")["out"], "43")
check("Q15 error lines", build(N(15), name="q15")["lines"], [20, 22])
check("Q16 out", sq(build(C(16), run=True, name="q16")["out"]), "A empty B int A int destroy A destroy B destroy A")
check("Q17 out", build(C(17), run=True, name="q17")["out"], "A")
check("Q18 out", build(C(18), run=True, name="q18")["out"], "DDB")
r = build(C(19), run=True, name="q19")
print("   Q19 run rc:", r["rc"])
check("Q19 double delete aborts (non-zero exit)", r["rc"] not in (0, None), True)
# Q20
src = "class C { public: int a; protected: int b; private: int c; friend int F(C&); friend class X; };\nint F(C& x) { return x.a + x.b + x.c; }\nclass X { public: int g(C& x) { return x.a + x.b + x.c; } };\n"
check("Q20 friend function and friend class reach all 3", build(src + "int main(){}", name="q20a")["ok"], True)
src = "class C { public: int a; protected: int b; private: int c; };\nclass D : public C { public: int g() { return a + b; } };\n"
check("Q20 derived reaches public+protected", build(src + "int main(){}", name="q20b")["ok"], True)
check("Q20 derived cannot reach private", build(src.replace("a + b", "a + b + c") + "int main(){}", name="q20c")["ok"], False)
# Q21
res = {
    "a C& op=(const C&)": build("struct C { C& operator=(const C&) { return *this; } };\nint main(){ C a,b,c; (a = b) = c; a = b = c; }", name="q21a")["ok"],
    "b const C& op=(const C&)": build("struct C { const C& operator=(const C&) { return *this; } };\nint main(){ C a,b,c; (a = b) = c; }", name="q21b")["ok"],
    "c const C& op=(C&)": build("struct C { const C& operator=(C&) { return *this; } };\nint main(){ C a; const C k; a = k; }", name="q21c")["ok"],
    "d const member": build("struct C { int v; const C& operator=(const C& o) const { v = o.v; return *this; } };", name="q21d")["ok"],
}
check("Q21 only a gives int-like chaining", res, {"a C& op=(const C&)": True, "b const C& op=(const C&)": False, "c const C& op=(C&)": False, "d const member": False})
check("Q22 error lines", build(N(22), name="q22")["lines"], [5])
# Q23
src = "template<typename T> void f();\ntemplate<typename T> class X { friend void f<T>(); int priv; };\ntemplate<typename T> void f() { X<T> x; (void)x.priv; }\n"
check("Q23 f<double> reads X<double> private", build(src + "int main(){ f<double>(); }", name="q23a")["ok"], True)
src = "template<typename T> void f();\ntemplate<typename T> class X { friend void f<T>(); int priv; };\ntemplate<typename T> void f() { X<double> x; (void)x.priv; }\n"
check("Q23 f<int> cannot read X<double> private", build(src + "int main(){ f<int>(); }", name="q23b")["ok"], False)
# Q24
base = "class X {}; class Y : public X {};\ntemplate<typename T> class A {};\n"
check("Q24 A<X> = A<Y> fails", build(base + "int main(){ A<X> x; A<Y> y; x = y; }", name="q24a")["ok"], False)
check("Q24 A<Y> = A<X> fails", build(base + "int main(){ A<X> x; A<Y> y; y = x; }", name="q24b")["ok"], False)
# Q25
pre = "#include <vector>\n"
check("Q25 ++it, *it, it==it2 compile", build(pre + "int main(){ std::vector<int> v(2); auto it = v.begin(); ++it; int a = *it; bool b = (it == v.begin()); }", name="q25a")["ok"], True)
check("Q25 it.erase() does not", build(pre + "int main(){ std::vector<int> v(2); auto it = v.begin(); it.erase(); }", name="q25b")["ok"], False)
print("ALL OK 19A-A")
