/* Virtual functions and polymorphism course (virtual), level 6: C06 */
COURSE_LEVEL("virtual", {
  id: "C06", order: 6, icon: "🔧", title: "שם מלא ומגבלות",
  goal: "להפעיל גרסה מסוימת בשם מלא ולדעת מה אפשר להפוך לוירטואלי.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p><b>שם מלא</b> (<code>p->Base::f()</code>) מבטל את הבחירה בזמן ריצה ומפעיל את הגרסה של המחלקה הנקובה. אפשר לנקוב בכל מחלקה בשרשרת הירושה של האובייקט.</p>
<p><b>מה אי אפשר להפוך לוירטואלי?</b> <b>בנאי</b>: אסור (בזמן הבנייה אין עדיין אובייקט עם טיפוס אמיתי). הורס, פונקציה <code>const</code>, פונקציה שמחזירה <code>void</code> ושאר פונקציות חבר רגילות: מותר.</p>
<p><b>איך זה עובד:</b> למחלקה עם פונקציה וירטואלית יש <b>טבלה וירטואלית</b> (vtable) עם כתובות הגרסאות, ולכל אובייקט שלה מצביע נסתר אליה. קריאה וירטואלית היא חיפוש בטבלה של האובייקט, ולכן היא תלויה באובייקט ולא בטיפוס המצביע.</p>
<div class="lesson-rule">🔑 <b>פונקציה לא וירטואלית שקוראת לוירטואלית</b> (דרך <code>this</code>) מפעילה את הגרסה של האובייקט האמיתי, אבל על אובייקט חתוך האובייקט האמיתי הוא כבר רק האב.</div>
<div class="lesson-ex"><pre>struct A { virtual void f() { cout &lt;&lt; "A "; } };
struct B : A { void f() { cout &lt;&lt; "B "; } };
A* p = new B;
p-&gt;f();       // B
p-&gt;A::f();    // A  (qualified name: no dispatch)</pre></div>
` },
  questions: [
    { id: "C06-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    A* p = new B;\n    p->f();\n    p->A::f();\n}\n```",
      options: [
        { id: "a", value: "`B A`" },
        { id: "b", value: "`A B`" },
        { id: "c", value: "`B B`" },
        { id: "d", value: "`A A`" }],
      correctId: "a",
      explanation: "`p->f()` וירטואלית ומגיעה ל-`B`. `p->A::f()` עם שם מלא מדלגת על הטבלה ומפעילה ישירות את `A::f`. `B B` מתעלמת מהשם המלא.",
      recap: "שם מלא Base:: מבטל וירטואליות" },
    { id: "C06-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct X { virtual void f() { cout << \"1 \"; } };\nstruct Y : X { void f() { cout << \"2 \"; } };\nstruct Z : Y { void f() { cout << \"3 \"; } };\nint main() {\n    Z* p = new Z;\n    p->X::f();\n    p->Y::f();\n    p->f();\n}\n```",
      options: [
        { id: "a", value: "`1 2 3`" },
        { id: "b", value: "`3 3 3`" },
        { id: "c", value: "`3 2 1`" },
        { id: "d", value: "`1 1 3`" }],
      correctId: "a",
      explanation: "השמות המלאים בוחרים בדיוק את הגרסה הנקובה, בלי תלות בטיפוס האובייקט: `X::f` מדפיסה 1, `Y::f` מדפיסה 2, והקריאה הרגילה מגיעה ל-`Z::f`, כלומר 3. הסדר לפי סדר השורות.",
      recap: "אפשר לנקוב בכל מחלקה בשרשרת" },
    { id: "C06-Q3", question: "איזו מהפונקציות הבאות **אי אפשר** להגדיר כוירטואלית?",
      options: [
        { id: "a", value: "בנאי" },
        { id: "b", value: "הורס" },
        { id: "c", value: "פונקציה חבר `const`" },
        { id: "d", value: "פונקציה חבר שמחזירה `void`" }],
      correctId: "a",
      explanation: "בנאי לא יכול להיות וירטואלי: בעת הבנייה עוד אין אובייקט עם טיפוס אמיתי שאפשר לחפש בטבלה שלו. הורס כן יכול ואף מומלץ, ופונקציה `const` או `void` יכולה להיות וירטואלית כרגיל.",
      recap: "בנאי אינו וירטואלי" },
    { id: "C06-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct Shape {\n    virtual int area() { return 0; }\n    int twice() { return 2 * area(); }\n};\nstruct Sq : Shape {\n    int s;\n    Sq(int s) : s(s) {}\n    int area() { return s * s; }\n};\nint main() {\n    Shape* p = new Sq(3);\n    cout << p->area() << \" \" << p->twice() << \" \";\n    Shape sh = *p;\n    cout << sh.twice();\n}\n```",
      options: [
        { id: "a", value: "`9 18 0`" },
        { id: "b", value: "`9 18 18`" },
        { id: "c", value: "`0 0 0`" },
        { id: "d", value: "`9 9 0`" }],
      correctId: "a",
      explanation: "`p->area()` מגיעה ל-`Sq::area` ונותנת 9. `twice` אינה וירטואלית, אבל `area()` שבתוכה כן, ולכן 18. `Shape sh = *p;` חותכת ל-`Shape` טהורה, ושם `area()` מחזירה 0 ו-`twice()` היא 0. `9 18 18` שוכחת את החיתוך.",
      recap: "וירטואלי דרך this תלוי באובייקט, וחיתוך משנה אותו" },
    { id: "C06-Q5", question: "במצביע `Shape* s;` ובפונקציה `draw`, מתי הקריאה `s->draw()` עשויה להפעיל גרסאות שונות בריצות שונות של אותה שורה?",
      options: [
        { id: "a", value: "כש-`draw` וירטואלית ב-`Shape`, ו-`s` יכול להצביע על אובייקטים מנגזרות שונות" },
        { id: "b", value: "כשיש ל-`draw` ערך ברירת מחדל" },
        { id: "c", value: "כש-`draw` מוגדרת `const`" },
        { id: "d", value: "כש-`draw` אינה וירטואלית ויש יותר מנגזרת אחת" }],
      correctId: "a",
      explanation: "בחירה בזמן ריצה קורית רק כשיש גם וירטואליות באב וגם אובייקטים בפועל שונים. ערך ברירת מחדל ו-`const` לא משנים את הבחירה, ופונקציה לא וירטואלית תמיד נקבעת לפי `Shape`, לא משנה כמה נגזרות יש.",
      recap: "וירטואלית + אובייקטים בפועל שונים" },
  ],
});
