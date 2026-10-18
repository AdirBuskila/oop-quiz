/* Virtual functions and polymorphism course (virtual), level 1: C01 */
COURSE_LEVEL("virtual", {
  id: "C01", order: 1, icon: "🎯", title: "וירטואלית או לא?",
  goal: "לקבוע בכל קריאה דרך מצביע אם הבחירה לפי הטיפוס המוצהר או לפי האובייקט האמיתי.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>הקריאה <code>p->f()</code> דרך מצביע לאב יכולה להתנהג בשתי דרכים, ותלוי בשאלה אחת: <b>האם <code>f</code> מוגדרת <code>virtual</code> במחלקת האב?</b></p>
<table>
<thead><tr><th>f באב</th><th>הקריאה דרך מצביע לאב</th><th>מי נבחר</th></tr></thead>
<tbody>
<tr><td>רגילה</td><td><code>A* p = &amp;b; p->f();</code></td><td>לפי הטיפוס <b>המוצהר</b> של המצביע (<code>A</code>), נקבע בקומפילציה</td></tr>
<tr><td><code>virtual</code></td><td><code>A* p = &amp;b; p->f();</code></td><td>לפי הטיפוס <b>האמיתי</b> של האובייקט (<code>B</code>), נקבע בזמן ריצה</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>וירטואלי + מצביע (או הפניה) = הטיפוס האמיתי. כל השאר = הטיפוס המוצהר.</b> השאלה "וירטואלית?" נבדקת במחלקה של המצביע: אם <code>virtual</code> מופיעה רק במחלקה היורשת, קריאה דרך מצביע לאב עדיין לא וירטואלית.</div>
<div class="lesson-ex">נעקוב:
<pre>struct A { virtual void f() { cout &lt;&lt; "A "; }  void g() { cout &lt;&lt; "a "; } };
struct B : A { void f() { cout &lt;&lt; "B "; }  void g() { cout &lt;&lt; "b "; } };
B b;
A* p = &amp;b;
p-&gt;f();   // B  (f virtual, real type B)
p-&gt;g();   // a  (g not virtual, declared type A)</pre></div>
<div class="lesson-trap">⚠️ קריאה על אובייקט עצמו (<code>b.f()</code>) תמיד לפי הטיפוס שלו, כי אין כאן מצביע ולכן אין מה לבחור בזמן ריצה.</div>
` },
  questions: [
    { id: "C01-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    B* q = &b;\n    p->f();\n    q->f();\n    b.f();\n}\n```",
      options: [
        { id: "a", value: "`A B B`" },
        { id: "b", value: "`B B B`" },
        { id: "c", value: "`A A A`" },
        { id: "d", value: "`A A B`" }],
      correctId: "a",
      explanation: "`f` אינה וירטואלית, ולכן הקריאה נקבעת לפי הטיפוס המוצהר. `p` הוא `A*` ולכן `A::f`; `q` הוא `B*` ולכן `B::f`; ו-`b.f()` על `B`. התשובה `B B B` מניחה שהטיפוס האמיתי תמיד מנצח, וזה נכון רק לפונקציה וירטואלית. `A A A` מתעלמת מכך שהמצביע `q` ו-`b` הם מטיפוס `B`.",
      recap: "בלי virtual: הטיפוס המוצהר קובע" },
    { id: "C01-Q2", question: "עכשיו `f` מוגדרת `virtual` באב. מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    B* q = &b;\n    p->f();\n    q->f();\n    b.f();\n}\n```",
      options: [
        { id: "a", value: "`A B B`" },
        { id: "b", value: "`B B B`" },
        { id: "c", value: "`A A B`" },
        { id: "d", value: "`A A A`" }],
      correctId: "b",
      explanation: "`f` וירטואלית ו-`p` מצביע על אובייקט מטיפוס אמיתי `B`, ולכן גם הקריאה דרך `A*` מגיעה ל-`B::f`. שתי הקריאות האחרות הן ל-`B` ממילא. התשובה `A B B` היא התוצאה בלי `virtual`.",
      recap: "virtual + מצביע = הטיפוס האמיתי" },
    { id: "C01-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    virtual void f() { cout << \"Af \"; }\n    void g() { cout << \"Ag \"; }\n};\nstruct B : A {\n    void f() { cout << \"Bf \"; }\n    void g() { cout << \"Bg \"; }\n};\nint main() {\n    A a;\n    B b;\n    A* arr[2] = { &a, &b };\n    for (int i = 0; i < 2; i++) {\n        arr[i]->f();\n        arr[i]->g();\n    }\n}\n```",
      options: [
        { id: "a", value: "`Af Ag Bf Ag`" },
        { id: "b", value: "`Af Ag Bf Bg`" },
        { id: "c", value: "`Af Ag Af Ag`" },
        { id: "d", value: "`Af Bg Bf Bg`" }],
      correctId: "a",
      explanation: "בסיבוב הראשון המצביע מצביע על `A`: `Af Ag`. בסיבוב השני הוא מצביע על `B`: `f` וירטואלית ולכן `Bf`, אבל `g` אינה וירטואלית ולכן נשארת `Ag` (טיפוס מוצהר `A`). `Af Ag Bf Bg` מתייחסת לשתי הפונקציות כוירטואליות. `Af Ag Af Ag` מתעלמת מ-`virtual` לגמרי.",
      recap: "בכל פונקציה בנפרד שואלים: האם היא וירטואלית באב?" },
    { id: "C01-Q4", question: "הפעם `virtual` מופיעה רק במחלקה היורשת. מה מדפיסה התכנית?\n```cpp\nstruct A { void f() { cout << \"A \"; } };\nstruct B : A { virtual void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    B* q = &b;\n    p->f();\n    q->f();\n}\n```",
      options: [
        { id: "a", value: "`A B`" },
        { id: "b", value: "`B B`" },
        { id: "c", value: "`A A`" },
        { id: "d", value: "`B A`" }],
      correctId: "a",
      explanation: "הבחירה נעשית לפי המחלקה של המצביע. ב-`A` הפונקציה `f` אינה וירטואלית, ולכן `p->f()` נקבעת בקומפילציה ל-`A::f`. `q` הוא `B*` ולכן `B::f`. `B B` מניחה ש-`virtual` ביורשת משפיעה גם על קריאות דרך האב.",
      recap: "virtual צריכה להופיע במחלקה של המצביע (או באבותיה)" },
    { id: "C01-Q5", question: "בכל התוכניות `f` היא וירטואלית ב-`A`, ו-`B` יורשת מ-`A` ודורסת אותה. באיזו שורה הקריאה ל-`f` נבחרת לפי הטיפוס האמיתי של האובייקט בזמן ריצה?",
      options: [
        { id: "a", value: "`A* p = &b; p->f();`" },
        { id: "b", value: "`A a = b; a.f();`" },
        { id: "c", value: "`b.A::f();`" },
        { id: "d", value: "`A* p = &b; p->A::f();`" }],
      correctId: "a",
      explanation: "רק קריאה דרך מצביע (או הפניה) לאב, בלי שם מלא, מחפשת את הגרסה בטבלה הווירטואלית. `A a = b;` מעתיקה אובייקט בערך ולכן חותכת ל-`A` ו-`a.f()` היא `A::f`. שני האחרונים משתמשים בשם מלא `A::`, שמכריח את גרסת `A`.",
      recap: "מצביע/הפניה + בלי שם מלא = בחירה בזמן ריצה" },
  ],
});
