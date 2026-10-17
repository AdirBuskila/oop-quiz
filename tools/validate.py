# -*- coding: utf-8 -*-
"""Lint tools/raw/*.json against tools/RAW_SCHEMA.md. Run before build_questions.py.

    PYTHONUTF8=1 py tools/validate.py            # all raw files (skips names starting "_")
    PYTHONUTF8=1 py tools/validate.py 26B-B      # just one exam code (or a path)

Exit code 1 if any PROBLEM is found. Prints ASCII only.
"""
import json, pathlib, re, sys, collections, unicodedata

TOOLS = pathlib.Path(__file__).resolve().parent
RAW = TOOLS / "raw"
ROOT = TOOLS.parent

sys.path.insert(0, str(TOOLS))
from course_config import load as _load_cfg  # noqa: E402
# Closed topic list comes from course.config.json (single source).
TOPICS = {k for k, _ in _load_cfg()["topics"]}
OPT_TYPES = {"text", "math", "image"}
OPT_IDS = {"a", "b", "c", "d", "e", "f"}
CONFIDENCE = {"high", "med", "low"}
ANSWER_SOURCES = {"solution-pdf", "highlighted-pdf", "corrected-key", "letter-table",
                  "explanation-inferred", "solved"}
DERIVED = {"id", "examCode", "examLabel", "year", "source", "topicLabel", "dedupKey",
           "questionHtml", "explanationHtml"}
CODE_RE = re.compile(r"^(\d{2}[ABS]-[ABC]|SAMP-\d+|DEMO-[A-Z])$")
HEB = re.compile(r"[֐-׿]")
TOKEN = re.compile(r"(\$\$.+?\$\$|\$[^$]+?\$|`[^`]+`)", re.S)


# ---------------------------------------------------------------- anonymization (tools/redact.txt)
def load_redact():
    """Author names that must never ship (student solutions are anonymized). Optional file
    tools/redact.txt: one FULL name per line, '#' starts a comment. Matching is a case-insensitive
    whole-word match on NFC-normalized text (a name is not matched inside a longer word, so list
    prefixed or inflected forms as their own lines); Hebrew names (no case) match exactly."""
    fp = TOOLS / "redact.txt"
    if not fp.is_file():
        return []
    out = []
    for ln in fp.read_text(encoding="utf-8-sig").splitlines():
        ln = ln.split("#", 1)[0].strip()
        if ln:
            out.append(ln)
    return out


def _fold(s):
    return unicodedata.normalize("NFC", str(s)).casefold()


def _wordchar(c):
    return c == "_" or unicodedata.category(c)[0] in "LNM"


def contains_word(text, name):
    """name occurs in text with no letter/digit/mark/underscore directly before or after it
    (both arguments already folded). Hebrew-aware: a name inside a longer word does not match."""
    start = text.find(name)
    while start != -1:
        end = start + len(name)
        if (start == 0 or not _wordchar(text[start - 1])) and (end == len(text) or not _wordchar(text[end])):
            return True
        start = text.find(name, start + 1)
    return False


def _strings(x, path):
    """Yield (path, text) for every string value inside x."""
    if isinstance(x, str):
        yield path, x
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from _strings(v, f"{path}[{i}]")
    elif isinstance(x, dict):
        for k, v in x.items():
            yield from _strings(v, f"{path}.{k}" if path else str(k))


def redact_problems(data, code, qid_of, names):
    """A listed name in ANY shipped text field (questions, options, solutions/explanations, rubric,
    pitfalls, steps, contexts, sourceFile/solutionFile/examLabel ...) is a problem; the message
    starts with the item id. The name itself is not echoed (logs would leak it)."""
    if not names:
        return []
    folded = [_fold(n) for n in names]
    out = []

    def scan(where, obj, base):
        seen = set()
        for path, text in _strings(obj, base):
            t = _fold(text)
            for i, n in enumerate(folded):
                if contains_word(t, n) and (path, i) not in seen:
                    seen.add((path, i))
                    out.append(f"{where}: redact.txt entry #{i + 1} found in {path} (author names must not ship)")

    scan(code, {k: v for k, v in data.items() if k not in ("questions", "contexts")}, "")
    for cid, c in (data.get("contexts") or {}).items():
        scan(f"{code} ctx {cid}", c, "")
    for q in data.get("questions") or []:
        if isinstance(q, dict):
            scan(qid_of(q), q, "")
    return out


FENCE_OPEN = re.compile(r"^```([A-Za-z0-9+#_-]{0,12})[ \t]*$")
FENCE_CLOSE = re.compile(r"^```[ \t]*$")


