/* Copy control course (copy_control), level 5: C05 */
COURSE_LEVEL("copy_control", {
  id: "C05", order: 5, icon: "🛠️", title: "העתקה עמוקה וחוק השלושה",
  goal: "לכתוב ולעקוב אחרי הורס, בנאי העתקה והשמה למחלקה עם מצביע.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>כשמחלקה מחזיקה זיכרון שהוקצה ב-<code>new</code>, צריך לכתוב <b>שלוש פעולות יחד</b> (חוק השלושה): הורס, בנאי העתקה ואופרטור השמה.</p>
<pre>struct Deep {
    int* p;
    Deep(int v) : p(new int(v)) {}
    Deep(const Deep&amp; o) : p(new int(*o.p)) {}     // בנאי העתקה: מקצה חדש
    Deep&amp; operator=(const Deep&amp; o) {              // השמה
        if (this != &amp;o) {
            delete p;                              // מנקים את הישן
            p = new int(*o.p);                     // מקצים ומעתיקים
        }
        return *this;
    }
    ~Deep() { delete p; }
};</pre>
<div class="lesson-rule">🔑 <b>השמה עמוקה בארבעה צעדים:</b> (1) <code>if (this != &amp;o)</code>, (2) משחררים את הישן, (3) מקצים חדש ומעתיקים את התוכן, (4) <code>return *this;</code>.</div>
<div class="lesson-ex">בבנאי העתקה אין מה לשחרר (האובייקט חדש), ולכן הוא רק מקצה ומעתיק. בהשמה האובייקט כבר מחזיק זיכרון, ולכן קודם משחררים אותו.</div>
<div class="lesson-trap">⚠️ <b>צריך את שניהם.</b> עם בנאי העתקה בלי השמה, השורה <code>b = a;</code> עדיין משתפת מצביע. ועם השמה בלי בנאי העתקה, השורה <code>T b = a;</code> עדיין משתפת. ללא בדיקת <code>this != &amp;o</code>, השמה עצמית <code>a = a;</code> משחררת את הזיכרון לפני שמעתיקים ממנו.</div>
` },
  questions: [
    { id: "C05-Q1", question: "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית?\n```cpp\nstruct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep& o) : p(new int(*o.p)) {}\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(5);\n    Deep b = a;\n    *b.p = 9;\n    cout << *a.p << *b.p;\n}\n```",
      options: [
        { id: "a", value: "`99`" },
        { id: "b", value: "`55`" },
        { id: "c", value: "`59`" },
        { id: "d", value: "`95`" }],
      correctId: "c",
      explanation: "בנאי ההעתקה מקצה בלוק חדש ומעתיק אליו את התוכן, ולכן `a` ו-`b` עצמאיים. אחרי `*b.p = 9` ערכו של `a` נשאר 5 וערכו של `b` הוא 9: `59`. התשובה `99` היא מה שהיה קורה בהעתקה רדודה.",
      recap: "העתקה עמוקה = בלוק חדש לכל עותק" },
    { id: "C05-Q2", question: "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית?\n```cpp\nstruct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep& o) : p(new int(*o.p)) {}\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(1), b(2);\n    a = b;\n    *b.p = 7;\n    cout << *a.p << *b.p;\n}\n```",
      options: [
        { id: "a", value: "`77`" },
        { id: "b", value: "`27`" },
        { id: "c", value: "`17`" },
        { id: "d", value: "`22`" }],
      correctId: "b",
      explanation: "אופרטור ההשמה משחרר את הבלוק הישן של `a` ומקצה אחד חדש עם התוכן 2. לכן `a` ו-`b` עצמאיים: הכתיבה `*b.p = 7` לא משנה את `a`. הפלט `27`. התשובה `77` מתאימה להשמה רדודה.",
      recap: "השמה עמוקה: משחררים ישן, מקצים חדש, מעתיקים" },
    { id: "C05-Q3", question: "נתונה המחלקה הבאה, והתכנית משתמשת גם ב-`X b = a;` וגם ב-`c = a;` (כש-`c` כבר קיים). מה צריך להוסיף למחלקה כדי שלא ישוחרר אותו בלוק פעמיים?\n```cpp\nclass X {\npublic:\n    X(int i = 0) { p = new int(i); }\n    ~X() { delete p; }\n    int* p;\n};\n```",
      options: [
        { id: "a", value: "רק בנאי העתקה עמוק" },
        { id: "b", value: "רק אופרטור השמה עמוק" },
        { id: "c", value: "גם בנאי העתקה עמוק וגם אופרטור השמה עמוק" },
        { id: "d", value: "אין צורך להוסיף כלום, ברירת המחדל מספיקה" }],
      correctId: "c",
      explanation: "ההורס משחרר את `p`, ולכן כל אובייקט חייב להחזיק בלוק משלו. `X b = a;` עובר דרך בנאי ההעתקה ו-`c = a;` דרך אופרטור ההשמה. אם חסר אחד מהם, אחד המסלולים משתף את המצביע וההורסים ישחררו אותו בלוק פעמיים. צריך את שניהם.",
      recap: "הורס עם delete => צריך גם בנאי העתקה וגם השמה" },
    { id: "C05-Q4", question: "במחלקה עם מצביע כותבים את אופרטור ההשמה כך: קודם `delete p;` ואחר כך `p = new int(*o.p);`, **בלי** הבדיקה `if (this != &o)`. מה הבעיה בהשמה עצמית `a = a;`?",
      options: [
        { id: "a", value: "אין בעיה, ההשמה העצמית פשוט לא משנה כלום" },
        { id: "b", value: "הבלוק נמחק לפני שמעתיקים ממנו, ולכן מעתיקים נתונים ששוחררו" },
        { id: "c", value: "שגיאת קומפילציה" },
        { id: "d", value: "הבנאי נקרא פעם נוספת" }],
      correctId: "b",
      explanation: "בהשמה עצמית `o` הוא אותו אובייקט כמו `*this`. אחרי `delete p;` גם `o.p` מצביע לבלוק ששוחרר, והשורה `new int(*o.p)` קוראת ממנו. לכן צריך את הבדיקה `this != &o`, או לכתוב קודם עותק ורק אחר כך לשחרר.",
      recap: "בלי this != &o, השמה עצמית קוראת זיכרון ששוחרר" },
    { id: "C05-Q5", question: "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית? (`allocs` סופר כמה בלוקים הוקצו.)\n```cpp\nstruct Deep {\n    static int allocs;\n    int* p;\n    Deep(int v) : p(new int(v)) { allocs++; }\n    Deep(const Deep& o) : p(new int(*o.p)) { allocs++; }\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); allocs++; }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint Deep::allocs = 0;\nint main() {\n    Deep a(1);\n    Deep b = a;\n    Deep c(2);\n    c = a;\n    cout << Deep::allocs;\n}\n```",
      options: [
        { id: "a", value: "`2`" },
        { id: "b", value: "`3`" },
        { id: "c", value: "`4`" },
        { id: "d", value: "`5`" }],
      correctId: "c",
      explanation: "כל פעולה מקצה בלוק אחד חדש: הבנאי של `a` (1), בנאי ההעתקה של `b` (2), הבנאי של `c` (3), וההשמה `c = a;` שמשחררת את הבלוק הישן ומקצה חדש (4). סה\"כ 4.",
      recap: "בנאי, בנאי העתקה והשמה מקצים בלוק חדש כל אחד" },
    { id: "C05-Q6", question: "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית?\n```cpp\nstruct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep& o) : p(new int(*o.p)) {}\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(1), b(2), c(3);\n    a = b = c;\n    *c.p = 0;\n    cout << *a.p << *b.p << *c.p;\n}\n```",
      options: [
        { id: "a", value: "`330`" },
        { id: "b", value: "`000`" },
        { id: "c", value: "`123`" },
        { id: "d", value: "`333`" }],
      correctId: "a",
      explanation: "הפעולה `a = b = c` מתבצעת מימין לשמאל, וכל השמה מעתיקה לבלוק נפרד. אחרי השרשרת הערך בכל שלושה הוא 3. השינוי `*c.p = 0` נוגע רק ב-`c`, ולכן `330`.",
      recap: "שרשרת השמה עמוקה: כל אובייקט מחזיק עותק נפרד" },
  ],
});
