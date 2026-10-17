# -*- coding: utf-8 -*-
"""build_learn.py -- build the Learn-mode data from the Hebrew topic briefs.

Reads docs/briefs/*.md (one file per chapter, order + topic in MANIFEST below), renders each
to static HTML and writes:

    learn.js  ->  window.LEARN = { chapters: [{id, title, topic, kind, html}, ...], meta: {...} }

Static + offline, same contract as build_questions.py:
  - every $...$ / $$...$$ is rendered to MathML at BUILD time by tools/render_math.js (one node
    call), dir="ltr" on every <math>; \\overline is post-processed to <mrow class="ovl"> by the
    same fix_overlines() the question build uses. Hebrew inside math, or a KaTeX error, fails.
  - `26B-B-Q3` (backticked question id) -> <button class="qref"> that peeks at the question.
    An id that is not in questions.json fails the build (it would open an empty panel).
  - [[chapter_id]] / [[chapter_id|label]] -> in-app cross-reference (.xref). Unknown id fails.
  - kind "topic" chapters get an auto-appended "שאלות מבחן בנושא" list generated from
    questions.json by topic, so it stays current as exams are added -- just rebuild.

Run:  PYTHONUTF8=1 py tools/build_learn.py      (after build_questions.py when the bank changes)
Prints ASCII only (the Windows console is cp1255); Hebrew goes to UTF-8 files.
"""
import html as htmlmod, json, pathlib, re, subprocess, sys

import markdown

TOOLS = pathlib.Path(__file__).resolve().parent
ROOT = TOOLS.parent
BRIEFS = ROOT / "docs" / "briefs"
OUT_JS = ROOT / "learn.js"
QJSON = ROOT / "questions.json"

sys.path.insert(0, str(TOOLS))
from build_questions import CFG, TOPIC_LABEL, fix_overlines, exam_order  # noqa: E402  (single source)

# (file, chapter id, topic key, kind) comes from course.config.json "briefs". Order == study order.
# kind "topic": a per-topic brief (gets the auto question list); "cheat": a cross-topic
# cheat sheet (its topic only powers the drill button).
MANIFEST = [tuple(b) for b in CFG["briefs"]]

QID = r"(?:\d{2}[ABS]-[ABC]|SAMP-\d+|DEMO-[A-Z])-Q\d+"
HEB = re.compile(r"[֐-׿]")

# Blockquote callouts: leading emoji -> class (CSS colours them), richest signal first.
CALLOUTS = [("🪤", "trap"), ("🚨", "alarm"), ("⚠️", "warn"), ("⚠", "warn"),
            ("🔑", "key"), ("💡", "tip"), ("✅", "yes"), ("❌", "no")]

problems = []


def fail(msg):
    problems.append(msg)


# ---------------------------------------------------------------- math
def split_code_fences(text):
    """Yield (is_code, chunk) so $ inside ``` blocks is never treated as math."""
    parts, buf, in_code = [], [], False
    for ln in text.split("\n"):
        if ln.lstrip().startswith("```"):
            if in_code:
                buf.append(ln)
                parts.append((True, "\n".join(buf)))
                buf = []
            else:
                parts.append((False, "\n".join(buf)))
                buf = [ln]
            in_code = not in_code
            continue
        buf.append(ln)
    parts.append((in_code, "\n".join(buf)))
    return [(c, t) for c, t in parts if t]


DISPLAY_RE = re.compile(r"\$\$(.+?)\$\$", re.S)
INLINE_RE = re.compile(r"(?<![\$\\])\$([^$\n]+?)\$(?!\$)")


def extract_math(text, store, where):
    """Replace math with inert placeholders markdown passes through untouched."""
    def take(tex, display):
        tex = tex.strip()
        if HEB.search(tex):
            fail(f"{where}: Hebrew inside math: {tex[:50].encode('ascii', 'backslashreplace').decode()}")
        store.append({"tex": tex, "display": display})
        return f"@@MATH{len(store) - 1}@@"

    out = []
    for is_code, chunk in split_code_fences(text):
        if not is_code:
            chunk = DISPLAY_RE.sub(lambda m: take(m.group(1), True), chunk)
            chunk = INLINE_RE.sub(lambda m: take(m.group(1), False), chunk)
        out.append(chunk)
    return "\n".join(out)


