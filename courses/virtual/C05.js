/* Virtual functions and polymorphism course (virtual), level 5: C05 */
COURSE_LEVEL("virtual", {
  id: "C05", order: 5, icon: "🏗️", title: "הורסים ובנאים בהירארכיה",
  goal: "לחזות סדר בנייה והריסה, ולדעת מתי חייב הורס וירטואלי.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>שלושה כללים לגבי בנאים והורסים בהירארכיה עם פונקציות וירטואליות:</p>
<ol>
<li><b>הורס וירטואלי.</b> כשמוחקים אובייקט נגזר דרך <code>Base*</code>, חייב להיות <code>virtual ~Base()</code>. בלי זה המחיקה היא <b>התנהגות לא מוגדרת (UB)</b>: התקן לא מבטיח שום דבר, ובדרך כלל רץ רק הורס האב. עם הורס וירטואלי רצים ההורסים מהנגזרת למעלה.</li>
<li><b>סדר.</b> בנאים: אב ואז נגזרת. הורסים: נגזרת ואז אב.</li>
<li><b>בתוך בנאי או הורס</b> קריאה לפונקציה וירטואלית מפעילה את הגרסה של <b>המחלקה שנבנית עכשיו</b> (או נהרסת עכשיו), לא של הנגזרת העמוקה יותר. הסיבה: בזמן בניית האב החלק של הנגזרת עוד לא קיים (ובהריסה כבר לא).</li>
</ol>
<div class="lesson-rule">🔑 <b>מחלקה שמיועדת לשמש כאב פולימורפי מקבלת הורס וירטואלי.</b> בכל קריאה וירטואלית בבנאי/הורס שואלים "באיזה בנאי/הורס אני נמצא?".</div>
<div class="lesson-ex"><pre>struct B { B() { f(); }  virtual void f() { cout &lt;&lt; "Bf "; } };
struct D : B { D() { f(); }  void f() { cout &lt;&lt; "Df "; } };
D d;      // B() runs first, f() inside it is B::f, then D() runs: Bf Df</pre></div>
<div class="lesson-trap">⚠️ <b>בלי הורס וירטואלי אין "פלט נכון".</b> תשובה שאומרת "ירוץ רק הורס האב" מתארת מה שקורה בדרך כלל, אבל מבחינת השפה המחיקה אינה מוגדרת. אם יש אפשרות "התנהגות לא מוגדרת", זו התשובה.</div>
` },
  questions: [
    { id: "C05-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct B { virtual ~B() { cout << \"~B \"; } };\nstruct D : B { ~D() { cout << \"~D \"; } };\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      options: [
        { id: "a", value: "`~D ~B`" },
        { id: "b", value: "`~B ~D`" },
        { id: "c", value: "`~B`" },
        { id: "d", value: "`~D`" }],
      correctId: "a",
      explanation: "ההורס של `B` וירטואלי, ולכן `delete p` מפעיל קודם את ההורס של הטיפוס האמיתי `~D`, ואחריו `~B` של האב כרגיל. `~B ~D` הוא סדר הפוך מהנכון. `~B` לבד הוא מה שקורה (במקרה הטוב) בלי `virtual`.",
      recap: "הורס וירטואלי: נגזרת ואז אב" },
    { id: "C05-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct D : B {\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      options: [
        { id: "a", value: "`B D ~D ~B`" },
        { id: "b", value: "`D B ~D ~B`" },
        { id: "c", value: "`B D ~B ~D`" },
        { id: "d", value: "`B D ~B`" }],
      correctId: "a",
      explanation: "בנייה מהאב אל הנגזרת: `B D`. הריסה בסדר הפוך: `~D ~B`. ההורס הוירטואלי מבטיח ששני ההורסים רצים. `D B` הפוך בבנייה, `~B ~D` הפוך בהריסה.",
      recap: "בונים מלמעלה למטה, הורסים מלמטה למעלה" },
    { id: "C05-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { f(); }\n    virtual void f() { cout << \"Bf \"; }\n};\nstruct D : B {\n    D() { f(); }\n    void f() { cout << \"Df \"; }\n};\nint main() {\n    D d;\n}\n```",
      options: [
        { id: "a", value: "`Bf Df`" },
        { id: "b", value: "`Df Df`" },
        { id: "c", value: "`Df Bf`" },
        { id: "d", value: "`Bf Bf`" }],
      correctId: "a",
      explanation: "בזמן שהבנאי של `B` רץ, האובייקט הוא עדיין `B` בלבד (החלק של `D` לא נבנה), ולכן `f()` בתוכו היא `B::f`. אחר כך הבנאי של `D` רץ, ושם `f()` היא `D::f`. `Df Df` היא ההנחה הטבעית (והשגויה) שהוירטואליות תפעיל את הנגזרת גם בבנאי של האב.",
      recap: "וירטואלי בתוך בנאי = הגרסה של המחלקה הנבנית" },
    { id: "C05-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    virtual void f() { cout << \"Bf \"; }\n    virtual ~B() { f(); }\n};\nstruct D : B {\n    void f() { cout << \"Df \"; }\n    ~D() { f(); }\n};\nint main() {\n    {\n        D d;\n    }\n}\n```",
      options: [
        { id: "a", value: "`Df Bf`" },
        { id: "b", value: "`Df Df`" },
        { id: "c", value: "`Bf Bf`" },
        { id: "d", value: "`Bf Df`" }],
      correctId: "a",
      explanation: "קודם רץ `~D`, שבו `f()` היא `D::f` (`Df`). אחר כך החלק של `D` נהרס, והאובייקט הופך ל-`B`. `~B` קורא ל-`f()`, שמגיעה כבר ל-`B::f` (`Bf`). `Df Df` מתעלמת מכך שחלק הנגזרת כבר לא קיים.",
      recap: "בהורס האב האובייקט כבר רק B" },
    { id: "C05-Q5", question: "מחלקה `Base` ללא הורס וירטואלי, ו-`Derived` יורשת ממנה ומנהלת זיכרון. מה אומר התקן על `Base* p = new Derived; delete p;`?",
      options: [
        { id: "a", value: "התנהגות לא מוגדרת (UB)" },
        { id: "b", value: "נקרא רק ההורס של `Derived`" },
        { id: "c", value: "נקראים שני ההורסים בסדר הנכון" },
        { id: "d", value: "שגיאת קומפילציה" }],
      correctId: "a",
      explanation: "מחיקת אובייקט נגזר דרך מצביע לאב כשההורס של האב אינו וירטואלי היא התנהגות לא מוגדרת. בפועל לרוב רץ רק `~Base`, אבל זו לא הבטחה של השפה ולכן אין לענות עליה כ\"הפלט\". הקוד כן מתקמפל, והקומפיילר לא חייב אפילו להזהיר.",
      recap: "delete דרך אב בלי הורס וירטואלי = UB" },
    { id: "C05-Q6", question: "במחלקה `Shape` יש `virtual double area()`, וקוד מוחק עצמים של `Circle` דרך `Shape*`. מה צריך להוסיף כדי שהמחיקה תהיה תקינה?",
      options: [
        { id: "a", value: "`virtual ~Shape() {}` ב-`Shape`" },
        { id: "b", value: "`virtual ~Circle()` רק ב-`Circle`" },
        { id: "c", value: "`override` על `area` ב-`Circle`" },
        { id: "d", value: "בנאי וירטואלי ב-`Shape`" }],
      correctId: "a",
      explanation: "המחיקה דרך `Shape*` חייבת הורס וירטואלי ב-`Shape` עצמה. הוספת `virtual` רק ב-`Circle` לא עוזרת, כי הקומפיילר מסתכל על הטיפוס המוצהר `Shape`. `override` על `area` לא קשורה להריסה. בנאי אי אפשר להפוך לוירטואלי בכלל.",
      recap: "ההורס הוירטואלי נכתב באב" },
  ],
});
