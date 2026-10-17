"""Re-run every 25B-A harness with clang++ (c++17). ASCII output. Usage: PYTHONUTF8=1 py tools/verify/25B-A/run_all.py
Derived keys: Q2 0 errors(a)  Q4 2 errors(c)  Q5 'A(I) C(x) B(C->B) A(C->A) A(s) A(g) A(sg)'(c)  Q6 42(b)  Q7 4 + 6i(a)  Q8 -2 -1 -5(b)
Q9 12 10(a)  Q10 b (undefined behaviour: delete through a base pointer without a virtual destructor)  Q11 11(b)  Q12 ambiguous(d)
Q13 does not compile(c)  Q14 0 errors(a)  Q16 BBB(c)  Q17 1 error(b).  Q1, Q3, Q15 are concept questions (Q3 d: A() is private)."""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
for f in sorted(D.glob("q*.cpp")):
    exe = D / (f.stem + ".exe")
    r = subprocess.run([CXX, "-std=c++17", "-Wno-everything", str(f), "-o", str(exe)], capture_output=True, text=True)
    lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
    if r.returncode != 0:
        msgs = sorted(set(re.findall(r"error: (.*)", r.stderr)))
        print(f.name, "COMPILE error lines", lines, "|", "; ".join(m[:70] for m in msgs)[:220])
        continue
    p = subprocess.run([str(exe)], capture_output=True, text=True)
    print(f.name, "RUN rc=%d" % p.returncode, repr(p.stdout))
    exe.unlink()
