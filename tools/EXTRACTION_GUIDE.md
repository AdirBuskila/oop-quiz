# Exam extraction guide (one agent ↔ a few sittings)

Course folder (READ-ONLY): `sourceFolder` in `course.config.json`.

**Gold example:** the factory's `C:\Users\Adir\Desktop\Coding\Dev\course-factory\templates\mcq\tools\gen\gen_DEMO-A.py` (minimal shape; the app itself ships no demo) or any finished sitting generator. Mirror its
style: a Python generator per sitting `tools/gen/gen_<CODE>.py` (raw strings for TeX, helper
`opts()`, shared option sets like `TWO_CLAIMS` / `DEC4`, `note=` for anything you changed or doubt).
Data contract: `tools/RAW_SCHEMA.md` (topics, rich text, notation macros). Triage notes for your sittings, if any, are a CROSS-CHECK, not the source; re-read the key yourself from the pages.

## NON-NEGOTIABLE
1. **Character-exact.** Every overline (complement), `≤m` vs `≤p`, `∈`/`∉`, `⊂`/`⊆`, subscript
   matters — it flips answers. Zoom any doubtful token: render that region at 5× with PyMuPDF
   (`page.get_pixmap(matrix=fitz.Matrix(5,5), clip=rect)`) and LOOK. Text layers drop overlines
   (they sometimes show as `̅` combining marks after the token — useful hint only).
2. **Answer = the key**, read from the highlighted/marked option, matched **by content** when the
   key file's option order differs from the exam's. NEVER infer from position. a "form 0" label does NOT
   mean first-option-correct unless the course proves it.
3. Double answers officially accepted (appeal note / two highlights / "גם … התקבלה") →
   `acceptedIds: [correct, other]` + mention in explanation.
4. No clear key for a question → **omit it** and list it in your report (`askAdir`). Never guess,
   never fabricate a question, option, answer, or explanation.
5. **Explanations** = transcription of the key's own proof box / worked solution (light cleanup of
   bidi/typos OK; note typo fixes in `note`). Nothing in the key → `""`. Do not write your own proofs.
6. Hebrew never inside `$…$`. Set-builder with a Hebrew condition →
   `$$L = \{\langle M\rangle \mid (*)\}$$` then a line `(*): <Hebrew with inline $…$>`.
7. Options whose text references sibling letters ("תשובות א ו-ב נכונות", "כל התשובות הנ"ל") →
   add `lockOrder: True`. ("אף אחת מהתשובות האחרות" / "כל הטענות האחרות" do NOT need it.)
8. Figures (TM diagrams, graphs, tables that can't be typed) → crop at 3× (`fitz.Matrix(3,3)`) into
   `images/exams/<CODE>-Q<num>.png` (or `-<ctx>.png` for shared contexts) and VIEW the crop.
   If a whole option is unreadable/untypable → `("image", path)` option crop.
9. Open (non-MCQ) sub-questions → skip, list in report.

## Steps per sitting
1. Render: `PYTHONUTF8=1 py tools/render_pdf.py "<pdf>" <CODE>-SRC --dpi 150` (many sittings are
   already rendered under `tools/raw/<CODE>*`; reuse them). Use `py` (3.13), not `python`.
2. Dump text layer (helps bidi/wording): PyMuPDF `page.get_text()`; trust the IMAGE.
3. Write `tools/gen/gen_<CODE>.py` → run it → `tools/raw/<CODE>.json`. Fields per question:
   `num, topic, question, options, correctId, [acceptedIds], [lockOrder], [contextId], [image],
   answerSource, official, confidence, explanation, [note]`.
   - `answerSource`: `highlighted-pdf` | `solution-pdf` (worked solution / red marks) |
     `corrected-key` (מתוקן) | `letter-table` | `explanation-inferred`.
   - `official: true` for real key files; `confidence: high` unless you have a concrete doubt
     (then `med`/`low` + `note`).
   - `num` = the question number in the file you use as the canonical form (the keyed one).
4. Check math: `PYTHONUTF8=1 py tools/gen/mathcheck.py tools/raw/<CODE>.json | node tools/render_math.js`
   -> must report 0 errors. Run `tools/validate.py` too and fix your file's problems.
5. Cross-check your key string against the triage batch report; investigate every mismatch.
6. Do NOT run build_questions.py, do NOT edit other agents' files, app code, or docs.

## Topics (closed list)
Keys and labels are in `course.config.json` -> `topics`. Pick the ONE that best matches what the
question tests; an unknown key fails the build.

## Report (final message, ≤30 lines)
Per sitting: code, #questions written, #skipped (+why), key string you wrote, mismatches vs triage
and how resolved, acceptedIds used, images cropped, askAdir items with exact file + page + Q#.
