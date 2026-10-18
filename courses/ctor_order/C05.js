/* Construction order course (ctor_order), level 5: C05 */
COURSE_LEVEL("ctor_order", {
  id: "C05", order: 5, icon: "⏱️", title: "זמניים, מערכים ו-new",
  goal: "לדעת מתי נהרס אובייקט זמני, באיזה סדר נבנה ונהרס מערך, ומה עושים new ו-delete.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>לא כל אובייקט מקבל שם. כמה מקרים נוספים:</p>
<ul>
<li><b>אובייקט זמני</b> (<code>T(8);</code> או ארגומנט <code>f(T(3))</code>): נהרס בסוף ה<b>ביטוי</b> שבו נוצר, כלומר בנקודה-פסיק.</li>
<li><b>הפניה <code>const T&amp; r = T(9);</code></b> מאריכה את חיי הזמני עד סוף הבלוק של <code>r</code>.</li>
<li><b>מערך</b> <code>T arr[3]</code>: האיברים נבנים לפי האינדקס (0, 1, 2) ונהרסים בסדר ההפוך.</li>
<li><b><code>new</code></b> בונה אובייקט שחי עד שקוראים ל-<code>delete</code>. <b>בלי <code>delete</code> ההורס לא רץ בכלל</b>, גם לא בסוף התכנית.</li>
<li><code>new T[2]</code> נהרס ב-<code>delete[]</code>, באותו סדר הפוך של מערך.</li>
</ul>
<div class="lesson-rule">🔑 <b>זמני = עד הנקודה-פסיק. const&amp; מאריכה. new = עד delete.</b></div>
<div class="lesson-ex">
<pre>struct T {
    int n;
    T(int n) : n(n) { cout &lt;&lt; "+" &lt;&lt; n &lt;&lt; " "; }
    ~T() { cout &lt;&lt; "-" &lt;&lt; n &lt;&lt; " "; }
};
int main() {
    T(1);                    // +1 -1
    const T&amp; r = T(2);       // +2 (stays alive)
    cout &lt;&lt; "x ";
}                            // x -2</pre>
הפלט: <code>+1 -1 +2 x -2</code>.</div>
<div class="lesson-trap">⚠️ אובייקט שנוצר ב-<code>new</code> ולא נמחק לא מדפיס הורס בסוף התכנית. זה דליפת זיכרון, והתכנית עדיין חוקית.</div>
` },
  questions: [
    { id: "C05-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    cout << \"a \";\n    T(1);\n    cout << \"b \";\n}\n```",
      options: [
        { id: "a", value: "`a +1 -1 b`" },
        { id: "b", value: "`a +1 b -1`" },
        { id: "c", value: "`a b +1 -1`" },
        { id: "d", value: "`+1 a b -1`" }],
      correctId: "a",
      explanation: "`T(1);` יוצר אובייקט זמני ללא שם. הוא נהרס בסוף הביטוי, כלומר מיד בנקודה-פסיק, לפני `cout << \"b \"`. לכן `+1 -1` מופיעים ביחד.",
      recap: "זמני נהרס בסוף הביטוי שבו נוצר" },
    { id: "C05-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    const T& r = T(2);\n    cout << \"mid \";\n    T(3);\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`+2 mid +3 -3 end -2`" },
        { id: "b", value: "`+2 -2 mid +3 -3 end`" },
        { id: "c", value: "`+2 mid +3 end -3 -2`" },
        { id: "d", value: "`+2 mid +3 -3 -2 end`" }],
      correctId: "a",
      explanation: "הפניית `const` שמאותחלת מזמני מאריכה את חיי הזמני: `T(2)` נשאר חי עד סוף `main`. לעומת זאת `T(3);` ללא הפניה נהרס מיד. לכן `-3` מופיע לפני `end`, ו-`-2` אחריו.",
      recap: "const& לזמני מאריכה את חייו עד סוף הבלוק" },
    { id: "C05-Q3", question: "מה מדפיסה התכנית?\n```cpp\nint counter = 0;\nstruct U {\n    int id;\n    U() : id(++counter) { cout << \"U\" << id << \" \"; }\n    ~U() { cout << \"~U\" << id << \" \"; }\n};\nint main() {\n    U arr[3];\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`U1 U2 U3 end ~U3 ~U2 ~U1`" },
        { id: "b", value: "`U3 U2 U1 end ~U1 ~U2 ~U3`" },
        { id: "c", value: "`U1 U2 U3 end ~U1 ~U2 ~U3`" },
        { id: "d", value: "`U1 end U2 end U3 end ~U3 ~U2 ~U1`" }],
      correctId: "a",
      explanation: "איברי מערך נבנים לפי האינדקס, ולכן המספרים 1, 2, 3 לפי הסדר. הם נהרסים בסדר ההפוך, מהאיבר האחרון לראשון. כמו תמיד, ההריסה היא הפוכה לבנייה.",
      recap: "מערך: בונים 0..n-1, הורסים n-1..0" },
    { id: "C05-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    T* p = new T(5);\n    cout << \"x \";\n    delete p;\n    cout << \"y \";\n}\n```",
      options: [
        { id: "a", value: "`+5 x -5 y`" },
        { id: "b", value: "`+5 x y -5`" },
        { id: "c", value: "`x +5 -5 y`" },
        { id: "d", value: "`+5 x y`" }],
      correctId: "a",
      explanation: "`new T(5)` מפעיל את הבנאי מיד (`+5`). ההורס רץ רק בשורת `delete p;`, לפני `y`. התשובה `+5 x y -5` מניחה שההורס רץ בסוף הבלוק כמו אצל מקומי.",
      recap: "אובייקט של new נהרס ב-delete בלבד" },
    { id: "C05-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    T a(1);\n    T* p = new T(2);\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`+1 +2 end -1`" },
        { id: "b", value: "`+1 +2 end -2 -1`" },
        { id: "c", value: "`+1 +2 end -1 -2`" },
        { id: "d", value: "`+1 +2 end`" }],
      correctId: "a",
      explanation: "`a` מקומי ונהרס בסוף `main`. האובייקט ש-`p` מצביע אליו נוצר ב-`new` ואין `delete`, ולכן הורס שלו לא רץ בכלל (דליפת זיכרון). לא בסוף הבלוק ולא בסוף התכנית.",
      recap: "בלי delete ההורס של אובייקט new לא רץ" },
    { id: "C05-Q6", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nvoid f(const T& t) { cout << \"in \"; }\nint main() {\n    f(T(3));\n    cout << \"after \";\n}\n```",
      options: [
        { id: "a", value: "`+3 in -3 after`" },
        { id: "b", value: "`+3 in after -3`" },
        { id: "c", value: "`in +3 -3 after`" },
        { id: "d", value: "`+3 -3 in after`" }],
      correctId: "a",
      explanation: "הזמני `T(3)` נוצר לפני הקריאה ועובר בהפניה. הוא נהרס בסוף הביטוי המלא `f(T(3));`, כלומר אחרי ש-`f` חזרה ולפני `after`. לכן הוא עדיין חי בזמן `in`.",
      recap: "זמני כארגומנט חי עד סוף הביטוי המלא" },
    { id: "C05-Q7", question: "מה מדפיסה התכנית?\n```cpp\nint counter = 0;\nstruct U {\n    int id;\n    U() : id(++counter) { cout << \"U\" << id << \" \"; }\n    ~U() { cout << \"~U\" << id << \" \"; }\n};\nint main() {\n    U* p = new U[2];\n    cout << \"mid \";\n    delete[] p;\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`U1 U2 mid ~U2 ~U1 end`" },
        { id: "b", value: "`U1 U2 mid ~U1 ~U2 end`" },
        { id: "c", value: "`U1 U2 mid end`" },
        { id: "d", value: "`mid U1 U2 ~U2 ~U1 end`" }],
      correctId: "a",
      explanation: "`new U[2]` בונה את שני האיברים מיד, לפי האינדקס. `delete[]` הורס אותם בסדר הפוך. התשובה `U1 U2 mid end` מתעלמת מה-`delete[]`.",
      recap: "delete[] הורס מערך בסדר הפוך" },
  ],
});
