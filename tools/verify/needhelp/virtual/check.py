"""Machine check for the guided course virtual (courses/virtual/C01..C07).
Run: PYTHONUTF8=1 py tools/verify/needhelp/virtual/check.py
Every stored answer is re-derived with clang++ (-std=c++17):
  * 'run'   questions: the code block in the stem is compiled and run as printed; stdout must equal the correct option,
            and no wrong option may equal it.
  * 'multi' questions: concept claims are checked by small harness programs (compile errors, observed output,
            type traits); the correct option text is asserted against an expected string.
  * boss bankIds: each exam program is compiled and run (void main -> int main) and compared with the bank key.
Nothing here relies on UB: deleting a derived object through a base pointer without a virtual destructor is never run;
C05-Q5 (answer 'undefined behaviour') is backed by std::has_virtual_destructor<Base> == false, and the C05-Q6
distractor 'virtual ~Circle only' by the same trait on Shape."""
import json, pathlib, re, subprocess, tempfile, shutil

APP = pathlib.Path(__file__).resolve().parents[4]
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
PRE = "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n"
TMP = pathlib.Path(tempfile.mkdtemp(prefix="tmp_oop_virtual_chk_"))

def compile_run(src):
    f = TMP / "t.cpp"; f.write_text(src, encoding="utf-8")
    exe = TMP / "t.exe"
    if exe.exists(): exe.unlink()
    r = subprocess.run([CXX, "-std=c++17", "-w", str(f), "-o", str(exe)], capture_output=True, text=True)
    if r.returncode != 0: return "CERR", r.stderr
    p = subprocess.run([str(exe)], capture_output=True, text=True, timeout=20)
    assert p.returncode == 0, "nonzero exit " + str(p.returncode)
    return "OK", re.sub(r"\s+", " ", p.stdout).strip()

def run(src):
    s, o = compile_run(PRE + src); assert s == "OK", o; return o
def cerr(src):
    return compile_run(PRE + src)[0] == "CERR"

js = "const {load}=require('./tools/course_load.js');const L=load(process.cwd());process.stdout.write(JSON.stringify(L.levels.filter(e=>e.courseId==='virtual').map(e=>e.level)))"
out = subprocess.run(["node", "-e", js], cwd=str(APP), capture_output=True, text=True, encoding="utf-8")
assert out.returncode == 0, out.stderr
levels = json.loads(out.stdout)
Q = {q["id"]: q for L in levels for q in L["questions"] if "id" in q}
BANK = [q["bankId"] for L in levels for q in L["questions"] if "bankId" in q]
raw = json.loads((APP / "questions.json").read_text(encoding="utf-8"))
bank = {x["id"]: x for x in (raw["questions"] if isinstance(raw, dict) else raw)}

def opt(q, oid): return next(o["value"] for o in q["options"] if o["id"] == oid)
def strip_ticks(v): return re.sub(r"\s+", " ", v.strip("`").strip())
def code_of(q): return re.search(r"```cpp\n(.*?)\n```", q["question"], re.S).group(1)

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
    q = Q[qid]; assert ok, qid
    assert opt(q, q["correctId"]) == expect_value, (qid, opt(q, q["correctId"]), expect_value)
    done.add(qid); print("multi", qid, "->", expect_value)

RUN_IDS = ["C01-Q1","C01-Q2","C01-Q3","C01-Q4","C02-Q1","C02-Q2","C02-Q3","C02-Q4","C02-Q5",
           "C03-Q1","C03-Q2","C03-Q3","C03-Q4","C03-Q5","C04-Q1","C04-Q2","C04-Q4","C04-Q6",
           "C05-Q1","C05-Q2","C05-Q3","C05-Q4","C06-Q1","C06-Q2","C06-Q4"]
for qid in RUN_IDS: check_run(qid)

# the compile-error stems really fail to compile
for qid in ["C04-Q3", "C04-Q5"]:
    assert cerr(code_of(Q[qid])), qid

# C01-Q5: only the unqualified call through a pointer to the base dispatches dynamically (B), the rest give A
r = run('''struct A { virtual void f() { cout << "A"; } };
struct B : A { void f() { cout << "B"; } };
int main() { B b;
  A* p = &b; p->f(); cout << " ";
  A a = b; a.f(); cout << " ";
  b.A::f(); cout << " ";
  p->A::f(); }''')
