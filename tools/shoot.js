// Screenshot driver (puppeteer-core + local Chrome):  node tools/shoot.js
// Opens index.html over file:// (no server needed) at 390px (mobile) and 1000px (desktop)
// in both themes, and captures: start screen, every question of the first exam in
// full-exam mode, a practice question after answering, and the exam results.
// The guided "need help?" course (map, lesson, question, feedback, summary, boss) is shot right after the start screen.
// Also fails if any screen overflows horizontally (the mobile guard).
// Env: EXAM=<code> picks the paper (default: first in the picker), MAX_Q caps shots per paper.
// Output: tools/raw/shots/<viewport>-<theme>-NN-<name>.png
const puppeteer = require("puppeteer-core");
const path = require("path"), fs = require("fs"), url = require("url");

const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const APP = process.env.APP_URL || url.pathToFileURL(path.join(__dirname, "..", "index.html")).href;
const THEME_KEY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "course.config.json"), "utf8")).storePrefix + "_theme";
const OUT = path.join(__dirname, "raw", "shots");
const MAX_Q = +(process.env.MAX_Q || 6);
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const VIEWPORTS = [
  ["m390", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ["d1000", { width: 1000, height: 900, deviceScaleFactor: 1 }],
];
const THEMES = ["dark", "light"];

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new",
    args: ["--no-sandbox", "--force-color-profile=srgb", "--hide-scrollbars", "--allow-file-access-from-files"] });
  const errors = [], overflow = [], clipped = [];
  for (const [vpName, vp] of VIEWPORTS) for (const theme of THEMES) {
    const page = await browser.newPage();
    page.on("pageerror", e => errors.push(`${vpName}/${theme} PAGEERROR: ${e.message}`));
    page.on("console", m => { if (m.type() === "error" && !/goatcounter|gc\.zgo\.at|ERR_/.test(m.text())) errors.push(`${vpName}/${theme} CONSOLE: ${m.text()}`); });
    page.on("dialog", d => d.accept());
    await page.setViewport(vp);
    await page.evaluateOnNewDocument((t, KEY) => { try { localStorage.setItem(KEY, t); } catch (e) {} }, theme, THEME_KEY);
    await page.goto(APP, { waitUntil: "load" });
    let n = 0;
    const shot = async name => {
      await sleep(250);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (ov > 1) overflow.push(`${vpName}/${theme}/${name}: +${ov}px`);
      const badCode = await page.evaluate(() => [...document.querySelectorAll(".code-block")].filter(c => c.offsetParent).flatMap(c => {
        const r = c.getBoundingClientRect(), cs = getComputedStyle(c), out = [];
        if (c.getAttribute("dir") !== "ltr" || cs.direction !== "ltr") out.push("code block not LTR");
        if (cs.textAlign !== "left" && cs.textAlign !== "start") out.push("code block not left-aligned");
        if (r.right > window.innerWidth + 1 || r.left < -1) out.push(`code block spans ${Math.round(r.left)}..${Math.round(r.right)} of ${window.innerWidth}px`);
        if (c.scrollWidth > c.clientWidth + 1 && !(cs.overflowX === "auto" || cs.overflowX === "scroll")) out.push("wide code block without its own horizontal scroll");
        return out;
      }));
      if (badCode.length) clipped.push(`${vpName}/${theme}/${name}: ${badCode.join("; ")}`);
      const f = `${vpName}-${theme}-${String(++n).padStart(2, "0")}-${name}.png`;
      await page.screenshot({ path: path.join(OUT, f), fullPage: true });
      console.log("shot:", f);
    };
    await shot("start");

    // guided "need help?" course: card -> map -> lesson -> quiz (bot answers) -> summary -> the boss's real question
    if (await page.evaluate(() => !!document.querySelector("#helpCards .crs-promo"))) {
      const jsClick = sel => page.evaluate(s => document.querySelector(s).click(), sel);
      const quizOpen = () => page.evaluate(() => !document.querySelector("#crsQuizView").classList.contains("hidden"));
      const bot = () => page.evaluate(() => {          // answers whatever is on screen: option / verdict / step widgets / self-mark
        const q = s => document.querySelector(s), all = s => [...document.querySelectorAll(s)];
        const opt = q("#crsQBody .opt"); if (opt) { opt.click(); return; }
        const tf = q("#crsQBody .tf-btn"); if (tf) { tf.click(); return; }
        const rv = q("#crsRevealBtn"); if (rv) { rv.click(); q("#crsQBody [data-self=ok]").click(); return; }
        all("#crsQBody .step-mount").forEach(m => {
          const o = m.querySelector(".s-opt"); if (o) { o.click(); return; }
          const inp = m.querySelector("input.s-input"); if (inp) { inp.value = "0"; m.querySelector(".s-check").click(); return; }
          const ln = m.querySelector(".s-lines .s-line"); if (ln) { ln.click(); return; }
          let p; while ((p = m.querySelector(".s-pool .s-line"))) p.click();
          const c = m.querySelector(".s-check"); if (c) c.click();
        });
      });
      const playOut = async (shotAt, name) => {
        for (let i = 0; i < 12 && await quizOpen(); i++) {
          await bot();
          if (i === shotAt) await shot(name);
          if (!(await page.evaluate(() => document.querySelector("#crsNextBtn").classList.contains("hidden")))) await jsClick("#crsNextBtn");
        }
      };
      await jsClick("#helpCards .crs-promo");
      await shot("course-map");
      await jsClick("#crsMap .crs-lvl");
      await shot("course-lesson");
      await jsClick("#crsLessonGo");
      await shot("course-question");
      await playOut(0, "course-feedback");
      await shot("course-summary");
      await jsClick('#crsSum [data-act="map"]');
      if (await page.evaluate(() => !!document.querySelector('#crsMap .crs-lvl.boss'))) {
        await jsClick("#crsMap .crs-lvl.boss");
        await jsClick("#crsLessonGo");
        await bot(); await jsClick("#crsNextBtn");
        await shot("course-boss-bank-question");
        await playOut(99, "");
        await shot("course-boss-summary");
      }
      await jsClick("#crsHomeBtn");
    }
    const nq = await page.evaluate(() => (window.CC_QUIZ.questions || []).length);
    if (nq) {
      // full exam of the first paper: every question in printed order
      await page.click('input[name=mode][value="exam"]');
      const code = process.env.EXAM || await page.evaluate(() => { const o = [...document.querySelectorAll("#examPick option")].find(x => x.value); return o && o.value; });
      await page.select("#examPick", code);
      await page.click("#startBtn");
      const total = await page.evaluate(c => window.CC_QUIZ.questions.filter(q => q.examCode === c).length, code);
      for (let i = 0; i < total; i++) {
        if (i < MAX_Q) await shot(`exam-q${i + 1}`);
        await page.click('#optionsList .opt[data-disp="0"]');
        if (i < total - 1) await page.click("#nextBtn");
      }
      await page.click("#submitExamBtn");
      await shot("results");
      await page.click("#backHomeBtn");
      // practice: answer the first question shown with display slot 0
      await page.click('input[name=mode][value="practice"]');
      await page.click("#startBtn");
      await page.click('#optionsList .opt[data-disp="0"]');
      await shot("practice-answered");
    }
    await page.close();
  }
  await browser.close();
  console.log("\noverflow:", overflow.length ? overflow : "none");
  console.log("errors:", errors.length ? errors : "none");
  console.log("code blocks:", clipped.length ? clipped : "ok");
  process.exit(errors.length || overflow.length || clipped.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
