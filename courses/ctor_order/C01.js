/* Construction order course (ctor_order), level 1: C01 */
COURSE_LEVEL("ctor_order", {
  id: "C01", order: 1, icon: "⬆️", title: "האב נבנה לפני הנגזרת",
  goal: "לכתוב בסדר הנכון את ההדפסות של בנאים והורסים במחלקה ובמחלקת האב שלה.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>כשיוצרים אובייקט ממחלקה נגזרת, הוא בנוי משני חלקים: החלק של מחלקת האב והחלק של הנגזרת. הנגזרת נשענת על האב, ולכן האב חייב להיות מוכן קודם.</p>
<table>
<thead><tr><th>שלב</th><th>בנייה</th><th>הריסה</th></tr></thead>
<tbody>
<tr><td>ראשון</td><td>בנאי של האב</td><td>הורס של הנגזרת</td></tr>
<tr><td>שני</td><td>בנאי של הנגזרת</td><td>הורס של האב</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>בונים מלמעלה למטה והורסים מלמטה למעלה.</b> סדר ההריסה הוא תמיד ההפוך המדויק של סדר הבנייה.</div>
<div class="lesson-ex">כל בנאי והורס מדפיסים את שם המחלקה:
<pre>struct A { A() { cout &lt;&lt; "A "; }  ~A() { cout &lt;&lt; "~A "; } };
struct B : A { B() { cout &lt;&lt; "B "; }  ~B() { cout &lt;&lt; "~B "; } };
int main() { B b; }</pre>
הפלט: <code>A B ~B ~A</code>. קודם הבנאי של <code>A</code> מסיים, ואז גוף הבנאי של <code>B</code> רץ. ההריסה הפוכה.</div>
<p>אם הנגזרת לא כתבה ברשימת האתחול איזה בנאי של האב לקרוא, נקרא <b>בנאי ברירת המחדל של האב</b>, גם כשבנאי הנגזרת מקבל פרמטרים. כדי לבחור בנאי אחר של האב כותבים אותו ברשימת האתחול: <code>B() : A(7) { ... }</code>.</p>
<div class="lesson-trap">⚠️ אם לאב אין בנאי ברירת מחדל והנגזרת לא קוראת במפורש לבנאי אחר שלו, התכנית לא מתקמפלת.</div>
` },
  questions: [
    { id: "C01-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nint main() {\n    B b;\n}\n```",
      options: [
        { id: "a", value: "`A B ~B ~A`" },
        { id: "b", value: "`B A ~A ~B`" },
        { id: "c", value: "`A B ~A ~B`" },
        { id: "d", value: "`B A ~B ~A`" }],
      correctId: "a",
      explanation: "האב נבנה ראשון (`A`) ואחריו הנגזרת (`B`). ההריסה הפוכה: קודם `~B` ואז `~A`. התשובה `B A ~A ~B` הופכת את שני הסדרים. `A B ~A ~B` בונה נכון אבל הורסת בסדר הבנייה עצמו. `B A ~B ~A` הופכת רק את הבנייה.",
      recap: "בנייה: אב ואז נגזרת. הריסה: נגזרת ואז אב" },
    { id: "C01-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nstruct C : B { C() { cout << \"C \"; }  ~C() { cout << \"~C \"; } };\nint main() {\n    C c;\n    cout << \"| \";\n}\n```",
      options: [
        { id: "a", value: "`A B C | ~C ~B ~A`" },
        { id: "b", value: "`C B A | ~A ~B ~C`" },
        { id: "c", value: "`A B C | ~A ~B ~C`" },
        { id: "d", value: "`C | A B ~A ~B ~C`" }],
      correctId: "a",
      explanation: "שרשרת ירושה נבנית מהשורש כלפי מטה: `A`, `B`, `C`. הפס `|` מודפס רק אחרי שהבנייה הסתיימה, ואחריו ההורסים בסדר ההפוך `~C ~B ~A`.",
      recap: "בשרשרת ירושה בונים מהשורש ומשמידים אל השורש" },
    { id: "C01-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nint main() {\n    A a;\n    B b;\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`A A B end ~B ~A ~A`" },
        { id: "b", value: "`A A B end ~A ~B ~A`" },
        { id: "c", value: "`A B end ~B ~A`" },
        { id: "d", value: "`A A B end ~A ~A ~B`" }],
      correctId: "a",
      explanation: "`A a;` מדפיס `A`. `B b;` מדפיס `A B` (האב ואז הנגזרת). בסוף `main` האובייקט האחרון שנוצר נהרס ראשון: `b` נהרס כ-`~B ~A`, ואחריו `a` נהרס כ-`~A`.",
      recap: "מקומיים נהרסים בסדר הפוך ליצירתם, וכל אחד לפי כלל אב-נגזרת" },
    { id: "C01-Q4", question: "מה מדפיסה התכנית? שימו לב לפרמטר של הבנאי של `B`.\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A {\n    B(int x) { cout << \"B\" << x << \" \"; }\n    ~B() { cout << \"~B \"; }\n};\nint main() {\n    B b(5);\n}\n```",
      options: [
        { id: "a", value: "`A B5 ~B ~A`" },
        { id: "b", value: "`B5 ~B`" },
        { id: "c", value: "`A5 B5 ~B ~A`" },
        { id: "d", value: "`B5 A ~A ~B`" }],
      correctId: "a",
      explanation: "הנגזרת לא כתבה איזה בנאי של האב לקרוא, ולכן נקרא בנאי ברירת המחדל `A()`, בלי קשר לכך שבנאי `B` מקבל פרמטר. האב לא יודע על ה-`5`. לכן `A B5` ובהריסה `~B ~A`. התשובה `B5 ~B` שוכחת שהאב נבנה תמיד.",
      recap: "בלי קריאה מפורשת נקרא בנאי ברירת המחדל של האב" },
    { id: "C01-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    A() { cout << \"A() \"; }\n    A(int n) { cout << \"A(\" << n << \") \"; }\n};\nstruct B : A {\n    B() : A(7) { cout << \"B \"; }\n    B(int n) { cout << \"B\" << n << \" \"; }\n};\nint main() {\n    B x;\n    B y(4);\n}\n```",
      options: [
        { id: "a", value: "`A(7) B A() B4`" },
        { id: "b", value: "`A(7) B A(4) B4`" },
        { id: "c", value: "`A() B A() B4`" },
        { id: "d", value: "`B A(7) B4 A()`" }],
      correctId: "a",
      explanation: "ב-`B x;` הבנאי הריק של `B` כותב `A(7)` ברשימת האתחול, ולכן נקרא `A(int)` עם 7 לפני הגוף. ב-`B y(4);` הבנאי `B(int)` לא כתב כלום, ולכן נקרא `A()` ולא `A(4)`. הפרמטר לא עובר לאב מעצמו.",
      recap: "הפרמטר של הנגזרת לא עובר לאב אלא אם כתבו זאת ברשימת האתחול" },
    { id: "C01-Q6", question: "מה קורה בהידור של התכנית הבאה?\n```cpp\nstruct A {\n    A(int n) { cout << \"A \"; }\n};\nstruct B : A {\n    B() { cout << \"B \"; }\n};\nint main() {\n    B b;\n}\n```",
      options: [
        { id: "a", value: "שגיאת קומפילציה: ל-`A` אין בנאי ברירת מחדל ו-`B` לא קוראת לבנאי אחר שלו" },
        { id: "b", value: "מודפס `A B`, כי הקומפיילר מעביר 0 לבנאי של `A`" },
        { id: "c", value: "מודפס `B`, כי `A` לא יכול להיבנות בלי פרמטר" },
        { id: "d", value: "מודפס `B A`" }],
      correctId: "a",
      explanation: "כשכותבים בנאי עם פרמטר, הקומפיילר לא יוצר בנאי ברירת מחדל ל-`A`. הבנאי של `B` לא קורא ל-`A(int)` ברשימת האתחול, ולכן נדרש `A()` שאינו קיים: זו שגיאת קומפילציה. הקומפיילר לא ממציא ערך לפרמטר.",
      recap: "לאב בלי בנאי ברירת מחדל חייבים לקרוא לבנאי שלו ברשימת האתחול" },
  ],
});
