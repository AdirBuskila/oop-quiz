# -*- coding: utf-8 -*-
"""Merge per-exam raw JSON files into the course question dataset (config: ../course.config.json).

Inputs : tools/raw/<CODE>.json  (contract: tools/RAW_SCHEMA.md). Files whose name starts
         with "_" are skipped (fixtures / scratch).
Outputs: ../questions.json   { meta, contexts, questions }
         ../questions.js     window.CC_QUIZ = {...};  (meta carries topics/accent/accent2/storePrefix/title/needHelp from the config)
         ../courses.js       window.COURSES = {...};  the guided "need help?" courses (tools/build_courses.py, run at the end)
         build_report.md

Derived here (never in raw): id, examCode, examLabel, year, source, topicLabel, dedupKey,
auto-lockOrder, namespaced contextId, and the *Html fields (questionHtml, option html,
explanationHtml, context textHtml / captionHtml) with math pre-rendered to MathML.

Math: every $...$ / $$...$$ span (and every type:"math" option) is collected and rendered in
ONE call to tools/render_math.js (KaTeX, output:"mathml", dir="ltr" on every <math>). Any
KaTeX error, or Hebrew inside a math span, fails the build loudly and writes nothing.

Run:  PYTHONUTF8=1 py tools/build_questions.py
Prints ASCII only (the Windows console is cp1255); Hebrew goes to UTF-8 files.
"""
import collections, glob, hashlib, html, json, pathlib, re, subprocess, sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

TOOLS = pathlib.Path(__file__).resolve().parent
EXAM_RE = re.compile(r"^(\d{2}[A-Z]-[A-Z]|SAMP-\d+|DEMO-[A-Z])\.json$")  # only real exam files; tmp_*/_verify_*/_blind_* are ignored
RAW = TOOLS / "raw"
OUT = TOOLS.parent

# Closed topic list comes from course.config.json (single source for every tool and app.js).
from course_config import load as _load_cfg  # noqa: E402
CFG = _load_cfg()
TOPIC_LABEL = {k: v for k, v in CFG["topics"]}
OPT_TYPES = {"text", "math", "image"}
CONFIDENCE = {"high", "med", "low"}
ANSWER_SOURCES = {"solution-pdf", "highlighted-pdf", "corrected-key", "letter-table",
                  "explanation-inferred", "solved"}

HEB = re.compile(r"[֐-׿]")
HEB_LETTER = "א-ת"

# An option that cites its SIBLINGS by printed letter ("תשובות א ו-ב נכונות", "א' ו-ג'",
# "רק ב,ג") must keep the printed order -- shuffling would point the reference at whatever
# landed in those slots. "כל התשובות האחרות" / "אף אחת מהתשובות" cite no letter: no lock.
_L = r"(?<![%s])[אבגדה]['׳]?(?![%s])" % (HEB_LETTER, HEB_LETTER)
LETTER_PAIR = re.compile(_L + r"\s*(?:,|\+|&|-|/|או|וגם|ו-?)\s*" +
                         r"[אבגדה]['׳]?(?![%s])" % HEB_LETTER)
LETTER_NAMED = re.compile(r"(?:תשובה|תשובות|סעיף|סעיפים|אפשרות|אפשרויות)\s+[אבגדה]['׳]?(?![%s])"
                          % HEB_LETTER)


def locks_order(options):
    for o in options:
        if (o.get("type") or "text") != "text":
            continue
        v = str(o.get("value", ""))
        if LETTER_PAIR.search(v) or LETTER_NAMED.search(v):
            return True
    return False


# ---------------------------------------------------------------- rich text
ESC_DOLLAR = "\x00"
TOKEN = re.compile(r"(\$\$.+?\$\$|\$[^$]+?\$|`[^`]+`)", re.S)


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


IMG_LINE = re.compile(r"^!\[([^\]\n]*)\]\((images/exams/[A-Za-z0-9._-]+\.png)\)[ \t]*$")


