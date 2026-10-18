/* Operators course (operators), level 6: C06 */
COURSE_LEVEL("operators", {
  id: "C06", order: 6, icon: "🎯", title: "אופרטורי המרה",
  goal: "להגדיר המרה מהמחלקה אל טיפוס אחר, ולהבין מה explicit operator משנה.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>בנאי ממיר <b>אל</b> המחלקה. כדי להמיר <b>מ</b>המחלקה לטיפוס אחר כותבים <b>אופרטור המרה</b> בתוך המחלקה:</p>
<pre>class M {
    double v;
public:
    M(double a) : v(a) {}
    operator int() const { return (int)v; }   // M &rarr; int
};</pre>
<ul>
<li>השם הוא <code>operator</code> ואחריו הטיפוס, ו<b>אין טיפוס החזרה</b> ואין פרמטרים. הטיפוס מופיע בשם.</li>
<li>עכשיו <code>int n = m;</code>, <code>(int)m</code> ו-<code>m + 1</code> (חיבור <code>int</code>) מתקמפלים. גם <code>cout &lt;&lt; m</code> עובד, כי הוא מומר ל-<code>int</code> שאפשר להדפיס.</li>
<li><code>explicit operator bool() const</code> מאפשר שימוש רק במקומות שבהם בכל מקרה מצפים לתנאי: <code>if (m)</code>, <code>while</code>, <code>!m</code>, <code>&amp;&amp;</code>, וגם המרה מפורשת <code>(bool)m</code>. אבל <code>bool b = m;</code> אסור.</li>
</ul>
<table>
<thead><tr><th>מה רוצים</th><th>מה כותבים</th><th>איפה</th></tr></thead>
<tbody>
<tr><td><code>int</code> &rarr; <code>X</code></td><td>בנאי <code>X(int)</code></td><td>ב-<code>X</code></td></tr>
<tr><td><code>X</code> &rarr; <code>int</code></td><td><code>operator int() const</code></td><td>ב-<code>X</code></td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>לכיוון אל המחלקה: בנאי. לכיוון החוצה: <code>operator T()</code> בלי טיפוס החזרה.</b></div>
<div class="lesson-trap">⚠️ אי אפשר להגדיר פונקציה בתוך <code>int</code>. כשרוצים לקבל <code>int</code> מאובייקט, ההגדרה תמיד נמצאת במחלקה שלנו.</div>
` },
  questions: [
    { id: "C06-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct M {\n    double v;\n    M(double a) : v(a) {}\n    operator int() const { return (int)v; }\n};\nint main() {\n    M m(3.9);\n    int n = m;\n    cout << n << \" \" << m + 1;\n}\n```",
      options: [
        { id: "a", value: "`3 4`" },
        { id: "b", value: "`3 4.9`" },
        { id: "c", value: "`4 5`" },
        { id: "d", value: "שגיאת קומפילציה" }],
      correctId: "a",
      explanation: "`int n = m;` משתמש באופרטור ההמרה ו-`(int)3.9` נחתך ל-3. גם ב-`m + 1` האובייקט מומר ל-`int` (3), ואז מחברים 1 ומקבלים 4. התשובה `3 4.9` שוכחת שההמרה עוברת דרך `int`. `4 5` מניחה עיגול במקום חיתוך. אין שגיאת קומפילציה.",
      recap: "operator int ממיר את האובייקט ל-int בכל ביטוי חשבוני" },
    { id: "C06-Q2", question: "במחלקה `Temp` יש בנאי `Temp(double)` ושדה פרטי `double c`. מה צריך להוסיף למחלקה כדי שהשורה `Temp t(3); double d = t;` תתקמפל?",
      options: [
        { id: "a", value: "`operator double() const { return c; }`" },
        { id: "b", value: "`Temp(int x) { c = x; }` (עוד בנאי, הפעם מ-int)" },
        { id: "c", value: "`double operator Temp() const { return c; }`" },
        { id: "d", value: "`Temp operator double() const { return *this; }`" }],
      correctId: "a",
      explanation: "כדי להמיר `Temp` ל-`double` כותבים `operator double()`, בלי טיפוס החזרה. עוד בנאי ממיר בכיוון ההפוך (אל `Temp`) ולכן לא עוזר. בשתי האפשרויות האחרונות יש טיפוס החזרה לפני המילה `operator`, וזה אסור באופרטור המרה.",
      recap: "operator double() const — בלי טיפוס החזרה" },
    { id: "C06-Q3", question: "למחלקה `S` מוגדר `explicit operator bool() const`. `s` הוא אובייקט מטיפוס `S`. איזו שורה **לא** מתקמפלת?",
      options: [
        { id: "a", value: "`if (s) {}`" },
        { id: "b", value: "`bool b = s;`" },
        { id: "c", value: "`bool b = (bool)s;`" },
        { id: "d", value: "`bool b(s);`" }],
      correctId: "b",
      explanation: "אופרטור המרה `explicit` לא משתתף באתחול עם `=`, ולכן `bool b = s;` נכשלת. בתנאי של `if` ההמרה מותרת (המרה מוקשרת להקשר), `(bool)s` היא המרה מפורשת, ו-`bool b(s)` היא אתחול ישיר.",
      recap: "explicit operator bool: מותר ב-if ובהמרה מפורשת, לא ב-bool b = s" },
    { id: "C06-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct S {\n    int n;\n    operator int() const { return n * 2; }\n};\nint main() {\n    S s{4};\n    cout << s << \" \" << s + 1;\n}\n```",
      options: [
        { id: "a", value: "`8 9`" },
        { id: "b", value: "`4 5`" },
        { id: "c", value: "`8 5`" },
        { id: "d", value: "שגיאת קומפילציה" }],
      correctId: "a",
      explanation: "אין `operator<<` למחלקה, אבל `cout << s` מתקמפל כי `s` מומר ל-`int` דרך אופרטור ההמרה, וההמרה מחזירה `n * 2 = 8`. גם `s + 1` ממיר ל-`int`: `8 + 1 = 9`. התשובה `4 5` מתעלמת מההמרה, ו-`8 5` מניחה שהחיבור משתמש בשדה `n`.",
      recap: "אופרטור המרה מאפשר שימוש באובייקט בכל מקום שמצפה ל-int" },
    { id: "C06-Q5", question: "איזו הצהרה תקינה כאופרטור המרה ל-`int` בתוך מחלקה `S`?\n```cpp\nstruct S {\n    ____ { return 1; }\n};\n```",
      options: [
        { id: "a", value: "`operator int() const`" },
        { id: "b", value: "`int operator int() const`" },
        { id: "c", value: "`operator int(int k) const`" },
        { id: "d", value: "`void operator int() const`" }],
      correctId: "a",
      explanation: "אופרטור המרה כתוב בלי טיפוס החזרה ובלי פרמטרים: `operator int()`. הטיפוס שמוחזר נקבע לפי השם. טיפוס החזרה מפורש (`int` או `void`) לפני `operator` אסור, ופרמטר לא מאפשר המרה אוטומטית.",
      recap: "אין טיפוס החזרה ואין פרמטרים באופרטור המרה" },
  ],
});
