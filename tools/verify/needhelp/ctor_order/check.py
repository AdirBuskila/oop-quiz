"""Machine check for the guided course ctor_order (courses/ctor_order/C01..C07).
Run: PYTHONUTF8=1 py tools/verify/needhelp/ctor_order/check.py
Every stored answer is re-derived with clang++ (-std=c++17):
  * 'run'   questions: the code block in the stem is compiled and run as printed; stdout (whitespace collapsed)
            must equal the correct option, and no wrong option may equal it.
  * 'multi' questions: concept claims checked by small harness programs (compile error / observed output).
  * boss bankIds: each bank program is compiled and run (void main -> int main, ASCII quotes); the output must
    equal the keyed option and no other option.
No question here depends on UB or on copy elision: there is no delete through a non-virtual base, no by-value
return/pass of class objects, and no uninitialised read (init-list order is observed through printing calls)."""
import json, pathlib, re, subprocess, tempfile, shutil

APP = pathlib.Path(__file__).resolve().parents[4]
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
PRE = "#include <iostream>\n#include <vector>\nusing namespace std;\n"
TMP = pathlib.Path(tempfile.mkdtemp(prefix="tmp_oop_ctor_order_chk_"))

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
    return compile_run(PRE + src)[0] == "CERR"

js = "const {load}=require('./tools/course_load.js');const L=load(process.cwd());process.stdout.write(JSON.stringify(L.levels.filter(e=>e.courseId==='ctor_order').map(e=>e.level)))"
out = subprocess.run(["node", "-e", js], cwd=str(APP), capture_output=True, text=True, encoding="utf-8")
assert out.returncode == 0, out.stderr
levels = json.loads(out.stdout)
assert len(levels) == 7 and levels[-1].get("boss") is True and not any(l.get("boss") for l in levels[:-1])
Q = {q["id"]: q for L in levels for q in L["questions"] if "id" in q}
BANK = [q["bankId"] for L in levels for q in L["questions"] if "bankId" in q]
raw = json.loads((APP / "questions.json").read_text(encoding="utf-8"))
bank = {x["id"]: x for x in (raw["questions"] if isinstance(raw, dict) else raw)}

def opt(q, oid):
    return next(o["value"] for o in q["options"] if o["id"] == oid)

def norm(v):
    return re.sub(r"\s+", " ", v.replace("```", " ").replace("`", "")).strip()

def code_of(q):
    return re.search(r"```cpp\n(.*?)\n```", q["question"], re.S).group(1)

done = set()
def check_run(qid):
    q = Q[qid]; got = run(code_of(q))
    right = norm(opt(q, q["correctId"]))
    assert got == right, (qid, got, right)
    for o in q["options"]:
        if o["id"] != q["correctId"]:
            assert norm(o["value"]) != got, (qid, "wrong option equals real output", o["value"])
    assert len(set(norm(o["value"]) for o in q["options"])) == len(q["options"]), qid
    done.add(qid); print("run  ", qid, repr(got))

def check_multi(qid, ok, expect_value):
    q = Q[qid]
    assert ok, qid
    assert opt(q, q["correctId"]) == expect_value, (qid, opt(q, q["correctId"]), expect_value)
    done.add(qid); print("multi", qid, "->", expect_value)

for qid in sorted(Q):
    if qid in ("C01-Q6", "C02-Q5", "C06-Q4"):
        continue
    check_run(qid)

# every run question must be free of UB constructs we promised not to use
for qid, q in Q.items():
    c = q["question"]
    assert "operator=" not in c and "return t;" not in c, qid

# C01-Q6: base without default ctor, derived does not call another one -> compile error
assert cerr('struct A { A(int n) { cout << "A "; } };\nstruct B : A { B() { cout << "B "; } };\nint main() { B b; }')
assert run('struct A { A(int n) { cout << "A "; } };\nstruct B : A { B() : A(1) { cout << "B "; } };\nint main() { B b; }') == "A B"
check_multi("C01-Q6", True, "שגיאת קומפילציה: ל-`A` אין בנאי ברירת מחדל ו-`B` לא קוראת לבנאי אחר שלו")

# C02-Q5: member without default ctor must be in the init list
assert cerr('struct M { M(int n) { cout << "M "; } };\nstruct D { M m; D() { cout << "D "; } };\nint main() { D d; }')
assert run('struct M { M(int n) { cout << "M "; } };\nstruct D { M m; D() : m(5) { cout << "D "; } };\nint main() { D d; }') == "M D"
check_multi("C02-Q5", True, "שגיאת קומפילציה: אין ל-`M` בנאי ברירת מחדל, והשדה `m` לא מאותחל ברשימת האתחול")

# C06-Q4: only a virtual destructor in the base makes delete-through-base run ~D; constructors cannot be virtual
r = run('''struct B { B() {} virtual ~B() { cout << "~B "; } };
struct D : B { ~D() { cout << "~D "; } };
int main() { B* p = new D; delete p; }''')
assert r == "~D ~B", r
assert cerr("struct B { virtual B() {} };\nint main() {}")
assert cerr("struct B { B() {} virtual ~B() {} };\nstruct D : B { virtual D() {} };\nint main() {}")
check_multi("C06-Q4", True, "להוסיף `virtual` להורס של `B`")

# ---- boss (bank) questions: run each program as printed and compare with the bank key
def bank_code(b):
    m = re.search(r"```cpp\n(.*?)\n```", b["question"], re.S)
    c = m.group(1)
    c = c.replace("void main", "int main").replace("\u201c", '"').replace("\u201d", '"')
    return c

for i in BANK:
    b = bank[i]
    assert not b.get("hold"), i
    assert b["topic"] == "construction_order", i
    got = run(bank_code(b))
    keyed = norm(next(o["value"] for o in b["options"] if o["id"] == b["correctId"]))
    # the 22S/25B style options may differ in letter case of one word; compare exactly
    assert got == keyed, (i, got, keyed)
    for o in b["options"]:
        if o["id"] != b["correctId"]:
            assert norm(o["value"]) != got, (i, "another option equals the output", o["id"])
    print("bank ", i, "key", b["correctId"], "->", got)

missing = sorted(set(Q) - done)
assert not missing, "unchecked questions: %s" % missing
shutil.rmtree(TMP, ignore_errors=True)
print("ALL OK: %d authored questions + %d bank questions machine-checked" % (len(done), len(BANK)))