def split_images(s):
    """Yield ('text', str) | ('image', (alt, src)). An image is a line consisting only of
    ![alt text](images/exams/<file>.png)."""
    s = str(s)
    if "![" not in s:
        yield "text", s
        return
    buf = []
    for ln in s.replace("\r\n", "\n").split("\n"):
        m = IMG_LINE.match(ln)
        if not m:
            buf.append(ln)
            continue
        if buf:
            yield "text", "\n".join(buf)
            buf = []
        yield "image", (m.group(1), m.group(2))
    if buf:
        yield "text", "\n".join(buf)


def figure_html(alt, src):
    a = html.escape(alt, quote=True)
    return (f'<figure class="rt-fig"><img src="{html.escape(src, quote=True)}" alt="{a}" loading="lazy">'
            f'<figcaption>{html.escape(alt, quote=False)}</figcaption></figure>')


def split_rich(s):
    """Yield (kind, payload) for kind in text|imath|dmath|code|fence|image|unclosed. Literal \\$ -> '$'.
    Fenced blocks (a line of ```lang ... a line of ```) are literal: payload (lang, body)."""
    for fk, fp in split_fences(s):
        if fk != "text":
            yield fk, fp
            continue
        for ik, ip in split_images(fp):
            if ik == "image":
                yield "image", ip
            else:
                yield from _split_inline(ip)


def _split_inline(s):
    s = str(s).replace("\\$", ESC_DOLLAR)
    for part in TOKEN.split(s):
        if not part:
            continue
        if part.startswith("$$") and part.endswith("$$") and len(part) > 4:
            yield "dmath", part[2:-2].replace(ESC_DOLLAR, "\\$").strip()
        elif part.startswith("$") and part.endswith("$") and len(part) > 2:
            yield "imath", part[1:-1].replace(ESC_DOLLAR, "\\$").strip()
        elif part.startswith("`") and part.endswith("`") and len(part) > 2:
            yield "code", part[1:-1].replace(ESC_DOLLAR, "$")
        else:
            yield "text", part.replace(ESC_DOLLAR, "$")


def math_spans(s):
    return [(p, k == "dmath") for k, p in split_rich(s) if k in ("imath", "dmath")]


class MathBank:
    """Collects (tex, display) pairs; renders them all in one node call."""

    def __init__(self):
        self.items, self.index, self.where = [], {}, []

    def add(self, tex, display, where):
        key = (tex, bool(display))
        if key not in self.index:
            self.index[key] = len(self.items)
            self.items.append({"tex": tex, "display": bool(display)})
            self.where.append(where)
        return self.index[key]

    def render(self):
        if not self.items:
            self.html = []
            return []
        proc = subprocess.run(["node", str(TOOLS / "render_math.js")],
                              input=json.dumps({"items": self.items}, ensure_ascii=False),
                              capture_output=True, text=True, encoding="utf-8", cwd=str(TOOLS))
        if proc.returncode != 0:
            sys.stdout.write("render_math.js failed:\n" +
                             proc.stderr.encode("ascii", "backslashreplace").decode() + "\n")
            sys.exit(2)
        res = json.loads(proc.stdout)
        self.html = [fix_overlines(h) if h else h for h in res["html"]]
        return [(self.where[e["i"]], e["tex"], e["err"]) for e in res["errors"]]


OVL_OPEN = '<mover accent="true">'
OVL_TAIL = '<mo stretchy="true">‾</mo></mover>'


