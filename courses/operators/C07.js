/* Operators course (operators), level 7: C07 */
COURSE_LEVEL("operators", {
  id: "C07", order: 7, icon: "🏆", title: "מבחן גמר: אופרטורים והמרות",
  goal: "לפתור שאלות אמיתיות מהמבחנים על העמסת אופרטורים והמרות.",
  boss: true,
  source: "ai-verified",
  lesson: { html: String.raw`
<p>בשאלות המבחן על אופרטורים והמרות, ארבע שאלות מספיקות כדי לפתור כמעט הכול:</p>
<ol>
<li><b>מי האופרנד השמאלי?</b> אם הוא מהמחלקה: אפשר אופרטור חבר (פרמטר אחד). אם לא (<code>5 + x</code>, <code>cout &lt;&lt; x</code>): חובה פונקציה חיצונית.</li>
<li><b>האם הפונקציה צריכה שדות פרטיים?</b> כן: <code>friend</code>. לא: פונקציה חיצונית רגילה מספיקה.</li>
<li><b>prefix או postfix?</b> <code>++x</code> בלי פרמטר ומחזיר הפניה. <code>x++</code> עם <code>int</code> מדומה ומחזיר עותק של הערך הישן.</li>
<li><b>לאיזה כיוון ההמרה?</b> אל המחלקה: בנאי עם ארגומנט אחד (<code>explicit</code> חוסם המרה אוטומטית). מהמחלקה: <code>operator T()</code> בלי טיפוס החזרה.</li>
</ol>
<div class="lesson-rule">🔑 בשאלת "כמה שגיאות": בודקים כל שורה לחוד ושואלים איזה אופרטור או המרה היא דורשת, ואם הוא מוגדר.</div>
<div class="lesson-trap">⚠️ <b>המרה אוטומטית אחת בלבד</b> ברצף, ו-<code>cout &lt;&lt; x</code> חייב להיות פונקציה חיצונית גם כש<code>friend</code> לא נדרש.</div>
` },
  questions: [
    { bankId: "18A-B-Q7", recap: "אופרנד שמאלי שאינו מהמחלקה: פונקציה חיצונית." },
    { bankId: "19A-B-Q23", recap: "operator<< חיצוני; friend רק אם צריך שדות פרטיים." },
    { bankId: "22B-B-Q11", recap: "prefix מחזיר את החדש, postfix את הישן." },
    { bankId: "21S-B-Q16", recap: "x++ דורש operator++(int); cout << a דורש operator<<." },
    { bankId: "21B-A-Q7", recap: "בנאי לא explicit ו-operator int מאפשרים המרות בשני הכיוונים." },
    { bankId: "22B-B-Q15", recap: "operator A() ממיר מ-B ל-A, לא להפך." },
  ],
});
