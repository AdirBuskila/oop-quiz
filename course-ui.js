"use strict";
/* Guided courses — "צריך עזרה?": level map → lesson → level quiz → summary.
   Generalized from machine-learning-quiz's course-ui.js (same flow, same bidi isolation for lessons).
   Data:  course.config.json "needHelp" → questions.js meta.needHelp (the courses to offer; [] hides the feature)
          courses.js  window.COURSES[id].levels (built by tools/build_courses.py from courses/<id>/*.js,
          math already rendered to MathML)
   Hooks: app.js exposes window.CC_APP (screens, bank access, renderers) and fires "cc:home" whenever the
          start screen is shown again. This file never touches the bank progress (<prefix>_progress_v1);
          each course keeps its own <prefix>_course_<id>_v1 (every storage access is in try/catch, and an
          in-memory copy is the fallback, so a blocked localStorage cannot break the flow).

   level    = {id, order, icon, title, goal, boss?, source, lesson:{html, figs?}, questions:[…]}
   question = {id, questionHtml, options:[{id,type,value,html}], correctId, acceptedIds?, explanationHtml, recapHtml}
            | {bankId:"<exam question id>", recapHtml?}     ← a real exam question, rendered from the bank
   Soft unlock: every level is open; a level is passed at PASS % and the first unpassed level is highlighted. */
