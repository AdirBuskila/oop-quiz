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
- Needed: confirm b alone is fine, or say to store the sheet's accepted sets as acceptedIds.
- Status: decision

## Resolved
