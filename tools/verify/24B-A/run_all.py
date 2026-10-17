"""Re-run every 24B-A harness with clang++ (c++17). ASCII output.
Usage: PYTHONUTF8=1 py tools/verify/24B-A/run_all.py
Expected (derived from these runs): Q1 ABAB(c) Q2 3 errors(d) Q3 1(b) Q4 675(d) Q5 1(b) Q6 ABBAC~C~A~B~B~A(b) Q8 2(c) Q9 214(a)
Q10 543210(c) Q11 3(d) Q12 2(b) Q13 line 4(c) Q14 1(b) Q15 no compile(d) Q16 1(b) Q17 a. Q7 held (interpretation)."""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
for f in sorted(D.glob("q*.cpp")):
    exe = D / (f.stem + ".exe")
    r = subprocess.run([CXX, "-std=c++17", "-Wno-everything", str(f), "-o", str(exe)], capture_output=True, text=True)
    lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
    if r.returncode != 0:
        msgs = sorted(set(re.findall(r"error: (.*)", r.stderr)))
        print(f.name, "COMPILE/LINK error lines", lines, "|", "; ".join(m[:60] for m in msgs)[:200])
        continue
    p = subprocess.run([str(exe)], capture_output=True, text=True)
    print(f.name, "RUN rc=%d" % p.returncode, repr(p.stdout))
    exe.unlink()
