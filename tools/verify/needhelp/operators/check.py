"""Machine check for the guided course operators (courses/operators/C01..C07).
Run: PYTHONUTF8=1 py tools/verify/needhelp/operators/check.py
Every stored answer is re-derived with clang++ (-std=c++17):
  * 'run'     questions: the code block in the stem is compiled and run as printed; stdout must equal the correct
              option and no wrong option may equal it.
  * 'compile' questions ("which line/declaration compiles" / "which does not"): EVERY option is compiled inside its
              own harness program; exactly one option may have the asked-for status, and it must be the stored key.
  * 'claim'   questions: small harness programs check the concept (compile error / observed output) and the stored
              option text is asserted.
  * boss bankIds: each bank question is reproduced (every option compiled when the question is about compiling) and
              the bank key is compared; none may be held."""
import json, pathlib, re, subprocess, tempfile

APP = pathlib.Path(__file__).resolve().parents[4]
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
PRE = "#include <iostream>\n#include <string>\n#include <sstream>\nusing namespace std;\n"
TMP = pathlib.Path(tempfile.mkdtemp(prefix="tmp_oop_operators_chk_"))

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
def ok(src): return compile_run(PRE + src)[0] == "OK"
def cerr(src): return compile_run(PRE + src)[0] == "CERR"

js = "const {load}=require('./tools/course_load.js');const L=load(process.cwd());process.stdout.write(JSON.stringify(L.levels.filter(e=>e.courseId==='operators').map(e=>e.level)))"
out = subprocess.run(["node", "-e", js], cwd=str(APP), capture_output=True, text=True, encoding="utf-8")
assert out.returncode == 0, out.stderr
levels = json.loads(out.stdout)
Q = {q["id"]: q for L in levels for q in L["questions"] if "id" in q}
BANK = [q["bankId"] for L in levels for q in L["questions"] if "bankId" in q]
raw = json.loads((APP / "questions.json").read_text(encoding="utf-8"))
bank = {x["id"]: x for x in (raw["questions"] if isinstance(raw, dict) else raw)}

def opt(q, oid): return next(o["value"] for o in q["options"] if o["id"] == oid)
def tick(v): return v.strip("`").strip()
def code_of(q): return re.search(r"```cpp\n(.*?)\n```", q["question"], re.S).group(1)

done = set()
def check_run(qid):
    q = Q[qid]; got = run(code_of(q)); right = tick(opt(q, q["correctId"]))
    assert got == right, (qid, got, right)
    for o in q["options"]:
        if o["id"] != q["correctId"]:
            assert tick(o["value"]) != got, (qid, "wrong option equals real output", o["value"])
    done.add(qid); print("run    ", qid, repr(got))

def check_compile(qid, builder, want="OK"):
    """builder(option_value_without_ticks, option_id) -> program. Exactly one option has status `want`."""
    q = Q[qid]; hits = []
    for o in q["options"]:
        prog = builder(tick(o["value"]), o["id"])
        st = compile_run(PRE + prog)[0]
        if st == want: hits.append(o["id"])
    assert hits == [q["correctId"]], (qid, "options with status", want, hits, "stored", q["correctId"])
    done.add(qid); print("compile", qid, "only", hits[0], "has status", want)

def check_claim(qid, cond, expect_value):
    q = Q[qid]; assert cond, qid
    assert opt(q, q["correctId"]) == expect_value, (qid, opt(q, q["correctId"]), expect_value)
    done.add(qid); print("claim  ", qid, "->", expect_value)

for qid in ["C01-Q1", "C01-Q2", "C01-Q5", "C02-Q2", "C03-Q1", "C03-Q3", "C03-Q4",
            "C04-Q1", "C04-Q3", "C04-Q4", "C04-Q5", "C05-Q1", "C05-Q3", "C06-Q1", "C06-Q4"]:
    check_run(qid)

# ---- C01
VBASE = "struct V { int x; V(int a) : x(a) {} V operator+(const V& o) const { return V(x + o.x); } };\n"
check_compile("C01-Q3", lambda v, i: VBASE + "int main() { V a(1), b(2); " + v + " }", want="CERR")
check_compile("C01-Q4", lambda v, i: "struct V { int x; V(int a = 0) : x(a) {} " + v + " { return V(); } };\nint main() { V a, b; V c = a * b; }")