def split_fences(s):
    """Yield (kind, payload): ('text', str) | ('fence', (lang, body)) | ('unclosed', str).
    A fence opens on a line that is exactly ``` or ```lang and closes on a line that is exactly ```."""
    s = str(s)
    if "```" not in s:
        yield "text", s
        return
    lines, buf, i = s.replace("\r\n", "\n").split("\n"), [], 0
    while i < len(lines):
        m = FENCE_OPEN.match(lines[i])
        if not m:
            buf.append(lines[i])
            i += 1
            continue
        j = i + 1
        while j < len(lines) and not FENCE_CLOSE.match(lines[j]):
            j += 1
        if buf:
            yield "text", "\n".join(buf)
            buf = []
        if j >= len(lines):
            yield "unclosed", "\n".join(lines[i:])
            return
        yield "fence", (m.group(1), "\n".join(lines[i + 1:j]))
        i = j + 1
    if buf:
        yield "text", "\n".join(buf)


def rich_problems(s, where):
    """Balanced $, no Hebrew inside math. Returns a list of problem strings."""
    out = []
    if "```" in str(s):
        keep = []
        for fk, fp in split_fences(s):
            if fk == "unclosed":
                out.append(f"{where}: unclosed ``` code fence (close it with a line that is exactly ```)")
            elif fk == "text":
                keep.append(fp)
        s = "\n".join(keep)
    s = str(s).replace("\\$", "")
    for part in TOKEN.split(s):
        if part.startswith("$$") and part.endswith("$$") and len(part) > 4:
            tex = part[2:-2]
        elif part.startswith("$") and part.endswith("$") and len(part) > 2:
            tex = part[1:-1]
        elif part.startswith("`"):
            continue
        else:
            if "$" in part:
                out.append(f"{where}: unbalanced $ (use \\$ for a literal dollar)")
            continue
        if HEB.search(tex):
            out.append(f"{where}: Hebrew inside math ${tex}$".encode("ascii", "backslashreplace").decode())
        if not tex.strip():
            out.append(f"{where}: empty math span")
    return out


