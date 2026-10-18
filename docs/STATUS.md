# STATUS - oop

Resume here: phase 7 - ship, awaiting Adir (phase 6 QA done 2026-10-18: 406 questions in bank, 16 held for Adir at the top of docs/ASK_ADIR.md, 4 guided courses / 28 levels, 15 learn chapters; ship also needs the deck redesign check and GATE 3)
Opus sessions: 0 of 2
Engine: mcq   Format: unknown   Cutoff: unknown

Triage material (private, names students, never copied into this repo): C:\Users\Adir\Desktop\Coding\Dev\course-factory\courses\oopormat_triage.md

Gates 1, 2 and 7 always stop for Adir.

- [ ] Phase 0 - intake
  - [ ] registry entry exists
  - [ ] source folder exists and is non-empty
- [ ] Phase 1 - triage  (GATE 1: Adir approves format, cutoff, topics)
  - [ ] triager run per subfolder
  - [ ] format_triage.md merged (verdict, cutoff, topics, engine choice)
  - [ ] Adir approved
  - [ ] config.overlay.json written, app repo scaffolded (triage stays in the factory)
- [ ] Phase 2 - flagship  (GATE 2: Adir tries it in the browser)
  - [x] topic taxonomy chosen
  - [x] flagship sitting transcribed + validated (25S-A, 30.09.2025, official answer sheet v1; all code questions run with clang++)
  - [x] steps: n/a (mcq engine, no open questions)
  - [x] smoke / verify_dom green, running locally
  - [ ] Adir tried it
- [ ] Phase 3 - bank
  - [x] all in-scope sittings transcribed (22 files in tools/raw, 22 gen_*.py)
  - [x] validate.py clean (0 problems, 2026-10-18)
  - [x] solver run for questions with no trustworthy solution (answerSource solved, official:false)
  - [x] refuter: tools/raw/_verify_ai_*.json verdicts + tools/verify/
  - [x] arbiter / ASK_ADIR for disagreements (rulings recorded in ASK_ADIR.md)
  - [ ] completeness check per exam
- [ ] Phase 4 - steps (n/a for mcq engine, nothing to author)
  - [ ] step-author batches done for every open question
  - [ ] rubricSource / stepsSource labeled
  - [ ] refuter on every steps block
- [x] Phase 5 - learn
  - [x] learn-writer per topic (docs/briefs, 15 chapters)
  - [x] coverage report: docs/learn_coverage.md, re-passed against the full bank in phase 6
- [x] Phase 5b - need help
  - [x] 4 course areas, `needHelp` in course.config.json
  - [x] lessons + questions in courses/{copy_control,ctor_order,virtual,operators}
  - [x] course_lint.js --strict clean (0 errors), machine-checked with clang++ (tools/verify/needhelp)
  - [x] tools/redact.txt filled, validate.py clean
- [x] Phase 6 - QA
  - [x] validate, build_questions, build_learn, smoke, verify_dom, verify_learn green
  - [x] shoot.js screenshots taken and read (390 + 1000, both themes)
  - [x] manual screenshot sweep clean (no render-checker worker run; orchestrator-side QA read the shots)
- [ ] Phase 7 - ship  (GATE 3: Adir OKs going public)
  - [ ] deck redesign done (else stop and tell Adir)
  - [ ] .gitignore excludes raw PNGs, favicon, GoatCounter, .nojekyll
  - [ ] year range checked against data
  - [ ] Adir OK to go public
  - [ ] GitHub repo + Pages live
  - [ ] deck tile added
  - [ ] registry status = live

## Notes
