/* Operators course (operators), level 3: C03 */
COURSE_LEVEL("operators", {
  id: "C03", order: 3, icon: "🖨️", title: "הדפסה וקלט בזרמים",
  goal: "לכתוב ולזהות operator<< ו-operator>> תקינים, ולהסביר למה הם חיצוניים.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>ב-<code>cout &lt;&lt; x</code> האופרנד השמאלי הוא <code>cout</code> (מטיפוס <code>ostream</code>), לא האובייקט שלנו. לכן <code>operator&lt;&lt;</code> של הדפסה <b>אינו יכול להיות פונקציה חברה</b> של המחלקה. הוא פונקציה חיצונית:</p>
<pre>ostream&amp; operator&lt;&lt;(ostream&amp; os, const X&amp; x) {
    return os &lt;&lt; x.get();   // או: os &lt;&lt; x.v, אם הוא friend
}</pre>
<ul>
<li><b>מחזירים <code>ostream&amp;</code></b> (את <code>os</code> עצמו) כדי ש-<code>cout &lt;&lt; a &lt;&lt; b</code> יעבוד: הוא נקרא <code>operator&lt;&lt;(operator&lt;&lt;(cout, a), b)</code>, והתוצאה של הקריאה הפנימית היא האופרנד השמאלי של החיצונית.</li>
<li>הזרם עובר <b>תמיד בהפניה</b> (<code>ostream&amp;</code>): אי אפשר להעתיק זרם.</li>
<li><code>friend</code> נחוץ רק אם הפונקציה קוראת שדות פרטיים ישירות.</li>
<li>קלט הפוך: <code>istream&amp; operator&gt;&gt;(istream&amp; is, X&amp; x)</code>. האובייקט עובר בהפניה <b>בלי const</b>, כי הקריאה משנה אותו.</li>
</ul>
<div class="lesson-rule">🔑 <b>הדפסה וקלט: פונקציה חיצונית, הזרם הוא הפרמטר הראשון, מחזירים את הזרם בהפניה.</b></div>
<div class="lesson-trap">⚠️ אם בכל זאת כותבים <code>operator&lt;&lt;</code> כפונקציה חברה, הוא מתקמפל, אבל מתאים רק לביטוי <code>x &lt;&lt; cout</code> (האובייקט משמאל). <code>cout &lt;&lt; x</code> לא יתקמפל.</div>
` },
  questions: [
    { id: "C03-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct P { int a, b; };\nostream& operator<<(ostream& os, const P& p) {\n    return os << \"(\" << p.a << \",\" << p.b << \")\";\n}\nint main() {\n    P p{1, 2}, q{3, 4};\n    cout << p << q << endl;\n}\n```",
      options: [
        { id: "a", value: "`(1,2)(3,4)`" },
        { id: "b", value: "`(3,4)(1,2)`" },
        { id: "c", value: "`(1,2) (3,4)`" },
        { id: "d", value: "`(1,2)`" }],
      correctId: "a",
      explanation: "`cout << p` מדפיס `(1,2)` ומחזיר את `cout`, ואז `<< q` מדפיס `(3,4)` מיד אחריו, בלי רווח (האופרטור לא מוסיף רווחים). לכן `(1,2)(3,4)`. הסדר הפוך הוא טעות בכיוון השרשור. התשובה עם הרווח מוסיפה רווח שאף שורה לא מדפיסה. התשובה האחרונה מניחה שהשרשור נקטע.",
      recap: "cout << p << q: ההדפסה הראשונה מחזירה את cout" },
    { id: "C03-Q2", question: "`a` ו-`b` הם אובייקטים מטיפוס `X`. איזו חתימה של `operator<<` (כפונקציה בעלת גוף תקין) גורמת לשורה `cout << a << b;` להתקמפל?",
      options: [
        { id: "a", value: "`ostream& operator<<(ostream& os, const X& x)`" },
        { id: "b", value: "`void operator<<(ostream& os, const X& x)`" },
        { id: "c", value: "פונקציה חברה: `ostream& X::operator<<(ostream& os) const`" },
        { id: "d", value: "`ostream operator<<(ostream os, const X& x)`" }],
      correctId: "a",
      explanation: "רק הגרסה החיצונית שמחזירה `ostream&` מאפשרת שרשור: התוצאה של `cout << a` היא `cout`, והיא האופרנד השמאלי של `<< b`. עם `void` ההדפסה השנייה לא מתקמפלת. הגרסה החברה מתאימה ל-`a << cout` ולא ל-`cout << a`. הגרסה האחרונה מעבירה ומחזירה את הזרם לפי ערך, וזרם אי אפשר להעתיק.",
      recap: "חיצוני, ostream& בפרמטר ובהחזרה" },
    { id: "C03-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    int v;\n    ostream& operator<<(ostream& os) const { return os << \"X\" << v; }\n};\nint main() {\n    X x{5};\n    x << cout;\n}\n```",
      options: [
        { id: "a", value: "`X5`" },
        { id: "b", value: "שגיאת קומפילציה" },
        { id: "c", value: "`5`" },
        { id: "d", value: "לא מודפס כלום" }],
      correctId: "a",
      explanation: "`operator<<` כפונקציה חברה מופעל על האובייקט שמשמאל: `x << cout` נקרא `x.operator<<(cout)` והוא מתקמפל ומדפיס `X5`. התוצאה מוזרה, כי המשתמשים רגילים לכתוב `cout << x`, והשורה הזאת לא הייתה מתקמפלת עם הגרסה החברה.",
      recap: "אופרטור חבר נקרא על האופרנד השמאלי: x << cout" },
    { id: "C03-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct P { int a, b; };\nistream& operator>>(istream& is, P& p) {\n    return is >> p.a >> p.b;\n}\nint main() {\n    istringstream in(\"7 8 9 10\");\n    P p, q;\n    in >> p >> q;\n    cout << p.a << q.b;\n}\n```",
      options: [
        { id: "a", value: "`710`" },
        { id: "b", value: "`78`" },
        { id: "c", value: "`89`" },
        { id: "d", value: "`910`" }],
      correctId: "a",
      explanation: "`in >> p` קורא את 7 ו-8 לתוך `p`, ומחזיר את `in`, ואז `>> q` קורא 9 ו-10 לתוך `q`. מדפיסים `p.a` (7) ו-`q.b` (10): `710`. התשובות האחרות הן צירופים של שדות אחרים.",
      recap: "operator>> מקבל P& ללא const ומחזיר את הזרם" },
    { id: "C03-Q5", question: "במחלקה `X` שדה פרטי `v` ופונקציה ציבורית `int get() const`. אין הצהרות `friend`. מה אפשר לכתוב במקום `____` כדי שהפונקציה תתקמפל?\n```cpp\nostream& operator<<(ostream& os, const X& x) {\n    return os << ____;\n}\n```",
      options: [
        { id: "a", value: "`x.get()`" },
        { id: "b", value: "`x.v`" },
        { id: "c", value: "`v`" },
        { id: "d", value: "`X::v`" }],
      correctId: "a",
      explanation: "הפונקציה חיצונית ואינה friend, ולכן היא יכולה להשתמש רק בממשק הציבורי: `x.get()`. הגישה `x.v` לשדה פרטי נכשלת. `v` לבדו לא קיים בפונקציה חיצונית (אין `this`). גם `X::v` לא עוזר: השדה לא סטטי ופרטי.",
      recap: "בלי friend: רק דרך הפונקציות הציבוריות" },
  ],
});