def render_math(items):
    if not items:
        return []
    proc = subprocess.run(["node", str(TOOLS / "render_math.js")],
                          input=json.dumps({"items": items}, ensure_ascii=False),
                          capture_output=True, text=True, encoding="utf-8", cwd=str(TOOLS))
    if proc.returncode != 0:
        sys.stdout.write("render_math.js failed:\n" +
                         proc.stderr.encode("ascii", "backslashreplace").decode() + "\n")
        sys.exit(2)
    res = json.loads(proc.stdout)
    for e in res["errors"]:
        fail(f"KaTeX error [{e['i']}] {e['tex'][:60]} -> {e['err'][:120]}".encode("ascii", "backslashreplace").decode())
    return [fix_overlines(h) if h else h for h in res["html"]]


def inject_math(h, rendered):
    def sub(m):
        frag = rendered[int(m.group(1))]
        if frag is None:
            return '<code class="math-fail">?</code>'
        cls = "math-block" if 'display="block"' in frag else "math-inline"
        return f'<span class="{cls}">{frag}</span>'
    return re.sub(r"@@MATH(\d+)@@", sub, h)


# ---------------------------------------------------------------- markdown prep
def wikilinks(md, ids, titles, where):
    """[[chapter_id]] / [[chapter_id|label]] -> in-app chapter link."""
    def sub(m):
        target, _, label = m.group(1).partition("|")
        target, label = target.strip(), label.strip()
        if target not in ids:
            fail(f"{where}: unknown xref [[{target}]]")
            return label or target
        return f'<a class="xref" href="#" data-chapter="{target}">{label or titles[target]}</a>'
    return re.sub(r"\[\[([^\]]+)\]\]", sub, md)


_LIST_RE = re.compile(r"^(\s*)([-*+]|\d+\.)\s+")


def normalize_lists(md):
    """python-markdown needs a blank line before a list that follows a paragraph."""
    out = []
    for ln in md.split("\n"):
        if _LIST_RE.match(ln):
            prev = out[-1] if out else ""
            p = prev.strip()
            if p and not _LIST_RE.match(prev) and not p.startswith(("#", "|", ">")):
                out.append("")
        out.append(ln)
    return "\n".join(out)


# ---------------------------------------------------------------- html post-pass
def linkify_qids(h, known, where):
    def sub(m):
        qid = m.group(1)
        if qid not in known:
            fail(f"{where}: dangling question ref {qid}")
            return f"<code>{qid}</code>"
        return f'<button type="button" class="qref" data-q="{qid}">{qid}</button>'
    return re.sub(r"<code>(" + QID + r")</code>", sub, h)


def wrap_tables(h):
    """Tables scroll inside their own box; --cols lets CSS give wide tables a min width."""
    def sub(m):
        body = m.group(1)
        cols = max([len(re.findall(r"<t[hd][\s>]", row))
                    for row in re.findall(r"<tr>(.*?)</tr>", body, re.S)] or [3])
        return f'<div class="tbl-wrap" style="--cols:{cols}"><table>{body}</table></div>'
    return re.sub(r"<table>(.*?)</table>", sub, h, flags=re.S)


def tag_callouts(h):
    def sub(m):
        head = m.group(1)[:60]
        for emoji, cls in CALLOUTS:
            if emoji in head:
                return f'<blockquote class="cal cal-{cls}">{m.group(1)}'
        return f'<blockquote class="cal">{m.group(1)}'
    return re.sub(r"<blockquote>(.{0,80})", sub, h, flags=re.S)


def isolate_rel(h):
    """'≤m' / '≤p' in plain prose (outside MathML) render mirrored in RTL; isolate them."""
    parts = re.split(r"(<math.*?</math>)", h, flags=re.S)
    return "".join(p if p.startswith("<math") else
                   re.sub(r"≤[mp]", lambda m: f'<bdi dir="ltr">{m.group(0)}</bdi>', p)
                   for p in parts)


# ---------------------------------------------------------------- exam-question list
def questions_by_topic(qs, exams_meta):
    labels = {e["examCode"]: e.get("examLabel", e["examCode"]) for e in exams_meta}
    by = {}
    for q in qs:
        by.setdefault(q["topic"], []).append(q)

    def num(q):
        n = q.get("num")
        try:
            return int(n)
        except (TypeError, ValueError):
            m = re.search(r"-Q(\d+)$", q["id"])
            return int(m.group(1)) if m else 0

    def block(topic):
        items = by.get(topic, [])
        head = '<h2 class="learn-qs-h">שאלות מבחן בנושא</h2>'
        if not items:
            return (f'<section class="learn-qs" data-topic="{topic}">{head}'
                    '<p class="learn-qs-empty">עדיין אין במאגר שאלות מבחן בנושא זה — '
                    'הרשימה תתעדכן כשיתווספו מבחנים.</p></section>')
        groups = {}
        for q in items:
            groups.setdefault(q["examCode"], []).append(q)
        rows = []
        for code in sorted(groups, key=exam_order, reverse=True):          # newest paper first
            btns = "".join(f'<button type="button" class="qref" data-q="{q["id"]}">שאלה {num(q)}</button>'
                           for q in sorted(groups[code], key=num))
            rows.append(f'<li><span class="learn-qs-exam">{htmlmod.escape(labels.get(code, code))}</span>'
                        f'<span class="learn-qs-btns">{btns}</span></li>')
        return (f'<section class="learn-qs" data-topic="{topic}">{head}'
                f'<p class="learn-qs-note">{len(items)} שאלות · לחיצה על שאלה מציגה אותה עם התשובה המסומנת</p>'
                f'<ul class="learn-qs-list">{"".join(rows)}</ul></section>')
    return block, {t: len(v) for t, v in by.items()}


