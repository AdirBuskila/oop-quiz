/* Copy control course (copy_control), level 4: C04 */
COURSE_LEVEL("copy_control", {
  id: "C04", order: 4, icon: "🔗", title: "העתקה רדודה ומצביעים",
  goal: "לצפות מה משותף ומה עצמאי אחרי העתקת ברירת המחדל.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>אם לא כותבים בנאי העתקה והשמה, הקומפיילר מעתיק <b>שדה אחרי שדה</b> (העתקה רדודה). מה שקורה לכל שדה תלוי בטיפוס שלו:</p>
<table>
<thead><tr><th>טיפוס השדה</th><th>מה העתקת ברירת המחדל עושה</th></tr></thead>
<tbody>
<tr><td><code>int</code>, <code>double</code>, מערך <code>int a[3]</code></td><td>מעתיקה את הערכים (גם את כל איברי המערך)</td></tr>
<tr><td>אובייקט עם בנאי העתקה (<code>vector</code>, <code>string</code>)</td><td>קוראת לבנאי ההעתקה שלו, ולכן עצמאי</td></tr>
<tr><td><b>מצביע</b> <code>int* p</code></td><td>מעתיקה את <b>הכתובת</b> בלבד: שני האובייקטים מצביעים לאותו בלוק</td></tr>
</tbody></table>
<div class="lesson-rule">🔑 <b>העתקה רדודה של מצביע = שיתוף.</b> שינוי דרך אחד העותקים נראה בשני. כשיש הורס עם <code>delete</code>, שני האובייקטים ישחררו אותו בלוק, וזו שגיאה בזמן ריצה.</div>
<div class="lesson-ex">
<pre>struct S { int* p; S(int v) : p(new int(v)) {} };
S a(5);
S b = a;      // אותה כתובת בשני האובייקטים
*b.p = 9;     // *a.p הוא גם 9</pre></div>
<div class="lesson-trap">⚠️ <b>מערך כשדה</b> (<code>int arr[3]</code>) <b>כן</b> מועתק במלואו. רק מצביע לבלוק שהוקצה ב-<code>new</code> משותף.</div>
` },
  questions: [
    { id: "C04-Q1", question: "מה מדפיסה התכנית?\n```cpp\nstruct S {\n    int* p;\n    S(int v) : p(new int(v)) {}\n};\nint main() {\n    S a(5);\n    S b = a;\n    *b.p = 9;\n    cout << (a.p == b.p) << \" \" << *a.p;\n}\n```",
      options: [
        { id: "a", value: "`0 5`" },
        { id: "b", value: "`1 9`" },
        { id: "c", value: "`0 9`" },
        { id: "d", value: "`1 5`" }],
      correctId: "b",
      explanation: "אין בנאי העתקה משלנו, ולכן `b.p` מקבל את אותה כתובת ש-`a.p` מחזיק: ההשוואה נותנת 1. הכתיבה `*b.p = 9` משנה את הבלוק המשותף, ולכן גם `*a.p` הוא 9.",
      recap: "מצביע בהעתקה רדודה: אותה כתובת, אותו ערך" },
    { id: "C04-Q2", question: "מה מדפיסה התכנית?\n```cpp\nstruct S {\n    int* p;\n    S(int v) : p(new int(v)) {}\n};\nint main() {\n    S a(1), b(2);\n    a = b;\n    *b.p = 7;\n    cout << *a.p;\n}\n```",
      options: [
        { id: "a", value: "`1`" },
        { id: "b", value: "`2`" },
        { id: "c", value: "`7`" },
        { id: "d", value: "`0`" }],
      correctId: "c",
      explanation: "גם השמת ברירת המחדל מעתיקה שדה שדה. אחרי `a = b` ‏`a.p` ו-`b.p` מחזיקים אותה כתובת, ולכן הכתיבה `*b.p = 7` נראית גם דרך `a`. (הבלוק שהכיל 1 אבד בזליגת זיכרון, אבל זה לא משנה את ההדפסה.)",
      recap: "גם השמת ברירת המחדל משתפת את המצביע" },
    { id: "C04-Q3", question: "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    int arr[3];\n};\nint main() {\n    A a;\n    a.arr[0] = 1;\n    A b = a;\n    b.arr[0] = 5;\n    cout << a.arr[0];\n}\n```",
      options: [
        { id: "a", value: "`5`" },
        { id: "b", value: "`1`" },
        { id: "c", value: "`0`" },
        { id: "d", value: "כתובת של המערך" }],
      correctId: "b",
      explanation: "מערך שהוא שדה של המחלקה מועתק איבר אחרי איבר בהעתקת ברירת המחדל, ולכן `b.arr` הוא עותק עצמאי. שינוי ב-`b.arr[0]` לא משפיע על `a`, ו-`a.arr[0]` נשאר 1.",
      recap: "מערך כשדה מועתק במלואו" },
    { id: "C04-Q4", question: "מה מדפיסה התכנית?\n```cpp\n#include <vector>\nstruct V {\n    vector<int> v;\n};\nint main() {\n    V a;\n    a.v.push_back(1);\n    V b = a;\n    b.v[0] = 5;\n    cout << a.v[0];\n}\n```",
      options: [
        { id: "a", value: "`5`" },
        { id: "b", value: "`0`" },
        { id: "c", value: "`1`" },
        { id: "d", value: "שגיאה בזמן ריצה" }],
      correctId: "c",
      explanation: "בהעתקת ברירת המחדל כל שדה מועתק בבנאי ההעתקה שלו. ל-`vector` יש בנאי העתקה שמעתיק את התוכן, ולכן `b.v` עצמאי ו-`a.v[0]` נשאר 1.",
      recap: "שדה עם בנאי העתקה משלו מועתק נכון גם בברירת המחדל" },
    { id: "C04-Q5", question: "מה מדפיסה התכנית?\n```cpp\nstruct P {\n    int* p;\n    int n;\n    P() : p(new int(1)), n(1) {}\n};\nint main() {\n    P a;\n    P b = a;\n    b.n = 5;\n    *b.p = 5;\n    cout << a.n << *a.p;\n}\n```",
      options: [
        { id: "a", value: "`11`" },
        { id: "b", value: "`15`" },
        { id: "c", value: "`55`" },
        { id: "d", value: "`51`" }],
      correctId: "b",
      explanation: "השדה `n` מועתק לפי ערך, ולכן `b.n = 5` לא נוגע ב-`a.n` שנשאר 1. השדה `p` מועתק ככתובת, ולכן `*b.p = 5` משנה את הבלוק של `a` גם כן: `*a.p` הוא 5. הפלט `15`.",
      recap: "ערכים עצמאיים, מצביעים משותפים" },
  ],
});
