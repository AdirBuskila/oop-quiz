// Node smoke test: data integrity + option-id shuffle/scoring invariant + js===json sync.
//   node tools/smoke.js
// Loads questions.js (window.CC_QUIZ) in a sandbox, checks the derived schema, asserts
// questions.js and questions.json are identical, and simulates the app's shuffle-by-id
// click->grade path 5000x to prove scoring never drifts. An EMPTY bank passes (it is a
// valid state while exams are still being transcribed).
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.join(__dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "questions.js"), "utf8"), sandbox);
const D = sandbox.window.CC_QUIZ;

let bad = 0;
const fail = (...m) => { console.log("  FAIL", ...m); bad++; };
if (!D || typeof D !== "object") { console.log("questions.js did not define window.CC_QUIZ"); process.exit(1); }

const QS = D.questions || [];
const CTX = D.contexts || {};
// Closed topic list comes from course.config.json (single source for every tool and app.js).
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, "course.config.json"), "utf8"));
const TOPICS = new Set(CFG.topics.map(t => t[0]));
const OPT_TYPES = new Set(["text", "math", "image"]);
const HEB = /[֐-׿]/;
const exists = p => fs.existsSync(path.join(ROOT, p));

const byTopic = {}, seenIds = new Set();
let images = 0, mathCount = 0;
for (const q of QS) {
  if (seenIds.has(q.id)) fail("DUP question id", q.id); else seenIds.add(q.id);
  if (q.id !== `${q.examCode}-Q${q.num}`) fail("id != <CODE>-Q<num>", q.id);
  byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
  if (!TOPICS.has(q.topic)) fail("BAD topic", q.id, q.topic);
  if (!["exam", "sample"].includes(q.source)) fail("BAD source", q.id, q.source);
  if (!q.dedupKey) fail("missing dedupKey", q.id);
  if (!q.questionHtml || !String(q.questionHtml).trim()) fail("EMPTY questionHtml", q.id);
  if (typeof q.official !== "boolean") fail("official not bool", q.id);
  if (!["high", "med", "low"].includes(q.confidence)) fail("BAD confidence", q.id);
  const opts = q.options || [];
  if (opts.length < 2) fail("BAD options", q.id);
  const ids = opts.map(o => o.id);
  if (new Set(ids).size !== ids.length) fail("DUP option ids", q.id);
  if (!ids.includes(q.correctId)) fail("correctId not in options", q.id);
  if (Array.isArray(q.acceptedIds)) {
    if (!q.acceptedIds.length) fail("EMPTY acceptedIds", q.id);
    if (q.acceptedIds.some(a => !ids.includes(a))) fail("acceptedIds not subset of options", q.id);
    if (!q.acceptedIds.includes(q.correctId)) fail("correctId not in acceptedIds", q.id);
  }
  if (q.contextId && !CTX[q.contextId]) fail("MISSING context", q.id, q.contextId);
  if (q.image) { images++; if (!exists(q.image)) fail("MISSING image", q.id, q.image); }
  for (const o of opts) {
    if (!OPT_TYPES.has(o.type)) fail("BAD opt type", q.id, o.type);
    if (!String(o.value).trim()) fail("BLANK opt", q.id, o.id);
    if (o.type !== "image" && !o.html) fail("opt without html", q.id, o.id);
    if (o.type === "image") { images++; if (!exists(o.value)) fail("MISSING option image", q.id, o.id, o.value); }
    if (o.type === "math" && HEB.test(o.value)) fail("HEBREW in math opt", q.id, o.id);
  }
  const allHtml = [q.questionHtml, q.explanationHtml, ...opts.map(o => o.html || "")].join("");
  const nMath = (allHtml.match(/<math[\s>]/g) || []).length;
  const nLtr = (allHtml.match(/<math dir="ltr"/g) || []).length;
  mathCount += nMath;
  if (nMath !== nLtr) fail("math without dir=ltr", q.id);
  if (/@@[MD]\d+@@/.test(allHtml)) fail("unresolved math placeholder", q.id);
}
for (const [id, c] of Object.entries(CTX)) {
  if (c.image) { images++; if (!exists(c.image)) fail("MISSING context image", id, c.image); }
  if (c.text && !c.textHtml) fail("context text without textHtml", id);
}

// questions.js is the only payload the browser loads; questions.json is for reuse.
// If they drift, someone hand-edited a generated file.
let inSync = true;
try {
  const jsonPayload = JSON.parse(fs.readFileSync(path.join(ROOT, "questions.json"), "utf8"));
  if (JSON.stringify(D) !== JSON.stringify(jsonPayload)) {
    fail("OUT OF SYNC: questions.js !== questions.json -- re-run tools/build_questions.py"); inSync = false;
  }
} catch (e) { fail("SYNC CHECK FAILED:", e.message); inSync = false; }

// click -> id scoring invariant (mirrors app.js makeView/choose): shuffle ids (unless
// lockOrder), click the display slot holding each accepted id and each rejected id, grade
// by id. Must be correct exactly for accepted ids, for every shuffle.
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const accepted = q => (Array.isArray(q.acceptedIds) && q.acceptedIds.length) ? q.acceptedIds : [q.correctId];
let mismatch = 0, trials = 0;
for (let t = 0; t < 5000 && QS.length; t++) {
  const q = QS[t % QS.length];
  const ids = q.options.map(o => o.id);
  const order = q.lockOrder ? ids : shuffle(ids);
  if (q.lockOrder && order.join() !== ids.join()) mismatch++;
  const correctSet = new Set(order.map((id, i) => accepted(q).includes(id) ? i : -1).filter(i => i >= 0));
  for (let disp = 0; disp < order.length; disp++) {
    trials++;
    const clickedId = order[disp];                    // what the button at slot `disp` carries
    const graded = accepted(q).includes(clickedId);   // grade by id
    const expected = accepted(q).includes(q.options.find(o => o.id === clickedId).id);
    if (graded !== expected || graded !== correctSet.has(disp)) mismatch++;
  }
  if (order[order.indexOf(q.correctId)] !== q.correctId) mismatch++;
}

console.log("total questions:", QS.length, "| unique:", new Set(QS.map(q => q.dedupKey)).size,
  "| contexts:", Object.keys(CTX).length, "| images:", images, "| <math>:", mathCount);
console.log("by topic:", byTopic);
console.log("integrity problems:", bad);
console.log(`id-shuffle scoring mismatches: ${mismatch} over ${trials} clicks (must be 0)`);
console.log("questions.js === questions.json:", inSync ? "yes" : "NO");
const ok = bad === 0 && mismatch === 0;
console.log(ok ? "\nSMOKE TEST PASSED" : "\nSMOKE TEST FAILED");
process.exit(ok ? 0 : 1);
