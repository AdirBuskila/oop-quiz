"""Re-run every 24B-B harness with clang++ (c++17). ASCII output.
Usage: PYTHONUTF8=1 py tools/verify/24B-B/run_all.py
Official key (red marks on page 1): Q1 a(0) Q2 c(2) Q3 b Q4 c(2) Q5 a Q6 d(3) Q7 b Q8 c Q9 b Q10 c Q11 c Q12 d Q13 c(2) Q14 a Q15 a Q16 b Q17 d."""
import subprocess, pathlib, re
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
for f in sorted(D.glob("q*.cpp")):
    if f.stem.startswith("q07_"):
        continue
    for std in ("c++17",):
        if not std:
            continue
        exe = D / (f.stem + ".exe")
        r = subprocess.run([CXX, "-std=" + std, "-Wno-everything", str(f), "-o", str(exe)], capture_output=True, text=True)
        lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
        if r.returncode != 0:
            msg = (re.findall(r"error: (.*)", r.stderr) or re.findall(r"(undefined.*)", r.stderr) or [""])[0][:90]
            print(f.name, std, "LINK/COMPILE error lines", lines, "|", msg)
            continue
        p = subprocess.run([str(exe)], capture_output=True, text=True)
        print(f.name, std, "RUN rc=%d" % p.returncode, repr(p.stdout))
        exe.unlink()
# q14_strict is checked separately with: clang++ -std=c++17 -fsyntax-only -Werror=writable-strings q14_strict.cpp  (error: ISO C++11 does not allow conversion from string literal to 'char *')
