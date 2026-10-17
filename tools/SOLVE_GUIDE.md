# Solving sittings that have NO answer key (stage 1 of 2)

Adir authorized (2026-09-29) adding keyless sittings **only if the answers are certainly correct**.
Protocol: **stage 1** (you) transcribes + solves; **stage 2** (a different agent, blind to your
answers) re-solves from a stripped copy and re-checks transcription. Only agreements enter the
bank; everything else is `hold`.

Everything in `tools/EXTRACTION_GUIDE.md` still applies (character-exact transcription, zoom on
overlines / ≤m vs ≤p, Hebrew never in `$…$`, `(*)` lines, crops for figures, generator
`tools/gen/gen_<CODE>.py` → `tools/raw/<CODE>.json`, mathcheck 0 errors, validate 0 problems,
unique temp names prefixed with your code). Differences:

## Per question
- Solve it **rigorously**: for every option decide true/false with a real argument (reduction,
  counterexample, closure fact, trace of the TM diagram step by step). Course facts: use only what the course teaches (see the briefs under docs/briefs/); anything beyond that
  you may use privately to double-check but not cite in explanations.
- Exactly one option must survive (or several that the question's wording makes all-correct →
  `acceptedIds`, only if truly unavoidable). If two options look right, or none, or the
  question is ambiguous / has a print error that changes the answer → `hold: "<reason>"`.
- Fields: `answerSource: "solved"`, `official: false`, `confidence: "high"` (anything less →
  `hold`), `explanation`: your concise Hebrew proof (why the answer holds + short refutation of
  each other option). Start it with nothing special — the app already shows "לא רשמית".
- Partial evidence (tutor's circles, form-0 first option, a later exam reusing the same
  question with a key): record it in `note` ("form-0 first option: א — agrees" / "tutor circled
  ג — DISAGREES"). If it disagrees with your solution → `hold` with both answers in the reason.
- Reused questions: if a question is identical (stem + options) to a keyed question elsewhere in
  `tools/raw/*.json`, you may take that key (answerSource "solved", note "same as <id>") — still
  verify it.

## Generators
Write long explanations as raw triple-quoted paragraphs joined with "\n" (see the RESOLUTIONS
block in `tools/gen/gen_22B-A.py`) — never put TeX in a non-raw string (`\notin` → newline!).
Run `PYTHONUTF8=1 py -W error::SyntaxWarning tools/gen/gen_<CODE>.py`, then
`PYTHONUTF8=1 py tools/validate.py <CODE>` (it also runs `tools/gen/lint_escapes.py`).

## Report
Per sitting: #questions, #held (+ reasons), your answer string, evidence agreements/disagreements.
