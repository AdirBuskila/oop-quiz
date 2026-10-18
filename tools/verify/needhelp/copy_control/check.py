"""Machine check for the guided course copy_control (courses/copy_control/C01..C07).
Run: PYTHONUTF8=1 py tools/verify/needhelp/copy_control/check.py
Every stored answer is re-derived with clang++ (-std=c++17):
  * 'run'    questions: the code block in the stem is compiled and run as printed; stdout must equal the correct option,
             and no wrong option may equal it.
  * 'multi'  questions: concept claims checked by small harness programs (compile-error / observed output), the
             correct option's text is asserted against an expected string.
  * boss bankIds: each bank question is compiled/run or reproduced with a harness, and the bank key is compared.
Nothing here relies on UB: double-free is simulated with a counter (nothing is really freed twice), and the
self-assignment hazard uses a poison model instead of reading freed memory."""
import json, pathlib, re, subprocess, sys, tempfile, os

APP = pathlib.Path(__file__).resolve().parents[4]
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
PRE = "#include <iostream>\n#include <vector>\nusing namespace std;\n"
TMP = pathlib.Path(tempfile.mkdtemp(prefix="tmp_oop_copy_control_chk_"))

def compile_run(src, std="c++17"):
    f = TMP / "t.cpp"; f.write_text(src, encoding="utf-8")
    exe = TMP / "t.exe"
    if exe.exists(): exe.unlink()
    r = subprocess.run([CXX, "-std=" + std, "-w", str(f), "-o", str(exe)], capture_output=True, text=True)
    if r.returncode != 0: return "CERR", r.stderr
    p = subprocess.run([str(exe)], capture_output=True, text=True, timeout=20)
    assert p.returncode == 0, "nonzero exit " + str(p.returncode)
    return "OK", re.sub(r"\s+", " ", p.stdout).strip()

def run(src):
    s, o = compile_run(PRE + src)
    assert s == "OK", o
    return o

def cerr(src):
    s, o = compile_run(PRE + src)
    return s == "CERR"

# ---- load levels (with answers) through the repo's own loader
js = "const {load}=require('./tools/course_load.js');const L=load(process.cwd());process.stdout.write(JSON.stringify(L.levels.filter(e=>e.courseId==='copy_control').map(e=>e.level)))"
out = subprocess.run(["node", "-e", js], cwd=str(APP), capture_output=True, text=True, encoding="utf-8")
assert out.returncode == 0, out.stderr
levels = json.loads(out.stdout)
Q = {q["id"]: q for L in levels for q in L["questions"] if "id" in q}
BANK = [q["bankId"] for L in levels for q in L["questions"] if "bankId" in q]
bank = {x["id"]: x for x in json.loads((APP / "questions.json").read_text(encoding="utf-8"))["questions"]} \
    if isinstance(json.loads((APP / "questions.json").read_text(encoding="utf-8")), dict) else \
    {x["id"]: x for x in json.loads((APP / "questions.json").read_text(encoding="utf-8"))}

def opt(q, oid):
    return next(o["value"] for o in q["options"] if o["id"] == oid)

def strip_ticks(v):
    return v.strip("`").strip()

def code_of(q):
    m = re.search(r"```cpp\n(.*?)\n```", q["question"], re.S)
    return m.group(1)

done = set()
def check_run(qid):
    q = Q[qid]; got = run(code_of(q))
    right = strip_ticks(opt(q, q["correctId"]))
    assert got == right, (qid, got, right)
    for o in q["options"]:
        if o["id"] != q["correctId"]:
            assert strip_ticks(o["value"]) != got, (qid, "wrong option equals real output", o["value"])
    done.add(qid); print("run  ", qid, repr(got))

def check_multi(qid, ok, expect_value):
    q = Q[qid]
    assert ok, qid
    assert opt(q, q["correctId"]) == expect_value, (qid, opt(q, q["correctId"]), expect_value)
    done.add(qid); print("multi", qid, "->", expect_value)

