/* Copy control course (copy_control), level 3: C03 */
COURSE_LEVEL("copy_control", {
  id: "C03", order: 3, icon: "✍️", title: "החתימות הנכונות",
  goal: "לזהות בנאי העתקה ואופרטור השמה בחתימה תקינה, ולהסביר כל חלק בה.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>החתימות של שתי הפעולות קבועות, ואפשר לשנות אותן רק בזהירות:</p>
<table>
<thead><tr><th>הפעולה</th><th>החתימה המקובלת</th></tr></thead>
<tbody>
<tr><td>בנאי העתקה</td><td><code>T(const T&amp; o)</code></td></tr>
<tr><td>אופרטור השמה</td><td><code>T&amp; operator=(const T&amp; o)</code></td></tr>
</tbody></table>
<ul>
<li><b>למה הפניה בבנאי העתקה?</b> בנאי <code>T(T o)</code> היה צריך להעתיק את הארגומנט כדי לבנות את הפרמטר, כלומר לקרוא לעצמו בלי סוף. לכן הקומפיילר דוחה אותו.</li>
<li><b>למה <code>const</code>?</b> בלעדיו הבנאי לא יכול לקבל אובייקט <code>const</code> (או ערך זמני).</li>
<li><b>למה השמה מחזירה <code>T&amp;</code>?</b> כדי שהשרשרת <code>a = b = c</code> תעבוד: קודם <code>b = c</code>, ותוצאתה (<code>*this</code>, בהפניה) מושמת ל-<code>a</code>.</li>
</ul>
<div class="lesson-rule">🔑 <b>בנאי העתקה מקבל <code>const T&amp;</code>; השמה מקבלת <code>const T&amp;</code> ומחזירה <code>T&amp;</code> (עם <code>return *this;</code>).</b></div>
<div class="lesson-trap">⚠️ <b>אם כותבים בנאי <code>T(T&amp;)</code></b> (בלי <code>const</code>) הוא עדיין בנאי העתקה, אבל <code>const T c; T d = c;</code> לא תתקמפל. ו-<code>T(T*)</code> אינו בנאי העתקה בכלל: הוא בנאי רגיל שמקבל מצביע.</div>
<div class="lesson-trap">⚠️ <b>אם ההשמה מחזירה <code>T</code> לפי ערך</b>, כל השמה יוצרת עותק מיותר של <code>*this</code> (ולכן קוראת לבנאי העתקה).</div>
` },
  questions: [
    { id: "C03-Q1", question: "כמה מהבנאים הבאים, כשהם מוגדרים במחלקה `X`, הם בנאי העתקה חוקי?\n```cpp\nX(X x);\nX(X* x);\nX(const X& x);\nX(X& x);\n```",
      options: [
        { id: "a", value: "1" },
        { id: "b", value: "2" },
        { id: "c", value: "3" },
        { id: "d", value: "4" }],
      correctId: "b",
      explanation: "`X(const X& x)` ו-`X(X& x)` הם בנאי העתקה חוקי. `X(X x)` לא מתקמפל: כדי להעביר את הפרמטר צריך להעתיק, כלומר לקרוא לבנאי עצמו בלי סוף. `X(X* x)` מתקמפל אבל הוא בנאי רגיל שמקבל מצביע, ולא נקרא בהעתקה. לכן 2.",
      recap: "בנאי העתקה חוקי: פרמטר הפניה (const או לא), לא בערך ולא מצביע" },
    { id: "C03-Q2", question: "מה קורה בתכנית הבאה?\n```cpp\nstruct T {\n    T() {}\n    T(T&) { cout << \"c\"; }\n};\nint main() {\n    const T a;\n    T b = a;\n}\n```",
      options: [
        { id: "a", value: "מודפס `c`" },
        { id: "b", value: "לא מודפס כלום ואין שגיאה" },
        { id: "c", value: "שגיאת קומפילציה" },
        { id: "d", value: "שגיאה בזמן ריצה" }],
      correctId: "c",
      explanation: "הבנאי `T(T&)` מקבל הפניה שאינה `const`, ו-`a` הוא אובייקט `const`, ולכן אי אפשר לקשור אותו. מכיוון שהוגדר בנאי העתקה משלנו, הקומפיילר לא יוצר בנאי אוטומטי כגיבוי, ולא נמצא בנאי מתאים. זו שגיאת קומפילציה.",
      recap: "בנאי T(T&) לא יכול להעתיק אובייקט const" },
    { id: "C03-Q3", question: "מה קורה בתכנית הבאה?\n```cpp\nstruct T {\n    int v;\n    T(int x = 0) : v(x) {}\n    void operator=(const T& o) { v = o.v; }\n};\nint main() {\n    T a(1), b(2), c(3);\n    a = b = c;\n}\n```",
      options: [
        { id: "a", value: "התכנית מתקמפלת ו-`a`, `b`, `c` מקבלים כולם את הערך 3" },
        { id: "b", value: "שגיאת קומפילציה" },
        { id: "c", value: "`b` מקבל 3 ו-`a` נשאר 1" },
        { id: "d", value: "שגיאה בזמן ריצה" }],
      correctId: "b",
      explanation: "`a = b = c` מתבצעת מימין לשמאל: קודם `b = c`, ואז תוצאתה מושמת ל-`a`. כשהאופרטור מחזיר `void` אין תוצאה להשים, ולכן זו שגיאת קומפילציה. כדי שהשרשרת תעבוד ההשמה צריכה להחזיר `T&`.",
      recap: "השמה מחזירה T& כדי לאפשר שרשרת" },
    { id: "C03-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct N {\n    int v;\n    N(int x = 0) : v(x) {}\n    N& operator=(const N& o) { v = o.v; return *this; }\n};\nint main() {\n    N a(1), b(2), c(3);\n    a = b = c;\n    (a = N(8)).v = 9;\n    cout << a.v << b.v << c.v;\n}\n```",
      options: [
        { id: "a", value: "`333`" },
        { id: "b", value: "`933`" },
        { id: "c", value: "`833`" },
        { id: "d", value: "`988`" }],
      correctId: "b",
      explanation: "אחרי `a = b = c` כל שלושה שווים 3. התוצאה של `a = N(8)` היא הפניה ל-`a` עצמו, ולכן `.v = 9` משנה את `a`: ‏`a.v` הוא 9 ושני האחרים נשארים 3. התשובה `833` שוכחת שההשמה מחזירה את `a` עצמו; `333` שוכחת את השינוי ל-9.",
      recap: "ההשמה מחזירה הפניה ל-*this, ולכן אפשר להמשיך לשנות אותו" },
    { id: "C03-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    T() {}\n    T(const T&) { cout << \"C \"; }\n    T operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a, b;\n    a = b;\n    cout << \"end\";\n}\n```",
      options: [
        { id: "a", value: "`A end`" },
        { id: "b", value: "`C A end`" },
        { id: "c", value: "`A C end`" },
        { id: "d", value: "`C end`" }],
      correctId: "c",
      explanation: "ההשמה `a = b;` נכנסת לאופרטור (`A`). הוא מחזיר `T` לפי ערך, ולכן `return *this;` יוצר עותק (`C`) לפני שהאופרטור מסתיים. אחר כך מודפס `end`. הסדר הוא `A C end`.",
      recap: "החזרת T לפי ערך מהשמה מוסיפה בנאי העתקה" },
  ],
});
