# Learn coverage - oop

Built from the 13 transcribed sittings in `tools/raw/*.json` (264 questions: 18A-A/B/C, 19A-A/B/C, 20B-A, 21B-B, 22B-A, 22S-B, 23B-B, 23S-A, 25S-A). Question ids are `<sitting>-Q<n>`. Briefs are in `docs/briefs/`. Every C++ example in the briefs was compiled and run with clang++ (C++17) by a generator that pastes the real output; compile-error examples show the compiler's own messages.

| Concept | Brief section | Example question ids |
|---|---|---|
| Reference: init required, alias, no reseat | 01 definitions | 18A-A-Q1, 18A-B-Q19, 19A-A-Q1 |
| Function returning `T&` as lvalue, static local | 01 definitions, example | 18A-B-Q1, 19A-A-Q4, 21B-B-Q6, 21B-B-Q7, 23S-A-Q1 |
| By value / reference / pointer | 01 example | 18A-B-Q2, 18A-C-Q2, 19A-A-Q2 |
| Default arguments | 01 definitions, example | 18A-A-Q2, 19A-A-Q3, 23B-B-Q1 |
| Overload resolution and ambiguity | 01 recipes, traps | 19A-B-Q1, 19A-B-Q3, 20B-A-Q7, 20B-A-Q12, 25S-A-Q17 |
| struct vs class | 01 definitions, 02 traps | 23B-B-Q14, 19A-C-Q9 |
| `X b();`, `X c = X;` vexing parse | 02 recipes, example | 18A-A-Q4 |
| Ctor, init list, dtor rules | 02 definitions | 21B-B-Q9, 21B-B-Q10, 21B-B-Q11 |
| new/delete, new[]/delete[] | 02 example | 19A-A-Q6, 21B-B-Q4 |
| Implicit special members, no `==` | 02 traps | 19A-A-Q8, 22B-A-Q1 |
| Private ctors | 02 traps | 22B-A-Q14, 23B-B-Q15 |
| Getters returning ref/pointer | 02 traps | 23B-B-Q6 |
| Copy ctor vs assignment, which is called | 03 definitions, example | 19A-A-Q9, 18A-C-Q3, 22S-B-Q4 |
| Shallow vs deep, rule of three | 03 definitions, example | 19A-A-Q19, 20B-A-Q2, 21B-B-Q1, 22B-A-Q4 |
| Assignment signature, chaining | 03 example | 19A-A-Q21, 22B-A-Q4 |
| Copy ctor signature, const source | 03 traps | 23S-A-Q2, 23S-A-Q13, 25S-A-Q15, 20B-A-Q4, 20B-A-Q5 |
| Counting copies, elision | 03 definitions | 23B-B-Q9, 22B-A-Q6 |
| const pointers (3 forms) | 04 definitions, example | 18A-A-Q7, 19A-B-Q18 |
| const member functions, `this` type | 04 definitions, example | 18A-A-Q6, 19A-B-Q7, 19A-B-Q17 |
| const / reference members need init list | 04 definitions, example | 18A-A-Q20, 18A-B-Q4, 18A-A-Q19, 18A-A-Q24, 18A-A-Q25 |
| Overload on const | 04 example | 19A-A-Q14, 23B-B-Q12, 23S-A-Q12 |
| Temporaries and `const T&` | 04 traps | 21B-B-Q6, 25S-A-Q15 |
| friend function / class, one-way, per-overload | 05 definitions, traps | 18A-A-Q5, 18A-B-Q5, 19A-A-Q5, 21B-B-Q17, 23B-B-Q7 |
| `this`, `return *this` chaining | 05 example | 18A-B-Q6, 21B-B-Q12 |
| static members and functions | 05 definitions, example | 20B-A-Q10, 19A-B-Q12, 23B-B-Q2, 20B-A-Q8 |
| static local in a ctor | 05 traps | 21B-B-Q15 |
| Friend of derived vs base members | 05 traps, 09 | 25S-A-Q9 |
| Member init order = declaration order | 06 definitions, example | 19A-B-Q21, 19A-C-Q22 |
| Init list required (const, ref, base without default ctor) | 06 definitions, traps | 19A-A-Q12 |
| Member assigned in body vs init list | 06 example | 19A-B-Q16, 22B-A-Q7 |
| is-a vs has-a design | 06 definitions | 20B-A-Q11, 20B-A-Q13, 21B-B-Q13 |
| Pointer cycles between classes | 06 definitions | 21B-B-Q18 |
| Operator as member vs free function | 07 table, definitions | 18A-B-Q7, 18A-C-Q7, 19A-B-Q22, 22B-A-Q9 |
| Pre/post `++`, `()`, `[]`, `=` | 07 table, example | 18A-A-Q9, 19A-C-Q1, 18A-B-Q9, 22S-B-Q13, 25S-A-Q16 |
| `<<` / `>>` returning stream | 07 table, traps | 18A-A-Q22, 18A-B-Q23, 21B-B-Q3, 21B-B-Q19 |
| Operators in inheritance / templates | 07 | 22B-A-Q12, 22S-B-Q9, 23S-A-Q3, 23S-A-Q4 |
| Converting constructor, `explicit` | 08 definitions, example | 18A-B-Q8, 18A-C-Q8, 18A-A-Q8 |
| Conversion operator | 08 definitions, example | 19A-C-Q2, 23S-A-Q13, 23B-B-Q5 |
| One user-defined conversion, ambiguity | 08 traps | 25S-A-Q1 (held) |
| Access table by inheritance mode | 09 definitions, example | 18A-A-Q10, 19A-B-Q11, 25S-A-Q7, 23B-B-Q3, 22B-A-Q5, 23S-A-Q7 |
| Up-cast, down-cast, slicing in assignment | 09 definitions, example | 19A-B-Q19, 25S-A-Q2, 18A-C-Q21 |
| Calling base version, name hiding | 09 definitions, traps | 18A-A-Q17, 19A-A-Q15, 21B-B-Q5 |
| Incomplete type in class body | 09 traps | 25S-A-Q8 |
| Construction/destruction order, base then members | 10 definitions, example | 18A-A-Q11, 25S-A-Q5, 25S-A-Q6, 22B-A-Q11, 22S-B-Q8 |
| Globals, locals, static locals | 10 example | 18A-A-Q3, 18A-B-Q3, 19A-A-Q7, 19A-A-Q13, 23B-B-Q13, 23S-A-Q11 |
| `new` without delete, delete via base ptr | 10 traps | 18A-A-Q16, 18A-B-Q14 |
| Default base ctor choice | 10 definitions | 19A-A-Q16, 19A-B-Q14, 21B-B-Q8 |
| Temporaries lifetime | 10 example | (concept check, no direct question) |
| Static vs dynamic dispatch | 11 definitions, example | 18A-A-Q15, 18A-B-Q13, 19A-A-Q17, 19A-A-Q18, 20B-A-Q15, 23B-B-Q4, 23B-B-Q10 |
| Slicing by value parameter / vector | 11 definitions, traps | 19A-B-Q5, 19A-C-Q18 |
| Signature must match to override, `override` | 11 traps | 21B-B-Q20 |
| Qualified call disables virtual | 11 traps | 25S-A-Q3 |
| Default args are static | 11 example | 22S-B-Q2 |
| Virtual in ctor/dtor, virtual dtor | 10 traps, 11 | 22B-A-Q3, 25S-A-Q5 |
| vtable, ctor not virtual | 11 definitions | 22S-B-Q3, 21B-B-Q9 |
| Abstract classes, pure virtual | 12 definitions, traps | 18A-B-Q16, 19A-B-Q15, 25S-A-Q4, 20B-A-Q9 |
| Diamond: two copies, ambiguity, qualified access | 12 definitions, example, traps | 19A-B-Q10, 19A-B-Q20, 22B-A-Q8, 22B-A-Q15, 23S-A-Q6 |
| Virtual base ctor called once | 12 example | 23S-A-Q14 |
| `dynamic_cast` | 12 definitions, example | 25S-A-Q10, 25S-A-Q11 |
| Static per template instantiation | 13 definitions, example | 18A-B-Q24, 19A-B-Q8, 21B-B-Q16, 22S-B-Q7, 20B-A-Q1 |
| Deduction needs identical T, explicit args | 13 definitions, traps | 18A-B-Q17, 19A-A-Q22 |
| Class template needs `<...>` | 13 definitions | 18A-C-Q17, 19A-C-Q15 |
| Default / non-type template params | 13 definitions, example | 23S-A-Q15, 25S-A-Q13 |
| Specialization, overload ranking | 13 definitions, example | 20B-A-Q3, 23B-B-Q5, 25S-A-Q14, 21B-B-Q2 |
| Out-of-class template member, friend in template | 13 definitions | 22S-B-Q14, 22S-B-Q9, 19A-A-Q23, 23S-A-Q4 |
| `A<Y>` vs `A<X>` unrelated | 13 definitions | 19A-A-Q24 |
| vector: insert, erase, push_back, size | 14 definitions, example | 18A-A-Q18, 18A-A-Q21, 18A-B-Q18, 18A-C-Q18 |
| Iterators: begin/end, `*(it++)`, arithmetic | 14 definitions, example | 18A-B-Q21, 19A-B-Q25, 21B-B-Q14, 19A-A-Q25 |
| vector copy semantics, range ctor | 14 example | 22B-A-Q13, 23S-A-Q5 |
| Iterator invalidation, type errors | 14 traps | 25S-A-Q12 |
| list/set/map basics | 14 definitions, example | (not asked in transcribed sittings) |
| try / catch / throw, unwinding | 14 definitions, example | (not asked in transcribed sittings) |
| MFC classes (CArchive, CFile, CPaintDC, OnPaint) | 14 traps | 18A-A-Q13, 18A-A-Q14, 18A-B-Q12, 18A-B-Q15, 18A-B-Q20 |