def fix_overlines(m):
    r"""Chrome's MathML Core does not stretch KaTeX's \overline (<mover> + stretchy U+203E):
    it draws a short bar at the base's corner. Rewrite each one to <mrow class="ovl">BASE</mrow>;
    styles.css draws the bar as a border-top spanning the whole base. Innermost first."""
    starts, i = [], m.find(OVL_OPEN)
    while i != -1:
        starts.append(i)
        i = m.find(OVL_OPEN, i + 1)
    for st in reversed(starts):
        depth, j = 0, st
        while True:
            o, c = m.find("<mover", j), m.find("</mover>", j)
            if c == -1:
                return m
            if o != -1 and o < c:
                depth, j = depth + 1, o + 6
            else:
                depth, j = depth - 1, c + 8
                if depth == 0:
                    break
        seg = m[st:j]
        if seg.endswith(OVL_TAIL):
            base = seg[len(OVL_OPEN):-len(OVL_TAIL)]
            m = m[:st] + '<mrow class="ovl">' + base + "</mrow>" + m[j:]
    return m


def unescape_quotes(x):
    """Generators use Python raw strings, so a Hebrew gershayim written as \\" (מ\\"ט) arrives
    with its backslash. TeX here never uses \\" (umlaut), so strip it everywhere."""
    if isinstance(x, str):
        return x.replace('\\"', '"')
    if isinstance(x, list):
        return [unescape_quotes(v) for v in x]
    if isinstance(x, dict):
        return {k: unescape_quotes(v) for k, v in x.items()}
    return x


def rich_html(s, bank, where, math_errors):
    """Rich text -> HTML with MATH placeholders (@@M<n>@@) resolved later."""
    out, fences = [], []
    for kind, p in split_rich(s):
        if kind in ("imath", "dmath"):
            if HEB.search(p):
                math_errors.append((where, p, "Hebrew inside math span"))
                continue
            i = bank.add(p, kind == "dmath", where)
            out.append(f"@@{'D' if kind == 'dmath' else 'M'}{i}@@")
        elif kind == "code":
            out.append(f'<code class="tok" dir="ltr">{html.escape(p, quote=False)}</code>')
        elif kind == "fence":
            lang, body = p
            la = f' data-lang="{html.escape(lang, quote=True)}"' if lang else ""
            fences.append(f'<pre class="code-block" dir="ltr"{la}><code>{html.escape(body, quote=False)}</code></pre>')
            out.append(f"\x01F{len(fences) - 1}\x01")
        elif kind == "image":
            alt, src = p
            if not (OUT / src).is_file():
                math_errors.append((where, src, "image file missing"))
                continue
            fences.append(figure_html(alt, src))
            out.append(f"\x01F{len(fences) - 1}\x01")
        elif kind == "unclosed":
            math_errors.append((where, p[:40], "unclosed ``` code fence"))
        else:
            t = html.escape(p, quote=False)
            t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t, flags=re.S)
            out.append(t)
    h = "".join(out)
    # bold may wrap math/code placeholders too: re-run across the joined string
    h = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", h, flags=re.S)
    h = h.replace("\r\n", "\n").replace("\n", "<br>")
    return re.sub(r"\x01F(\d+)\x01", lambda m: fences[int(m.group(1))], h)


def resolve(h, bank):
    def sub(m):
        kind, i = m.group(1), int(m.group(2))
        mm = bank.html[i]
        cls = "math-block" if kind == "D" else "math-inline"
        return f'<span class="{cls}">{mm}</span>'
    return re.sub(r"@@([MD])(\d+)@@", sub, h)


# ---------------------------------------------------------------- validation (light)
def norm(s):
    return re.sub(r"\s+", " ", str(s)).strip().lower()


