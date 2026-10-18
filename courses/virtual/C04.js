/* Virtual functions and polymorphism course (virtual), level 4: C04 */
COURSE_LEVEL("virtual", {
  id: "C04", order: 4, icon: "🪤", title: "דריסה שלא קורית",
  goal: "לזהות חתימות שלא דורסות, ערכי ברירת מחדל והסתרת שמות.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>דריסה קורית רק כשהחתימה <b>זהה לחלוטין</b>: אותו שם, אותם סוגי פרמטרים, ואותו <code>const</code> על הפונקציה. כל הבדל יוצר פונקציה <b>חדשה</b> שלא קשורה לוירטואלית של האב, ובדרך כלל בלי שום הודעה.</p>
<ul>
<li><b>חסר <code>const</code></b> או פרמטר אחר: <code>A::f</code> נשארת, ו-<code>B::f</code> היא נוספת. דרך מצביע <code>A*</code> מתבצעת <code>A::f</code>.</li>
<li><b><code>override</code></b> בסוף החתימה מבקש מהקומפיילר לוודא שיש מה לדרוס. אם אין, יש <b>שגיאת קומפילציה</b>.</li>
<li><b>ערך ברירת מחדל</b> של פרמטר נקבע בקומפילציה לפי הטיפוס המוצהר, גם כשהגוף של הנגזרת.</li>
<li><b>הסתרת שמות:</b> פונקציה בנגזרת עם אותו שם (גם עם חתימה אחרת) מסתירה את כל ההעמסות של האב כשפונים דרך הנגזרת.</li>
</ul>
<div class="lesson-rule">🔑 <b>כשמצפים לדריסה ולא מקבלים, משווים חתימה אות באות</b> (שם, פרמטרים, <code>const</code>).</div>
<div class="lesson-ex"><pre>struct A { virtual void f(int) const { cout &lt;&lt; "A "; } };
struct B : A { void f(int)       { cout &lt;&lt; "B "; } };   // no const: NEW function
A* p = new B;
p-&gt;f(1);    // A  (A::f was not overridden)</pre></div>
` },
  questions: [
    { id: "C04-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() const { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    p->f();\n    b.f();\n}\n```",
      options: [
        { id: "a", value: "`A B`" },
        { id: "b", value: "`B B`" },
        { id: "c", value: "`A A`" },
        { id: "d", value: "`B A`" }],
      correctId: "a",
      explanation: "ב-`B::f` חסר `const`, ולכן החתימה שונה והיא אינה דורסת. `p->f()` רואה רק את `A::f const` ומפעילה אותה. `b.f()` על `B` מוצאת את `B::f`. התשובה `B B` מניחה שדריסה קרתה.",
      recap: "חסר const = אין דריסה" },
    { id: "C04-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f(int) { cout << \"A \"; } };\nstruct B : A { void f(double) { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    p->f(1);\n    b.f(1);\n}\n```",
      options: [
        { id: "a", value: "`A B`" },
        { id: "b", value: "`B B`" },
        { id: "c", value: "`A A`" },
        { id: "d", value: "`B A`" }],
      correctId: "a",
      explanation: "`f(double)` אינה דורסת את `f(int)`, כי סוג הפרמטר שונה. דרך `A*` נראית רק `A::f(int)`. על `b` עצמו מוצאים רק את `f(double)` של `B` (היא מסתירה את האחרת), והארגומנט `1` מומר ל-`double`.",
      recap: "פרמטר שונה = פונקציה חדשה" },
    { id: "C04-Q3", question: "מה קורה בקומפילציה של הקוד הבא?\n```cpp\nstruct A { virtual void f(int) { } };\nstruct B : A {\n    void f(long) override { }\n};\nint main() {\n    B b;\n    b.f(1);\n}\n```",
      options: [
        { id: "a", value: "שגיאת קומפילציה, כי `B::f(long)` לא דורסת שום פונקציה של `A`" },
        { id: "b", value: "הקוד מתקמפל, ו-`override` מתעלמת מהבדל הטיפוס" },
        { id: "c", value: "הקוד מתקמפל עם אזהרה בלבד" },
        { id: "d", value: "הקוד מתקמפל, ושגיאה תתרחש בזמן ריצה" }],
      correctId: "a",
      explanation: "`override` היא הבטחה לקומפיילר שהפונקציה דורסת וירטואלית של האב. `long` ו-`int` הם טיפוסים שונים, ולכן אין מה לדרוס והקומפיילר עוצר. זו בדיוק מטרת המילה: להפוך דריסה שנכשלה בשקט לשגיאה גלויה.",
      recap: "override הופכת דריסה שנכשלה לשגיאת קומפילציה" },
    { id: "C04-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    virtual void f(int i = 7) { cout << \"A\" << i << \" \"; }\n};\nstruct B : A {\n    void f(int i = 9) { cout << \"B\" << i << \" \"; }\n};\nint main() {\n    B b;\n    A* p = &b;\n    p->f();\n    b.f();\n}\n```",
      options: [
        { id: "a", value: "`B7 B9`" },
        { id: "b", value: "`B9 B9`" },
        { id: "c", value: "`A7 B9`" },
        { id: "d", value: "`B7 B7`" }],
      correctId: "a",
      explanation: "הגוף שמופעל נבחר בזמן ריצה (`B::f`), אבל ערך ברירת המחדל מוכנס בקומפילציה לפי הטיפוס המוצהר. דרך `A*` זה 7, ועל `b` זה 9 של `B`. הצירוף `B7` הוא גוף של נגזרת עם ברירת מחדל של האב.",
      recap: "גוף בזמן ריצה, ברירת מחדל בזמן קומפילציה" },
    { id: "C04-Q5", question: "מה קורה בקומפילציה של הקוד הבא?\n```cpp\nstruct X {\n    virtual void f(int) { cout << \"X1 \"; }\n    virtual void f(int, int) { cout << \"X2 \"; }\n};\nstruct Y : X {\n    void f(int) { cout << \"Y1 \"; }\n};\nint main() {\n    Y y;\n    y.f(1, 2);\n}\n```",
      options: [
        { id: "a", value: "שגיאת קומפילציה, כי `Y::f` מסתירה את `f(int, int)` של `X`" },
        { id: "b", value: "מודפס `X2`" },
        { id: "c", value: "מודפס `Y1 X2`" },
        { id: "d", value: "מודפס `Y1`" }],
      correctId: "a",
      explanation: "`Y` הגדירה פונקציה בשם `f`, ושם זה מסתיר את כל ההעמסות של `f` מ-`X` כשפונים דרך `Y`. לכן בחיפוש על `y.f(1, 2)` נראית רק `f(int)` ואין התאמה. הקריאה הייתה תקינה דרך `X*`, והמקרה בשאלה הבאה.",
      recap: "פונקציה בנגזרת מסתירה את ההעמסות של האב" },
    { id: "C04-Q6", question: "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    virtual void f(int) { cout << \"X1 \"; }\n    virtual void f(int, int) { cout << \"X2 \"; }\n};\nstruct Y : X {\n    void f(int) { cout << \"Y1 \"; }\n};\nint main() {\n    Y y;\n    X* p = &y;\n    p->f(1);\n    p->f(1, 2);\n}\n```",
      options: [
        { id: "a", value: "`Y1 X2`" },
        { id: "b", value: "`Y1 Y1`" },
        { id: "c", value: "`X1 X2`" },
        { id: "d", value: "`Y1 Y2`" }],
      correctId: "a",
      explanation: "דרך `X*` שתי ההעמסות גלויות. `f(int)` דרוסה ב-`Y`, ולכן `Y1`. `f(int, int)` לא נדרסה ולכן נשארת `X2`. אין `Y2` כי `Y` לא כתבה אותה.",
      recap: "דרך מצביע לאב רואים את כל ההעמסות של האב" },
  ],
});
