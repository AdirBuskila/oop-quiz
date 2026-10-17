"""Re-run every 21S-B harness with clang++ (c++17). Usage: PYTHONUTF8=1 py tools/verify/21S-B/run_all.py
The paper is a graded student scan; every answer is derived from these runs (see note per item in gen_21S-B.py).
Expected: Q1=b Q2=2 lines Q3=b Q7=compile error Q9=compile error Q11=c Q13='10 20' Q14=see note Q15=compile error Q16=2 Q17=see note Q18=33333 Q19=a Q20=136"""
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
