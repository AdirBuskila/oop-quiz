"""SAMP-18 (2018 sample exam) clang++ verification. Run: PYTHONUTF8=1 py tools/verify/SAMP-18/check.py
No key exists in the source; every key comes from these runs (or from the language rule where noted)."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from cxx import *
PRE = "#include <iostream>\nusing namespace std;\n"
def show(n, what, v): print("Q%02d %s: %s" % (n, what, v))

# Q1: printed code lacks ';' after class C; also try the repaired version
q1 = "class C {\npublic:\n int x;\n void f() {\n  x = 1;\n  y = 2;\n }\nprivate:\n int y;\n}%s\nvoid g() {\n C c;\n c.x = 1;\n c.y = 2;\n}\n"
for semi in ("", ";"):
    s = PRE + q1 % semi
    p = pathlib.Path(tempfile.gettempdir()) / "tmp_transcriber_q1.cpp"; p.write_text(s)
    r = subprocess.run([CXX, "-std=c++17", "-fsyntax-only", str(p)], capture_output=True, text=True)
    show(1, "semi=%r" % semi, [l[-90:] for l in r.stderr.splitlines() if "error" in l])
# Q2
show(2, "run", run(PRE + 'class X {\npublic:\n X() { cout << "."; }\n ~X() { cout << "."; }\n};\nvoid main() {\n X a;\n X *b = new X;\n}'))
# Q3/Q9: which declarations make ++x compile
base = PRE + "class X {\npublic:\n%s\n};\n%s\nint main() { X x; ++x; }"
for name, inm, outm in [("a member no-param", "X& operator++() { return *this; }", ""), ("b free no-param", "", "X& operator++() { static X t; return t; }"),
                        ("c member one-param", "X& operator++(int) { return *this; }", ""), ("d free one-param", "", "X& operator++(X& x) { return x; }")]:
    show(3, name, compiles(base % (inm, outm)))
# Q4: ASan if possible
src4 = PRE + "class X {\npublic:\n X() : arr(new int[1]) {}\n ~X() { delete[] arr; }\n int *arr;\n};\nint main() {\n X a;\n a.arr[0] = 1;\n {\n  X b = a;\n  b.arr[0] = 1;\n }\n a.arr[0] = 1;\n}"
p = pathlib.Path(tempfile.gettempdir()) / "tmp_transcriber_q4.cpp"; p.write_text(src4)
r = subprocess.run([CXX, "-std=c++17", "-fsanitize=address", "-g", str(p), "-o", str(p.with_suffix(".exe"))], capture_output=True, text=True)
show(4, "asan compile rc", r.returncode)
if r.returncode == 0:
    r2 = subprocess.run([str(p.with_suffix(".exe"))], capture_output=True, text=True)
    show(4, "asan run", [l for l in (r2.stdout + r2.stderr).splitlines() if "ERROR" in l or " #" in l][:6])
# Q5
src5 = "class X {\npublic:\n void f() {}\n void g() const {}\n};\nint main() {\n const X a;\n X b;\n a.f(); // L9\n a.g(); // L10\n b.f(); // L11\n b.g(); // L12\n}"
show(5, "tagged errors", tagged_errors(src5.replace("L9", "L9")))
# Q6
for name, body in [("member operator int", "operator int() const { return 1; }"), ("ctor X(int)", "X(int) {}"), ("friend", "friend int conv(X);")]:
    show(6, name, compiles(PRE + "class X {\npublic:\n %s\n};\nint main() { X x; int n = x; }" % body))
# Q7
for line in ("Y() : x(2) {}", "Y() : X(2) {}", "Y() { X x(2); }", "Y() { x = 2; }"):
    show(7, line, compiles("class X {\npublic:\n X(int a) {}\n};\nclass Y {\npublic:\n %s\n X x;\n};\nint main(){}" % line))
# Q8
for opt in ("new X", "X()", "this", "*this"):
    s = PRE + "class X {\npublic:\n X& f() {\n  return %s;\n }\n};\nint main() {\n X x;\n std::cout << (&x == x.f());\n}" % opt
    show(8, opt + " (as printed)", run(s)[0])
    show(8, opt + " (&x == &x.f())", run(s.replace("x.f())", "&x.f())"))) if opt else None
# Q10
src10 = "class X {\n static int x;\n int y;\n void f() {\n  x = 1; // L5\n  y = 1; // L6\n }\n static void g() {\n  x = 1; // L9\n  y = 1; // L10\n }\n};\nint X::x;\nint main(){}"
show(10, "tagged errors", tagged_errors(src10))
# Q11
snips = {"A": "class X {\npublic: X(int n) {}\n};\nclass Y : public X {}%s", "B": "class X {\npublic: X(int n = 0) {}\n};\nclass Y : public X {}%s",
         "C": "class X {\npublic: X(int n) {}\n};\nclass Y : public X {\n Y() : X(0) {}\n}%s", "D": "class X {\npublic: X(int n) {}\n};\nclass Y : public X {\n Y() { X(0); }\n}%s"}
for k, v in snips.items():
    show(11, k, "as printed(no ;)=%s  with ;=%s" % (compiles(v % "\nint main(){}"), compiles(v % ";\nint main(){}")))
# Q12
show(12, "Y derives X", compiles("class X{};\nclass Y : public X {};\nint main(){ Y y; X &x = y; }"))
show(12, "X derives Y (Y is X)", compiles("class Y{};\nclass X : public Y {};\nint main(){ Y y; X &x = y; }"))
show(12, "X has Y field", compiles("class Y{};\nclass X { Y f; };\nint main(){ Y y; X &x = y; }"))
show(12, "Y has X field", compiles("class X{};\nclass Y { X f; };\nint main(){ Y y; X &x = y; }"))
# Q13
for name, body in [("main outside", "int main(){ Y y; y.f = 1; }"), ("in Y method", "class Y2 : public Y { int g() { return f; } };\nint main(){}"),
                   ("inside X via Y obj", "int main(){}")]:
    pass
pre13 = "class X { public: int f; };\nclass Y : private X { public: int g() { return f; } };\n"
show(13, "outside via Y", compiles(pre13 + "int main(){ Y y; y.f = 1; }"))
show(13, "inside Y", compiles(pre13 + "int main(){}"))
show(13, "derived of Y", compiles("class X { public: int f; };\nclass Y : private X {};\nclass Z : public Y { int g() { return f; } };\nint main(){}"))
show(13, "outside via X obj", compiles("class X { public: int f; };\nclass Y : private X {};\nint main(){ X x; x.f = 1; }"))
show(13, "inside X method via Y obj", compiles("class Y;\nclass X { public: int f; int h(Y &y); };\nclass Y : private X {};\nint X::h(Y &y) { return y.f; }\nint main(){}"))
# Q14
show(14, "run", run(PRE + "class X {\npublic:\n virtual void f() { cout << 1; }\n};\nclass Y : public X {\npublic:\n void f() { cout << 2; }\n};\nclass Z : public Y {\npublic:\n void f() { cout << 3; }\n};\nvoid main() {\n Z z;\n Y *p = &z;\n p->f();\n}"))
# Q15
show(15, "empty vector", run(PRE.replace("<iostream>", "<iostream>\n#include <vector>") + "int main(){ vector<int> v; cout << (v.begin()==v.end()); v.push_back(1); cout << (v.begin()==v.end()) << (v.capacity()==v.size()) << v.capacity(); v.push_back(1); v.push_back(1); cout << ' ' << v.size() << ' ' << v.capacity(); }"))
# Q16
show(16, "run", run(PRE + "class X {\npublic:\n X() { cout << 1; }\n ~X() { cout << 2; }\n};\nclass Y {\npublic:\n Y() { cout << 3; }\n ~Y() { cout << 4; }\n};\nvoid main() {\n Y y;\n}"))
# Q17
s17 = PRE + "class X {\npublic:\n X() { cout << 1; }\n virtual ~X() { cout << 2; }\n};\nclass Y {\npublic:\n Y() { cout << 3; }\n ~Y() { cout << 4; }\n};\nvoid main() {\n X *x = new Y;\n delete x;\n}"
r = run(s17); show(17, "as printed", (r[0], r[1][:120].replace("\n", " ")))
s17b = s17.replace("class Y {", "class Y : public X {"); show(17, "Y : public X repaired", run(s17b))
# Q19
for opt in ("n", "X::n", "x.n", "this.n"):
    s = PRE + "class X {\npublic:\n X(int n) { %s = n; }\n int n;\n};\nvoid main() {\n X x(12);\n cout << x.n;\n}" % opt
    show(19, opt, run(s))
# Q20 across standards
src20 = "template<typename T> class X {};\nint main() {\n X x; // L3\n X x(int); // L4\n X x<int>; // L5\n X<int> x; // L6\n}"
for std in ("c++11", "c++14", "c++17", "c++20"):
    show(20, std, tagged_errors(src20, std))
# std sweep for simple answers
for std in ("c++11", "c++14", "c++20"):
    show(5, std, tagged_errors(src5, std)); show(10, std, tagged_errors(src10, std))
# Q20 isolated: each line in its own function so a redeclaration of x cannot add errors
for std in ("c++11", "c++14", "c++17", "c++20"):
    res = {}
    for ln, body in [(3, "X x;"), (4, "X x(int);"), (5, "X x<int>;"), (6, "X<int> x;")]:
        res[ln] = compiles("template<typename T> class X {};\nvoid f() {\n %s\n}\nint main(){}" % body, std)
    show(20, "isolated " + std + " compiles?", res)
