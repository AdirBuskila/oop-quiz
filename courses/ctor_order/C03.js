/* Construction order course (ctor_order), level 3: C03 */
COURSE_LEVEL("ctor_order", {
  id: "C03", order: 3, icon: "📜", title: "רשימת האתחול לא קובעת סדר",
  goal: "לדעת שהסדר נקבע לפי ההצהרות ולא לפי רשימת האתחול, גם בירושה מרובה.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>ברשימת האתחול אפשר לכתוב את האבות והשדות בכל סדר שרוצים. הקומפיילר מתעלם מהסדר הזה ובונה לפי כללים קבועים:</p>
<ul>
<li><b>אבות</b> לפי הסדר ב<b>רשימת הירושה</b>: <code>D : B1, B2</code> בונה את <code>B1</code> ואז את <code>B2</code>.</li>
<li><b>שדות</b> לפי הסדר שבו הם <b>הוצהרו</b> בגוף המחלקה.</li>
</ul>
<div class="lesson-rule">🔑 <b>הסדר נקבע בהצהרה, לא באתחול.</b> רשימת האתחול קובעת רק <i>איזה בנאי</i> ואילו ארגומנטים, לא מתי.</div>
<div class="lesson-ex">
<pre>struct D : B1, B2 {        // bases: B1 then B2
    M2 m2;                 // member: m2 then m1
    M1 m1;
    D() : m1(), m2(), B2(), B1() { cout &lt;&lt; "D "; }
};</pre>
למרות שרשימת האתחול כתובה הפוך, הפלט הוא <code>B1 B2 M2 M1 D</code>. ההריסה: <code>~D ~M1 ~M2 ~B2 ~B1</code> (עם ההדפסות המתאימות).</div>
<div class="lesson-trap">⚠️ כשמאתחלים שדה בפונקציה שמדפיסה, ההדפסות יוצאות לפי סדר ההצהרה של השדות ולא לפי הסדר שבו כתבתם את הקריאות ברשימת האתחול.</div>
` },
  questions: [
    { id: "C03-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct P {\n    int id;\n    P(int i) : id(i) { cout << \"+\" << id << \" \"; }\n    ~P() { cout << \"-\" << id << \" \"; }\n};\nstruct H {\n    P x;\n    P y;\n    H() : y(2), x(1) { cout << \"H \"; }\n    ~H() { cout << \"~H \"; }\n};\nint main() {\n    H h;\n}\n```",
      options: [
        { id: "a", value: "`+1 +2 H ~H -2 -1`" },
        { id: "b", value: "`+2 +1 H ~H -1 -2`" },
        { id: "c", value: "`+2 +1 H ~H -2 -1`" },
        { id: "d", value: "`+1 +2 H ~H -1 -2`" }],
      correctId: "a",
      explanation: "`x` מוצהר לפני `y`, ולכן נבנה ראשון (`+1`) למרות שברשימת האתחול `y(2)` כתוב קודם. ההריסה הפוכה: `~H`, אחר כך `y` (`-2`) ואז `x` (`-1`). התשובות שמתחילות ב-`+2` קוראות את סדר הכתיבה ברשימה.",
      recap: "שדות נבנים לפי סדר ההצהרה" },
    { id: "C03-Q2", question: "מה מדפיסה התכנית?\n```cpp\nint tr(const char* s, int v) { cout << s << \" \"; return v; }\nstruct S {\n    int a;\n    int b;\n    S() : b(tr(\"b\", 2)), a(tr(\"a\", 1)) { cout << \"body \"; }\n};\nint main() {\n    S s;\n}\n```",
      options: [
        { id: "a", value: "`a b body`" },
        { id: "b", value: "`b a body`" },
        { id: "c", value: "`body a b`" },
        { id: "d", value: "`a body b`" }],
      correctId: "a",
      explanation: "גם שדות פשוטים מאותחלים לפי סדר ההצהרה: `a` הוצהר ראשון, ולכן הקריאה `tr(\"a\", 1)` מתבצעת ראשונה, אף שברשימה היא מופיעה שנייה. הגוף תמיד אחרי כל האתחולים.",
      recap: "גם הערכת הארגומנטים של אתחול שדה קורית לפי סדר ההצהרה" },
    { id: "C03-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct B1 { B1() { cout << \"B1 \"; }  ~B1() { cout << \"~B1 \"; } };\nstruct B2 { B2() { cout << \"B2 \"; }  ~B2() { cout << \"~B2 \"; } };\nstruct D : B2, B1 {\n    D() : B1(), B2() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "`B2 B1 D ~D ~B1 ~B2`" },
        { id: "b", value: "`B1 B2 D ~D ~B2 ~B1`" },
        { id: "c", value: "`B2 B1 D ~D ~B2 ~B1`" },
        { id: "d", value: "`B1 B2 D ~D ~B1 ~B2`" }],
      correctId: "a",
      explanation: "סדר האבות נקבע ברשימת הירושה `D : B2, B1`, לא ברשימת האתחול. לכן `B2` נבנה לפני `B1`. ההריסה הפוכה: `~D ~B1 ~B2`. התשובות שמתחילות ב-`B1` קוראות את סדר רשימת האתחול.",
      recap: "אבות נבנים לפי רשימת הירושה" },
    { id: "C03-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct Base1 { Base1() { cout << \"Base1 \"; }  ~Base1() { cout << \"~Base1 \"; } };\nstruct Base2 { Base2() { cout << \"Base2 \"; }  ~Base2() { cout << \"~Base2 \"; } };\nstruct M1 { M1() { cout << \"M1 \"; }  ~M1() { cout << \"~M1 \"; } };\nstruct M2 { M2() { cout << \"M2 \"; }  ~M2() { cout << \"~M2 \"; } };\nstruct D : Base1, Base2 {\n    M2 m2;\n    M1 m1;\n    D() : m1(), m2(), Base2(), Base1() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "`Base1 Base2 M2 M1 D ~D ~M1 ~M2 ~Base2 ~Base1`" },
        { id: "b", value: "`Base2 Base1 M1 M2 D ~D ~M2 ~M1 ~Base1 ~Base2`" },
        { id: "c", value: "`M1 M2 Base2 Base1 D ~D ~Base1 ~Base2 ~M2 ~M1`" },
        { id: "d", value: "`Base1 Base2 M1 M2 D ~D ~M2 ~M1 ~Base2 ~Base1`" }],
      correctId: "a",
      explanation: "קודם האבות לפי רשימת הירושה (`Base1`, `Base2`), אחריהם השדות לפי ההצהרה (`m2` ואז `m1`), ולבסוף הגוף. ההריסה היא ההפוכה בדיוק. התשובה `b` מציית לרשימת האתחול כולה. `c` מציבה שדות לפני אבות. `d` בונה נכון את האבות אבל את השדות לפי רשימת האתחול.",
      recap: "אבות לפי הירושה, שדות לפי ההצהרה, אחר כך גוף" },
    { id: "C03-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B()      { cout << \"B() \"; }\n    B(int n) { cout << \"B(\" << n << \") \"; }\n};\nstruct M {\n    M(int n) { cout << \"M\" << n << \" \"; }\n};\nstruct D : B {\n    M m1;\n    M m2;\n    D() : m2(2), B(9), m1(1) { cout << \"D \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "`B(9) M1 M2 D`" },
        { id: "b", value: "`M2 B(9) M1 D`" },
        { id: "c", value: "`B() M1 M2 D`" },
        { id: "d", value: "`B(9) M2 M1 D`" }],
      correctId: "a",
      explanation: "רשימת האתחול קובעת שהאב ייבנה עם הבנאי `B(int)` וש-`m1` ו-`m2` יקבלו 1 ו-2, אבל הסדר הוא קבוע: האב, אחריו `m1` ואז `m2` (סדר ההצהרה), ולבסוף הגוף. `B()` לא נקרא כי הבנאי בחר ב-`B(9)`.",
      recap: "הרשימה בוחרת בנאים וארגומנטים. הסדר קבוע מראש" },
  ],
});