def check_file(fp):
    problems, warns = [], []
    try:
        data = json.loads(fp.read_text(encoding="utf-8"))
    except Exception as e:
        return [f"{fp.name}: JSON parse error: {e}"], [], 0, collections.Counter()
    code = data.get("examCode")
    P = problems.append
    if not code:
        P(f"{fp.name}: missing examCode")
        code = fp.stem
    elif not CODE_RE.match(code):
        warns.append(f"{fp.name}: examCode {code} not YY[A|B|S]-[A|B|C] or SAMP-N")
    if code != fp.stem:
        P(f"{fp.name}: examCode {code} != file name")
    for k in ("examLabel", "year"):
        if data.get(k) in (None, ""):
            P(f"{code}: missing {k}")
    ctxs = data.get("contexts") or {}
    for cid, c in ctxs.items():
        w = f"{code} ctx {cid}"
        if c.get("kind") not in ("image", "text"):
            P(f"{w}: kind must be image|text")
        if c.get("kind") == "image":
            if not c.get("image"):
                P(f"{w}: image context without image")
            elif not (ROOT / c["image"]).is_file():
                P(f"{w}: image file missing {c['image']}")
        if c.get("kind") == "text" and not str(c.get("text", "")).strip():
            P(f"{w}: text context without text")
        for k in ("text", "caption", "title"):
            if c.get(k):
                problems += rich_problems(c[k], f"{w} {k}")
    problems += redact_problems(data, code, lambda q: f"{code}-Q{q.get('num')}", load_redact())
    qs = data.get("questions")
    if not isinstance(qs, list) or not qs:
        P(f"{code}: no questions")
        qs = []
    nums, by_topic = set(), collections.Counter()
    for q in qs:
        tag = f"{code} Q{q.get('num')}"
        hold = q.get("hold")
        if "hold" in q and not (isinstance(hold, str) and hold.strip()):
            P(f"{tag}: hold must be a non-empty reason string")
        # a held question is left out of the bank: it needs no key/answer/source, only what identifies it
        need = ("num",) if hold else ("num", "topic", "question", "options", "correctId", "answerSource",
                                      "official", "confidence")
        for k in need:
            if k not in q:
                P(f"{tag}: missing {k}")
        if not isinstance(q.get("num"), int):
            P(f"{tag}: num must be an int")
        elif q["num"] in nums:
            P(f"{tag}: duplicate num")
        nums.add(q.get("num"))
        if q.get("topic") not in TOPICS:
            if not (hold and "topic" not in q):
                P(f"{tag}: topic {q.get('topic')} not in closed list")
        else:
            by_topic[q["topic"]] += 1
        if not str(q.get("question", "")).strip() and not hold:
            P(f"{tag}: empty question")
        problems += rich_problems(q.get("question", ""), tag)
        problems += rich_problems(q.get("explanation") or "", tag + " explanation")
        if q.get("contextId") and q["contextId"] not in ctxs:
            P(f"{tag}: contextId {q['contextId']} not defined in this file")
        if q.get("image") and not (ROOT / q["image"]).is_file():
            P(f"{tag}: image file missing {q['image']}")
        opts = q.get("options") or []
        ids = [o.get("id") for o in opts]
        if len(opts) < 2 and not hold:
            P(f"{tag}: fewer than 2 options")
        if len(set(ids)) != len(ids):
            P(f"{tag}: duplicate option ids {ids}")
        for o in opts:
            w = f"{tag} opt {o.get('id')}"
            if o.get("id") not in OPT_IDS:
                P(f"{w}: option id must be one of a..f")
            t = o.get("type", "text")
            if t not in OPT_TYPES:
                P(f"{w}: bad type {t}")
            v = str(o.get("value", ""))
            if not v.strip():
                P(f"{w}: blank value")
            if t == "math":
                if HEB.search(v):
                    P(f"{w}: Hebrew inside math option")
                if v.strip().startswith("$"):
                    P(f"{w}: math option value must be TeX without $")
            elif t == "image":
                if not (ROOT / v).is_file():
                    P(f"{w}: image file missing {v}")
            else:
                problems += rich_problems(v, w)
        if q.get("correctId") not in ids and not (hold and "correctId" not in q):
            P(f"{tag}: correctId {q.get('correctId')} not among option ids")
        acc = q.get("acceptedIds")
        if acc is not None:
            if not isinstance(acc, list) or len(acc) < 2:
                P(f"{tag}: acceptedIds only when >1 accepted (non-empty list of >=2)")
            else:
                if any(a not in ids for a in acc):
                    P(f"{tag}: acceptedIds {acc} contains an unknown option id")
                if acc[0] != q.get("correctId") and not (hold and "correctId" not in q):
                    P(f"{tag}: acceptedIds must start with correctId")
                if len(set(acc)) != len(acc):
                    P(f"{tag}: duplicate acceptedIds")
        if "answerSource" in q and q["answerSource"] not in ANSWER_SOURCES:
            P(f"{tag}: answerSource {q['answerSource']} not in {sorted(ANSWER_SOURCES)}")
        if "official" in q and not isinstance(q["official"], bool):
            P(f"{tag}: official must be true/false")
        if "confidence" in q and q["confidence"] not in CONFIDENCE:
            P(f"{tag}: confidence must be high|med|low")
        if "lockOrder" in q and not isinstance(q["lockOrder"], bool):
            P(f"{tag}: lockOrder must be a boolean")
        bad_derived = sorted(k for k in q if k in DERIVED)
        if bad_derived:
            P(f"{tag}: derived fields must not be in raw: {bad_derived}")
        if q.get("confidence") == "low":
            warns.append(f"{tag}: confidence low")
    return problems, warns, len(qs), by_topic


def main():
    args = sys.argv[1:]
    if args:
        files = []
        for a in args:
            p = pathlib.Path(a)
            files.append(p if p.suffix == ".json" else RAW / f"{a}.json")
    else:
        files = [p for p in sorted(RAW.glob("*.json")) if not p.name.startswith("_")]
    total, all_p, all_w, topics = 0, [], [], collections.Counter()
    for fp in files:
        if not fp.is_file():
            all_p.append(f"{fp}: not found")
            continue
        p, w, n, bt = check_file(fp)
        total += n
        topics.update(bt)
        all_p += p
        all_w += w
        print(f"{fp.stem}: {n} questions, {len(p)} problems")
    print(f"\nTOTAL: {total} questions across {len(files)} files")
    print("by topic:", dict(topics))
    if all_w:
        print(f"\nWARNINGS ({len(all_w)}):")
        for x in all_w:
            print("  -", x.encode("ascii", "backslashreplace").decode())
    # string-escape corruption (e.g. "\notin" in a non-raw generator string -> newline + "otin")
    import subprocess
    lint = subprocess.run([sys.executable, str(pathlib.Path(__file__).parent / "gen" / "lint_escapes.py")],
                          capture_output=True, text=True, encoding="utf-8")
    if lint.returncode:
        all_p += ["escape-lint: " + l for l in lint.stdout.splitlines() if not l.startswith("escape problems")]
    print(f"\nPROBLEMS ({len(all_p)}):")
    for x in all_p:
        print("  -", x.encode("ascii", "backslashreplace").decode())
    sys.exit(1 if all_p else 0)


if __name__ == "__main__":
    main()
