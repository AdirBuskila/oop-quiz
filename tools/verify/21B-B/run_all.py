"""Re-run every 21B-B harness with clang++ (c++17). Usage: PYTHONUTF8=1 py tools/verify/21B-B/run_all.py
The paper has no key; every answer is derived from these runs (see note per item in gen_21B-B.py).
Expected: Q2='1012' Q4=nothing Q6=compile error Q7='4' Q8='12' Q11='d = 20' Q12=a Q14='00' Q15='025' Q16='223' Q17=1 line Q19=a,b,d all print 1 Q20='32'
Concept probes: q01 (variants a/b/c of Q1), q03 (member operator<< cannot take cout on the left), q05, q09, q10, q18."""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
jobs = [(f, []) for f in sorted(D.glob("q*.cpp")) if f.stem != "q01_rule"]
jobs += [(D / "q01_rule.cpp", ["-DVARIANT='%s'" % v]) for v in "abcd"]
for f, extra in jobs:
    exe = D / (f.stem + ".exe")
    r = subprocess.run([CXX, "-std=c++17", "-w"] + extra + [str(f), "-o", str(exe)], capture_output=True, text=True)
    tag = f.name + " " + " ".join(extra)
    if r.returncode != 0:
        lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
        print(tag, "COMPILE ERRORS on lines", lines)
        continue
    out = subprocess.run([str(exe)], capture_output=True, text=True).stdout
    print(tag, "RUN:", repr(out))
    exe.unlink()
