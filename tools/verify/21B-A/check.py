"""21B-A (24/06/2021, version 1) clang++ verification of all 20 questions. Run: PYTHONUTF8=1 py tools/verify/21B-A/check.py
No official key exists: the only answer source is a pair of hand-marked student answer sheets (version unknown), listed here as SHEET1.
Keys in the generator come from these runs; where a run is not deterministic (undefined behaviour) the question is held."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *

SHEET1 = dict(zip(range(1, 21), "dacbdcadbaacbbacbbdc"))   # student sheet 1, letters a-d (not trusted)
R = {}
def rec(n, observed, what=""):
    R[n] = observed
    print("Q%02d observed=%r sheet1=%r %s %s" % (n, observed, SHEET1[n], "same" if observed == SHEET1[n] else "DIFF", what))

PRE = "#include <iostream>\nusing namespace std;\n"
def count_letter(n):  # count -> option letter for 0/1/2/more
    return "abcd"[min(n, 3)]

# 1
src = "void f(int& i) {\n    i++;\n    cout << i << endl;\n};\nint main()\n{\n    int i = 3, j = 2;\n    f(i); // L1\n    f(i+j); // L2\n    f(5); // L3\n    f(i + 1); // L4\n}"
t = tagged_errors(PRE + src.replace("// L", "// L"))
src_lines = (PRE + src).split("\n")
# tags are relative to source text, so just count distinct tags
rec(1, count_letter(len(t)), "error tags %s" % t)
# 2
ok, err, _ = compile_(PRE + "int f(int x, int y=3, int z) {\n return x + y + z;\n}\nint main()\n{\n  cout << f(1,3,5) << f(1,3) << f(1,4,2) << endl;\n}")
rec(2, "a" if not ok else "?", [l[-70:] for l in err.splitlines() if "error" in l][:1])
# 3
src = "class A {\npublic:\n A(int a, int b = 3) { x = a; y = b; }\n int x,y;\n};\nint main() {\n A a1; // L1\n A a2(2); // L2\n A a3(2, 3); // L3\n A a4(2, 3, 4); // L4\n A a5=a3; // L5\n a3 = a2; // L6\n}"
t = tagged_errors(PRE + src)
rec(3, count_letter(len(t)), t)
# 4
src = "class A {\npublic:\n A(int z) { x = z; }\n int x;\n void f() { cout << x; }\n void f() const { cout << x; }\n void setX(int z) { x = z; }\n};\nint main() {\n A a1(4); // L1\n a1.setX(8); // L2\n const A a2(6); // L3\n a1.f(); // L4\n a2.f(); // L5\n a2.setX(5); // L6\n A a3 = a2; // L7\n}"
t = tagged_errors(PRE + src)
rec(4, count_letter(len(t)), t)
# 5
src = "class A {\npublic:\n A(int i=0) { x = i;}\n A& f(int i) {\n  x = 2 * i;\n  return *this;\n }\n A* g(int i) {\n  x = 2 + i;\n  return this;\n }\n int x;\n};\nint main() {\n A a1; // L1\n a1.f(5).g(4); // L2\n (&a1)->g(3).x = 5; // L3\n a1.f(2)->x = 6; // L4\n a1.f(2).x.g(2); // L5\n a1.g(3)->f(4); // L6\n}"
t = tagged_errors(PRE + src)
rec(5, count_letter(len(t)), t)
# 6: rule-of-three crash; detect double delete with a freed-pointer log (UB, so observe only)
code6 = """#include <iostream>
#include <cstdio>
#include <set>
using namespace std;
set<int*> freed;
class A {
public:
  A(int i = 10) { n = i; p = new int[n]; for (int j = 0; j < n; j++) { p[j] = 0; } }
  ~A() { if (freed.count(p)) { printf("[double free of %p]\\n", (void*)p); fflush(stdout); } freed.insert(p); delete p; }
  int n; int* p;
};
int f(A a) { return 2*a.n; }
int main() {
  A a1(5), a2(5);
  cout << 1 << endl;
  f(a1);
  cout << 2 << endl;
  f(a2);
  cout << 3 << endl;
  f(a1);
  cout << 4 << endl;
  f(a2);
}
"""
s, o = run(code6)
print("    Q06 instrumented run:", s, repr(o))
ok, err, e = compile_(code6.replace("freed.count(p)", "false").replace("printf(\"[double free of %p]\\n\", (void*)p); fflush(stdout);", ""))
import subprocess
r = subprocess.run([str(e)], capture_output=True, text=True)
print("    Q06 plain run: exit code %s, stdout %r" % (r.returncode, r.stdout))
R[6] = "?"
# 7
src = "class A {\npublic:\n A(int i) {x=i;}\n operator int() {return x;}\n int x;\n};\nvoid main()\n{\n A a1(5); int i=3; // L0\n A a2=i; // L1\n i=a1; // L2\n i=(int) a1; // L3\n a1=(A)i; // L4\n}"
t = tagged_errors(PRE + src)
rec(7, count_letter(len(t)), t)
# 8
s, o = run(PRE + "class B {\npublic:\n B() {cout << 1; }\n B(int i) { \n  cout << 2; \n  x = i; \n }\n int x;\n};\nclass A : public B {\npublic:\n A(int y = 5, int x = 10) : B(x) { \n  cout << 3; \n  this->y = y; \n  this->x = 8; \n }\n void f() const { cout << x << y; }\n int y;\n};\nvoid main()\n{\n A a(5, 7);\n a.f();\n}")
rec(8, {"COMPILE_ERROR": "a", "23105": "b", "123105": "c", "2385": "d"}.get(o if s == "OK" else s, "?"), repr(o))
# 9
src = "class A {\npublic:\n A(int i=0) { na = i; } \nprotected:\n int na;\n};\nclass B : private A {\npublic:\n B(int i, int j) :A(j) { nb = i; }\n int f() { return na; } // L1\nprotected:\n int nb;\n};\nclass C : private B {\npublic:\n C(int i, int j, int k) : B(j, k) {\n  nc = i;\n }\n int f() {\n  int i = nb; // L2\n  return na; // L3\n }\nprotected:\n int nc;\n};"
t = tagged_errors(PRE + src)
rec(9, count_letter(len(t)), t)
# 10
s, o = run(PRE + "class A {\npublic:\n A(int i) { na = i; }\n A& operator=(const A& a) {\n  na = a.na * 2;\n  return *this;\n }\n int na;\n};\nclass B : public A {\npublic:\n B(int i, int j) : A(j) {\n  nb = i;\n }\n int nb;\n};\nvoid main()\n{\n B b1(1, 2);\n B b2(3, 4);\n b2 = b1;\n cout << b2.nb << b2.na;\n}")
rec(10, {"14": "a", "34": "b", "12": "c"}.get(o if s == "OK" else s, "d"), repr(o))
# 11
code11 = "class X \n{\nprotected:\n int key;\npublic:\n X(int i = 0) { key = i;};\n void f1() { cout << \"f1 from X\" << endl; }\n};\nclass Y :  public X \n{\npublic:\n Y(int i = 0) {key = i;};\n void f1() { cout << \"f1 from Y\" << endl; }\n};\nclass Z :  public X \n{\npublic:\n Z(int i = 0) { key = i; };\n void f1() { cout << \"f1 from Z\" << endl; }\n};\nclass A : public Y, public Z {\n int key;\npublic:\n A(int i = 0) : Y(i + 2), Z(i + 3) \n {\n  key = Y::key + Z::key;\n }\n int getkey(void) { return key; }\n void f1() { cout << \"f1 from A\" << endl; }\n};\nvoid main() {\n A object(4);\n cout << \"object.key = \" << object.getkey()<<endl;\n object.f1();\n}"
s, o = run(PRE + code11)
rec(11, "a" if s == "OK" else "?", repr(o) if s == "OK" else [l[-80:] for l in o.splitlines() if "error" in l][:3])
# 12
src = "void main()\n{\n int i = 12;\n const int ci = 12;\n ci = 13; // L1\n const int* ip3 = &i;\n i = 10; // L2\n *ip3 = 10; // L3\n}"
t = tagged_errors(PRE + src)
rec(12, count_letter(len(t)), t)
# 13: undefined behaviour: out-of-bounds write on a stack array
code13 = PRE + "template <class T, int n>\nclass Array {\npublic:\n T &operator[](int i)\n {\n  return a_[i];\n }\n const T& operator[](int i) const\n {\n  return a_[i]; \n }\nprivate:\n T a_[n];\n};\nvoid main()\n{\n Array <int, 12 > ia;\n ia[20] = 3;\n ia[3] = ia[20];\n cout << ia[3];\n}"
s, o = run(code13)
print("    Q13 run (-O0):", s, repr(o))
ok, err, e = compile_(code13.replace("int main", "int main"), std="c++17")
res13 = {}
for flags in (["-O0"], ["-O2"]):
    p = pathlib.Path(__import__("tempfile").gettempdir()) / "tmp_transcriber_q13.cpp"
    p.write_text(code13.replace("void main", "int main"), encoding="utf-8")
    ex = pathlib.Path(__import__("tempfile").gettempdir()) / "tmp_transcriber_q13.exe"
    subprocess.run([CXX, "-std=c++17", "-Wno-everything"] + flags + [str(p), "-o", str(ex)], capture_output=True)
    r = subprocess.run([str(ex)], capture_output=True, text=True)
    res13[" ".join(flags)] = (r.returncode, r.stdout)
print("    Q13 runs by flags:", res13)
R[13] = "?"
# 14: raw new[] never freed vs vector: count live allocations
code14 = """#include <iostream>
#include <vector>
#include <cstdlib>
#include <new>
using namespace std;
static int live = 0;
void* operator new[](size_t n) { live++; return malloc(n); }
void operator delete[](void* p) noexcept { if (p) live--; free(p); }
void* operator new(size_t n) { live++; return malloc(n); }
void operator delete(void* p) noexcept { if (p) live--; free(p); }
int main() {
  cout << "x"; int base0 = live;
  { int* ip = new int[12]; for (int i = 0; i < 12; i++) ip[i] = 2 * i; }
  cout << ' ' << live - base0 << ' ';
  int before = live;
  { vector<int> iv(12); for (size_t j = 0; j < iv.size(); ++j) iv[j] = 2 * j; }
  cout << live - before;
}
"""
s, o = run(code14)
rec(14, "b" if o.split() == ["x", "1", "0"] else "?", "live allocations after raw block / after vector block: %r" % o)
# 15
src = "class A {\n int n;\npublic: \n A(int m = 0) {n=m;}\n};\nA a1(5); // L1\nA a2; // L2\nA a3(); // L3\nvoid main() {}"
t = tagged_errors(PRE + src)
rec(15, count_letter(len(t)), t)
# 16
s, o = run(PRE + "class B{\npublic:\n virtual ~B() {};\n virtual int getN() const \n { return n; }\n virtual void setN(int nn) \n {  n=nn; }\nprotected:\n int n; \n};\nclass D: public B{\npublic:\n virtual int getN() const \n {\n return n*n; \n }\n virtual void setN(int nn) \n {\n n = 2*nn; }\n};\nvoid main()\n{\n B b;\n D d;\n d.setN(5);\n b = d;\n cout << b.getN();\n}")
rec(16, {"25": "b", "10": "c", "100": "d"}.get(o if s == "OK" else s, "a" if s != "OK" else "?"), repr(o) if s == "OK" else "compile error")
# 17
code17 = PRE + "template<class T>\nvoid f(T t){ cout << __PRETTY_FUNCTION__ << '\\n'; }\n\ntemplate<class T>\nvoid f(T* t) { cout << __PRETTY_FUNCTION__ << '\\n'; };\n\nvoid main()\n{\n int* p, i=3;\n double d = 3.1415;\n p = &i;\n f(i);\n f(d);\n f(p);\n}"
s, o = run(code17)
lines = o.strip().splitlines()
rec(17, "b" if s == "OK" and len(set(lines)) == 3 else "?", lines)
# 18
code18 = "#include <iostream>\n#include <string.h>\nusing namespace std;\nclass MySting {\npublic:\n MySting(const char* s) {\n    s_ = new char[strlen(s) + 1];\n    strcpy(s_,s);\n }\n friend MySting operator+(const MySting&, const MySting&);\n operator const char* () const { return s_; }\nprivate:\n char* s_;\n};\nMySting operator+(const MySting &s1, const MySting &s2)\n{\n MySting sum(\"a\");\n sum.s_=strcat(s1.s_, s2.s_);\n return sum;\n}\nvoid main()\n{\n MySting s1(\"a\"), s2(\"b\");\n MySting temp = s1 + s2;\n const char* p = temp;\n cout<<p;\n cout << temp;\n}"
s, o = run(code18)
rec(18, {"abab": "b", "ab": "c"}.get(o if s == "OK" else s, "a" if s == "COMPILE_ERROR" else "?"), repr(o))
# 19
src = "class Record {\npublic:\n virtual ~Record() {};\n Record(const Record& that)\n {\n  *this = that;\n }\n Record operator = (const Record& that)\n {\n  name = that.name; // L1\n  return *this;\n }\nprivate:\n char name[100];\n long id;\n};\nvoid main()\n{\n Record r1; // L2\n Record r2 = r1;\n Record r3; // L3\n r3 = r2 = r1;\n}"
t = tagged_errors(PRE + src)
rec(19, count_letter(len(t)), t)
# 20
code20 = "#include <iostream>\n#include <string.h>\nusing namespace std;\nclass Base {\n    int* br;\npublic:\n     Base() { br = NULL; }\n     ~Base() {\n               if(br!=NULL)\n                     delete br; }\n};\nclass Derived : public Base {\n    int* dr;\npublic:\n    Derived() { dr = NULL; }\n   ~Derived() {\n                 if(dr!=NULL)\n                       delete[] dr; }\n    void f() { dr = new int[10]; }\n};\nvoid main(){\n    Base *bp = new Base;\n    delete bp;\n    bp = new Derived;\n    delete bp;\n}"
ok20 = compiles(code20)
trace20 = run("#include <iostream>\nusing namespace std;\nclass Base { public: ~Base() { cout << 'B'; } };\nclass Derived : public Base { public: ~Derived() { cout << 'D'; } };\nint main(){ Base* bp = new Derived; delete bp; }")[1]
rec(20, "c" if ok20 and trace20 == "B" else "?", "compiles=%s; delete Derived via Base* without virtual dtor runs only %r" % (ok20, trace20))
print("\nQ06 and Q13 involve undefined behaviour; decided in the generator.")
