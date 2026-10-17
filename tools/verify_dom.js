// Headless DOM test (jsdom, no browser):  node tools/verify_dom.js
// Boots index.html + questions.js + learn.js + app.js, then:
//   - empty bank  -> asserts the app degrades gracefully (start disabled, empty-state shown)
//   - non-empty   -> starts a practice session and answers it; starts a full-exam session,
//                    answers every question BY ID, submits and expects 100%; asserts every
//                    <math> reaching the DOM has dir="ltr", lockOrder questions keep source
//                    order, Hebrew-free options are dir="ltr", and no JS errors occurred.
//   - learn.js    -> every .qref resolves to a bank id (dangling = FAIL), every .xref to a chapter,
//                    learn <math> is dir=ltr; walks all chapters, opens a peek, follows an xref,
//                    starts a drill. A topic chapter with 0 bank questions only WARNs.
const fs = require("fs"), path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const ROOT = process.env.APP_ROOT || path.join(__dirname, "..");   // APP_ROOT: test a copy (e.g. an empty bank)
const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", e => errors.push("jsdomError: " + (e.message || e)));
vc.on("error", (...a) => errors.push("console.error: " + a.join(" ")));

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const dom = new JSDOM(html, { pretendToBeVisual: true, runScripts: "outside-only", url: "http://localhost/index.html", virtualConsole: vc });
const { window } = dom;
window.scrollTo = () => {};
window.matchMedia = window.matchMedia || (q => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
window.HTMLElement.prototype.scrollIntoView = () => {};
window.confirm = () => true;
window.addEventListener("error", e => errors.push("window.onerror: " + e.message));

// load scripts in index.html order (only local ones; analytics is skipped)
const scripts = [...window.document.querySelectorAll("script[src]")]
  .map(s => s.getAttribute("src")).filter(s => !/^(https?:)?\/\//.test(s)).map(s => s.split("?")[0]);
for (const f of scripts) {
  if (f === "learn.js" && !fs.existsSync(path.join(ROOT, f))) continue;   // no briefs built yet (phase 5)
  try { window.eval(fs.readFileSync(path.join(ROOT, f), "utf8")); }
  catch (e) { errors.push(`eval ${f}: ${e.message}`); }
}

const doc = window.document, $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
let fail = 0;
function assert(cond, msg) { console.log((cond ? "  ok  " : "FAIL  ") + msg); if (!cond) fail++; }
const visible = el => el && !el.classList.contains("hidden");
function mathAllLtr(where) {
  const pre = $$(".code-block").filter(p => p.getAttribute("dir") !== "ltr");
  assert(pre.length === 0, `${where}: all ${$$(".code-block").length} .code-block have dir="ltr"`);
  const ms = $$("math");
  const bad = ms.filter(m => m.getAttribute("dir") !== "ltr");
  assert(bad.length === 0, `${where}: all ${ms.length} <math> have dir="ltr"`);
  return ms.length;
}
function setMode(mode) {
  const r = $(`input[name=mode][value="${mode}"]`); r.checked = true;
  r.dispatchEvent(new window.Event("change", { bubbles: true }));
}

assert(scripts.join() === "questions.js,learn.js,courses.js,app.js,course-ui.js", `scripts loaded: ${scripts.join(", ")}`);
const D = window.CC_QUIZ;
assert(D && Array.isArray(D.questions), "window.CC_QUIZ defined");
const QS = D.questions;
const learnCh = Array.isArray(window.LEARN) ? window.LEARN : ((window.LEARN || {}).chapters || []);
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, "course.config.json"), "utf8"));
assert($$("#topicGrid .topic-btn").length === CFG.topics.length + 1, `topic buttons: ${$$("#topicGrid .topic-btn").length} (${CFG.topics.length} topics + all)`);
assert(doc.documentElement.getAttribute("dir") === "rtl", "page is dir=rtl");
if (!learnCh.length) assert($("#learnEntry").style.display === "none", "learn entry hidden (no chapters)");
else assert($("#learnEntry").style.display !== "none", "learn entry visible");