## Gaps and limits

- **MFC** (18A-A Q13/Q14, 18A-B Q12/Q15/Q20, 18A-C Q12/Q15/Q20): taught as short facts only. The source summaries' Hebrew text layer is unreadable by pdftotext and MFC cannot be compiled here, so there is no runnable example. 18A-C-Q12 ("which function is not called when a window opens") has no trusted key and is held.
- **Exceptions, list/set/map**: taught with compiled examples, but no transcribed question uses them yet (the 2023-2025 sittings do not either), so there are no example question ids.
- **Held questions** (key unverified, concepts are still taught): 18A-A-Q19, 18A-C-Q12, 19A-C-Q6, 20B-A-Q1, Q6, Q17, 21B-B-Q13, 22B-A-Q6, 22S-B-Q1, 25S-A-Q1.
- **Sittings not yet in `tools/raw/*.json`** (21B-A, 21S-B, 22B-B, 23B-A, 24B-A/B, 25B-A/B) are not covered by this table. Re-check the table when they are transcribed.
- **Pre-C++17 keys:** some old answer keys (e.g. 23S-A-Q13, copy counts) assume the old copy rules. 03 and the cheat sheet say so.
- **Sources:** the lecture and student summaries were read for topic coverage (their Hebrew text layer is not extractable, so code and structure only); the cheat-sheet.pdf is AI-written and every claim taken from it was re-checked by compiling.
- **Question links:** only questions already in `questions.json` (25S-A-Q2 to Q17) are linked as clickable chips. Other ids appear as plain text and become clickable only if the briefs are re-linked after the bank grows.
