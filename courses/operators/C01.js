/* Operators course (operators), level 1: C01 */
COURSE_LEVEL("operators", {
  id: "C01", order: 1, icon: "➕", title: "אופרטור כפונקציה חברה",
  goal: "לקרוא ביטוי כמו a + b כקריאה לפונקציה, ולדעת מה הפרמטרים של אופרטור חבר.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>אופרטור הוא פונקציה עם שם מיוחד. הביטוי <code>a + b</code> הוא קיצור לקריאה <code>a.operator+(b)</code>, כשהאופרטור מוגדר <b>בתוך</b> המחלקה של <code>a</code>.</p>
<table>
<thead><tr><th>הביטוי</th><th>הקריאה</th><th>מי זה <code>this</code></th></tr></thead>
<tbody>
<tr><td><code>a + b</code></td><td><code>a.operator+(b)</code></td><td><code>a</code></td></tr>
<tr><td><code>a += b</code></td><td><code>a.operator+=(b)</code></td><td><code>a</code></td></tr>
</tbody></table>
<ul>
<li><b>אופרטור בינארי חבר מקבל פרמטר אחד בלבד</b>: האופרנד הימני. האופרנד השמאלי הוא האובייקט עצמו (<code>*this</code>).</li>
<li>לכן <b>האופרנד השמאלי חייב להיות מהמחלקה</b>. אי אפשר לכתוב <code>5 + a</code> עם אופרטור חבר, כי ל-<code>int</code> אין פונקציה חברה בשם <code>operator+</code>.</li>
<li><code>+</code> יוצר ערך חדש ולכן מחזיר <code>V</code> לפי ערך. <code>+=</code> משנה את האובייקט ומחזיר <code>V&amp;</code> (עם <code>return *this;</code>), כדי שאפשר יהיה לשרשר.</li>
<li>האופרנד הימני יכול לעבור המרה אוטומטית (למשל <code>a + 5</code> כשיש בנאי <code>V(int)</code>), האופרנד השמאלי של אופרטור חבר לא.</li>
</ul>
<div class="lesson-rule">🔑 <b>אופרטור חבר: האופרנד השמאלי הוא <code>this</code>, ולכן הפרמטר היחיד הוא האופרנד הימני.</b></div>
<div class="lesson-ex">
<pre>struct V {
    int x;
    V(int a) : x(a) {}
    V operator+(const V&amp; o) const { return V(x + o.x); }
};
V a(3), b(4);
V c = a + b;            // a.operator+(b)  =&gt; 7</pre></div>
<div class="lesson-trap">⚠️ אופרטורים כמו <code>a - b - c</code> מחושבים משמאל לימין: קודם <code>(a - b)</code>, ואז התוצאה היא האופרנד השמאלי של האופרטור השני.</div>
` },
  questions: [
    { id: "C01-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct V {\n    int x;\n    V(int a) : x(a) {}\n    V operator+(const V& o) const { return V(x + o.x); }\n};\nint main() {\n    V a(3), b(4);\n    V c = a + b;\n    V d = a.operator+(c);\n    cout << c.x << \" \" << d.x;\n}\n```",
      options: [
        { id: "a", value: "`7 10`" },
        { id: "b", value: "`7 7`" },
        { id: "c", value: "`10 7`" },
        { id: "d", value: "`7 14`" }],
      correctId: "a",
      explanation: "`a + b` הוא `a.operator+(b)` ולכן `c.x` הוא `3 + 4 = 7`. הקריאה המפורשת `a.operator+(c)` מחברת את `a` (3) עם `c` (7) ונותנת 10. התשובה `7 7` מתעלמת מ-`c` בקריאה השנייה. `10 7` הופכת את סדר ההדפסה. `7 14` מחברת את `c` לעצמו.",
      recap: "a + b זה a.operator+(b)" },
    { id: "C01-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct V {\n    int x;\n    V(int a = 0) : x(a) {}\n    V& operator+=(const V& o) { x += o.x; return *this; }\n};\nint main() {\n    V a(1), b(2), c(3);\n    (a += b) += c;\n    cout << a.x << b.x << c.x;\n}\n```",
      options: [
        { id: "a", value: "`623`" },
        { id: "b", value: "`323`" },
        { id: "c", value: "`633`" },
        { id: "d", value: "`126`" }],
      correctId: "a",
      explanation: "`a += b` משנה את `a` ל-3 ומחזיר הפניה אל `a` עצמו, ולכן `+= c` ממשיך לעבוד על `a` ומעלה אותו ל-6. `b` ו-`c` לא משתנים: `623`. התשובה `323` נכונה רק אילו האופרטור החזיר עותק, ואז `+= c` היה משנה את העותק. בתשובות `633` ו-`126` מניחים ש-`b` או `c` משתנים.",
      recap: "+= מחזיר V& כדי שהשרשור ימשיך לעבוד על אותו אובייקט" },
    { id: "C01-Q3", question: "במחלקה `V` מוגדר בנאי `V(int)` (לא `explicit`) והאופרטור `V operator+(const V&) const` כפונקציה חברה. `a` ו-`b` הם אובייקטים מטיפוס `V`. איזו שורה **לא** מתקמפלת?",
      options: [
        { id: "a", value: "`V r = a + b;`" },
        { id: "b", value: "`V r = a + 5;`" },
        { id: "c", value: "`V r = 5 + a;`" },
        { id: "d", value: "`V r = a.operator+(b);`" }],
      correctId: "c",
      explanation: "באופרטור חבר האופרנד השמאלי הוא `this`, ולכן הוא חייב להיות `V`. ב-`5 + a` האופרנד השמאלי הוא `int`, ואין לו פונקציה חברה `operator+`. ב-`a + 5` האופרנד הימני `5` מומר ל-`V` דרך הבנאי `V(int)`, ולכן זה מתקמפל.",
      recap: "אופרטור חבר: רק האופרנד הימני עובר המרה, השמאלי חייב להיות מהמחלקה" },
    { id: "C01-Q4", question: "`a` ו-`b` הם אובייקטים מטיפוס `V`. איזו הצהרה בתוך המחלקה `V` גורמת לשורה `V c = a * b;` להתקמפל? (בכל אפשרות הגוף תקין)",
      options: [
        { id: "a", value: "`V operator*(const V& o) const`" },
        { id: "b", value: "`V operator*(const V& x, const V& y) const`" },
        { id: "c", value: "`V operator*() const`" },
        { id: "d", value: "`V operator*(int k) const`" }],
      correctId: "a",
      explanation: "אופרטור בינארי חבר מקבל פרמטר אחד: האופרנד הימני. `operator*(const V&, const V&)` כפונקציה חברה אפילו לא מתקמפל כהצהרה, כי הוא מקבל שני פרמטרים מפורשים ובנוסף `this`. `operator*()` בלי פרמטרים הוא ה-`*` האונרי (כמו `*a`), לא הכפל. `operator*(int)` מקבל `int`, ו-`b` הוא `V` שאין לו המרה ל-`int`.",
      recap: "בינארי חבר = פרמטר אחד מטיפוס האופרנד הימני" },
    { id: "C01-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct P {\n    string n;\n    P(string s) : n(s) {}\n    P operator-(const P& o) const {\n        cout << n << \"-\" << o.n << \" \";\n        return P(n + o.n);\n    }\n};\nint main() {\n    P a(\"a\"), b(\"b\"), c(\"c\");\n    P r = a - b - c;\n    cout << r.n;\n}\n```",
      options: [
        { id: "a", value: "`a-b ab-c abc`" },
        { id: "b", value: "`b-c a-bc abc`" },
        { id: "c", value: "`a-b ab-c ab`" },
        { id: "d", value: "`a-b c-ab cab`" }],
      correctId: "a",
      explanation: "החישוב משמאל לימין: קודם `a - b` מדפיס `a-b ` ומחזיר אובייקט עם `ab`. אחר כך האובייקט הזה הוא האופרנד השמאלי: `ab-c ` ומחזיר `abc`. התשובה `b-c a-bc abc` מחשבת מימין לשמאל. `a-b ab-c ab` שוכחת שהתוצאה האחרונה היא `abc`. `a-b c-ab cab` הופכת את סדר האופרנדים.",
      recap: "a - b - c הוא (a - b) - c, והשמאלי הוא this" },
  ],
});
