/* Operators course (operators), level 5: C05 */
COURSE_LEVEL("operators", {
  id: "C05", order: 5, icon: "🔁", title: "בנאי המרה ו-explicit",
  goal: "לזהות המרות אוטומטיות דרך בנאי, ולדעת מה explicit חוסם.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p><b>בנאי המרה</b> הוא בנאי שאפשר לקרוא לו עם ארגומנט אחד (<code>X(int)</code>). הוא מגדיר גם <b>המרה אוטומטית</b> מ-<code>int</code> ל-<code>X</code>:</p>
<ul>
<li><code>X x = 5;</code> נקרא <code>X x(5)</code> בדרך עקיפה: ההמרה מתבצעת בשבילנו.</li>
<li>העברת <code>5</code> לפונקציה <code>void f(X)</code> היא <code>f(X(5))</code>.</li>
<li>בביטוי כמו <code>a + 5</code> אפשר להמיר את <code>5</code> ל-<code>X</code> כשהפרמטר הוא <code>X</code>. עם אופרטור <b>חיצוני</b> גם <code>5 + a</code> עובד (גם הפרמטר השמאלי עובר המרה), בניגוד לאופרטור חבר.</li>
<li>בהמרה אוטומטית אחת בלבד: <code>B b = 5;</code> נכשל אם צריך <code>int</code> &larr; <code>A</code> &larr; <code>B</code> (שתי המרות מוגדרות על ידי המשתמש).</li>
</ul>
<p><b><code>explicit</code></b> לפני הבנאי מבטל את ההמרה האוטומטית: רק קריאה מפורשת עובדת.</p>
<table>
<thead><tr><th>הבנאי</th><th><code>X x = 5;</code></th><th><code>f(5)</code></th><th><code>X x(5);</code></th></tr></thead>
<tbody>
<tr><td><code>X(int)</code></td><td>תקין</td><td>תקין</td><td>תקין</td></tr>
<tr><td><code>explicit X(int)</code></td><td>שגיאה</td><td>שגיאה</td><td>תקין</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>בנאי עם ארגומנט אחד = המרה אוטומטית אל המחלקה. <code>explicit</code> = רק מפורש (<code>X(5)</code>, <code>X x(5)</code>, <code>static_cast&lt;X&gt;(5)</code>).</b></div>
<div class="lesson-trap">⚠️ <b>הכלל "המרה אחת"</b> חל על אתחול עם <code>=</code>. כשכותבים <code>B b(5);</code> (אתחול ישיר), הקומפיילר צריך להמיר רק את <code>5</code> לפרמטר של הבנאי <code>B(const A&amp;)</code>, וזו המרה אחת, ולכן זה כן מתקמפל.</div>
` },
  questions: [
    { id: "C05-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    int v;\n    X(int a) { cout << \"ctor\" << a << \" \"; v = a; }\n};\nvoid f(X x) { cout << \"f\" << x.v; }\nint main() {\n    f(7);\n}\n```",
      options: [
        { id: "a", value: "`ctor7 f7`" },
        { id: "b", value: "`f7`" },
        { id: "c", value: "`ctor7`" },
        { id: "d", value: "שגיאת קומפילציה" }],
      correctId: "a",
      explanation: "הבנאי `X(int)` אינו `explicit`, ולכן הארגומנט `7` מומר ל-`X` בקריאה `f(7)`: קודם נבנה `X` ומודפס `ctor7`, ורק אחר כך הפונקציה מדפיסה `f7`. התשובה `f7` שוכחת שההמרה קוראת לבנאי. `ctor7` שוכחת שהפונקציה רצה. שגיאת קומפילציה הייתה קורית רק עם `explicit`.",
      recap: "בנאי לא explicit ממיר ארגומנט אוטומטית" },
    { id: "C05-Q2", question: "במחלקה `X` הבנאי `explicit X(int a)`. איזו שורה **לא** מתקמפלת?",
      options: [
        { id: "a", value: "`X a(1);`" },
        { id: "b", value: "`X a = 1;`" },
        { id: "c", value: "`X a = X(1);`" },
        { id: "d", value: "`X a{1};`" }],
      correctId: "b",
      explanation: "אתחול עם `=` ו-`5` ללא יצירה מפורשת דורש המרה אוטומטית, וזו בדיוק מה ש-`explicit` חוסם. `X a(1)`, `X a{1}` ו-`X a = X(1)` קוראים לבנאי במפורש.",
      recap: "explicit חוסם את X x = 1" },
    { id: "C05-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    int v;\n    X(int a = 0) : v(a) {}\n};\nX operator+(const X& a, const X& b) { return X(a.v + b.v); }\nint main() {\n    X a(2);\n    cout << (5 + a).v << (a + 5).v;\n}\n```",
      options: [
        { id: "a", value: "`77`" },
        { id: "b", value: "`75`" },
        { id: "c", value: "`7`" },
        { id: "d", value: "שגיאת קומפילציה" }],
      correctId: "a",
      explanation: "האופרטור חיצוני עם שני פרמטרים מסוג `X`, ולכן כל אחד מהאופרנדים יכול לעבור המרה דרך `X(int)`. גם `5 + a` וגם `a + 5` נותנים 7. עם אופרטור חבר, `5 + a` לא היה מתקמפל. שגיאת קומפילציה היא התשובה הנכונה רק אם הבנאי היה `explicit`.",
      recap: "אופרטור חיצוני: שני האופרנדים עוברים המרה" },
    { id: "C05-Q4", question: "במחלקה `X` הבנאי `explicit X(int)`, והפונקציה `void f(X x)`. איזו קריאה מתקמפלת?",
      options: [
        { id: "a", value: "`f(X(5));`" },
        { id: "b", value: "`f(5);`" },
        { id: "c", value: "`f('a');`" },
        { id: "d", value: "`f(5.5);`" }],
      correctId: "a",
      explanation: "עם `explicit` ההמרה האוטומטית מ-`int` ל-`X` אסורה, ולכן רק קריאה מפורשת `f(X(5))` עובדת. `f(5)`, `f('a')` ו-`f(5.5)` דורשות המרה אוטומטית ל-`X` (עם המרה סטנדרטית נוספת ל-`int`), ונכשלות.",
      recap: "עם explicit מפעילים את הבנאי בעצמנו" },
    { id: "C05-Q5", question: "נתונות שתי מחלקות: `A` עם בנאי `A(int)` ו-`B` עם בנאי `B(const A&)`. שניהם לא `explicit`. איזו שורה **לא** מתקמפלת?",
      options: [
        { id: "a", value: "`B b = 5;`" },
        { id: "b", value: "`B b = A(5);`" },
        { id: "c", value: "`B b(5);`" },
        { id: "d", value: "`B b = B(A(5));`" }],
      correctId: "a",
      explanation: "ב-`B b = 5;` צריך שתי המרות מוגדרות על ידי המשתמש ברצף: `int` ל-`A` ואחר כך `A` ל-`B`, וזה אסור. ב-`B b = A(5);` יש המרה אחת (`A` ל-`B`). ב-`B b(5);` זה אתחול ישיר: ההמרה היחידה היא של `5` לפרמטר `A`. ב-`B(A(5))` הכול מפורש.",
      recap: "אתחול עם = מתיר המרה אחת מוגדרת-משתמש" },
  ],
});
