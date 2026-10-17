"""Re-run every 22B-A harness with clang++ (c++17). Usage: PYTHONUTF8=1 py tools/verify/22B-A/run_all.py
The paper has no key; every answer is derived from these runs (see note per item in gen_22B-A.py).
Expected: Q1=c Q2=g(the 10-line listing) Q3=a Q4=a Q5=a(compile error) Q6=held (depends on copy elision) Q7=a Q8=2 lines Q9=c Q10=0 Q11/Q12=run Q13=90 Q14=a Q15=c"""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
jobs = [(f, []) for f in sorted(D.glob("q*.cpp"))]
jobs += [(D / "q06.cpp", ["-fno-elide-constructors"])]
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
