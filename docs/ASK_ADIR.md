# ASK_ADIR - oop

Open questions for Adir. One entry per item; the orchestrator moves it to Resolved when answered.

## Open

<!-- Entry format:
### <exam code> Q<number> - <short title>
- Path: <absolute file path>
- Page: <page number>
- Question: <what is unclear or missing>
- Needed: <what Adir must provide or decide>
- Status: hold
-->

### 25S-A Q1 - official key vs compile run (hold)
- Path: sitting 25S-A (summer 2025 moed A, 30.09.2025), question paper p.3, answer sheet p.1
- Page: 3
- Question: the official sheet (version 1) highlights b (`B ctor operator B() B ctor`) and c (`B ctor B ctor`). clang++ (c++14/17/20) refuses to compile the program: `b1 = a1;` is ambiguous between the converting constructor B(const A&) and A::operator B().
- Needed: decide whether to keep the item with answer c (or b, c), or drop it.
- Status: hold

### 25S-A Q14 and Q17 - sheet accepts more than one option
- Path: sitting 25S-A, answer sheet p.1 (version 1)
- Page: 16 and 19
- Question: Q14 has all four options highlighted; Q17 has a, b and d highlighted. The run and the language rule give exactly b for both (Q14 prints option b; Q17 statement 2). Stored with correctId b only.
- Needed: (done) acceptedIds now hold every highlighted option; correctId stays b.
- Status: resolved: all highlighted options accepted per official sheet

### 18A-A Q19 - cancelled question (hold)
- Path: sitting 18A-A (2018 sem A moed A, 06.02.2018), question paper
- Page: 7
- Question: the paper prints "בוטלה" (cancelled) next to Q19 and marks option ד in red. clang++ reports the errors on lines 8, 11 and 12, so none of the four options (lines 7 / 7+10 / 7+11 / 7+10+11) is correct.
- Needed: keep it held (dropped from the bank), or ship it with a corrected option set.
- Status: hold

### 18A-C Q12 - MFC question, no key (hold)
- Path: sitting 18A-C (2018 sem A moed C, 17.05.2018), scan
- Page: 4
- Question: "which function is NOT called when a window opens in MFC" (OnInitDialog / OnPaint / OnLButtonDown / "a and b"). Not runnable; the only marks on the scan are a student's (c and d both boxed). The likely answer is c (OnLButtonDown) but there is no official source.
- Needed: send it to the solver, or give the key.
- Status: hold

### 18A-C (all) and 19A-A Q7 - keys from the run, not from a source
- Path: sittings 18A-C (whole sitting) and 19A-A Q7
- Page: 18A-C pp.1-8; 19A-A p.3
- Question: 18A-C has only a student's own boxes (not graded; several clearly wrong, e.g. Q2, Q7, Q13), so 23 keys come from clang++ runs (official:false) and Q15/Q20 copy the official keys of identical 18A-B questions. 19A-A Q7 has no highlight on the paper; its key is the run.
- Needed: confirm that run-derived keys are acceptable for these items.
- Status: info

## Resolved