def valid_question(q):
    errs = []
    opts = q.get("options") or []
    if not isinstance(q.get("num"), int):
        errs.append("bad-num")
    if len(opts) < 2:
        errs.append("few-options")
    ids = [o.get("id") for o in opts]
    if len(set(ids)) != len(ids):
        errs.append("dup-option-ids")
    for o in opts:
        if (o.get("type") or "text") not in OPT_TYPES:
            errs.append(f"bad-option-type:{o.get('type')}")
        if not str(o.get("value", "")).strip():
            errs.append(f"blank-option:{o.get('id')}")
        if o.get("type") == "image" and not (OUT / str(o.get("value", ""))).is_file():
            errs.append(f"option-image-missing:{o.get('id')}:{o.get('value')}")
    if q.get("correctId") not in ids:
        errs.append("correctId-not-in-options")
    acc = q.get("acceptedIds")
    if acc is not None:
        if not isinstance(acc, list) or not acc:
            errs.append("bad-acceptedIds")
        else:
            if any(a not in ids for a in acc):
                errs.append("acceptedIds-unknown-id")
            if q.get("correctId") not in acc:
                errs.append("correctId-not-in-acceptedIds")
    if q.get("topic") not in TOPIC_LABEL:
        errs.append(f"bad-topic:{q.get('topic')}")
    if not str(q.get("question", "")).strip():
        errs.append("empty-question")
    if q.get("image") and not (OUT / q["image"]).is_file():
        errs.append(f"image-missing:{q['image']}")
    if q.get("confidence") not in CONFIDENCE:
        errs.append(f"bad-confidence:{q.get('confidence')}")
    if not isinstance(q.get("official"), bool):
        errs.append("official-not-bool")
    return errs


def exam_order(code):
    m = re.match(r"^(\d{2})([ABS])-([ABC])$", code)
    if code.startswith("SAMP-"):
        return (0, 0, code)
    if m:
        return (1, int(m.group(1)), code)
    return (2, 0, code)


