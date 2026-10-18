/* Operators course (operators), level 4: C04 */
COURSE_LEVEL("operators", {
  id: "C04", order: 4, icon: "⬆️", title: "++ לפני ואחרי",
  goal: "להבדיל בין ++x ל-x++ בהעמסה: החתימות, ערך ההחזרה והאפקט.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>ל-<code>++</code> יש שתי צורות, והקומפיילר מבחין ביניהן לפי <b>פרמטר <code>int</code> מדומה</b>:</p>
<table>
<thead><tr><th>הביטוי</th><th>החתימה (חבר)</th><th>מה מחזירים</th></tr></thead>
<tbody>
<tr><td><code>++x</code> (prefix)</td><td><code>X&amp; operator++()</code></td><td>את האובייקט עצמו, אחרי השינוי (בהפניה)</td></tr>
<tr><td><code>x++</code> (postfix)</td><td><code>X operator++(int)</code></td><td>עותק של הערך <b>הישן</b> (לפי ערך)</td></tr>
</tbody></table>
<ul>
<li>הפרמטר <code>int</code> של ה-postfix לא משמש לכלום, הקומפיילר מעביר אליו 0 רק כדי להבדיל בין החתימות.</li>
<li>ה-postfix שומר עותק של הערך הישן, מגדיל את האובייקט, ומחזיר את העותק. לכן הוא מחזיר <b>לפי ערך</b>: אי אפשר להחזיר הפניה למשתנה מקומי.</li>
<li>כפונקציה חיצונית: <code>X&amp; operator++(X&amp;)</code> ו-<code>X operator++(X&amp;, int)</code>.</li>
<li>אם מוגדר רק <code>operator++()</code>, הביטוי <code>x++</code> לא מתקמפל, ולהפך.</li>
</ul>
<div class="lesson-rule">🔑 <b>prefix: בלי פרמטר, מחזיר הפניה. postfix: <code>(int)</code>, מחזיר עותק של הערך הישן.</b></div>
<div class="lesson-ex">
<pre>struct C {
    int n;
    C&amp; operator++()    { ++n; return *this; }
    C  operator++(int) { C old = *this; ++n; return old; }
};
C c{5};
C a = ++c;   // c.n = 6, a.n = 6
C b = c++;   // b.n = 6 (הישן), c.n = 7</pre></div>
` },
  questions: [
    { id: "C04-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct C {\n    int n;\n    C(int a) : n(a) {}\n    C& operator++() { ++n; return *this; }\n    C operator++(int) { C old = *this; ++n; return old; }\n};\nint main() {\n    C c(5);\n    C a = ++c;\n    C b = c++;\n    cout << a.n << b.n << c.n;\n}\n```",
      options: [
        { id: "a", value: "`667`" },
        { id: "b", value: "`656`" },
        { id: "c", value: "`677`" },
        { id: "d", value: "`567`" }],
      correctId: "a",
      explanation: "`++c` מעלה את `c` ל-6 ומחזיר אותו: `a.n = 6`. `c++` מחזיר עותק של הערך הישן (6), ואז מעלה את `c` ל-7: `b.n = 6`, `c.n = 7`. התשובה `677` נותנת ל-`b` את הערך החדש. `567` ו-`656` מתבססות על ערך התחלתי לא נכון או על ערך ישן ב-prefix.",
      recap: "prefix מחזיר את החדש, postfix את הישן" },
    { id: "C04-Q2", question: "במחלקה `C` מוגדר רק `C& operator++()` (חבר). `c` הוא אובייקט לא `const` מטיפוס `C`. איזו שורה **לא** מתקמפלת?",
      options: [
        { id: "a", value: "`++c;`" },
        { id: "b", value: "`c++;`" },
        { id: "c", value: "`++(++c);`" },
        { id: "d", value: "`c.operator++();`" }],
      correctId: "b",
      explanation: "הביטוי `c++` דורש `operator++(int)`, שלא הוגדר. `++c` תקין. `++(++c)` תקין כי `++c` מחזיר הפניה לאובייקט עצמו וגם אפשר להגדיל אותו שוב. `c.operator++()` היא הקריאה המפורשת ל-prefix.",
      recap: "x++ דורש operator++(int)" },
    { id: "C04-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct C {\n    int n;\n    C(int a) : n(a) {}\n    C operator++(int k) {\n        cout << \"k=\" << k << \" \";\n        C o = *this;\n        n += 1;\n        return o;\n    }\n};\nint main() {\n    C c(1);\n    c++;\n    c.operator++(7);\n    cout << c.n;\n}\n```",
      options: [
        { id: "a", value: "`k=0 k=7 3`" },
        { id: "b", value: "`k=1 k=7 3`" },
        { id: "c", value: "`k=0 k=0 3`" },
        { id: "d", value: "`k=0 k=7 10`" }],
      correctId: "a",
      explanation: "בביטוי `c++` הקומפיילר מעביר 0 לפרמטר המדומה, ובקריאה המפורשת `c.operator++(7)` מועבר 7 כפי שנכתב. בכל קריאה `n` גדל ב-1, ולכן בסוף `n = 3`. התשובה `k=1` ו-`k=0 k=0` מניחות ערכים אחרים לפרמטר. `10` מניחה שהערך 7 נכנס לשדה, אבל הפרמטר אינו בשימוש בגוף הפונקציה.",
      recap: "ב-x++ הקומפיילר מעביר 0 לפרמטר ה-int" },
    { id: "C04-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct C {\n    int n;\n    C(int a) : n(a) {}\n    C& operator++() { ++n; return *this; }\n    C operator++(int) { C o = *this; ++n; return o; }\n};\nint main() {\n    C a(1);\n    ++(++a);\n    cout << a.n;\n    (a++)++;\n    cout << \" \" << a.n;\n}\n```",
      options: [
        { id: "a", value: "`3 4`" },
        { id: "b", value: "`3 5`" },
        { id: "c", value: "`2 4`" },
        { id: "d", value: "`2 3`" }],
      correctId: "a",
      explanation: "`++a` מחזיר הפניה ל-`a` עצמו, ולכן `++(++a)` מעלה את `a` פעמיים: 3. ב-`(a++)++` הביטוי `a++` מעלה את `a` ל-4 ומחזיר עותק זמני של הערך הישן; ה-`++` השני מגדיל רק את העותק הזה, ו-`a` נשאר 4. לכן `3 4`. התשובה `3 5` מניחה ש-postfix מחזיר הפניה. `2 4` ו-`2 3` מניחות ש-prefix כפול מגדיל פעם אחת.",
      recap: "postfix מחזיר עותק: ++ על התוצאה לא משפיע על המקור" },
    { id: "C04-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct C { int n; };\nC& operator++(C& c) { c.n += 10; return c; }\nC operator++(C& c, int) { C o = c; c.n += 1; return o; }\nint main() {\n    C c{0};\n    C a = c++;\n    C b = ++c;\n    cout << a.n << \" \" << b.n << \" \" << c.n;\n}\n```",
      options: [
        { id: "a", value: "`0 11 11`" },
        { id: "b", value: "`1 11 11`" },
        { id: "c", value: "`0 12 12`" },
        { id: "d", value: "`10 11 11`" }],
      correctId: "a",
      explanation: "`c++` קורא לגרסה עם הפרמטר המדומה: מחזיר עותק של 0 ומעלה את `c` ל-1, ולכן `a.n = 0`. אחר כך `++c` קורא לגרסת ה-prefix ומוסיף 10: `c.n = 11` ו-`b.n = 11`. התשובה `1 11 11` נותנת ל-`a` את הערך החדש. `0 12 12` ו-`10 11 11` מערבבות בין שתי הגרסאות.",
      recap: "גם בצורה חיצונית: (C&, int) הוא postfix" },
  ],
});
