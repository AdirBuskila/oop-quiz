"""Count compile-error lines in a clang++ run (full file, and per marked line when markers exist). ASCII output."""
import subprocess, sys, re, pathlib
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
def errs(path, extra=()):
    r = subprocess.run([CXX, "-std=c++17", "-fsyntax-only", "-Wno-everything", path, *extra], capture_output=True, text=True)
    return sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)}), r.stderr
for f in sys.argv[1:]:
    p = pathlib.Path(f)
    lines, err = errs(str(p))
    print(f, "error lines:", lines)
    for l in err.splitlines():
        if "error" in l: print("   ", l.split("error:")[-1].strip()[:110], "@", l.split(":")[1] if ":" in l else "")
