# Build report — תכנות מונחה עצמים questions

- Raw exam files: **22**
- **Final questions: 406** (unique by dedupKey: 380, duplicates kept: 26)
- Excluded: **0** 
- Shared context blocks: **15**
- Math spans rendered (distinct): **0**
- lockOrder: 20 · multiple accepted answers: 10

- **On hold (not in bank, see docs/ASK_ADIR.md): 16**

  - 18A-A-Q19: Cancelled on the paper (בוטלה). clang++ reports errors on lines 8, 11 and 12; no option lists that set.
  - 21B-A-Q6: Undefined behaviour and wording: the runtime error happens during (not before) the third call f(a1); student sheet says c, a literal reading gives d.
  - 21B-A-Q13: Undefined behaviour (out-of-bounds write): clang++ prints 3 at -O0 and garbage at -O2; student sheet says b (runtime error).
  - 21S-B-Q17: no-key: clang++ counts 1 compile error plus a link error (undefined non-template friend operator<<); intended answer 1 vs 2 unclear, student answer d graded wrong
  - 22S-B-Q1: unspecified-evaluation-order: the operands of binary * are unsequenced even in C++17 (P0145 sequenced only <<, >>, =, op=, [], ->*, and the callee before its arguments); clang++ reads x after the call and prints 6561 (a), an order that reads x first gives 3024 (b); no key in source
  - 23S-A-Q13: standard-dependent: `A a1 = 1;` needs a copy from a temporary that A(A&) cannot bind: an error in C++11/14 (1 line, b), legal in C++17 by guaranteed elision (0 lines, a); `A a2 = A(2);` compiles in both via operator int + A(int). The course gives no evidence of its standard (exams target MSVC, whose default is C++14 but which also accepts temporary-to-A& as an extension); no key in source
  - 24B-A-Q7: graded key (b: one true statement) disagrees with the language rules (statements 1 and 3 are both true, giving c)
  - 24B-A-Q14: wording-dependent: the graded key says one true statement (3, a non-friend external function), but statement 2 (a friend function) would also compile
  - 24B-B-Q14: answer depends on the language standard/compiler mode: key d (ill-formed since C++11) vs clang++ default (warning only, prints 10 15.5 Hello!)
  - 25B-B-Q5: double delete[] at exit is undefined behaviour: b (output only) vs c (runtime error) depends on the implementation
  - 25S-A-Q1: Official sheet accepts b (`B ctor operator B() B ctor`) and c (`B ctor B ctor`), but the program does not compile under clang++: `b1 = a1;` is ambiguous between B(const A&) and A::operator B(). Key disagrees with the run.
  - SAMP-18-Q4: ub-answer
  - SAMP-18-Q8: no-option-compiles
  - SAMP-18-Q11: no-option-matches
  - SAMP-18-Q13: no-option-matches
  - SAMP-18-Q17: no-option-compiles

## By topic

| topic | label | n |
|---|---|---|
| `cpp_basics_refs` | הפניות והעמסת פונקציות | 36 |
| `classes_ctor_dtor` | מחלקות, בנאים והורסים | 25 |
| `copy_control` | בנאי העתקה והשמה | 23 |
| `const_references` | const והפניות | 34 |
| `friend_this_static` | friend, this ו-⁠static | 35 |
| `composition` | הכלה וסדר אתחול | 8 |
| `operator_overloading` | העמסת אופרטורים | 34 |
| `operator_conversions` | אופרטורי המרה | 9 |
| `inheritance_access` | ירושה והרשאות גישה | 38 |
| `construction_order` | סדר בנייה והריסה | 32 |
| `virtual_polymorphism` | וירטואליות ופולימורפיזם | 34 |
| `abstract_multiple` | מופשטות וירושה מרובה | 28 |
| `templates` | תבניות | 39 |
| `stl_exceptions` | STL ושגיאות | 31 |

## By exam

- SAMP-18: 15
- 18A-A: 24
- 18A-B: 25
- 18A-C: 25
- 19A-A: 25
- 19A-B: 25
- 19A-C: 25
- 20B-A: 17
- 21B-A: 18
- 21B-B: 20
- 21S-B: 19
- 22B-A: 15
- 22B-B: 15
- 22S-B: 14
- 23B-A: 15
- 23B-B: 15
- 23S-A: 14
- 24B-A: 15
- 24B-B: 16
- 25B-A: 17
- 25B-B: 16
- 25S-A: 16

## By source

- exam: 391
- sample: 15

## By confidence

- high: 343
- med: 63
- low: 0

## Official vs unofficial

- official: 156
- unofficial: 250

## By answerSource

- corrected-key: 14
- highlighted-pdf: 170
- solution-pdf: 32
- solved: 190
