"""19A-B (28/03/2019) clang++ verification of every code question. Run: PYTHONUTF8=1 py tools/verify/19A-B/check.py
Prints one line per question: observed result vs official key (highlighted option). Statement-count questions tag lines with // L<n>."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

R = {}
def rec(n, observed, expected, what=""):
    R[n] = (observed, expected)
    print("Q%02d %s observed=%r expected=%r %s" % (n, "OK  " if observed == expected else "DIFF", observed, expected, what))

INC = "#include <iostream>\n"
# 1
s, o = run(INC + "int f(char c, int i) {return i++;}\nint &f(int &i, char c) {return ++i;}\nvoid main() {int x=4; std::cout << f(x,'x'); std::cout<< f('x',x); }")
rec(1, o if s == "OK" else s, "55")
# 2 (as printed: funcC is undeclared) and with the typo fixed (ambiguous call)
s, o = run(INC + "int funC(int i=10) {return i+1;}\nint funC() {return 8;}\nvoid main () { int j= 8; std::cout << funcC() << funC(j); }")
s2, o2 = run(INC + "int funC(int i=10) {return i+1;}\nint funC() {return 8;}\nvoid main () { int j= 8; std::cout << funC() << funC(j); }")
rec(2, s, "COMPILE_ERROR", "typo-fixed variant: %s (%s)" % (s2, [l[-60:] for l in o2.splitlines() if "error" in l][:1]))
# 3
s, o = run(INC + "using namespace std;\nvoid f(int i, double j) { cout << i << j << endl; }\nvoid f(double i, int j) { cout << j << i << endl; }\nvoid main() {\nint i = 1, j = 2;\nf(i, j);\n}")
rec(3, s, "COMPILE_ERROR", [l[-50:] for l in o.splitlines() if "ambiguous" in l][:1])
# 4
s, o = run(INC + "using namespace std;\nclass X {\npublic:\nX(int i) { n=i; }\nint & f() { return n; }\nprivate:\nint n;\n};\nint main() {\nX x1(5);\nint &j = x1.f();\nj += 2;\ncout << j << x1.f() << endl;\n}")
rec(4, o.strip(), "77")
# 5
s, o = run(INC + 'class A {\npublic:\n  virtual void f() { std::cout << "A"; }\n};\nclass B : public A {\npublic:\n  void f() { std::cout << "B"; }\n};\nvoid g(A a) { a.f(); }\nint main() {\n  B b;\n  g(b);\n}')
rec(5, o, "A")
# 6: class B : private A, B::f can reach public and protected members of A, not private
base = "class A { public: int pu; protected: int pr; private: int pv; };\nclass B : private A { void f() { %s } };\nint main(){}"
acc = {k: compiles(base % ("pu=1;" if k == "pu" else "pr=1;" if k == "pr" else "pv=1;")) for k in ("pu", "pr", "pv")}
rec(6, "c" if acc["pu"] and acc["pr"] and not acc["pv"] else "?", "c", acc)
# 7
ok7 = compiles("#include <type_traits>\nclass A { void f() const { static_assert(std::is_same<decltype(this), const A*>::value, \"\"); } };\nint main(){}")
bad7 = [compiles("#include <type_traits>\nclass A { void f() const { static_assert(std::is_same<decltype(this), %s>::value, \"\"); } };\nint main(){}" % t) for t in ("A*", "A&", "A")]
rec(7, "d" if ok7 and not any(bad7) else "?", "d")
# 8
s, o = run(INC + "template<int N> class X {\npublic:\nX() { ++d; }\nstatic int d;\n};\ntemplate<int N> int X<N>::d = 0;\nvoid main() {\nX<0> a, b;\nX<1> c;\nstd::cout << a.d << b.d << c.d;\n}")
rec(8, o, "221")
# 9
s, o = run(INC + 'class B \n{ public: virtual void disp() { std::cout<<"B"; } };\nclass D : public B \n{ public: \n  void disp()\n{ std::cout<<"D"; } };\nvoid main(){\n    D d;\n    d.disp();\n    D *pd=&d;\n    pd->disp();\n    B *pb=pd;\n    pb->disp();\n}')
rec(9, o, "DDD")
# 10: count distinct int subobjects in E
E = "struct A { int x; };\nstruct B : virtual A {};\nstruct C : virtual A {};\nstruct D : A {};\nstruct E : B, C, D {};\n"
s, o = run(INC + E + "int main(){ E e; int* p[3] = {&e.B::x, &e.C::x, &e.D::x}; int d=0; for(int i=0;i<3;i++){bool n=true; for(int j=0;j<i;j++) if(p[i]==p[j]) n=false; d+=n;} std::cout<<d; }")
rec(10, o, "2", "(e.x itself compiles: %s)" % compiles(INC + E + "int main(){ E e; e.x=1; }"))
# 11
src = "class A { public: int I;};\nclass B : protected A { private: int J;};\nint main () {\n    A t; // L4\n    B tt; // L5\n    t.I = 3; // L6\n    tt.I = 3; // L7\n}"
rec(11, tagged_errors(src), [7])
# 12
s, o = run(INC + "static int K = 1;\nstruct A {\nstatic int K;\n    A(){K++;}\n};\nint A::K = 1;\nvoid main () {\nA a;\nA *b=&a;\nA &c=*b;\nstd::cout << K << c.K << A::K;\n}")
rec(12, o, "122")
# 13
opts = {"a": "this->K", "b": "K+*k", "c": "&K", "d": "*k"}
res = {k: compiles("class A {\nint K ;\nconst int* f(const int *k) const { return %s; }\n};\nint main(){}" % v) for k, v in opts.items()}
rec(13, "".join(k for k, v in res.items() if v), "c", res)
# 14
s, o = run(INC + 'class A {\npublic:\nA(int) {std::cout << " A int ";}\nA() {std::cout << "A empty ";}\n~A() {std::cout << " destroy A";} \n};\nclass B : public A{ \npublic:\nB(int) {std::cout << "B int ";}\nB() {std::cout << "B empty ";}\n~B() {std::cout << " destroy B";} \n};\nvoid main() {\nB *b;\nA a(3); \nb = new B();\nA *ap=b;\ndelete ap;\n}')
rec(14, " ".join(o.split()), "A int A empty B empty destroy A destroy A")
# 15
src = "#include <iostream>\nusing namespace std;\nclass X {\npublic:\n X(int i = 0) { nx = i; }\n virtual void f() = 0;\n int nx; \n};\nclass Y : public X {\npublic:\n Y(int i = 0, int j=0) : X(i), ny(j) { }\n virtual void f() { cout << \"Y\" << ny; }\n int ny;\n};\nint main() {\n  X *x[2]; // L16\n  x[0] = new X(1); // L17\n  x[1] = new Y(2, 3); // L18\n  X x2(2); // L19\n}"
rec(15, tagged_errors(src), [17, 19])
# 16
s, o = run(INC + "using namespace std;\nclass X {\npublic:\nX(int i = 0) : nx(i) { cout << 1; }\nint nx; \n};\nclass Y {\npublic:\nY(int i = 0) : ny(i) { onx=X(i); }\nint ny;\nX onx;\n};\nint main() {\nY y1(2);\ny1.onx.nx = 3;\n}")
rec(16, o, "11")
# 17: statements (1)-(4)
c1 = compiles("class A { public: void f() const {} };\nint main(){ const A a; a.f(); }")
c2 = compiles("class A { public: void f() const {} };\nint main(){ A a; a.f(); }")
c3 = compiles("class A { public: const int k; A():k(0){} void f() const { k = 1; } };\nint main(){}")
c3b = compiles("class A { public: const int k; A():k(0){} void f() { k = 1; } };\nint main(){}")
c4 = compiles("class A { public: int k; void f() const { k = 1; } };\nint main(){}")
rec(17, sum([c1, c2, c3 or c3b, c4]), 2, dict(s1=c1, s2=c2, s3_const_fn=c3, s3_nonconst_fn=c3b, s4=c4))
# 18
src = "int main(){\nint a = 42, *p;\nconst int b = 24, *q;\np = &a; // L1\np = &b; // L2\nq = &a; // L3\nq = &b; // L4\n}"
rec(18, tagged_errors(src), [2])
# 19
src = "class A {};\nclass B : public A {};\nvoid main() {\nA a, *p;\nB b, *q;\np = &b; // L1\nq = &a; // L2\na = b; // L3\nb = a; // L4\n}"
rec(19, tagged_errors(src), [2, 4])
# 20
pre = "#include <iostream>\nclass A { public: int x; };\nclass B : public A {};\nclass C : public A {};\nclass D : public B, public C {};\n"
l7 = run(INC + pre + "int main() { D d; d.C::x = 0; d.C::x = 42; std::cout << d.C::x; }")
l8c = compiles(pre + "int main() { D d; ((C)d).x = 42; }")
l8 = run(INC + pre + "int main() { D d; d.C::x = 0; ((C)d).x = 42; std::cout << d.C::x; }")
l9 = run(INC + pre + "int main() { D d; d.C::x = 0; ((C*)&d)->x = 42; std::cout << d.C::x; }")
rec(20, sum([l7[1] == "42", l8c and l8[1] == "42", l9[1] == "42"]), 2, dict(l7=l7[1], l8_compiles=l8c, l8_value_in_d=l8[1], l9=l9[1]))
# 21
s, o = run(INC + "int n = 0;\nclass A {\npublic:\nA() : y(++n), x(++n) { std::cout << x << y; }\nint x;\nint y;\n};\nvoid main() { A a; }")
rec(21, o, "12")
# 22: binary operator as member: left operand must be X
m1 = compiles("struct X { X operator+(int) const { return *this; } };\nint main(){ X x; x + 1; }")
m2 = compiles("struct X { X operator+(int) const { return *this; } };\nint main(){ X x; 1 + x; }")
m3 = compiles("struct X { X operator+(X) const { return *this; } };\nint main(){ X x; x + x; }")
rec(22, "c" if m1 and not m2 and m3 else "?", "c", dict(left_X_right_int=m1, left_int_right_X=m2, both_X=m3))
# 23: operator<< for cout << x
n1 = compiles("#include <iostream>\nstruct X { std::ostream& operator<<(std::ostream& o) { return o; } };\nint main(){ X x; std::cout << x; }")
n2 = compiles("#include <iostream>\nstruct X { int v=0; };\nstd::ostream& operator<<(std::ostream& o, const X& x) { return o << x.v; }\nint main(){ X x; std::cout << x; }")
rec(23, "c" if (not n1) and n2 else "?", "c", dict(member_form=n1, free_nonfriend=n2))
# 24: class B : protected A ; where can the error be?
hdr = "struct A { public: int a; };\nstruct B : protected A { void fb() { %s } };\nstruct C : public B { void fc() { %s } };\nint main() { %s }"
secI = compiles(hdr % ("a=1;", "", ""))
secII = compiles(hdr % ("", "a=1;", ""))
secIII = compiles(hdr % ("", "", "C c; c.a=1;"))
secIII2 = compiles(hdr % ("", "", "B b; A* p = &b;"))
rec(24, "c" if secI and secII and not secIII and not secIII2 else "?", "c", dict(I=secI, II=secII, III_member=secIII, III_upcast=secIII2))
# 25
s, o = run("#include <iostream>\n#include <vector>\nint main(){ std::vector<int> v; std::cout << (v.end()==v.begin()+0) << (v.size()==0); }")
rec(25, o, "11")
bad = [n for n, (a, b) in R.items() if a != b]
print("DIFFS:", bad)
