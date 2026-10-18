/* Construction order course (ctor_order), level 4: C04 */
COURSE_LEVEL("ctor_order", {
  id: "C04", order: 4, icon: "🌍", title: "גלובליים, מקומיים וסטטיים",
  goal: "לסדר בזמן את הבנייה וההריסה של משתנים גלובליים, מקומיים וסטטיים מקומיים.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>עד עכשיו כל האובייקטים היו מקומיים ב-<code>main</code>. בתכנית אמיתית יש שלושה סוגי משתנים, ולכל אחד זמן חיים משלו:</p>
<table>
<thead><tr><th>סוג</th><th>נבנה</th><th>נהרס</th></tr></thead>
<tbody>
<tr><td>גלובלי</td><td>לפני <code>main</code>, לפי סדר ההגדרה בקובץ</td><td>אחרי <code>main</code>, בסוף התכנית</td></tr>
<tr><td>מקומי</td><td>כשהביצוע מגיע לשורה</td><td>בסוף הבלוק, בסדר הפוך</td></tr>
<tr><td>סטטי מקומי</td><td><b>פעם אחת</b>, בפעם הראשונה שהביצוע מגיע לשורה</td><td>בסוף התכנית</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 בסוף התכנית הגלובליים והסטטיים נהרסים <b>בסדר הפוך לסדר שבו הסתיימה בנייתם</b>. הראשון שנבנה הוא האחרון שנהרס.</div>
<div class="lesson-ex">
<pre>struct T {
    int n;
    T(int n) : n(n) { cout &lt;&lt; "+" &lt;&lt; n &lt;&lt; " "; }
    ~T() { cout &lt;&lt; "-" &lt;&lt; n &lt;&lt; " "; }
};
T g(1);
int main() {
    T a(2);
    static T s(3);
}</pre>
הפלט: <code>+1 +2 +3 -2 -3 -1</code>. הגלובלי נבנה לפני <code>main</code>. בסוף <code>main</code> נהרס המקומי <code>a</code>, ורק אחרי <code>main</code> נהרסים הסטטי ואחריו הגלובלי.</div>
<div class="lesson-trap">⚠️ סטטי מקומי בפונקציה שלא נקראה אף פעם לא נבנה בכלל, ולכן גם לא נהרס. בקריאה שנייה לאותה פונקציה הוא לא נבנה שוב.</div>
` },
  questions: [
    { id: "C04-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nT g(1);\nint main() {\n    cout << \"main \";\n    T l(2);\n}\n```",
      options: [
        { id: "a", value: "`+1 main +2 -2 -1`" },
        { id: "b", value: "`main +1 +2 -2 -1`" },
        { id: "c", value: "`+1 main +2 -1 -2`" },
        { id: "d", value: "`main +2 -2 +1 -1`" }],
      correctId: "a",
      explanation: "הגלובלי `g` נבנה לפני שהביצוע נכנס ל-`main`, ולכן `+1` הוא הראשון. אחרי `main` מודפס `+2` למקומי. בסוף `main` המקומי נהרס (`-2`) ורק אחרי שהפונקציה חוזרת נהרס הגלובלי (`-1`).",
      recap: "גלובליים נבנים לפני main ונהרסים אחרי main" },
    { id: "C04-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nT g1(1);\nT g2(2);\nint main() {\n    T l(3);\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`+1 +2 +3 end -3 -2 -1`" },
        { id: "b", value: "`+1 +2 +3 end -3 -1 -2`" },
        { id: "c", value: "`+3 +1 +2 end -2 -1 -3`" },
        { id: "d", value: "`+2 +1 +3 end -3 -1 -2`" }],
      correctId: "a",
      explanation: "הגלובליים נבנים בסדר ההגדרה בקובץ (`g1` ואז `g2`), ואחריהם המקומי. ההריסה: המקומי ראשון, ואז הגלובליים בסדר הפוך לבנייה, כלומר `g2` לפני `g1`.",
      recap: "גלובליים: נבנים בסדר הקובץ, נהרסים בסדר הפוך" },
    { id: "C04-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    T a(1);\n    static T s(2);\n    T b(3);\n}\n```",
      options: [
        { id: "a", value: "`+1 +2 +3 -3 -1 -2`" },
        { id: "b", value: "`+1 +2 +3 -3 -2 -1`" },
        { id: "c", value: "`+2 +1 +3 -3 -1 -2`" },
        { id: "d", value: "`+1 +2 +3 -2 -3 -1`" }],
      correctId: "a",
      explanation: "הסטטי נבנה כשהביצוע מגיע לשורתו, בין `a` ל-`b`. בסוף `main` נהרסים המקומיים בסדר הפוך (`b` ואז `a`), והסטטי נשאר בחיים עד סוף התכנית ונהרס אחרון: `-3 -1 -2`.",
      recap: "סטטי מקומי נבנה כשמגיעים אליו ונהרס רק בסוף התכנית" },
    { id: "C04-Q4", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nvoid f() {\n    T a(5);\n    static T s(6);\n}\nint main() {\n    f();\n    f();\n    cout << \"end \";\n}\n```",
      options: [
        { id: "a", value: "`+5 +6 -5 +5 -5 end -6`" },
        { id: "b", value: "`+5 +6 -5 -6 +5 +6 -5 -6 end`" },
        { id: "c", value: "`+5 +6 -5 +5 +6 -5 end -6 -6`" },
        { id: "d", value: "`+5 +6 -6 -5 +5 -5 end`" }],
      correctId: "a",
      explanation: "בקריאה הראשונה נבנים `a` ואז הסטטי `s`, ובסוף הפונקציה נהרס רק `a`. בקריאה השנייה הסטטי כבר קיים ולא נבנה שוב, ולכן רק `+5 -5`. הסטטי נהרס בסוף התכנית, אחרי `end`.",
      recap: "סטטי מקומי נבנה פעם אחת בלבד" },
    { id: "C04-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nvoid f() {\n    static T s(9);\n}\nT g(1);\nint main() {\n    T l(2);\n}\n```",
      options: [
        { id: "a", value: "`+1 +2 -2 -1`" },
        { id: "b", value: "`+9 +1 +2 -2 -1 -9`" },
        { id: "c", value: "`+1 +2 +9 -2 -9 -1`" },
        { id: "d", value: "`+1 +2 -2 -1 -9`" }],
      correctId: "a",
      explanation: "`f` לא נקראת אף פעם, ולכן הביצוע לא מגיע לשורת הסטטי `s` והוא לא נבנה ולא נהרס. נשארים הגלובלי והמקומי בלבד.",
      recap: "סטטי מקומי שלא הגיעו אליו לא קיים" },
    { id: "C04-Q6", question: "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nT g(1);\nvoid f() {\n    static T s(2);\n    T l(3);\n}\nint main() {\n    T a(4);\n    f();\n    static T b(5);\n}\n```",
      options: [
        { id: "a", value: "`+1 +4 +2 +3 -3 +5 -4 -5 -2 -1`" },
        { id: "b", value: "`+1 +4 +2 +3 -3 +5 -4 -1 -2 -5`" },
        { id: "c", value: "`+1 +4 +2 +3 -3 +5 -5 -4 -2 -1`" },
        { id: "d", value: "`+4 +2 +3 -3 +5 -4 +1 -1 -2 -5`" }],
      correctId: "a",
      explanation: "קודם הגלובלי `+1`. ב-`main`: `+4`, קריאה ל-`f` בונה את הסטטי `+2` ואת המקומי `+3` ומשחררת את המקומי `-3`, ואז `+5` הסטטי של `main`. בסוף `main` נהרס `a` (`-4`). אחרי `main` נהרסים הסטטיים והגלובלי בסדר הפוך לסיום בנייתם: `b` (5), אחריו `s` (2) ואז `g` (1).",
      recap: "ההריסה בסוף התכנית: הפוך לסדר שבו הסתיימה הבנייה" },
  ],
});