assert r == "B A A A", r
check_multi("C01-Q5", True, "`A* p = &b; p->f();`")

# C04-Q3: removing override makes it compile (so the error is exactly the override check)
assert cerr("struct A { virtual void f(int) { } };\nstruct B : A { void f(long) override { } };\nint main() { B b; b.f(1); }")
assert not cerr("struct A { virtual void f(int) { } };\nstruct B : A { void f(long) { } };\nint main() { B b; b.f(1); }")
check_multi("C04-Q3", True, "שגיאת קומפילציה, כי `B::f(long)` לא דורסת שום פונקציה של `A`")

# C04-Q5: y.f(1,2) is an error (hidden), the same call through X* is fine and prints X2
r = run('struct X { virtual void f(int) {} virtual void f(int,int) { cout << "X2"; } };\nstruct Y : X { void f(int) {} };\nint main() { Y y; X* p = &y; p->f(1,2); }')
assert r == "X2", r
check_multi("C04-Q5", True, "שגיאת קומפילציה, כי `Y::f` מסתירה את `f(int, int)` של `X`")

# C05-Q5/Q6: the standard trait. No deletion through a base pointer is executed here.
r = run('''#include <type_traits>
struct Base { };               struct Derived : Base { int* p; };
struct Shape { virtual double area() { return 0; } };
struct Circle : Shape { virtual ~Circle() {} };
struct Shape2 { virtual double area() { return 0; } virtual ~Shape2() {} };
int main() {
    cout << has_virtual_destructor<Base>::value << has_virtual_destructor<Shape>::value
         << has_virtual_destructor<Circle>::value << has_virtual_destructor<Shape2>::value;
}''')
assert r == "0011", r   # Base: no (delete via Base* is UB); Shape: no even though Circle has one; Shape2: yes
check_multi("C05-Q5", True, "התנהגות לא מוגדרת (UB)")
check_multi("C05-Q6", True, "`virtual ~Shape() {}` ב-`Shape`")

# C06-Q3: virtual constructor is a compile error, the other three are fine
assert cerr("struct A { virtual A() {} };\nint main() {}")
assert not cerr("struct A { virtual ~A() {} virtual void f() const {} virtual void g() {} };\nint main() {}")
check_multi("C06-Q3", True, "בנאי")

# C06-Q5: same line, different objects, different versions only with virtual (and not otherwise)
r = run('''struct S { virtual void draw() { cout << "S"; } };
struct C : S { void draw() { cout << "C"; } };
struct R : S { void draw() { cout << "R"; } };
void go(S* s) { s->draw(); }
struct N { void draw() { cout << "N"; } };
struct M : N { void draw() { cout << "M"; } };
void go2(N* s) { s->draw(); }
int main() { C c; R r; go(&c); go(&r); cout << " "; M m; N n; go2(&m); go2(&n); }''')
assert r == "CR NN", r
check_multi("C06-Q5", True, "כש-`draw` וירטואלית ב-`Shape`, ו-`s` יכול להצביע על אובייקטים מנגזרות שונות")

# ---- boss (bank) questions: compile the exam program as printed (void main -> int main) and compare with the key
for i in BANK:
    b = bank[i]
    assert not b.get("hold"), i
    assert b["correctId"] in [o["id"] for o in b["options"]], i
    src = code_of(b)
    src = re.sub(r"^\s*\d+\.\s", "", src, flags=re.M)
    assert "delete " not in src, (i, "bank question uses delete: possible UB")
    src = src.replace("void main", "int main")
    got = run(src)
    key = re.sub(r"\s+", " ", opt(b, b["correctId"]).strip("`").strip())
    assert got == key, (i, got, key)
    for o in b["options"]:
        if o["id"] != b["correctId"]:
            assert re.sub(r"\s+", " ", o["value"].strip("`").strip()) != got, (i, "wrong option matches", o["value"])
    print("bank ", i, "->", got)
print("boss ids:", BANK)

missing = sorted(set(Q) - done)
assert not missing, "unchecked questions: %s" % missing
shutil.rmtree(TMP, ignore_errors=True)
print("ALL OK: %d authored questions + %d bank questions machine-checked" % (len(done), len(BANK)))
