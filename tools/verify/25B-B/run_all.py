"""Re-run every 25B-B harness with clang++ (c++17; -O0 and -O2 for q05/q17). ASCII output.
Usage: PYTHONUTF8=1 py tools/verify/25B-B/run_all.py
Derived keys: Q1 d  Q2 a  Q3 b  Q4 a  Q5 HELD(double delete)  Q6 b  Q7 d  Q8 d  Q9 a (typo corrected)  Q10 b
Q15 b  Q16 d (copy ctor by value does not compile)  Q17 b.  Q11-Q14 are concept questions (no harness)."""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
for f in sorted(D.glob("q*.cpp")):
    for opt in ([("-O0",), ("-O2",)] if f.stem in ("q05", "q17") else [("-O0",)]):
        exe = D / (f.stem + ".exe")
        r = subprocess.run([CXX, "-std=c++17", "-Wno-everything", *opt, str(f), "-o", str(exe)], capture_output=True, text=True)
        lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
        if r.returncode != 0:
            msgs = sorted(set(re.findall(r"error: (.*)", r.stderr)))
            print(f.name, opt, "COMPILE error lines", lines, "|", "; ".join(m[:70] for m in msgs)[:200])
            continue
        p = subprocess.run([str(exe)], capture_output=True, text=True)
        print(f.name, opt, "RUN rc=%d" % p.returncode, repr(p.stdout))
        exe.unlink()
