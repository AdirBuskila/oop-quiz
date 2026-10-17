"""Re-run every 22B-B harness with clang++ (c++17). Usage: PYTHONUTF8=1 py tools/verify/22B-B/run_all.py
The paper is a graded student scan; every answer is checked against these runs (see note per item in gen_22B-B.py).
Expected: Q1=1 line Q2=1 Q3=by reference Q4=10/1 Q5=compile error Q6=2 lines Q7=0 Q8=~My only Q9=1 3 4 5 Q10=compile error Q11=47 Q12=c Q14=3 Q15=1 line"""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
jobs = [(f, []) for f in sorted(D.glob("q*.cpp"))]
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
