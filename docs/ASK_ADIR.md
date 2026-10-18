# ASK_ADIR - oop

Open questions for Adir. One entry per item; the orchestrator moves it to Resolved when answered.

## HELD FOR ADIR: 16 questions, all excluded from the shipped bank (406 ship)

Each needs only one decision: give the intended answer (the entry below says what it hinges on) or leave it out. Details per item further down.

1. 18A-A Q19 - cancelled on the paper, no option correct
2. 21B-A Q6 - undefined behaviour (double delete), c or d
3. 21B-A Q13 - out-of-bounds write, b / c / d
4. 21S-B Q17 - 1 or 2 errors (does the link error count)
5. 22S-B Q1 - unspecified evaluation order of `*`, a or b
6. 23S-A Q13 - depends on C++ standard, a (C++17) or b (C++14)
7. 24B-A Q7 - graded key b disagrees with the language rules (c)
8. 24B-A Q14 - graded key vs a second true statement
9. 24B-B Q14 - key d vs clang++ default (string literal to `char*`)
10. 25B-B Q5 - double `delete[]`, b or c
11. 25S-A Q1 - official key accepts b and c but the program is ambiguous and does not compile
12. SAMP-18 Q4 (UB), Q8, Q17 (no option compiles), Q11, Q13 (no option matches): 5 items, sample exam has no key