(function(){
  const PASS = 80;
  const APP = window.CC_APP;
  const META = (window.CC_QUIZ && window.CC_QUIZ.meta) || {};
  const ALL = (window.COURSES && typeof window.COURSES === "object") ? window.COURSES : {};
  const $ = s => document.querySelector(s);
  const entry = $("#helpEntry"), cardsBox = $("#helpCards"), screen = $("#screen-course");
  const has = id => ALL[id] && Array.isArray(ALL[id].levels) && ALL[id].levels.length > 0;
  const COURSES = (Array.isArray(META.needHelp) ? META.needHelp : []).filter(c => c && c.id && has(c.id));
  if(!APP || !screen || !COURSES.length){
    if(entry) entry.style.display = "none";
    if(cardsBox){ cardsBox.innerHTML = ""; cardsBox.classList.add("hidden"); }
    return;
  }
  const esc = APP.escapeHtml;
  const NOTE = { "ai-verified": "נבנה בעזרת AI ונבדק", "ai-draft": "טיוטת AI — טרם נבדק" };

  /* ---------- state + storage ---------- */
  let C = null;                       // the open course: {id, meta, levels, prog}
  let cur = null;                     // the level being studied / played
  let S = null;                       // the running quiz: {L, items, i, run:{key:ok}}
  const progs = {};
  const storeKey = id => `${APP.prefix}_course_${id}_v1`;
  function loadProg(id){
    try{ const p = JSON.parse(localStorage.getItem(storeKey(id))); if(p && p.levels && typeof p.levels === "object") return p; }catch(e){}
    return { levels: {} };
  }
  function saveProg(){ try{ localStorage.setItem(storeKey(C.id), JSON.stringify(C.prog)); }catch(e){} }
  function course(id){
    progs[id] = progs[id] || loadProg(id);
    return { id, meta: COURSES.find(c => c.id === id), levels: ALL[id].levels, prog: progs[id] };
  }
  const passedIn = (c, L) => ((c.prog.levels[L.id] || {}).best || 0) >= PASS;
  const recommendedIn = c => c.levels.find(L => !passedIn(c, L));
  const levelName = L => `שלב ${L.order} · ${L.title}`;
  /* level title / goal as HTML: the goal's math is pre-rendered by build_courses.py (goalHtml); both get bidi isolates */
  const titleH = L => isolate(esc(L.title || ""));
  const goalH = L => isolate(L.goalHtml || esc(L.goal || ""));
  const levelNameH = L => `שלב ${L.order} · ${titleH(L)}`;

  /* ---------- bidi: isolate Latin/number runs inside Hebrew (the same isolate() as the open engine's normalize.js Bidi,
     tested by its tools/test_bidi.js; ported from computer-systems-quiz 775f65b + the clause-boundary fix) ----------
     The page is RTL, so "(2, 5) ו-(7, 1)" or "|7−2| = 5" inside Hebrew gets its parentheses and operands reordered.
     Every non-Hebrew run that holds a digit or a Latin letter is wrapped in an LTR isolate. A run may span inline tags
     (<b>3</b>) as long as they open and close inside it; text inside code / MathML / formulas / existing isolates is left
     alone. A run ends at a clause / list boundary outside brackets (". " ", " "; " ": ") and at an RLM: one LTR
     isolate across "TP = 44, FN = 6" or "Fetch; Decode" read the second piece first for an RTL reader. */
  const B_INLINE = /^<\/?(b|strong|i|em|u|sub|sup|code)\b[^>]*>$/i;
  const B_SKIP = /^<(code|bdi|pre|math)\b|class="[^"]*\b(lesson-formula|qref|math-inline|math-block|math-run|opt-ltr)\b|\bdir="ltr"/i;
  const B_START = /[A-Za-z0-9$"(\[|\u221a\u2016\u03a3\u2211\u2212\u0177\u0233\u03b1-\u03c9\u0394\u03b8]/;
  const B_END = /[A-Za-z0-9)\]|\u00b2\u00b3\u2016%\u221e'\u2032\u2033\u2019"\u2080-\u2089\u1d62\u2c7c\u2099\u2096\u0177\u0233\u0304\u03b1-\u03c9]/;
  const B_OP = /^[·×+−=\/*…]$/;      // · × + − = / * …  (the ASCII hyphen is not one: "ו-y")
  const bIsTag =p => p[0] === "<", bChr = p => (bIsTag(p) || p[0] === "&" && p.length > 1) ? "" : p;
  function isolate(html) {
    const toks = String(html).match(/<[^>]+>|[^<]+/g) || [];
    let out = "", run = [], skip = 0;
    const emit = parts => {
      if (!parts.length) return "";
      const s = parts.join("");
      { const st = [];                                                 // a bracket whose partner is outside this run stays outside, so it pairs with it in RTL
        for (let i = 0; i < parts.length; i++) { const c = bChr(parts[i]);
          if (c === "(" || c === "[") st.push([i, c]);
          else if (c === ")" || c === "]") { const top = st[st.length - 1];
            if (top && top[1] === (c === ")" ? "(" : "[")) st.pop(); else return emit(parts.slice(0, i)) + parts[i] + emit(parts.slice(i + 1)); } }
        if (st.length) { const i = st[st.length - 1][0]; return emit(parts.slice(0, i)) + parts[i] + emit(parts.slice(i + 1)); } }
      // a clause / list boundary outside brackets (". " ", " "; " ": " "? " "! ") splits the run: "TP = 44, FN = 6" or
      // "4: 79, 79" are separate LTR pieces that an RTL reader reads right to left. Checked after the bracket split above,
      // so a bracket whose partner is outside the run ("(clang++ -fsyntax-only: 0 שגיאות)") does not hide the boundary,
      // while "(3, 8, 2)" stays whole. "4! = 24" is one expression (a "!" before an operator is a factorial).
      for (let i = 0, d = 0; i < parts.length; i++) {
        const c = bChr(parts[i]);
        if ("([{".includes(c) && c) d++;
        else if (")]}".includes(c) && c) d = Math.max(0, d - 1);
        else if (d === 0 && /^[.,;:!?]$/.test(c)) {
          let k = i; while (k + 1 < parts.length && /^<\//.test(parts[k + 1])) k++;          // "<b>10.</b> 12": past the closing tag
          const nx = parts[k + 1];
          if ((nx === "&nbsp;" || /^\s$/.test(nx || "")) &&
              !(c === "!" && /^\s*[=+−×·*\/<>≤≥≠-]/.test(parts.slice(k + 1).map(bChr).join(""))))
            return emit(parts.slice(0, k + 1)) + emit(parts.slice(k + 1));
        }
      }
      let a = 0, b = parts.length - 1;
      while (a <= b && !B_START.test(bChr(parts[a]))) a++;
      while (b >= a && !B_END.test(bChr(parts[b]))) b--;

      if (a <= b) {
        while (b + 1 < parts.length && bChr(parts[b + 1]) === "!" && /[A-Za-z0-9)\]]/.test(bChr(parts[b]))) b++;   // factorial: "4!" stays one run
        while (b + 1 < parts.length && bChr(parts[b + 1]) === "*" && /[A-Za-z0-9)\]*]/.test(bChr(parts[b]))) b++;   // pointer stars: "Item**" keeps its stars
        while (a > 0 && bChr(parts[a - 1]) === "*" && /[A-Za-z(]/.test(bChr(parts[a]))) a--;                          // ... and "*ptr" its star
        for (let j = a; j > 0;) { let k = j - 1; while (k >= 0 && /^\s$/.test(parts[k])) k--;                       // arithmetic chain: leading operators join the run
          if (k >= 0 && B_OP.test(bChr(parts[k]))) { a = k; j = k; } else break; }
        for (let j = b; j < parts.length - 1;) { let k = j + 1; while (k < parts.length && /^\s$/.test(parts[k])) k++;  // ... and so do trailing ones
          if (k < parts.length && B_OP.test(bChr(parts[k]))) { b = k; j = k; } else break; }
      }
      { const tail = parts.slice(b + 1).join(""); if (b >= a && /^[,;]?\s*(\.\.\.|…)$/.test(tail)) b = parts.length - 1; }   // a trailing ellipsis stays with its list
      while (a > 0 && bIsTag(parts[a - 1]) && !/^<\//.test(parts[a - 1])) a--;     // pull in tags hugging the core: <b>3</b>
      while (b < parts.length - 1 && /^<\//.test(parts[b + 1])) b++;
      const balanced = arr => { const st = [];
        for (const t of arr) { if (!bIsTag(t)) continue;
          const m = t.match(/^<(\/?)(\w+)/); if (m[1]) { if (st.pop() !== m[2].toLowerCase()) return false; } else st.push(m[2].toLowerCase()); }
        return !st.length; };
      // a tag whose partner lies outside the run ("<b>10.</b> 12" cut after the period) stays outside the isolate
      while (b > a && /^<\//.test(parts[b]) && !balanced(parts.slice(a, b + 1))) b--;
      while (a < b && bIsTag(parts[a]) && !/^<\//.test(parts[a]) && !balanced(parts.slice(a, b + 1))) a++;
      const core = parts.slice(a, b + 1);
      const ok = a <= b && /[A-Za-z0-9]/.test(core.join("")) && balanced(core);
      return ok ? parts.slice(0, a).join("") + `<bdi class="ltr${core.join("").replace(/<[^>]+>/g, "").length <= 22 ? " nw" : ""}" dir="ltr">${core.join("")}</bdi>` + parts.slice(b + 1).join("") : s;
    };
    const flush = () => { if (run.length) out += emit(run.join("").match(/<[^>]+>|&[#\w]+;|[^<]/g)); run = []; };
    for (const t of toks) {
      if (t[0] === "<") {
        if (skip) { out += t; if (/^<\//.test(t)) skip--; else if (!/\/>$|^<(br|img|hr|wbr)\b/i.test(t)) skip++; continue; }
        if (B_SKIP.test(t)) { flush(); out += t; if (!/^<(br|img)\b/i.test(t)) skip = 1; continue; }
        if (B_INLINE.test(t)) { run.push(t); continue; }
        flush(); out += t; continue;
      }
      if (skip) { out += t; continue; }
      for (const piece of t.match(/[֐-׿\u200f]+|[^֐-׿\u200f]+/g)) {   // Hebrew text (or an RLM) ends a run
        if (/[֐-׿\u200f]/.test(piece)) { flush(); out += piece; } else run.push(piece);
      }
    }
    flush();
    return out;
  }
  window.crsIsolate = isolate;
  function lessonHtml(L){
    const les = L.lesson || {};
    let h = isolate(String(les.html || "").replace(/<table>/g, '<div class="tbl-wrap"><table>').replace(/<\/table>/g, "</table></div>"));
    (les.figs || []).forEach(f => { h += `<figure class="learn-fig"><img class="q-img" src="${esc(f.src)}" alt="${esc(f.alt || "")}" loading="lazy">${f.caption ? `<figcaption>${isolate(esc(f.caption))}</figcaption>` : ""}</figure>`; });
    return h;
  }
  const html = q => isolate(q);

  /* ---------- views ---------- */
  const VIEWS = ["crsMapView", "crsLessonView", "crsQuizView", "crsSumView"];
  function view(id){ if(id !== "crsQuizView") $("#crsQBody").innerHTML = ""; APP.show("screen-course"); VIEWS.forEach(v => $("#" + v).classList.toggle("hidden", v !== id)); }

  /* ---------- map ---------- */
  function renderMap(){
    const LV = C.levels, rec = recommendedIn(C), nPass = LV.filter(L => passedIn(C, L)).length;
    $("#crsTitle").textContent = `${C.meta.icon} ${C.meta.titleHe}`;
    $("#crsIntro").textContent = C.meta.introHe || C.meta.entryLabelHe;
    $("#crsOverall").innerHTML =
      `עברת <b>${nPass}</b> מתוך <b>${LV.length}</b> שלבים` +
      `<div class="progress" style="margin-top:.5rem"><div class="progress-fill" style="width:${nPass / LV.length * 100}%"></div></div>` +
      (nPass === LV.length ? `<p class="crs-done">🏆 סיימת את כל הקורס. הצעד הבא: שאלות אמיתיות מהמבחנים.</p><button type="button" class="btn primary" data-act="real">לשאלות האמיתיות בנושא ⟵</button>` : "");
    $("#crsMap").innerHTML = LV.map(L => {
      const st = C.prog.levels[L.id], ok = passedIn(C, L);
      const cls = ["crs-lvl", ok ? "passed" : "", L === rec ? "next" : "", L.boss ? "boss" : ""].join(" ").replace(/\s+/g, " ").trim();
      const status = !st ? `עוד לא התחלת · ${L.questions.length} שאלות`
        : ok ? `✓ עברת · שיא ${st.best}%` : `ניסיון אחרון ${st.last}% · שיא ${st.best}% (צריך ${PASS}%)`;
      return `<button class="${cls}" data-id="${esc(L.id)}" type="button">
        <span class="num">שלב ${L.order}${L.boss ? " · מבחן גמר" : ""}</span>
        <span class="ttl">${esc(L.icon || "")} ${titleH(L)}</span>
        <span class="gl">${goalH(L)}</span>
        <span class="st">${status}</span></button>`;
    }).join("");
    $("#crsMap").querySelectorAll(".crs-lvl").forEach(b => b.onclick = () => openLesson(LV.find(L => L.id === b.dataset.id)));
    const real = $("#crsOverall [data-act=real]"); if(real) real.onclick = realExam;
  }
  function openMap(id){ if(id) C = course(id); cur = null; S = null; renderMap(); view("crsMapView"); }

  /* ---------- lesson ---------- */
  const nReal = L => L.questions.filter(q => q.bankId).length;
  function openLesson(L){
    cur = L; S = null;
    $("#crsLesson").innerHTML =
      `<div class="q-head"><span class="chip">שלב ${L.order} מתוך ${C.levels.length}</span>` +
      `<span class="chip soft">${L.questions.length} שאלות${nReal(L) ? ` · ${nReal(L)} מהמבחנים` : ""}</span></div>` +
      `<h2 class="learn-h">${esc(L.icon || "")} ${titleH(L)}</h2><p class="sub crs-goal">${goalH(L)}</p>` +
      `<div class="lesson-body">${lessonHtml(L)}</div>` +
      (NOTE[L.source] ? `<div class="crs-note">${NOTE[L.source]}</div>` : "");
    view("crsLessonView");
  }

  /* ---------- level quiz ---------- */
  function items(L){
    return L.questions.map(q => {
      if(q.bankId){ const b = APP.bank(q.bankId); return b ? { key: "bank:" + q.bankId, bank: true, q: b, recap: q.recapHtml || "" } : null; }
      return { key: q.id, bank: false, q, recap: q.recapHtml || "" };
    }).filter(Boolean);
  }
  function startLevel(L){
    cur = L;
    S = { L, items: items(L), i: 0, run: {} };
    if(!S.items.length) return openLesson(L);
    view("crsQuizView");
    renderQuestion();
  }
  function renderQuestion(){
    const it = S.items[S.i], q = it.q, n = S.items.length;
    it.order = it.order || (q.lockOrder ? q.options.map(o => o.id) : APP.shuffle(q.options.map(o => o.id)));
    it.answered = false;
    $("#crsQHead").innerHTML = `<span class="chip">${levelNameH(S.L)}</span>` +
      (it.bank ? `<span class="chip soft">${esc(APP.examLabelOf(q))}${Number.isInteger(q.num) ? ` · שאלה ${q.num}` : ""}</span><span class="chip official">מבחן אמיתי</span>` : "");
    $("#crsQContext").innerHTML = it.bank && q.contextId ? APP.contextHtml(APP.ctx(q.contextId)) : "";
    const qt = $("#crsQText");
    qt.innerHTML = it.bank ? APP.questionHtml(q) : html(q.questionHtml || esc(q.question || ""));
    qt.dataset.key = it.key; qt.dataset.correct = q.correctId || "";
    if(it.bank) qt.dataset.bank = q.id; else delete qt.dataset.bank;
    $("#crsQExtras").innerHTML = APP.extrasHtml(q);
    if(window.Feedback) window.Feedback.slot($("#crsQExtras"), "crs", {
      id: `${C.id}-L${S.L.order}-Q${S.i + 1}`,
      exam: `${C.meta.titleHe} · ${levelName(S.L)}` + (it.bank ? ` · ${APP.examLabelOf(q)} (${q.id})` : ""),
      html: q.questionHtml || esc(q.question || "")
    });
    const byId = id => q.options.find(o => o.id === id);
    $("#crsQBody").innerHTML =
      `<div class="options-list">` + it.order.map((oid, d) =>
        `<button class="opt" type="button" data-oid="${esc(oid)}"><span class="key">${APP.HE_KEYS[d] || d + 1}</span><span class="txt">${APP.optionHtml(byId(oid))}</span></button>`).join("") +
      `</div><div class="feedback hidden"></div>`;
    $("#crsQBody").querySelectorAll(".opt").forEach(b => b.onclick = () => answer(b.dataset.oid));
    $("#crsProgressFill").style.width = (S.i / n * 100) + "%";
    $("#crsQuizMeta").textContent = `שאלה ${S.i + 1} מתוך ${n}`;
    $("#crsNextBtn").classList.add("hidden");
    $("#crsNextBtn").textContent = S.i >= n - 1 ? "לסיכום ⟵" : "הבאה ⟵";
  }
  function answer(oid){
    const it = S.items[S.i], q = it.q;
    if(it.answered) return;
    it.answered = true;
    const acc = APP.acceptedIdsOf(q), ok = acc.includes(oid);
    if(!(it.key in S.run)) S.run[it.key] = ok;
    $("#crsQBody").querySelectorAll(".opt").forEach(b => {
      b.disabled = true;
      if(acc.includes(b.dataset.oid)) b.classList.add("correct");
      else if(b.dataset.oid === oid) b.classList.add("wrong");
    });
    const expl = html(q.explanationHtml || "");   // bank items too: same bidi isolates as in the bank
    const fb = $("#crsQBody .feedback");
    fb.className = "feedback " + (ok ? "good" : "bad");
    fb.innerHTML = `<div class="verdict">${ok ? "✓ נכון" : "✗ לא נכון"}</div>` +
      (expl ? `<div class="expl">${expl}</div>` : `<div class="expl expl-none">אין הסבר במקור.</div>`) +
      (acc.length > 1 ? `<span class="accept-note">בשאלה זו התקבלה יותר מתשובה אחת כנכונה.</span>` : "") +
      (it.bank ? `<span class="note">מקור: ${esc(APP.examLabelOf(q))}${Number.isInteger(q.num) ? ` · שאלה ${q.num}` : ""}</span>` : "");
    $("#crsNextBtn").classList.remove("hidden");
    $("#crsNextBtn").focus();
  }
  function nextQuestion(){
    if(!S || !S.items[S.i].answered) return;
    if(S.i < S.items.length - 1){ S.i++; renderQuestion(); } else finishLevel();
  }

  /* ---------- summary ---------- */
  function finishLevel(){
    const L = S.L, total = S.items.length;
    const correct = S.items.filter(it => S.run[it.key]).length;
    const pct = Math.round(correct / total * 100);
    const prev = C.prog.levels[L.id] || {};
    C.prog.levels[L.id] = { best: Math.max(prev.best || 0, pct), last: pct, at: Date.now() };
    saveProg();
    const ok = pct >= PASS, LV = C.levels, nextL = LV[LV.indexOf(L) + 1];
    const wrong = S.items.filter(it => !S.run[it.key]);
    const hasReal = APP.topicCount(C.meta.topic) > 0;
    $("#crsSum").innerHTML =
      `<div class="q-head" style="justify-content:center"><span class="chip">${levelNameH(L)}</span></div>` +
      `<div class="big">${pct}%</div><div><b><bdi dir="ltr">${correct} / ${total}</bdi></b> תשובות נכונות</div>` +
      `<p class="msg">${ok ? (L.boss ? `🏆 עברת את מבחן הגמר של ${esc(C.meta.titleHe)}` : "✓ עברת את השלב! אפשר להתקדם.") :
        `עוד לא ${PASS}%. כדאי לקרוא שוב את השיעור ולנסות שוב, זה בדיוק השלב שבו זה נבנה.`}</p>` +
      (wrong.length ? `<div class="crs-review"><div class="crs-review-t">כדאי לחזור על:</div>${
        wrong.map(it => `<div>• ${it.recap ? html(it.recap) : (it.bank ? APP.questionHtml(it.q) : html(it.q.questionHtml))}</div>`).join("")}</div>` : "") +
      `<div class="crs-actions">` +
        (nextL ? `<button class="btn ${ok ? "primary" : "ghost"}" data-act="next">לשלב הבא: ${titleH(nextL)} ⟵</button>` : "") +
        ((L.boss || !nextL) && hasReal ? `<button class="btn primary" data-act="real">לשאלות האמיתיות מהמבחנים ⟵</button>` : "") +
        `<button class="btn ${ok ? "ghost" : "primary"}" data-act="retry">🔁 לנסות שוב</button>` +
        `<button class="btn ghost" data-act="lesson">📘 לשיעור</button>` +
        `<button class="btn ghost" data-act="map">🗺️ למפת השלבים</button>` +
      `</div>`;
    $("#crsSum").querySelectorAll("[data-act]").forEach(b => b.onclick = () => {
      const a = b.dataset.act;
      if(a === "next") openLesson(nextL);
      else if(a === "retry") startLevel(L);
      else if(a === "lesson") openLesson(L);
      else if(a === "real") realExam();
      else openMap();
    });
    view("crsSumView");
  }
  // hand off to free practice on the course's topic (the real exam questions)
  function realExam(){ if(!APP.practiceTopic(C.meta.topic)) openMap(); }

  /* ---------- start-screen cards + header entry ---------- */
  function paintCards(){
    cardsBox.classList.remove("hidden");
    cardsBox.innerHTML = COURSES.map(c =>
      `<div class="card crs-promo" data-course="${esc(c.id)}" role="button" tabindex="0">
        <span class="big-ico">${esc(c.icon)}</span>
        <div><b>${esc(c.titleHe)}</b><span class="crs-promo-sub">${esc(c.entryLabelHe)}</span></div>
        <span class="btn primary go">להתחיל ⟵</span></div>`).join("");
    cardsBox.querySelectorAll(".crs-promo").forEach(el => {
      const id = el.dataset.course, c = course(id), n = c.levels.filter(L => passedIn(c, L)).length, rec = recommendedIn(c);
      if(n) el.querySelector(".crs-promo-sub").textContent = `עברת ${n} מתוך ${c.levels.length} שלבים${rec ? ". הבא בתור: " + rec.title : ". סיימת, כל הכבוד!"}`;
      el.onclick = () => openMap(id);
      el.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openMap(id); } };
    });
  }

  /* ---------- wiring ---------- */
  $("#crsLessonGo").onclick = () => cur && startLevel(cur);
  $("#crsLessonBack").onclick = () => openMap();
  $("#crsHomeBtn").onclick = () => APP.quit();
  $("#crsQuitBtn").onclick = () => cur ? openLesson(cur) : openMap();
  $("#crsNextBtn").onclick = nextQuestion;
  $("#crsResetBtn").onclick = () => { if(confirm(`לאפס את ההתקדמות בקורס ${C.meta.titleHe}?`)){ C.prog.levels = {}; saveProg(); renderMap(); } };
  entry.style.display = "";
  entry.onclick = () => { APP.quit(); setTimeout(() => { cardsBox.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60); };
  paintCards();
  document.addEventListener("cc:home", () => { $("#crsQBody").innerHTML = ""; paintCards(); });
  document.addEventListener("keydown", e => {
    if(screen.classList.contains("hidden") || $("#crsQuizView").classList.contains("hidden")) return;
    const lb = $("#lightbox"); if(lb && !lb.classList.contains("hidden")) return;
    if(e.target && /^(SELECT|INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    if(/^[1-8]$/.test(e.key)){ const b = document.querySelector(`#crsQBody .opt:nth-child(${+e.key})`); if(b && !b.disabled) b.click(); }
    else if(e.key === "Enter" && !$("#crsNextBtn").classList.contains("hidden")){ e.preventDefault(); nextQuestion(); }
  });

  window.COURSE_UI = { PASS, openMap, openLesson, startLevel };

  // deep link: ?course=ID (map) · ?course=ID&level=C01 (that lesson) · …&play=1 (its quiz)
  try{
    const p = new URLSearchParams(location.search), id = p.get("course");
    if(id && has(id) && COURSES.some(c => c.id === id)){
      C = course(id);
      const L = C.levels.find(l => l.id === p.get("level"));
      if(!L) openMap(); else if(p.get("play")) startLevel(L); else openLesson(L);
    }
  }catch(e){}
})();
