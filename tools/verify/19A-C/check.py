"""19A-C (27/05/2019) clang++ verification of every code question. Run: PYTHONUTF8=1 py tools/verify/19A-C/check.py
Compares each observed result with the official key (yellow highlight). Q6 has no highlight: all four options are tested."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

R = {}
def rec(n, observed, expected, what=""):
    R[n] = (observed, expected)
    print("Q%02d %s observed=%r expected=%r %s" % (n, "OK  " if observed == expected else "DIFF", observed, expected, what))

INC = "#include <iostream>\n"
# 1: ++x with a member / free prefix operator++
m = {
 "a": "struct X { X& operator++() { return *this; } };",
 "b": "struct X {}; X& operator++() { static X t; return t; }",
 "c": "struct X { X& operator++(int) { return *this; } };",
 "d": "struct X {}; X& operator++(X& x) { return x; }",
}
res = {k: compiles(v + "\nint main(){ X x; ++x; }") for k, v in m.items()}
rec(1, "".join(k for k, v in res.items() if v), "ad", res)
print("    Q01: official key is a only; d (free operator++ with one parameter) also compiles")
# 2: int n = x;  -> conversion function
res = {
 "a_ctor_in_X": compiles("struct X { X(int) {} X() {} };\nint main(){ X x; int n = x; }"),
 "b_conv_operator": compiles("struct X { operator int() const { return 0; } };\nint main(){ X x; int n = x; }"),
 "c_member_function": compiles("struct X { int toInt() { return 0; } };\nint main(){ X x; int n = x; }"),
 "d_function_in_int": compiles("struct X {};\nint main(){ X x; int n = x; }"),
}
rec(2, "".join(k[0] for k, v in res.items() if v), "b", res)
# 3
src = "class C {\npublic:\nint x;\nvoid f() {\nx = 1;\ny = 2; // L1\n}\nprivate:\nint y;\n};\nvoid g() {\nC c;\nc.x = 1;\nc.y = 2; // L2\n}\nint main(){}"
t = tagged_errors(src)
rec(3, "g" if t == [2] else str(t), "g", t)
# 4
res = {k: compiles("#include <type_traits>\nclass A { void f() const { static_assert(std::is_same<decltype(this), %s>::value, \"\"); } };\nint main(){}" % k)
       for k in ("A", "A*", "A&", "const A*")}
rec(4, [k for k, v in res.items() if v], ["const A*"], res)
# 5
src = "class A { public: int I;};\nclass B : protected A { private: int J;};\nint main () {\n    A t; // L4\n    B tt; // L5\n    t.I = 3; // L6\n    tt.I = 3; // L7\n}"
rec(5, tagged_errors(src), [7])
# 6: no highlight: try all options of the blank
opts = {"a": "new X", "b": "X()", "c": "this", "d": "*this"}
res6 = {}
for k, v in opts.items():
    s, o = run(INC + "class X {\npublic:\nX& f() {\nreturn %s;\n}\n};\nvoid main() {\nX x;\nstd::cout << (&x == x.f());\n}" % v)
    res6[k] = o if s == "OK" else "ERR"
rec(6, sorted(res6.values()), ["ERR"] * 4, res6)
# 6 with the obvious repair (&x == &x.f()) for the record
s, o = run(INC + "class X {\npublic:\nX& f() {\nreturn *this;\n}\n};\nvoid main() {\nX x;\nstd::cout << (&x == &x.f());\n}")
print("    Q06 repaired variant `&x == &x.f()` with `*this`:", s, o)
# 7
s, o = run(INC + "template<int N> class X {\npublic:\nX() { ++d; }\nstatic int d;\n};\ntemplate<int N> int X<N>::d = 0;\nvoid main() {\nX<0> a, b;\nX<1> c;\nstd::cout << a.d << b.d << c.d;\n}")
rec(7, o, "221")
# 8
n1 = compiles("#include <iostream>\nstruct X { std::istream& operator>>(std::istream& o) { return o; } };\nint main(){ X x; std::cin >> x; }")
n2 = compiles("#include <iostream>\nstruct X { int v=0; };\nstd::istream& operator>>(std::istream& i, X& x) { return i >> x.v; }\nint main(){ X x; std::cin >> x; }")
rec(8, "c" if (not n1) and n2 else "?", "c", dict(member_form=n1, free_nonfriend=n2))
# 9
p1 = compiles("class X { private: int f; };\nint main(){ X x; x.f = 1; }")
p2 = compiles("class X { private: int f; public: void g() { f = 1; } };\nint main(){}")
p3 = compiles("class X { private: int f; };\nclass D : public X { void g() { f = 1; } };\nint main(){}")
rec(9, "b" if (not p1) and p2 and (not p3) else "?", "b", dict(outside=p1, inside=p2, derived=p3))
# 10
E = "class A { public: int x; };\nclass B : public virtual A {};\nclass C : public virtual A {};\nclass D : public A {};\nclass E : public B, public C, public D {};\n"
s, o = run(INC + E + "int main(){ E e; int* p[3] = {&e.B::x, &e.C::x, &e.D::x}; int d=0; for(int i=0;i<3;i++){bool n=true; for(int j=0;j<i;j++) if(p[i]==p[j]) n=false; d+=n;} std::cout<<d; }")
rec(10, o, "2")
# 11: X& x = y compiles => Y derives from X
q = {
 "a_X_derives_Y": compiles("struct Y {}; struct X : Y {};\nint main(){ Y y; X& x = y; }"),
 "b_Y_derives_X": compiles("struct X {}; struct Y : X {};\nint main(){ Y y; X& x = y; }"),
 "c_X_has_Y_field": compiles("struct Y {}; struct X { Y f; };\nint main(){ Y y; X& x = y; }"),
 "d_Y_has_X_field": compiles("struct X {}; struct Y { X f; };\nint main(){ Y y; X& x = y; }"),
}
rec(11, [k[0] for k, v in q.items() if v], ["b"], q)
# 12
s, o = run(INC + "int funC(int i=10) {return i+1;}\nint funC() {return 8;}\nvoid main () { int j= 8; std::cout << funC() << funC(j); }")
rec(12, s, "COMPILE_ERROR")
# 13: vector statements
s, o = run("#include <iostream>\n#include <vector>\nint main(){ std::vector<int> v; std::cout << (v.begin()==v.end()); std::vector<int> w(1); std::cout << (w.begin()==w.end()); w.reserve(10); std::cout << w.capacity() << w.size(); }")
rec(13, o, "10101", "(a true for empty; b false for size 1; capacity != size)")
# 14
opts = {"a": "this->K", "b": "K+*k", "c": "&K", "d": "*k"}
res = {k: compiles("class A {\nint K ;\nconst int* f(const int *k) const { return %s; }\n};\nint main(){}" % v) for k, v in opts.items()}
rec(14, "".join(k for k, v in res.items() if v), "c", res)
# 15
lines = {3: "X x;", 4: "X x(int);", 5: "X x<int>;", 6: "X<int> x;"}
bad = [n for n, st in lines.items() if not compiles("template<typename T> class X {};\nint main() {\n%s\n}" % st)]
rec(15, bad, [3, 4, 5], "(whole program line tags 3,4,5 fail individually)")
# 16
src = "class Y;\nclass X {\n friend class Y;\n int a;\n void f(Y y) { y.a = 1; } // L4\n};\nclass Y {\n int a;\n void f(X x) { x.a = 1; } // L8\n};\nint main(){}"
rec(16, tagged_errors(src), [4])
# 16 exactly as printed (no forward declaration of Y before the friend line is fine: friend class Y declares it)
src_p = "class X {\n friend class Y;\n int a;\n void f(Y y) { y.a = 1; } // L4\n};\nclass Y {\n int a;\n void f(X x) { x.a = 1; } // L8\n};\nint main(){}"
print("    Q16 as printed (no `class Y;` before X): error tags", tagged_errors(src_p))
# 17
tt = {k: compiles("int& f() { static int x = 0; return x; }\nint main(){ f() = 5; }".replace("int& f", k + " f").replace("return x;", "return x;")) for k in ("int", "int*", "int&")}
rec(17, [k for k, v in tt.items() if v], ["int&"], tt)
# 18
s, o = run(INC + 'class A {\npublic:\n  virtual void f() { std::cout << "A"; }\n};\nclass B : public A {\npublic:\n  void f() { std::cout << "B"; }\n};\nvoid g(A a) { a.f(); }\nint main() {\n  B b;\n  g(b);\n}')
rec(18, o, "A")
# 19
src = "class A {};\nclass B : public A {};\nvoid main() {\nA a, *p;\nB b, *q;\np = &b; // L1\nq = &a; // L2\na = b; // L3\nb = a; // L4\n}"
rec(19, tagged_errors(src), [2, 4])
# 20
c1 = compiles("class A { public: void f() const {} };\nint main(){ const A a; a.f(); }")
c2 = compiles("class A { public: void f() const {} };\nint main(){ A a; a.f(); }")
c3 = compiles("class A { public: const int k; A():k(0){} void f() const { k = 1; } };\nint main(){}")
c3b = compiles("class A { public: const int k; A():k(0){} void f() { k = 1; } };\nint main(){}")
c4 = compiles("class A { public: int k; void f() const { k = 1; } };\nint main(){}")
rec(20, sum([c1, c2, c3 or c3b, c4]), 2, dict(s1=c1, s2=c2, s3=c3 or c3b, s4=c4))
# 21: 2 << x
o_ = {
 "a_member_int": compiles("struct X { X& operator<<(int) { return *this; } };\nint main(){ X x; 2 << x; }"),
 "b_member_two_params": compiles("struct X { X& operator<<(int, X) { return *this; } };\nint main(){}"),
 "c_free_int_X": compiles("struct X {};\nint operator<<(int, X) { return 0; }\nint main(){ X x; 2 << x; }"),
}
rec(21, [k[0] for k, v in o_.items() if v], ["c"], o_)
# 22
s, o = run(INC + "int n = 0;\nclass A {\npublic:\nA() : y(++n), x(++n) { std::cout << x << y; }\nint x;\nint y;\n};\nvoid main() { A a; }")
rec(22, o, "12")
# 23
src = "int main(){\nint a = 42, *p;\nconst int b = 24, *q;\np = &a; // L1\np = &b; // L2\nq = &a; // L3\nq = &b; // L4\n}"
rec(23, tagged_errors(src), [2])
# 24
s, o = run("#include <iostream>\n#include <vector>\nvoid main() {\nstd::vector<int> v;\nv.push_back(1);\nv.push_back(4);\nstd::vector<int>::iterator it = v.begin();\nint n = *(it++);\nstd::cout << n;\n}")
rec(24, o, "1")
# 25
x_ = "class X {\npublic:\nvirtual void f() = 0;\n};\nclass Y : public X {\nvoid f() { }\n};\nclass Z : public Y {};\n"
cx = compiles(x_ + "int main(){ X o; }")
cy = compiles(x_ + "int main(){ Y o; }")
cz = compiles(x_ + "int main(){ Z o; }")
rec(25, "b" if (not cx) and cy and cz else "?", "b", dict(X=cx, Y=cy, Z=cz))
bad = [n for n, (a, b) in R.items() if a != b]
print("DIFFS:", bad)
