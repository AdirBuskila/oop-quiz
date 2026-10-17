# Stage-2 support for keyless sittings.
#   strip:   py tools/gen/verify_strip.py strip <CODE>    -> tools/raw/_blind_<CODE>.json (no answers/explanations)
#   compare: py tools/gen/verify_strip.py compare <CODE>  -> compares tools/raw/<CODE>.json with the verifier's
#            tools/raw/_verify_<CODE>.json  ({"answers": {"<num>": {"answer": "a", "confident": true,
#            "transcriptionIssues": "..."}}}) and prints agreements / disagreements.
import json, sys, pathlib
RAW = pathlib.Path(__file__).resolve().parents[1] / "raw"
KEEP_Q = ("num", "topic", "question", "contextId", "image", "options")
cmd, code = sys.argv[1], sys.argv[2]
src = json.loads((RAW / f"{code}.json").read_text(encoding="utf-8"))
if cmd == "strip":
    out = {"examCode": code, "sourceFile": src.get("sourceFile"), "contexts": src.get("contexts", {}),
           "questions": [{k: q[k] for k in KEEP_Q if k in q} for q in src["questions"]]}
    (RAW / f"_blind_{code}.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"wrote _blind_{code}.json ({len(out['questions'])} questions)")
elif cmd == "compare":
    ver = json.loads((RAW / f"_verify_{code}.json").read_text(encoding="utf-8"))["answers"]
    agree = dis = 0
    for q in src["questions"]:
        v = ver.get(str(q["num"]))
        s1 = None if q.get("hold") else q["correctId"]
        ok1 = set(q.get("acceptedIds") or [q["correctId"]])
        if v is None:
            print(f"Q{q['num']}: MISSING in verifier"); dis += 1; continue
        issues = v.get("transcriptionIssues") or ""
        if s1 and v.get("confident") and v["answer"] in ok1 and not issues:
            agree += 1
        else:
            dis += 1
            print(f"Q{q['num']}: stage1={s1 or 'HOLD:'+str(q.get('hold'))[:60]} verifier={v.get('answer')} "
                  f"confident={v.get('confident')} issues={issues[:120]!r}")
    print(f"{code}: agree {agree}, not-agreed {dis}")
