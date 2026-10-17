"""Re-run every 25S-A harness with clang++ (c++17). Usage: PYTHONUTF8=1 py tools/verify/25S-A/run_all.py
Output-type questions are compiled and run; count-type questions report the error lines.
Expected (official key, version 1 sheet): Q2=2 Q3='1 3 2' Q4=2 Q5='B D ~D ~B' Q6='B1 B2 D ~D ~B2 ~B1' Q7=4 Q8=2or3 Q9=3
Q10='0 1 2 3 4' Q11='1 2' Q12=2 Q13='0 A 22' Q14=option b Q15=1 Q16=1 Q17=return-type overload is an error.
Q1: key (b/c) DISAGREES: the program does not compile (ambiguous b1 = a1) -> hold."""
import subprocess, pathlib, re, sys
D = pathlib.Path(__file__).parent
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
for f in sorted(D.glob("q*.cpp")):
    exe = D / (f.stem + ".exe")
    r = subprocess.run([CXX, "-std=c++17", "-Wno-everything", str(f), "-o", str(exe)], capture_output=True, text=True)
    lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
    if r.returncode != 0:
        print(f.name, "COMPILE ERRORS on lines", lines)
        continue
    out = subprocess.run([str(exe)], capture_output=True, text=True).stdout
    print(f.name, "RUN:", repr(out))
    exe.unlink()
