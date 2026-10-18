/* Construction order course (ctor_order), level 2: C02 */
COURSE_LEVEL("ctor_order", {
  id: "C02", order: 2, icon: "🧩", title: "שדות שהם אובייקטים",
  goal: "לקבוע את סדר הבנייה וההריסה כשבמחלקה יש גם אב וגם שדות שהם אובייקטים.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>מחלקה יכולה להכיל שדות שהם עצמם אובייקטים (<code>M m;</code>). גם הם צריכים להיבנות לפני שגוף הבנאי מתחיל לרוץ, כדי שהגוף יוכל להשתמש בהם.</p>
<table>
<thead><tr><th>שלב</th><th>בנייה</th></tr></thead>
<tbody>
<tr><td>1</td><td>מחלקות האב</td></tr>
<tr><td>2</td><td>השדות, <b>לפי סדר ההצהרה</b> במחלקה</td></tr>
<tr><td>3</td><td>גוף הבנאי</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>אבות, שדות, גוף.</b> ההריסה הפוכה: גוף ההורס, אחריו השדות מהאחרון לראשון, ולבסוף האבות.</div>
<div class="lesson-ex">
<pre>struct M1 { M1() { cout &lt;&lt; "M1 "; }  ~M1() { cout &lt;&lt; "~M1 "; } };
struct M2 { M2() { cout &lt;&lt; "M2 "; }  ~M2() { cout &lt;&lt; "~M2 "; } };
struct B  { B()  { cout &lt;&lt; "B ";  }  ~B()  { cout &lt;&lt; "~B ";  } };
struct D : B {
    M1 a;
    M2 b;
    D()  { cout &lt;&lt; "D ";  }
    ~D() { cout &lt;&lt; "~D "; }
};
int main() { D d; }</pre>
הפלט: <code>B M1 M2 D ~D ~M2 ~M1 ~B</code>.</div>
<div class="lesson-trap">⚠️ שדה שמחלקתו אין לה בנאי ברירת מחדל חייב להופיע ברשימת האתחול של הבנאי עם הארגומנטים שלו. אחרת זו שגיאת קומפילציה.</div>
` },
  questions: [
    { id: "C02-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct M1 { M1() { cout << \"M1 \"; }  ~M1() { cout << \"~M1 \"; } };\nstruct M2 { M2() { cout << \"M2 \"; }  ~M2() { cout << \"~M2 \"; } };\nstruct D {\n    M1 a;\n    M2 b;\n    D()  { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "`M1 M2 D ~D ~M2 ~M1`" },
        { id: "b", value: "`D M1 M2 ~M2 ~M1 ~D`" },
        { id: "c", value: "`M1 M2 D ~D ~M1 ~M2`" },
        { id: "d", value: "`M2 M1 D ~D ~M1 ~M2`" }],
      correctId: "a",
      explanation: "השדות נבנים לפי סדר ההצהרה (`a` ואז `b`) לפני גוף הבנאי, ולכן `M1 M2 D`. ההריסה הפוכה: גוף ההורס `~D`, ואז `b` ואז `a`. התשובה `D M1 M2 ...` מניחה שהגוף רץ ראשון. `M1 M2 D ~D ~M1 ~M2` הורסת את השדות באותו סדר שבנתה.",
      recap: "שדות נבנים לפני הגוף, ונהרסים אחריו בסדר הפוך" },
    { id: "C02-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct B { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nstruct M { M() { cout << \"M \"; }  ~M() { cout << \"~M \"; } };\nstruct D : B {\n    M m;\n    D()  { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "`B M D ~D ~M ~B`" },
        { id: "b", value: "`M B D ~D ~B ~M`" },
        { id: "c", value: "`B D M ~M ~D ~B`" },
        { id: "d", value: "`B M D ~D ~B ~M`" }],
      correctId: "a",
      explanation: "האב נבנה ראשון, אחריו השדה, ולבסוף גוף הבנאי של `D`: `B M D`. ההריסה היא ההפוכה: `~D`, אחריו השדה `~M`, ולבסוף האב `~B`. בתשובה `M B D` השדה נבנה לפני האב, ובתשובה `B D M ...` השדה נבנה אחרי גוף הבנאי.",
      recap: "אבות, שדות, גוף. ובהריסה: גוף, שדות, אבות" },
    { id: "C02-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nstruct C {\n    B b;\n    C()  { cout << \"C \"; }\n    ~C() { cout << \"~C \"; }\n};\nint main() {\n    C c;\n}\n```",
      options: [
        { id: "a", value: "`A B C ~C ~B ~A`" },
        { id: "b", value: "`C A B ~B ~A ~C`" },
        { id: "c", value: "`B A C ~C ~A ~B`" },
        { id: "d", value: "`A B C ~A ~B ~C`" }],
      correctId: "a",
      explanation: "כדי לבנות את `C` צריך קודם לבנות את השדה `b`, וכדי לבנות את `b` צריך קודם את האב שלו `A`. לכן `A B` ואז גוף `C`. ההריסה הפוכה: `~C`, אחר כך `~B` של השדה, ואז `~A`.",
      recap: "האובייקט השדה נבנה בשלמותו (כולל האב שלו) לפני גוף הבנאי" },
    { id: "C02-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct P { P() { cout << \"P \"; }  ~P() { cout << \"~P \"; } };\nstruct Q { Q() { cout << \"Q \"; }  ~Q() { cout << \"~Q \"; } };\nstruct D {\n    P p;\n    D()  { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    Q q;\n    D d;\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`Q P D end ~D ~P ~Q`" },
        { id: "b", value: "`P D Q end ~Q ~D ~P`" },
        { id: "c", value: "`Q P D end ~Q ~D ~P`" },
        { id: "d", value: "`Q D P end ~P ~D ~Q`" }],
      correctId: "a",
      explanation: "`Q q;` נבנה ראשון. אחריו `D d;` בונה קודם את השדה `p` ורק אז את הגוף, ולכן `P D`. בסוף `main` הנהרס ראשון הוא האחרון שנבנה: `d` כ-`~D ~P`, ואחריו `q`.",
      recap: "גם בתוך אובייקט וגם בין אובייקטים: ההריסה הפוכה לבנייה" },
    { id: "C02-Q5", question: "מה קורה בהידור של התכנית הבאה?\n```cpp\nstruct M {\n    M(int n) { cout << \"M \"; }\n};\nstruct D {\n    M m;\n    D() { cout << \"D \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "שגיאת קומפילציה: אין ל-`M` בנאי ברירת מחדל, והשדה `m` לא מאותחל ברשימת האתחול" },
        { id: "b", value: "מודפס `D`, כי `m` נשאר לא מאותחל" },
        { id: "c", value: "מודפס `M D`, כי `n` מקבל 0" },
        { id: "d", value: "מודפס `D M`, כי השדה נבנה אחרי הגוף" }],
      correctId: "a",
      explanation: "כל שדה נבנה לפני הגוף, ולכן חייבים לבחור לו בנאי. ל-`M` יש רק `M(int)`, ולכן חובה לכתוב `D() : m(5) { ... }`. בלי זה אין בנאי מתאים והקוד לא מתקמפל.",
      recap: "שדה בלי בנאי ברירת מחדל חייב להופיע ברשימת האתחול" },
  ],
});
