"""Tiny clang++ helper shared by the verify harnesses (ASCII output only).
`void main` is rewritten to `int main` (MSVC accepts it, clang rejects it); nothing else is changed."""
import subprocess, pathlib, re, tempfile, os
CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
_tmp = pathlib.Path(tempfile.gettempdir())

def _prep(src):
    return re.sub(r"\bvoid\s+main\b", "int main", src)

def compile_(src, std="c++17", name="tmp_transcriber_v_22S-B"):
    p = _tmp / (name + ".cpp"); e = _tmp / (name + ".exe")
    p.write_text(_prep(src), encoding="utf-8")
    if e.exists(): e.unlink()
    r = subprocess.run([CXX, "-std=" + std, "-Wno-everything", str(p), "-o", str(e)], capture_output=True, text=True)
    return r.returncode == 0, r.stderr, e

def run(src, std="c++17"):
    """Returns ('COMPILE_ERROR', stderr) or ('OK', stdout)."""
    ok, err, e = compile_(src, std)
    if not ok: return "COMPILE_ERROR", err
    r = subprocess.run([str(e)], capture_output=True, text=True)
    return "OK", r.stdout

def err_lines(src, std="c++17"):
    """Set of 1-based source line numbers that carry a compile error."""
    p = _tmp / "tmp_transcriber_l_22S-B.cpp"
    p.write_text(_prep(src), encoding="utf-8")
    r = subprocess.run([CXX, "-std=" + std, "-fsyntax-only", "-Wno-everything", str(p)], capture_output=True, text=True)
    return {int(m.group(1)) for m in re.finditer(r"\.cpp:(\d+):\d+: error", r.stderr)}

def tagged_errors(src, std="c++17"):
    """Errors mapped to `// L<n>` tags on the erroring lines; returns sorted tags (untagged error lines show as 'U<line>')."""
    lines = src.split("\n"); out = set()
    for ln in err_lines(src, std):
        m = re.search(r"//\s*L(\d+)", lines[ln - 1])
        out.add(int(m.group(1)) if m else "U%d" % ln)
    return sorted(out, key=str)

def compiles(src, std="c++17"):
    return compile_(src, std)[0]