if (!QS.length) {
  // ---------------- empty bank ----------------
  assert(visible($("#screen-start")), "start screen shown");
  assert($("#startBtn").disabled, "start disabled on empty bank");
  assert(!!$("#emptyState"), "empty-state message shown");
  assert(/ריק/.test($("#poolInfo").textContent), "pool info says the bank is empty");
  $("#startBtn").click();
  assert(!visible($("#screen-quiz")), "clicking start does nothing");
  setMode("exam");
  assert(visible($("#examOpts")) && $$("#examPick option").length === 1, "exam picker has only 'random'");
} else {
  // ---------------- practice ----------------
  $("#startBtn").click();
  assert(visible($("#screen-quiz")), "practice: quiz screen shown");
  assert($("#questionText").innerHTML.trim().length > 0, "practice: question rendered");
  let opts = $$("#optionsList .opt");
  assert(opts.length >= 2, `practice: options rendered: ${opts.length}`);
  mathAllLtr("practice question");
  // answer with a WRONG option when possible, to see both .wrong and .correct marking
  const cur = () => QS.find(x => x.id === $("#questionText").dataset.qid);
  let q = cur();
  assert(!!q, `practice: rendered question identified (${q && q.id})`);
  const acc = q.acceptedIds || [q.correctId];
  const wrongBtn = opts.find(b => !acc.includes(b.dataset.oid)) || opts[0];
  wrongBtn.click();
  assert(visible($("#feedback")), "practice: feedback shown after answering");
  assert(opts.filter(b => b.classList.contains("correct")).length === acc.length,
    `practice: ${acc.length} accepted option(s) marked correct`);
  assert(opts.filter(b => b.classList.contains("correct")).every(b => acc.includes(b.dataset.oid)),
    "practice: marked-correct options are exactly the accepted ids");
  assert(/לא נכון/.test($("#feedback .verdict").textContent) === !acc.includes(wrongBtn.dataset.oid), "practice: verdict matches id grading");
  mathAllLtr("practice feedback");
  // practice history: "back" replays the answered question as it was, "next" returns to where you were
  {
    const qq = s => [...window.document.querySelectorAll(s)];
    const snap = () => $("#questionText").textContent + "|" + qq("#optionsList .opt").map(b => b.dataset.oid || b.textContent).join("|");
    const first = snap(), firstVerdict = $("#feedback .verdict").textContent;
    assert(!$("#prevBtn").classList.contains("hidden") && $("#prevBtn").disabled, "practice: back button visible but disabled on the first question");
    $("#nextBtn").click();
    const second = snap();
    assert(second !== first && $("#feedback").classList.contains("hidden"), "practice: next shows a fresh, unanswered question");
    assert(!$("#prevBtn").disabled, "practice: back button enabled after moving on");
    $("#prevBtn").click();
    assert(snap() === first, "practice: back shows the previous question with the same option order");
    assert(!$("#feedback").classList.contains("hidden") && $("#feedback .verdict").textContent === firstVerdict, "practice: previous question is shown as answered, with its feedback");
    assert(qq("#optionsList .opt").every(b => b.disabled) && !$("#nextBtn").classList.contains("hidden"), "practice: previous question is locked and next is available");
    $("#nextBtn").click();
    assert(snap() === second, "practice: next returns to the question you were on, same option order");
    window.document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    assert(snap() === first, "practice: ArrowRight goes back too");
  }
  // walk the whole pool once, answering correctly by id
  const seen = new Set([q.id]);
  for (let i = 1; i < QS.length * 2; i++) {
    $("#nextBtn").click();
    opts = $$("#optionsList .opt"); q = cur();
    if (!q) { assert(false, "practice: could not identify question"); break; }
    seen.add(q.id);
    opts.find(b => b.dataset.oid === q.correctId).click();
    if (!/✓/.test($("#feedback .verdict").textContent)) { assert(false, `practice: correct id graded wrong on ${q.id}`); break; }
    mathAllLtr(`practice ${q.id}`);
  }
  $("#quitBtn").click();
  assert(visible($("#screen-start")), "quit returns to start");

  // ---------------- full exam ----------------
  setMode("exam");
  const codes = $$("#examPick option").map(o => o.value).filter(Boolean);
  assert(codes.length >= 1, `exam picker lists ${codes.length} exam(s)`);
  const code = codes[0];
  $("#examPick").value = code; $("#examPick").dispatchEvent(new window.Event("change"));
  const paper = QS.filter(x => x.examCode === code).sort((a, b) => a.num - b.num);
  $("#startBtn").click();
  assert(visible($("#screen-quiz")) && /⏱|שאלה 1\//.test($("#quizMeta").textContent), "exam: session started with timer");
  for (let i = 0; i < paper.length; i++) {
    const pq = paper[i];
    opts = $$("#optionsList .opt");
    const shown = opts.map(b => b.dataset.oid);
    if (pq.lockOrder) assert(shown.join() === pq.options.map(o => o.id).join(), `exam: lockOrder ${pq.id} keeps source order`);
    assert(shown.slice().sort().join() === pq.options.map(o => o.id).sort().join(), `exam: ${pq.id} shows its own options`);
    for (const o of pq.options) {
      const b = opts.find(x => x.dataset.oid === o.id);
      if (o.type === "text" && !/[֐-׿]/.test(o.value))
        assert(!!b.querySelector('.opt-ltr[dir="ltr"]'), `exam: Hebrew-free option ${pq.id}/${o.id} is dir=ltr`);
      if (o.type === "image") assert(!!b.querySelector("img.opt-img"), `exam: image option ${pq.id}/${o.id} rendered`);
    }
    if (pq.contextId) assert(!!$("#qContext .ctx"), `exam: context block shown for ${pq.id}`);
    if (pq.image) assert(!!$("#qExtras img.q-img"), `exam: figure shown for ${pq.id}`);
    mathAllLtr(`exam ${pq.id}`);
    opts.find(b => b.dataset.oid === pq.correctId).click();
    assert(opts.find(b => b.dataset.oid === pq.correctId).classList.contains("chosen-exam"), `exam: choice marked on ${pq.id}`);
    if (i < paper.length - 1) $("#nextBtn").click();
  }
  // back-navigation keeps the same shuffle
  if (paper.length > 1) {
    const before = $$("#optionsList .opt").map(b => b.dataset.oid).join();
    $("#prevBtn").click(); $("#nextBtn").click();
    assert($$("#optionsList .opt").map(b => b.dataset.oid).join() === before, "exam: shuffle stable across back/next");
  }
  // lightbox on a figure, if any
  const img = $(".q-img");
  if (img) { img.click(); assert(visible($("#lightbox")), "lightbox opens on figure click"); $("#lightboxClose").click(); }
  $("#submitExamBtn").click();
  assert(visible($("#screen-results")), "exam: results shown");
  assert($("#resultsSummary").textContent.includes(`${paper.length} / ${paper.length}`), `exam: scored ${paper.length}/${paper.length} answering by id`);
  mathAllLtr("results review");
  $("#backHomeBtn").click();
}

// ---------------- learn mode (learn.js from tools/build_learn.py) ----------------
if (!learnCh.length) console.log("learn: none built yet (skipped)");
if (learnCh.length) {
  const TOPIC_KEYS = new Set($$("#topicGrid .topic-btn").map(b => b.dataset.topic).filter(t => t !== "all"));
  const qids = new Set(QS.map(q => q.id));
  const chIds = learnCh.map(c => c.id);
  assert(new Set(chIds).size === chIds.length && chIds.every(Boolean), `learn: ${chIds.length} chapters, unique ids`);
  assert(learnCh.every(c => c.title && c.html), "learn: every chapter has a title and html");
  const badTopic = learnCh.filter(c => c.topic && !TOPIC_KEYS.has(c.topic)).map(c => c.id);
  assert(badTopic.length === 0, `learn: chapter topics are in the closed topic list${badTopic.length ? " BAD: " + badTopic : ""}`);
  const covered = new Set(learnCh.filter(c => c.kind !== "cheat").map(c => c.topic));
  const uncovered = [...TOPIC_KEYS].filter(t => !covered.has(t));
  assert(uncovered.length === 0, `learn: every topic has a brief${uncovered.length ? " MISSING: " + uncovered : ""}`);
  // dangling question refs would open an empty peek -> hard failure
  const dangling = [], deadX = [], mathBad = [];
  let nRefs = 0, nMath = 0;
  for (const c of learnCh) {
    const frag = doc.createElement("div"); frag.innerHTML = c.html;
    for (const b of frag.querySelectorAll(".qref")) { nRefs++; if (!qids.has(b.dataset.q)) dangling.push(`${c.id}:${b.dataset.q}`); }
    for (const a of frag.querySelectorAll(".xref")) if (!chIds.includes(a.dataset.chapter)) deadX.push(`${c.id}->${a.dataset.chapter}`);
    for (const m of frag.querySelectorAll("math")) { nMath++; if (m.getAttribute("dir") !== "ltr" || /[֐-׿]/.test(m.textContent)) mathBad.push(c.id); }
  }
  assert(dangling.length === 0, `learn: all ${nRefs} question refs resolve${dangling.length ? " DANGLING: " + dangling.join(", ") : ""}`);
  assert(deadX.length === 0, `learn: all cross-references resolve${deadX.length ? " DEAD: " + deadX.join(", ") : ""}`);
  assert(mathBad.length === 0, `learn: all ${nMath} <math> are dir=ltr with no Hebrew${mathBad.length ? " BAD in: " + [...new Set(mathBad)] : ""}`);
  // a topic chapter with no questions yet is allowed (the bank grows) -> warning only
  for (const c of learnCh) if (c.kind !== "cheat" && c.topic && !QS.some(q => q.topic === c.topic))
    console.log(`WARN  learn: chapter "${c.id}" (topic ${c.topic}) has 0 questions in the bank`);

  // UI walk
  $("#learnEntry").click();
  assert(visible($("#screen-learn")), "learn: screen opens from the entry button");
  assert($$("#learnToc button").length === learnCh.length, `learn: TOC lists ${learnCh.length} chapters`);
  const seenCh = [];
  for (let i = 0; i < learnCh.length; i++) {
    seenCh.push($("#learnContent").dataset.chapter);
    if (!$("#learnContent .learn-h")) { assert(false, `learn: chapter ${i} has no heading`); break; }
    const t = learnCh[i].topic, n = t ? QS.filter(q => q.topic === t).length : 0;
    if (n && !$("#learnContent .learn-drill")) assert(false, `learn: chapter ${learnCh[i].id} missing drill button`);
    if (i < learnCh.length - 1) $("#learnNext").click();
  }
  assert(seenCh.join() === chIds.join(), "learn: next-button walk visits every chapter in order");
  assert($("#learnNext").disabled, "learn: next disabled on the last chapter");
  // peek: first chapter with a ref
  const withRef = learnCh.findIndex(c => /class="qref"/.test(c.html));
  if (withRef >= 0) {
    $$("#learnToc button")[withRef].click();
    // peek at a ref that resolves (dangling ones already failed above)
    const ref = $$("#learnContent .qref").find(b => qids.has(b.dataset.q)) || $("#learnContent .qref");
    ref.click();
    assert(visible($("#qpeek")), `learn: clicking ${ref.dataset.q} opens the peek`);
    const pq = QS.find(q => q.id === ref.dataset.q) || { options: [], correctId: null };
    const acc = pq.acceptedIds || [pq.correctId];
    const right = $$("#qpeekBody .qpeek-opts li.right").map(li => li.dataset.oid);
    assert(right.length === acc.length && right.every(id => acc.includes(id)), "learn: peek marks exactly the accepted option(s)");
    assert($$("#qpeekBody .qpeek-opts li").map(li => li.dataset.oid).join() === pq.options.map(o => o.id).join(), "learn: peek keeps source option order");
    mathAllLtr("learn peek");
    doc.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    assert(!visible($("#qpeek")) && visible($("#screen-learn")), "learn: Escape closes the peek, stays in learn");
  }
  // xref jump
  const withX = learnCh.findIndex(c => /class="xref"/.test(c.html));
  if (withX >= 0) {
    $$("#learnToc button")[withX].click();
    const x = $("#learnContent .xref");
    x.click();
    assert($("#learnContent").dataset.chapter === x.dataset.chapter, `learn: xref jumps to ${x.dataset.chapter}`);
  }
  // drill button -> practice session on that topic
  const drillIdx = learnCh.findIndex(c => c.topic && QS.some(q => q.topic === c.topic));
  if (drillIdx >= 0) {
    $$("#learnToc button")[drillIdx].click();
    $("#learnContent .learn-drill").click();
    const shown = QS.find(q => q.id === $("#questionText").dataset.qid);
    assert(visible($("#screen-quiz")) && shown && shown.topic === learnCh[drillIdx].topic, `learn: drill starts a ${learnCh[drillIdx].topic} practice session`);
    $("#quitBtn").click();
  }
  assert(errors.length === 0, `learn: no JS errors so far${errors.length ? ": " + errors.join(" | ") : ""}`);
}

// ---------------- guided courses ("צריך עזרה?", course-ui.js) ----------------
{
  const COURSES = window.COURSES || {};
  // a configured course is hidden until it has >= 1 built level (phase 5b writes them); only built courses are checked
  const NH = (CFG.needHelp || []).filter(c => ((COURSES[c.id] || {}).levels || []).length > 0);
  const NH_CFG = (CFG.needHelp || []).length;
  const KEY = id => `${CFG.storePrefix}_course_${id}_v1`;
  const bankBefore = window.localStorage.getItem(CFG.storePrefix + "_progress_v1");
  if (!NH.length) {
    assert($("#helpEntry").style.display === "none", "course: header entry hidden (no course has levels)");
    assert($$("#helpCards .crs-promo").length === 0, "course: no start-screen cards (no course has levels)");
    assert($("#helpCards").classList.contains("hidden"), "course: card container hidden (no course has levels)");
    if (NH_CFG) console.log("guided courses: none built yet (skipped)");
  } else {
    assert($("#helpEntry").style.display !== "none", "course: header entry visible");
    const cards = $$("#helpCards .crs-promo");
    assert(cards.length === NH.length && NH.every(c => cards.some(k => k.dataset.course === c.id)), `course: ${NH.length} start-screen card(s), one per needHelp entry`);
    assert(cards.every(k => k.textContent.includes(NH.find(c => c.id === k.dataset.course).titleHe)), "course: each card shows its title");
    if (QS.length) {
      const C = NH[0], cl = (COURSES[C.id] || {}).levels || [];
      const keyOf = q => q.bankId ? "bank:" + q.bankId : q.id;
      const byId = id => QS.find(x => x.id === id);
      const textOf = html => { const d = doc.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, ""); };
      // click the right (or a wrong) option of the question on screen; returns the accepted option ids
      const answer = pick => {
        const opts = $$("#crsQBody .opt"), meta = $("#crsQText").dataset;
        const bq = meta.bank ? byId(meta.bank) : null;
        const own = bq ? null : cl.flatMap(L => L.questions).find(q => q.id === meta.key);
        const acc = bq ? (bq.acceptedIds || [bq.correctId]) : (own.acceptedIds || [own.correctId]);
        (pick === "wrong" ? opts.find(o => !acc.includes(o.dataset.oid)) : opts.find(o => acc.includes(o.dataset.oid))).click();
        return acc;
      };
      const playLevel = (L, plan) => {
        $(`#crsMap .crs-lvl[data-id="${L.id}"]`).click();
        assert(visible($("#crsLessonView")) && $("#crsLesson").textContent.includes(L.title), `course: ${L.id} lesson shown first`);
        $("#crsLessonGo").click();
        assert(visible($("#crsQuizView")), `course: ${L.id} quiz opens after the lesson`);
        for (let i = 0; i < L.questions.length; i++) {
          assert($("#crsQText").dataset.key === keyOf(L.questions[i]), `course: ${L.id} question ${i + 1} is ${keyOf(L.questions[i])}`);
          const acc = answer(plan(i));
          assert($$("#crsQBody .opt").every(b => b.disabled), `course: ${L.id} q${i + 1} locks after answering`);
          assert($$("#crsQBody .opt.correct").map(b => b.dataset.oid).sort().join() === acc.slice().sort().join(), `course: ${L.id} q${i + 1} shows the correct option`);
          $("#crsNextBtn").click();
        }
        assert(visible($("#crsSumView")), `course: ${L.id} summary shown`);
      };
      const mapState = id => { const b = $(`#crsMap .crs-lvl[data-id="${id}"]`); return { passed: b.classList.contains("passed"), next: b.classList.contains("next") }; };

      $(`#helpCards .crs-promo[data-course="${C.id}"]`).click();
      assert(visible($("#screen-course")) && visible($("#crsMapView")), "course: card opens the level map");
      assert($$("#crsMap .crs-lvl").length === cl.length && cl.length > 0, `course: map lists ${cl.length} levels`);
      assert(cl.every(L => !mapState(L.id).passed) && mapState(cl[0].id).next, "course: fresh start, first level highlighted");

      // wrong first answer -> the correct one is revealed; one miss in 3 stays below 80%
      const L1 = cl[0];
      $(`#crsMap .crs-lvl[data-id="${L1.id}"]`).click();
      mathAllLtr("course lesson");
      $("#crsLessonGo").click();
      const acc0 = answer("wrong");
      assert($$("#crsQBody .opt.wrong").length === 1 && $$("#crsQBody .opt.correct").length === acc0.length, "course: one wrong answer marks it and reveals the correct option");
      assert(/לא נכון/.test($("#crsQBody .feedback .verdict").textContent), "course: wrong-answer verdict shown");
      mathAllLtr("course feedback");
      $("#crsNextBtn").click();
      for (let i = 1; i < L1.questions.length; i++) { answer("right"); $("#crsNextBtn").click(); }
      assert(visible($("#crsSumView")), "course: summary shown after the level");
      if ((L1.questions.length - 1) / L1.questions.length < 0.8) assert(!/עברת את השלב/.test($("#crsSum").textContent), `course: one miss out of ${L1.questions.length} is below 80% and does not pass`);
      $('#crsSum [data-act="retry"]').click();
      for (let i = 0; i < L1.questions.length; i++) { answer("right"); $("#crsNextBtn").click(); }
      assert(/100%/.test($("#crsSum .big").textContent), "course: all-correct retry scores 100%");
      $('#crsSum [data-act="map"]').click();
      assert(mapState(L1.id).passed && !mapState(L1.id).next && (cl.length < 2 || mapState(cl[1].id).next), `course: passing ${L1.id} marks it passed and highlights the next level`);
      const saved = JSON.parse(window.localStorage.getItem(KEY(C.id)));
      assert(saved && saved.levels[L1.id] && saved.levels[L1.id].best === 100, "course: progress saved under <prefix>_course_<id>_v1");
      assert(window.localStorage.getItem(CFG.storePrefix + "_progress_v1") === bankBefore, "course: course answers stay out of the bank stats");

      // a bankId question renders the bank question verbatim
      const bq = L1.questions.find(q => q.bankId);
      if (!bq) console.log("  skip  first level pulls no bank question (bankId)");
      $(`#crsMap .crs-lvl[data-id="${L1.id}"]`).click(); $("#crsLessonGo").click();
      for (const q of L1.questions) {
        if (bq && q === bq) {
          const b = byId(bq.bankId);
          assert(textOf($("#crsQText").innerHTML) === textOf(b.questionHtml), "course: bankId question renders the bank question text");
          assert($$("#crsQBody .opt").map(o => o.dataset.oid).sort().join() === b.options.map(o => o.id).sort().join(), "course: bankId question shows the bank options");
          assert(/מבחן/.test($("#crsQHead").textContent), "course: bankId question is labelled as a real exam question");
        }
        answer("right"); $("#crsNextBtn").click();
      }
      $('#crsSum [data-act="map"]').click();

      // boss level: pass it, then jump to bank practice on the course topic
      const L2 = cl.find(L => L.boss) || cl[cl.length - 1];
      assert(L2.boss && $(`#crsMap .crs-lvl[data-id="${L2.id}"]`).classList.contains("boss"), "course: last level is the boss");
      playLevel(L2, () => "right");
      assert(/100%/.test($("#crsSum .big").textContent) && /גמר/.test($("#crsSum").textContent), "course: boss passed with a boss message");
      const real = $('#crsSum [data-act="real"]');
      assert(!!real, "course: boss summary offers the jump to the real exam questions");
      real.click();
      const shown = QS.find(x => x.id === $("#questionText").dataset.qid);
      assert(visible($("#screen-quiz")) && shown && shown.topic === C.topic, `course: the jump starts bank practice on topic ${C.topic}`);
      $("#quitBtn").click();
      assert(visible($("#screen-start")) && $$("#helpCards .crs-promo").length === NH.length, "course: back on the start screen, cards still there");
      const nPassed = new Set([L1.id, L2.id]).size;
      assert(new RegExp(`${nPassed} מתוך ${cl.length}`).test($(`#helpCards .crs-promo[data-course="${C.id}"]`).textContent), `course: card reports progress (${nPassed} of ${cl.length})`);

      // storage that throws: the whole flow still completes, in memory
      const realLS = Object.getOwnPropertyDescriptor(window, "localStorage");
      Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new window.Error("storage blocked"); } });
      let threw = false; try { window.localStorage.getItem("x"); } catch (e) { threw = true; }
      assert(threw, "course: localStorage now throws on every access");
      $(`#helpCards .crs-promo[data-course="${C.id}"]`).click();
      $("#crsResetBtn").click();
      assert(cl.every(L => !mapState(L.id).passed), "course: reset works with storage blocked");
      playLevel(L1, () => "right");
      assert(/100%/.test($("#crsSum .big").textContent), "course: flow completes with localStorage throwing");
      $('#crsSum [data-act="map"]').click();
      assert(mapState(L1.id).passed, "course: progress is kept in memory when storage throws");
      if (realLS) Object.defineProperty(window, "localStorage", realLS);
      $("#crsHomeBtn").click();
      assert(visible($("#screen-start")), "course: home button returns to the start screen");
    }
  }
}

// fenced code blocks in the built bank must all be dir=ltr
{
  const qsrc = fs.readFileSync(path.join(ROOT, "questions.js"), "utf8");
  const pres = qsrc.match(/<pre class=\\?"code-block\\?"[^>]*>/g) || [];
  const badPre = pres.filter(p => !/dir=\\?"ltr\\?"/.test(p));
  assert(badPre.length === 0, `${pres.length} .code-block <pre> in the bank, all dir=ltr`);
}

// images referenced anywhere must exist
const refs = [];
for (const q of QS) { if (q.image) refs.push(q.image); for (const o of q.options) if (o.type === "image") refs.push(o.value); }
for (const c of Object.values(D.contexts || {})) if (c.image) refs.push(c.image);
const missing = refs.filter(r => !fs.existsSync(path.join(ROOT, r)));
assert(missing.length === 0, `all ${refs.length} image refs exist${missing.length ? " MISSING: " + missing.join(", ") : ""}`);

assert(errors.length === 0, `no JS errors${errors.length ? ":\n    " + errors.join("\n    ") : ""}`);
console.log(fail === 0 ? "\nDOM VERIFY PASSED" : `\nDOM VERIFY FAILED (${fail})`);
process.exit(fail === 0 ? 0 : 1);