# ---- C02
check_compile("C02-Q1", lambda v, i: "struct V { int x; };\nV operator+(int k, const V& v) { return v; }\nint main() { V a{1}; (void)(" + v + "); }")
check_claim("C02-Q3", cerr("class Box { int w; public: Box(int x) : w(x) {} };\nbool operator==(const Box& a, const Box& b) { return a.w == b.w; }\nint main() { Box p(1), q(1); cout << (p == q); }")
            and run("class Box { int w; public: Box(int x) : w(x) {} friend bool operator==(const Box&, const Box&); };\nbool operator==(const Box& a, const Box& b) { return a.w == b.w; }\nint main() { Box p(1), q(1); cout << (p == q); }") == "1"
            and ok("struct B { int w = 1; };\nbool operator==(const B& a, const B& b) { return a.w == b.w; }\nint main() { B p, q; cout << (p == q); }"),
            "שגיאת קומפילציה: הפונקציה החיצונית ניגשת לשדה פרטי ללא `friend`")
FR = "class V { int x; public: V(int a = 0) : x(a) {} friend V operator+(const V& a, const V& b) { return V(a.x + b.x); } };\n"
check_compile("C02-Q4", lambda v, i: FR + "int main() { V a(1), b(2); (void)(" + v + "); }")
GL = {"+": "V operator+(const V& a, const V& b) { return a; }", "==": "bool operator==(const V& a, const V& b) { return true; }",
      "<<": "ostream& operator<<(ostream& os, const V& b) { return os; }", "=": "V& operator=(V& a, const V& b) { return a; }"}
check_compile("C02-Q5", lambda v, i: "struct V {};\n" + GL[v] + "\nint main() {}", want="CERR")

# ---- C03
X1 = "struct X { int v = 1; };\n"
C3 = {"a": X1 + "ostream& operator<<(ostream& os, const X& x) { return os << x.v; }",
      "b": X1 + "void operator<<(ostream& os, const X& x) { os << x.v; }",
      "c": "struct X { int v = 1; ostream& operator<<(ostream& os) const { return os << v; } };",
      "d": X1 + "ostream operator<<(ostream os, const X& x) { return os; }"}
check_compile("C03-Q2", lambda v, i: C3[i] + "\nint main() { X a, b; cout << a << b; }")
# C03 lesson trap: member version does not allow cout << x, and a single print works with void
assert cerr(C3["c"] + "\nint main() { X a; cout << a; }") and ok(C3["b"] + "\nint main() { X a; cout << a; }")
check_compile("C03-Q5", lambda v, i: "class X { int v; public: X(int a) : v(a) {} int get() const { return v; } };\n"
              "ostream& operator<<(ostream& os, const X& x) { return os << " + v + "; }\nint main() { X x(3); cout << x; }")

# ---- C04
check_compile("C04-Q2", lambda v, i: "struct C { int n = 0; C& operator++() { ++n; return *this; } };\nint main() { C c; " + v + " }", want="CERR")

# ---- C05
check_compile("C05-Q2", lambda v, i: "struct X { explicit X(int a) {} };\nint main() { " + v + " }", want="CERR")
assert cerr("struct X { int v; explicit X(int a = 0) : v(a) {} };\nX operator+(const X& a, const X& b) { return X(a.v + b.v); }\nint main() { X a(2); (void)(5 + a); }")
check_compile("C05-Q4", lambda v, i: "struct X { explicit X(int) {} };\nvoid f(X x) {}\nint main() { " + v + " }")
check_compile("C05-Q5", lambda v, i: "struct A { A(int) {} };\nstruct B { B(const A&) {} };\nint main() { " + v + " }", want="CERR")

