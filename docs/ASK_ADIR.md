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

### 19A-C Q6 - no highlighted option, no option compiles (hold)
- Path: sitting 19A-C, question paper
- Page: 3
- Question: "what to write on line 4 so the program compiles and prints 1" (`new X` / `X()` / `this` / `*this`). Nothing is highlighted, and `&x == x.f()` compares an X* with an X&, so all four options fail to compile under clang++ (the intended expression is probably `&x == &x.f()` with `*this`).
- Needed: the intended key, or confirm it stays out of the bank.
- Status: hold

### 20B-A - boxes are not an official key; Q1, Q6, Q17 held
- Path: sitting 20B-A (2020 quiz PDF of screenshots)
- Page: Q1 p.1, Q6 p.4, Q17 p.10 (whole file pp.1-10)
- Question: each question has one boxed option plus hand-drawn X marks and handwriting, so the boxes look like a person's answers, not an official key. All 17 keys were re-derived (clang++ where runnable, reasoning for the class-design Q11 and Q13) and stored official:false. Three boxes disagree with the run and are held: Q1 (box: statics shared by all objects of the template; run: only per instantiation), Q6 (box: "always true" for overloads that differ in return type; C++ rejects it), Q17 (box: "not possible"; `RAM() : Memory(3) {}` compiles and sets i to 3).
- Needed: confirm the run-derived keys for Q1/Q6/Q17 (a / b / a), or say the boxes are the lecturer's key; the exact exam date is not printed in the file.
- Status: hold

### 21B-A Q6 and Q13 - undefined behaviour (hold)
- Path: sitting 21B-A (version 1), question paper
- Page: Q6 p.6, Q13 p.12
- Question: no official key exists (only hand-marked student sheets); 18 of 20 keys come from clang++ runs and match the sheet. Q6: the double delete happens during the third call f(a1), not before it (student marks c); Q13: `ia[20] = 3` writes past a 12-int array: prints 3 at -O0, garbage at -O2 (student marks b, MSVC debug would stop).
- Needed: the intended answers for Q6 and Q13, or leave them out.
- Status: hold

### 22S-B Q1 - unspecified evaluation order (hold)
- Path: sitting 22S-B (summer 2022 moed B, 25.10.2022), question paper
- Page: 3
- Question: `return f(x, c) * x;` with `x` a reference: the operand order of `*` is unspecified. clang++ gives 6561 (option a); a right-to-left compiler (the exam's MSVC style `void main`) would give 3024 (option b). The file has no answer source.
- Needed: the intended answer (a or b), or leave it out.
- Status: hold

### 23S-A Q13 - answer depends on the C++ standard (hold)
- Path: sitting 23S-A (summer 2023 moed A, 13.09.2023), question paper
- Page: 11
- Question: `A(A& a)` (non-const copy ctor) cannot bind a temporary. clang++ -std=c++17 counts 0 error lines, -std=c++14 counts 1 (`A a1 = 1;`), and MSVC accepts temporary-to-`A&` as an extension. The file has no answer source.
- Needed: the intended count (0, 1 or 2), or leave it out.
- Status: hold

### 22S-B, 23B-B, 23S-A, 23B-A - keys are run/rule-derived
- Path: sittings 22S-B, 23B-B, 23S-A (no key in the files), 23B-A (graded copy, grader marks agree with clang++ on every code question)
- Page: all
- Question: keys for the first three come from clang++ runs or language rules, stored official:false. Judgement calls kept at confidence med: 22S-B Q3, Q5, Q15; 23B-B Q6, Q11 (the call `f(b)` is also reported as a cascade error), Q14, Q15; 23S-A Q3 (assumes iostream alone), Q4 (0 compile errors but a link error).
- Needed: confirm run-derived keys are acceptable for these items.
- Status: info

## Resolved