for qid in ["C01-Q1", "C01-Q2", "C01-Q3", "C01-Q4",
            "C02-Q1", "C02-Q2", "C02-Q3", "C02-Q4", "C02-Q5",
            "C03-Q4", "C03-Q5",
            "C04-Q1", "C04-Q2", "C04-Q3", "C04-Q4", "C04-Q5",
            "C05-Q1", "C05-Q2", "C05-Q5", "C05-Q6",
            "C06-Q1", "C06-Q2", "C06-Q3", "C06-Q4", "C06-Q5"]:
    check_run(qid)

# C01-Q5: which of the four lines does NOT call the copy constructor
r = run('''struct T { static int c; T() {} T(const T&) { c++; } };
int T::c = 0;
void f(T t) {}
int main() {
    T a, b;
    int before;
    before = T::c; T x = a;  cout << (T::c - before) << " ";
    before = T::c; T y(a);   cout << (T::c - before) << " ";
    before = T::c; b = a;    cout << (T::c - before) << " ";
    before = T::c; f(a);     cout << (T::c - before);
}''')
assert r == "1 1 0 1", r
check_multi("C01-Q5", True, "`b = a;`")

# C03-Q1: of X(X x), X(X* x), X(const X& x), X(X& x) exactly two are copy constructors
assert cerr("struct X { X() {} X(X x) {} };\nint main() {}")
r = run('''struct P { P() {} P(P* x) { cout << "ptr "; } };
struct R { R() {} R(R& x) { cout << "ref "; } };
struct CR { CR() {} CR(const CR& x) { cout << "cref "; } };
int main() { P p; P p2 = p; R r; R r2 = r; CR c; CR c2 = c; }''')
assert r == "ref cref", r
check_multi("C03-Q1", True, "2")

# C03-Q2: T(T&) cannot copy a const object
assert cerr('struct T { T() {} T(T&) { cout << "c"; } };\nint main() { const T a; T b = a; }')
assert run('struct T { T() {} T(T&) { cout << "c"; } };\nint main() { T a; T b = a; }') == "c"
check_multi("C03-Q2", True, "שגיאת קומפילציה")

# C03-Q3: void operator= breaks the chain; T& operator= allows it
assert cerr("struct T { int v; T(int x = 0) : v(x) {} void operator=(const T& o) { v = o.v; } };\nint main() { T a(1), b(2), c(3); a = b = c; }")
assert run("struct T { int v; T(int x = 0) : v(x) {} T& operator=(const T& o) { v = o.v; return *this; } };\nint main() { T a(1), b(2), c(3); a = b = c; cout << a.v << b.v << c.v; }") == "333"
check_multi("C03-Q3", True, "שגיאת קומפילציה")

# C05-Q3: double free simulated with a counter (no real double delete). Which additions remove it?
def dbl(extra):
    return run('''#include <map>
map<int*, int> freed;
class X {
public:
    X(int i = 0) { p = new int(i); }
    ~X() { freed[p]++; /* stands for delete p, counted instead of executed */ }
    int* p;
%s
};
int main() {
    { X a(1); X b = a; X c(2); c = a; }
    int worst = 0;
    for (auto& kv : freed) worst = kv.second > worst ? kv.second : worst;
    cout << worst;
}''' % extra)
CC = "    X(const X& o) { p = new int(*o.p); }"
AS = "    X& operator=(const X& o) { if (this != &o) { /* old block freed here */ freed[p]++; p = new int(*o.p); } return *this; }"
res = {"none": dbl(""), "copy_only": dbl(CC), "assign_only": dbl(AS), "both": dbl(CC + "\n" + AS)}
print("   double-free counter (worst frees of one block):", res)
assert res["none"] != "1" and res["copy_only"] != "1" and res["assign_only"] != "1" and res["both"] == "1", res
check_multi("C05-Q3", True, "גם בנאי העתקה עמוק וגם אופרטור השמה עמוק")

# C05-Q4: self-assignment without the check, simulated with a poison model (freeing = overwrite with -999)
def selfassign(guard):
    return run('''struct D {
    int* p;
    D(int v) : p(new int(v)) {}
    D& operator=(const D& o) {
        %s
        { *p = -999; /* model of delete p: the block is dead, its content is gone */ int* old = p; p = new int(*o.p); (void)old; }
        return *this;
    }
};
int main() { D a(5); a = a; cout << *a.p; }''' % ("if (this == &o) return *this;" if guard else ""))
assert selfassign(False) == "-999" and selfassign(True) == "5"
check_multi("C05-Q4", True, "הבלוק נמחק לפני שמעתיקים ממנו, ולכן מעתיקים נתונים ששוחררו")

