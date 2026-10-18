/* Copy control course (copy_control), level 6: C06 */
COURSE_LEVEL("copy_control", {
  id: "C06", order: 6, icon: "🧬", title: "העתקה בירושה ובהכלה",
  goal: "לעקוב אחרי מה נקרא כשמעתיקים אובייקט עם בסיס או עם שדות אובייקט.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>בירושה ובהכלה, ההעתקה "נשפכת" לחלקים של האובייקט:</p>
<ul>
<li><b>בנאי העתקה והשמה אוטומטיים של מחלקה נגזרת</b> קוראים לבנאי ההעתקה (ולאופרטור ההשמה) של מחלקת הבסיס ושל כל שדה אובייקט.</li>
<li><b>בנאי העתקה שכתבתם בעצמכם</b> לא קורא לבסיס בעצמו. אם לא כתבתם <code>: Base(o)</code> ברשימת האתחול, מחלקת הבסיס נבנית ב<b>בנאי ברירת המחדל</b> שלה, ושדות האובייקט נבנים גם הם בבנאי ברירת מחדל.</li>
</ul>
<div class="lesson-rule">🔑 <b>בנאי העתקה ידני צריך להעביר הלאה:</b> <code>B(const B&amp; o) : A(o), m(o.m) {}</code>. מה שלא ברשימת האתחול נבנה כברירת מחדל.</div>
<div class="lesson-ex"><pre>struct A { A() { cout &lt;&lt; "Ad "; } A(const A&amp;) { cout &lt;&lt; "Ac "; } };
struct B : A { B() {} B(const B&amp; o) : A(o) {} };
B b1;      // Ad
B b2 = b1; // Ac</pre></div>
<div class="lesson-trap">⚠️ <b>כשהנגזרת לא כתבה השמה</b>, ההשמה האוטומטית שלה קוראת להשמה של הבסיס, ולכן אם הבסיס שינה משהו בהשמה (למשל הוסיף ערך), זה קורה גם בהשמה של הנגזרת.</div>
` },
  questions: [
    { id: "C06-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    A() { cout << \"Ad \"; }\n    A(const A&) { cout << \"Ac \"; }\n};\nstruct B : A {\n    B() {}\n    B(const B& o) { cout << \"Bc \"; }\n};\nint main() {\n    B b1;\n    B b2 = b1;\n}\n```",
      options: [
        { id: "a", value: "`Ad Ac Bc`" },
        { id: "b", value: "`Ad Ad Bc`" },
        { id: "c", value: "`Ad Bc`" },
        { id: "d", value: "`Ad Ad Ac Bc`" }],
      correctId: "b",
      explanation: "`B b1;` בונה את הבסיס בבנאי ברירת המחדל (`Ad`). בבנאי ההעתקה של `B` שכתבנו אין `: A(o)`, ולכן חלק ה-`A` של `b2` נבנה בבנאי ברירת המחדל (`Ad` שוב), ורק אחר כך רץ גוף הבנאי (`Bc`). בנאי העתקה של `A` לא נקרא בכלל.",
      recap: "בנאי העתקה ידני בלי A(o) בונה את הבסיס כברירת מחדל" },
    { id: "C06-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    A() { cout << \"Ad \"; }\n    A(const A&) { cout << \"Ac \"; }\n};\nstruct B : A {\n    B() {}\n    B(const B& o) : A(o) { cout << \"Bc \"; }\n};\nint main() {\n    B b1;\n    B b2 = b1;\n}\n```",
      options: [
        { id: "a", value: "`Ad Ad Bc`" },
        { id: "b", value: "`Ad Ac Bc`" },
        { id: "c", value: "`Ad Bc`" },
        { id: "d", value: "`Ac Bc`" }],
      correctId: "b",
      explanation: "`b1` בונה את הבסיס כברירת מחדל (`Ad`). בבנאי ההעתקה של `B` רשימת האתחול `: A(o)` קוראת לבנאי ההעתקה של `A` (`Ac`) לפני גוף הבנאי (`Bc`).",
      recap: "A(o) ברשימת האתחול מעביר את ההעתקה לבסיס" },
    { id: "C06-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct M {\n    M() { cout << \"m \"; }\n    M(const M&) { cout << \"mc \"; }\n};\nstruct W {\n    M m;\n    int x;\n};\nint main() {\n    W a;\n    W b = a;\n}\n```",
      options: [
        { id: "a", value: "`m mc`" },
        { id: "b", value: "`m m`" },
        { id: "c", value: "`m`" },
        { id: "d", value: "`mc`" }],
      correctId: "a",
      explanation: "לשדה `m` יש בנאי העתקה משלו. ל-`W` אין בנאי העתקה כתוב, ולכן זה האוטומטי, והוא מעתיק את השדה בבנאי ההעתקה שלו. ההדפסה: `m` בבנייה של `a`, ואחר כך `mc` בהעתקה ל-`b`.",
      recap: "בנאי העתקה אוטומטי מעתיק כל שדה אובייקט בבנאי ההעתקה שלו" },
    { id: "C06-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct M {\n    M() { cout << \"m \"; }\n    M(const M&) { cout << \"mc \"; }\n};\nstruct W {\n    M m;\n    W() {}\n    W(const W& o) { cout << \"Wc \"; }\n};\nint main() {\n    W a;\n    W b = a;\n}\n```",
      options: [
        { id: "a", value: "`m mc Wc`" },
        { id: "b", value: "`m Wc`" },
        { id: "c", value: "`m m Wc`" },
        { id: "d", value: "`m Wc mc`" }],
      correctId: "c",
      explanation: "`W a;` בונה את השדה `m` ומדפיס `m`. בבנאי ההעתקה שכתבנו, `m` לא מופיע ברשימת האתחול, ולכן הוא נבנה בבנאי ברירת המחדל שלו (`m` שוב), ורק אחר כך רץ גוף הבנאי (`Wc`). בנאי ההעתקה של `M` לא נקרא.",
      recap: "שדה שלא ברשימת האתחול של בנאי העתקה ידני נבנה כברירת מחדל" },
    { id: "C06-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    int na;\n    A(int i) { na = i; }\n    A& operator=(const A& a) {\n        na = a.na + 10;\n        return *this;\n    }\n};\nstruct B : A {\n    int nb;\n    B(int i, int j) : A(j) { nb = i; }\n};\nint main() {\n    B b1(1, 2);\n    B b2(3, 4);\n    b2 = b1;\n    cout << b2.nb << b2.na;\n}\n```",
      options: [
        { id: "a", value: "`34`" },
        { id: "b", value: "`12`" },
        { id: "c", value: "`112`" },
        { id: "d", value: "`312`" }],
      correctId: "c",
      explanation: "ל-`B` אין השמה משלה, ולכן ההשמה האוטומטית שלה קוראת להשמה של `A` על חלק הבסיס (`na = 2 + 10 = 12`), ומעתיקה את `nb` כרגיל (1). הפלט: `1` ואחריו `12`, כלומר `112`.",
      recap: "ההשמה האוטומטית של נגזרת קוראת להשמה של הבסיס" },
  ],
});