Also note for Adir (info only, nothing blocks): run-derived (`official:false`) keys ship labelled for 18A-C, 19A-A Q7, 21B-A, 22S-B, 23B-B, 23S-A and the 2024-2025 sittings; one first-name entry in tools/redact.txt is also a common Hebrew word ("ספירה"), so a raw substring grep of the built files shows false hits; validate.py is the real check.

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
- Status: hold (arbiter 2026-10-18: the program is ill-formed, because the conversion A to B is ambiguous for B's copy/move assignment. The official key accepts two options, so no single reading wins)

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
- Status: hold (arbiter 2026-10-18: the paper itself cancels it and the printed numbering is confirmed on the page, so no option is right)

### 18A-C (all) and 19A-A Q7 - keys from the run, not from a source
- Path: sittings 18A-C (whole sitting) and 19A-A Q7
- Page: 18A-C pp.1-8; 19A-A p.3
- Question: 18A-C has only a student's own boxes (not graded; several clearly wrong, e.g. Q2, Q7, Q13), so 23 keys come from clang++ runs (official:false) and Q15/Q20 copy the official keys of identical 18A-B questions. 19A-A Q7 has no highlight on the paper; its key is the run.
- Needed: confirm that run-derived keys are acceptable for these items.
- Status: info

### 21B-A Q6 and Q13 - undefined behaviour (hold)
- Path: sitting 21B-A (version 1), question paper
- Page: Q6 p.6, Q13 p.12
- Question: no official key exists (only hand-marked student sheets); 18 of 20 keys come from clang++ runs and match the sheet. Q6: the double delete happens during the third call f(a1), not before it (student marks c); Q13: `ia[20] = 3` writes past a 12-int array: prints 3 at -O0, garbage at -O2 (student marks b, MSVC debug would stop).
- Needed: the intended answers for Q6 and Q13, or leave them out.
- Status: hold (arbiter 2026-10-18: both are undefined behaviour (Q6 also uses `delete` on a `new[]` array), so the standard fixes no output; Q6 splits between c and d, Q13 between b, c and d)

### 22S-B Q1 - unspecified evaluation order (hold)
- Path: sitting 22S-B (summer 2022 moed B, 25.10.2022), question paper
- Page: 3
- Question: `return f(x, c) * x;` with `x` a reference: the operand order of `*` is unspecified. clang++ gives 6561 (option a); a right-to-left compiler (the exam's MSVC style `void main`) would give 3024 (option b). The file has no answer source.
- Needed: the intended answer (a or b), or leave it out.
- Status: hold (arbiter 2026-10-18: C++17 (P0145) did not sequence the operands of `*`; it only fixed <<, >>, assignment, [], ->* and the call's callee. The order stays unspecified)

### 23S-A Q13 - answer depends on the C++ standard (hold)
- Path: sitting 23S-A (summer 2023 moed A, 13.09.2023), question paper
- Page: 11
- Question: `A(A& a)` (non-const copy ctor) cannot bind a temporary. clang++ -std=c++17 counts 0 error lines, -std=c++14 counts 1 (`A a1 = 1;`), and MSVC accepts temporary-to-`A&` as an extension. The file has no answer source.
- Needed: the intended count (0, 1 or 2), or leave it out.
- Status: hold (arbiter 2026-10-18: C++11/14 give 1 line (b), C++17 gives 0 (a); `A a2 = A(2)` compiles in both via operator int and A(int), so 2 (c) fits no standard. Nothing in the course material fixes its standard; MSVC defaults to C++14 but accepts the binding as an extension)

### 21S-B Q17 - compile error count vs link error (hold)
- Path: sitting 21S-B (summer 2021 moed B, 07.11.2021), graded student scan
- Page: Q17 (page not recorded)
- Question: "how many errors". clang++ reports one compile error (`return aa;`: no A<int> to int conversion); after that, the link fails because the friend `operator<<` declared in the template is a non-template function that is never defined. 1 (b) or 2 (c), depending on whether the link error counts. The student's d was graded wrong, which rules out only d.
- Needed: the intended count (1 or 2), or leave it out.
- Status: hold (arbiter 2026-10-18: two readings, no key)

### 22S-B, 23B-B, 23S-A, 23B-A - keys are run/rule-derived
- Path: sittings 22S-B, 23B-B, 23S-A (no key in the files), 23B-A (graded copy, grader marks agree with clang++ on every code question)
- Page: all
- Question: keys for the first three come from clang++ runs or language rules, stored official:false. Judgement calls kept at confidence med: 22S-B Q3, Q5, Q15; 23B-B Q6, Q11 (the call `f(b)` is also reported as a cascade error), Q14, Q15; 23S-A Q3 (assumes iostream alone), Q4 (0 compile errors but a link error).
- Needed: confirm run-derived keys are acceptable for these items.
- Status: info

### 25B-B Q5 - double delete at exit (hold)
- Path: sitting 25B-B (2025 sem B moed B, 19.08.2025), question paper
- Page: 11
- Question: shallow copy constructor, then both objects delete[] the same array. The program prints `999 10 20` twice, then the double delete is undefined behaviour (clang++ on Windows aborts). The grader circled c (runtime error); b (output only) is what a lenient reading gives.
- Needed: the intended answer (b or c), or leave it out.
- Status: hold

### 24B-B Q14 - string literal to char* (hold)
- Path: sitting 24B-B (2024 sem B moed B, 15.08.2024), question paper
- Page: 15
- Question: `MyClass<char*> obj4("Hello!")`. The red key says d (does not compile, the C++11+ rule), but clang++ -std=c++17 only warns by default and prints `10 15.5 Hello!`.
- Needed: confirm d is acceptable, or leave it out.
- Status: hold

### 24B-A Q7 and Q14 - graded key vs the language rules (hold)
- Path: sitting 24B-A (2024 sem B moed A, 25.07.2024), question paper
- Page: Q7 p.17 (paper p.9), Q14 p.31 (paper p.16)
- Question: Q7: the graded copy circles b (one true statement), but statements 1 and 3 are both true by the language rules (c). Q14: the graded copy circles b (one true statement); a friend external function (statement 2) and a non-friend one (statement 3) both compile.
- Needed: the intended answers for Q7 and Q14, or leave them out.
- Status: hold

### 24B-A, 24B-B, 25B-A, 25B-B - keys are run-derived or graded-copy
- Path: all four sittings
- Page: all
- Question: code questions are keyed from clang++ runs (stored official:false) and agree with the graded copies / red marks. Judgement calls kept at confidence med: 25B-B Q9 (typo in the paper corrected), Q17; 25B-A Q1, Q10; 24B-B Q12. 25B-A header says moed A 1/07/2025 while the slot stamp says 22/07/2025 (code kept 25B-A, date 22.07.2025). `void main` in 24B-A Q12/Q16 is MSVC style, run as int main.
- Needed: confirm run-derived keys are acceptable.
- Status: info

## Resolved

### 18A-C Q12 - MFC question, no key (hold)
- Path: sitting 18A-C (2018 sem A moed C, 17.05.2018), scan
- Page: 4
- Question: "which function is NOT called when a window opens in MFC" (OnInitDialog / OnPaint / OnLButtonDown / "a and b"). Not runnable; the only marks on the scan are a student's (c and d both boxed). The likely answer is c (OnLButtonDown) but there is no official source.
- Needed: send it to the solver, or give the key.
- Status: resolved (Arbiter ruling 2026-10-18): shipped c (OnLButtonDown), answerSource solved, official:false, confidence med. Opening a dialog sends WM_INITDIALOG and WM_PAINT; a button-down needs a click.

### 19A-C Q6 - no highlighted option, no option compiles (hold)
- Path: sitting 19A-C, question paper
- Page: 3
- Question: "what to write on line 4 so the program compiles and prints 1" (`new X` / `X()` / `this` / `*this`). Nothing is highlighted, and `&x == x.f()` compares an X* with an X&, so all four options fail to compile under clang++ (the intended expression is probably `&x == &x.f()` with `*this`).
- Needed: the intended key, or confirm it stays out of the bank.
- Status: resolved (Arbiter ruling 2026-10-18): shipped d (`*this`) with a note in the explanation, confidence med. Every reasonable repair (add `public:`, compare `&x == &x.f()`) compiles only with `*this` and prints 1.

### 20B-A - boxes are not an official key; Q1, Q6, Q17 held
- Path: sitting 20B-A (2020 quiz PDF of screenshots)
- Page: Q1 p.1, Q6 p.4, Q17 p.10 (whole file pp.1-10)
- Question: each question has one boxed option plus hand-drawn X marks and handwriting, so the boxes look like a person's answers, not an official key. All 17 keys were re-derived (clang++ where runnable, reasoning for the class-design Q11 and Q13) and stored official:false. Three boxes disagree with the run and are held: Q1 (box: statics shared by all objects of the template; run: only per instantiation), Q6 (box: "always true" for overloads that differ in return type; C++ rejects it), Q17 (box: "not possible"; `RAM() : Memory(3) {}` compiles and sets i to 3).
- Needed: confirm the run-derived keys for Q1/Q6/Q17 (a / b / a), or say the boxes are the lecturer's key; the exact exam date is not printed in the file.
- Status: resolved (Arbiter ruling 2026-10-18): Q1 a (med), Q6 b (med), Q17 a (high), answerSource solved, official:false; the explanations say the box differs and is not an official key.

### 21B-B Q13 - design question, no key
- Path: sitting 21B-B (2021 sem B moed B, 26.07.2021), question paper
- Page: Q13 (page not recorded)
- Question: best class structure for Apartment / LivingRoom / BathRoom / BedRoom; no key, nothing to run.
- Needed: (done)
- Status: resolved (Arbiter ruling 2026-10-18): shipped a (Room base class, Apartment holds a collection of rooms), confidence med; the explanation notes that `vector<Room*>` avoids slicing.

### 21S-B Q10 - concept question, graded mark ambiguous
- Path: sitting 21S-B (summer 2021 moed B, 07.11.2021), graded student scan
- Page: 8
- Question: overloading + default arguments map to which OOP feature? The student circled both b and c and the question was graded wrong.
- Needed: (done) if the grader's key is known and is not b, say so.
- Status: resolved (Arbiter ruling 2026-10-18): shipped b (polymorphism, compile-time), confidence med.

### 22B-A Q6 - "necessarily" uses the copy constructor
- Path: sitting 22B-A (2022 sem B moed A, 19.06.2022), question paper
- Page: Q6 (page not recorded)
- Question: of f1..f6, how many calls necessarily use the copy ctor? f2 (by-value parameter) does; f4 (by-value return) may be elided (guaranteed for a prvalue since C++17).
- Needed: (done) override if the lecturer counts f4 (answer b).
- Status: resolved (Arbiter ruling 2026-10-18): shipped a (1), confidence med.

### SAMP-18 Q4, Q8, Q11, Q13, Q17 - held (sample exam has no key)
- Path: sitting SAMP-18 (2018 sample exam, no date printed), question paper
- Page: Q4 p.2, Q8 p.3, Q11 p.4, Q13 p.4, Q17 p.6
- Question: Q4 shallow copy, the answer is the use-after-free itself (rule gives d; no ASan here). Q8 and Q17: the printed code compiles with no option (`&x == x.f()` compares X* with X&; `class Y` does not derive from X); same defects as 19A-C Q6 (arbiter shipped d) and 18A-A/B (Y : public X, answer d 1342). Q11: with the missing `;` added, A, B, C compile and D does not, which matches no option (nearest d). Q13: private inheritance leaves f reachable inside Y only, no option says that (nearest b).
- Needed: apply the same repair rulings (Q4 d, Q8 d, Q17 d) and say what to do with Q11 and Q13, or keep them out of the bank.
- Status: open