# ---- C06
check_compile("C06-Q2", lambda v, i: "class Temp { double c; public: Temp(double x) : c(x) {} " + re.sub(r" \(.*\)$", "", v) + " };\nint main() { Temp t(3); double d = t; }")
check_compile("C06-Q3", lambda v, i: "struct S { explicit operator bool() const { return true; } };\nint main() { S s; " + v + " }", want="CERR")
assert ok("struct S { explicit operator bool() const { return true; } };\nint main() { S s; if (s) {} bool c = !s; bool d = s && true; }")
check_compile("C06-Q5", lambda v, i: "struct S { " + v + " { return 1; } };\nint main() { S s; int n = s; }")

# ---- boss: bank keys
for i in BANK:
    b = bank[i]; assert not b.get("hold"), i
    assert b["correctId"] in [o["id"] for o in b["options"]], i
print("boss ids:", BANK)
def bopt(i, oid): return next(o["value"] for o in bank[i]["options"] if o["id"] == oid)

# 18A-B-Q7: 2 << x needs an external operator<<(int, X); a member one cannot help
assert cerr("class X {};\nstruct Y { Y& operator<<(int) { return *this; } };\nint main() { Y x; 2 << x; }")
assert cerr("class X { public: int operator<<(int a, X b) { return 0; } };\nint main() {}")
assert ok("class X {};\nint operator<<(int a, X b) { return 0; }\nint main() { X x; 2 << x; }")
assert bank["18A-B-Q7"]["correctId"] == "c" and "מחוץ" in bopt("18A-B-Q7", "c")
print("18A-B-Q7 key c")

# 19A-B-Q23: operator<< outside X, friend not necessary
assert cerr("class X {};\nstruct Z { ostream& operator<<(ostream& os) { return os; } };\nint main() { Z z; cout << z; }")
assert ok("class X { public: int v = 1; };\nostream& operator<<(ostream& os, const X& x) { return os << x.v; }\nint main() { X x; cout << x; }")
assert bank["19A-B-Q23"]["correctId"] == "c" and "לא בהכרח" in bopt("19A-B-Q23", "c")
print("19A-B-Q23 key c")

# 22B-B-Q11: 47
src = re.search(r"```cpp\n(.*?)\n```", bank["22B-B-Q11"]["question"], re.S).group(1)
assert run(src) == "47" and bopt("22B-B-Q11", bank["22B-B-Q11"]["correctId"]).strip("`") == "47"
print("22B-B-Q11 key 47")

# 21S-B-Q16: exactly two errors (a++ and cout << a)
BA = "class A { int n; public: A(int nn = 0) { n = nn; } A &operator ++() { ++n; return *this; } };\n"
assert ok(BA + "int main() { A a(5); A b = ++a; }")
assert cerr(BA + "int main() { A a(5); A c(a++); }")
assert cerr(BA + "int main() { A a(5); cout << a; }")
s, e = compile_run(PRE + BA + "int main() { A a(5); A b=++a; A c(a++); cout << a; return 1; }")
assert s == "CERR" and len(re.findall(r"error:", e)) == 2, e
assert bopt("21S-B-Q16", bank["21S-B-Q16"]["correctId"]).strip("`") == "2"
print("21S-B-Q16 key 2")

# 21B-A-Q7: 0 errors
assert ok("class A { public: A(int i) {x=i;} operator int() {return x;} int x; };\nint main() { A a1(5); int i=3; A a2=i; i=a1; i=(int) a1; a1=(A)i; }")
assert bopt("21B-A-Q7", bank["21B-A-Q7"]["correctId"]).strip("`") == "0"
print("21B-A-Q7 key 0")

# 22B-B-Q15: exactly one error (b1 = a1)
BQ = "class A { public: A(int i = 0) { nA = i; } int nA; };\nclass B { public: B(int i = 0) { nB = i; } operator A() { return A(nB); } int nB; };\n"
assert ok(BQ + "int main() { A a1; B b1; a1 = b1; }")
assert cerr(BQ + "int main() { A a1; B b1; b1 = a1; }")
assert bopt("22B-B-Q15", bank["22B-B-Q15"]["correctId"]).strip("`") == "1"
print("22B-B-Q15 key 1")

missing = [q for q in Q if q not in done]
print("not individually machine-checked:", missing)
assert not missing, missing
print("ALL OK")
