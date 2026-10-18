/* Operators course (operators), level 2: C02 */
COURSE_LEVEL("operators", {
  id: "C02", order: 2, icon: "🤝", title: "פונקציה חיצונית ו-friend",
  goal: "להחליט מתי אופרטור חייב להיות פונקציה חיצונית, ומתי צריך friend.",
  source: "ai-verified",
  lesson: { html: String.raw`
<p>אופרטור יכול להיות גם <b>פונקציה חיצונית</b> (גלובלית) שמקבלת את שני האופרנדים כפרמטרים: <code>a + b</code> הופך ל-<code>operator+(a, b)</code>. כאן אין <code>this</code>, ולכן אין הגבלה על טיפוס האופרנד השמאלי.</p>
<table>
<thead><tr><th>צורה</th><th>הביטוי <code>a + b</code> נקרא כ-</th><th>פרמטרים</th></tr></thead>
<tbody>
<tr><td>חבר</td><td><code>a.operator+(b)</code></td><td>אחד</td></tr>
<tr><td>חיצוני</td><td><code>operator+(a, b)</code></td><td>שניים</td></tr>
</tbody></table>
<ul>
<li><b>האופרנד השמאלי אינו מהמחלקה</b> (<code>5 + a</code>): חייבים פונקציה חיצונית <code>operator+(int, const V&amp;)</code>.</li>
<li>פונקציה חיצונית <b>לא רואה שדות פרטיים</b>. אם היא צריכה אותם, מצהירים עליה בתוך המחלקה כ-<code>friend</code>. אם היא משתמשת רק בממשק הציבורי, <code>friend</code> לא נחוץ.</li>
<li><code>friend</code> לא הופך את הפונקציה לחברה: היא נשארת חיצונית, אין לה <code>this</code>, ואי אפשר לקרוא לה בצורה <code>a.operator+(b)</code>.</li>
<li>האופרטורים <code>=</code>, <code>[]</code>, <code>()</code> ו-<code>-&gt;</code> חייבים להיות פונקציות חברות.</li>
</ul>
<div class="lesson-rule">🔑 <b>אם האופרנד השמאלי אינו מהמחלקה: פונקציה חיצונית. אם היא צריכה שדות פרטיים: friend.</b></div>
<div class="lesson-ex">
<pre>class Box {
    int w;
public:
    Box(int x) : w(x) {}
    friend Box operator*(int k, const Box&amp; b);
};
Box operator*(int k, const Box&amp; b) { return Box(k * b.w); }
// 3 * box  =&gt;  operator*(3, box)</pre></div>
` },
  questions: [
    { id: "C02-Q1", question: "במחלקה `V` אין בנאים נוספים, וההגדרה היחידה של חיבור היא הפונקציה החיצונית `V operator+(int k, const V& v)`. `a` הוא אובייקט מטיפוס `V`. איזה ביטוי מתקמפל?",
      options: [
        { id: "a", value: "`5 + a`" },
        { id: "b", value: "`a + 5`" },
        { id: "c", value: "`a + a`" },
        { id: "d", value: "`a.operator+(5)`" }],
      correctId: "a",
      explanation: "`5 + a` נקרא כ-`operator+(5, a)`, וזה בדיוק החתימה. ב-`a + 5` האופרנד השמאלי הוא `V`, ואין חתימה `operator+(V, int)`. ב-`a + a` הפרמטר הראשון הוא `int` ול-`V` אין המרה אליו. הקריאה `a.operator+(5)` מניחה פונקציה חברה, וזו לא קיימת.",
      recap: "חתימה חיצונית (int, V) מתאימה רק לביטוי שבו ה-int משמאל" },
    { id: "C02-Q2", question: "מה מדפיסה התכנית?\n```cpp\nclass Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n    int get() const { return w; }\n    friend Box operator*(int k, const Box& b);\n};\nBox operator*(int k, const Box& b) { return Box(k * b.w); }\nint main() {\n    Box b(4);\n    cout << (3 * b).get() << \" \" << (2 * (3 * b)).get();\n}\n```",
      options: [
        { id: "a", value: "`12 24`" },
        { id: "b", value: "`12 12`" },
        { id: "c", value: "`7 9`" },
        { id: "d", value: "`12 8`" }],
      correctId: "a",
      explanation: "`3 * b` קורא ל-`operator*(3, b)` ונותן תיבה ברוחב 12. `2 * (3 * b)` מכפיל את התוצאה הזאת ב-2 ונותן 24. הפונקציה החיצונית רואה את `w` הפרטי בזכות ההצהרה `friend`. התשובה `12 12` מתעלמת מהכפל השני. `7 9` מחברת במקום להכפיל. `12 8` מכפילה את `b` המקורי ב-2.",
      recap: "friend נותן לפונקציה חיצונית גישה לשדות פרטיים" },
    { id: "C02-Q3", question: "מה קורה בתכנית הבאה?\n```cpp\nclass Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n};\nbool operator==(const Box& a, const Box& b) { return a.w == b.w; }\nint main() {\n    Box p(1), q(1);\n    cout << (p == q);\n}\n```",
      options: [
        { id: "a", value: "שגיאת קומפילציה: הפונקציה החיצונית ניגשת לשדה פרטי ללא `friend`" },
        { id: "b", value: "מודפס `1`" },
        { id: "c", value: "מודפס `0`" },
        { id: "d", value: "שגיאת קומפילציה: אופרטור `==` חייב להיות פונקציה חברה" }],
      correctId: "a",
      explanation: "הפונקציה חיצונית ולכן אינה רואה את `w` הפרטי. כדי שתתקמפל צריך להצהיר עליה כ-`friend` בתוך `Box`, או לגשת לערך דרך פונקציה ציבורית. האפשרות \"שגיאת קומפילציה: אופרטור `==` חייב להיות פונקציה חברה\" שגויה: `==` יכול להיות חיצוני. רק `=`, `[]`, `()` ו-`->` חייבים להיות חברים.",
      recap: "פונקציה חיצונית בלי friend לא ניגשת לשדות פרטיים" },
    { id: "C02-Q4", question: "במחלקה `V` מוצהרת (ומוגדרת) הפונקציה `friend V operator+(const V& a, const V& b);`. איזה ביטוי מתקמפל? (`a` ו-`b` הם `V`)",
      options: [
        { id: "a", value: "`a + b`" },
        { id: "b", value: "`a.operator+(b)`" },
        { id: "c", value: "`V::operator+(a, b)`" },
        { id: "d", value: "`a.operator+(a, b)`" }],
      correctId: "a",
      explanation: "פונקציית `friend` אינה חברה במחלקה: היא פונקציה חיצונית עם גישה מיוחדת. לכן אפשר לכתוב `a + b` (שמתורגם ל-`operator+(a, b)`), אבל אי אפשר לקרוא לה בתחביר של פונקציה חברה (`a.operator+(...)`) ולא דרך שם המחלקה (`V::operator+`).",
      recap: "friend זו פונקציה חיצונית: אין this ואין a.operator+" },
    { id: "C02-Q5", question: "איזה מהאופרטורים הבאים **אי אפשר** להגדיר כפונקציה חיצונית (גלובלית) עבור מחלקה `V`?",
      options: [
        { id: "a", value: "`+`" },
        { id: "b", value: "`==`" },
        { id: "c", value: "`<<`" },
        { id: "d", value: "`=`" }],
      correctId: "d",
      explanation: "אופרטור ההשמה `=` (וגם `[]`, `()` ו-`->`) חייב להיות פונקציה חברה. אפשר להגדיר `+`, `==` ו-`<<` כפונקציות חיצוניות רגילות (`operator<<` אפילו חייב להיות חיצוני כשהזרם בצד שמאל).",
      recap: "= [] () -> חייבים להיות חברים" },
  ],
});
