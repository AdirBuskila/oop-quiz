/* Virtual functions and polymorphism course (virtual), level 2: C02 */
COURSE_LEVEL("virtual", {
  id: "C02", order: 2, icon: "🧬", title: "דריסה לאורך הירושה",
  goal: "לעקוב אחרי דריסה בשרשרת של כמה מחלקות ולקרוא לגרסת האב מתוך דריסה.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>כשמחלקה יורשת פונקציה וירטואלית ונותנת לה מימוש חדש עם <b>אותה חתימה</b> (שם, פרמטרים, <code>const</code>), זו <b>דריסה</b> (override).</p>
<ul>
<li>הפונקציה בנגזרת הופכת וירטואלית אוטומטית, גם בלי לכתוב <code>virtual</code> שוב. מכאן והלאה כל דור נוסף יכול לדרוס שוב.</li>
<li>הקריאה בוחרת את הגרסה <b>הנמוכה ביותר בשרשרת</b> שמתאימה לטיפוס האמיתי של האובייקט. אם מחלקה לא דרסה, יורשים את הגרסה של האב שלה.</li>
<li>אפשר להמשיך לגרסת האב מתוך הדריסה בעזרת <code>Base::f()</code>.</li>
<li>פונקציה לא וירטואלית שקוראת לפונקציה וירטואלית (תבנית "שלד ושלבים") מפעילה את הגרסה של הטיפוס האמיתי, כי <code>step()</code> בתוכה היא <code>this->step()</code>.</li>
</ul>
<div class="lesson-rule">🔑 <b>מי נבחר? מתחילים מהטיפוס האמיתי וטיילים למעלה עד הגרסה הראשונה שנכתבה.</b></div>
<div class="lesson-ex"><pre>struct X { virtual void f() { cout &lt;&lt; "X "; } };
struct Y : X { void f() { cout &lt;&lt; "Y "; } };   // overrides
struct Z : Y { };                              // no f of its own
X* p = new Z;
p-&gt;f();    // Z has none, goes up to Y::f -&gt; Y</pre></div>
` },
  questions: [
    { id: "C02-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct X { virtual void f() { cout << \"X \"; } };\nstruct Y : X { void f() { cout << \"Y \"; } };\nstruct Z : Y { void f() { cout << \"Z \"; } };\nint main() {\n    Z z;\n    X* a = &z;\n    Y* b = &z;\n    a->f();\n    b->f();\n    z.f();\n}\n```",
      options: [
        { id: "a", value: "`Z Z Z`" },
        { id: "b", value: "`X Y Z`" },
        { id: "c", value: "`X X Z`" },
        { id: "d", value: "`Z Y X`" }],
      correctId: "a",
      explanation: "`f` וירטואלית ב-`X`, ו-`Y::f` ו-`Z::f` דורסות אותה בלי לכתוב `virtual` שוב. האובייקט בפועל הוא `Z`, ולכן כל שלוש הקריאות מגיעות ל-`Z::f`, גם דרך `X*` וגם דרך `Y*`. `X Y Z` הוא מה שהיה קורה בלי `virtual`.",
      recap: "דריסה נשארת וירטואלית בכל הדורות" },
    { id: "C02-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct X { virtual void f() { cout << \"X \"; } };\nstruct Y : X { void f() { cout << \"Y \"; } };\nstruct Z : Y { };\nint main() {\n    X* p = new Z;\n    Y* q = new Z;\n    p->f();\n    q->f();\n}\n```",
      options: [
        { id: "a", value: "`Y Y`" },
        { id: "b", value: "`X Y`" },
        { id: "c", value: "`X X`" },
        { id: "d", value: "`Y X`" }],
      correctId: "a",
      explanation: "ל-`Z` אין `f` משלה, ולכן הגרסה שלה היא זו שהיא יורשת מהקרוב ביותר, `Y::f`. זה נכון גם דרך `X*` וגם דרך `Y*`. `X` לא נבחרת כי `Y` כבר דרסה אותה.",
      recap: "בלי דריסה יורשים את הגרסה הקרובה ביותר מלמעלה" },
    { id: "C02-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A {\n    void f() { A::f(); cout << \"B \"; }\n};\nint main() {\n    A* p = new B;\n    p->f();\n}\n```",
      options: [
        { id: "a", value: "`A B`" },
        { id: "b", value: "`B A`" },
        { id: "c", value: "`B`" },
        { id: "d", value: "`A`" }],
      correctId: "a",
      explanation: "`p->f()` מגיעה ל-`B::f` (וירטואליות). בתוכה השורה הראשונה היא `A::f()` עם שם מלא, שמדפיסה `A`, ואחריה `B`. התשובה `B A` הופכת את הסדר, `B` ו-`A` לבד מדלגות על אחת מהשורות.",
      recap: "Base::f() בתוך דריסה ממשיך לגרסת האב" },
    { id: "C02-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    void run() { step(); cout << \"end \"; }\n    virtual void step() { cout << \"A \"; }\n};\nstruct B : A {\n    void step() { cout << \"B \"; }\n};\nint main() {\n    B b;\n    b.run();\n    A a;\n    a.run();\n}\n```",
      options: [
        { id: "a", value: "`B end A end`" },
        { id: "b", value: "`A end A end`" },
        { id: "c", value: "`B end B end`" },
        { id: "d", value: "`A end B end`" }],
      correctId: "a",
      explanation: "`run` אינה וירטואלית, אז היא נקראת מ-`A`, אבל בתוכה `step()` היא `this->step()` דרך מצביע, ולכן נבחרת לפי האובייקט האמיתי: `B::step` עבור `b`, `A::step` עבור `a`. `A end A end` מניחה שבגלל ש-`run` שייכת ל-`A` גם `step` תהיה של `A`.",
      recap: "this->step() וירטואלית נבחרת לפי האובייקט האמיתי" },
    { id: "C02-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct S { virtual int v() { return 1; } };\nstruct T : S { int v() { return 2; } };\nstruct U : S { int v() { return 3; } };\nint main() {\n    S s; T t; U u;\n    S* a[4] = { &u, &s, &t, &u };\n    int num = 0;\n    for (int i = 0; i < 4; i++)\n        num = num * 10 + a[i]->v();\n    cout << num;\n}\n```",
      options: [
        { id: "a", value: "`3123`" },
        { id: "b", value: "`1111`" },
        { id: "c", value: "`1233`" },
        { id: "d", value: "`3213`" }],
      correctId: "a",
      explanation: "כל איבר במערך נבחר לפי האובייקט שאליו הוא מצביע: `u` נותן 3, `s` נותן 1, `t` נותן 2, `u` שוב 3. הספרות נבנות משמאל לימין: 3, 31, 312, 3123. `1111` היא התוצאה אם `v` לא הייתה וירטואלית.",
      recap: "במערך מצביעים כל קריאה נבחרת בנפרד לפי האובייקט" },
  ],
});
