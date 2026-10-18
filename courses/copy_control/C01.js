/* Copy control course (copy_control), level 1: C01 */
COURSE_LEVEL("copy_control", {
  id: "C01", order: 1, icon: "📋", title: "בנאי העתקה או השמה?",
  goal: "להבחין בכל שורה אם נקרא בנאי העתקה או אופרטור השמה.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>כשעובדים עם אובייקטים יש שלוש פעולות שקשורות ל"העתקה". כדי לדעת איזו נקראת בכל שורה שואלים שאלה אחת: <b>האם האובייקט בצד שמאל כבר קיים?</b></p>
<table>
<thead><tr><th>השורה</th><th>מה קורה</th><th>מי נקרא</th></tr></thead>
<tbody>
<tr><td><code>T b = a;</code></td><td>נוצר אובייקט חדש <code>b</code></td><td>בנאי העתקה</td></tr>
<tr><td><code>T b(a);</code></td><td>נוצר אובייקט חדש <code>b</code></td><td>בנאי העתקה</td></tr>
<tr><td><code>b = a;</code> (אחרי ש-<code>b</code> הוגדר)</td><td>שני האובייקטים כבר קיימים</td><td>אופרטור השמה</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>אובייקט חדש = בנאי. אובייקט קיים = השמה.</b> סימן ה-<code>=</code> בשורת הצהרה (<code>T b = a;</code>) הוא אתחול, ולכן נקרא בנאי העתקה ולא אופרטור ההשמה.</div>
<div class="lesson-ex">נעקוב אחרי מחלקה שמדפיסה בכל פעולה:
<pre>struct T {
    T()                    { cout &lt;&lt; "D "; }
    T(const T&amp;)            { cout &lt;&lt; "C "; }
    T&amp; operator=(const T&amp;) { cout &lt;&lt; "A "; return *this; }
};
T a;       // D
T b = a;   // C
b = a;     // A</pre></div>
<div class="lesson-trap">⚠️ <b>אם לא כתבתם בנאי העתקה</b>, הקומפיילר יוצר אחד בעצמו, והוא <b>לא מדפיס כלום</b>. העתקה שקרתה בשקט עדיין נחשבת העתקה.</div>
<div class="lesson-trap">⚠️ בנאי העתקה נקרא גם כשמעבירים אובייקט <b>לפונקציה לפי ערך</b> (<code>void f(T t)</code> עם <code>f(a);</code>): הפרמטר <code>t</code> הוא אובייקט חדש שנבנה כהעתק של <code>a</code>. הפרטים בשלב הבא.</div>
` },
  questions: [
    { id: "C01-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    T()                    { cout << \"D \"; }\n    T(const T&)            { cout << \"C \"; }\n    T& operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    T c(a);\n    c = a;\n}\n```",
      options: [
        { id: "a", value: "`D C C A`" },
        { id: "b", value: "`D C A A`" },
        { id: "c", value: "`D A C A`" },
        { id: "d", value: "`D C C C`" }],
      correctId: "a",
      explanation: "`T a;` הוא בנאי רגיל (`D`). `T b = a;` ו-`T c(a);` יוצרים אובייקטים חדשים ולכן קוראים לבנאי ההעתקה פעמיים (`C C`). רק `c = a;` היא השמה בין אובייקטים קיימים (`A`). התשובה `D C A A` סופרת את `T c(a);` כהשמה. `D A C A` מניחה ש-`=` בהצהרה היא השמה. `D C C C` מניחה שגם `c = a;` יוצרת אובייקט.",
      recap: "אובייקט חדש = בנאי העתקה, אובייקט קיים = השמה" },
    { id: "C01-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    T()                    { cout << \"D \"; }\n    T(const T&)            { cout << \"C \"; }\n    T& operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    T c;\n    c = b;\n    T d(c);\n    cout << \"end\";\n}\n```",
      options: [
        { id: "a", value: "`D C D A C end`" },
        { id: "b", value: "`D C D C C end`" },
        { id: "c", value: "`D A D A C end`" },
        { id: "d", value: "`D C D A A end`" }],
      correctId: "a",
      explanation: "שורה אחר שורה: `T a;` נותן `D`; `T b = a;` נותן `C`; `T c;` נותן `D`; `c = b;` נותן `A` כי `c` כבר קיים; `T d(c);` נותן `C`. התשובה `D C D C C end` שוכחת שהשורה `c = b;` היא השמה. `D A D A C end` חושבת ש-`T b = a;` היא השמה. `D C D A A end` חושבת שגם `T d(c);` היא השמה.",
      recap: "מסתכלים אם האובייקט בצד שמאל נוצר בשורה הזאת" },
    { id: "C01-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nint main() {\n    K a;\n    K b = a;\n    K c(a);\n    K d;\n    d = a;\n    b = c;\n    cout << K::n;\n}\n```",
      options: [
        { id: "a", value: "`3`" },
        { id: "b", value: "`2`" },
        { id: "c", value: "`4`" },
        { id: "d", value: "`1`" }],
      correctId: "b",
      explanation: "המונה `n` עולה רק בבנאי ההעתקה. בנאי העתקה נקרא ב-`K b = a;` וב-`K c(a);`, כלומר פעמיים. `d = a;` ו-`b = c;` הן השמות ולכן הן לא מגדילות את המונה (למחלקה אין אופרטור השמה משלה, והשמת ברירת המחדל לא נוגעת ב-`n`). התשובה 4 סופרת את כל ארבע שורות ההעתקה.",
      recap: "סופרים רק שורות שיוצרות אובייקט חדש מאובייקט קיים" },
    { id: "C01-Q4", question: "מה מדפיסה התכנית? שימו לב שלמחלקה אין בנאי העתקה משלה.\n```cpp\nstruct T {\n    T() {}\n    T& operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    b = a;\n    T c(b);\n    c = b;\n}\n```",
      options: [
        { id: "a", value: "`A`" },
        { id: "b", value: "`A A`" },
        { id: "c", value: "`A A A`" },
        { id: "d", value: "`A A A A`" }],
      correctId: "b",
      explanation: "`T b = a;` ו-`T c(b);` משתמשות בבנאי העתקה שהקומפיילר יצר, והוא לא מדפיס. רק שתי ההשמות `b = a;` ו-`c = b;` קוראות לאופרטור שנכתב, ולכן `A A`. התשובה `A A A A` סופרת גם את שתי ההצהרות, כאילו `=` בהצהרה היא השמה.",
      recap: "בנאי העתקה אוטומטי לא מדפיס, אבל הוא כן נקרא" },
    { id: "C01-Q5", question: "באיזו שורה אחת **לא** נקרא בנאי העתקה של `T`? (`a` ו-`b` הוגדרו קודם כאובייקטים מטיפוס `T`)",
      options: [
        { id: "a", value: "`T x = a;`" },
        { id: "b", value: "`T x(a);`" },
        { id: "c", value: "`b = a;`" },
        { id: "d", value: "העברת `a` לפונקציה `void f(T t)` בקריאה `f(a);`" }],
      correctId: "c",
      explanation: "בהצהרה `T x = a;` ובהצהרה `T x(a);` נוצר אובייקט חדש, ולכן בנאי העתקה. גם פרמטר שמועבר לפי ערך נוצר כהעתק. `b = a;` היא השמה בין שני אובייקטים שכבר קיימים, ולכן נקראת רק פעולת ההשמה.",
      recap: "השמה בין אובייקטים קיימים לא קוראת לבנאי העתקה" },
  ],
});
