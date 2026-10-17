"""20B-A (2020 moed A, Moodle-style quiz, 17 questions) clang++ verification. Run: PYTHONUTF8=1 py tools/verify/20B-A/check.py
The paper shows a black box around one option per question (and hand-drawn X marks on the others); the boxes are NOT trusted as an official key:
every runnable question is re-derived here. Prints observed result next to the boxed option. Theory-only questions (Q8, Q11, Q13, Q14) are
checked as far as code can (Q8, Q14) and otherwise reasoned in the generator notes."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

R = {}
def rec(n, observed, boxed, what=""):
    R[n] = (observed, boxed)
    print("Q%02d %s observed=%r boxed=%r %s" % (n, "OK  " if observed == boxed else "DIFF", observed, boxed, what))

INC = "#include <iostream>\nusing namespace std;\n"
# 1: statics of a class template: shared per instantiation only
s, o = run(INC + "template<class T> struct X { static int c; X() { ++c; } };\ntemplate<class T> int X<T>::c = 0;\n"
           "int main(){ X<int> a, b; X<double> c; cout << X<int>::c << X<double>::c << (&X<int>::c == &X<double>::c); }")
rec(1, "option 1 (same instantiation shares)" if o == "210" else "?", "option 5 (all objects of the template)", "run: same instantiation shares (2 objects -> 2), another instantiation is separate (1), different addresses: option 5 as written is false -> HOLD")
# 2: rule of three with a double-delete detector
base = """#include <iostream>
#include <set>
using namespace std;
set<int*> freed; int dbl = 0;
class X {
public:
  X(int i = 0) { p = new int[1]; *p = i; }
  ~X() { if (freed.count(p)) dbl++; else freed.insert(p); delete[] p; }
  int* p;
  int f(X x) { return *(x.p); }
  %s
};
int main() { { X x1(1); X x2(2); int k; x2 = x1; k = x2.f(x1); } cout << dbl; }
"""
copy_ctor = "X(const X& o) { p = new int[1]; *p = *o.p; }"
assign = "X& operator=(const X& o) { if (this != &o) *p = *o.p; return *this; }"
# Note: a leaked/reused pointer can make the set report a false double free; use a fresh address check with a leak-free design instead.
r = {}
for name, extra in (("none", ""), ("assign_only", assign), ("copy_only", copy_ctor), ("both", copy_ctor + "\n  " + assign)):
    s, o = run(base % extra)
    r[name] = o if s == "OK" else s
print("    Q02 double frees:", r)
ok2 = r["both"] == "0" and all(r[k] != "0" for k in ("none", "assign_only", "copy_only"))
print("    Q02 only 'both' avoids the double delete:", ok2)
rec(2, "both" if ok2 else "?", "both")
# 3
s, o = run(INC + "template <class T, class U>\nclass X {\npublic:\n  X(T,U) { cout << 1; }\n};\ntemplate <>\nclass X <int,char> {\npublic:\n  X(int i,char c) { cout << 2; }\n};\n"
           "int main()\n{\n  int i = 5; char c = 'a'; double d = 7.5;\n  X<int, char> x1(i,c);\n  X<char, int> x2(c,i);\n  X<double, char> x3(d,c);\n}")
rec(3, o, "211")
# 4: Home class valid?
home = "class Home {\npublic:\n  Home(const int &i) { num1 = num2 = i; }\n  Home(const int *i) { num1 = num2 = *i; }\n  Home(const Home &h) { num1 = num2 = h.num1; }\n  Home(Home &h) { num1 = num2 = h.num1; }\nprivate:\n  int num1;\n  double num2;\n};\n"
ok4 = compiles(home + "int main(){ int a=1; Home h1(a); Home h2(&a); const Home c(h1); Home h3(h1); Home h4(c); }")
rec(4, "all valid" if ok4 else "error", "all valid", "(all four constructors coexist; no ambiguity with const/non-const copies)")
# 5: Memory copy constructor
mem_ok = "class Memory {\npublic:\n  Memory(int i = 0) { this->i = j = i; }\n  Memory(double j) { this->j = i = j + 1; }\n%s\nprivate:\n  int i, j;\n};\nint main(){ Memory a(1); Memory b(a); }"
e_full = compiles(mem_ok % "  Memory(const Memory& m) { j = i = m.i = m.j; }")
e_fixed = compiles(mem_ok % "  Memory(const Memory& m) { j = i = m.j; }")
e_two = compiles("class M { public: M(int i = 0) {} M(double j) {} };\nint main(){ M a; }")
e_amb = compiles("class M { public: M(int i = 0) {} M(double j) {} };\nint main(){ M a(3); }")
rec(5, "copy ctor invalid (const m)" if (not e_full) and e_fixed and e_two and e_amb else "?", "copy ctor invalid (const m)", dict(printed=e_full, assign_m_i_removed=e_fixed, two_ctors_ok=e_two, call_int_ok=e_amb))
# 6: overloading by return type
t1 = compiles("struct A { int f(int); double f(int); };\nint main(){}")
t2 = compiles("struct A { int f(int); double f(char); };\nint main(){}")
t3 = compiles("struct A { virtual int f(int); virtual double f(int); };\nint main(){}")
rec(6, "option 2 (possible only if the parameters also differ)" if (not t1) and t2 and (not t3) else "?", "option 4 (always true)", dict(same_params=t1, different_params=t2, virtual_same_params=t3))
# 7
decl = "int f1(int& i, int j = 1) { return i + j; }\nint f1(double& i, int j = 1) { return i * j; }\n"
res7 = {}
for arg in ("k,l", "l,k", "k&", "l*", "l*k"):
    s, o = run(INC + decl + "int main(){ double k = 2; int l = 1; cout << f1(%s); }" % arg)
    res7[arg] = o if s == "OK" else "ERR"
rec(7, [a for a, v in res7.items() if v == "2"], ["k,l"], res7)
# 8: which methods cannot be static
a_ = {
 "virtual": compiles("struct A { static virtual void f(); };\nint main(){}"),
 "pure_virtual": compiles("struct A { static virtual void f() = 0; };\nint main(){}"),
 "const_method": compiles("struct A { static void f() const; };\nint main(){}"),
 "overloaded": compiles("struct A { static void f(); static void f(int); };\nint main(){}"),
 "const_return": compiles("struct A { static const int f() { return 0; } };\nint main(){}"),
}
rec(8, "e", "e", a_)
# 9: abstract classes
code9 = "class MyClass { virtual int f() = 0; };\nclass MyClass1 : public MyClass { %s };\nclass %s : public MyClass { %s };\nclass MyClass3 : public MyClass { %s };\nconst MyClass * f1(const MyClass1&, const %s ) {return new MyClass3();}\nint main(){}"
F = "public: int f() { return 0; }"
for typo in ("Myclass2",):
    res9 = {}
    for k, (a1, a2, a3) in {"1+3": (F, "", F), "2+3": ("", F, F), "2": ("", F, ""), "1": (F, "", ""), "3": ("", "", F)}.items():
        res9[k] = compiles(code9 % (a1, typo, a2, a3, typo))
    print("    Q09 with `%s` as the second parameter type: compiles for option sets %s" % (typo, [k for k, v in res9.items() if v]))
R[9] = (["2+3"] if [k for k, v in res9.items() if v] == ["2+3"] else "?", ["2+3"])
print("Q09 observed(with MyClass2 spelled right)=%r boxed=['2+3'] (class spelled Myclass2 as in the screenshot, header and parameter alike)" % R[9][0])
# 10
s, o = run(INC + "class X {\npublic:\n  X() {}\n  static int i;\n};\nint X::i = 0;\nint main() {\n  X x1; X x2;\n  x1.i = 2;\n  x2.i = 3;\n  cout << x1.i << x2.i;\n  X::i++;\n  cout << X::i;\n}")
rec(10, o, "334")
# 14: dynamic dispatch conditions for ptr->myRun()
d_static = run(INC + "struct B { void myRun() { cout << 'B'; } };\nstruct D : B { void myRun() { cout << 'D'; } };\nint main(){ B* p1 = new B; B* p2 = new D; p1->myRun(); p2->myRun(); }")[1]
d_virt_base = run(INC + "struct B { virtual void myRun() { cout << 'B'; } };\nstruct D : B { void myRun() { cout << 'D'; } };\nint main(){ B* p1 = new B; B* p2 = new D; p1->myRun(); p2->myRun(); }")[1]
d_virt_derived_only = run(INC + "struct B { void myRun() { cout << 'B'; } };\nstruct D : B { virtual void myRun() { cout << 'D'; } };\nint main(){ B* p1 = new B; B* p2 = new D; p1->myRun(); p2->myRun(); }")[1]
d_two_bases = compiles("struct A { void myRun(); };\nstruct C { void myRun(); };\nstruct E : A, C {};\nint main(){ E* p = new E; p->myRun(); }")
rec(14, "d" if d_static == "BB" and d_virt_base == "BD" and d_virt_derived_only == "BB" and not d_two_bases else "?", "d",
    dict(nonvirtual=d_static, virtual_in_base_overridden=d_virt_base, virtual_only_in_derived=d_virt_derived_only, two_bases_call_compiles=d_two_bases))
# 12: every option for the blank
res12 = {}
for k, v in {"int i, double d": "int i, double d", "double d, int i=1": "double d, int i=1", "double d=0, int i=1": "double d=0, int i=1", "double d, int i": "double d, int i"}.items():
    s, o = run(INC + "double m1(int i = 0) { return i + 1; }\nint m1(double d = 0) { return d + 2; }\nint m2(%s) { return i + 2 * d; }\nint m2(int i) { return 7; }\nint main()\n{\n  int i = 1;\n  std::cout << m2(1.0+m1(i));\n}" % v)
    res12[k] = o if s == "OK" else "ERR"
rec(12, sorted(set(res12.values())), ["7"], res12)
# 15
s, o = run(INC + "class X {\npublic:\n  X() { }\n  virtual void f() { cout << 1; }\n  void f1() { cout << 2; }\n};\nclass Y : public X {\npublic:\n  Y() {}\n  void f() { cout << 3; }\n  virtual void f1() { cout << 4; }\n};\n"
           "int main() {\n  X* a[2];\n  X x1;  Y y1;\n  a[0] = &x1; a[1] = &y1;\n  for (int i = 0; i < 2; i++) {\n    a[i]->f();\n    a[i]->f1();\n  }\n}")
rec(15, o, "1232")
# 16: initialise Home::num1 (private) to 3 from Room()
room = home + "class Room : public Home {\npublic:\n  %s\n};\nint main(){ Room r; }"
res16 = {k: compiles(room % v) for k, v in {
    "1 Room() : Home(3) {}": "Room() : Home(3) {}",
    "2 Room() : num1=3 {}": "Room() : num1=3 {}",
    "3 Room(): {(Home)(*this).num1 = 3; }": "Room() { ((Home)(*this)).num1 = 3; }",
    "5 Room() : num1(3) {}": "Room() : num1(3) {}"}.items()}
rec(16, [k[0] for k, v in res16.items() if v], ["1"], res16)
# 17: initialise Memory::i (private) to 3 from RAM(), Memory repaired
mem = "class Memory {\npublic:\n  Memory(int i = 0) { this->i = j = i; }\n  Memory(double j) { this->j = i = j + 1; }\n  Memory(const Memory& m) { j = i = m.j; }\n  int geti() const { return i; }\nprivate:\n  int i, j;\n};\n"
res17 = {k: compiles(mem + "class RAM : public Memory {\npublic:\n  %s\n};\nint main(){ RAM r; }" % v) for k, v in {
    "1 RAM() : Memory(3) {}": "RAM() : Memory(3) {}",
    "3 RAM(): i(3) {};": "RAM(): i(3) {}",
    "4 RAM(): {Memory::i=3 }": "RAM() { Memory::i=3; }",
    "5 RAM() : i=3{};": "RAM() : i=3 {}"}.items()}
s, o = run("#include <iostream>\n" + mem + "class RAM : public Memory {\npublic:\n  RAM() : Memory(3) {}\n};\nint main(){ RAM r; std::cout << r.geti(); }")
rec(17, [k[0] for k, v in res17.items() if v], ["no option works ('לא ניתן')"], dict(res17, value_of_i_with_Memory3=o))
print("DIFFS (observed != boxed):", [n for n, (a, b) in R.items() if a != b])