# C05 deep classes themselves must be correct programs: run them under a leak-free scenario
assert run(code_of(Q["C05-Q1"]) + "") == "59"

# ---- boss (bank) questions
def bank_q(i):
    b = bank[i]
    assert not b.get("hold"), i
    return b
for i in BANK:
    b = bank_q(i)
    assert b["correctId"] in [o["id"] for o in b["options"]], i
print("boss ids:", BANK)

def bank_opt(i, oid):
    return next(o["value"] for o in bank[i]["options"] if o["id"] == oid)

# 19A-A-Q9: copy ctor not called on assignment between existing objects (key c)
r = run('''struct A { static int c; A() {} A(const A&) { c++; } };
int A::c = 0;
A ret() { A a; return a; }          // NRVO may elide: reported separately, not used for the key
void pass(A a) {}
int main() {
    A x, y;
    int b0 = A::c; pass(x);          cout << (A::c - b0) << " ";
    b0 = A::c; y = x;                cout << (A::c - b0) << " ";
}''')
assert r == "1 0", r
assert bank["19A-A-Q9"]["correctId"] == "c" and "השמה" in bank_opt("19A-A-Q9", "c")
print("19A-A-Q9 key c: assignment (0 copies), parameter pass (1 copy)")

# 19A-A-Q21: C& operator=(const C&) supports chain and int-like (a = b = c, (a = b) = c is lvalue)
assert run("struct C { int v; C(int x = 0) : v(x) {} C& operator=(const C& o) { v = o.v; return *this; } };\nint main() { C a(1), b(2), c(3); a = b = c; (a = b) = C(9); cout << a.v << b.v << c.v; }") == "933"
assert bank["19A-A-Q21"]["correctId"] == "a" and bank_opt("19A-A-Q21", "a").replace(" ", "") == "`C&operator=(constC&)`"
print("19A-A-Q21 key a")

# 23S-A-Q2: only Point(Point const &) among three is a copy constructor
assert cerr("struct Point { Point() {} Point(Point const src) {} };\nint main() {}")
r = run('''struct Q1 { Q1() {} Q1(Q1 const *s) { cout << "ptr "; } };
struct Q2 { Q2() {} Q2(Q2 const &s) { cout << "ref "; } };
int main() { Q1 a; Q1 b = a; Q2 c; Q2 d = c; }''')
assert r == "ref", r
assert bank["23S-A-Q2"]["correctId"] == "b" and bank_opt("23S-A-Q2", "b").strip() == "1"
print("23S-A-Q2 key b (1 copy constructor)")

# 23B-B-Q9: run the program as printed
src = '''class T{
private:
    int a;
public:
    static int n;
    int b;
    T(int i, int j) { a = i; b = j; }
    T(const T &r){
        a = r.a; b = r.b;
        n++;
    }
};
int T::n = 0;
T ret_obj(const T& t){
    return t;
}
void pass_obj(T t){
    ;
}
int main(){
    T t1(1, 2), t2(3, 4);
    ret_obj(t1);
    pass_obj(t1);
    cout << T::n;
    return 0;
}'''
got = run(src)
assert got == "2" and bank["23B-B-Q9"]["correctId"] == "c" and bank_opt("23B-B-Q9", "c").strip() == "2", got
print("23B-B-Q9 ->", got)

# 25B-A-Q11: run as printed
src = '''class A
{
public:
   int x;

   A() { x = 10; }
   A(const A& a){x=a.x+1;}

   A f() {
      x++;
      return *this;
   }
};

int main()
{
   A obj;
   obj.f().f();
   cout << obj.x << endl;
   return 0;
}'''
got = run(src)
assert got == "11" and bank["25B-A-Q11"]["correctId"] == "b" and bank_opt("25B-A-Q11", "b").strip() == "11", got
print("25B-A-Q11 ->", got)

missing = sorted(set(Q) - done)
assert not missing, "unchecked questions: %s" % missing
import shutil; shutil.rmtree(TMP, ignore_errors=True)
print("ALL OK: %d authored questions + %d bank questions machine-checked" % (len(done), len(BANK)))
