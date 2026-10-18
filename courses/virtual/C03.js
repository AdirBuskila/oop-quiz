/* Virtual functions and polymorphism course (virtual), level 3: C03 */
COURSE_LEVEL("virtual", {
  id: "C03", order: 3, icon: "✂️", title: "ערך, הפניה, מצביע וחיתוך",
  goal: "לזהות מתי אובייקט נחתך לטיפוס האב ומתי הטיפוס האמיתי נשמר.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>וירטואליות עובדת רק כשיש <b>הפניה או מצביע</b>. כשמעתיקים אובייקט נגזר לתוך אובייקט מטיפוס האב <b>בערך</b>, נשאר רק חלק האב: זה <b>חיתוך</b> (slicing).</p>
<table>
<thead><tr><th>צורה</th><th>דוגמה</th><th>הטיפוס שנבחר</th></tr></thead>
<tbody>
<tr><td>הפניה</td><td><code>void g(A&amp; a)</code></td><td>האמיתי</td></tr>
<tr><td>מצביע</td><td><code>void g(A* a)</code></td><td>האמיתי</td></tr>
<tr><td>ערך</td><td><code>void g(A a)</code>, <code>A a = b;</code>, <code>vector&lt;A&gt;</code></td><td><b>A</b> (חתוך)</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>אובייקט בערך הוא תמיד מהטיפוס שהוצהר.</b> ההעתקה בונה אובייקט <code>A</code> חדש שאין בו שום זכר ל-<code>B</code>, כולל השדות הנוספים של <code>B</code>.</div>
<div class="lesson-ex"><pre>void byRef(A&amp; a) { a.f(); }   // real type
void byVal(A a)  { a.f(); }   // copy of the A part only
B b;
byRef(b);   // B
byVal(b);   // A</pre></div>
<div class="lesson-trap">⚠️ <code>vector&lt;A&gt;</code> שומר אובייקטי <code>A</code> בלבד, וכל <code>push_back(B())</code> חותך. כדי לשמור טיפוסים שונים משתמשים ב-<code>vector&lt;A*&gt;</code>.</div>
` },
  questions: [
    { id: "C03-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nvoid g(A& a) { a.f(); }\nvoid h(A* a) { a->f(); }\nvoid k(A a) { a.f(); }\nint main() {\n    B b;\n    g(b);\n    h(&b);\n    k(b);\n}\n```",
      options: [
        { id: "a", value: "`B B A`" },
        { id: "b", value: "`B B B`" },
        { id: "c", value: "`A A A`" },
        { id: "d", value: "`B A A`" }],
      correctId: "a",
      explanation: "הפניה ומצביע שומרים על האובייקט המקורי ולכן `B` פעמיים. `k` מקבלת `A` בערך: נוצר עותק שהוא `A` בלבד (חיתוך), ולכן `A`. `B B B` שוכחת שהעברה בערך חותכת.",
      recap: "העברה בערך חותכת, הפניה ומצביע לא" },
    { id: "C03-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual string name() { return \"A\"; } };\nstruct B : A { string name() { return \"B\"; } };\nint main() {\n    vector<A> v;\n    v.push_back(B());\n    vector<A*> w;\n    w.push_back(new B);\n    cout << v[0].name() << \" \" << w[0]->name();\n}\n```",
      options: [
        { id: "a", value: "`A B`" },
        { id: "b", value: "`B B`" },
        { id: "c", value: "`A A`" },
        { id: "d", value: "`B A`" }],
      correctId: "a",
      explanation: "`vector<A>` מאחסן אובייקטי `A`, ולכן `push_back(B())` מעתיק רק את חלק האב: `A`. `vector<A*>` מאחסן מצביעים לאובייקט האמיתי, והקריאה וירטואלית: `B`.",
      recap: "אוסף פולימורפי = אוסף מצביעים" },
    { id: "C03-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    int x = 1;\n    virtual int get() { return x; }\n};\nstruct B : A {\n    int y = 2;\n    int get() { return x + y; }\n};\nint main() {\n    B b;\n    A a = b;\n    A& r = b;\n    cout << a.get() << \" \" << r.get();\n}\n```",
      options: [
        { id: "a", value: "`1 3`" },
        { id: "b", value: "`3 3`" },
        { id: "c", value: "`1 1`" },
        { id: "d", value: "`3 1`" }],
      correctId: "a",
      explanation: "`A a = b;` מעתיקה רק את `x`, נשאר אובייקט `A` שבו `get` מחזירה `x`, כלומר 1. ההפניה `r` קשורה ל-`b` עצמו, ולכן `B::get` מחזירה `1 + 2 = 3`.",
      recap: "חיתוך מאבד גם שדות וגם דריסות" },
    { id: "C03-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A\"; } };\nstruct B : A { void f() { cout << \"B\"; } };\nA make() {\n    B b;\n    return b;\n}\nint main() {\n    A a = make();\n    a.f();\n}\n```",
      options: [
        { id: "a", value: "`A`" },
        { id: "b", value: "`B`" },
        { id: "c", value: "`AB`" },
        { id: "d", value: "`BA`" }],
      correctId: "a",
      explanation: "הפונקציה מחזירה `A` בערך, ולכן `return b;` חותך את `b` לאובייקט `A`. לאובייקט בערך אין טיפוס אמיתי אחר, ולכן `a.f()` היא `A::f`.",
      recap: "גם החזרה בערך חותכת" },
    { id: "C03-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A a;\n    a = b;\n    A* p = &a;\n    p->f();\n    p = &b;\n    p->f();\n}\n```",
      options: [
        { id: "a", value: "`A B`" },
        { id: "b", value: "`B B`" },
        { id: "c", value: "`A A`" },
        { id: "d", value: "`B A`" }],
      correctId: "a",
      explanation: "ההשמה `a = b;` מעתיקה רק את חלק האב, ו-`a` נשאר אובייקט `A` לכל דבר, ולכן `p->f()` הראשונה היא `A`. לאחר מכן `p` מצביע על `b` עצמו, ולכן `B`.",
      recap: "השמה לאובייקט מטיפוס האב חותכת" },
  ],
});
