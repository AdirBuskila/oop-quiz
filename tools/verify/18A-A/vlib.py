# -*- coding: utf-8 -*-
"""Shared helpers for the oop verify harnesses (copied into each tools/verify/<CODE>/ folder).
The code under test is taken straight out of the generator's question text, so what is compiled is what is shipped.
ASCII output only."""
import importlib.util, pathlib, re, subprocess, tempfile, os

CXX = r"C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++.exe"
TMP = pathlib.Path(tempfile.gettempdir()) / "oop_verify"
TMP.mkdir(exist_ok=True)
NL = chr(10)


def load_gen(code):
    p = pathlib.Path(__file__).resolve().parents[2] / "gen" / ("gen_" + code + ".py")
    spec = importlib.util.spec_from_file_location("gen_" + code.replace("-", "_"), p)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return {q["num"]: q for q in m.questions}


def blocks(text):
    return re.findall(r"```\w*\n(.*?)\n```", text, re.S)


def strip_nums(code):
    return NL.join(re.sub(r"^\s*\d+\.\s", "", l) for l in code.split(NL))


def code_of(q, i=0, nums=False):
    c = blocks(q["question"])[i]
    return strip_nums(c) if nums else c


def fix_main(src):
    """The exams target Visual Studio, which accepts `void main`; clang does not."""
    return re.sub(r"\bvoid\s+main\s*\(", "int main(", src)


def build(src, run=False, std="c++17", timeout=10, name="t", pre=""):
    """Compile (and optionally run). `pre` is placed before a `#line 1` so error lines match the printed numbering."""
    src = fix_main(src)
    if not re.search(r"\bmain\s*\(", src):
        src += NL + "int main() {}"
    f = TMP / (name + ".cpp")
    exe = TMP / (name + ".exe")
    f.write_text(pre + ((NL + "#line 1" + NL) if pre else "") + src + NL, encoding="utf-8")
    if exe.exists():
        exe.unlink()
    r = subprocess.run([CXX, "-std=" + std, "-Wno-everything", str(f), "-o", str(exe)], capture_output=True, text=True)
    lines = sorted({int(m.group(1)) for m in re.finditer(r":(\d+):\d+: error", r.stderr)})
    res = {"ok": r.returncode == 0, "lines": lines, "err": r.stderr, "out": None, "rc": None}
    if r.returncode == 0 and run:
        try:
            p = subprocess.run([str(exe)], capture_output=True, text=True, timeout=timeout)
            res["out"], res["rc"] = p.stdout, p.returncode
        except subprocess.TimeoutExpired:
            res["out"], res["rc"] = "<timeout>", -1
    return res


def check(label, got, want):
    ok = got == want
    print(("OK   " if ok else "FAIL ") + label + " got=" + repr(got) + " want=" + repr(want))
    if not ok:
        raise SystemExit(1)
