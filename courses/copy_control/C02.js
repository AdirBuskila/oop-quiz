/* Copy control course (copy_control), level 2: C02 */
COURSE_LEVEL("copy_control", {
  id: "C02", order: 2, icon: "📤", title: "העברה והחזרה לפי ערך",
  goal: "לספור כמה פעמים נקרא בנאי העתקה בקריאות לפונקציות.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>בנאי העתקה נקרא גם בלי הסימן <code>=</code>, בכל מקום שבו נוצר <b>עותק</b> של אובייקט:</p>
<ul>
<li><b>פרמטר לפי ערך</b> (<code>void f(T t)</code>): בקריאה <code>f(a)</code> הפרמטר <code>t</code> נבנה כהעתק של <code>a</code>.</li>
<li><b>החזרה לפי ערך</b> (<code>T g()</code>): ערך ההחזרה נבנה כהעתק.</li>
<li><b>לפי הפניה</b> (<code>T&amp;</code>, <code>const T&amp;</code>) או <b>מצביע</b> (<code>T*</code>): אין העתקה בכלל.</li>
</ul>
<div class="lesson-rule">🔑 <b>עותק נוצר רק כשהטיפוס מופיע "חשוף" (בלי <code>&amp;</code> ובלי <code>*</code>)</b> בפרמטר או בטיפוס ההחזרה.</div>
<div class="lesson-ex"><code>K f(const K&amp; r) { return r; }</code> מחזירה לפי ערך מתוך הפניה, ולכן כל קריאה מעתיקה פעם אחת. לעומת זאת <code>K&amp; f(K&amp; r)</code> מחזירה הפניה ולא מעתיקה.</div>
<div class="lesson-trap">⚠️ <b>ביטול העתקה (copy elision) מ-C++17:</b> ב-<code>return K();</code> וב-<code>K d = make();</code> האובייקט נבנה ישירות במקומו הסופי, <b>בלי</b> בנאי העתקה. לעומת זאת <code>return k;</code> כש-<code>k</code> הוא פרמטר, או <code>return r;</code> כש-<code>r</code> הפניה, עדיין מעתיקים. בשאלות "בהכרח" לא סופרים העתקות שהקומפיילר רשאי לבטל.</div>
` },
  questions: [
    { id: "C02-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nvoid f(K k) {}\nvoid g(const K& k) {}\nint main() {\n    K a;\n    f(a);\n    g(a);\n    f(a);\n    cout << K::n;\n}\n```",
      options: [
        { id: "a", value: "`1`" },
        { id: "b", value: "`3`" },
        { id: "c", value: "`0`" },
        { id: "d", value: "`2`" }],
      correctId: "d",
      explanation: "`f` מקבלת פרמטר לפי ערך, ולכן כל קריאה אליה מעתיקה: שתי קריאות, שני בנאי העתקה. `g` מקבלת הפניה ולא מעתיקה. התשובה 3 סופרת גם את `g`.",
      recap: "פרמטר לפי ערך = העתקה בכל קריאה" },
    { id: "C02-Q2", question: "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK make() { return K(); }\nint main() {\n    K a = make();\n    K b = make();\n    cout << K::n;\n}\n```",
      options: [
        { id: "a", value: "`4`" },
        { id: "b", value: "`2`" },
        { id: "c", value: "`1`" },
        { id: "d", value: "`0`" }],
      correctId: "d",
      explanation: "ב-C++17 ההחזרה `return K();` וגם האתחול `K a = make();` בונים את האובייקט ישירות במקומו, בלי בנאי העתקה. לכן המונה נשאר 0. התשובות 2 ו-4 הן מה שסופרים לפי הכלל הישן, לפני ביטול ההעתקה.",
      recap: "ב-C++17 החזרה של ערך זמני לא מעתיקה" },
    { id: "C02-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK id(K k) { return k; }\nint main() {\n    K a;\n    K b = id(a);\n    cout << K::n;\n}\n```",
      options: [
        { id: "a", value: "`0`" },
        { id: "b", value: "`1`" },
        { id: "c", value: "`2`" },
        { id: "d", value: "`3`" }],
      correctId: "c",
      explanation: "הפרמטר `k` נבנה כהעתק של `a` (העתקה ראשונה). ב-`return k;` מחזירים פרמטר בשם, ואת זה הקומפיילר אינו רשאי לבטל, ולכן נוצר עוד עותק (העתקה שנייה). האתחול `K b = id(a);` כבר בונה ישירות, בלי העתקה נוספת. לכן 2.",
      recap: "החזרת פרמטר בשם מעתיקה, והעברה לפי ערך מעתיקה" },
    { id: "C02-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK f(const K& r) { return r; }\nint main() {\n    K a;\n    f(a);\n    f(a);\n    cout << K::n;\n}\n```",
      options: [
        { id: "a", value: "`0`" },
        { id: "b", value: "`1`" },
        { id: "c", value: "`2`" },
        { id: "d", value: "`4`" }],
      correctId: "c",
      explanation: "הפרמטר הוא הפניה ולכן לא מעתיקים בכניסה, אבל טיפוס ההחזרה הוא `K` לפי ערך, ו-`return r;` מעתיק מהפניה. כל קריאה יוצרת עותק (גם אם התוצאה נזרקת), ולכן 2. התשובה 4 סופרת גם העתקה בכניסה שלא קיימת.",
      recap: "טיפוס החזרה חשוף = עותק בכל קריאה" },
    { id: "C02-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nvoid f1(K& k) {}\nvoid f2(K k) {}\nvoid f3(K* k) {}\nK    f4() { return K(); }\nK&   f5(K& k) { return k; }\nK*   f6(K* k) { return k; }\nint main() {\n    K a;\n    f1(a);\n    f2(a);\n    f3(&a);\n    f4();\n    f5(a);\n    f6(&a);\n    cout << K::n;\n}\n```",
      options: [
        { id: "a", value: "`1`" },
        { id: "b", value: "`2`" },
        { id: "c", value: "`0`" },
        { id: "d", value: "`6`" }],
      correctId: "a",
      explanation: "רק `f2` מעתיקה (פרמטר לפי ערך). `f4` מחזירה לפי ערך, אבל `return K();` נבנה ישירות ב-C++17. `f1`, `f5` עובדות עם הפניות ו-`f3`, `f6` עם מצביעים, ולכן אין בהן העתקה. סה\"כ 1.",
      recap: "סופרים רק פרמטרים והחזרות בטיפוס חשוף, ושוללים ביטול העתקה" },
  ],
});