# ---------------------------------------------------------------- main
def main():
    raw_files = [p for p in sorted(RAW.glob("*.json")) if EXAM_RE.match(p.name)]
    bank = MathBank()
    math_errors = []
    contexts, questions, problems = {}, [], []
    excl = collections.Counter()
    held = []
    exams_meta = []

    # the validator first (structure, math, redact.txt): nothing is built from an invalid file
    import validate
    vprobs = []
    for fp in raw_files:
        vprobs += validate.check_file(fp)[0]
    if vprobs:
        sys.stderr.write(f"BUILD FAILED -- {len(vprobs)} validation problem(s), nothing written:\n")
        for x in vprobs:
            sys.stderr.write("  - " + str(x).encode("ascii", "backslashreplace").decode() + "\n")
        sys.exit(1)

    for fp in raw_files:
        try:
            data = unescape_quotes(json.loads(fp.read_text(encoding="utf-8")))
        except Exception as e:
            print(f"FATAL: {fp.name}: JSON parse error: {str(e).encode('ascii', 'backslashreplace').decode()}")
            sys.exit(1)
        code = data.get("examCode") or fp.stem
        if code != fp.stem:
            problems.append(f"{fp.name}: examCode {code} != file name")
        label = data.get("examLabel", code)
        year = data.get("year")
        source = "sample" if code.startswith("SAMP-") else "exam"
        exams_meta.append({"examCode": code, "examLabel": label, "year": year, "source": source,
                           "examDate": data.get("examDate")})

        cmap = {}
        for cid, ctx in (data.get("contexts") or {}).items():
            gid = f"{code}-{cid}"
            c = dict(ctx)
            c["id"] = gid
            where = f"{code} ctx {cid}"
            if c.get("kind") not in ("image", "text"):
                problems.append(f"{where}: bad kind {c.get('kind')}")
            if c.get("image") and not (OUT / c["image"]).is_file():
                problems.append(f"{where}: image missing {c['image']}")
            if c.get("text"):
                c["textHtml"] = rich_html(c["text"], bank, where, math_errors)
            if c.get("caption"):
                c["captionHtml"] = rich_html(c["caption"], bank, where + " caption", math_errors)
            if c.get("title"):
                c["titleHtml"] = rich_html(c["title"], bank, where + " title", math_errors)
            contexts[gid] = c
            cmap[cid] = gid

        nums = set()
        for q in data.get("questions", []):
            tag = f"{code}-Q{q.get('num')}"
            if q.get("hold"):
                # disputed / unverified / unreadable: kept in raw, listed in the report, NOT in the bank
                # (checked first: a held item needs no key, so valid_question must not see it)
                if q.get("num") in nums:
                    problems.append(f"{tag}: dup-num")
                    excl["dup-num"] += 1
                nums.add(q.get("num"))
                held.append(f"{tag}: {q['hold']}")
                continue
            errs = valid_question(q)
            if q.get("num") in nums:
                errs.append("dup-num")
            nums.add(q.get("num"))
            if q.get("contextId") and q["contextId"] not in cmap:
                errs.append("contextId-undefined")
            if errs:
                excl["+".join(e.split(":")[0] for e in errs)] += 1
                problems.append(f"{tag}: {', '.join(errs)}")
                continue
            q = dict(q)
            q["id"] = f"{code}-Q{q['num']}"
            q["examCode"], q["examLabel"], q["year"], q["source"] = code, label, year, source
            q["topicLabel"] = TOPIC_LABEL[q["topic"]]
            if q.get("contextId"):
                q["contextId"] = cmap[q["contextId"]]
            if "lockOrder" not in q and locks_order(q["options"]):
                q["lockOrder"] = True
            if q.get("lockOrder") is False:
                q.pop("lockOrder")
            q["questionHtml"] = rich_html(q["question"], bank, tag, math_errors)
            q["explanationHtml"] = rich_html(q.get("explanation") or "", bank, tag + " expl", math_errors)
            q["explanation"] = q.get("explanation") or ""
            opts = []
            for o in q["options"]:
                o = dict(o)
                o["type"] = o.get("type") or "text"
                w = f"{tag} opt {o['id']}"
                if o["type"] == "math":
                    tex = str(o["value"]).strip()
                    if HEB.search(tex):
                        math_errors.append((w, tex, "Hebrew inside math option"))
                        o["html"] = ""
                    else:
                        o["html"] = f"@@M{bank.add(tex, False, w)}@@"
                elif o["type"] == "image":
                    o["html"] = f'<img class="opt-img" src="{html.escape(str(o["value"]))}" alt="" loading="lazy">'
                else:
                    o["html"] = rich_html(o["value"], bank, w, math_errors)
                opts.append(o)
            q["options"] = opts
            key = norm(q["question"]) + " || " + "|".join(sorted(norm(o["value"]) for o in opts))
            q["dedupKey"] = hashlib.sha1(key.encode("utf-8")).hexdigest()[:16]
            questions.append(q)

    # ---- any excluded question / missing figure / bad context aborts BEFORE anything is written
    if problems:
        sys.stderr.write(f"BUILD FAILED -- {len(problems)} problem(s), nothing written:\n")
        for pr in problems:
            sys.stderr.write("  - " + pr.encode("ascii", "backslashreplace").decode() + "\n")
        sys.exit(1)

    # ---- render all math in one node call
    math_errors += bank.render()
    if math_errors:
        print(f"MATH ERRORS ({len(math_errors)}) -- nothing written:")
        for where, tex, err in math_errors:
            line = f"  - {where}: ${tex}$ -> {err}"
            print(line.encode("ascii", "backslashreplace").decode())
        sys.exit(1)

    for c in contexts.values():
        for k in ("textHtml", "captionHtml", "titleHtml"):
            if k in c:
                c[k] = resolve(c[k], bank)
    for q in questions:
        q["questionHtml"] = resolve(q["questionHtml"], bank)
        q["explanationHtml"] = resolve(q["explanationHtml"], bank)
        for o in q["options"]:
            o["html"] = resolve(o["html"], bank)
            if o["type"] == "math":
                o["html"] = o["html"].replace('class="math-inline"', 'class="math-inline opt-math"')

    questions.sort(key=lambda q: (exam_order(q["examCode"]), q["num"]))
    exams_meta.sort(key=lambda e: exam_order(e["examCode"]))

    dup_groups = collections.Counter(q["dedupKey"] for q in questions)
    dup = sum(n - 1 for n in dup_groups.values() if n > 1)

    payload_obj = {
        "meta": {
            "generated": "tools/build_questions.py",
            "exams": exams_meta,
            "topics": [{"key": k, "label": v} for k, v in TOPIC_LABEL.items()],
            "title": CFG["titleHe"], "accent": CFG["accent"], "accent2": CFG["accent2"],
            "storePrefix": CFG["storePrefix"], "needHelp": CFG["needHelp"],
            "counts": {"total": len(questions), "unique": len(dup_groups),
                       "contexts": len(contexts), "math": len(bank.items)},
        },
        "contexts": contexts,
        "questions": questions,
    }
    payload = json.dumps(payload_obj, ensure_ascii=False, indent=1)
    (OUT / "questions.json").write_text(payload + "\n", encoding="utf-8")
    (OUT / "questions.js").write_text("window.CC_QUIZ = " + payload + ";\n", encoding="utf-8")

    by_topic = collections.Counter(q["topic"] for q in questions)
    by_exam = collections.Counter(q["examCode"] for q in questions)
    by_source = collections.Counter(q["source"] for q in questions)
    by_conf = collections.Counter(q["confidence"] for q in questions)
    by_off = collections.Counter("official" if q["official"] else "unofficial" for q in questions)
    by_ans = collections.Counter(q.get("answerSource") or "-" for q in questions)
    locked = sum(1 for q in questions if q.get("lockOrder"))
    multi = sum(1 for q in questions if q.get("acceptedIds"))

    L = ["# Build report — " + CFG["titleHe"] + " questions", "",
         f"- Raw exam files: **{len(raw_files)}**",
         f"- **Final questions: {len(questions)}** (unique by dedupKey: {len(dup_groups)}, duplicates kept: {dup})",
         f"- Excluded: **{sum(excl.values())}** {dict(excl) if excl else ''}",
         f"- Shared context blocks: **{len(contexts)}**",
         f"- Math spans rendered (distinct): **{len(bank.items)}**",
         f"- lockOrder: {locked} · multiple accepted answers: {multi}", "",
         f"- **On hold (not in bank, see docs/ASK_ADIR.md): {len(held)}**", ""] + [f"  - {h}" for h in held] + ["",
         "## By topic", "", "| topic | label | n |", "|---|---|---|"]
    for k, v in TOPIC_LABEL.items():
        L.append(f"| `{k}` | {v} | {by_topic.get(k, 0)} |")
    L += ["", "## By exam", ""]
    for code in sorted(by_exam, key=exam_order):
        L.append(f"- {code}: {by_exam[code]}")
    L += ["", "## By source", ""] + [f"- {k}: {v}" for k, v in sorted(by_source.items())]
    L += ["", "## By confidence", ""] + [f"- {k}: {by_conf.get(k, 0)}" for k in ("high", "med", "low")]
    L += ["", "## Official vs unofficial", ""] + [f"- {k}: {by_off.get(k, 0)}" for k in ("official", "unofficial")]
    L += ["", "## By answerSource", ""] + [f"- {k}: {v}" for k, v in sorted(by_ans.items())]
    if problems:
        L += ["", "## Excluded / problems", ""] + [f"- {p}" for p in problems]
    (TOOLS / "build_report.md").write_text("\n".join(L) + "\n", encoding="utf-8")

    print(f"files={len(raw_files)} final={len(questions)} unique={len(dup_groups)} "
          f"excluded={sum(excl.values())} contexts={len(contexts)} math={len(bank.items)} locked={locked}")
    print("by_topic:", dict(by_topic))
    import build_courses  # the guided courses bundle (courses.js); needs only node + the level files
    build_courses.main()
    if problems:
        print(f"PROBLEMS ({len(problems)}):")
        for p in problems:
            print("  -", p.encode("ascii", "backslashreplace").decode())
        sys.exit(1 if excl else 0)


if __name__ == "__main__":
    main()
