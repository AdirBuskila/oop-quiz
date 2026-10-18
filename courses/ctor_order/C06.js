/* Construction order course (ctor_order), level 6: C06 */
COURSE_LEVEL("ctor_order", {
  id: "C06", order: 6, icon: "🔔", title: "הורס וירטואלי וקריאות בתוך בנאי",
  goal: "לדעת מתי delete דרך מצביע לאב הורס את כל האובייקט, ואיזו גרסה של פונקציה וירטואלית נקראת בתוך בנאי והורס.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p><b>מצביע לאב יכול להצביע על נגזרת:</b> <code>B* p = new D;</code>. הבנייה תמיד מלאה (<code>B</code> ואז <code>D</code>). השאלה היא מה קורה ב-<code>delete p</code>.</p>
<ul>
<li>אם ההורס של <code>B</code> הוא <b><code>virtual</code></b>, נבחר ההורס של הסוג האמיתי. נהרס כל האובייקט: קודם <code>D</code> ואז <code>B</code>.</li>
<li>אם ההורס של <code>B</code> <b>לא</b> וירטואלי, <code>delete</code> דרך <code>B*</code> על אובייקט <code>D</code> הוא <b>התנהגות לא מוגדרת</b>. לכן תמיד מגדירים הורס וירטואלי במחלקה שמיועדת לשמש כאב.</li>
</ul>
<div class="lesson-rule">🔑 <b>מחלקת אב עם פונקציות וירטואליות צריכה הורס וירטואלי.</b> בנאי אי אפשר להפוך לוירטואלי, ואין צורך.</div>
<h3>קריאה וירטואלית בתוך בנאי או הורס</h3>
<p>בזמן שהבנאי של <code>B</code> רץ, החלק של <code>D</code> עוד לא נבנה. לכן קריאה לפונקציה וירטואלית בתוך הבנאי (או ההורס) של <code>B</code> מפעילה את הגרסה של <code>B</code>, גם אם האובייקט בפועל הוא <code>D</code>.</p>
<div class="lesson-ex">
<pre>struct B {
    B() { f(); }
    virtual void f() { cout &lt;&lt; "B::f "; }
    virtual ~B() {}
};
struct D : B {
    void f() { cout &lt;&lt; "D::f "; }
};
int main() { D d; d.f(); }</pre>
הפלט: <code>B::f D::f</code>. בתוך הבנאי של <code>B</code> נבחרת הגרסה של <code>B</code>; רק אחרי שהבנייה הושלמה <code>d.f()</code> מגיעה ל-<code>D</code>.</div>
<div class="lesson-trap">⚠️ אם ההורס של האב לא וירטואלי אי אפשר לשאול "מה יודפס", כי התנהגות לא מוגדרת אין לה תוצאה. כשמופיעה במבחן שאלה כזו, התשובה היא לא להסתמך עליה.</div>
` },
  questions: [
    { id: "C06-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct D : B {\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      options: [
        { id: "a", value: "`B D ~D ~B`" },
        { id: "b", value: "`B D ~B`" },
        { id: "c", value: "`D B ~B ~D`" },
        { id: "d", value: "`B D ~B ~D`" }],
      correctId: "a",
      explanation: "הבנייה מלאה: `B` ואז `D`. ההורס של `B` וירטואלי, ולכן `delete p` מפעיל את ההורס של הסוג האמיתי `D`, ואחריו כרגיל ההורס של האב: `~D ~B`. בתשובה `B D ~B` ההורס של `D` מדולג, וזה מה שקורה בלי `virtual`.",
      recap: "הורס וירטואלי: delete דרך אב הורס נגזרת ואז אב" },
    { id: "C06-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct M {\n    M() { cout << \"M \"; }\n    ~M() { cout << \"~M \"; }\n};\nstruct D : B {\n    M m;\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      options: [
        { id: "a", value: "`B M D ~D ~M ~B`" },
        { id: "b", value: "`B M D ~B`" },
        { id: "c", value: "`B M D ~D ~B ~M`" },
        { id: "d", value: "`B D M ~M ~D ~B`" }],
      correctId: "a",
      explanation: "ההורס של `D` מופעל בגלל ה-`virtual`, והוא הורס את כל החלק של `D` כרגיל: קודם הגוף `~D`, אחריו השדה `~M`, ולבסוף האב `~B`.",
      recap: "הורס וירטואלי מפעיל את כל השרשרת: גוף, שדות, אבות" },
    { id: "C06-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct D : B {\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* arr[2] = { new D, new B };\n    delete arr[0];\n    delete arr[1];\n}\n```",
      options: [
        { id: "a", value: "`B D B ~D ~B ~B`" },
        { id: "b", value: "`B D B ~B ~B`" },
        { id: "c", value: "`B D B ~D ~B`" },
        { id: "d", value: "`B B D ~B ~D ~B`" }],
      correctId: "a",
      explanation: "האיבר הראשון הוא `D`: בניית `B D`. השני הוא `B`: בניית `B`. ב-`delete arr[0]` נבחר ההורס של `D` ולכן `~D ~B`, וב-`delete arr[1]` רק `~B`.",
      recap: "ההורס נבחר לפי הסוג האמיתי של כל אובייקט" },
    { id: "C06-Q4", question: "ההורס של `B` לא וירטואלי, ובתכנית נכתב `B* p = new D; delete p;`. איזה שינוי תקין מבטיח שבזמן `delete p` יופעל גם ההורס של `D`?",
      options: [
        { id: "a", value: "להוסיף `virtual` להורס של `B`" },
        { id: "b", value: "להוסיף `virtual` לבנאי של `D`" },
        { id: "c", value: "למחוק את ההורס של `D`" },
        { id: "d", value: "להוסיף `virtual` לבנאי של `B`" }],
      correctId: "a",
      explanation: "רק הורס וירטואלי באב גורם ל-`delete` דרך מצביע לאב לבחור את ההורס של הסוג האמיתי. בנאי אי אפשר להצהיר כ-`virtual` (שגיאת קומפילציה), ולכן ב ו-ד אינן אפשריות. מחיקת ההורס של `D` לא משנה כלום: ההורס של `B` נשאר לא וירטואלי.",
      recap: "מוסיפים virtual להורס של האב. בנאי לא יכול להיות וירטואלי" },
    { id: "C06-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { f(); }\n    virtual void f() { cout << \"B::f \"; }\n    virtual ~B() {}\n};\nstruct D : B {\n    void f() { cout << \"D::f \"; }\n};\nint main() {\n    D d;\n    d.f();\n}\n```",
      options: [
        { id: "a", value: "`B::f D::f`" },
        { id: "b", value: "`D::f D::f`" },
        { id: "c", value: "`D::f`" },
        { id: "d", value: "`B::f B::f`" }],
      correctId: "a",
      explanation: "בזמן שהבנאי של `B` רץ, האובייקט עדיין נחשב `B` (החלק של `D` לא נבנה), ולכן הקריאה הווירטואלית בתוך הבנאי מפעילה את `B::f`. הקריאה `d.f()` אחרי הבנייה מפעילה את `D::f`.",
      recap: "בתוך בנאי קריאה וירטואלית נקראת לפי הסוג שנבנה כרגע" },
    { id: "C06-Q6", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B()  { cout << \"B() \";  whoAmI(); }\n    virtual ~B() { cout << \"~B() \"; whoAmI(); }\n    virtual void whoAmI() { cout << \"[B] \"; }\n};\nstruct D : B {\n    D()  { cout << \"D() \";  whoAmI(); }\n    ~D() { cout << \"~D() \"; whoAmI(); }\n    void whoAmI() { cout << \"[D] \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      options: [
        { id: "a", value: "`B() [B] D() [D] ~D() [D] ~B() [B]`" },
        { id: "b", value: "`B() [D] D() [D] ~D() [D] ~B() [D]`" },
        { id: "c", value: "`B() [B] D() [D] ~D() [D] ~B() [D]`" },
        { id: "d", value: "`B() [B] D() [D] ~D() [B] ~B() [B]`" }],
      correctId: "a",
      explanation: "בבנייה: בתוך `B()` הסוג הוא `B`, בתוך `D()` הסוג הוא `D`. בהריסה זה סימטרי: בזמן `~D()` האובייקט עדיין `D` ולכן `[D]`; אחרי שחלק `D` נהרס, בתוך `~B()` האובייקט נחשב `B` ונקרא `[B]`.",
      recap: "גם בהורס: הסוג הוא זה של ההורס שרץ כרגע" },
  ],
});