# ---------------------------------------------------------------- main
def read_brief(fname):
    path = BRIEFS / fname
    if not path.exists():
        sys.exit(f"missing brief: {fname.encode('ascii', 'backslashreplace').decode()}")
    raw = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    m = re.search(r"^#\s+(.+)$", raw, re.M)
    title = m.group(1).strip() if m else fname[:-3]
    body = re.sub(r"^#\s+.+$", "", raw, count=1, flags=re.M).strip()
    return title, body


def main():
    data = json.loads(QJSON.read_text(encoding="utf-8")) if QJSON.exists() else {"questions": []}
    qs = data.get("questions", [])
    known = {q["id"] for q in qs}
    qblock, per_topic = questions_by_topic(qs, (data.get("meta") or {}).get("exams", []))

    ids = [cid for _, cid, _, _ in MANIFEST]
    if len(set(ids)) != len(ids):
        sys.exit("duplicate chapter id in MANIFEST")
    for _, cid, topic, kind in MANIFEST:
        if topic not in TOPIC_LABEL:
            sys.exit(f"MANIFEST {cid}: topic {topic} not in the closed list")
        if kind not in ("topic", "cheat"):
            sys.exit(f"MANIFEST {cid}: bad kind {kind}")
    missing = set(TOPIC_LABEL) - {t for _, _, t, k in MANIFEST if k == "topic"}
    if missing:
        sys.exit(f"topics without a brief: {sorted(missing)}")

    briefs = [(cid, topic, kind, *read_brief(fn)) for fn, cid, topic, kind in MANIFEST]
    titles = {cid: title for cid, _, _, title, _ in briefs}

    store, staged = [], []
    for cid, topic, kind, title, body in briefs:
        prepared = extract_math(body, store, cid)
        prepared = normalize_lists(wikilinks(prepared, set(ids), titles, cid))
        staged.append((cid, topic, kind, title, prepared))

    rendered = render_math(store)
    md = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists", "attr_list"])
    chapters, cited = [], set()
    for cid, topic, kind, title, prepared in staged:
        md.reset()
        h = md.convert(prepared)
        h = wrap_tables(h)
        h = tag_callouts(h)
        h = linkify_qids(h, known, cid)
        cited |= set(re.findall(r'data-q="([^"]+)"', h))
        h = inject_math(h, rendered)
        h = isolate_rel(h)
        if kind == "topic":
            h += qblock(topic)
        chapters.append({"id": cid, "title": title, "topic": topic, "kind": kind, "html": h})

    if problems:
        print(f"BUILD FAILED -- {len(problems)} problem(s), learn.js NOT written:")
        for p in problems:
            print("  " + p.encode("ascii", "backslashreplace").decode())
        sys.exit(1)

    qrefs = sum(c["html"].count('class="qref"') for c in chapters)
    meta = {"generated": "tools/build_learn.py", "chapters": len(chapters),
            "formulas": len(store), "qrefs": qrefs, "citedIds": len(cited),
            "questionsPerTopic": {t: per_topic.get(t, 0) for t in TOPIC_LABEL}}
    payload = ("/* AUTO-GENERATED by tools/build_learn.py from docs/briefs/*.md -- do not edit by hand. */\n"
               "window.LEARN = " + json.dumps({"chapters": chapters, "meta": meta}, ensure_ascii=False) + ";\n")
    OUT_JS.write_text(payload, encoding="utf-8")

    print(f"chapters : {len(chapters)} -> {[c['id'] for c in chapters]}")
    print(f"formulas : {len(store)}")
    print(f"qrefs    : {qrefs} buttons ({len(cited)} distinct ids, all resolve)")
    empty = [t for t in TOPIC_LABEL if not per_topic.get(t)]
    if empty:
        print(f"WARN: topics with no questions in the bank yet: {empty}")
    print(f"wrote    : learn.js ({OUT_JS.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
