window.COURSES = {
 "copy_control": {
  "levels": [
   {
    "id": "C01",
    "order": 1,
    "icon": "📋",
    "title": "בנאי העתקה או השמה?",
    "goal": "להבחין בכל שורה אם נקרא בנאי העתקה או אופרטור השמה.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>כשעובדים עם אובייקטים יש שלוש פעולות שקשורות ל\"העתקה\". כדי לדעת איזו נקראת בכל שורה שואלים שאלה אחת: <b>האם האובייקט בצד שמאל כבר קיים?</b></p>\n<table>\n<thead><tr><th>השורה</th><th>מה קורה</th><th>מי נקרא</th></tr></thead>\n<tbody>\n<tr><td><code>T b = a;</code></td><td>נוצר אובייקט חדש <code>b</code></td><td>בנאי העתקה</td></tr>\n<tr><td><code>T b(a);</code></td><td>נוצר אובייקט חדש <code>b</code></td><td>בנאי העתקה</td></tr>\n<tr><td><code>b = a;</code> (אחרי ש-<code>b</code> הוגדר)</td><td>שני האובייקטים כבר קיימים</td><td>אופרטור השמה</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>אובייקט חדש = בנאי. אובייקט קיים = השמה.</b> סימן ה-<code>=</code> בשורת הצהרה (<code>T b = a;</code>) הוא אתחול, ולכן נקרא בנאי העתקה ולא אופרטור ההשמה.</div>\n<div class=\"lesson-ex\">נעקוב אחרי מחלקה שמדפיסה בכל פעולה:\n<pre>struct T {\n    T()                    { cout &lt;&lt; \"D \"; }\n    T(const T&amp;)            { cout &lt;&lt; \"C \"; }\n    T&amp; operator=(const T&amp;) { cout &lt;&lt; \"A \"; return *this; }\n};\nT a;       // D\nT b = a;   // C\nb = a;     // A</pre></div>\n<div class=\"lesson-trap\">⚠️ <b>אם לא כתבתם בנאי העתקה</b>, הקומפיילר יוצר אחד בעצמו, והוא <b>לא מדפיס כלום</b>. העתקה שקרתה בשקט עדיין נחשבת העתקה.</div>\n<div class=\"lesson-trap\">⚠️ בנאי העתקה נקרא גם כשמעבירים אובייקט <b>לפונקציה לפי ערך</b> (<code>void f(T t)</code> עם <code>f(a);</code>): הפרמטר <code>t</code> הוא אובייקט חדש שנבנה כהעתק של <code>a</code>. הפרטים בשלב הבא.</div>\n"
    },
    "questions": [
     {
      "id": "C01-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    T()                    { cout << \"D \"; }\n    T(const T&)            { cout << \"C \"; }\n    T& operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    T c(a);\n    c = a;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`D C C A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D C C A</code>"
       },
       {
        "id": "b",
        "value": "`D C A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D C A A</code>"
       },
       {
        "id": "c",
        "value": "`D A C A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D A C A</code>"
       },
       {
        "id": "d",
        "value": "`D C C C`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D C C C</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`T a;` הוא בנאי רגיל (`D`). `T b = a;` ו-`T c(a);` יוצרים אובייקטים חדשים ולכן קוראים לבנאי ההעתקה פעמיים (`C C`). רק `c = a;` היא השמה בין אובייקטים קיימים (`A`). התשובה `D C A A` סופרת את `T c(a);` כהשמה. `D A C A` מניחה ש-`=` בהצהרה היא השמה. `D C C C` מניחה שגם `c = a;` יוצרת אובייקט.",
      "recap": "אובייקט חדש = בנאי העתקה, אובייקט קיים = השמה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    T()                    { cout &lt;&lt; \"D \"; }\n    T(const T&amp;)            { cout &lt;&lt; \"C \"; }\n    T&amp; operator=(const T&amp;) { cout &lt;&lt; \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    T c(a);\n    c = a;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">T a;</code> הוא בנאי רגיל (<code class=\"tok\" dir=\"ltr\">D</code>). <code class=\"tok\" dir=\"ltr\">T b = a;</code> ו-<code class=\"tok\" dir=\"ltr\">T c(a);</code> יוצרים אובייקטים חדשים ולכן קוראים לבנאי ההעתקה פעמיים (<code class=\"tok\" dir=\"ltr\">C C</code>). רק <code class=\"tok\" dir=\"ltr\">c = a;</code> היא השמה בין אובייקטים קיימים (<code class=\"tok\" dir=\"ltr\">A</code>). התשובה <code class=\"tok\" dir=\"ltr\">D C A A</code> סופרת את <code class=\"tok\" dir=\"ltr\">T c(a);</code> כהשמה. <code class=\"tok\" dir=\"ltr\">D A C A</code> מניחה ש-<code class=\"tok\" dir=\"ltr\">=</code> בהצהרה היא השמה. <code class=\"tok\" dir=\"ltr\">D C C C</code> מניחה שגם <code class=\"tok\" dir=\"ltr\">c = a;</code> יוצרת אובייקט.",
      "recapHtml": "אובייקט חדש = בנאי העתקה, אובייקט קיים = השמה"
     },
     {
      "id": "C01-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    T()                    { cout << \"D \"; }\n    T(const T&)            { cout << \"C \"; }\n    T& operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    T c;\n    c = b;\n    T d(c);\n    cout << \"end\";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`D C D A C end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D C D A C end</code>"
       },
       {
        "id": "b",
        "value": "`D C D C C end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D C D C C end</code>"
       },
       {
        "id": "c",
        "value": "`D A D A C end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D A D A C end</code>"
       },
       {
        "id": "d",
        "value": "`D C D A A end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D C D A A end</code>"
       }
      ],
      "correctId": "a",
      "explanation": "שורה אחר שורה: `T a;` נותן `D`; `T b = a;` נותן `C`; `T c;` נותן `D`; `c = b;` נותן `A` כי `c` כבר קיים; `T d(c);` נותן `C`. התשובה `D C D C C end` שוכחת שהשורה `c = b;` היא השמה. `D A D A C end` חושבת ש-`T b = a;` היא השמה. `D C D A A end` חושבת שגם `T d(c);` היא השמה.",
      "recap": "מסתכלים אם האובייקט בצד שמאל נוצר בשורה הזאת",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    T()                    { cout &lt;&lt; \"D \"; }\n    T(const T&amp;)            { cout &lt;&lt; \"C \"; }\n    T&amp; operator=(const T&amp;) { cout &lt;&lt; \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    T c;\n    c = b;\n    T d(c);\n    cout &lt;&lt; \"end\";\n}</code></pre>",
      "explanationHtml": "שורה אחר שורה: <code class=\"tok\" dir=\"ltr\">T a;</code> נותן <code class=\"tok\" dir=\"ltr\">D</code>; <code class=\"tok\" dir=\"ltr\">T b = a;</code> נותן <code class=\"tok\" dir=\"ltr\">C</code>; <code class=\"tok\" dir=\"ltr\">T c;</code> נותן <code class=\"tok\" dir=\"ltr\">D</code>; <code class=\"tok\" dir=\"ltr\">c = b;</code> נותן <code class=\"tok\" dir=\"ltr\">A</code> כי <code class=\"tok\" dir=\"ltr\">c</code> כבר קיים; <code class=\"tok\" dir=\"ltr\">T d(c);</code> נותן <code class=\"tok\" dir=\"ltr\">C</code>. התשובה <code class=\"tok\" dir=\"ltr\">D C D C C end</code> שוכחת שהשורה <code class=\"tok\" dir=\"ltr\">c = b;</code> היא השמה. <code class=\"tok\" dir=\"ltr\">D A D A C end</code> חושבת ש-<code class=\"tok\" dir=\"ltr\">T b = a;</code> היא השמה. <code class=\"tok\" dir=\"ltr\">D C D A A end</code> חושבת שגם <code class=\"tok\" dir=\"ltr\">T d(c);</code> היא השמה.",
      "recapHtml": "מסתכלים אם האובייקט בצד שמאל נוצר בשורה הזאת"
     },
     {
      "id": "C01-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nint main() {\n    K a;\n    K b = a;\n    K c(a);\n    K d;\n    d = a;\n    b = c;\n    cout << K::n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3</code>"
       },
       {
        "id": "b",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "c",
        "value": "`4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">4</code>"
       },
       {
        "id": "d",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       }
      ],
      "correctId": "b",
      "explanation": "המונה `n` עולה רק בבנאי ההעתקה. בנאי העתקה נקרא ב-`K b = a;` וב-`K c(a);`, כלומר פעמיים. `d = a;` ו-`b = c;` הן השמות ולכן הן לא מגדילות את המונה (למחלקה אין אופרטור השמה משלה, והשמת ברירת המחדל לא נוגעת ב-`n`). התשובה 4 סופרת את כל ארבע שורות ההעתקה.",
      "recap": "סופרים רק שורות שיוצרות אובייקט חדש מאובייקט קיים",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nint main() {\n    K a;\n    K b = a;\n    K c(a);\n    K d;\n    d = a;\n    b = c;\n    cout &lt;&lt; K::n;\n}</code></pre>",
      "explanationHtml": "המונה <code class=\"tok\" dir=\"ltr\">n</code> עולה רק בבנאי ההעתקה. בנאי העתקה נקרא ב-<code class=\"tok\" dir=\"ltr\">K b = a;</code> וב-<code class=\"tok\" dir=\"ltr\">K c(a);</code>, כלומר פעמיים. <code class=\"tok\" dir=\"ltr\">d = a;</code> ו-<code class=\"tok\" dir=\"ltr\">b = c;</code> הן השמות ולכן הן לא מגדילות את המונה (למחלקה אין אופרטור השמה משלה, והשמת ברירת המחדל לא נוגעת ב-<code class=\"tok\" dir=\"ltr\">n</code>). התשובה 4 סופרת את כל ארבע שורות ההעתקה.",
      "recapHtml": "סופרים רק שורות שיוצרות אובייקט חדש מאובייקט קיים"
     },
     {
      "id": "C01-Q4",
      "question": "מה מדפיסה התכנית? שימו לב שלמחלקה אין בנאי העתקה משלה.\n```cpp\nstruct T {\n    T() {}\n    T& operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    b = a;\n    T c(b);\n    c = b;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A</code>"
       },
       {
        "id": "b",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       },
       {
        "id": "c",
        "value": "`A A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A A</code>"
       },
       {
        "id": "d",
        "value": "`A A A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A A A</code>"
       }
      ],
      "correctId": "b",
      "explanation": "`T b = a;` ו-`T c(b);` משתמשות בבנאי העתקה שהקומפיילר יצר, והוא לא מדפיס. רק שתי ההשמות `b = a;` ו-`c = b;` קוראות לאופרטור שנכתב, ולכן `A A`. התשובה `A A A A` סופרת גם את שתי ההצהרות, כאילו `=` בהצהרה היא השמה.",
      "recap": "בנאי העתקה אוטומטי לא מדפיס, אבל הוא כן נקרא",
      "questionHtml": "מה מדפיסה התכנית? שימו לב שלמחלקה אין בנאי העתקה משלה.<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    T() {}\n    T&amp; operator=(const T&amp;) { cout &lt;&lt; \"A \"; return *this; }\n};\nint main() {\n    T a;\n    T b = a;\n    b = a;\n    T c(b);\n    c = b;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">T b = a;</code> ו-<code class=\"tok\" dir=\"ltr\">T c(b);</code> משתמשות בבנאי העתקה שהקומפיילר יצר, והוא לא מדפיס. רק שתי ההשמות <code class=\"tok\" dir=\"ltr\">b = a;</code> ו-<code class=\"tok\" dir=\"ltr\">c = b;</code> קוראות לאופרטור שנכתב, ולכן <code class=\"tok\" dir=\"ltr\">A A</code>. התשובה <code class=\"tok\" dir=\"ltr\">A A A A</code> סופרת גם את שתי ההצהרות, כאילו <code class=\"tok\" dir=\"ltr\">=</code> בהצהרה היא השמה.",
      "recapHtml": "בנאי העתקה אוטומטי לא מדפיס, אבל הוא כן נקרא"
     },
     {
      "id": "C01-Q5",
      "question": "באיזו שורה אחת **לא** נקרא בנאי העתקה של `T`? (`a` ו-`b` הוגדרו קודם כאובייקטים מטיפוס `T`)",
      "options": [
       {
        "id": "a",
        "value": "`T x = a;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">T x = a;</code>"
       },
       {
        "id": "b",
        "value": "`T x(a);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">T x(a);</code>"
       },
       {
        "id": "c",
        "value": "`b = a;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">b = a;</code>"
       },
       {
        "id": "d",
        "value": "העברת `a` לפונקציה `void f(T t)` בקריאה `f(a);`",
        "type": "text",
        "html": "העברת <code class=\"tok\" dir=\"ltr\">a</code> לפונקציה <code class=\"tok\" dir=\"ltr\">void f(T t)</code> בקריאה <code class=\"tok\" dir=\"ltr\">f(a);</code>"
       }
      ],
      "correctId": "c",
      "explanation": "בהצהרה `T x = a;` ובהצהרה `T x(a);` נוצר אובייקט חדש, ולכן בנאי העתקה. גם פרמטר שמועבר לפי ערך נוצר כהעתק. `b = a;` היא השמה בין שני אובייקטים שכבר קיימים, ולכן נקראת רק פעולת ההשמה.",
      "recap": "השמה בין אובייקטים קיימים לא קוראת לבנאי העתקה",
      "questionHtml": "באיזו שורה אחת <strong>לא</strong> נקרא בנאי העתקה של <code class=\"tok\" dir=\"ltr\">T</code>? (<code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> הוגדרו קודם כאובייקטים מטיפוס <code class=\"tok\" dir=\"ltr\">T</code>)",
      "explanationHtml": "בהצהרה <code class=\"tok\" dir=\"ltr\">T x = a;</code> ובהצהרה <code class=\"tok\" dir=\"ltr\">T x(a);</code> נוצר אובייקט חדש, ולכן בנאי העתקה. גם פרמטר שמועבר לפי ערך נוצר כהעתק. <code class=\"tok\" dir=\"ltr\">b = a;</code> היא השמה בין שני אובייקטים שכבר קיימים, ולכן נקראת רק פעולת ההשמה.",
      "recapHtml": "השמה בין אובייקטים קיימים לא קוראת לבנאי העתקה"
     }
    ]
   },
   {
    "id": "C02",
    "order": 2,
    "icon": "📤",
    "title": "העברה והחזרה לפי ערך",
    "goal": "לספור כמה פעמים נקרא בנאי העתקה בקריאות לפונקציות.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>בנאי העתקה נקרא גם בלי הסימן <code>=</code>, בכל מקום שבו נוצר <b>עותק</b> של אובייקט:</p>\n<ul>\n<li><b>פרמטר לפי ערך</b> (<code>void f(T t)</code>): בקריאה <code>f(a)</code> הפרמטר <code>t</code> נבנה כהעתק של <code>a</code>.</li>\n<li><b>החזרה לפי ערך</b> (<code>T g()</code>): ערך ההחזרה נבנה כהעתק.</li>\n<li><b>לפי הפניה</b> (<code>T&amp;</code>, <code>const T&amp;</code>) או <b>מצביע</b> (<code>T*</code>): אין העתקה בכלל.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>עותק נוצר רק כשהטיפוס מופיע \"חשוף\" (בלי <code>&amp;</code> ובלי <code>*</code>)</b> בפרמטר או בטיפוס ההחזרה.</div>\n<div class=\"lesson-ex\"><code>K f(const K&amp; r) { return r; }</code> מחזירה לפי ערך מתוך הפניה, ולכן כל קריאה מעתיקה פעם אחת. לעומת זאת <code>K&amp; f(K&amp; r)</code> מחזירה הפניה ולא מעתיקה.</div>\n<div class=\"lesson-trap\">⚠️ <b>ביטול העתקה (copy elision) מ-C++17:</b> ב-<code>return K();</code> וב-<code>K d = make();</code> האובייקט נבנה ישירות במקומו הסופי, <b>בלי</b> בנאי העתקה. לעומת זאת <code>return k;</code> כש-<code>k</code> הוא פרמטר, או <code>return r;</code> כש-<code>r</code> הפניה, עדיין מעתיקים. בשאלות \"בהכרח\" לא סופרים העתקות שהקומפיילר רשאי לבטל.</div>\n"
    },
    "questions": [
     {
      "id": "C02-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nvoid f(K k) {}\nvoid g(const K& k) {}\nint main() {\n    K a;\n    f(a);\n    g(a);\n    f(a);\n    cout << K::n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "b",
        "value": "`3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3</code>"
       },
       {
        "id": "c",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "d",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       }
      ],
      "correctId": "d",
      "explanation": "`f` מקבלת פרמטר לפי ערך, ולכן כל קריאה אליה מעתיקה: שתי קריאות, שני בנאי העתקה. `g` מקבלת הפניה ולא מעתיקה. התשובה 3 סופרת גם את `g`.",
      "recap": "פרמטר לפי ערך = העתקה בכל קריאה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nvoid f(K k) {}\nvoid g(const K&amp; k) {}\nint main() {\n    K a;\n    f(a);\n    g(a);\n    f(a);\n    cout &lt;&lt; K::n;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">f</code> מקבלת פרמטר לפי ערך, ולכן כל קריאה אליה מעתיקה: שתי קריאות, שני בנאי העתקה. <code class=\"tok\" dir=\"ltr\">g</code> מקבלת הפניה ולא מעתיקה. התשובה 3 סופרת גם את <code class=\"tok\" dir=\"ltr\">g</code>.",
      "recapHtml": "פרמטר לפי ערך = העתקה בכל קריאה"
     },
     {
      "id": "C02-Q2",
      "question": "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK make() { return K(); }\nint main() {\n    K a = make();\n    K b = make();\n    cout << K::n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">4</code>"
       },
       {
        "id": "b",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "c",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "d",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       }
      ],
      "correctId": "d",
      "explanation": "ב-C++17 ההחזרה `return K();` וגם האתחול `K a = make();` בונים את האובייקט ישירות במקומו, בלי בנאי העתקה. לכן המונה נשאר 0. התשובות 2 ו-4 הן מה שסופרים לפי הכלל הישן, לפני ביטול ההעתקה.",
      "recap": "ב-C++17 החזרה של ערך זמני לא מעתיקה",
      "questionHtml": "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nK make() { return K(); }\nint main() {\n    K a = make();\n    K b = make();\n    cout &lt;&lt; K::n;\n}</code></pre>",
      "explanationHtml": "ב-C++17 ההחזרה <code class=\"tok\" dir=\"ltr\">return K();</code> וגם האתחול <code class=\"tok\" dir=\"ltr\">K a = make();</code> בונים את האובייקט ישירות במקומו, בלי בנאי העתקה. לכן המונה נשאר 0. התשובות 2 ו-4 הן מה שסופרים לפי הכלל הישן, לפני ביטול ההעתקה.",
      "recapHtml": "ב-C++17 החזרה של ערך זמני לא מעתיקה"
     },
     {
      "id": "C02-Q3",
      "question": "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK id(K k) { return k; }\nint main() {\n    K a;\n    K b = id(a);\n    cout << K::n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "b",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "c",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "d",
        "value": "`3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3</code>"
       }
      ],
      "correctId": "c",
      "explanation": "הפרמטר `k` נבנה כהעתק של `a` (העתקה ראשונה). ב-`return k;` מחזירים פרמטר בשם, ואת זה הקומפיילר אינו רשאי לבטל, ולכן נוצר עוד עותק (העתקה שנייה). האתחול `K b = id(a);` כבר בונה ישירות, בלי העתקה נוספת. לכן 2.",
      "recap": "החזרת פרמטר בשם מעתיקה, והעברה לפי ערך מעתיקה",
      "questionHtml": "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nK id(K k) { return k; }\nint main() {\n    K a;\n    K b = id(a);\n    cout &lt;&lt; K::n;\n}</code></pre>",
      "explanationHtml": "הפרמטר <code class=\"tok\" dir=\"ltr\">k</code> נבנה כהעתק של <code class=\"tok\" dir=\"ltr\">a</code> (העתקה ראשונה). ב-<code class=\"tok\" dir=\"ltr\">return k;</code> מחזירים פרמטר בשם, ואת זה הקומפיילר אינו רשאי לבטל, ולכן נוצר עוד עותק (העתקה שנייה). האתחול <code class=\"tok\" dir=\"ltr\">K b = id(a);</code> כבר בונה ישירות, בלי העתקה נוספת. לכן 2.",
      "recapHtml": "החזרת פרמטר בשם מעתיקה, והעברה לפי ערך מעתיקה"
     },
     {
      "id": "C02-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK f(const K& r) { return r; }\nint main() {\n    K a;\n    f(a);\n    f(a);\n    cout << K::n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "b",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "c",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "d",
        "value": "`4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">4</code>"
       }
      ],
      "correctId": "c",
      "explanation": "הפרמטר הוא הפניה ולכן לא מעתיקים בכניסה, אבל טיפוס ההחזרה הוא `K` לפי ערך, ו-`return r;` מעתיק מהפניה. כל קריאה יוצרת עותק (גם אם התוצאה נזרקת), ולכן 2. התשובה 4 סופרת גם העתקה בכניסה שלא קיימת.",
      "recap": "טיפוס החזרה חשוף = עותק בכל קריאה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nK f(const K&amp; r) { return r; }\nint main() {\n    K a;\n    f(a);\n    f(a);\n    cout &lt;&lt; K::n;\n}</code></pre>",
      "explanationHtml": "הפרמטר הוא הפניה ולכן לא מעתיקים בכניסה, אבל טיפוס ההחזרה הוא <code class=\"tok\" dir=\"ltr\">K</code> לפי ערך, ו-<code class=\"tok\" dir=\"ltr\">return r;</code> מעתיק מהפניה. כל קריאה יוצרת עותק (גם אם התוצאה נזרקת), ולכן 2. התשובה 4 סופרת גם העתקה בכניסה שלא קיימת.",
      "recapHtml": "טיפוס החזרה חשוף = עותק בכל קריאה"
     },
     {
      "id": "C02-Q5",
      "question": "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nvoid f1(K& k) {}\nvoid f2(K k) {}\nvoid f3(K* k) {}\nK    f4() { return K(); }\nK&   f5(K& k) { return k; }\nK*   f6(K* k) { return k; }\nint main() {\n    K a;\n    f1(a);\n    f2(a);\n    f3(&a);\n    f4();\n    f5(a);\n    f6(&a);\n    cout << K::n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "b",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "c",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "d",
        "value": "`6`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">6</code>"
       }
      ],
      "correctId": "a",
      "explanation": "רק `f2` מעתיקה (פרמטר לפי ערך). `f4` מחזירה לפי ערך, אבל `return K();` נבנה ישירות ב-C++17. `f1`, `f5` עובדות עם הפניות ו-`f3`, `f6` עם מצביעים, ולכן אין בהן העתקה. סה\"כ 1.",
      "recap": "סופרים רק פרמטרים והחזרות בטיפוס חשוף, ושוללים ביטול העתקה",
      "questionHtml": "בהנחה שהתכנית מתקמפלת ב-C++17, מה היא מדפיסה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nvoid f1(K&amp; k) {}\nvoid f2(K k) {}\nvoid f3(K* k) {}\nK    f4() { return K(); }\nK&amp;   f5(K&amp; k) { return k; }\nK*   f6(K* k) { return k; }\nint main() {\n    K a;\n    f1(a);\n    f2(a);\n    f3(&amp;a);\n    f4();\n    f5(a);\n    f6(&amp;a);\n    cout &lt;&lt; K::n;\n}</code></pre>",
      "explanationHtml": "רק <code class=\"tok\" dir=\"ltr\">f2</code> מעתיקה (פרמטר לפי ערך). <code class=\"tok\" dir=\"ltr\">f4</code> מחזירה לפי ערך, אבל <code class=\"tok\" dir=\"ltr\">return K();</code> נבנה ישירות ב-C++17. <code class=\"tok\" dir=\"ltr\">f1</code>, <code class=\"tok\" dir=\"ltr\">f5</code> עובדות עם הפניות ו-<code class=\"tok\" dir=\"ltr\">f3</code>, <code class=\"tok\" dir=\"ltr\">f6</code> עם מצביעים, ולכן אין בהן העתקה. סה\"כ 1.",
      "recapHtml": "סופרים רק פרמטרים והחזרות בטיפוס חשוף, ושוללים ביטול העתקה"
     }
    ]
   },
   {
    "id": "C03",
    "order": 3,
    "icon": "✍️",
    "title": "החתימות הנכונות",
    "goal": "לזהות בנאי העתקה ואופרטור השמה בחתימה תקינה, ולהסביר כל חלק בה.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>החתימות של שתי הפעולות קבועות, ואפשר לשנות אותן רק בזהירות:</p>\n<table>\n<thead><tr><th>הפעולה</th><th>החתימה המקובלת</th></tr></thead>\n<tbody>\n<tr><td>בנאי העתקה</td><td><code>T(const T&amp; o)</code></td></tr>\n<tr><td>אופרטור השמה</td><td><code>T&amp; operator=(const T&amp; o)</code></td></tr>\n</tbody></table>\n<ul>\n<li><b>למה הפניה בבנאי העתקה?</b> בנאי <code>T(T o)</code> היה צריך להעתיק את הארגומנט כדי לבנות את הפרמטר, כלומר לקרוא לעצמו בלי סוף. לכן הקומפיילר דוחה אותו.</li>\n<li><b>למה <code>const</code>?</b> בלעדיו הבנאי לא יכול לקבל אובייקט <code>const</code> (או ערך זמני).</li>\n<li><b>למה השמה מחזירה <code>T&amp;</code>?</b> כדי שהשרשרת <code>a = b = c</code> תעבוד: קודם <code>b = c</code>, ותוצאתה (<code>*this</code>, בהפניה) מושמת ל-<code>a</code>.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>בנאי העתקה מקבל <code>const T&amp;</code>; השמה מקבלת <code>const T&amp;</code> ומחזירה <code>T&amp;</code> (עם <code>return *this;</code>).</b></div>\n<div class=\"lesson-trap\">⚠️ <b>אם כותבים בנאי <code>T(T&amp;)</code></b> (בלי <code>const</code>) הוא עדיין בנאי העתקה, אבל <code>const T c; T d = c;</code> לא תתקמפל. ו-<code>T(T*)</code> אינו בנאי העתקה בכלל: הוא בנאי רגיל שמקבל מצביע.</div>\n<div class=\"lesson-trap\">⚠️ <b>אם ההשמה מחזירה <code>T</code> לפי ערך</b>, כל השמה יוצרת עותק מיותר של <code>*this</code> (ולכן קוראת לבנאי העתקה).</div>\n"
    },
    "questions": [
     {
      "id": "C03-Q1",
      "question": "כמה מהבנאים הבאים, כשהם מוגדרים במחלקה `X`, הם בנאי העתקה חוקי?\n```cpp\nX(X x);\nX(X* x);\nX(const X& x);\nX(X& x);\n```",
      "options": [
       {
        "id": "a",
        "value": "1",
        "type": "text",
        "html": "1"
       },
       {
        "id": "b",
        "value": "2",
        "type": "text",
        "html": "2"
       },
       {
        "id": "c",
        "value": "3",
        "type": "text",
        "html": "3"
       },
       {
        "id": "d",
        "value": "4",
        "type": "text",
        "html": "4"
       }
      ],
      "correctId": "b",
      "explanation": "`X(const X& x)` ו-`X(X& x)` הם בנאי העתקה חוקי. `X(X x)` לא מתקמפל: כדי להעביר את הפרמטר צריך להעתיק, כלומר לקרוא לבנאי עצמו בלי סוף. `X(X* x)` מתקמפל אבל הוא בנאי רגיל שמקבל מצביע, ולא נקרא בהעתקה. לכן 2.",
      "recap": "בנאי העתקה חוקי: פרמטר הפניה (const או לא), לא בערך ולא מצביע",
      "questionHtml": "כמה מהבנאים הבאים, כשהם מוגדרים במחלקה <code class=\"tok\" dir=\"ltr\">X</code>, הם בנאי העתקה חוקי?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>X(X x);\nX(X* x);\nX(const X&amp; x);\nX(X&amp; x);</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">X(const X&amp; x)</code> ו-<code class=\"tok\" dir=\"ltr\">X(X&amp; x)</code> הם בנאי העתקה חוקי. <code class=\"tok\" dir=\"ltr\">X(X x)</code> לא מתקמפל: כדי להעביר את הפרמטר צריך להעתיק, כלומר לקרוא לבנאי עצמו בלי סוף. <code class=\"tok\" dir=\"ltr\">X(X* x)</code> מתקמפל אבל הוא בנאי רגיל שמקבל מצביע, ולא נקרא בהעתקה. לכן 2.",
      "recapHtml": "בנאי העתקה חוקי: פרמטר הפניה (const או לא), לא בערך ולא מצביע"
     },
     {
      "id": "C03-Q2",
      "question": "מה קורה בתכנית הבאה?\n```cpp\nstruct T {\n    T() {}\n    T(T&) { cout << \"c\"; }\n};\nint main() {\n    const T a;\n    T b = a;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "מודפס `c`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">c</code>"
       },
       {
        "id": "b",
        "value": "לא מודפס כלום ואין שגיאה",
        "type": "text",
        "html": "לא מודפס כלום ואין שגיאה"
       },
       {
        "id": "c",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       },
       {
        "id": "d",
        "value": "שגיאה בזמן ריצה",
        "type": "text",
        "html": "שגיאה בזמן ריצה"
       }
      ],
      "correctId": "c",
      "explanation": "הבנאי `T(T&)` מקבל הפניה שאינה `const`, ו-`a` הוא אובייקט `const`, ולכן אי אפשר לקשור אותו. מכיוון שהוגדר בנאי העתקה משלנו, הקומפיילר לא יוצר בנאי אוטומטי כגיבוי, ולא נמצא בנאי מתאים. זו שגיאת קומפילציה.",
      "recap": "בנאי T(T&) לא יכול להעתיק אובייקט const",
      "questionHtml": "מה קורה בתכנית הבאה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    T() {}\n    T(T&amp;) { cout &lt;&lt; \"c\"; }\n};\nint main() {\n    const T a;\n    T b = a;\n}</code></pre>",
      "explanationHtml": "הבנאי <code class=\"tok\" dir=\"ltr\">T(T&amp;)</code> מקבל הפניה שאינה <code class=\"tok\" dir=\"ltr\">const</code>, ו-<code class=\"tok\" dir=\"ltr\">a</code> הוא אובייקט <code class=\"tok\" dir=\"ltr\">const</code>, ולכן אי אפשר לקשור אותו. מכיוון שהוגדר בנאי העתקה משלנו, הקומפיילר לא יוצר בנאי אוטומטי כגיבוי, ולא נמצא בנאי מתאים. זו שגיאת קומפילציה.",
      "recapHtml": "בנאי T(T&amp;) לא יכול להעתיק אובייקט const"
     },
     {
      "id": "C03-Q3",
      "question": "מה קורה בתכנית הבאה?\n```cpp\nstruct T {\n    int v;\n    T(int x = 0) : v(x) {}\n    void operator=(const T& o) { v = o.v; }\n};\nint main() {\n    T a(1), b(2), c(3);\n    a = b = c;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "התכנית מתקמפלת ו-`a`, `b`, `c` מקבלים כולם את הערך 3",
        "type": "text",
        "html": "התכנית מתקמפלת ו-<code class=\"tok\" dir=\"ltr\">a</code>, <code class=\"tok\" dir=\"ltr\">b</code>, <code class=\"tok\" dir=\"ltr\">c</code> מקבלים כולם את הערך 3"
       },
       {
        "id": "b",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       },
       {
        "id": "c",
        "value": "`b` מקבל 3 ו-`a` נשאר 1",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">b</code> מקבל 3 ו-<code class=\"tok\" dir=\"ltr\">a</code> נשאר 1"
       },
       {
        "id": "d",
        "value": "שגיאה בזמן ריצה",
        "type": "text",
        "html": "שגיאה בזמן ריצה"
       }
      ],
      "correctId": "b",
      "explanation": "`a = b = c` מתבצעת מימין לשמאל: קודם `b = c`, ואז תוצאתה מושמת ל-`a`. כשהאופרטור מחזיר `void` אין תוצאה להשים, ולכן זו שגיאת קומפילציה. כדי שהשרשרת תעבוד ההשמה צריכה להחזיר `T&`.",
      "recap": "השמה מחזירה T& כדי לאפשר שרשרת",
      "questionHtml": "מה קורה בתכנית הבאה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int v;\n    T(int x = 0) : v(x) {}\n    void operator=(const T&amp; o) { v = o.v; }\n};\nint main() {\n    T a(1), b(2), c(3);\n    a = b = c;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">a = b = c</code> מתבצעת מימין לשמאל: קודם <code class=\"tok\" dir=\"ltr\">b = c</code>, ואז תוצאתה מושמת ל-<code class=\"tok\" dir=\"ltr\">a</code>. כשהאופרטור מחזיר <code class=\"tok\" dir=\"ltr\">void</code> אין תוצאה להשים, ולכן זו שגיאת קומפילציה. כדי שהשרשרת תעבוד ההשמה צריכה להחזיר <code class=\"tok\" dir=\"ltr\">T&amp;</code>.",
      "recapHtml": "השמה מחזירה T&amp; כדי לאפשר שרשרת"
     },
     {
      "id": "C03-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct N {\n    int v;\n    N(int x = 0) : v(x) {}\n    N& operator=(const N& o) { v = o.v; return *this; }\n};\nint main() {\n    N a(1), b(2), c(3);\n    a = b = c;\n    (a = N(8)).v = 9;\n    cout << a.v << b.v << c.v;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`333`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">333</code>"
       },
       {
        "id": "b",
        "value": "`933`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">933</code>"
       },
       {
        "id": "c",
        "value": "`833`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">833</code>"
       },
       {
        "id": "d",
        "value": "`988`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">988</code>"
       }
      ],
      "correctId": "b",
      "explanation": "אחרי `a = b = c` כל שלושה שווים 3. התוצאה של `a = N(8)` היא הפניה ל-`a` עצמו, ולכן `.v = 9` משנה את `a`: ‏`a.v` הוא 9 ושני האחרים נשארים 3. התשובה `833` שוכחת שההשמה מחזירה את `a` עצמו; `333` שוכחת את השינוי ל-9.",
      "recap": "ההשמה מחזירה הפניה ל-*this, ולכן אפשר להמשיך לשנות אותו",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct N {\n    int v;\n    N(int x = 0) : v(x) {}\n    N&amp; operator=(const N&amp; o) { v = o.v; return *this; }\n};\nint main() {\n    N a(1), b(2), c(3);\n    a = b = c;\n    (a = N(8)).v = 9;\n    cout &lt;&lt; a.v &lt;&lt; b.v &lt;&lt; c.v;\n}</code></pre>",
      "explanationHtml": "אחרי <code class=\"tok\" dir=\"ltr\">a = b = c</code> כל שלושה שווים 3. התוצאה של <code class=\"tok\" dir=\"ltr\">a = N(8)</code> היא הפניה ל-<code class=\"tok\" dir=\"ltr\">a</code> עצמו, ולכן <code class=\"tok\" dir=\"ltr\">.v = 9</code> משנה את <code class=\"tok\" dir=\"ltr\">a</code>: ‏<code class=\"tok\" dir=\"ltr\">a.v</code> הוא 9 ושני האחרים נשארים 3. התשובה <code class=\"tok\" dir=\"ltr\">833</code> שוכחת שההשמה מחזירה את <code class=\"tok\" dir=\"ltr\">a</code> עצמו; <code class=\"tok\" dir=\"ltr\">333</code> שוכחת את השינוי ל-9.",
      "recapHtml": "ההשמה מחזירה הפניה ל-*this, ולכן אפשר להמשיך לשנות אותו"
     },
     {
      "id": "C03-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    T() {}\n    T(const T&) { cout << \"C \"; }\n    T operator=(const T&) { cout << \"A \"; return *this; }\n};\nint main() {\n    T a, b;\n    a = b;\n    cout << \"end\";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A end</code>"
       },
       {
        "id": "b",
        "value": "`C A end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">C A end</code>"
       },
       {
        "id": "c",
        "value": "`A C end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A C end</code>"
       },
       {
        "id": "d",
        "value": "`C end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">C end</code>"
       }
      ],
      "correctId": "c",
      "explanation": "ההשמה `a = b;` נכנסת לאופרטור (`A`). הוא מחזיר `T` לפי ערך, ולכן `return *this;` יוצר עותק (`C`) לפני שהאופרטור מסתיים. אחר כך מודפס `end`. הסדר הוא `A C end`.",
      "recap": "החזרת T לפי ערך מהשמה מוסיפה בנאי העתקה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    T() {}\n    T(const T&amp;) { cout &lt;&lt; \"C \"; }\n    T operator=(const T&amp;) { cout &lt;&lt; \"A \"; return *this; }\n};\nint main() {\n    T a, b;\n    a = b;\n    cout &lt;&lt; \"end\";\n}</code></pre>",
      "explanationHtml": "ההשמה <code class=\"tok\" dir=\"ltr\">a = b;</code> נכנסת לאופרטור (<code class=\"tok\" dir=\"ltr\">A</code>). הוא מחזיר <code class=\"tok\" dir=\"ltr\">T</code> לפי ערך, ולכן <code class=\"tok\" dir=\"ltr\">return *this;</code> יוצר עותק (<code class=\"tok\" dir=\"ltr\">C</code>) לפני שהאופרטור מסתיים. אחר כך מודפס <code class=\"tok\" dir=\"ltr\">end</code>. הסדר הוא <code class=\"tok\" dir=\"ltr\">A C end</code>.",
      "recapHtml": "החזרת T לפי ערך מהשמה מוסיפה בנאי העתקה"
     }
    ]
   },
   {
    "id": "C04",
    "order": 4,
    "icon": "🔗",
    "title": "העתקה רדודה ומצביעים",
    "goal": "לצפות מה משותף ומה עצמאי אחרי העתקת ברירת המחדל.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>אם לא כותבים בנאי העתקה והשמה, הקומפיילר מעתיק <b>שדה אחרי שדה</b> (העתקה רדודה). מה שקורה לכל שדה תלוי בטיפוס שלו:</p>\n<table>\n<thead><tr><th>טיפוס השדה</th><th>מה העתקת ברירת המחדל עושה</th></tr></thead>\n<tbody>\n<tr><td><code>int</code>, <code>double</code>, מערך <code>int a[3]</code></td><td>מעתיקה את הערכים (גם את כל איברי המערך)</td></tr>\n<tr><td>אובייקט עם בנאי העתקה (<code>vector</code>, <code>string</code>)</td><td>קוראת לבנאי ההעתקה שלו, ולכן עצמאי</td></tr>\n<tr><td><b>מצביע</b> <code>int* p</code></td><td>מעתיקה את <b>הכתובת</b> בלבד: שני האובייקטים מצביעים לאותו בלוק</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>העתקה רדודה של מצביע = שיתוף.</b> שינוי דרך אחד העותקים נראה בשני. כשיש הורס עם <code>delete</code>, שני האובייקטים ישחררו אותו בלוק, וזו שגיאה בזמן ריצה.</div>\n<div class=\"lesson-ex\">\n<pre>struct S { int* p; S(int v) : p(new int(v)) {} };\nS a(5);\nS b = a;      // אותה כתובת בשני האובייקטים\n*b.p = 9;     // *a.p הוא גם 9</pre></div>\n<div class=\"lesson-trap\">⚠️ <b>מערך כשדה</b> (<code>int arr[3]</code>) <b>כן</b> מועתק במלואו. רק מצביע לבלוק שהוקצה ב-<code>new</code> משותף.</div>\n"
    },
    "questions": [
     {
      "id": "C04-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct S {\n    int* p;\n    S(int v) : p(new int(v)) {}\n};\nint main() {\n    S a(5);\n    S b = a;\n    *b.p = 9;\n    cout << (a.p == b.p) << \" \" << *a.p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`0 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0 5</code>"
       },
       {
        "id": "b",
        "value": "`1 9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 9</code>"
       },
       {
        "id": "c",
        "value": "`0 9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0 9</code>"
       },
       {
        "id": "d",
        "value": "`1 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 5</code>"
       }
      ],
      "correctId": "b",
      "explanation": "אין בנאי העתקה משלנו, ולכן `b.p` מקבל את אותה כתובת ש-`a.p` מחזיק: ההשוואה נותנת 1. הכתיבה `*b.p = 9` משנה את הבלוק המשותף, ולכן גם `*a.p` הוא 9.",
      "recap": "מצביע בהעתקה רדודה: אותה כתובת, אותו ערך",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct S {\n    int* p;\n    S(int v) : p(new int(v)) {}\n};\nint main() {\n    S a(5);\n    S b = a;\n    *b.p = 9;\n    cout &lt;&lt; (a.p == b.p) &lt;&lt; \" \" &lt;&lt; *a.p;\n}</code></pre>",
      "explanationHtml": "אין בנאי העתקה משלנו, ולכן <code class=\"tok\" dir=\"ltr\">b.p</code> מקבל את אותה כתובת ש-<code class=\"tok\" dir=\"ltr\">a.p</code> מחזיק: ההשוואה נותנת 1. הכתיבה <code class=\"tok\" dir=\"ltr\">*b.p = 9</code> משנה את הבלוק המשותף, ולכן גם <code class=\"tok\" dir=\"ltr\">*a.p</code> הוא 9.",
      "recapHtml": "מצביע בהעתקה רדודה: אותה כתובת, אותו ערך"
     },
     {
      "id": "C04-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct S {\n    int* p;\n    S(int v) : p(new int(v)) {}\n};\nint main() {\n    S a(1), b(2);\n    a = b;\n    *b.p = 7;\n    cout << *a.p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "b",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "c",
        "value": "`7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">7</code>"
       },
       {
        "id": "d",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       }
      ],
      "correctId": "c",
      "explanation": "גם השמת ברירת המחדל מעתיקה שדה שדה. אחרי `a = b` ‏`a.p` ו-`b.p` מחזיקים אותה כתובת, ולכן הכתיבה `*b.p = 7` נראית גם דרך `a`. (הבלוק שהכיל 1 אבד בזליגת זיכרון, אבל זה לא משנה את ההדפסה.)",
      "recap": "גם השמת ברירת המחדל משתפת את המצביע",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct S {\n    int* p;\n    S(int v) : p(new int(v)) {}\n};\nint main() {\n    S a(1), b(2);\n    a = b;\n    *b.p = 7;\n    cout &lt;&lt; *a.p;\n}</code></pre>",
      "explanationHtml": "גם השמת ברירת המחדל מעתיקה שדה שדה. אחרי <code class=\"tok\" dir=\"ltr\">a = b</code> ‏<code class=\"tok\" dir=\"ltr\">a.p</code> ו-<code class=\"tok\" dir=\"ltr\">b.p</code> מחזיקים אותה כתובת, ולכן הכתיבה <code class=\"tok\" dir=\"ltr\">*b.p = 7</code> נראית גם דרך <code class=\"tok\" dir=\"ltr\">a</code>. (הבלוק שהכיל 1 אבד בזליגת זיכרון, אבל זה לא משנה את ההדפסה.)",
      "recapHtml": "גם השמת ברירת המחדל משתפת את המצביע"
     },
     {
      "id": "C04-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    int arr[3];\n};\nint main() {\n    A a;\n    a.arr[0] = 1;\n    A b = a;\n    b.arr[0] = 5;\n    cout << a.arr[0];\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">5</code>"
       },
       {
        "id": "b",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "c",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "d",
        "value": "כתובת של המערך",
        "type": "text",
        "html": "כתובת של המערך"
       }
      ],
      "correctId": "b",
      "explanation": "מערך שהוא שדה של המחלקה מועתק איבר אחרי איבר בהעתקת ברירת המחדל, ולכן `b.arr` הוא עותק עצמאי. שינוי ב-`b.arr[0]` לא משפיע על `a`, ו-`a.arr[0]` נשאר 1.",
      "recap": "מערך כשדה מועתק במלואו",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    int arr[3];\n};\nint main() {\n    A a;\n    a.arr[0] = 1;\n    A b = a;\n    b.arr[0] = 5;\n    cout &lt;&lt; a.arr[0];\n}</code></pre>",
      "explanationHtml": "מערך שהוא שדה של המחלקה מועתק איבר אחרי איבר בהעתקת ברירת המחדל, ולכן <code class=\"tok\" dir=\"ltr\">b.arr</code> הוא עותק עצמאי. שינוי ב-<code class=\"tok\" dir=\"ltr\">b.arr[0]</code> לא משפיע על <code class=\"tok\" dir=\"ltr\">a</code>, ו-<code class=\"tok\" dir=\"ltr\">a.arr[0]</code> נשאר 1.",
      "recapHtml": "מערך כשדה מועתק במלואו"
     },
     {
      "id": "C04-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\n#include <vector>\nstruct V {\n    vector<int> v;\n};\nint main() {\n    V a;\n    a.v.push_back(1);\n    V b = a;\n    b.v[0] = 5;\n    cout << a.v[0];\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">5</code>"
       },
       {
        "id": "b",
        "value": "`0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "c",
        "value": "`1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "d",
        "value": "שגיאה בזמן ריצה",
        "type": "text",
        "html": "שגיאה בזמן ריצה"
       }
      ],
      "correctId": "c",
      "explanation": "בהעתקת ברירת המחדל כל שדה מועתק בבנאי ההעתקה שלו. ל-`vector` יש בנאי העתקה שמעתיק את התוכן, ולכן `b.v` עצמאי ו-`a.v[0]` נשאר 1.",
      "recap": "שדה עם בנאי העתקה משלו מועתק נכון גם בברירת המחדל",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>#include &lt;vector&gt;\nstruct V {\n    vector&lt;int&gt; v;\n};\nint main() {\n    V a;\n    a.v.push_back(1);\n    V b = a;\n    b.v[0] = 5;\n    cout &lt;&lt; a.v[0];\n}</code></pre>",
      "explanationHtml": "בהעתקת ברירת המחדל כל שדה מועתק בבנאי ההעתקה שלו. ל-<code class=\"tok\" dir=\"ltr\">vector</code> יש בנאי העתקה שמעתיק את התוכן, ולכן <code class=\"tok\" dir=\"ltr\">b.v</code> עצמאי ו-<code class=\"tok\" dir=\"ltr\">a.v[0]</code> נשאר 1.",
      "recapHtml": "שדה עם בנאי העתקה משלו מועתק נכון גם בברירת המחדל"
     },
     {
      "id": "C04-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct P {\n    int* p;\n    int n;\n    P() : p(new int(1)), n(1) {}\n};\nint main() {\n    P a;\n    P b = a;\n    b.n = 5;\n    *b.p = 5;\n    cout << a.n << *a.p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`11`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">11</code>"
       },
       {
        "id": "b",
        "value": "`15`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">15</code>"
       },
       {
        "id": "c",
        "value": "`55`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">55</code>"
       },
       {
        "id": "d",
        "value": "`51`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">51</code>"
       }
      ],
      "correctId": "b",
      "explanation": "השדה `n` מועתק לפי ערך, ולכן `b.n = 5` לא נוגע ב-`a.n` שנשאר 1. השדה `p` מועתק ככתובת, ולכן `*b.p = 5` משנה את הבלוק של `a` גם כן: `*a.p` הוא 5. הפלט `15`.",
      "recap": "ערכים עצמאיים, מצביעים משותפים",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct P {\n    int* p;\n    int n;\n    P() : p(new int(1)), n(1) {}\n};\nint main() {\n    P a;\n    P b = a;\n    b.n = 5;\n    *b.p = 5;\n    cout &lt;&lt; a.n &lt;&lt; *a.p;\n}</code></pre>",
      "explanationHtml": "השדה <code class=\"tok\" dir=\"ltr\">n</code> מועתק לפי ערך, ולכן <code class=\"tok\" dir=\"ltr\">b.n = 5</code> לא נוגע ב-<code class=\"tok\" dir=\"ltr\">a.n</code> שנשאר 1. השדה <code class=\"tok\" dir=\"ltr\">p</code> מועתק ככתובת, ולכן <code class=\"tok\" dir=\"ltr\">*b.p = 5</code> משנה את הבלוק של <code class=\"tok\" dir=\"ltr\">a</code> גם כן: <code class=\"tok\" dir=\"ltr\">*a.p</code> הוא 5. הפלט <code class=\"tok\" dir=\"ltr\">15</code>.",
      "recapHtml": "ערכים עצמאיים, מצביעים משותפים"
     }
    ]
   },
   {
    "id": "C05",
    "order": 5,
    "icon": "🛠️",
    "title": "העתקה עמוקה וחוק השלושה",
    "goal": "לכתוב ולעקוב אחרי הורס, בנאי העתקה והשמה למחלקה עם מצביע.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>כשמחלקה מחזיקה זיכרון שהוקצה ב-<code>new</code>, צריך לכתוב <b>שלוש פעולות יחד</b> (חוק השלושה): הורס, בנאי העתקה ואופרטור השמה.</p>\n<pre>struct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep&amp; o) : p(new int(*o.p)) {}     // בנאי העתקה: מקצה חדש\n    Deep&amp; operator=(const Deep&amp; o) {              // השמה\n        if (this != &amp;o) {\n            delete p;                              // מנקים את הישן\n            p = new int(*o.p);                     // מקצים ומעתיקים\n        }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};</pre>\n<div class=\"lesson-rule\">🔑 <b>השמה עמוקה בארבעה צעדים:</b> (1) <code>if (this != &amp;o)</code>, (2) משחררים את הישן, (3) מקצים חדש ומעתיקים את התוכן, (4) <code>return *this;</code>.</div>\n<div class=\"lesson-ex\">בבנאי העתקה אין מה לשחרר (האובייקט חדש), ולכן הוא רק מקצה ומעתיק. בהשמה האובייקט כבר מחזיק זיכרון, ולכן קודם משחררים אותו.</div>\n<div class=\"lesson-trap\">⚠️ <b>צריך את שניהם.</b> עם בנאי העתקה בלי השמה, השורה <code>b = a;</code> עדיין משתפת מצביע. ועם השמה בלי בנאי העתקה, השורה <code>T b = a;</code> עדיין משתפת. ללא בדיקת <code>this != &amp;o</code>, השמה עצמית <code>a = a;</code> משחררת את הזיכרון לפני שמעתיקים ממנו.</div>\n"
    },
    "questions": [
     {
      "id": "C05-Q1",
      "question": "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית?\n```cpp\nstruct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep& o) : p(new int(*o.p)) {}\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(5);\n    Deep b = a;\n    *b.p = 9;\n    cout << *a.p << *b.p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`99`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">99</code>"
       },
       {
        "id": "b",
        "value": "`55`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">55</code>"
       },
       {
        "id": "c",
        "value": "`59`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">59</code>"
       },
       {
        "id": "d",
        "value": "`95`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">95</code>"
       }
      ],
      "correctId": "c",
      "explanation": "בנאי ההעתקה מקצה בלוק חדש ומעתיק אליו את התוכן, ולכן `a` ו-`b` עצמאיים. אחרי `*b.p = 9` ערכו של `a` נשאר 5 וערכו של `b` הוא 9: `59`. התשובה `99` היא מה שהיה קורה בהעתקה רדודה.",
      "recap": "העתקה עמוקה = בלוק חדש לכל עותק",
      "questionHtml": "בהנחה שהמחלקה <code class=\"tok\" dir=\"ltr\">Deep</code> הבאה מוגדרת כך, מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep&amp; o) : p(new int(*o.p)) {}\n    Deep&amp; operator=(const Deep&amp; o) {\n        if (this != &amp;o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(5);\n    Deep b = a;\n    *b.p = 9;\n    cout &lt;&lt; *a.p &lt;&lt; *b.p;\n}</code></pre>",
      "explanationHtml": "בנאי ההעתקה מקצה בלוק חדש ומעתיק אליו את התוכן, ולכן <code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> עצמאיים. אחרי <code class=\"tok\" dir=\"ltr\">*b.p = 9</code> ערכו של <code class=\"tok\" dir=\"ltr\">a</code> נשאר 5 וערכו של <code class=\"tok\" dir=\"ltr\">b</code> הוא 9: <code class=\"tok\" dir=\"ltr\">59</code>. התשובה <code class=\"tok\" dir=\"ltr\">99</code> היא מה שהיה קורה בהעתקה רדודה.",
      "recapHtml": "העתקה עמוקה = בלוק חדש לכל עותק"
     },
     {
      "id": "C05-Q2",
      "question": "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית?\n```cpp\nstruct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep& o) : p(new int(*o.p)) {}\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(1), b(2);\n    a = b;\n    *b.p = 7;\n    cout << *a.p << *b.p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`77`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">77</code>"
       },
       {
        "id": "b",
        "value": "`27`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">27</code>"
       },
       {
        "id": "c",
        "value": "`17`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">17</code>"
       },
       {
        "id": "d",
        "value": "`22`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">22</code>"
       }
      ],
      "correctId": "b",
      "explanation": "אופרטור ההשמה משחרר את הבלוק הישן של `a` ומקצה אחד חדש עם התוכן 2. לכן `a` ו-`b` עצמאיים: הכתיבה `*b.p = 7` לא משנה את `a`. הפלט `27`. התשובה `77` מתאימה להשמה רדודה.",
      "recap": "השמה עמוקה: משחררים ישן, מקצים חדש, מעתיקים",
      "questionHtml": "בהנחה שהמחלקה <code class=\"tok\" dir=\"ltr\">Deep</code> הבאה מוגדרת כך, מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep&amp; o) : p(new int(*o.p)) {}\n    Deep&amp; operator=(const Deep&amp; o) {\n        if (this != &amp;o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(1), b(2);\n    a = b;\n    *b.p = 7;\n    cout &lt;&lt; *a.p &lt;&lt; *b.p;\n}</code></pre>",
      "explanationHtml": "אופרטור ההשמה משחרר את הבלוק הישן של <code class=\"tok\" dir=\"ltr\">a</code> ומקצה אחד חדש עם התוכן 2. לכן <code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> עצמאיים: הכתיבה <code class=\"tok\" dir=\"ltr\">*b.p = 7</code> לא משנה את <code class=\"tok\" dir=\"ltr\">a</code>. הפלט <code class=\"tok\" dir=\"ltr\">27</code>. התשובה <code class=\"tok\" dir=\"ltr\">77</code> מתאימה להשמה רדודה.",
      "recapHtml": "השמה עמוקה: משחררים ישן, מקצים חדש, מעתיקים"
     },
     {
      "id": "C05-Q3",
      "question": "נתונה המחלקה הבאה, והתכנית משתמשת גם ב-`X b = a;` וגם ב-`c = a;` (כש-`c` כבר קיים). מה צריך להוסיף למחלקה כדי שלא ישוחרר אותו בלוק פעמיים?\n```cpp\nclass X {\npublic:\n    X(int i = 0) { p = new int(i); }\n    ~X() { delete p; }\n    int* p;\n};\n```",
      "options": [
       {
        "id": "a",
        "value": "רק בנאי העתקה עמוק",
        "type": "text",
        "html": "רק בנאי העתקה עמוק"
       },
       {
        "id": "b",
        "value": "רק אופרטור השמה עמוק",
        "type": "text",
        "html": "רק אופרטור השמה עמוק"
       },
       {
        "id": "c",
        "value": "גם בנאי העתקה עמוק וגם אופרטור השמה עמוק",
        "type": "text",
        "html": "גם בנאי העתקה עמוק וגם אופרטור השמה עמוק"
       },
       {
        "id": "d",
        "value": "אין צורך להוסיף כלום, ברירת המחדל מספיקה",
        "type": "text",
        "html": "אין צורך להוסיף כלום, ברירת המחדל מספיקה"
       }
      ],
      "correctId": "c",
      "explanation": "ההורס משחרר את `p`, ולכן כל אובייקט חייב להחזיק בלוק משלו. `X b = a;` עובר דרך בנאי ההעתקה ו-`c = a;` דרך אופרטור ההשמה. אם חסר אחד מהם, אחד המסלולים משתף את המצביע וההורסים ישחררו אותו בלוק פעמיים. צריך את שניהם.",
      "recap": "הורס עם delete => צריך גם בנאי העתקה וגם השמה",
      "questionHtml": "נתונה המחלקה הבאה, והתכנית משתמשת גם ב-<code class=\"tok\" dir=\"ltr\">X b = a;</code> וגם ב-<code class=\"tok\" dir=\"ltr\">c = a;</code> (כש-<code class=\"tok\" dir=\"ltr\">c</code> כבר קיים). מה צריך להוסיף למחלקה כדי שלא ישוחרר אותו בלוק פעמיים?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>class X {\npublic:\n    X(int i = 0) { p = new int(i); }\n    ~X() { delete p; }\n    int* p;\n};</code></pre>",
      "explanationHtml": "ההורס משחרר את <code class=\"tok\" dir=\"ltr\">p</code>, ולכן כל אובייקט חייב להחזיק בלוק משלו. <code class=\"tok\" dir=\"ltr\">X b = a;</code> עובר דרך בנאי ההעתקה ו-<code class=\"tok\" dir=\"ltr\">c = a;</code> דרך אופרטור ההשמה. אם חסר אחד מהם, אחד המסלולים משתף את המצביע וההורסים ישחררו אותו בלוק פעמיים. צריך את שניהם.",
      "recapHtml": "הורס עם delete =&gt; צריך גם בנאי העתקה וגם השמה"
     },
     {
      "id": "C05-Q4",
      "question": "במחלקה עם מצביע כותבים את אופרטור ההשמה כך: קודם `delete p;` ואחר כך `p = new int(*o.p);`, **בלי** הבדיקה `if (this != &o)`. מה הבעיה בהשמה עצמית `a = a;`?",
      "options": [
       {
        "id": "a",
        "value": "אין בעיה, ההשמה העצמית פשוט לא משנה כלום",
        "type": "text",
        "html": "אין בעיה, ההשמה העצמית פשוט לא משנה כלום"
       },
       {
        "id": "b",
        "value": "הבלוק נמחק לפני שמעתיקים ממנו, ולכן מעתיקים נתונים ששוחררו",
        "type": "text",
        "html": "הבלוק נמחק לפני שמעתיקים ממנו, ולכן מעתיקים נתונים ששוחררו"
       },
       {
        "id": "c",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       },
       {
        "id": "d",
        "value": "הבנאי נקרא פעם נוספת",
        "type": "text",
        "html": "הבנאי נקרא פעם נוספת"
       }
      ],
      "correctId": "b",
      "explanation": "בהשמה עצמית `o` הוא אותו אובייקט כמו `*this`. אחרי `delete p;` גם `o.p` מצביע לבלוק ששוחרר, והשורה `new int(*o.p)` קוראת ממנו. לכן צריך את הבדיקה `this != &o`, או לכתוב קודם עותק ורק אחר כך לשחרר.",
      "recap": "בלי this != &o, השמה עצמית קוראת זיכרון ששוחרר",
      "questionHtml": "במחלקה עם מצביע כותבים את אופרטור ההשמה כך: קודם <code class=\"tok\" dir=\"ltr\">delete p;</code> ואחר כך <code class=\"tok\" dir=\"ltr\">p = new int(*o.p);</code>, <strong>בלי</strong> הבדיקה <code class=\"tok\" dir=\"ltr\">if (this != &amp;o)</code>. מה הבעיה בהשמה עצמית <code class=\"tok\" dir=\"ltr\">a = a;</code>?",
      "explanationHtml": "בהשמה עצמית <code class=\"tok\" dir=\"ltr\">o</code> הוא אותו אובייקט כמו <code class=\"tok\" dir=\"ltr\">*this</code>. אחרי <code class=\"tok\" dir=\"ltr\">delete p;</code> גם <code class=\"tok\" dir=\"ltr\">o.p</code> מצביע לבלוק ששוחרר, והשורה <code class=\"tok\" dir=\"ltr\">new int(*o.p)</code> קוראת ממנו. לכן צריך את הבדיקה <code class=\"tok\" dir=\"ltr\">this != &amp;o</code>, או לכתוב קודם עותק ורק אחר כך לשחרר.",
      "recapHtml": "בלי this != &amp;o, השמה עצמית קוראת זיכרון ששוחרר"
     },
     {
      "id": "C05-Q5",
      "question": "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית? (`allocs` סופר כמה בלוקים הוקצו.)\n```cpp\nstruct Deep {\n    static int allocs;\n    int* p;\n    Deep(int v) : p(new int(v)) { allocs++; }\n    Deep(const Deep& o) : p(new int(*o.p)) { allocs++; }\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); allocs++; }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint Deep::allocs = 0;\nint main() {\n    Deep a(1);\n    Deep b = a;\n    Deep c(2);\n    c = a;\n    cout << Deep::allocs;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2</code>"
       },
       {
        "id": "b",
        "value": "`3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3</code>"
       },
       {
        "id": "c",
        "value": "`4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">4</code>"
       },
       {
        "id": "d",
        "value": "`5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">5</code>"
       }
      ],
      "correctId": "c",
      "explanation": "כל פעולה מקצה בלוק אחד חדש: הבנאי של `a` (1), בנאי ההעתקה של `b` (2), הבנאי של `c` (3), וההשמה `c = a;` שמשחררת את הבלוק הישן ומקצה חדש (4). סה\"כ 4.",
      "recap": "בנאי, בנאי העתקה והשמה מקצים בלוק חדש כל אחד",
      "questionHtml": "בהנחה שהמחלקה <code class=\"tok\" dir=\"ltr\">Deep</code> הבאה מוגדרת כך, מה מדפיסה התכנית? (<code class=\"tok\" dir=\"ltr\">allocs</code> סופר כמה בלוקים הוקצו.)<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct Deep {\n    static int allocs;\n    int* p;\n    Deep(int v) : p(new int(v)) { allocs++; }\n    Deep(const Deep&amp; o) : p(new int(*o.p)) { allocs++; }\n    Deep&amp; operator=(const Deep&amp; o) {\n        if (this != &amp;o) { delete p; p = new int(*o.p); allocs++; }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint Deep::allocs = 0;\nint main() {\n    Deep a(1);\n    Deep b = a;\n    Deep c(2);\n    c = a;\n    cout &lt;&lt; Deep::allocs;\n}</code></pre>",
      "explanationHtml": "כל פעולה מקצה בלוק אחד חדש: הבנאי של <code class=\"tok\" dir=\"ltr\">a</code> (1), בנאי ההעתקה של <code class=\"tok\" dir=\"ltr\">b</code> (2), הבנאי של <code class=\"tok\" dir=\"ltr\">c</code> (3), וההשמה <code class=\"tok\" dir=\"ltr\">c = a;</code> שמשחררת את הבלוק הישן ומקצה חדש (4). סה\"כ 4.",
      "recapHtml": "בנאי, בנאי העתקה והשמה מקצים בלוק חדש כל אחד"
     },
     {
      "id": "C05-Q6",
      "question": "בהנחה שהמחלקה `Deep` הבאה מוגדרת כך, מה מדפיסה התכנית?\n```cpp\nstruct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep& o) : p(new int(*o.p)) {}\n    Deep& operator=(const Deep& o) {\n        if (this != &o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(1), b(2), c(3);\n    a = b = c;\n    *c.p = 0;\n    cout << *a.p << *b.p << *c.p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`330`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">330</code>"
       },
       {
        "id": "b",
        "value": "`000`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">000</code>"
       },
       {
        "id": "c",
        "value": "`123`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">123</code>"
       },
       {
        "id": "d",
        "value": "`333`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">333</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הפעולה `a = b = c` מתבצעת מימין לשמאל, וכל השמה מעתיקה לבלוק נפרד. אחרי השרשרת הערך בכל שלושה הוא 3. השינוי `*c.p = 0` נוגע רק ב-`c`, ולכן `330`.",
      "recap": "שרשרת השמה עמוקה: כל אובייקט מחזיק עותק נפרד",
      "questionHtml": "בהנחה שהמחלקה <code class=\"tok\" dir=\"ltr\">Deep</code> הבאה מוגדרת כך, מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct Deep {\n    int* p;\n    Deep(int v) : p(new int(v)) {}\n    Deep(const Deep&amp; o) : p(new int(*o.p)) {}\n    Deep&amp; operator=(const Deep&amp; o) {\n        if (this != &amp;o) { delete p; p = new int(*o.p); }\n        return *this;\n    }\n    ~Deep() { delete p; }\n};\nint main() {\n    Deep a(1), b(2), c(3);\n    a = b = c;\n    *c.p = 0;\n    cout &lt;&lt; *a.p &lt;&lt; *b.p &lt;&lt; *c.p;\n}</code></pre>",
      "explanationHtml": "הפעולה <code class=\"tok\" dir=\"ltr\">a = b = c</code> מתבצעת מימין לשמאל, וכל השמה מעתיקה לבלוק נפרד. אחרי השרשרת הערך בכל שלושה הוא 3. השינוי <code class=\"tok\" dir=\"ltr\">*c.p = 0</code> נוגע רק ב-<code class=\"tok\" dir=\"ltr\">c</code>, ולכן <code class=\"tok\" dir=\"ltr\">330</code>.",
      "recapHtml": "שרשרת השמה עמוקה: כל אובייקט מחזיק עותק נפרד"
     }
    ]
   },
   {
    "id": "C06",
    "order": 6,
    "icon": "🧬",
    "title": "העתקה בירושה ובהכלה",
    "goal": "לעקוב אחרי מה נקרא כשמעתיקים אובייקט עם בסיס או עם שדות אובייקט.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>בירושה ובהכלה, ההעתקה \"נשפכת\" לחלקים של האובייקט:</p>\n<ul>\n<li><b>בנאי העתקה והשמה אוטומטיים של מחלקה נגזרת</b> קוראים לבנאי ההעתקה (ולאופרטור ההשמה) של מחלקת הבסיס ושל כל שדה אובייקט.</li>\n<li><b>בנאי העתקה שכתבתם בעצמכם</b> לא קורא לבסיס בעצמו. אם לא כתבתם <code>: Base(o)</code> ברשימת האתחול, מחלקת הבסיס נבנית ב<b>בנאי ברירת המחדל</b> שלה, ושדות האובייקט נבנים גם הם בבנאי ברירת מחדל.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>בנאי העתקה ידני צריך להעביר הלאה:</b> <code>B(const B&amp; o) : A(o), m(o.m) {}</code>. מה שלא ברשימת האתחול נבנה כברירת מחדל.</div>\n<div class=\"lesson-ex\"><pre>struct A { A() { cout &lt;&lt; \"Ad \"; } A(const A&amp;) { cout &lt;&lt; \"Ac \"; } };\nstruct B : A { B() {} B(const B&amp; o) : A(o) {} };\nB b1;      // Ad\nB b2 = b1; // Ac</pre></div>\n<div class=\"lesson-trap\">⚠️ <b>כשהנגזרת לא כתבה השמה</b>, ההשמה האוטומטית שלה קוראת להשמה של הבסיס, ולכן אם הבסיס שינה משהו בהשמה (למשל הוסיף ערך), זה קורה גם בהשמה של הנגזרת.</div>\n"
    },
    "questions": [
     {
      "id": "C06-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    A() { cout << \"Ad \"; }\n    A(const A&) { cout << \"Ac \"; }\n};\nstruct B : A {\n    B() {}\n    B(const B& o) { cout << \"Bc \"; }\n};\nint main() {\n    B b1;\n    B b2 = b1;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Ad Ac Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Ac Bc</code>"
       },
       {
        "id": "b",
        "value": "`Ad Ad Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Ad Bc</code>"
       },
       {
        "id": "c",
        "value": "`Ad Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Bc</code>"
       },
       {
        "id": "d",
        "value": "`Ad Ad Ac Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Ad Ac Bc</code>"
       }
      ],
      "correctId": "b",
      "explanation": "`B b1;` בונה את הבסיס בבנאי ברירת המחדל (`Ad`). בבנאי ההעתקה של `B` שכתבנו אין `: A(o)`, ולכן חלק ה-`A` של `b2` נבנה בבנאי ברירת המחדל (`Ad` שוב), ורק אחר כך רץ גוף הבנאי (`Bc`). בנאי העתקה של `A` לא נקרא בכלל.",
      "recap": "בנאי העתקה ידני בלי A(o) בונה את הבסיס כברירת מחדל",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    A() { cout &lt;&lt; \"Ad \"; }\n    A(const A&amp;) { cout &lt;&lt; \"Ac \"; }\n};\nstruct B : A {\n    B() {}\n    B(const B&amp; o) { cout &lt;&lt; \"Bc \"; }\n};\nint main() {\n    B b1;\n    B b2 = b1;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">B b1;</code> בונה את הבסיס בבנאי ברירת המחדל (<code class=\"tok\" dir=\"ltr\">Ad</code>). בבנאי ההעתקה של <code class=\"tok\" dir=\"ltr\">B</code> שכתבנו אין <code class=\"tok\" dir=\"ltr\">: A(o)</code>, ולכן חלק ה-<code class=\"tok\" dir=\"ltr\">A</code> של <code class=\"tok\" dir=\"ltr\">b2</code> נבנה בבנאי ברירת המחדל (<code class=\"tok\" dir=\"ltr\">Ad</code> שוב), ורק אחר כך רץ גוף הבנאי (<code class=\"tok\" dir=\"ltr\">Bc</code>). בנאי העתקה של <code class=\"tok\" dir=\"ltr\">A</code> לא נקרא בכלל.",
      "recapHtml": "בנאי העתקה ידני בלי A(o) בונה את הבסיס כברירת מחדל"
     },
     {
      "id": "C06-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    A() { cout << \"Ad \"; }\n    A(const A&) { cout << \"Ac \"; }\n};\nstruct B : A {\n    B() {}\n    B(const B& o) : A(o) { cout << \"Bc \"; }\n};\nint main() {\n    B b1;\n    B b2 = b1;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Ad Ad Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Ad Bc</code>"
       },
       {
        "id": "b",
        "value": "`Ad Ac Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Ac Bc</code>"
       },
       {
        "id": "c",
        "value": "`Ad Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ad Bc</code>"
       },
       {
        "id": "d",
        "value": "`Ac Bc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Ac Bc</code>"
       }
      ],
      "correctId": "b",
      "explanation": "`b1` בונה את הבסיס כברירת מחדל (`Ad`). בבנאי ההעתקה של `B` רשימת האתחול `: A(o)` קוראת לבנאי ההעתקה של `A` (`Ac`) לפני גוף הבנאי (`Bc`).",
      "recap": "A(o) ברשימת האתחול מעביר את ההעתקה לבסיס",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    A() { cout &lt;&lt; \"Ad \"; }\n    A(const A&amp;) { cout &lt;&lt; \"Ac \"; }\n};\nstruct B : A {\n    B() {}\n    B(const B&amp; o) : A(o) { cout &lt;&lt; \"Bc \"; }\n};\nint main() {\n    B b1;\n    B b2 = b1;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">b1</code> בונה את הבסיס כברירת מחדל (<code class=\"tok\" dir=\"ltr\">Ad</code>). בבנאי ההעתקה של <code class=\"tok\" dir=\"ltr\">B</code> רשימת האתחול <code class=\"tok\" dir=\"ltr\">: A(o)</code> קוראת לבנאי ההעתקה של <code class=\"tok\" dir=\"ltr\">A</code> (<code class=\"tok\" dir=\"ltr\">Ac</code>) לפני גוף הבנאי (<code class=\"tok\" dir=\"ltr\">Bc</code>).",
      "recapHtml": "A(o) ברשימת האתחול מעביר את ההעתקה לבסיס"
     },
     {
      "id": "C06-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct M {\n    M() { cout << \"m \"; }\n    M(const M&) { cout << \"mc \"; }\n};\nstruct W {\n    M m;\n    int x;\n};\nint main() {\n    W a;\n    W b = a;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`m mc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m mc</code>"
       },
       {
        "id": "b",
        "value": "`m m`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m m</code>"
       },
       {
        "id": "c",
        "value": "`m`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m</code>"
       },
       {
        "id": "d",
        "value": "`mc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">mc</code>"
       }
      ],
      "correctId": "a",
      "explanation": "לשדה `m` יש בנאי העתקה משלו. ל-`W` אין בנאי העתקה כתוב, ולכן זה האוטומטי, והוא מעתיק את השדה בבנאי ההעתקה שלו. ההדפסה: `m` בבנייה של `a`, ואחר כך `mc` בהעתקה ל-`b`.",
      "recap": "בנאי העתקה אוטומטי מעתיק כל שדה אובייקט בבנאי ההעתקה שלו",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct M {\n    M() { cout &lt;&lt; \"m \"; }\n    M(const M&amp;) { cout &lt;&lt; \"mc \"; }\n};\nstruct W {\n    M m;\n    int x;\n};\nint main() {\n    W a;\n    W b = a;\n}</code></pre>",
      "explanationHtml": "לשדה <code class=\"tok\" dir=\"ltr\">m</code> יש בנאי העתקה משלו. ל-<code class=\"tok\" dir=\"ltr\">W</code> אין בנאי העתקה כתוב, ולכן זה האוטומטי, והוא מעתיק את השדה בבנאי ההעתקה שלו. ההדפסה: <code class=\"tok\" dir=\"ltr\">m</code> בבנייה של <code class=\"tok\" dir=\"ltr\">a</code>, ואחר כך <code class=\"tok\" dir=\"ltr\">mc</code> בהעתקה ל-<code class=\"tok\" dir=\"ltr\">b</code>.",
      "recapHtml": "בנאי העתקה אוטומטי מעתיק כל שדה אובייקט בבנאי ההעתקה שלו"
     },
     {
      "id": "C06-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct M {\n    M() { cout << \"m \"; }\n    M(const M&) { cout << \"mc \"; }\n};\nstruct W {\n    M m;\n    W() {}\n    W(const W& o) { cout << \"Wc \"; }\n};\nint main() {\n    W a;\n    W b = a;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`m mc Wc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m mc Wc</code>"
       },
       {
        "id": "b",
        "value": "`m Wc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m Wc</code>"
       },
       {
        "id": "c",
        "value": "`m m Wc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m m Wc</code>"
       },
       {
        "id": "d",
        "value": "`m Wc mc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">m Wc mc</code>"
       }
      ],
      "correctId": "c",
      "explanation": "`W a;` בונה את השדה `m` ומדפיס `m`. בבנאי ההעתקה שכתבנו, `m` לא מופיע ברשימת האתחול, ולכן הוא נבנה בבנאי ברירת המחדל שלו (`m` שוב), ורק אחר כך רץ גוף הבנאי (`Wc`). בנאי ההעתקה של `M` לא נקרא.",
      "recap": "שדה שלא ברשימת האתחול של בנאי העתקה ידני נבנה כברירת מחדל",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct M {\n    M() { cout &lt;&lt; \"m \"; }\n    M(const M&amp;) { cout &lt;&lt; \"mc \"; }\n};\nstruct W {\n    M m;\n    W() {}\n    W(const W&amp; o) { cout &lt;&lt; \"Wc \"; }\n};\nint main() {\n    W a;\n    W b = a;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">W a;</code> בונה את השדה <code class=\"tok\" dir=\"ltr\">m</code> ומדפיס <code class=\"tok\" dir=\"ltr\">m</code>. בבנאי ההעתקה שכתבנו, <code class=\"tok\" dir=\"ltr\">m</code> לא מופיע ברשימת האתחול, ולכן הוא נבנה בבנאי ברירת המחדל שלו (<code class=\"tok\" dir=\"ltr\">m</code> שוב), ורק אחר כך רץ גוף הבנאי (<code class=\"tok\" dir=\"ltr\">Wc</code>). בנאי ההעתקה של <code class=\"tok\" dir=\"ltr\">M</code> לא נקרא.",
      "recapHtml": "שדה שלא ברשימת האתחול של בנאי העתקה ידני נבנה כברירת מחדל"
     },
     {
      "id": "C06-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    int na;\n    A(int i) { na = i; }\n    A& operator=(const A& a) {\n        na = a.na + 10;\n        return *this;\n    }\n};\nstruct B : A {\n    int nb;\n    B(int i, int j) : A(j) { nb = i; }\n};\nint main() {\n    B b1(1, 2);\n    B b2(3, 4);\n    b2 = b1;\n    cout << b2.nb << b2.na;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`34`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">34</code>"
       },
       {
        "id": "b",
        "value": "`12`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">12</code>"
       },
       {
        "id": "c",
        "value": "`112`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">112</code>"
       },
       {
        "id": "d",
        "value": "`312`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">312</code>"
       }
      ],
      "correctId": "c",
      "explanation": "ל-`B` אין השמה משלה, ולכן ההשמה האוטומטית שלה קוראת להשמה של `A` על חלק הבסיס (`na = 2 + 10 = 12`), ומעתיקה את `nb` כרגיל (1). הפלט: `1` ואחריו `12`, כלומר `112`.",
      "recap": "ההשמה האוטומטית של נגזרת קוראת להשמה של הבסיס",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    int na;\n    A(int i) { na = i; }\n    A&amp; operator=(const A&amp; a) {\n        na = a.na + 10;\n        return *this;\n    }\n};\nstruct B : A {\n    int nb;\n    B(int i, int j) : A(j) { nb = i; }\n};\nint main() {\n    B b1(1, 2);\n    B b2(3, 4);\n    b2 = b1;\n    cout &lt;&lt; b2.nb &lt;&lt; b2.na;\n}</code></pre>",
      "explanationHtml": "ל-<code class=\"tok\" dir=\"ltr\">B</code> אין השמה משלה, ולכן ההשמה האוטומטית שלה קוראת להשמה של <code class=\"tok\" dir=\"ltr\">A</code> על חלק הבסיס (<code class=\"tok\" dir=\"ltr\">na = 2 + 10 = 12</code>), ומעתיקה את <code class=\"tok\" dir=\"ltr\">nb</code> כרגיל (1). הפלט: <code class=\"tok\" dir=\"ltr\">1</code> ואחריו <code class=\"tok\" dir=\"ltr\">12</code>, כלומר <code class=\"tok\" dir=\"ltr\">112</code>.",
      "recapHtml": "ההשמה האוטומטית של נגזרת קוראת להשמה של הבסיס"
     }
    ]
   },
   {
    "id": "C07",
    "order": 7,
    "icon": "🏆",
    "title": "מבחן גמר: בנאי העתקה והשמה",
    "goal": "לפתור שאלות אמיתיות מהמבחנים על בנאי העתקה והשמה.",
    "source": "ai-verified",
    "boss": true,
    "lesson": {
     "html": "\n<p>בשאלות המבחן על בנאי העתקה והשמה, שלוש שאלות מספיקות כדי לפתור כמעט הכול:</p>\n<ol>\n<li><b>האם האובייקט נוצר בשורה הזאת?</b> כן = בנאי (העתקה אם מקבל אובייקט). לא = השמה.</li>\n<li><b>האם מופיע טיפוס חשוף</b> (בלי <code>&amp;</code> ובלי <code>*</code>) בפרמטר או בהחזרה? כן = עותק.</li>\n<li><b>האם יש מצביע שהוקצה ב-<code>new</code>?</b> כן = צריך הורס, בנאי העתקה והשמה.</li>\n</ol>\n<div class=\"lesson-rule\">🔑 סופרים שורה אחרי שורה, ומסמנים ליד כל שורה מי נקרא: בנאי רגיל, בנאי העתקה, השמה או הורס.</div>\n<div class=\"lesson-trap\">⚠️ <b>מבחנים ישנים</b> סופרים לפעמים העתקה שמ-C++17 לא קורית (<code>return T();</code>). אם השאלה אומרת \"בהכרח\", לא סופרים העתקה שהקומפיילר רשאי לבטל.</div>\n"
    },
    "questions": [
     {
      "bankId": "19A-A-Q9",
      "recap": "השמה בין אובייקטים קיימים לא קוראת לבנאי העתקה.",
      "recapHtml": "השמה בין אובייקטים קיימים לא קוראת לבנאי העתקה."
     },
     {
      "bankId": "19A-A-Q21",
      "recap": "השמה: T& operator=(const T&).",
      "recapHtml": "השמה: T&amp; operator=(const T&amp;)."
     },
     {
      "bankId": "23S-A-Q2",
      "recap": "בנאי העתקה חוקי מקבל הפניה, לא ערך ולא מצביע.",
      "recapHtml": "בנאי העתקה חוקי מקבל הפניה, לא ערך ולא מצביע."
     },
     {
      "bankId": "23B-B-Q9",
      "recap": "פרמטר לפי ערך והחזרה לפי ערך מעתיקים; הפניה לא.",
      "recapHtml": "פרמטר לפי ערך והחזרה לפי ערך מעתיקים; הפניה לא."
     },
     {
      "bankId": "25B-A-Q11",
      "recap": "מעקב אחרי בנאי העתקה והחזרה של *this לפי ערך.",
      "recapHtml": "מעקב אחרי בנאי העתקה והחזרה של *this לפי ערך."
     }
    ]
   }
  ]
 },
 "ctor_order": {
  "levels": [
   {
    "id": "C01",
    "order": 1,
    "icon": "⬆️",
    "title": "האב נבנה לפני הנגזרת",
    "goal": "לכתוב בסדר הנכון את ההדפסות של בנאים והורסים במחלקה ובמחלקת האב שלה.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>כשיוצרים אובייקט ממחלקה נגזרת, הוא בנוי משני חלקים: החלק של מחלקת האב והחלק של הנגזרת. הנגזרת נשענת על האב, ולכן האב חייב להיות מוכן קודם.</p>\n<table>\n<thead><tr><th>שלב</th><th>בנייה</th><th>הריסה</th></tr></thead>\n<tbody>\n<tr><td>ראשון</td><td>בנאי של האב</td><td>הורס של הנגזרת</td></tr>\n<tr><td>שני</td><td>בנאי של הנגזרת</td><td>הורס של האב</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>בונים מלמעלה למטה והורסים מלמטה למעלה.</b> סדר ההריסה הוא תמיד ההפוך המדויק של סדר הבנייה.</div>\n<div class=\"lesson-ex\">כל בנאי והורס מדפיסים את שם המחלקה:\n<pre>struct A { A() { cout &lt;&lt; \"A \"; }  ~A() { cout &lt;&lt; \"~A \"; } };\nstruct B : A { B() { cout &lt;&lt; \"B \"; }  ~B() { cout &lt;&lt; \"~B \"; } };\nint main() { B b; }</pre>\nהפלט: <code>A B ~B ~A</code>. קודם הבנאי של <code>A</code> מסיים, ואז גוף הבנאי של <code>B</code> רץ. ההריסה הפוכה.</div>\n<p>אם הנגזרת לא כתבה ברשימת האתחול איזה בנאי של האב לקרוא, נקרא <b>בנאי ברירת המחדל של האב</b>, גם כשבנאי הנגזרת מקבל פרמטרים. כדי לבחור בנאי אחר של האב כותבים אותו ברשימת האתחול: <code>B() : A(7) { ... }</code>.</p>\n<div class=\"lesson-trap\">⚠️ אם לאב אין בנאי ברירת מחדל והנגזרת לא קוראת במפורש לבנאי אחר שלו, התכנית לא מתקמפלת.</div>\n"
    },
    "questions": [
     {
      "id": "C01-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nint main() {\n    B b;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B ~B ~A</code>"
       },
       {
        "id": "b",
        "value": "`B A ~A ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A ~A ~B</code>"
       },
       {
        "id": "c",
        "value": "`A B ~A ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B ~A ~B</code>"
       },
       {
        "id": "d",
        "value": "`B A ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A ~B ~A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "האב נבנה ראשון (`A`) ואחריו הנגזרת (`B`). ההריסה הפוכה: קודם `~B` ואז `~A`. התשובה `B A ~A ~B` הופכת את שני הסדרים. `A B ~A ~B` בונה נכון אבל הורסת בסדר הבנייה עצמו. `B A ~B ~A` הופכת רק את הבנייה.",
      "recap": "בנייה: אב ואז נגזרת. הריסה: נגזרת ואז אב",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { A() { cout &lt;&lt; \"A \"; }  ~A() { cout &lt;&lt; \"~A \"; } };\nstruct B : A { B() { cout &lt;&lt; \"B \"; }  ~B() { cout &lt;&lt; \"~B \"; } };\nint main() {\n    B b;\n}</code></pre>",
      "explanationHtml": "האב נבנה ראשון (<code class=\"tok\" dir=\"ltr\">A</code>) ואחריו הנגזרת (<code class=\"tok\" dir=\"ltr\">B</code>). ההריסה הפוכה: קודם <code class=\"tok\" dir=\"ltr\">~B</code> ואז <code class=\"tok\" dir=\"ltr\">~A</code>. התשובה <code class=\"tok\" dir=\"ltr\">B A ~A ~B</code> הופכת את שני הסדרים. <code class=\"tok\" dir=\"ltr\">A B ~A ~B</code> בונה נכון אבל הורסת בסדר הבנייה עצמו. <code class=\"tok\" dir=\"ltr\">B A ~B ~A</code> הופכת רק את הבנייה.",
      "recapHtml": "בנייה: אב ואז נגזרת. הריסה: נגזרת ואז אב"
     },
     {
      "id": "C01-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nstruct C : B { C() { cout << \"C \"; }  ~C() { cout << \"~C \"; } };\nint main() {\n    C c;\n    cout << \"| \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B C | ~C ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B C | ~C ~B ~A</code>"
       },
       {
        "id": "b",
        "value": "`C B A | ~A ~B ~C`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">C B A | ~A ~B ~C</code>"
       },
       {
        "id": "c",
        "value": "`A B C | ~A ~B ~C`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B C | ~A ~B ~C</code>"
       },
       {
        "id": "d",
        "value": "`C | A B ~A ~B ~C`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">C | A B ~A ~B ~C</code>"
       }
      ],
      "correctId": "a",
      "explanation": "שרשרת ירושה נבנית מהשורש כלפי מטה: `A`, `B`, `C`. הפס `|` מודפס רק אחרי שהבנייה הסתיימה, ואחריו ההורסים בסדר ההפוך `~C ~B ~A`.",
      "recap": "בשרשרת ירושה בונים מהשורש ומשמידים אל השורש",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { A() { cout &lt;&lt; \"A \"; }  ~A() { cout &lt;&lt; \"~A \"; } };\nstruct B : A { B() { cout &lt;&lt; \"B \"; }  ~B() { cout &lt;&lt; \"~B \"; } };\nstruct C : B { C() { cout &lt;&lt; \"C \"; }  ~C() { cout &lt;&lt; \"~C \"; } };\nint main() {\n    C c;\n    cout &lt;&lt; \"| \";\n}</code></pre>",
      "explanationHtml": "שרשרת ירושה נבנית מהשורש כלפי מטה: <code class=\"tok\" dir=\"ltr\">A</code>, <code class=\"tok\" dir=\"ltr\">B</code>, <code class=\"tok\" dir=\"ltr\">C</code>. הפס <code class=\"tok\" dir=\"ltr\">|</code> מודפס רק אחרי שהבנייה הסתיימה, ואחריו ההורסים בסדר ההפוך <code class=\"tok\" dir=\"ltr\">~C ~B ~A</code>.",
      "recapHtml": "בשרשרת ירושה בונים מהשורש ומשמידים אל השורש"
     },
     {
      "id": "C01-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nint main() {\n    A a;\n    B b;\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A A B end ~B ~A ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A B end ~B ~A ~A</code>"
       },
       {
        "id": "b",
        "value": "`A A B end ~A ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A B end ~A ~B ~A</code>"
       },
       {
        "id": "c",
        "value": "`A B end ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B end ~B ~A</code>"
       },
       {
        "id": "d",
        "value": "`A A B end ~A ~A ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A B end ~A ~A ~B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`A a;` מדפיס `A`. `B b;` מדפיס `A B` (האב ואז הנגזרת). בסוף `main` האובייקט האחרון שנוצר נהרס ראשון: `b` נהרס כ-`~B ~A`, ואחריו `a` נהרס כ-`~A`.",
      "recap": "מקומיים נהרסים בסדר הפוך ליצירתם, וכל אחד לפי כלל אב-נגזרת",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { A() { cout &lt;&lt; \"A \"; }  ~A() { cout &lt;&lt; \"~A \"; } };\nstruct B : A { B() { cout &lt;&lt; \"B \"; }  ~B() { cout &lt;&lt; \"~B \"; } };\nint main() {\n    A a;\n    B b;\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">A a;</code> מדפיס <code class=\"tok\" dir=\"ltr\">A</code>. <code class=\"tok\" dir=\"ltr\">B b;</code> מדפיס <code class=\"tok\" dir=\"ltr\">A B</code> (האב ואז הנגזרת). בסוף <code class=\"tok\" dir=\"ltr\">main</code> האובייקט האחרון שנוצר נהרס ראשון: <code class=\"tok\" dir=\"ltr\">b</code> נהרס כ-<code class=\"tok\" dir=\"ltr\">~B ~A</code>, ואחריו <code class=\"tok\" dir=\"ltr\">a</code> נהרס כ-<code class=\"tok\" dir=\"ltr\">~A</code>.",
      "recapHtml": "מקומיים נהרסים בסדר הפוך ליצירתם, וכל אחד לפי כלל אב-נגזרת"
     },
     {
      "id": "C01-Q4",
      "question": "מה מדפיסה התכנית? שימו לב לפרמטר של הבנאי של `B`.\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A {\n    B(int x) { cout << \"B\" << x << \" \"; }\n    ~B() { cout << \"~B \"; }\n};\nint main() {\n    B b(5);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B5 ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B5 ~B ~A</code>"
       },
       {
        "id": "b",
        "value": "`B5 ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B5 ~B</code>"
       },
       {
        "id": "c",
        "value": "`A5 B5 ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A5 B5 ~B ~A</code>"
       },
       {
        "id": "d",
        "value": "`B5 A ~A ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B5 A ~A ~B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הנגזרת לא כתבה איזה בנאי של האב לקרוא, ולכן נקרא בנאי ברירת המחדל `A()`, בלי קשר לכך שבנאי `B` מקבל פרמטר. האב לא יודע על ה-`5`. לכן `A B5` ובהריסה `~B ~A`. התשובה `B5 ~B` שוכחת שהאב נבנה תמיד.",
      "recap": "בלי קריאה מפורשת נקרא בנאי ברירת המחדל של האב",
      "questionHtml": "מה מדפיסה התכנית? שימו לב לפרמטר של הבנאי של <code class=\"tok\" dir=\"ltr\">B</code>.<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { A() { cout &lt;&lt; \"A \"; }  ~A() { cout &lt;&lt; \"~A \"; } };\nstruct B : A {\n    B(int x) { cout &lt;&lt; \"B\" &lt;&lt; x &lt;&lt; \" \"; }\n    ~B() { cout &lt;&lt; \"~B \"; }\n};\nint main() {\n    B b(5);\n}</code></pre>",
      "explanationHtml": "הנגזרת לא כתבה איזה בנאי של האב לקרוא, ולכן נקרא בנאי ברירת המחדל <code class=\"tok\" dir=\"ltr\">A()</code>, בלי קשר לכך שבנאי <code class=\"tok\" dir=\"ltr\">B</code> מקבל פרמטר. האב לא יודע על ה-<code class=\"tok\" dir=\"ltr\">5</code>. לכן <code class=\"tok\" dir=\"ltr\">A B5</code> ובהריסה <code class=\"tok\" dir=\"ltr\">~B ~A</code>. התשובה <code class=\"tok\" dir=\"ltr\">B5 ~B</code> שוכחת שהאב נבנה תמיד.",
      "recapHtml": "בלי קריאה מפורשת נקרא בנאי ברירת המחדל של האב"
     },
     {
      "id": "C01-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    A() { cout << \"A() \"; }\n    A(int n) { cout << \"A(\" << n << \") \"; }\n};\nstruct B : A {\n    B() : A(7) { cout << \"B \"; }\n    B(int n) { cout << \"B\" << n << \" \"; }\n};\nint main() {\n    B x;\n    B y(4);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A(7) B A() B4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A(7) B A() B4</code>"
       },
       {
        "id": "b",
        "value": "`A(7) B A(4) B4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A(7) B A(4) B4</code>"
       },
       {
        "id": "c",
        "value": "`A() B A() B4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A() B A() B4</code>"
       },
       {
        "id": "d",
        "value": "`B A(7) B4 A()`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A(7) B4 A()</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ב-`B x;` הבנאי הריק של `B` כותב `A(7)` ברשימת האתחול, ולכן נקרא `A(int)` עם 7 לפני הגוף. ב-`B y(4);` הבנאי `B(int)` לא כתב כלום, ולכן נקרא `A()` ולא `A(4)`. הפרמטר לא עובר לאב מעצמו.",
      "recap": "הפרמטר של הנגזרת לא עובר לאב אלא אם כתבו זאת ברשימת האתחול",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    A() { cout &lt;&lt; \"A() \"; }\n    A(int n) { cout &lt;&lt; \"A(\" &lt;&lt; n &lt;&lt; \") \"; }\n};\nstruct B : A {\n    B() : A(7) { cout &lt;&lt; \"B \"; }\n    B(int n) { cout &lt;&lt; \"B\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    B x;\n    B y(4);\n}</code></pre>",
      "explanationHtml": "ב-<code class=\"tok\" dir=\"ltr\">B x;</code> הבנאי הריק של <code class=\"tok\" dir=\"ltr\">B</code> כותב <code class=\"tok\" dir=\"ltr\">A(7)</code> ברשימת האתחול, ולכן נקרא <code class=\"tok\" dir=\"ltr\">A(int)</code> עם 7 לפני הגוף. ב-<code class=\"tok\" dir=\"ltr\">B y(4);</code> הבנאי <code class=\"tok\" dir=\"ltr\">B(int)</code> לא כתב כלום, ולכן נקרא <code class=\"tok\" dir=\"ltr\">A()</code> ולא <code class=\"tok\" dir=\"ltr\">A(4)</code>. הפרמטר לא עובר לאב מעצמו.",
      "recapHtml": "הפרמטר של הנגזרת לא עובר לאב אלא אם כתבו זאת ברשימת האתחול"
     },
     {
      "id": "C01-Q6",
      "question": "מה קורה בהידור של התכנית הבאה?\n```cpp\nstruct A {\n    A(int n) { cout << \"A \"; }\n};\nstruct B : A {\n    B() { cout << \"B \"; }\n};\nint main() {\n    B b;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "שגיאת קומפילציה: ל-`A` אין בנאי ברירת מחדל ו-`B` לא קוראת לבנאי אחר שלו",
        "type": "text",
        "html": "שגיאת קומפילציה: ל-<code class=\"tok\" dir=\"ltr\">A</code> אין בנאי ברירת מחדל ו-<code class=\"tok\" dir=\"ltr\">B</code> לא קוראת לבנאי אחר שלו"
       },
       {
        "id": "b",
        "value": "מודפס `A B`, כי הקומפיילר מעביר 0 לבנאי של `A`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">A B</code>, כי הקומפיילר מעביר 0 לבנאי של <code class=\"tok\" dir=\"ltr\">A</code>"
       },
       {
        "id": "c",
        "value": "מודפס `B`, כי `A` לא יכול להיבנות בלי פרמטר",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">B</code>, כי <code class=\"tok\" dir=\"ltr\">A</code> לא יכול להיבנות בלי פרמטר"
       },
       {
        "id": "d",
        "value": "מודפס `B A`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">B A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "כשכותבים בנאי עם פרמטר, הקומפיילר לא יוצר בנאי ברירת מחדל ל-`A`. הבנאי של `B` לא קורא ל-`A(int)` ברשימת האתחול, ולכן נדרש `A()` שאינו קיים: זו שגיאת קומפילציה. הקומפיילר לא ממציא ערך לפרמטר.",
      "recap": "לאב בלי בנאי ברירת מחדל חייבים לקרוא לבנאי שלו ברשימת האתחול",
      "questionHtml": "מה קורה בהידור של התכנית הבאה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    A(int n) { cout &lt;&lt; \"A \"; }\n};\nstruct B : A {\n    B() { cout &lt;&lt; \"B \"; }\n};\nint main() {\n    B b;\n}</code></pre>",
      "explanationHtml": "כשכותבים בנאי עם פרמטר, הקומפיילר לא יוצר בנאי ברירת מחדל ל-<code class=\"tok\" dir=\"ltr\">A</code>. הבנאי של <code class=\"tok\" dir=\"ltr\">B</code> לא קורא ל-<code class=\"tok\" dir=\"ltr\">A(int)</code> ברשימת האתחול, ולכן נדרש <code class=\"tok\" dir=\"ltr\">A()</code> שאינו קיים: זו שגיאת קומפילציה. הקומפיילר לא ממציא ערך לפרמטר.",
      "recapHtml": "לאב בלי בנאי ברירת מחדל חייבים לקרוא לבנאי שלו ברשימת האתחול"
     }
    ]
   },
   {
    "id": "C02",
    "order": 2,
    "icon": "🧩",
    "title": "שדות שהם אובייקטים",
    "goal": "לקבוע את סדר הבנייה וההריסה כשבמחלקה יש גם אב וגם שדות שהם אובייקטים.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>מחלקה יכולה להכיל שדות שהם עצמם אובייקטים (<code>M m;</code>). גם הם צריכים להיבנות לפני שגוף הבנאי מתחיל לרוץ, כדי שהגוף יוכל להשתמש בהם.</p>\n<table>\n<thead><tr><th>שלב</th><th>בנייה</th></tr></thead>\n<tbody>\n<tr><td>1</td><td>מחלקות האב</td></tr>\n<tr><td>2</td><td>השדות, <b>לפי סדר ההצהרה</b> במחלקה</td></tr>\n<tr><td>3</td><td>גוף הבנאי</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>אבות, שדות, גוף.</b> ההריסה הפוכה: גוף ההורס, אחריו השדות מהאחרון לראשון, ולבסוף האבות.</div>\n<div class=\"lesson-ex\">\n<pre>struct M1 { M1() { cout &lt;&lt; \"M1 \"; }  ~M1() { cout &lt;&lt; \"~M1 \"; } };\nstruct M2 { M2() { cout &lt;&lt; \"M2 \"; }  ~M2() { cout &lt;&lt; \"~M2 \"; } };\nstruct B  { B()  { cout &lt;&lt; \"B \";  }  ~B()  { cout &lt;&lt; \"~B \";  } };\nstruct D : B {\n    M1 a;\n    M2 b;\n    D()  { cout &lt;&lt; \"D \";  }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() { D d; }</pre>\nהפלט: <code>B M1 M2 D ~D ~M2 ~M1 ~B</code>.</div>\n<div class=\"lesson-trap\">⚠️ שדה שמחלקתו אין לה בנאי ברירת מחדל חייב להופיע ברשימת האתחול של הבנאי עם הארגומנטים שלו. אחרת זו שגיאת קומפילציה.</div>\n"
    },
    "questions": [
     {
      "id": "C02-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct M1 { M1() { cout << \"M1 \"; }  ~M1() { cout << \"~M1 \"; } };\nstruct M2 { M2() { cout << \"M2 \"; }  ~M2() { cout << \"~M2 \"; } };\nstruct D {\n    M1 a;\n    M2 b;\n    D()  { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`M1 M2 D ~D ~M2 ~M1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">M1 M2 D ~D ~M2 ~M1</code>"
       },
       {
        "id": "b",
        "value": "`D M1 M2 ~M2 ~M1 ~D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D M1 M2 ~M2 ~M1 ~D</code>"
       },
       {
        "id": "c",
        "value": "`M1 M2 D ~D ~M1 ~M2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">M1 M2 D ~D ~M1 ~M2</code>"
       },
       {
        "id": "d",
        "value": "`M2 M1 D ~D ~M1 ~M2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">M2 M1 D ~D ~M1 ~M2</code>"
       }
      ],
      "correctId": "a",
      "explanation": "השדות נבנים לפי סדר ההצהרה (`a` ואז `b`) לפני גוף הבנאי, ולכן `M1 M2 D`. ההריסה הפוכה: גוף ההורס `~D`, ואז `b` ואז `a`. התשובה `D M1 M2 ...` מניחה שהגוף רץ ראשון. `M1 M2 D ~D ~M1 ~M2` הורסת את השדות באותו סדר שבנתה.",
      "recap": "שדות נבנים לפני הגוף, ונהרסים אחריו בסדר הפוך",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct M1 { M1() { cout &lt;&lt; \"M1 \"; }  ~M1() { cout &lt;&lt; \"~M1 \"; } };\nstruct M2 { M2() { cout &lt;&lt; \"M2 \"; }  ~M2() { cout &lt;&lt; \"~M2 \"; } };\nstruct D {\n    M1 a;\n    M2 b;\n    D()  { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "השדות נבנים לפי סדר ההצהרה (<code class=\"tok\" dir=\"ltr\">a</code> ואז <code class=\"tok\" dir=\"ltr\">b</code>) לפני גוף הבנאי, ולכן <code class=\"tok\" dir=\"ltr\">M1 M2 D</code>. ההריסה הפוכה: גוף ההורס <code class=\"tok\" dir=\"ltr\">~D</code>, ואז <code class=\"tok\" dir=\"ltr\">b</code> ואז <code class=\"tok\" dir=\"ltr\">a</code>. התשובה <code class=\"tok\" dir=\"ltr\">D M1 M2 ...</code> מניחה שהגוף רץ ראשון. <code class=\"tok\" dir=\"ltr\">M1 M2 D ~D ~M1 ~M2</code> הורסת את השדות באותו סדר שבנתה.",
      "recapHtml": "שדות נבנים לפני הגוף, ונהרסים אחריו בסדר הפוך"
     },
     {
      "id": "C02-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nstruct M { M() { cout << \"M \"; }  ~M() { cout << \"~M \"; } };\nstruct D : B {\n    M m;\n    D()  { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B M D ~D ~M ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B M D ~D ~M ~B</code>"
       },
       {
        "id": "b",
        "value": "`M B D ~D ~B ~M`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">M B D ~D ~B ~M</code>"
       },
       {
        "id": "c",
        "value": "`B D M ~M ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D M ~M ~D ~B</code>"
       },
       {
        "id": "d",
        "value": "`B M D ~D ~B ~M`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B M D ~D ~B ~M</code>"
       }
      ],
      "correctId": "a",
      "explanation": "האב נבנה ראשון, אחריו השדה, ולבסוף גוף הבנאי של `D`: `B M D`. ההריסה היא ההפוכה: `~D`, אחריו השדה `~M`, ולבסוף האב `~B`. בתשובה `M B D` השדה נבנה לפני האב, ובתשובה `B D M ...` השדה נבנה אחרי גוף הבנאי.",
      "recap": "אבות, שדות, גוף. ובהריסה: גוף, שדות, אבות",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B { B() { cout &lt;&lt; \"B \"; }  ~B() { cout &lt;&lt; \"~B \"; } };\nstruct M { M() { cout &lt;&lt; \"M \"; }  ~M() { cout &lt;&lt; \"~M \"; } };\nstruct D : B {\n    M m;\n    D()  { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "האב נבנה ראשון, אחריו השדה, ולבסוף גוף הבנאי של <code class=\"tok\" dir=\"ltr\">D</code>: <code class=\"tok\" dir=\"ltr\">B M D</code>. ההריסה היא ההפוכה: <code class=\"tok\" dir=\"ltr\">~D</code>, אחריו השדה <code class=\"tok\" dir=\"ltr\">~M</code>, ולבסוף האב <code class=\"tok\" dir=\"ltr\">~B</code>. בתשובה <code class=\"tok\" dir=\"ltr\">M B D</code> השדה נבנה לפני האב, ובתשובה <code class=\"tok\" dir=\"ltr\">B D M ...</code> השדה נבנה אחרי גוף הבנאי.",
      "recapHtml": "אבות, שדות, גוף. ובהריסה: גוף, שדות, אבות"
     },
     {
      "id": "C02-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { A() { cout << \"A \"; }  ~A() { cout << \"~A \"; } };\nstruct B : A { B() { cout << \"B \"; }  ~B() { cout << \"~B \"; } };\nstruct C {\n    B b;\n    C()  { cout << \"C \"; }\n    ~C() { cout << \"~C \"; }\n};\nint main() {\n    C c;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B C ~C ~B ~A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B C ~C ~B ~A</code>"
       },
       {
        "id": "b",
        "value": "`C A B ~B ~A ~C`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">C A B ~B ~A ~C</code>"
       },
       {
        "id": "c",
        "value": "`B A C ~C ~A ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A C ~C ~A ~B</code>"
       },
       {
        "id": "d",
        "value": "`A B C ~A ~B ~C`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B C ~A ~B ~C</code>"
       }
      ],
      "correctId": "a",
      "explanation": "כדי לבנות את `C` צריך קודם לבנות את השדה `b`, וכדי לבנות את `b` צריך קודם את האב שלו `A`. לכן `A B` ואז גוף `C`. ההריסה הפוכה: `~C`, אחר כך `~B` של השדה, ואז `~A`.",
      "recap": "האובייקט השדה נבנה בשלמותו (כולל האב שלו) לפני גוף הבנאי",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { A() { cout &lt;&lt; \"A \"; }  ~A() { cout &lt;&lt; \"~A \"; } };\nstruct B : A { B() { cout &lt;&lt; \"B \"; }  ~B() { cout &lt;&lt; \"~B \"; } };\nstruct C {\n    B b;\n    C()  { cout &lt;&lt; \"C \"; }\n    ~C() { cout &lt;&lt; \"~C \"; }\n};\nint main() {\n    C c;\n}</code></pre>",
      "explanationHtml": "כדי לבנות את <code class=\"tok\" dir=\"ltr\">C</code> צריך קודם לבנות את השדה <code class=\"tok\" dir=\"ltr\">b</code>, וכדי לבנות את <code class=\"tok\" dir=\"ltr\">b</code> צריך קודם את האב שלו <code class=\"tok\" dir=\"ltr\">A</code>. לכן <code class=\"tok\" dir=\"ltr\">A B</code> ואז גוף <code class=\"tok\" dir=\"ltr\">C</code>. ההריסה הפוכה: <code class=\"tok\" dir=\"ltr\">~C</code>, אחר כך <code class=\"tok\" dir=\"ltr\">~B</code> של השדה, ואז <code class=\"tok\" dir=\"ltr\">~A</code>.",
      "recapHtml": "האובייקט השדה נבנה בשלמותו (כולל האב שלו) לפני גוף הבנאי"
     },
     {
      "id": "C02-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct P { P() { cout << \"P \"; }  ~P() { cout << \"~P \"; } };\nstruct Q { Q() { cout << \"Q \"; }  ~Q() { cout << \"~Q \"; } };\nstruct D {\n    P p;\n    D()  { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    Q q;\n    D d;\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Q P D end ~D ~P ~Q`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Q P D end ~D ~P ~Q</code>"
       },
       {
        "id": "b",
        "value": "`P D Q end ~Q ~D ~P`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">P D Q end ~Q ~D ~P</code>"
       },
       {
        "id": "c",
        "value": "`Q P D end ~Q ~D ~P`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Q P D end ~Q ~D ~P</code>"
       },
       {
        "id": "d",
        "value": "`Q D P end ~P ~D ~Q`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Q D P end ~P ~D ~Q</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`Q q;` נבנה ראשון. אחריו `D d;` בונה קודם את השדה `p` ורק אז את הגוף, ולכן `P D`. בסוף `main` הנהרס ראשון הוא האחרון שנבנה: `d` כ-`~D ~P`, ואחריו `q`.",
      "recap": "גם בתוך אובייקט וגם בין אובייקטים: ההריסה הפוכה לבנייה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct P { P() { cout &lt;&lt; \"P \"; }  ~P() { cout &lt;&lt; \"~P \"; } };\nstruct Q { Q() { cout &lt;&lt; \"Q \"; }  ~Q() { cout &lt;&lt; \"~Q \"; } };\nstruct D {\n    P p;\n    D()  { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    Q q;\n    D d;\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">Q q;</code> נבנה ראשון. אחריו <code class=\"tok\" dir=\"ltr\">D d;</code> בונה קודם את השדה <code class=\"tok\" dir=\"ltr\">p</code> ורק אז את הגוף, ולכן <code class=\"tok\" dir=\"ltr\">P D</code>. בסוף <code class=\"tok\" dir=\"ltr\">main</code> הנהרס ראשון הוא האחרון שנבנה: <code class=\"tok\" dir=\"ltr\">d</code> כ-<code class=\"tok\" dir=\"ltr\">~D ~P</code>, ואחריו <code class=\"tok\" dir=\"ltr\">q</code>.",
      "recapHtml": "גם בתוך אובייקט וגם בין אובייקטים: ההריסה הפוכה לבנייה"
     },
     {
      "id": "C02-Q5",
      "question": "מה קורה בהידור של התכנית הבאה?\n```cpp\nstruct M {\n    M(int n) { cout << \"M \"; }\n};\nstruct D {\n    M m;\n    D() { cout << \"D \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "שגיאת קומפילציה: אין ל-`M` בנאי ברירת מחדל, והשדה `m` לא מאותחל ברשימת האתחול",
        "type": "text",
        "html": "שגיאת קומפילציה: אין ל-<code class=\"tok\" dir=\"ltr\">M</code> בנאי ברירת מחדל, והשדה <code class=\"tok\" dir=\"ltr\">m</code> לא מאותחל ברשימת האתחול"
       },
       {
        "id": "b",
        "value": "מודפס `D`, כי `m` נשאר לא מאותחל",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">D</code>, כי <code class=\"tok\" dir=\"ltr\">m</code> נשאר לא מאותחל"
       },
       {
        "id": "c",
        "value": "מודפס `M D`, כי `n` מקבל 0",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">M D</code>, כי <code class=\"tok\" dir=\"ltr\">n</code> מקבל 0"
       },
       {
        "id": "d",
        "value": "מודפס `D M`, כי השדה נבנה אחרי הגוף",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">D M</code>, כי השדה נבנה אחרי הגוף"
       }
      ],
      "correctId": "a",
      "explanation": "כל שדה נבנה לפני הגוף, ולכן חייבים לבחור לו בנאי. ל-`M` יש רק `M(int)`, ולכן חובה לכתוב `D() : m(5) { ... }`. בלי זה אין בנאי מתאים והקוד לא מתקמפל.",
      "recap": "שדה בלי בנאי ברירת מחדל חייב להופיע ברשימת האתחול",
      "questionHtml": "מה קורה בהידור של התכנית הבאה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct M {\n    M(int n) { cout &lt;&lt; \"M \"; }\n};\nstruct D {\n    M m;\n    D() { cout &lt;&lt; \"D \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "כל שדה נבנה לפני הגוף, ולכן חייבים לבחור לו בנאי. ל-<code class=\"tok\" dir=\"ltr\">M</code> יש רק <code class=\"tok\" dir=\"ltr\">M(int)</code>, ולכן חובה לכתוב <code class=\"tok\" dir=\"ltr\">D() : m(5) { ... }</code>. בלי זה אין בנאי מתאים והקוד לא מתקמפל.",
      "recapHtml": "שדה בלי בנאי ברירת מחדל חייב להופיע ברשימת האתחול"
     }
    ]
   },
   {
    "id": "C03",
    "order": 3,
    "icon": "📜",
    "title": "רשימת האתחול לא קובעת סדר",
    "goal": "לדעת שהסדר נקבע לפי ההצהרות ולא לפי רשימת האתחול, גם בירושה מרובה.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>ברשימת האתחול אפשר לכתוב את האבות והשדות בכל סדר שרוצים. הקומפיילר מתעלם מהסדר הזה ובונה לפי כללים קבועים:</p>\n<ul>\n<li><b>אבות</b> לפי הסדר ב<b>רשימת הירושה</b>: <code>D : B1, B2</code> בונה את <code>B1</code> ואז את <code>B2</code>.</li>\n<li><b>שדות</b> לפי הסדר שבו הם <b>הוצהרו</b> בגוף המחלקה.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>הסדר נקבע בהצהרה, לא באתחול.</b> רשימת האתחול קובעת רק <i>איזה בנאי</i> ואילו ארגומנטים, לא מתי.</div>\n<div class=\"lesson-ex\">\n<pre>struct D : B1, B2 {        // bases: B1 then B2\n    M2 m2;                 // member: m2 then m1\n    M1 m1;\n    D() : m1(), m2(), B2(), B1() { cout &lt;&lt; \"D \"; }\n};</pre>\nלמרות שרשימת האתחול כתובה הפוך, הפלט הוא <code>B1 B2 M2 M1 D</code>. ההריסה: <code>~D ~M1 ~M2 ~B2 ~B1</code> (עם ההדפסות המתאימות).</div>\n<div class=\"lesson-trap\">⚠️ כשמאתחלים שדה בפונקציה שמדפיסה, ההדפסות יוצאות לפי סדר ההצהרה של השדות ולא לפי הסדר שבו כתבתם את הקריאות ברשימת האתחול.</div>\n"
    },
    "questions": [
     {
      "id": "C03-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct P {\n    int id;\n    P(int i) : id(i) { cout << \"+\" << id << \" \"; }\n    ~P() { cout << \"-\" << id << \" \"; }\n};\nstruct H {\n    P x;\n    P y;\n    H() : y(2), x(1) { cout << \"H \"; }\n    ~H() { cout << \"~H \"; }\n};\nint main() {\n    H h;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 +2 H ~H -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 H ~H -2 -1</code>"
       },
       {
        "id": "b",
        "value": "`+2 +1 H ~H -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 +1 H ~H -1 -2</code>"
       },
       {
        "id": "c",
        "value": "`+2 +1 H ~H -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 +1 H ~H -2 -1</code>"
       },
       {
        "id": "d",
        "value": "`+1 +2 H ~H -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 H ~H -1 -2</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`x` מוצהר לפני `y`, ולכן נבנה ראשון (`+1`) למרות שברשימת האתחול `y(2)` כתוב קודם. ההריסה הפוכה: `~H`, אחר כך `y` (`-2`) ואז `x` (`-1`). התשובות שמתחילות ב-`+2` קוראות את סדר הכתיבה ברשימה.",
      "recap": "שדות נבנים לפי סדר ההצהרה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct P {\n    int id;\n    P(int i) : id(i) { cout &lt;&lt; \"+\" &lt;&lt; id &lt;&lt; \" \"; }\n    ~P() { cout &lt;&lt; \"-\" &lt;&lt; id &lt;&lt; \" \"; }\n};\nstruct H {\n    P x;\n    P y;\n    H() : y(2), x(1) { cout &lt;&lt; \"H \"; }\n    ~H() { cout &lt;&lt; \"~H \"; }\n};\nint main() {\n    H h;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">x</code> מוצהר לפני <code class=\"tok\" dir=\"ltr\">y</code>, ולכן נבנה ראשון (<code class=\"tok\" dir=\"ltr\">+1</code>) למרות שברשימת האתחול <code class=\"tok\" dir=\"ltr\">y(2)</code> כתוב קודם. ההריסה הפוכה: <code class=\"tok\" dir=\"ltr\">~H</code>, אחר כך <code class=\"tok\" dir=\"ltr\">y</code> (<code class=\"tok\" dir=\"ltr\">-2</code>) ואז <code class=\"tok\" dir=\"ltr\">x</code> (<code class=\"tok\" dir=\"ltr\">-1</code>). התשובות שמתחילות ב-<code class=\"tok\" dir=\"ltr\">+2</code> קוראות את סדר הכתיבה ברשימה.",
      "recapHtml": "שדות נבנים לפי סדר ההצהרה"
     },
     {
      "id": "C03-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nint tr(const char* s, int v) { cout << s << \" \"; return v; }\nstruct S {\n    int a;\n    int b;\n    S() : b(tr(\"b\", 2)), a(tr(\"a\", 1)) { cout << \"body \"; }\n};\nint main() {\n    S s;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`a b body`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a b body</code>"
       },
       {
        "id": "b",
        "value": "`b a body`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">b a body</code>"
       },
       {
        "id": "c",
        "value": "`body a b`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">body a b</code>"
       },
       {
        "id": "d",
        "value": "`a body b`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a body b</code>"
       }
      ],
      "correctId": "a",
      "explanation": "גם שדות פשוטים מאותחלים לפי סדר ההצהרה: `a` הוצהר ראשון, ולכן הקריאה `tr(\"a\", 1)` מתבצעת ראשונה, אף שברשימה היא מופיעה שנייה. הגוף תמיד אחרי כל האתחולים.",
      "recap": "גם הערכת הארגומנטים של אתחול שדה קורית לפי סדר ההצהרה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>int tr(const char* s, int v) { cout &lt;&lt; s &lt;&lt; \" \"; return v; }\nstruct S {\n    int a;\n    int b;\n    S() : b(tr(\"b\", 2)), a(tr(\"a\", 1)) { cout &lt;&lt; \"body \"; }\n};\nint main() {\n    S s;\n}</code></pre>",
      "explanationHtml": "גם שדות פשוטים מאותחלים לפי סדר ההצהרה: <code class=\"tok\" dir=\"ltr\">a</code> הוצהר ראשון, ולכן הקריאה <code class=\"tok\" dir=\"ltr\">tr(\"a\", 1)</code> מתבצעת ראשונה, אף שברשימה היא מופיעה שנייה. הגוף תמיד אחרי כל האתחולים.",
      "recapHtml": "גם הערכת הארגומנטים של אתחול שדה קורית לפי סדר ההצהרה"
     },
     {
      "id": "C03-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B1 { B1() { cout << \"B1 \"; }  ~B1() { cout << \"~B1 \"; } };\nstruct B2 { B2() { cout << \"B2 \"; }  ~B2() { cout << \"~B2 \"; } };\nstruct D : B2, B1 {\n    D() : B1(), B2() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B2 B1 D ~D ~B1 ~B2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B2 B1 D ~D ~B1 ~B2</code>"
       },
       {
        "id": "b",
        "value": "`B1 B2 D ~D ~B2 ~B1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B1 B2 D ~D ~B2 ~B1</code>"
       },
       {
        "id": "c",
        "value": "`B2 B1 D ~D ~B2 ~B1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B2 B1 D ~D ~B2 ~B1</code>"
       },
       {
        "id": "d",
        "value": "`B1 B2 D ~D ~B1 ~B2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B1 B2 D ~D ~B1 ~B2</code>"
       }
      ],
      "correctId": "a",
      "explanation": "סדר האבות נקבע ברשימת הירושה `D : B2, B1`, לא ברשימת האתחול. לכן `B2` נבנה לפני `B1`. ההריסה הפוכה: `~D ~B1 ~B2`. התשובות שמתחילות ב-`B1` קוראות את סדר רשימת האתחול.",
      "recap": "אבות נבנים לפי רשימת הירושה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B1 { B1() { cout &lt;&lt; \"B1 \"; }  ~B1() { cout &lt;&lt; \"~B1 \"; } };\nstruct B2 { B2() { cout &lt;&lt; \"B2 \"; }  ~B2() { cout &lt;&lt; \"~B2 \"; } };\nstruct D : B2, B1 {\n    D() : B1(), B2() { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "סדר האבות נקבע ברשימת הירושה <code class=\"tok\" dir=\"ltr\">D : B2, B1</code>, לא ברשימת האתחול. לכן <code class=\"tok\" dir=\"ltr\">B2</code> נבנה לפני <code class=\"tok\" dir=\"ltr\">B1</code>. ההריסה הפוכה: <code class=\"tok\" dir=\"ltr\">~D ~B1 ~B2</code>. התשובות שמתחילות ב-<code class=\"tok\" dir=\"ltr\">B1</code> קוראות את סדר רשימת האתחול.",
      "recapHtml": "אבות נבנים לפי רשימת הירושה"
     },
     {
      "id": "C03-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct Base1 { Base1() { cout << \"Base1 \"; }  ~Base1() { cout << \"~Base1 \"; } };\nstruct Base2 { Base2() { cout << \"Base2 \"; }  ~Base2() { cout << \"~Base2 \"; } };\nstruct M1 { M1() { cout << \"M1 \"; }  ~M1() { cout << \"~M1 \"; } };\nstruct M2 { M2() { cout << \"M2 \"; }  ~M2() { cout << \"~M2 \"; } };\nstruct D : Base1, Base2 {\n    M2 m2;\n    M1 m1;\n    D() : m1(), m2(), Base2(), Base1() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Base1 Base2 M2 M1 D ~D ~M1 ~M2 ~Base2 ~Base1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Base1 Base2 M2 M1 D ~D ~M1 ~M2 ~Base2 ~Base1</code>"
       },
       {
        "id": "b",
        "value": "`Base2 Base1 M1 M2 D ~D ~M2 ~M1 ~Base1 ~Base2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Base2 Base1 M1 M2 D ~D ~M2 ~M1 ~Base1 ~Base2</code>"
       },
       {
        "id": "c",
        "value": "`M1 M2 Base2 Base1 D ~D ~Base1 ~Base2 ~M2 ~M1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">M1 M2 Base2 Base1 D ~D ~Base1 ~Base2 ~M2 ~M1</code>"
       },
       {
        "id": "d",
        "value": "`Base1 Base2 M1 M2 D ~D ~M2 ~M1 ~Base2 ~Base1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Base1 Base2 M1 M2 D ~D ~M2 ~M1 ~Base2 ~Base1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "קודם האבות לפי רשימת הירושה (`Base1`, `Base2`), אחריהם השדות לפי ההצהרה (`m2` ואז `m1`), ולבסוף הגוף. ההריסה היא ההפוכה בדיוק. התשובה `b` מציית לרשימת האתחול כולה. `c` מציבה שדות לפני אבות. `d` בונה נכון את האבות אבל את השדות לפי רשימת האתחול.",
      "recap": "אבות לפי הירושה, שדות לפי ההצהרה, אחר כך גוף",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct Base1 { Base1() { cout &lt;&lt; \"Base1 \"; }  ~Base1() { cout &lt;&lt; \"~Base1 \"; } };\nstruct Base2 { Base2() { cout &lt;&lt; \"Base2 \"; }  ~Base2() { cout &lt;&lt; \"~Base2 \"; } };\nstruct M1 { M1() { cout &lt;&lt; \"M1 \"; }  ~M1() { cout &lt;&lt; \"~M1 \"; } };\nstruct M2 { M2() { cout &lt;&lt; \"M2 \"; }  ~M2() { cout &lt;&lt; \"~M2 \"; } };\nstruct D : Base1, Base2 {\n    M2 m2;\n    M1 m1;\n    D() : m1(), m2(), Base2(), Base1() { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "קודם האבות לפי רשימת הירושה (<code class=\"tok\" dir=\"ltr\">Base1</code>, <code class=\"tok\" dir=\"ltr\">Base2</code>), אחריהם השדות לפי ההצהרה (<code class=\"tok\" dir=\"ltr\">m2</code> ואז <code class=\"tok\" dir=\"ltr\">m1</code>), ולבסוף הגוף. ההריסה היא ההפוכה בדיוק. התשובה <code class=\"tok\" dir=\"ltr\">b</code> מציית לרשימת האתחול כולה. <code class=\"tok\" dir=\"ltr\">c</code> מציבה שדות לפני אבות. <code class=\"tok\" dir=\"ltr\">d</code> בונה נכון את האבות אבל את השדות לפי רשימת האתחול.",
      "recapHtml": "אבות לפי הירושה, שדות לפי ההצהרה, אחר כך גוף"
     },
     {
      "id": "C03-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B()      { cout << \"B() \"; }\n    B(int n) { cout << \"B(\" << n << \") \"; }\n};\nstruct M {\n    M(int n) { cout << \"M\" << n << \" \"; }\n};\nstruct D : B {\n    M m1;\n    M m2;\n    D() : m2(2), B(9), m1(1) { cout << \"D \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B(9) M1 M2 D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B(9) M1 M2 D</code>"
       },
       {
        "id": "b",
        "value": "`M2 B(9) M1 D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">M2 B(9) M1 D</code>"
       },
       {
        "id": "c",
        "value": "`B() M1 M2 D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B() M1 M2 D</code>"
       },
       {
        "id": "d",
        "value": "`B(9) M2 M1 D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B(9) M2 M1 D</code>"
       }
      ],
      "correctId": "a",
      "explanation": "רשימת האתחול קובעת שהאב ייבנה עם הבנאי `B(int)` וש-`m1` ו-`m2` יקבלו 1 ו-2, אבל הסדר הוא קבוע: האב, אחריו `m1` ואז `m2` (סדר ההצהרה), ולבסוף הגוף. `B()` לא נקרא כי הבנאי בחר ב-`B(9)`.",
      "recap": "הרשימה בוחרת בנאים וארגומנטים. הסדר קבוע מראש",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B()      { cout &lt;&lt; \"B() \"; }\n    B(int n) { cout &lt;&lt; \"B(\" &lt;&lt; n &lt;&lt; \") \"; }\n};\nstruct M {\n    M(int n) { cout &lt;&lt; \"M\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nstruct D : B {\n    M m1;\n    M m2;\n    D() : m2(2), B(9), m1(1) { cout &lt;&lt; \"D \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "רשימת האתחול קובעת שהאב ייבנה עם הבנאי <code class=\"tok\" dir=\"ltr\">B(int)</code> וש-<code class=\"tok\" dir=\"ltr\">m1</code> ו-<code class=\"tok\" dir=\"ltr\">m2</code> יקבלו 1 ו-2, אבל הסדר הוא קבוע: האב, אחריו <code class=\"tok\" dir=\"ltr\">m1</code> ואז <code class=\"tok\" dir=\"ltr\">m2</code> (סדר ההצהרה), ולבסוף הגוף. <code class=\"tok\" dir=\"ltr\">B()</code> לא נקרא כי הבנאי בחר ב-<code class=\"tok\" dir=\"ltr\">B(9)</code>.",
      "recapHtml": "הרשימה בוחרת בנאים וארגומנטים. הסדר קבוע מראש"
     }
    ]
   },
   {
    "id": "C04",
    "order": 4,
    "icon": "🌍",
    "title": "גלובליים, מקומיים וסטטיים",
    "goal": "לסדר בזמן את הבנייה וההריסה של משתנים גלובליים, מקומיים וסטטיים מקומיים.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>עד עכשיו כל האובייקטים היו מקומיים ב-<code>main</code>. בתכנית אמיתית יש שלושה סוגי משתנים, ולכל אחד זמן חיים משלו:</p>\n<table>\n<thead><tr><th>סוג</th><th>נבנה</th><th>נהרס</th></tr></thead>\n<tbody>\n<tr><td>גלובלי</td><td>לפני <code>main</code>, לפי סדר ההגדרה בקובץ</td><td>אחרי <code>main</code>, בסוף התכנית</td></tr>\n<tr><td>מקומי</td><td>כשהביצוע מגיע לשורה</td><td>בסוף הבלוק, בסדר הפוך</td></tr>\n<tr><td>סטטי מקומי</td><td><b>פעם אחת</b>, בפעם הראשונה שהביצוע מגיע לשורה</td><td>בסוף התכנית</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 בסוף התכנית הגלובליים והסטטיים נהרסים <b>בסדר הפוך לסדר שבו הסתיימה בנייתם</b>. הראשון שנבנה הוא האחרון שנהרס.</div>\n<div class=\"lesson-ex\">\n<pre>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nT g(1);\nint main() {\n    T a(2);\n    static T s(3);\n}</pre>\nהפלט: <code>+1 +2 +3 -2 -3 -1</code>. הגלובלי נבנה לפני <code>main</code>. בסוף <code>main</code> נהרס המקומי <code>a</code>, ורק אחרי <code>main</code> נהרסים הסטטי ואחריו הגלובלי.</div>\n<div class=\"lesson-trap\">⚠️ סטטי מקומי בפונקציה שלא נקראה אף פעם לא נבנה בכלל, ולכן גם לא נהרס. בקריאה שנייה לאותה פונקציה הוא לא נבנה שוב.</div>\n"
    },
    "questions": [
     {
      "id": "C04-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nT g(1);\nint main() {\n    cout << \"main \";\n    T l(2);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 main +2 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 main +2 -2 -1</code>"
       },
       {
        "id": "b",
        "value": "`main +1 +2 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">main +1 +2 -2 -1</code>"
       },
       {
        "id": "c",
        "value": "`+1 main +2 -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 main +2 -1 -2</code>"
       },
       {
        "id": "d",
        "value": "`main +2 -2 +1 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">main +2 -2 +1 -1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הגלובלי `g` נבנה לפני שהביצוע נכנס ל-`main`, ולכן `+1` הוא הראשון. אחרי `main` מודפס `+2` למקומי. בסוף `main` המקומי נהרס (`-2`) ורק אחרי שהפונקציה חוזרת נהרס הגלובלי (`-1`).",
      "recap": "גלובליים נבנים לפני main ונהרסים אחרי main",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nT g(1);\nint main() {\n    cout &lt;&lt; \"main \";\n    T l(2);\n}</code></pre>",
      "explanationHtml": "הגלובלי <code class=\"tok\" dir=\"ltr\">g</code> נבנה לפני שהביצוע נכנס ל-<code class=\"tok\" dir=\"ltr\">main</code>, ולכן <code class=\"tok\" dir=\"ltr\">+1</code> הוא הראשון. אחרי <code class=\"tok\" dir=\"ltr\">main</code> מודפס <code class=\"tok\" dir=\"ltr\">+2</code> למקומי. בסוף <code class=\"tok\" dir=\"ltr\">main</code> המקומי נהרס (<code class=\"tok\" dir=\"ltr\">-2</code>) ורק אחרי שהפונקציה חוזרת נהרס הגלובלי (<code class=\"tok\" dir=\"ltr\">-1</code>).",
      "recapHtml": "גלובליים נבנים לפני main ונהרסים אחרי main"
     },
     {
      "id": "C04-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nT g1(1);\nT g2(2);\nint main() {\n    T l(3);\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 +2 +3 end -3 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 +3 end -3 -2 -1</code>"
       },
       {
        "id": "b",
        "value": "`+1 +2 +3 end -3 -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 +3 end -3 -1 -2</code>"
       },
       {
        "id": "c",
        "value": "`+3 +1 +2 end -2 -1 -3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+3 +1 +2 end -2 -1 -3</code>"
       },
       {
        "id": "d",
        "value": "`+2 +1 +3 end -3 -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 +1 +3 end -3 -1 -2</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הגלובליים נבנים בסדר ההגדרה בקובץ (`g1` ואז `g2`), ואחריהם המקומי. ההריסה: המקומי ראשון, ואז הגלובליים בסדר הפוך לבנייה, כלומר `g2` לפני `g1`.",
      "recap": "גלובליים: נבנים בסדר הקובץ, נהרסים בסדר הפוך",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nT g1(1);\nT g2(2);\nint main() {\n    T l(3);\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "הגלובליים נבנים בסדר ההגדרה בקובץ (<code class=\"tok\" dir=\"ltr\">g1</code> ואז <code class=\"tok\" dir=\"ltr\">g2</code>), ואחריהם המקומי. ההריסה: המקומי ראשון, ואז הגלובליים בסדר הפוך לבנייה, כלומר <code class=\"tok\" dir=\"ltr\">g2</code> לפני <code class=\"tok\" dir=\"ltr\">g1</code>.",
      "recapHtml": "גלובליים: נבנים בסדר הקובץ, נהרסים בסדר הפוך"
     },
     {
      "id": "C04-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    T a(1);\n    static T s(2);\n    T b(3);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 +2 +3 -3 -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 +3 -3 -1 -2</code>"
       },
       {
        "id": "b",
        "value": "`+1 +2 +3 -3 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 +3 -3 -2 -1</code>"
       },
       {
        "id": "c",
        "value": "`+2 +1 +3 -3 -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 +1 +3 -3 -1 -2</code>"
       },
       {
        "id": "d",
        "value": "`+1 +2 +3 -2 -3 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 +3 -2 -3 -1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הסטטי נבנה כשהביצוע מגיע לשורתו, בין `a` ל-`b`. בסוף `main` נהרסים המקומיים בסדר הפוך (`b` ואז `a`), והסטטי נשאר בחיים עד סוף התכנית ונהרס אחרון: `-3 -1 -2`.",
      "recap": "סטטי מקומי נבנה כשמגיעים אליו ונהרס רק בסוף התכנית",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    T a(1);\n    static T s(2);\n    T b(3);\n}</code></pre>",
      "explanationHtml": "הסטטי נבנה כשהביצוע מגיע לשורתו, בין <code class=\"tok\" dir=\"ltr\">a</code> ל-<code class=\"tok\" dir=\"ltr\">b</code>. בסוף <code class=\"tok\" dir=\"ltr\">main</code> נהרסים המקומיים בסדר הפוך (<code class=\"tok\" dir=\"ltr\">b</code> ואז <code class=\"tok\" dir=\"ltr\">a</code>), והסטטי נשאר בחיים עד סוף התכנית ונהרס אחרון: <code class=\"tok\" dir=\"ltr\">-3 -1 -2</code>.",
      "recapHtml": "סטטי מקומי נבנה כשמגיעים אליו ונהרס רק בסוף התכנית"
     },
     {
      "id": "C04-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nvoid f() {\n    T a(5);\n    static T s(6);\n}\nint main() {\n    f();\n    f();\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+5 +6 -5 +5 -5 end -6`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 +6 -5 +5 -5 end -6</code>"
       },
       {
        "id": "b",
        "value": "`+5 +6 -5 -6 +5 +6 -5 -6 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 +6 -5 -6 +5 +6 -5 -6 end</code>"
       },
       {
        "id": "c",
        "value": "`+5 +6 -5 +5 +6 -5 end -6 -6`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 +6 -5 +5 +6 -5 end -6 -6</code>"
       },
       {
        "id": "d",
        "value": "`+5 +6 -6 -5 +5 -5 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 +6 -6 -5 +5 -5 end</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בקריאה הראשונה נבנים `a` ואז הסטטי `s`, ובסוף הפונקציה נהרס רק `a`. בקריאה השנייה הסטטי כבר קיים ולא נבנה שוב, ולכן רק `+5 -5`. הסטטי נהרס בסוף התכנית, אחרי `end`.",
      "recap": "סטטי מקומי נבנה פעם אחת בלבד",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nvoid f() {\n    T a(5);\n    static T s(6);\n}\nint main() {\n    f();\n    f();\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "בקריאה הראשונה נבנים <code class=\"tok\" dir=\"ltr\">a</code> ואז הסטטי <code class=\"tok\" dir=\"ltr\">s</code>, ובסוף הפונקציה נהרס רק <code class=\"tok\" dir=\"ltr\">a</code>. בקריאה השנייה הסטטי כבר קיים ולא נבנה שוב, ולכן רק <code class=\"tok\" dir=\"ltr\">+5 -5</code>. הסטטי נהרס בסוף התכנית, אחרי <code class=\"tok\" dir=\"ltr\">end</code>.",
      "recapHtml": "סטטי מקומי נבנה פעם אחת בלבד"
     },
     {
      "id": "C04-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nvoid f() {\n    static T s(9);\n}\nT g(1);\nint main() {\n    T l(2);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 +2 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 -2 -1</code>"
       },
       {
        "id": "b",
        "value": "`+9 +1 +2 -2 -1 -9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+9 +1 +2 -2 -1 -9</code>"
       },
       {
        "id": "c",
        "value": "`+1 +2 +9 -2 -9 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 +9 -2 -9 -1</code>"
       },
       {
        "id": "d",
        "value": "`+1 +2 -2 -1 -9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 -2 -1 -9</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`f` לא נקראת אף פעם, ולכן הביצוע לא מגיע לשורת הסטטי `s` והוא לא נבנה ולא נהרס. נשארים הגלובלי והמקומי בלבד.",
      "recap": "סטטי מקומי שלא הגיעו אליו לא קיים",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nvoid f() {\n    static T s(9);\n}\nT g(1);\nint main() {\n    T l(2);\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">f</code> לא נקראת אף פעם, ולכן הביצוע לא מגיע לשורת הסטטי <code class=\"tok\" dir=\"ltr\">s</code> והוא לא נבנה ולא נהרס. נשארים הגלובלי והמקומי בלבד.",
      "recapHtml": "סטטי מקומי שלא הגיעו אליו לא קיים"
     },
     {
      "id": "C04-Q6",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nT g(1);\nvoid f() {\n    static T s(2);\n    T l(3);\n}\nint main() {\n    T a(4);\n    f();\n    static T b(5);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 +4 +2 +3 -3 +5 -4 -5 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +4 +2 +3 -3 +5 -4 -5 -2 -1</code>"
       },
       {
        "id": "b",
        "value": "`+1 +4 +2 +3 -3 +5 -4 -1 -2 -5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +4 +2 +3 -3 +5 -4 -1 -2 -5</code>"
       },
       {
        "id": "c",
        "value": "`+1 +4 +2 +3 -3 +5 -5 -4 -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +4 +2 +3 -3 +5 -5 -4 -2 -1</code>"
       },
       {
        "id": "d",
        "value": "`+4 +2 +3 -3 +5 -4 +1 -1 -2 -5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+4 +2 +3 -3 +5 -4 +1 -1 -2 -5</code>"
       }
      ],
      "correctId": "a",
      "explanation": "קודם הגלובלי `+1`. ב-`main`: `+4`, קריאה ל-`f` בונה את הסטטי `+2` ואת המקומי `+3` ומשחררת את המקומי `-3`, ואז `+5` הסטטי של `main`. בסוף `main` נהרס `a` (`-4`). אחרי `main` נהרסים הסטטיים והגלובלי בסדר הפוך לסיום בנייתם: `b` (5), אחריו `s` (2) ואז `g` (1).",
      "recap": "ההריסה בסוף התכנית: הפוך לסדר שבו הסתיימה הבנייה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nT g(1);\nvoid f() {\n    static T s(2);\n    T l(3);\n}\nint main() {\n    T a(4);\n    f();\n    static T b(5);\n}</code></pre>",
      "explanationHtml": "קודם הגלובלי <code class=\"tok\" dir=\"ltr\">+1</code>. ב-<code class=\"tok\" dir=\"ltr\">main</code>: <code class=\"tok\" dir=\"ltr\">+4</code>, קריאה ל-<code class=\"tok\" dir=\"ltr\">f</code> בונה את הסטטי <code class=\"tok\" dir=\"ltr\">+2</code> ואת המקומי <code class=\"tok\" dir=\"ltr\">+3</code> ומשחררת את המקומי <code class=\"tok\" dir=\"ltr\">-3</code>, ואז <code class=\"tok\" dir=\"ltr\">+5</code> הסטטי של <code class=\"tok\" dir=\"ltr\">main</code>. בסוף <code class=\"tok\" dir=\"ltr\">main</code> נהרס <code class=\"tok\" dir=\"ltr\">a</code> (<code class=\"tok\" dir=\"ltr\">-4</code>). אחרי <code class=\"tok\" dir=\"ltr\">main</code> נהרסים הסטטיים והגלובלי בסדר הפוך לסיום בנייתם: <code class=\"tok\" dir=\"ltr\">b</code> (5), אחריו <code class=\"tok\" dir=\"ltr\">s</code> (2) ואז <code class=\"tok\" dir=\"ltr\">g</code> (1).",
      "recapHtml": "ההריסה בסוף התכנית: הפוך לסדר שבו הסתיימה הבנייה"
     }
    ]
   },
   {
    "id": "C05",
    "order": 5,
    "icon": "⏱️",
    "title": "זמניים, מערכים ו-new",
    "goal": "לדעת מתי נהרס אובייקט זמני, באיזה סדר נבנה ונהרס מערך, ומה עושים new ו-delete.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>לא כל אובייקט מקבל שם. כמה מקרים נוספים:</p>\n<ul>\n<li><b>אובייקט זמני</b> (<code>T(8);</code> או ארגומנט <code>f(T(3))</code>): נהרס בסוף ה<b>ביטוי</b> שבו נוצר, כלומר בנקודה-פסיק.</li>\n<li><b>הפניה <code>const T&amp; r = T(9);</code></b> מאריכה את חיי הזמני עד סוף הבלוק של <code>r</code>.</li>\n<li><b>מערך</b> <code>T arr[3]</code>: האיברים נבנים לפי האינדקס (0, 1, 2) ונהרסים בסדר ההפוך.</li>\n<li><b><code>new</code></b> בונה אובייקט שחי עד שקוראים ל-<code>delete</code>. <b>בלי <code>delete</code> ההורס לא רץ בכלל</b>, גם לא בסוף התכנית.</li>\n<li><code>new T[2]</code> נהרס ב-<code>delete[]</code>, באותו סדר הפוך של מערך.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>זמני = עד הנקודה-פסיק. const&amp; מאריכה. new = עד delete.</b></div>\n<div class=\"lesson-ex\">\n<pre>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    T(1);                    // +1 -1\n    const T&amp; r = T(2);       // +2 (stays alive)\n    cout &lt;&lt; \"x \";\n}                            // x -2</pre>\nהפלט: <code>+1 -1 +2 x -2</code>.</div>\n<div class=\"lesson-trap\">⚠️ אובייקט שנוצר ב-<code>new</code> ולא נמחק לא מדפיס הורס בסוף התכנית. זה דליפת זיכרון, והתכנית עדיין חוקית.</div>\n"
    },
    "questions": [
     {
      "id": "C05-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    cout << \"a \";\n    T(1);\n    cout << \"b \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`a +1 -1 b`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a +1 -1 b</code>"
       },
       {
        "id": "b",
        "value": "`a +1 b -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a +1 b -1</code>"
       },
       {
        "id": "c",
        "value": "`a b +1 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a b +1 -1</code>"
       },
       {
        "id": "d",
        "value": "`+1 a b -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 a b -1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`T(1);` יוצר אובייקט זמני ללא שם. הוא נהרס בסוף הביטוי, כלומר מיד בנקודה-פסיק, לפני `cout << \"b \"`. לכן `+1 -1` מופיעים ביחד.",
      "recap": "זמני נהרס בסוף הביטוי שבו נוצר",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    cout &lt;&lt; \"a \";\n    T(1);\n    cout &lt;&lt; \"b \";\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">T(1);</code> יוצר אובייקט זמני ללא שם. הוא נהרס בסוף הביטוי, כלומר מיד בנקודה-פסיק, לפני <code class=\"tok\" dir=\"ltr\">cout &lt;&lt; \"b \"</code>. לכן <code class=\"tok\" dir=\"ltr\">+1 -1</code> מופיעים ביחד.",
      "recapHtml": "זמני נהרס בסוף הביטוי שבו נוצר"
     },
     {
      "id": "C05-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    const T& r = T(2);\n    cout << \"mid \";\n    T(3);\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+2 mid +3 -3 end -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 mid +3 -3 end -2</code>"
       },
       {
        "id": "b",
        "value": "`+2 -2 mid +3 -3 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 -2 mid +3 -3 end</code>"
       },
       {
        "id": "c",
        "value": "`+2 mid +3 end -3 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 mid +3 end -3 -2</code>"
       },
       {
        "id": "d",
        "value": "`+2 mid +3 -3 -2 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+2 mid +3 -3 -2 end</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הפניית `const` שמאותחלת מזמני מאריכה את חיי הזמני: `T(2)` נשאר חי עד סוף `main`. לעומת זאת `T(3);` ללא הפניה נהרס מיד. לכן `-3` מופיע לפני `end`, ו-`-2` אחריו.",
      "recap": "const& לזמני מאריכה את חייו עד סוף הבלוק",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    const T&amp; r = T(2);\n    cout &lt;&lt; \"mid \";\n    T(3);\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "הפניית <code class=\"tok\" dir=\"ltr\">const</code> שמאותחלת מזמני מאריכה את חיי הזמני: <code class=\"tok\" dir=\"ltr\">T(2)</code> נשאר חי עד סוף <code class=\"tok\" dir=\"ltr\">main</code>. לעומת זאת <code class=\"tok\" dir=\"ltr\">T(3);</code> ללא הפניה נהרס מיד. לכן <code class=\"tok\" dir=\"ltr\">-3</code> מופיע לפני <code class=\"tok\" dir=\"ltr\">end</code>, ו-<code class=\"tok\" dir=\"ltr\">-2</code> אחריו.",
      "recapHtml": "const&amp; לזמני מאריכה את חייו עד סוף הבלוק"
     },
     {
      "id": "C05-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nint counter = 0;\nstruct U {\n    int id;\n    U() : id(++counter) { cout << \"U\" << id << \" \"; }\n    ~U() { cout << \"~U\" << id << \" \"; }\n};\nint main() {\n    U arr[3];\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`U1 U2 U3 end ~U3 ~U2 ~U1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U1 U2 U3 end ~U3 ~U2 ~U1</code>"
       },
       {
        "id": "b",
        "value": "`U3 U2 U1 end ~U1 ~U2 ~U3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U3 U2 U1 end ~U1 ~U2 ~U3</code>"
       },
       {
        "id": "c",
        "value": "`U1 U2 U3 end ~U1 ~U2 ~U3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U1 U2 U3 end ~U1 ~U2 ~U3</code>"
       },
       {
        "id": "d",
        "value": "`U1 end U2 end U3 end ~U3 ~U2 ~U1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U1 end U2 end U3 end ~U3 ~U2 ~U1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "איברי מערך נבנים לפי האינדקס, ולכן המספרים 1, 2, 3 לפי הסדר. הם נהרסים בסדר ההפוך, מהאיבר האחרון לראשון. כמו תמיד, ההריסה היא הפוכה לבנייה.",
      "recap": "מערך: בונים 0..n-1, הורסים n-1..0",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>int counter = 0;\nstruct U {\n    int id;\n    U() : id(++counter) { cout &lt;&lt; \"U\" &lt;&lt; id &lt;&lt; \" \"; }\n    ~U() { cout &lt;&lt; \"~U\" &lt;&lt; id &lt;&lt; \" \"; }\n};\nint main() {\n    U arr[3];\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "איברי מערך נבנים לפי האינדקס, ולכן המספרים 1, 2, 3 לפי הסדר. הם נהרסים בסדר ההפוך, מהאיבר האחרון לראשון. כמו תמיד, ההריסה היא הפוכה לבנייה.",
      "recapHtml": "מערך: בונים 0..n-1, הורסים n-1..0"
     },
     {
      "id": "C05-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    T* p = new T(5);\n    cout << \"x \";\n    delete p;\n    cout << \"y \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+5 x -5 y`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 x -5 y</code>"
       },
       {
        "id": "b",
        "value": "`+5 x y -5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 x y -5</code>"
       },
       {
        "id": "c",
        "value": "`x +5 -5 y`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">x +5 -5 y</code>"
       },
       {
        "id": "d",
        "value": "`+5 x y`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+5 x y</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`new T(5)` מפעיל את הבנאי מיד (`+5`). ההורס רץ רק בשורת `delete p;`, לפני `y`. התשובה `+5 x y -5` מניחה שההורס רץ בסוף הבלוק כמו אצל מקומי.",
      "recap": "אובייקט של new נהרס ב-delete בלבד",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    T* p = new T(5);\n    cout &lt;&lt; \"x \";\n    delete p;\n    cout &lt;&lt; \"y \";\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">new T(5)</code> מפעיל את הבנאי מיד (<code class=\"tok\" dir=\"ltr\">+5</code>). ההורס רץ רק בשורת <code class=\"tok\" dir=\"ltr\">delete p;</code>, לפני <code class=\"tok\" dir=\"ltr\">y</code>. התשובה <code class=\"tok\" dir=\"ltr\">+5 x y -5</code> מניחה שההורס רץ בסוף הבלוק כמו אצל מקומי.",
      "recapHtml": "אובייקט של new נהרס ב-delete בלבד"
     },
     {
      "id": "C05-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nint main() {\n    T a(1);\n    T* p = new T(2);\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+1 +2 end -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 end -1</code>"
       },
       {
        "id": "b",
        "value": "`+1 +2 end -2 -1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 end -2 -1</code>"
       },
       {
        "id": "c",
        "value": "`+1 +2 end -1 -2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 end -1 -2</code>"
       },
       {
        "id": "d",
        "value": "`+1 +2 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+1 +2 end</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`a` מקומי ונהרס בסוף `main`. האובייקט ש-`p` מצביע אליו נוצר ב-`new` ואין `delete`, ולכן הורס שלו לא רץ בכלל (דליפת זיכרון). לא בסוף הבלוק ולא בסוף התכנית.",
      "recap": "בלי delete ההורס של אובייקט new לא רץ",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nint main() {\n    T a(1);\n    T* p = new T(2);\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">a</code> מקומי ונהרס בסוף <code class=\"tok\" dir=\"ltr\">main</code>. האובייקט ש-<code class=\"tok\" dir=\"ltr\">p</code> מצביע אליו נוצר ב-<code class=\"tok\" dir=\"ltr\">new</code> ואין <code class=\"tok\" dir=\"ltr\">delete</code>, ולכן הורס שלו לא רץ בכלל (דליפת זיכרון). לא בסוף הבלוק ולא בסוף התכנית.",
      "recapHtml": "בלי delete ההורס של אובייקט new לא רץ"
     },
     {
      "id": "C05-Q6",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct T {\n    int n;\n    T(int n) : n(n) { cout << \"+\" << n << \" \"; }\n    ~T() { cout << \"-\" << n << \" \"; }\n};\nvoid f(const T& t) { cout << \"in \"; }\nint main() {\n    f(T(3));\n    cout << \"after \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`+3 in -3 after`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+3 in -3 after</code>"
       },
       {
        "id": "b",
        "value": "`+3 in after -3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+3 in after -3</code>"
       },
       {
        "id": "c",
        "value": "`in +3 -3 after`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">in +3 -3 after</code>"
       },
       {
        "id": "d",
        "value": "`+3 -3 in after`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+3 -3 in after</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הזמני `T(3)` נוצר לפני הקריאה ועובר בהפניה. הוא נהרס בסוף הביטוי המלא `f(T(3));`, כלומר אחרי ש-`f` חזרה ולפני `after`. לכן הוא עדיין חי בזמן `in`.",
      "recap": "זמני כארגומנט חי עד סוף הביטוי המלא",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct T {\n    int n;\n    T(int n) : n(n) { cout &lt;&lt; \"+\" &lt;&lt; n &lt;&lt; \" \"; }\n    ~T() { cout &lt;&lt; \"-\" &lt;&lt; n &lt;&lt; \" \"; }\n};\nvoid f(const T&amp; t) { cout &lt;&lt; \"in \"; }\nint main() {\n    f(T(3));\n    cout &lt;&lt; \"after \";\n}</code></pre>",
      "explanationHtml": "הזמני <code class=\"tok\" dir=\"ltr\">T(3)</code> נוצר לפני הקריאה ועובר בהפניה. הוא נהרס בסוף הביטוי המלא <code class=\"tok\" dir=\"ltr\">f(T(3));</code>, כלומר אחרי ש-<code class=\"tok\" dir=\"ltr\">f</code> חזרה ולפני <code class=\"tok\" dir=\"ltr\">after</code>. לכן הוא עדיין חי בזמן <code class=\"tok\" dir=\"ltr\">in</code>.",
      "recapHtml": "זמני כארגומנט חי עד סוף הביטוי המלא"
     },
     {
      "id": "C05-Q7",
      "question": "מה מדפיסה התכנית?\n```cpp\nint counter = 0;\nstruct U {\n    int id;\n    U() : id(++counter) { cout << \"U\" << id << \" \"; }\n    ~U() { cout << \"~U\" << id << \" \"; }\n};\nint main() {\n    U* p = new U[2];\n    cout << \"mid \";\n    delete[] p;\n    cout << \"end \";\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`U1 U2 mid ~U2 ~U1 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U1 U2 mid ~U2 ~U1 end</code>"
       },
       {
        "id": "b",
        "value": "`U1 U2 mid ~U1 ~U2 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U1 U2 mid ~U1 ~U2 end</code>"
       },
       {
        "id": "c",
        "value": "`U1 U2 mid end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">U1 U2 mid end</code>"
       },
       {
        "id": "d",
        "value": "`mid U1 U2 ~U2 ~U1 end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">mid U1 U2 ~U2 ~U1 end</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`new U[2]` בונה את שני האיברים מיד, לפי האינדקס. `delete[]` הורס אותם בסדר הפוך. התשובה `U1 U2 mid end` מתעלמת מה-`delete[]`.",
      "recap": "delete[] הורס מערך בסדר הפוך",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>int counter = 0;\nstruct U {\n    int id;\n    U() : id(++counter) { cout &lt;&lt; \"U\" &lt;&lt; id &lt;&lt; \" \"; }\n    ~U() { cout &lt;&lt; \"~U\" &lt;&lt; id &lt;&lt; \" \"; }\n};\nint main() {\n    U* p = new U[2];\n    cout &lt;&lt; \"mid \";\n    delete[] p;\n    cout &lt;&lt; \"end \";\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">new U[2]</code> בונה את שני האיברים מיד, לפי האינדקס. <code class=\"tok\" dir=\"ltr\">delete[]</code> הורס אותם בסדר הפוך. התשובה <code class=\"tok\" dir=\"ltr\">U1 U2 mid end</code> מתעלמת מה-<code class=\"tok\" dir=\"ltr\">delete[]</code>.",
      "recapHtml": "delete[] הורס מערך בסדר הפוך"
     }
    ]
   },
   {
    "id": "C06",
    "order": 6,
    "icon": "🔔",
    "title": "הורס וירטואלי וקריאות בתוך בנאי",
    "goal": "לדעת מתי delete דרך מצביע לאב הורס את כל האובייקט, ואיזו גרסה של פונקציה וירטואלית נקראת בתוך בנאי והורס.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p><b>מצביע לאב יכול להצביע על נגזרת:</b> <code>B* p = new D;</code>. הבנייה תמיד מלאה (<code>B</code> ואז <code>D</code>). השאלה היא מה קורה ב-<code>delete p</code>.</p>\n<ul>\n<li>אם ההורס של <code>B</code> הוא <b><code>virtual</code></b>, נבחר ההורס של הסוג האמיתי. נהרס כל האובייקט: קודם <code>D</code> ואז <code>B</code>.</li>\n<li>אם ההורס של <code>B</code> <b>לא</b> וירטואלי, <code>delete</code> דרך <code>B*</code> על אובייקט <code>D</code> הוא <b>התנהגות לא מוגדרת</b>. לכן תמיד מגדירים הורס וירטואלי במחלקה שמיועדת לשמש כאב.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>מחלקת אב עם פונקציות וירטואליות צריכה הורס וירטואלי.</b> בנאי אי אפשר להפוך לוירטואלי, ואין צורך.</div>\n<h3>קריאה וירטואלית בתוך בנאי או הורס</h3>\n<p>בזמן שהבנאי של <code>B</code> רץ, החלק של <code>D</code> עוד לא נבנה. לכן קריאה לפונקציה וירטואלית בתוך הבנאי (או ההורס) של <code>B</code> מפעילה את הגרסה של <code>B</code>, גם אם האובייקט בפועל הוא <code>D</code>.</p>\n<div class=\"lesson-ex\">\n<pre>struct B {\n    B() { f(); }\n    virtual void f() { cout &lt;&lt; \"B::f \"; }\n    virtual ~B() {}\n};\nstruct D : B {\n    void f() { cout &lt;&lt; \"D::f \"; }\n};\nint main() { D d; d.f(); }</pre>\nהפלט: <code>B::f D::f</code>. בתוך הבנאי של <code>B</code> נבחרת הגרסה של <code>B</code>; רק אחרי שהבנייה הושלמה <code>d.f()</code> מגיעה ל-<code>D</code>.</div>\n<div class=\"lesson-trap\">⚠️ אם ההורס של האב לא וירטואלי אי אפשר לשאול \"מה יודפס\", כי התנהגות לא מוגדרת אין לה תוצאה. כשמופיעה במבחן שאלה כזו, התשובה היא לא להסתמך עליה.</div>\n"
    },
    "questions": [
     {
      "id": "C06-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct D : B {\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B D ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D ~D ~B</code>"
       },
       {
        "id": "b",
        "value": "`B D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D ~B</code>"
       },
       {
        "id": "c",
        "value": "`D B ~B ~D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D B ~B ~D</code>"
       },
       {
        "id": "d",
        "value": "`B D ~B ~D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D ~B ~D</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הבנייה מלאה: `B` ואז `D`. ההורס של `B` וירטואלי, ולכן `delete p` מפעיל את ההורס של הסוג האמיתי `D`, ואחריו כרגיל ההורס של האב: `~D ~B`. בתשובה `B D ~B` ההורס של `D` מדולג, וזה מה שקורה בלי `virtual`.",
      "recap": "הורס וירטואלי: delete דרך אב הורס נגזרת ואז אב",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B() { cout &lt;&lt; \"B \"; }\n    virtual ~B() { cout &lt;&lt; \"~B \"; }\n};\nstruct D : B {\n    D() { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}</code></pre>",
      "explanationHtml": "הבנייה מלאה: <code class=\"tok\" dir=\"ltr\">B</code> ואז <code class=\"tok\" dir=\"ltr\">D</code>. ההורס של <code class=\"tok\" dir=\"ltr\">B</code> וירטואלי, ולכן <code class=\"tok\" dir=\"ltr\">delete p</code> מפעיל את ההורס של הסוג האמיתי <code class=\"tok\" dir=\"ltr\">D</code>, ואחריו כרגיל ההורס של האב: <code class=\"tok\" dir=\"ltr\">~D ~B</code>. בתשובה <code class=\"tok\" dir=\"ltr\">B D ~B</code> ההורס של <code class=\"tok\" dir=\"ltr\">D</code> מדולג, וזה מה שקורה בלי <code class=\"tok\" dir=\"ltr\">virtual</code>.",
      "recapHtml": "הורס וירטואלי: delete דרך אב הורס נגזרת ואז אב"
     },
     {
      "id": "C06-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct M {\n    M() { cout << \"M \"; }\n    ~M() { cout << \"~M \"; }\n};\nstruct D : B {\n    M m;\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B M D ~D ~M ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B M D ~D ~M ~B</code>"
       },
       {
        "id": "b",
        "value": "`B M D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B M D ~B</code>"
       },
       {
        "id": "c",
        "value": "`B M D ~D ~B ~M`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B M D ~D ~B ~M</code>"
       },
       {
        "id": "d",
        "value": "`B D M ~M ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D M ~M ~D ~B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ההורס של `D` מופעל בגלל ה-`virtual`, והוא הורס את כל החלק של `D` כרגיל: קודם הגוף `~D`, אחריו השדה `~M`, ולבסוף האב `~B`.",
      "recap": "הורס וירטואלי מפעיל את כל השרשרת: גוף, שדות, אבות",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B() { cout &lt;&lt; \"B \"; }\n    virtual ~B() { cout &lt;&lt; \"~B \"; }\n};\nstruct M {\n    M() { cout &lt;&lt; \"M \"; }\n    ~M() { cout &lt;&lt; \"~M \"; }\n};\nstruct D : B {\n    M m;\n    D() { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}</code></pre>",
      "explanationHtml": "ההורס של <code class=\"tok\" dir=\"ltr\">D</code> מופעל בגלל ה-<code class=\"tok\" dir=\"ltr\">virtual</code>, והוא הורס את כל החלק של <code class=\"tok\" dir=\"ltr\">D</code> כרגיל: קודם הגוף <code class=\"tok\" dir=\"ltr\">~D</code>, אחריו השדה <code class=\"tok\" dir=\"ltr\">~M</code>, ולבסוף האב <code class=\"tok\" dir=\"ltr\">~B</code>.",
      "recapHtml": "הורס וירטואלי מפעיל את כל השרשרת: גוף, שדות, אבות"
     },
     {
      "id": "C06-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct D : B {\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* arr[2] = { new D, new B };\n    delete arr[0];\n    delete arr[1];\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B D B ~D ~B ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D B ~D ~B ~B</code>"
       },
       {
        "id": "b",
        "value": "`B D B ~B ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D B ~B ~B</code>"
       },
       {
        "id": "c",
        "value": "`B D B ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D B ~D ~B</code>"
       },
       {
        "id": "d",
        "value": "`B B D ~B ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B D ~B ~D ~B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "האיבר הראשון הוא `D`: בניית `B D`. השני הוא `B`: בניית `B`. ב-`delete arr[0]` נבחר ההורס של `D` ולכן `~D ~B`, וב-`delete arr[1]` רק `~B`.",
      "recap": "ההורס נבחר לפי הסוג האמיתי של כל אובייקט",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B() { cout &lt;&lt; \"B \"; }\n    virtual ~B() { cout &lt;&lt; \"~B \"; }\n};\nstruct D : B {\n    D() { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    B* arr[2] = { new D, new B };\n    delete arr[0];\n    delete arr[1];\n}</code></pre>",
      "explanationHtml": "האיבר הראשון הוא <code class=\"tok\" dir=\"ltr\">D</code>: בניית <code class=\"tok\" dir=\"ltr\">B D</code>. השני הוא <code class=\"tok\" dir=\"ltr\">B</code>: בניית <code class=\"tok\" dir=\"ltr\">B</code>. ב-<code class=\"tok\" dir=\"ltr\">delete arr[0]</code> נבחר ההורס של <code class=\"tok\" dir=\"ltr\">D</code> ולכן <code class=\"tok\" dir=\"ltr\">~D ~B</code>, וב-<code class=\"tok\" dir=\"ltr\">delete arr[1]</code> רק <code class=\"tok\" dir=\"ltr\">~B</code>.",
      "recapHtml": "ההורס נבחר לפי הסוג האמיתי של כל אובייקט"
     },
     {
      "id": "C06-Q4",
      "question": "ההורס של `B` לא וירטואלי, ובתכנית נכתב `B* p = new D; delete p;`. איזה שינוי תקין מבטיח שבזמן `delete p` יופעל גם ההורס של `D`?",
      "options": [
       {
        "id": "a",
        "value": "להוסיף `virtual` להורס של `B`",
        "type": "text",
        "html": "להוסיף <code class=\"tok\" dir=\"ltr\">virtual</code> להורס של <code class=\"tok\" dir=\"ltr\">B</code>"
       },
       {
        "id": "b",
        "value": "להוסיף `virtual` לבנאי של `D`",
        "type": "text",
        "html": "להוסיף <code class=\"tok\" dir=\"ltr\">virtual</code> לבנאי של <code class=\"tok\" dir=\"ltr\">D</code>"
       },
       {
        "id": "c",
        "value": "למחוק את ההורס של `D`",
        "type": "text",
        "html": "למחוק את ההורס של <code class=\"tok\" dir=\"ltr\">D</code>"
       },
       {
        "id": "d",
        "value": "להוסיף `virtual` לבנאי של `B`",
        "type": "text",
        "html": "להוסיף <code class=\"tok\" dir=\"ltr\">virtual</code> לבנאי של <code class=\"tok\" dir=\"ltr\">B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "רק הורס וירטואלי באב גורם ל-`delete` דרך מצביע לאב לבחור את ההורס של הסוג האמיתי. בנאי אי אפשר להצהיר כ-`virtual` (שגיאת קומפילציה), ולכן ב ו-ד אינן אפשריות. מחיקת ההורס של `D` לא משנה כלום: ההורס של `B` נשאר לא וירטואלי.",
      "recap": "מוסיפים virtual להורס של האב. בנאי לא יכול להיות וירטואלי",
      "questionHtml": "ההורס של <code class=\"tok\" dir=\"ltr\">B</code> לא וירטואלי, ובתכנית נכתב <code class=\"tok\" dir=\"ltr\">B* p = new D; delete p;</code>. איזה שינוי תקין מבטיח שבזמן <code class=\"tok\" dir=\"ltr\">delete p</code> יופעל גם ההורס של <code class=\"tok\" dir=\"ltr\">D</code>?",
      "explanationHtml": "רק הורס וירטואלי באב גורם ל-<code class=\"tok\" dir=\"ltr\">delete</code> דרך מצביע לאב לבחור את ההורס של הסוג האמיתי. בנאי אי אפשר להצהיר כ-<code class=\"tok\" dir=\"ltr\">virtual</code> (שגיאת קומפילציה), ולכן ב ו-ד אינן אפשריות. מחיקת ההורס של <code class=\"tok\" dir=\"ltr\">D</code> לא משנה כלום: ההורס של <code class=\"tok\" dir=\"ltr\">B</code> נשאר לא וירטואלי.",
      "recapHtml": "מוסיפים virtual להורס של האב. בנאי לא יכול להיות וירטואלי"
     },
     {
      "id": "C06-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { f(); }\n    virtual void f() { cout << \"B::f \"; }\n    virtual ~B() {}\n};\nstruct D : B {\n    void f() { cout << \"D::f \"; }\n};\nint main() {\n    D d;\n    d.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B::f D::f`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B::f D::f</code>"
       },
       {
        "id": "b",
        "value": "`D::f D::f`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D::f D::f</code>"
       },
       {
        "id": "c",
        "value": "`D::f`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D::f</code>"
       },
       {
        "id": "d",
        "value": "`B::f B::f`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B::f B::f</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בזמן שהבנאי של `B` רץ, האובייקט עדיין נחשב `B` (החלק של `D` לא נבנה), ולכן הקריאה הווירטואלית בתוך הבנאי מפעילה את `B::f`. הקריאה `d.f()` אחרי הבנייה מפעילה את `D::f`.",
      "recap": "בתוך בנאי קריאה וירטואלית נקראת לפי הסוג שנבנה כרגע",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B() { f(); }\n    virtual void f() { cout &lt;&lt; \"B::f \"; }\n    virtual ~B() {}\n};\nstruct D : B {\n    void f() { cout &lt;&lt; \"D::f \"; }\n};\nint main() {\n    D d;\n    d.f();\n}</code></pre>",
      "explanationHtml": "בזמן שהבנאי של <code class=\"tok\" dir=\"ltr\">B</code> רץ, האובייקט עדיין נחשב <code class=\"tok\" dir=\"ltr\">B</code> (החלק של <code class=\"tok\" dir=\"ltr\">D</code> לא נבנה), ולכן הקריאה הווירטואלית בתוך הבנאי מפעילה את <code class=\"tok\" dir=\"ltr\">B::f</code>. הקריאה <code class=\"tok\" dir=\"ltr\">d.f()</code> אחרי הבנייה מפעילה את <code class=\"tok\" dir=\"ltr\">D::f</code>.",
      "recapHtml": "בתוך בנאי קריאה וירטואלית נקראת לפי הסוג שנבנה כרגע"
     },
     {
      "id": "C06-Q6",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B()  { cout << \"B() \";  whoAmI(); }\n    virtual ~B() { cout << \"~B() \"; whoAmI(); }\n    virtual void whoAmI() { cout << \"[B] \"; }\n};\nstruct D : B {\n    D()  { cout << \"D() \";  whoAmI(); }\n    ~D() { cout << \"~D() \"; whoAmI(); }\n    void whoAmI() { cout << \"[D] \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B() [B] D() [D] ~D() [D] ~B() [B]`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B() [B] D() [D] ~D() [D] ~B() [B]</code>"
       },
       {
        "id": "b",
        "value": "`B() [D] D() [D] ~D() [D] ~B() [D]`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B() [D] D() [D] ~D() [D] ~B() [D]</code>"
       },
       {
        "id": "c",
        "value": "`B() [B] D() [D] ~D() [D] ~B() [D]`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B() [B] D() [D] ~D() [D] ~B() [D]</code>"
       },
       {
        "id": "d",
        "value": "`B() [B] D() [D] ~D() [B] ~B() [B]`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B() [B] D() [D] ~D() [B] ~B() [B]</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בבנייה: בתוך `B()` הסוג הוא `B`, בתוך `D()` הסוג הוא `D`. בהריסה זה סימטרי: בזמן `~D()` האובייקט עדיין `D` ולכן `[D]`; אחרי שחלק `D` נהרס, בתוך `~B()` האובייקט נחשב `B` ונקרא `[B]`.",
      "recap": "גם בהורס: הסוג הוא זה של ההורס שרץ כרגע",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B()  { cout &lt;&lt; \"B() \";  whoAmI(); }\n    virtual ~B() { cout &lt;&lt; \"~B() \"; whoAmI(); }\n    virtual void whoAmI() { cout &lt;&lt; \"[B] \"; }\n};\nstruct D : B {\n    D()  { cout &lt;&lt; \"D() \";  whoAmI(); }\n    ~D() { cout &lt;&lt; \"~D() \"; whoAmI(); }\n    void whoAmI() { cout &lt;&lt; \"[D] \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}</code></pre>",
      "explanationHtml": "בבנייה: בתוך <code class=\"tok\" dir=\"ltr\">B()</code> הסוג הוא <code class=\"tok\" dir=\"ltr\">B</code>, בתוך <code class=\"tok\" dir=\"ltr\">D()</code> הסוג הוא <code class=\"tok\" dir=\"ltr\">D</code>. בהריסה זה סימטרי: בזמן <code class=\"tok\" dir=\"ltr\">~D()</code> האובייקט עדיין <code class=\"tok\" dir=\"ltr\">D</code> ולכן <code class=\"tok\" dir=\"ltr\">[D]</code>; אחרי שחלק <code class=\"tok\" dir=\"ltr\">D</code> נהרס, בתוך <code class=\"tok\" dir=\"ltr\">~B()</code> האובייקט נחשב <code class=\"tok\" dir=\"ltr\">B</code> ונקרא <code class=\"tok\" dir=\"ltr\">[B]</code>.",
      "recapHtml": "גם בהורס: הסוג הוא זה של ההורס שרץ כרגע"
     }
    ]
   },
   {
    "id": "C07",
    "order": 7,
    "icon": "🏆",
    "title": "מבחן גמר: סדר בנייה והריסה",
    "goal": "לפתור שאלות אמיתיות מהמבחנים על סדר בנייה והריסה.",
    "source": "ai-verified",
    "boss": true,
    "lesson": {
     "html": "\n<p>בשאלות \"מה מדפיסה התכנית\" על סדר בנייה, רושמים רשימה אחת של כל האובייקטים לפי זמן הבנייה, ואז קוראים אותה הפוך כדי לקבל את ההריסה.</p>\n<ol>\n<li><b>גלובליים</b> לפי סדר הקובץ, לפני <code>main</code>.</li>\n<li>ב-<code>main</code> שורה אחרי שורה. לכל אובייקט: <b>אבות</b> (לפי רשימת הירושה), <b>שדות</b> (לפי ההצהרה), <b>גוף</b>. סטטי מקומי נכנס לרשימה רק כשמגיעים לשורה שלו, ופעם אחת.</li>\n<li>הריסה: מקומיים בסוף הבלוק בסדר הפוך, ואחריהם סטטיים וגלובליים בסדר הפוך לסיום בנייתם.</li>\n</ol>\n<div class=\"lesson-rule\">🔑 כותבים ליד כל אובייקט את שלוש הרמות (אב, שדה, גוף) ורק אז מדפיסים. רשימת האתחול לא משנה את הסדר.</div>\n<div class=\"lesson-trap\">⚠️ בשאלות על <code>delete</code> דרך מצביע לאב בלי <code>virtual</code> התנהגות התכנית לא מוגדרת. כאן נבחרו שאלות שבהן הפלט מוגדר היטב.</div>\n"
    },
    "questions": [
     {
      "bankId": "18A-A-Q11",
      "recap": "אב ואז נגזרת; הריסה הפוכה.",
      "recapHtml": "אב ואז נגזרת; הריסה הפוכה."
     },
     {
      "bankId": "22B-A-Q7",
      "recap": "אב, שדה (בנאי ברירת מחדל), ואחר כך זמני בהשמה בגוף.",
      "recapHtml": "אב, שדה (בנאי ברירת מחדל), ואחר כך זמני בהשמה בגוף."
     },
     {
      "bankId": "24B-A-Q6",
      "recap": "אבות לפי רשימת הירושה, שדות לפי ההצהרה, גוף.",
      "recapHtml": "אבות לפי רשימת הירושה, שדות לפי ההצהרה, גוף."
     },
     {
      "bankId": "24B-B-Q11",
      "recap": "גלובלי, מקומי עם שרשרת ירושה, וסטטי מקומי.",
      "recapHtml": "גלובלי, מקומי עם שרשרת ירושה, וסטטי מקומי."
     },
     {
      "bankId": "23B-B-Q13",
      "recap": "גלובלי, main, מקומיים וסטטיים בפונקציות ובהריסה הפוכה.",
      "recapHtml": "גלובלי, main, מקומיים וסטטיים בפונקציות ובהריסה הפוכה."
     },
     {
      "bankId": "25B-A-Q5",
      "recap": "גלובלי, סטטי, מקומי עם אב ושדה, והריסה הפוכה.",
      "recapHtml": "גלובלי, סטטי, מקומי עם אב ושדה, והריסה הפוכה."
     }
    ]
   }
  ]
 },
 "operators": {
  "levels": [
   {
    "id": "C01",
    "order": 1,
    "icon": "➕",
    "title": "אופרטור כפונקציה חברה",
    "goal": "לקרוא ביטוי כמו a + b כקריאה לפונקציה, ולדעת מה הפרמטרים של אופרטור חבר.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>אופרטור הוא פונקציה עם שם מיוחד. הביטוי <code>a + b</code> הוא קיצור לקריאה <code>a.operator+(b)</code>, כשהאופרטור מוגדר <b>בתוך</b> המחלקה של <code>a</code>.</p>\n<table>\n<thead><tr><th>הביטוי</th><th>הקריאה</th><th>מי זה <code>this</code></th></tr></thead>\n<tbody>\n<tr><td><code>a + b</code></td><td><code>a.operator+(b)</code></td><td><code>a</code></td></tr>\n<tr><td><code>a += b</code></td><td><code>a.operator+=(b)</code></td><td><code>a</code></td></tr>\n</tbody></table>\n<ul>\n<li><b>אופרטור בינארי חבר מקבל פרמטר אחד בלבד</b>: האופרנד הימני. האופרנד השמאלי הוא האובייקט עצמו (<code>*this</code>).</li>\n<li>לכן <b>האופרנד השמאלי חייב להיות מהמחלקה</b>. אי אפשר לכתוב <code>5 + a</code> עם אופרטור חבר, כי ל-<code>int</code> אין פונקציה חברה בשם <code>operator+</code>.</li>\n<li><code>+</code> יוצר ערך חדש ולכן מחזיר <code>V</code> לפי ערך. <code>+=</code> משנה את האובייקט ומחזיר <code>V&amp;</code> (עם <code>return *this;</code>), כדי שאפשר יהיה לשרשר.</li>\n<li>האופרנד הימני יכול לעבור המרה אוטומטית (למשל <code>a + 5</code> כשיש בנאי <code>V(int)</code>), האופרנד השמאלי של אופרטור חבר לא.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>אופרטור חבר: האופרנד השמאלי הוא <code>this</code>, ולכן הפרמטר היחיד הוא האופרנד הימני.</b></div>\n<div class=\"lesson-ex\">\n<pre>struct V {\n    int x;\n    V(int a) : x(a) {}\n    V operator+(const V&amp; o) const { return V(x + o.x); }\n};\nV a(3), b(4);\nV c = a + b;            // a.operator+(b)  =&gt; 7</pre></div>\n<div class=\"lesson-trap\">⚠️ אופרטורים כמו <code>a - b - c</code> מחושבים משמאל לימין: קודם <code>(a - b)</code>, ואז התוצאה היא האופרנד השמאלי של האופרטור השני.</div>\n"
    },
    "questions": [
     {
      "id": "C01-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct V {\n    int x;\n    V(int a) : x(a) {}\n    V operator+(const V& o) const { return V(x + o.x); }\n};\nint main() {\n    V a(3), b(4);\n    V c = a + b;\n    V d = a.operator+(c);\n    cout << c.x << \" \" << d.x;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`7 10`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">7 10</code>"
       },
       {
        "id": "b",
        "value": "`7 7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">7 7</code>"
       },
       {
        "id": "c",
        "value": "`10 7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">10 7</code>"
       },
       {
        "id": "d",
        "value": "`7 14`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">7 14</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`a + b` הוא `a.operator+(b)` ולכן `c.x` הוא `3 + 4 = 7`. הקריאה המפורשת `a.operator+(c)` מחברת את `a` (3) עם `c` (7) ונותנת 10. התשובה `7 7` מתעלמת מ-`c` בקריאה השנייה. `10 7` הופכת את סדר ההדפסה. `7 14` מחברת את `c` לעצמו.",
      "recap": "a + b זה a.operator+(b)",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct V {\n    int x;\n    V(int a) : x(a) {}\n    V operator+(const V&amp; o) const { return V(x + o.x); }\n};\nint main() {\n    V a(3), b(4);\n    V c = a + b;\n    V d = a.operator+(c);\n    cout &lt;&lt; c.x &lt;&lt; \" \" &lt;&lt; d.x;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">a + b</code> הוא <code class=\"tok\" dir=\"ltr\">a.operator+(b)</code> ולכן <code class=\"tok\" dir=\"ltr\">c.x</code> הוא <code class=\"tok\" dir=\"ltr\">3 + 4 = 7</code>. הקריאה המפורשת <code class=\"tok\" dir=\"ltr\">a.operator+(c)</code> מחברת את <code class=\"tok\" dir=\"ltr\">a</code> (3) עם <code class=\"tok\" dir=\"ltr\">c</code> (7) ונותנת 10. התשובה <code class=\"tok\" dir=\"ltr\">7 7</code> מתעלמת מ-<code class=\"tok\" dir=\"ltr\">c</code> בקריאה השנייה. <code class=\"tok\" dir=\"ltr\">10 7</code> הופכת את סדר ההדפסה. <code class=\"tok\" dir=\"ltr\">7 14</code> מחברת את <code class=\"tok\" dir=\"ltr\">c</code> לעצמו.",
      "recapHtml": "a + b זה a.operator+(b)"
     },
     {
      "id": "C01-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct V {\n    int x;\n    V(int a = 0) : x(a) {}\n    V& operator+=(const V& o) { x += o.x; return *this; }\n};\nint main() {\n    V a(1), b(2), c(3);\n    (a += b) += c;\n    cout << a.x << b.x << c.x;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`623`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">623</code>"
       },
       {
        "id": "b",
        "value": "`323`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">323</code>"
       },
       {
        "id": "c",
        "value": "`633`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">633</code>"
       },
       {
        "id": "d",
        "value": "`126`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">126</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`a += b` משנה את `a` ל-3 ומחזיר הפניה אל `a` עצמו, ולכן `+= c` ממשיך לעבוד על `a` ומעלה אותו ל-6. `b` ו-`c` לא משתנים: `623`. התשובה `323` נכונה רק אילו האופרטור החזיר עותק, ואז `+= c` היה משנה את העותק. בתשובות `633` ו-`126` מניחים ש-`b` או `c` משתנים.",
      "recap": "+= מחזיר V& כדי שהשרשור ימשיך לעבוד על אותו אובייקט",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct V {\n    int x;\n    V(int a = 0) : x(a) {}\n    V&amp; operator+=(const V&amp; o) { x += o.x; return *this; }\n};\nint main() {\n    V a(1), b(2), c(3);\n    (a += b) += c;\n    cout &lt;&lt; a.x &lt;&lt; b.x &lt;&lt; c.x;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">a += b</code> משנה את <code class=\"tok\" dir=\"ltr\">a</code> ל-3 ומחזיר הפניה אל <code class=\"tok\" dir=\"ltr\">a</code> עצמו, ולכן <code class=\"tok\" dir=\"ltr\">+= c</code> ממשיך לעבוד על <code class=\"tok\" dir=\"ltr\">a</code> ומעלה אותו ל-6. <code class=\"tok\" dir=\"ltr\">b</code> ו-<code class=\"tok\" dir=\"ltr\">c</code> לא משתנים: <code class=\"tok\" dir=\"ltr\">623</code>. התשובה <code class=\"tok\" dir=\"ltr\">323</code> נכונה רק אילו האופרטור החזיר עותק, ואז <code class=\"tok\" dir=\"ltr\">+= c</code> היה משנה את העותק. בתשובות <code class=\"tok\" dir=\"ltr\">633</code> ו-<code class=\"tok\" dir=\"ltr\">126</code> מניחים ש-<code class=\"tok\" dir=\"ltr\">b</code> או <code class=\"tok\" dir=\"ltr\">c</code> משתנים.",
      "recapHtml": "+= מחזיר V&amp; כדי שהשרשור ימשיך לעבוד על אותו אובייקט"
     },
     {
      "id": "C01-Q3",
      "question": "במחלקה `V` מוגדר בנאי `V(int)` (לא `explicit`) והאופרטור `V operator+(const V&) const` כפונקציה חברה. `a` ו-`b` הם אובייקטים מטיפוס `V`. איזו שורה **לא** מתקמפלת?",
      "options": [
       {
        "id": "a",
        "value": "`V r = a + b;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V r = a + b;</code>"
       },
       {
        "id": "b",
        "value": "`V r = a + 5;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V r = a + 5;</code>"
       },
       {
        "id": "c",
        "value": "`V r = 5 + a;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V r = 5 + a;</code>"
       },
       {
        "id": "d",
        "value": "`V r = a.operator+(b);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V r = a.operator+(b);</code>"
       }
      ],
      "correctId": "c",
      "explanation": "באופרטור חבר האופרנד השמאלי הוא `this`, ולכן הוא חייב להיות `V`. ב-`5 + a` האופרנד השמאלי הוא `int`, ואין לו פונקציה חברה `operator+`. ב-`a + 5` האופרנד הימני `5` מומר ל-`V` דרך הבנאי `V(int)`, ולכן זה מתקמפל.",
      "recap": "אופרטור חבר: רק האופרנד הימני עובר המרה, השמאלי חייב להיות מהמחלקה",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">V</code> מוגדר בנאי <code class=\"tok\" dir=\"ltr\">V(int)</code> (לא <code class=\"tok\" dir=\"ltr\">explicit</code>) והאופרטור <code class=\"tok\" dir=\"ltr\">V operator+(const V&amp;) const</code> כפונקציה חברה. <code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> הם אובייקטים מטיפוס <code class=\"tok\" dir=\"ltr\">V</code>. איזו שורה <strong>לא</strong> מתקמפלת?",
      "explanationHtml": "באופרטור חבר האופרנד השמאלי הוא <code class=\"tok\" dir=\"ltr\">this</code>, ולכן הוא חייב להיות <code class=\"tok\" dir=\"ltr\">V</code>. ב-<code class=\"tok\" dir=\"ltr\">5 + a</code> האופרנד השמאלי הוא <code class=\"tok\" dir=\"ltr\">int</code>, ואין לו פונקציה חברה <code class=\"tok\" dir=\"ltr\">operator+</code>. ב-<code class=\"tok\" dir=\"ltr\">a + 5</code> האופרנד הימני <code class=\"tok\" dir=\"ltr\">5</code> מומר ל-<code class=\"tok\" dir=\"ltr\">V</code> דרך הבנאי <code class=\"tok\" dir=\"ltr\">V(int)</code>, ולכן זה מתקמפל.",
      "recapHtml": "אופרטור חבר: רק האופרנד הימני עובר המרה, השמאלי חייב להיות מהמחלקה"
     },
     {
      "id": "C01-Q4",
      "question": "`a` ו-`b` הם אובייקטים מטיפוס `V`. איזו הצהרה בתוך המחלקה `V` גורמת לשורה `V c = a * b;` להתקמפל? (בכל אפשרות הגוף תקין)",
      "options": [
       {
        "id": "a",
        "value": "`V operator*(const V& o) const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V operator*(const V&amp; o) const</code>"
       },
       {
        "id": "b",
        "value": "`V operator*(const V& x, const V& y) const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V operator*(const V&amp; x, const V&amp; y) const</code>"
       },
       {
        "id": "c",
        "value": "`V operator*() const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V operator*() const</code>"
       },
       {
        "id": "d",
        "value": "`V operator*(int k) const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V operator*(int k) const</code>"
       }
      ],
      "correctId": "a",
      "explanation": "אופרטור בינארי חבר מקבל פרמטר אחד: האופרנד הימני. `operator*(const V&, const V&)` כפונקציה חברה אפילו לא מתקמפל כהצהרה, כי הוא מקבל שני פרמטרים מפורשים ובנוסף `this`. `operator*()` בלי פרמטרים הוא ה-`*` האונרי (כמו `*a`), לא הכפל. `operator*(int)` מקבל `int`, ו-`b` הוא `V` שאין לו המרה ל-`int`.",
      "recap": "בינארי חבר = פרמטר אחד מטיפוס האופרנד הימני",
      "questionHtml": "<code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> הם אובייקטים מטיפוס <code class=\"tok\" dir=\"ltr\">V</code>. איזו הצהרה בתוך המחלקה <code class=\"tok\" dir=\"ltr\">V</code> גורמת לשורה <code class=\"tok\" dir=\"ltr\">V c = a * b;</code> להתקמפל? (בכל אפשרות הגוף תקין)",
      "explanationHtml": "אופרטור בינארי חבר מקבל פרמטר אחד: האופרנד הימני. <code class=\"tok\" dir=\"ltr\">operator*(const V&amp;, const V&amp;)</code> כפונקציה חברה אפילו לא מתקמפל כהצהרה, כי הוא מקבל שני פרמטרים מפורשים ובנוסף <code class=\"tok\" dir=\"ltr\">this</code>. <code class=\"tok\" dir=\"ltr\">operator*()</code> בלי פרמטרים הוא ה-<code class=\"tok\" dir=\"ltr\">*</code> האונרי (כמו <code class=\"tok\" dir=\"ltr\">*a</code>), לא הכפל. <code class=\"tok\" dir=\"ltr\">operator*(int)</code> מקבל <code class=\"tok\" dir=\"ltr\">int</code>, ו-<code class=\"tok\" dir=\"ltr\">b</code> הוא <code class=\"tok\" dir=\"ltr\">V</code> שאין לו המרה ל-<code class=\"tok\" dir=\"ltr\">int</code>.",
      "recapHtml": "בינארי חבר = פרמטר אחד מטיפוס האופרנד הימני"
     },
     {
      "id": "C01-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct P {\n    string n;\n    P(string s) : n(s) {}\n    P operator-(const P& o) const {\n        cout << n << \"-\" << o.n << \" \";\n        return P(n + o.n);\n    }\n};\nint main() {\n    P a(\"a\"), b(\"b\"), c(\"c\");\n    P r = a - b - c;\n    cout << r.n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`a-b ab-c abc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a-b ab-c abc</code>"
       },
       {
        "id": "b",
        "value": "`b-c a-bc abc`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">b-c a-bc abc</code>"
       },
       {
        "id": "c",
        "value": "`a-b ab-c ab`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a-b ab-c ab</code>"
       },
       {
        "id": "d",
        "value": "`a-b c-ab cab`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a-b c-ab cab</code>"
       }
      ],
      "correctId": "a",
      "explanation": "החישוב משמאל לימין: קודם `a - b` מדפיס `a-b ` ומחזיר אובייקט עם `ab`. אחר כך האובייקט הזה הוא האופרנד השמאלי: `ab-c ` ומחזיר `abc`. התשובה `b-c a-bc abc` מחשבת מימין לשמאל. `a-b ab-c ab` שוכחת שהתוצאה האחרונה היא `abc`. `a-b c-ab cab` הופכת את סדר האופרנדים.",
      "recap": "a - b - c הוא (a - b) - c, והשמאלי הוא this",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct P {\n    string n;\n    P(string s) : n(s) {}\n    P operator-(const P&amp; o) const {\n        cout &lt;&lt; n &lt;&lt; \"-\" &lt;&lt; o.n &lt;&lt; \" \";\n        return P(n + o.n);\n    }\n};\nint main() {\n    P a(\"a\"), b(\"b\"), c(\"c\");\n    P r = a - b - c;\n    cout &lt;&lt; r.n;\n}</code></pre>",
      "explanationHtml": "החישוב משמאל לימין: קודם <code class=\"tok\" dir=\"ltr\">a - b</code> מדפיס <code class=\"tok\" dir=\"ltr\">a-b </code> ומחזיר אובייקט עם <code class=\"tok\" dir=\"ltr\">ab</code>. אחר כך האובייקט הזה הוא האופרנד השמאלי: <code class=\"tok\" dir=\"ltr\">ab-c </code> ומחזיר <code class=\"tok\" dir=\"ltr\">abc</code>. התשובה <code class=\"tok\" dir=\"ltr\">b-c a-bc abc</code> מחשבת מימין לשמאל. <code class=\"tok\" dir=\"ltr\">a-b ab-c ab</code> שוכחת שהתוצאה האחרונה היא <code class=\"tok\" dir=\"ltr\">abc</code>. <code class=\"tok\" dir=\"ltr\">a-b c-ab cab</code> הופכת את סדר האופרנדים.",
      "recapHtml": "a - b - c הוא (a - b) - c, והשמאלי הוא this"
     }
    ]
   },
   {
    "id": "C02",
    "order": 2,
    "icon": "🤝",
    "title": "פונקציה חיצונית ו-friend",
    "goal": "להחליט מתי אופרטור חייב להיות פונקציה חיצונית, ומתי צריך friend.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>אופרטור יכול להיות גם <b>פונקציה חיצונית</b> (גלובלית) שמקבלת את שני האופרנדים כפרמטרים: <code>a + b</code> הופך ל-<code>operator+(a, b)</code>. כאן אין <code>this</code>, ולכן אין הגבלה על טיפוס האופרנד השמאלי.</p>\n<table>\n<thead><tr><th>צורה</th><th>הביטוי <code>a + b</code> נקרא כ-</th><th>פרמטרים</th></tr></thead>\n<tbody>\n<tr><td>חבר</td><td><code>a.operator+(b)</code></td><td>אחד</td></tr>\n<tr><td>חיצוני</td><td><code>operator+(a, b)</code></td><td>שניים</td></tr>\n</tbody></table>\n<ul>\n<li><b>האופרנד השמאלי אינו מהמחלקה</b> (<code>5 + a</code>): חייבים פונקציה חיצונית <code>operator+(int, const V&amp;)</code>.</li>\n<li>פונקציה חיצונית <b>לא רואה שדות פרטיים</b>. אם היא צריכה אותם, מצהירים עליה בתוך המחלקה כ-<code>friend</code>. אם היא משתמשת רק בממשק הציבורי, <code>friend</code> לא נחוץ.</li>\n<li><code>friend</code> לא הופך את הפונקציה לחברה: היא נשארת חיצונית, אין לה <code>this</code>, ואי אפשר לקרוא לה בצורה <code>a.operator+(b)</code>.</li>\n<li>האופרטורים <code>=</code>, <code>[]</code>, <code>()</code> ו-<code>-&gt;</code> חייבים להיות פונקציות חברות.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>אם האופרנד השמאלי אינו מהמחלקה: פונקציה חיצונית. אם היא צריכה שדות פרטיים: friend.</b></div>\n<div class=\"lesson-ex\">\n<pre>class Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n    friend Box operator*(int k, const Box&amp; b);\n};\nBox operator*(int k, const Box&amp; b) { return Box(k * b.w); }\n// 3 * box  =&gt;  operator*(3, box)</pre></div>\n"
    },
    "questions": [
     {
      "id": "C02-Q1",
      "question": "במחלקה `V` אין בנאים נוספים, וההגדרה היחידה של חיבור היא הפונקציה החיצונית `V operator+(int k, const V& v)`. `a` הוא אובייקט מטיפוס `V`. איזה ביטוי מתקמפל?",
      "options": [
       {
        "id": "a",
        "value": "`5 + a`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">5 + a</code>"
       },
       {
        "id": "b",
        "value": "`a + 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a + 5</code>"
       },
       {
        "id": "c",
        "value": "`a + a`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a + a</code>"
       },
       {
        "id": "d",
        "value": "`a.operator+(5)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a.operator+(5)</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`5 + a` נקרא כ-`operator+(5, a)`, וזה בדיוק החתימה. ב-`a + 5` האופרנד השמאלי הוא `V`, ואין חתימה `operator+(V, int)`. ב-`a + a` הפרמטר הראשון הוא `int` ול-`V` אין המרה אליו. הקריאה `a.operator+(5)` מניחה פונקציה חברה, וזו לא קיימת.",
      "recap": "חתימה חיצונית (int, V) מתאימה רק לביטוי שבו ה-int משמאל",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">V</code> אין בנאים נוספים, וההגדרה היחידה של חיבור היא הפונקציה החיצונית <code class=\"tok\" dir=\"ltr\">V operator+(int k, const V&amp; v)</code>. <code class=\"tok\" dir=\"ltr\">a</code> הוא אובייקט מטיפוס <code class=\"tok\" dir=\"ltr\">V</code>. איזה ביטוי מתקמפל?",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">5 + a</code> נקרא כ-<code class=\"tok\" dir=\"ltr\">operator+(5, a)</code>, וזה בדיוק החתימה. ב-<code class=\"tok\" dir=\"ltr\">a + 5</code> האופרנד השמאלי הוא <code class=\"tok\" dir=\"ltr\">V</code>, ואין חתימה <code class=\"tok\" dir=\"ltr\">operator+(V, int)</code>. ב-<code class=\"tok\" dir=\"ltr\">a + a</code> הפרמטר הראשון הוא <code class=\"tok\" dir=\"ltr\">int</code> ול-<code class=\"tok\" dir=\"ltr\">V</code> אין המרה אליו. הקריאה <code class=\"tok\" dir=\"ltr\">a.operator+(5)</code> מניחה פונקציה חברה, וזו לא קיימת.",
      "recapHtml": "חתימה חיצונית (int, V) מתאימה רק לביטוי שבו ה-int משמאל"
     },
     {
      "id": "C02-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nclass Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n    int get() const { return w; }\n    friend Box operator*(int k, const Box& b);\n};\nBox operator*(int k, const Box& b) { return Box(k * b.w); }\nint main() {\n    Box b(4);\n    cout << (3 * b).get() << \" \" << (2 * (3 * b)).get();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`12 24`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">12 24</code>"
       },
       {
        "id": "b",
        "value": "`12 12`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">12 12</code>"
       },
       {
        "id": "c",
        "value": "`7 9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">7 9</code>"
       },
       {
        "id": "d",
        "value": "`12 8`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">12 8</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`3 * b` קורא ל-`operator*(3, b)` ונותן תיבה ברוחב 12. `2 * (3 * b)` מכפיל את התוצאה הזאת ב-2 ונותן 24. הפונקציה החיצונית רואה את `w` הפרטי בזכות ההצהרה `friend`. התשובה `12 12` מתעלמת מהכפל השני. `7 9` מחברת במקום להכפיל. `12 8` מכפילה את `b` המקורי ב-2.",
      "recap": "friend נותן לפונקציה חיצונית גישה לשדות פרטיים",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>class Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n    int get() const { return w; }\n    friend Box operator*(int k, const Box&amp; b);\n};\nBox operator*(int k, const Box&amp; b) { return Box(k * b.w); }\nint main() {\n    Box b(4);\n    cout &lt;&lt; (3 * b).get() &lt;&lt; \" \" &lt;&lt; (2 * (3 * b)).get();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">3 * b</code> קורא ל-<code class=\"tok\" dir=\"ltr\">operator*(3, b)</code> ונותן תיבה ברוחב 12. <code class=\"tok\" dir=\"ltr\">2 * (3 * b)</code> מכפיל את התוצאה הזאת ב-2 ונותן 24. הפונקציה החיצונית רואה את <code class=\"tok\" dir=\"ltr\">w</code> הפרטי בזכות ההצהרה <code class=\"tok\" dir=\"ltr\">friend</code>. התשובה <code class=\"tok\" dir=\"ltr\">12 12</code> מתעלמת מהכפל השני. <code class=\"tok\" dir=\"ltr\">7 9</code> מחברת במקום להכפיל. <code class=\"tok\" dir=\"ltr\">12 8</code> מכפילה את <code class=\"tok\" dir=\"ltr\">b</code> המקורי ב-2.",
      "recapHtml": "friend נותן לפונקציה חיצונית גישה לשדות פרטיים"
     },
     {
      "id": "C02-Q3",
      "question": "מה קורה בתכנית הבאה?\n```cpp\nclass Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n};\nbool operator==(const Box& a, const Box& b) { return a.w == b.w; }\nint main() {\n    Box p(1), q(1);\n    cout << (p == q);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "שגיאת קומפילציה: הפונקציה החיצונית ניגשת לשדה פרטי ללא `friend`",
        "type": "text",
        "html": "שגיאת קומפילציה: הפונקציה החיצונית ניגשת לשדה פרטי ללא <code class=\"tok\" dir=\"ltr\">friend</code>"
       },
       {
        "id": "b",
        "value": "מודפס `1`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">1</code>"
       },
       {
        "id": "c",
        "value": "מודפס `0`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">0</code>"
       },
       {
        "id": "d",
        "value": "שגיאת קומפילציה: אופרטור `==` חייב להיות פונקציה חברה",
        "type": "text",
        "html": "שגיאת קומפילציה: אופרטור <code class=\"tok\" dir=\"ltr\">==</code> חייב להיות פונקציה חברה"
       }
      ],
      "correctId": "a",
      "explanation": "הפונקציה חיצונית ולכן אינה רואה את `w` הפרטי. כדי שתתקמפל צריך להצהיר עליה כ-`friend` בתוך `Box`, או לגשת לערך דרך פונקציה ציבורית. האפשרות האחרונה שגויה: `==` יכול להיות חיצוני. רק `=`, `[]`, `()` ו-`->` חייבים להיות חברים.",
      "recap": "פונקציה חיצונית בלי friend לא ניגשת לשדות פרטיים",
      "questionHtml": "מה קורה בתכנית הבאה?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>class Box {\n    int w;\npublic:\n    Box(int x) : w(x) {}\n};\nbool operator==(const Box&amp; a, const Box&amp; b) { return a.w == b.w; }\nint main() {\n    Box p(1), q(1);\n    cout &lt;&lt; (p == q);\n}</code></pre>",
      "explanationHtml": "הפונקציה חיצונית ולכן אינה רואה את <code class=\"tok\" dir=\"ltr\">w</code> הפרטי. כדי שתתקמפל צריך להצהיר עליה כ-<code class=\"tok\" dir=\"ltr\">friend</code> בתוך <code class=\"tok\" dir=\"ltr\">Box</code>, או לגשת לערך דרך פונקציה ציבורית. האפשרות האחרונה שגויה: <code class=\"tok\" dir=\"ltr\">==</code> יכול להיות חיצוני. רק <code class=\"tok\" dir=\"ltr\">=</code>, <code class=\"tok\" dir=\"ltr\">[]</code>, <code class=\"tok\" dir=\"ltr\">()</code> ו-<code class=\"tok\" dir=\"ltr\">-&gt;</code> חייבים להיות חברים.",
      "recapHtml": "פונקציה חיצונית בלי friend לא ניגשת לשדות פרטיים"
     },
     {
      "id": "C02-Q4",
      "question": "במחלקה `V` מוצהרת (ומוגדרת) הפונקציה `friend V operator+(const V& a, const V& b);`. איזה ביטוי מתקמפל? (`a` ו-`b` הם `V`)",
      "options": [
       {
        "id": "a",
        "value": "`a + b`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a + b</code>"
       },
       {
        "id": "b",
        "value": "`a.operator+(b)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a.operator+(b)</code>"
       },
       {
        "id": "c",
        "value": "`V::operator+(a, b)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">V::operator+(a, b)</code>"
       },
       {
        "id": "d",
        "value": "`a.operator+(a, b)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">a.operator+(a, b)</code>"
       }
      ],
      "correctId": "a",
      "explanation": "פונקציית `friend` אינה חברה במחלקה: היא פונקציה חיצונית עם גישה מיוחדת. לכן אפשר לכתוב `a + b` (שמתורגם ל-`operator+(a, b)`), אבל אי אפשר לקרוא לה בתחביר של פונקציה חברה (`a.operator+(...)`) ולא דרך שם המחלקה (`V::operator+`).",
      "recap": "friend זו פונקציה חיצונית: אין this ואין a.operator+",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">V</code> מוצהרת (ומוגדרת) הפונקציה <code class=\"tok\" dir=\"ltr\">friend V operator+(const V&amp; a, const V&amp; b);</code>. איזה ביטוי מתקמפל? (<code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> הם <code class=\"tok\" dir=\"ltr\">V</code>)",
      "explanationHtml": "פונקציית <code class=\"tok\" dir=\"ltr\">friend</code> אינה חברה במחלקה: היא פונקציה חיצונית עם גישה מיוחדת. לכן אפשר לכתוב <code class=\"tok\" dir=\"ltr\">a + b</code> (שמתורגם ל-<code class=\"tok\" dir=\"ltr\">operator+(a, b)</code>), אבל אי אפשר לקרוא לה בתחביר של פונקציה חברה (<code class=\"tok\" dir=\"ltr\">a.operator+(...)</code>) ולא דרך שם המחלקה (<code class=\"tok\" dir=\"ltr\">V::operator+</code>).",
      "recapHtml": "friend זו פונקציה חיצונית: אין this ואין a.operator+"
     },
     {
      "id": "C02-Q5",
      "question": "איזה מהאופרטורים הבאים **אי אפשר** להגדיר כפונקציה חיצונית (גלובלית) עבור מחלקה `V`?",
      "options": [
       {
        "id": "a",
        "value": "`+`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">+</code>"
       },
       {
        "id": "b",
        "value": "`==`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">==</code>"
       },
       {
        "id": "c",
        "value": "`<<`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">&lt;&lt;</code>"
       },
       {
        "id": "d",
        "value": "`=`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">=</code>"
       }
      ],
      "correctId": "d",
      "explanation": "אופרטור ההשמה `=` (וגם `[]`, `()` ו-`->`) חייב להיות פונקציה חברה. אפשר להגדיר `+`, `==` ו-`<<` כפונקציות חיצוניות רגילות (`operator<<` אפילו חייב להיות חיצוני כשהזרם בצד שמאל).",
      "recap": "= [] () -> חייבים להיות חברים",
      "questionHtml": "איזה מהאופרטורים הבאים <strong>אי אפשר</strong> להגדיר כפונקציה חיצונית (גלובלית) עבור מחלקה <code class=\"tok\" dir=\"ltr\">V</code>?",
      "explanationHtml": "אופרטור ההשמה <code class=\"tok\" dir=\"ltr\">=</code> (וגם <code class=\"tok\" dir=\"ltr\">[]</code>, <code class=\"tok\" dir=\"ltr\">()</code> ו-<code class=\"tok\" dir=\"ltr\">-&gt;</code>) חייב להיות פונקציה חברה. אפשר להגדיר <code class=\"tok\" dir=\"ltr\">+</code>, <code class=\"tok\" dir=\"ltr\">==</code> ו-<code class=\"tok\" dir=\"ltr\">&lt;&lt;</code> כפונקציות חיצוניות רגילות (<code class=\"tok\" dir=\"ltr\">operator&lt;&lt;</code> אפילו חייב להיות חיצוני כשהזרם בצד שמאל).",
      "recapHtml": "= [] () -&gt; חייבים להיות חברים"
     }
    ]
   },
   {
    "id": "C03",
    "order": 3,
    "icon": "🖨️",
    "title": "הדפסה וקלט בזרמים",
    "goal": "לכתוב ולזהות operator<< ו-operator>> תקינים, ולהסביר למה הם חיצוניים.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>ב-<code>cout &lt;&lt; x</code> האופרנד השמאלי הוא <code>cout</code> (מטיפוס <code>ostream</code>), לא האובייקט שלנו. לכן <code>operator&lt;&lt;</code> של הדפסה <b>אינו יכול להיות פונקציה חברה</b> של המחלקה. הוא פונקציה חיצונית:</p>\n<pre>ostream&amp; operator&lt;&lt;(ostream&amp; os, const X&amp; x) {\n    return os &lt;&lt; x.get();   // או: os &lt;&lt; x.v, אם הוא friend\n}</pre>\n<ul>\n<li><b>מחזירים <code>ostream&amp;</code></b> (את <code>os</code> עצמו) כדי ש-<code>cout &lt;&lt; a &lt;&lt; b</code> יעבוד: הוא נקרא <code>operator&lt;&lt;(operator&lt;&lt;(cout, a), b)</code>, והתוצאה של הקריאה הפנימית היא האופרנד השמאלי של החיצונית.</li>\n<li>הזרם עובר <b>תמיד בהפניה</b> (<code>ostream&amp;</code>): אי אפשר להעתיק זרם.</li>\n<li><code>friend</code> נחוץ רק אם הפונקציה קוראת שדות פרטיים ישירות.</li>\n<li>קלט הפוך: <code>istream&amp; operator&gt;&gt;(istream&amp; is, X&amp; x)</code>. האובייקט עובר בהפניה <b>בלי const</b>, כי הקריאה משנה אותו.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>הדפסה וקלט: פונקציה חיצונית, הזרם הוא הפרמטר הראשון, מחזירים את הזרם בהפניה.</b></div>\n<div class=\"lesson-trap\">⚠️ אם בכל זאת כותבים <code>operator&lt;&lt;</code> כפונקציה חברה, הוא מתקמפל, אבל מתאים רק לביטוי <code>x &lt;&lt; cout</code> (האובייקט משמאל). <code>cout &lt;&lt; x</code> לא יתקמפל.</div>\n"
    },
    "questions": [
     {
      "id": "C03-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct P { int a, b; };\nostream& operator<<(ostream& os, const P& p) {\n    return os << \"(\" << p.a << \",\" << p.b << \")\";\n}\nint main() {\n    P p{1, 2}, q{3, 4};\n    cout << p << q << endl;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`(1,2)(3,4)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">(1,2)(3,4)</code>"
       },
       {
        "id": "b",
        "value": "`(3,4)(1,2)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">(3,4)(1,2)</code>"
       },
       {
        "id": "c",
        "value": "`(1,2) (3,4)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">(1,2) (3,4)</code>"
       },
       {
        "id": "d",
        "value": "`(1,2)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">(1,2)</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`cout << p` מדפיס `(1,2)` ומחזיר את `cout`, ואז `<< q` מדפיס `(3,4)` מיד אחריו, בלי רווח (האופרטור לא מוסיף רווחים). לכן `(1,2)(3,4)`. הסדר הפוך הוא טעות בכיוון השרשור. התשובה עם הרווח מוסיפה רווח שאף שורה לא מדפיסה. התשובה האחרונה מניחה שהשרשור נקטע.",
      "recap": "cout << p << q: ההדפסה הראשונה מחזירה את cout",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct P { int a, b; };\nostream&amp; operator&lt;&lt;(ostream&amp; os, const P&amp; p) {\n    return os &lt;&lt; \"(\" &lt;&lt; p.a &lt;&lt; \",\" &lt;&lt; p.b &lt;&lt; \")\";\n}\nint main() {\n    P p{1, 2}, q{3, 4};\n    cout &lt;&lt; p &lt;&lt; q &lt;&lt; endl;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">cout &lt;&lt; p</code> מדפיס <code class=\"tok\" dir=\"ltr\">(1,2)</code> ומחזיר את <code class=\"tok\" dir=\"ltr\">cout</code>, ואז <code class=\"tok\" dir=\"ltr\">&lt;&lt; q</code> מדפיס <code class=\"tok\" dir=\"ltr\">(3,4)</code> מיד אחריו, בלי רווח (האופרטור לא מוסיף רווחים). לכן <code class=\"tok\" dir=\"ltr\">(1,2)(3,4)</code>. הסדר הפוך הוא טעות בכיוון השרשור. התשובה עם הרווח מוסיפה רווח שאף שורה לא מדפיסה. התשובה האחרונה מניחה שהשרשור נקטע.",
      "recapHtml": "cout &lt;&lt; p &lt;&lt; q: ההדפסה הראשונה מחזירה את cout"
     },
     {
      "id": "C03-Q2",
      "question": "`a` ו-`b` הם אובייקטים מטיפוס `X`. איזו חתימה של `operator<<` (כפונקציה בעלת גוף תקין) גורמת לשורה `cout << a << b;` להתקמפל?",
      "options": [
       {
        "id": "a",
        "value": "`ostream& operator<<(ostream& os, const X& x)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">ostream&amp; operator&lt;&lt;(ostream&amp; os, const X&amp; x)</code>"
       },
       {
        "id": "b",
        "value": "`void operator<<(ostream& os, const X& x)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">void operator&lt;&lt;(ostream&amp; os, const X&amp; x)</code>"
       },
       {
        "id": "c",
        "value": "פונקציה חברה: `ostream& X::operator<<(ostream& os) const`",
        "type": "text",
        "html": "פונקציה חברה: <code class=\"tok\" dir=\"ltr\">ostream&amp; X::operator&lt;&lt;(ostream&amp; os) const</code>"
       },
       {
        "id": "d",
        "value": "`ostream operator<<(ostream os, const X& x)`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">ostream operator&lt;&lt;(ostream os, const X&amp; x)</code>"
       }
      ],
      "correctId": "a",
      "explanation": "רק הגרסה החיצונית שמחזירה `ostream&` מאפשרת שרשור: התוצאה של `cout << a` היא `cout`, והיא האופרנד השמאלי של `<< b`. עם `void` ההדפסה השנייה לא מתקמפלת. הגרסה החברה מתאימה ל-`a << cout` ולא ל-`cout << a`. הגרסה האחרונה מעבירה ומחזירה את הזרם לפי ערך, וזרם אי אפשר להעתיק.",
      "recap": "חיצוני, ostream& בפרמטר ובהחזרה",
      "questionHtml": "<code class=\"tok\" dir=\"ltr\">a</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> הם אובייקטים מטיפוס <code class=\"tok\" dir=\"ltr\">X</code>. איזו חתימה של <code class=\"tok\" dir=\"ltr\">operator&lt;&lt;</code> (כפונקציה בעלת גוף תקין) גורמת לשורה <code class=\"tok\" dir=\"ltr\">cout &lt;&lt; a &lt;&lt; b;</code> להתקמפל?",
      "explanationHtml": "רק הגרסה החיצונית שמחזירה <code class=\"tok\" dir=\"ltr\">ostream&amp;</code> מאפשרת שרשור: התוצאה של <code class=\"tok\" dir=\"ltr\">cout &lt;&lt; a</code> היא <code class=\"tok\" dir=\"ltr\">cout</code>, והיא האופרנד השמאלי של <code class=\"tok\" dir=\"ltr\">&lt;&lt; b</code>. עם <code class=\"tok\" dir=\"ltr\">void</code> ההדפסה השנייה לא מתקמפלת. הגרסה החברה מתאימה ל-<code class=\"tok\" dir=\"ltr\">a &lt;&lt; cout</code> ולא ל-<code class=\"tok\" dir=\"ltr\">cout &lt;&lt; a</code>. הגרסה האחרונה מעבירה ומחזירה את הזרם לפי ערך, וזרם אי אפשר להעתיק.",
      "recapHtml": "חיצוני, ostream&amp; בפרמטר ובהחזרה"
     },
     {
      "id": "C03-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    int v;\n    ostream& operator<<(ostream& os) const { return os << \"X\" << v; }\n};\nint main() {\n    X x{5};\n    x << cout;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`X5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X5</code>"
       },
       {
        "id": "b",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       },
       {
        "id": "c",
        "value": "`5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">5</code>"
       },
       {
        "id": "d",
        "value": "לא מודפס כלום",
        "type": "text",
        "html": "לא מודפס כלום"
       }
      ],
      "correctId": "a",
      "explanation": "`operator<<` כפונקציה חברה מופעל על האובייקט שמשמאל: `x << cout` נקרא `x.operator<<(cout)` והוא מתקמפל ומדפיס `X5`. התוצאה מוזרה, כי המשתמשים רגילים לכתוב `cout << x`, והשורה הזאת לא הייתה מתקמפלת עם הגרסה החברה.",
      "recap": "אופרטור חבר נקרא על האופרנד השמאלי: x << cout",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X {\n    int v;\n    ostream&amp; operator&lt;&lt;(ostream&amp; os) const { return os &lt;&lt; \"X\" &lt;&lt; v; }\n};\nint main() {\n    X x{5};\n    x &lt;&lt; cout;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">operator&lt;&lt;</code> כפונקציה חברה מופעל על האובייקט שמשמאל: <code class=\"tok\" dir=\"ltr\">x &lt;&lt; cout</code> נקרא <code class=\"tok\" dir=\"ltr\">x.operator&lt;&lt;(cout)</code> והוא מתקמפל ומדפיס <code class=\"tok\" dir=\"ltr\">X5</code>. התוצאה מוזרה, כי המשתמשים רגילים לכתוב <code class=\"tok\" dir=\"ltr\">cout &lt;&lt; x</code>, והשורה הזאת לא הייתה מתקמפלת עם הגרסה החברה.",
      "recapHtml": "אופרטור חבר נקרא על האופרנד השמאלי: x &lt;&lt; cout"
     },
     {
      "id": "C03-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct P { int a, b; };\nistream& operator>>(istream& is, P& p) {\n    return is >> p.a >> p.b;\n}\nint main() {\n    istringstream in(\"7 8 9 10\");\n    P p, q;\n    in >> p >> q;\n    cout << p.a << q.b;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`710`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">710</code>"
       },
       {
        "id": "b",
        "value": "`78`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">78</code>"
       },
       {
        "id": "c",
        "value": "`89`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">89</code>"
       },
       {
        "id": "d",
        "value": "`910`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">910</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`in >> p` קורא את 7 ו-8 לתוך `p`, ומחזיר את `in`, ואז `>> q` קורא 9 ו-10 לתוך `q`. מדפיסים `p.a` (7) ו-`q.b` (10): `710`. התשובות האחרות הן צירופים של שדות אחרים.",
      "recap": "operator>> מקבל P& ללא const ומחזיר את הזרם",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct P { int a, b; };\nistream&amp; operator&gt;&gt;(istream&amp; is, P&amp; p) {\n    return is &gt;&gt; p.a &gt;&gt; p.b;\n}\nint main() {\n    istringstream in(\"7 8 9 10\");\n    P p, q;\n    in &gt;&gt; p &gt;&gt; q;\n    cout &lt;&lt; p.a &lt;&lt; q.b;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">in &gt;&gt; p</code> קורא את 7 ו-8 לתוך <code class=\"tok\" dir=\"ltr\">p</code>, ומחזיר את <code class=\"tok\" dir=\"ltr\">in</code>, ואז <code class=\"tok\" dir=\"ltr\">&gt;&gt; q</code> קורא 9 ו-10 לתוך <code class=\"tok\" dir=\"ltr\">q</code>. מדפיסים <code class=\"tok\" dir=\"ltr\">p.a</code> (7) ו-<code class=\"tok\" dir=\"ltr\">q.b</code> (10): <code class=\"tok\" dir=\"ltr\">710</code>. התשובות האחרות הן צירופים של שדות אחרים.",
      "recapHtml": "operator&gt;&gt; מקבל P&amp; ללא const ומחזיר את הזרם"
     },
     {
      "id": "C03-Q5",
      "question": "במחלקה `X` שדה פרטי `v` ופונקציה ציבורית `int get() const`. אין הצהרות `friend`. מה אפשר לכתוב במקום `____` כדי שהפונקציה תתקמפל?\n```cpp\nostream& operator<<(ostream& os, const X& x) {\n    return os << ____;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`x.get()`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">x.get()</code>"
       },
       {
        "id": "b",
        "value": "`x.v`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">x.v</code>"
       },
       {
        "id": "c",
        "value": "`v`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">v</code>"
       },
       {
        "id": "d",
        "value": "`X::v`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X::v</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הפונקציה חיצונית ואינה friend, ולכן היא יכולה להשתמש רק בממשק הציבורי: `x.get()`. הגישה `x.v` לשדה פרטי נכשלת. `v` לבדו לא קיים בפונקציה חיצונית (אין `this`). גם `X::v` לא עוזר: השדה לא סטטי ופרטי.",
      "recap": "בלי friend: רק דרך הפונקציות הציבוריות",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">X</code> שדה פרטי <code class=\"tok\" dir=\"ltr\">v</code> ופונקציה ציבורית <code class=\"tok\" dir=\"ltr\">int get() const</code>. אין הצהרות <code class=\"tok\" dir=\"ltr\">friend</code>. מה אפשר לכתוב במקום <code class=\"tok\" dir=\"ltr\">____</code> כדי שהפונקציה תתקמפל?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const X&amp; x) {\n    return os &lt;&lt; ____;\n}</code></pre>",
      "explanationHtml": "הפונקציה חיצונית ואינה friend, ולכן היא יכולה להשתמש רק בממשק הציבורי: <code class=\"tok\" dir=\"ltr\">x.get()</code>. הגישה <code class=\"tok\" dir=\"ltr\">x.v</code> לשדה פרטי נכשלת. <code class=\"tok\" dir=\"ltr\">v</code> לבדו לא קיים בפונקציה חיצונית (אין <code class=\"tok\" dir=\"ltr\">this</code>). גם <code class=\"tok\" dir=\"ltr\">X::v</code> לא עוזר: השדה לא סטטי ופרטי.",
      "recapHtml": "בלי friend: רק דרך הפונקציות הציבוריות"
     }
    ]
   },
   {
    "id": "C04",
    "order": 4,
    "icon": "⬆️",
    "title": "++ לפני ואחרי",
    "goal": "להבדיל בין ++x ל-x++ בהעמסה: החתימות, ערך ההחזרה והאפקט.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>ל-<code>++</code> יש שתי צורות, והקומפיילר מבחין ביניהן לפי <b>פרמטר <code>int</code> מדומה</b>:</p>\n<table>\n<thead><tr><th>הביטוי</th><th>החתימה (חבר)</th><th>מה מחזירים</th></tr></thead>\n<tbody>\n<tr><td><code>++x</code> (prefix)</td><td><code>X&amp; operator++()</code></td><td>את האובייקט עצמו, אחרי השינוי (בהפניה)</td></tr>\n<tr><td><code>x++</code> (postfix)</td><td><code>X operator++(int)</code></td><td>עותק של הערך <b>הישן</b> (לפי ערך)</td></tr>\n</tbody></table>\n<ul>\n<li>הפרמטר <code>int</code> של ה-postfix לא משמש לכלום, הקומפיילר מעביר אליו 0 רק כדי להבדיל בין החתימות.</li>\n<li>ה-postfix שומר עותק של הערך הישן, מגדיל את האובייקט, ומחזיר את העותק. לכן הוא מחזיר <b>לפי ערך</b>: אי אפשר להחזיר הפניה למשתנה מקומי.</li>\n<li>כפונקציה חיצונית: <code>X&amp; operator++(X&amp;)</code> ו-<code>X operator++(X&amp;, int)</code>.</li>\n<li>אם מוגדר רק <code>operator++()</code>, הביטוי <code>x++</code> לא מתקמפל, ולהפך.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>prefix: בלי פרמטר, מחזיר הפניה. postfix: <code>(int)</code>, מחזיר עותק של הערך הישן.</b></div>\n<div class=\"lesson-ex\">\n<pre>struct C {\n    int n;\n    C&amp; operator++()    { ++n; return *this; }\n    C  operator++(int) { C old = *this; ++n; return old; }\n};\nC c{5};\nC a = ++c;   // c.n = 6, a.n = 6\nC b = c++;   // b.n = 6 (הישן), c.n = 7</pre></div>\n"
    },
    "questions": [
     {
      "id": "C04-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct C {\n    int n;\n    C(int a) : n(a) {}\n    C& operator++() { ++n; return *this; }\n    C operator++(int) { C old = *this; ++n; return old; }\n};\nint main() {\n    C c(5);\n    C a = ++c;\n    C b = c++;\n    cout << a.n << b.n << c.n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`667`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">667</code>"
       },
       {
        "id": "b",
        "value": "`656`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">656</code>"
       },
       {
        "id": "c",
        "value": "`677`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">677</code>"
       },
       {
        "id": "d",
        "value": "`567`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">567</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`++c` מעלה את `c` ל-6 ומחזיר אותו: `a.n = 6`. `c++` מחזיר עותק של הערך הישן (6), ואז מעלה את `c` ל-7: `b.n = 6`, `c.n = 7`. התשובה `677` נותנת ל-`b` את הערך החדש. `567` ו-`656` מתבססות על ערך התחלתי לא נכון או על ערך ישן ב-prefix.",
      "recap": "prefix מחזיר את החדש, postfix את הישן",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct C {\n    int n;\n    C(int a) : n(a) {}\n    C&amp; operator++() { ++n; return *this; }\n    C operator++(int) { C old = *this; ++n; return old; }\n};\nint main() {\n    C c(5);\n    C a = ++c;\n    C b = c++;\n    cout &lt;&lt; a.n &lt;&lt; b.n &lt;&lt; c.n;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">++c</code> מעלה את <code class=\"tok\" dir=\"ltr\">c</code> ל-6 ומחזיר אותו: <code class=\"tok\" dir=\"ltr\">a.n = 6</code>. <code class=\"tok\" dir=\"ltr\">c++</code> מחזיר עותק של הערך הישן (6), ואז מעלה את <code class=\"tok\" dir=\"ltr\">c</code> ל-7: <code class=\"tok\" dir=\"ltr\">b.n = 6</code>, <code class=\"tok\" dir=\"ltr\">c.n = 7</code>. התשובה <code class=\"tok\" dir=\"ltr\">677</code> נותנת ל-<code class=\"tok\" dir=\"ltr\">b</code> את הערך החדש. <code class=\"tok\" dir=\"ltr\">567</code> ו-<code class=\"tok\" dir=\"ltr\">656</code> מתבססות על ערך התחלתי לא נכון או על ערך ישן ב-prefix.",
      "recapHtml": "prefix מחזיר את החדש, postfix את הישן"
     },
     {
      "id": "C04-Q2",
      "question": "במחלקה `C` מוגדר רק `C& operator++()` (חבר). `c` הוא אובייקט לא `const` מטיפוס `C`. איזו שורה **לא** מתקמפלת?",
      "options": [
       {
        "id": "a",
        "value": "`++c;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">++c;</code>"
       },
       {
        "id": "b",
        "value": "`c++;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">c++;</code>"
       },
       {
        "id": "c",
        "value": "`++(++c);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">++(++c);</code>"
       },
       {
        "id": "d",
        "value": "`c.operator++();`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">c.operator++();</code>"
       }
      ],
      "correctId": "b",
      "explanation": "הביטוי `c++` דורש `operator++(int)`, שלא הוגדר. `++c` תקין. `++(++c)` תקין כי `++c` מחזיר הפניה לאובייקט עצמו וגם אפשר להגדיל אותו שוב. `c.operator++()` היא הקריאה המפורשת ל-prefix.",
      "recap": "x++ דורש operator++(int)",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">C</code> מוגדר רק <code class=\"tok\" dir=\"ltr\">C&amp; operator++()</code> (חבר). <code class=\"tok\" dir=\"ltr\">c</code> הוא אובייקט לא <code class=\"tok\" dir=\"ltr\">const</code> מטיפוס <code class=\"tok\" dir=\"ltr\">C</code>. איזו שורה <strong>לא</strong> מתקמפלת?",
      "explanationHtml": "הביטוי <code class=\"tok\" dir=\"ltr\">c++</code> דורש <code class=\"tok\" dir=\"ltr\">operator++(int)</code>, שלא הוגדר. <code class=\"tok\" dir=\"ltr\">++c</code> תקין. <code class=\"tok\" dir=\"ltr\">++(++c)</code> תקין כי <code class=\"tok\" dir=\"ltr\">++c</code> מחזיר הפניה לאובייקט עצמו וגם אפשר להגדיל אותו שוב. <code class=\"tok\" dir=\"ltr\">c.operator++()</code> היא הקריאה המפורשת ל-prefix.",
      "recapHtml": "x++ דורש operator++(int)"
     },
     {
      "id": "C04-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct C {\n    int n;\n    C(int a) : n(a) {}\n    C operator++(int k) {\n        cout << \"k=\" << k << \" \";\n        C o = *this;\n        n += 1;\n        return o;\n    }\n};\nint main() {\n    C c(1);\n    c++;\n    c.operator++(7);\n    cout << c.n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`k=0 k=7 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">k=0 k=7 3</code>"
       },
       {
        "id": "b",
        "value": "`k=1 k=7 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">k=1 k=7 3</code>"
       },
       {
        "id": "c",
        "value": "`k=0 k=0 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">k=0 k=0 3</code>"
       },
       {
        "id": "d",
        "value": "`k=0 k=7 10`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">k=0 k=7 10</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בביטוי `c++` הקומפיילר מעביר 0 לפרמטר המדומה, ובקריאה המפורשת `c.operator++(7)` מועבר 7 כפי שנכתב. בכל קריאה `n` גדל ב-1, ולכן בסוף `n = 3`. התשובה `k=1` ו-`k=0 k=0` מניחות ערכים אחרים לפרמטר. `10` מניחה שהערך 7 נכנס לשדה, אבל הפרמטר אינו בשימוש בגוף הפונקציה.",
      "recap": "ב-x++ הקומפיילר מעביר 0 לפרמטר ה-int",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct C {\n    int n;\n    C(int a) : n(a) {}\n    C operator++(int k) {\n        cout &lt;&lt; \"k=\" &lt;&lt; k &lt;&lt; \" \";\n        C o = *this;\n        n += 1;\n        return o;\n    }\n};\nint main() {\n    C c(1);\n    c++;\n    c.operator++(7);\n    cout &lt;&lt; c.n;\n}</code></pre>",
      "explanationHtml": "בביטוי <code class=\"tok\" dir=\"ltr\">c++</code> הקומפיילר מעביר 0 לפרמטר המדומה, ובקריאה המפורשת <code class=\"tok\" dir=\"ltr\">c.operator++(7)</code> מועבר 7 כפי שנכתב. בכל קריאה <code class=\"tok\" dir=\"ltr\">n</code> גדל ב-1, ולכן בסוף <code class=\"tok\" dir=\"ltr\">n = 3</code>. התשובה <code class=\"tok\" dir=\"ltr\">k=1</code> ו-<code class=\"tok\" dir=\"ltr\">k=0 k=0</code> מניחות ערכים אחרים לפרמטר. <code class=\"tok\" dir=\"ltr\">10</code> מניחה שהערך 7 נכנס לשדה, אבל הפרמטר אינו בשימוש בגוף הפונקציה.",
      "recapHtml": "ב-x++ הקומפיילר מעביר 0 לפרמטר ה-int"
     },
     {
      "id": "C04-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct C {\n    int n;\n    C(int a) : n(a) {}\n    C& operator++() { ++n; return *this; }\n    C operator++(int) { C o = *this; ++n; return o; }\n};\nint main() {\n    C a(1);\n    ++(++a);\n    cout << a.n;\n    (a++)++;\n    cout << \" \" << a.n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`3 4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 4</code>"
       },
       {
        "id": "b",
        "value": "`3 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 5</code>"
       },
       {
        "id": "c",
        "value": "`2 4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2 4</code>"
       },
       {
        "id": "d",
        "value": "`2 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">2 3</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`++a` מחזיר הפניה ל-`a` עצמו, ולכן `++(++a)` מעלה את `a` פעמיים: 3. ב-`(a++)++` הביטוי `a++` מעלה את `a` ל-4 ומחזיר עותק זמני של הערך הישן; ה-`++` השני מגדיל רק את העותק הזה, ו-`a` נשאר 4. לכן `3 4`. התשובה `3 5` מניחה ש-postfix מחזיר הפניה. `2 4` ו-`2 3` מניחות ש-prefix כפול מגדיל פעם אחת.",
      "recap": "postfix מחזיר עותק: ++ על התוצאה לא משפיע על המקור",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct C {\n    int n;\n    C(int a) : n(a) {}\n    C&amp; operator++() { ++n; return *this; }\n    C operator++(int) { C o = *this; ++n; return o; }\n};\nint main() {\n    C a(1);\n    ++(++a);\n    cout &lt;&lt; a.n;\n    (a++)++;\n    cout &lt;&lt; \" \" &lt;&lt; a.n;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">++a</code> מחזיר הפניה ל-<code class=\"tok\" dir=\"ltr\">a</code> עצמו, ולכן <code class=\"tok\" dir=\"ltr\">++(++a)</code> מעלה את <code class=\"tok\" dir=\"ltr\">a</code> פעמיים: 3. ב-<code class=\"tok\" dir=\"ltr\">(a++)++</code> הביטוי <code class=\"tok\" dir=\"ltr\">a++</code> מעלה את <code class=\"tok\" dir=\"ltr\">a</code> ל-4 ומחזיר עותק זמני של הערך הישן; ה-<code class=\"tok\" dir=\"ltr\">++</code> השני מגדיל רק את העותק הזה, ו-<code class=\"tok\" dir=\"ltr\">a</code> נשאר 4. לכן <code class=\"tok\" dir=\"ltr\">3 4</code>. התשובה <code class=\"tok\" dir=\"ltr\">3 5</code> מניחה ש-postfix מחזיר הפניה. <code class=\"tok\" dir=\"ltr\">2 4</code> ו-<code class=\"tok\" dir=\"ltr\">2 3</code> מניחות ש-prefix כפול מגדיל פעם אחת.",
      "recapHtml": "postfix מחזיר עותק: ++ על התוצאה לא משפיע על המקור"
     },
     {
      "id": "C04-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct C { int n; };\nC& operator++(C& c) { c.n += 10; return c; }\nC operator++(C& c, int) { C o = c; c.n += 1; return o; }\nint main() {\n    C c{0};\n    C a = c++;\n    C b = ++c;\n    cout << a.n << \" \" << b.n << \" \" << c.n;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`0 11 11`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0 11 11</code>"
       },
       {
        "id": "b",
        "value": "`1 11 11`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 11 11</code>"
       },
       {
        "id": "c",
        "value": "`0 12 12`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0 12 12</code>"
       },
       {
        "id": "d",
        "value": "`10 11 11`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">10 11 11</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`c++` קורא לגרסה עם הפרמטר המדומה: מחזיר עותק של 0 ומעלה את `c` ל-1, ולכן `a.n = 0`. אחר כך `++c` קורא לגרסת ה-prefix ומוסיף 10: `c.n = 11` ו-`b.n = 11`. התשובה `1 11 11` נותנת ל-`a` את הערך החדש. `0 12 12` ו-`10 11 11` מערבבות בין שתי הגרסאות.",
      "recap": "גם בצורה חיצונית: (C&, int) הוא postfix",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct C { int n; };\nC&amp; operator++(C&amp; c) { c.n += 10; return c; }\nC operator++(C&amp; c, int) { C o = c; c.n += 1; return o; }\nint main() {\n    C c{0};\n    C a = c++;\n    C b = ++c;\n    cout &lt;&lt; a.n &lt;&lt; \" \" &lt;&lt; b.n &lt;&lt; \" \" &lt;&lt; c.n;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">c++</code> קורא לגרסה עם הפרמטר המדומה: מחזיר עותק של 0 ומעלה את <code class=\"tok\" dir=\"ltr\">c</code> ל-1, ולכן <code class=\"tok\" dir=\"ltr\">a.n = 0</code>. אחר כך <code class=\"tok\" dir=\"ltr\">++c</code> קורא לגרסת ה-prefix ומוסיף 10: <code class=\"tok\" dir=\"ltr\">c.n = 11</code> ו-<code class=\"tok\" dir=\"ltr\">b.n = 11</code>. התשובה <code class=\"tok\" dir=\"ltr\">1 11 11</code> נותנת ל-<code class=\"tok\" dir=\"ltr\">a</code> את הערך החדש. <code class=\"tok\" dir=\"ltr\">0 12 12</code> ו-<code class=\"tok\" dir=\"ltr\">10 11 11</code> מערבבות בין שתי הגרסאות.",
      "recapHtml": "גם בצורה חיצונית: (C&amp;, int) הוא postfix"
     }
    ]
   },
   {
    "id": "C05",
    "order": 5,
    "icon": "🔁",
    "title": "בנאי המרה ו-explicit",
    "goal": "לזהות המרות אוטומטיות דרך בנאי, ולדעת מה explicit חוסם.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p><b>בנאי המרה</b> הוא בנאי שאפשר לקרוא לו עם ארגומנט אחד (<code>X(int)</code>). הוא מגדיר גם <b>המרה אוטומטית</b> מ-<code>int</code> ל-<code>X</code>:</p>\n<ul>\n<li><code>X x = 5;</code> נקרא <code>X x(5)</code> בדרך עקיפה: ההמרה מתבצעת בשבילנו.</li>\n<li>העברת <code>5</code> לפונקציה <code>void f(X)</code> היא <code>f(X(5))</code>.</li>\n<li>בביטוי כמו <code>a + 5</code> אפשר להמיר את <code>5</code> ל-<code>X</code> כשהפרמטר הוא <code>X</code>. עם אופרטור <b>חיצוני</b> גם <code>5 + a</code> עובד (גם הפרמטר השמאלי עובר המרה), בניגוד לאופרטור חבר.</li>\n<li>בהמרה אוטומטית אחת בלבד: <code>B b = 5;</code> נכשל אם צריך <code>int</code> &larr; <code>A</code> &larr; <code>B</code> (שתי המרות מוגדרות על ידי המשתמש).</li>\n</ul>\n<p><b><code>explicit</code></b> לפני הבנאי מבטל את ההמרה האוטומטית: רק קריאה מפורשת עובדת.</p>\n<table>\n<thead><tr><th>הבנאי</th><th><code>X x = 5;</code></th><th><code>f(5)</code></th><th><code>X x(5);</code></th></tr></thead>\n<tbody>\n<tr><td><code>X(int)</code></td><td>תקין</td><td>תקין</td><td>תקין</td></tr>\n<tr><td><code>explicit X(int)</code></td><td>שגיאה</td><td>שגיאה</td><td>תקין</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>בנאי עם ארגומנט אחד = המרה אוטומטית אל המחלקה. <code>explicit</code> = רק מפורש (<code>X(5)</code>, <code>X x(5)</code>, <code>static_cast&lt;X&gt;(5)</code>).</b></div>\n<div class=\"lesson-trap\">⚠️ <b>הכלל \"המרה אחת\"</b> חל על אתחול עם <code>=</code>. כשכותבים <code>B b(5);</code> (אתחול ישיר), הקומפיילר צריך להמיר רק את <code>5</code> לפרמטר של הבנאי <code>B(const A&amp;)</code>, וזו המרה אחת, ולכן זה כן מתקמפל.</div>\n"
    },
    "questions": [
     {
      "id": "C05-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    int v;\n    X(int a) { cout << \"ctor\" << a << \" \"; v = a; }\n};\nvoid f(X x) { cout << \"f\" << x.v; }\nint main() {\n    f(7);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`ctor7 f7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">ctor7 f7</code>"
       },
       {
        "id": "b",
        "value": "`f7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">f7</code>"
       },
       {
        "id": "c",
        "value": "`ctor7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">ctor7</code>"
       },
       {
        "id": "d",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       }
      ],
      "correctId": "a",
      "explanation": "הבנאי `X(int)` אינו `explicit`, ולכן הארגומנט `7` מומר ל-`X` בקריאה `f(7)`: קודם נבנה `X` ומודפס `ctor7`, ורק אחר כך הפונקציה מדפיסה `f7`. התשובה `f7` שוכחת שההמרה קוראת לבנאי. `ctor7` שוכחת שהפונקציה רצה. שגיאת קומפילציה הייתה קורית רק עם `explicit`.",
      "recap": "בנאי לא explicit ממיר ארגומנט אוטומטית",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X {\n    int v;\n    X(int a) { cout &lt;&lt; \"ctor\" &lt;&lt; a &lt;&lt; \" \"; v = a; }\n};\nvoid f(X x) { cout &lt;&lt; \"f\" &lt;&lt; x.v; }\nint main() {\n    f(7);\n}</code></pre>",
      "explanationHtml": "הבנאי <code class=\"tok\" dir=\"ltr\">X(int)</code> אינו <code class=\"tok\" dir=\"ltr\">explicit</code>, ולכן הארגומנט <code class=\"tok\" dir=\"ltr\">7</code> מומר ל-<code class=\"tok\" dir=\"ltr\">X</code> בקריאה <code class=\"tok\" dir=\"ltr\">f(7)</code>: קודם נבנה <code class=\"tok\" dir=\"ltr\">X</code> ומודפס <code class=\"tok\" dir=\"ltr\">ctor7</code>, ורק אחר כך הפונקציה מדפיסה <code class=\"tok\" dir=\"ltr\">f7</code>. התשובה <code class=\"tok\" dir=\"ltr\">f7</code> שוכחת שההמרה קוראת לבנאי. <code class=\"tok\" dir=\"ltr\">ctor7</code> שוכחת שהפונקציה רצה. שגיאת קומפילציה הייתה קורית רק עם <code class=\"tok\" dir=\"ltr\">explicit</code>.",
      "recapHtml": "בנאי לא explicit ממיר ארגומנט אוטומטית"
     },
     {
      "id": "C05-Q2",
      "question": "במחלקה `X` הבנאי `explicit X(int a)`. איזו שורה **לא** מתקמפלת?",
      "options": [
       {
        "id": "a",
        "value": "`X a(1);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X a(1);</code>"
       },
       {
        "id": "b",
        "value": "`X a = 1;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X a = 1;</code>"
       },
       {
        "id": "c",
        "value": "`X a = X(1);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X a = X(1);</code>"
       },
       {
        "id": "d",
        "value": "`X a{1};`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X a{1};</code>"
       }
      ],
      "correctId": "b",
      "explanation": "אתחול עם `=` ו-`5` ללא יצירה מפורשת דורש המרה אוטומטית, וזו בדיוק מה ש-`explicit` חוסם. `X a(1)`, `X a{1}` ו-`X a = X(1)` קוראים לבנאי במפורש.",
      "recap": "explicit חוסם את X x = 1",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">X</code> הבנאי <code class=\"tok\" dir=\"ltr\">explicit X(int a)</code>. איזו שורה <strong>לא</strong> מתקמפלת?",
      "explanationHtml": "אתחול עם <code class=\"tok\" dir=\"ltr\">=</code> ו-<code class=\"tok\" dir=\"ltr\">5</code> ללא יצירה מפורשת דורש המרה אוטומטית, וזו בדיוק מה ש-<code class=\"tok\" dir=\"ltr\">explicit</code> חוסם. <code class=\"tok\" dir=\"ltr\">X a(1)</code>, <code class=\"tok\" dir=\"ltr\">X a{1}</code> ו-<code class=\"tok\" dir=\"ltr\">X a = X(1)</code> קוראים לבנאי במפורש.",
      "recapHtml": "explicit חוסם את X x = 1"
     },
     {
      "id": "C05-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    int v;\n    X(int a = 0) : v(a) {}\n};\nX operator+(const X& a, const X& b) { return X(a.v + b.v); }\nint main() {\n    X a(2);\n    cout << (5 + a).v << (a + 5).v;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`77`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">77</code>"
       },
       {
        "id": "b",
        "value": "`75`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">75</code>"
       },
       {
        "id": "c",
        "value": "`7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">7</code>"
       },
       {
        "id": "d",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       }
      ],
      "correctId": "a",
      "explanation": "האופרטור חיצוני עם שני פרמטרים מסוג `X`, ולכן כל אחד מהאופרנדים יכול לעבור המרה דרך `X(int)`. גם `5 + a` וגם `a + 5` נותנים 7. עם אופרטור חבר, `5 + a` לא היה מתקמפל. שגיאת קומפילציה היא התשובה הנכונה רק אם הבנאי היה `explicit`.",
      "recap": "אופרטור חיצוני: שני האופרנדים עוברים המרה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X {\n    int v;\n    X(int a = 0) : v(a) {}\n};\nX operator+(const X&amp; a, const X&amp; b) { return X(a.v + b.v); }\nint main() {\n    X a(2);\n    cout &lt;&lt; (5 + a).v &lt;&lt; (a + 5).v;\n}</code></pre>",
      "explanationHtml": "האופרטור חיצוני עם שני פרמטרים מסוג <code class=\"tok\" dir=\"ltr\">X</code>, ולכן כל אחד מהאופרנדים יכול לעבור המרה דרך <code class=\"tok\" dir=\"ltr\">X(int)</code>. גם <code class=\"tok\" dir=\"ltr\">5 + a</code> וגם <code class=\"tok\" dir=\"ltr\">a + 5</code> נותנים 7. עם אופרטור חבר, <code class=\"tok\" dir=\"ltr\">5 + a</code> לא היה מתקמפל. שגיאת קומפילציה היא התשובה הנכונה רק אם הבנאי היה <code class=\"tok\" dir=\"ltr\">explicit</code>.",
      "recapHtml": "אופרטור חיצוני: שני האופרנדים עוברים המרה"
     },
     {
      "id": "C05-Q4",
      "question": "במחלקה `X` הבנאי `explicit X(int)`, והפונקציה `void f(X x)`. איזו קריאה מתקמפלת?",
      "options": [
       {
        "id": "a",
        "value": "`f(X(5));`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">f(X(5));</code>"
       },
       {
        "id": "b",
        "value": "`f(5);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">f(5);</code>"
       },
       {
        "id": "c",
        "value": "`f('a');`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">f('a');</code>"
       },
       {
        "id": "d",
        "value": "`f(5.5);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">f(5.5);</code>"
       }
      ],
      "correctId": "a",
      "explanation": "עם `explicit` ההמרה האוטומטית מ-`int` ל-`X` אסורה, ולכן רק קריאה מפורשת `f(X(5))` עובדת. `f(5)`, `f('a')` ו-`f(5.5)` דורשות המרה אוטומטית ל-`X` (עם המרה סטנדרטית נוספת ל-`int`), ונכשלות.",
      "recap": "עם explicit מפעילים את הבנאי בעצמנו",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">X</code> הבנאי <code class=\"tok\" dir=\"ltr\">explicit X(int)</code>, והפונקציה <code class=\"tok\" dir=\"ltr\">void f(X x)</code>. איזו קריאה מתקמפלת?",
      "explanationHtml": "עם <code class=\"tok\" dir=\"ltr\">explicit</code> ההמרה האוטומטית מ-<code class=\"tok\" dir=\"ltr\">int</code> ל-<code class=\"tok\" dir=\"ltr\">X</code> אסורה, ולכן רק קריאה מפורשת <code class=\"tok\" dir=\"ltr\">f(X(5))</code> עובדת. <code class=\"tok\" dir=\"ltr\">f(5)</code>, <code class=\"tok\" dir=\"ltr\">f('a')</code> ו-<code class=\"tok\" dir=\"ltr\">f(5.5)</code> דורשות המרה אוטומטית ל-<code class=\"tok\" dir=\"ltr\">X</code> (עם המרה סטנדרטית נוספת ל-<code class=\"tok\" dir=\"ltr\">int</code>), ונכשלות.",
      "recapHtml": "עם explicit מפעילים את הבנאי בעצמנו"
     },
     {
      "id": "C05-Q5",
      "question": "נתונות שתי מחלקות: `A` עם בנאי `A(int)` ו-`B` עם בנאי `B(const A&)`. שניהם לא `explicit`. איזו שורה **לא** מתקמפלת?",
      "options": [
       {
        "id": "a",
        "value": "`B b = 5;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B b = 5;</code>"
       },
       {
        "id": "b",
        "value": "`B b = A(5);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B b = A(5);</code>"
       },
       {
        "id": "c",
        "value": "`B b(5);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B b(5);</code>"
       },
       {
        "id": "d",
        "value": "`B b = B(A(5));`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B b = B(A(5));</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ב-`B b = 5;` צריך שתי המרות מוגדרות על ידי המשתמש ברצף: `int` ל-`A` ואחר כך `A` ל-`B`, וזה אסור. ב-`B b = A(5);` יש המרה אחת (`A` ל-`B`). ב-`B b(5);` זה אתחול ישיר: ההמרה היחידה היא של `5` לפרמטר `A`. ב-`B(A(5))` הכול מפורש.",
      "recap": "אתחול עם = מתיר המרה אחת מוגדרת-משתמש",
      "questionHtml": "נתונות שתי מחלקות: <code class=\"tok\" dir=\"ltr\">A</code> עם בנאי <code class=\"tok\" dir=\"ltr\">A(int)</code> ו-<code class=\"tok\" dir=\"ltr\">B</code> עם בנאי <code class=\"tok\" dir=\"ltr\">B(const A&amp;)</code>. שניהם לא <code class=\"tok\" dir=\"ltr\">explicit</code>. איזו שורה <strong>לא</strong> מתקמפלת?",
      "explanationHtml": "ב-<code class=\"tok\" dir=\"ltr\">B b = 5;</code> צריך שתי המרות מוגדרות על ידי המשתמש ברצף: <code class=\"tok\" dir=\"ltr\">int</code> ל-<code class=\"tok\" dir=\"ltr\">A</code> ואחר כך <code class=\"tok\" dir=\"ltr\">A</code> ל-<code class=\"tok\" dir=\"ltr\">B</code>, וזה אסור. ב-<code class=\"tok\" dir=\"ltr\">B b = A(5);</code> יש המרה אחת (<code class=\"tok\" dir=\"ltr\">A</code> ל-<code class=\"tok\" dir=\"ltr\">B</code>). ב-<code class=\"tok\" dir=\"ltr\">B b(5);</code> זה אתחול ישיר: ההמרה היחידה היא של <code class=\"tok\" dir=\"ltr\">5</code> לפרמטר <code class=\"tok\" dir=\"ltr\">A</code>. ב-<code class=\"tok\" dir=\"ltr\">B(A(5))</code> הכול מפורש.",
      "recapHtml": "אתחול עם = מתיר המרה אחת מוגדרת-משתמש"
     }
    ]
   },
   {
    "id": "C06",
    "order": 6,
    "icon": "🎯",
    "title": "אופרטורי המרה",
    "goal": "להגדיר המרה מהמחלקה אל טיפוס אחר, ולהבין מה explicit operator משנה.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>בנאי ממיר <b>אל</b> המחלקה. כדי להמיר <b>מ</b>המחלקה לטיפוס אחר כותבים <b>אופרטור המרה</b> בתוך המחלקה:</p>\n<pre>class M {\n    double v;\npublic:\n    M(double a) : v(a) {}\n    operator int() const { return (int)v; }   // M &rarr; int\n};</pre>\n<ul>\n<li>השם הוא <code>operator</code> ואחריו הטיפוס, ו<b>אין טיפוס החזרה</b> ואין פרמטרים. הטיפוס מופיע בשם.</li>\n<li>עכשיו <code>int n = m;</code>, <code>(int)m</code> ו-<code>m + 1</code> (חיבור <code>int</code>) מתקמפלים. גם <code>cout &lt;&lt; m</code> עובד, כי הוא מומר ל-<code>int</code> שאפשר להדפיס.</li>\n<li><code>explicit operator bool() const</code> מאפשר שימוש רק במקומות שבהם בכל מקרה מצפים לתנאי: <code>if (m)</code>, <code>while</code>, <code>!m</code>, <code>&amp;&amp;</code>, וגם המרה מפורשת <code>(bool)m</code>. אבל <code>bool b = m;</code> אסור.</li>\n</ul>\n<table>\n<thead><tr><th>מה רוצים</th><th>מה כותבים</th><th>איפה</th></tr></thead>\n<tbody>\n<tr><td><code>int</code> &rarr; <code>X</code></td><td>בנאי <code>X(int)</code></td><td>ב-<code>X</code></td></tr>\n<tr><td><code>X</code> &rarr; <code>int</code></td><td><code>operator int() const</code></td><td>ב-<code>X</code></td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>לכיוון אל המחלקה: בנאי. לכיוון החוצה: <code>operator T()</code> בלי טיפוס החזרה.</b></div>\n<div class=\"lesson-trap\">⚠️ אי אפשר להגדיר פונקציה בתוך <code>int</code>. כשרוצים לקבל <code>int</code> מאובייקט, ההגדרה תמיד נמצאת במחלקה שלנו.</div>\n"
    },
    "questions": [
     {
      "id": "C06-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct M {\n    double v;\n    M(double a) : v(a) {}\n    operator int() const { return (int)v; }\n};\nint main() {\n    M m(3.9);\n    int n = m;\n    cout << n << \" \" << m + 1;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`3 4`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 4</code>"
       },
       {
        "id": "b",
        "value": "`3 4.9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 4.9</code>"
       },
       {
        "id": "c",
        "value": "`4 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">4 5</code>"
       },
       {
        "id": "d",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       }
      ],
      "correctId": "a",
      "explanation": "`int n = m;` משתמש באופרטור ההמרה ו-`(int)3.9` נחתך ל-3. גם ב-`m + 1` האובייקט מומר ל-`int` (3), ואז מחברים 1 ומקבלים 4. התשובה `3 4.9` שוכחת שההמרה עוברת דרך `int`. `4 5` מניחה עיגול במקום חיתוך. אין שגיאת קומפילציה.",
      "recap": "operator int ממיר את האובייקט ל-int בכל ביטוי חשבוני",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct M {\n    double v;\n    M(double a) : v(a) {}\n    operator int() const { return (int)v; }\n};\nint main() {\n    M m(3.9);\n    int n = m;\n    cout &lt;&lt; n &lt;&lt; \" \" &lt;&lt; m + 1;\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">int n = m;</code> משתמש באופרטור ההמרה ו-<code class=\"tok\" dir=\"ltr\">(int)3.9</code> נחתך ל-3. גם ב-<code class=\"tok\" dir=\"ltr\">m + 1</code> האובייקט מומר ל-<code class=\"tok\" dir=\"ltr\">int</code> (3), ואז מחברים 1 ומקבלים 4. התשובה <code class=\"tok\" dir=\"ltr\">3 4.9</code> שוכחת שההמרה עוברת דרך <code class=\"tok\" dir=\"ltr\">int</code>. <code class=\"tok\" dir=\"ltr\">4 5</code> מניחה עיגול במקום חיתוך. אין שגיאת קומפילציה.",
      "recapHtml": "operator int ממיר את האובייקט ל-int בכל ביטוי חשבוני"
     },
     {
      "id": "C06-Q2",
      "question": "במחלקה `Temp` יש בנאי `Temp(double)` ושדה פרטי `double c`. מה צריך להוסיף למחלקה כדי שהשורה `Temp t(3); double d = t;` תתקמפל?",
      "options": [
       {
        "id": "a",
        "value": "`operator double() const { return c; }`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">operator double() const { return c; }</code>"
       },
       {
        "id": "b",
        "value": "`Temp(int x) { c = x; }` (עוד בנאי, הפעם מ-int)",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Temp(int x) { c = x; }</code> (עוד בנאי, הפעם מ-int)"
       },
       {
        "id": "c",
        "value": "`double operator Temp() const { return c; }`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">double operator Temp() const { return c; }</code>"
       },
       {
        "id": "d",
        "value": "`Temp operator double() const { return *this; }`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Temp operator double() const { return *this; }</code>"
       }
      ],
      "correctId": "a",
      "explanation": "כדי להמיר `Temp` ל-`double` כותבים `operator double()`, בלי טיפוס החזרה. עוד בנאי ממיר בכיוון ההפוך (אל `Temp`) ולכן לא עוזר. בשתי האפשרויות האחרונות יש טיפוס החזרה לפני המילה `operator`, וזה אסור באופרטור המרה.",
      "recap": "operator double() const — בלי טיפוס החזרה",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">Temp</code> יש בנאי <code class=\"tok\" dir=\"ltr\">Temp(double)</code> ושדה פרטי <code class=\"tok\" dir=\"ltr\">double c</code>. מה צריך להוסיף למחלקה כדי שהשורה <code class=\"tok\" dir=\"ltr\">Temp t(3); double d = t;</code> תתקמפל?",
      "explanationHtml": "כדי להמיר <code class=\"tok\" dir=\"ltr\">Temp</code> ל-<code class=\"tok\" dir=\"ltr\">double</code> כותבים <code class=\"tok\" dir=\"ltr\">operator double()</code>, בלי טיפוס החזרה. עוד בנאי ממיר בכיוון ההפוך (אל <code class=\"tok\" dir=\"ltr\">Temp</code>) ולכן לא עוזר. בשתי האפשרויות האחרונות יש טיפוס החזרה לפני המילה <code class=\"tok\" dir=\"ltr\">operator</code>, וזה אסור באופרטור המרה.",
      "recapHtml": "operator double() const — בלי טיפוס החזרה"
     },
     {
      "id": "C06-Q3",
      "question": "למחלקה `S` מוגדר `explicit operator bool() const`. `s` הוא אובייקט מטיפוס `S`. איזו שורה **לא** מתקמפלת?",
      "options": [
       {
        "id": "a",
        "value": "`if (s) {}`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">if (s) {}</code>"
       },
       {
        "id": "b",
        "value": "`bool b = s;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">bool b = s;</code>"
       },
       {
        "id": "c",
        "value": "`bool b = (bool)s;`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">bool b = (bool)s;</code>"
       },
       {
        "id": "d",
        "value": "`bool b(s);`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">bool b(s);</code>"
       }
      ],
      "correctId": "b",
      "explanation": "אופרטור המרה `explicit` לא משתתף באתחול עם `=`, ולכן `bool b = s;` נכשלת. בתנאי של `if` ההמרה מותרת (המרה מוקשרת להקשר), `(bool)s` היא המרה מפורשת, ו-`bool b(s)` היא אתחול ישיר.",
      "recap": "explicit operator bool: מותר ב-if ובהמרה מפורשת, לא ב-bool b = s",
      "questionHtml": "למחלקה <code class=\"tok\" dir=\"ltr\">S</code> מוגדר <code class=\"tok\" dir=\"ltr\">explicit operator bool() const</code>. <code class=\"tok\" dir=\"ltr\">s</code> הוא אובייקט מטיפוס <code class=\"tok\" dir=\"ltr\">S</code>. איזו שורה <strong>לא</strong> מתקמפלת?",
      "explanationHtml": "אופרטור המרה <code class=\"tok\" dir=\"ltr\">explicit</code> לא משתתף באתחול עם <code class=\"tok\" dir=\"ltr\">=</code>, ולכן <code class=\"tok\" dir=\"ltr\">bool b = s;</code> נכשלת. בתנאי של <code class=\"tok\" dir=\"ltr\">if</code> ההמרה מותרת (המרה מוקשרת להקשר), <code class=\"tok\" dir=\"ltr\">(bool)s</code> היא המרה מפורשת, ו-<code class=\"tok\" dir=\"ltr\">bool b(s)</code> היא אתחול ישיר.",
      "recapHtml": "explicit operator bool: מותר ב-if ובהמרה מפורשת, לא ב-bool b = s"
     },
     {
      "id": "C06-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct S {\n    int n;\n    operator int() const { return n * 2; }\n};\nint main() {\n    S s{4};\n    cout << s << \" \" << s + 1;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`8 9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">8 9</code>"
       },
       {
        "id": "b",
        "value": "`4 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">4 5</code>"
       },
       {
        "id": "c",
        "value": "`8 5`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">8 5</code>"
       },
       {
        "id": "d",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       }
      ],
      "correctId": "a",
      "explanation": "אין `operator<<` למחלקה, אבל `cout << s` מתקמפל כי `s` מומר ל-`int` דרך אופרטור ההמרה, וההמרה מחזירה `n * 2 = 8`. גם `s + 1` ממיר ל-`int`: `8 + 1 = 9`. התשובה `4 5` מתעלמת מההמרה, ו-`8 5` מניחה שהחיבור משתמש בשדה `n`.",
      "recap": "אופרטור המרה מאפשר שימוש באובייקט בכל מקום שמצפה ל-int",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct S {\n    int n;\n    operator int() const { return n * 2; }\n};\nint main() {\n    S s{4};\n    cout &lt;&lt; s &lt;&lt; \" \" &lt;&lt; s + 1;\n}</code></pre>",
      "explanationHtml": "אין <code class=\"tok\" dir=\"ltr\">operator&lt;&lt;</code> למחלקה, אבל <code class=\"tok\" dir=\"ltr\">cout &lt;&lt; s</code> מתקמפל כי <code class=\"tok\" dir=\"ltr\">s</code> מומר ל-<code class=\"tok\" dir=\"ltr\">int</code> דרך אופרטור ההמרה, וההמרה מחזירה <code class=\"tok\" dir=\"ltr\">n * 2 = 8</code>. גם <code class=\"tok\" dir=\"ltr\">s + 1</code> ממיר ל-<code class=\"tok\" dir=\"ltr\">int</code>: <code class=\"tok\" dir=\"ltr\">8 + 1 = 9</code>. התשובה <code class=\"tok\" dir=\"ltr\">4 5</code> מתעלמת מההמרה, ו-<code class=\"tok\" dir=\"ltr\">8 5</code> מניחה שהחיבור משתמש בשדה <code class=\"tok\" dir=\"ltr\">n</code>.",
      "recapHtml": "אופרטור המרה מאפשר שימוש באובייקט בכל מקום שמצפה ל-int"
     },
     {
      "id": "C06-Q5",
      "question": "איזו הצהרה תקינה כאופרטור המרה ל-`int` בתוך מחלקה `S`?\n```cpp\nstruct S {\n    ____ { return 1; }\n};\n```",
      "options": [
       {
        "id": "a",
        "value": "`operator int() const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">operator int() const</code>"
       },
       {
        "id": "b",
        "value": "`int operator int() const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">int operator int() const</code>"
       },
       {
        "id": "c",
        "value": "`operator int(int k) const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">operator int(int k) const</code>"
       },
       {
        "id": "d",
        "value": "`void operator int() const`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">void operator int() const</code>"
       }
      ],
      "correctId": "a",
      "explanation": "אופרטור המרה כתוב בלי טיפוס החזרה ובלי פרמטרים: `operator int()`. הטיפוס שמוחזר נקבע לפי השם. טיפוס החזרה מפורש (`int` או `void`) לפני `operator` אסור, ופרמטר לא מאפשר המרה אוטומטית.",
      "recap": "אין טיפוס החזרה ואין פרמטרים באופרטור המרה",
      "questionHtml": "איזו הצהרה תקינה כאופרטור המרה ל-<code class=\"tok\" dir=\"ltr\">int</code> בתוך מחלקה <code class=\"tok\" dir=\"ltr\">S</code>?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct S {\n    ____ { return 1; }\n};</code></pre>",
      "explanationHtml": "אופרטור המרה כתוב בלי טיפוס החזרה ובלי פרמטרים: <code class=\"tok\" dir=\"ltr\">operator int()</code>. הטיפוס שמוחזר נקבע לפי השם. טיפוס החזרה מפורש (<code class=\"tok\" dir=\"ltr\">int</code> או <code class=\"tok\" dir=\"ltr\">void</code>) לפני <code class=\"tok\" dir=\"ltr\">operator</code> אסור, ופרמטר לא מאפשר המרה אוטומטית.",
      "recapHtml": "אין טיפוס החזרה ואין פרמטרים באופרטור המרה"
     }
    ]
   },
   {
    "id": "C07",
    "order": 7,
    "icon": "🏆",
    "title": "מבחן גמר: אופרטורים והמרות",
    "goal": "לפתור שאלות אמיתיות מהמבחנים על העמסת אופרטורים והמרות.",
    "source": "ai-verified",
    "boss": true,
    "lesson": {
     "html": "\n<p>בשאלות המבחן על אופרטורים והמרות, ארבע שאלות מספיקות כדי לפתור כמעט הכול:</p>\n<ol>\n<li><b>מי האופרנד השמאלי?</b> אם הוא מהמחלקה: אפשר אופרטור חבר (פרמטר אחד). אם לא (<code>5 + x</code>, <code>cout &lt;&lt; x</code>): חובה פונקציה חיצונית.</li>\n<li><b>האם הפונקציה צריכה שדות פרטיים?</b> כן: <code>friend</code>. לא: פונקציה חיצונית רגילה מספיקה.</li>\n<li><b>prefix או postfix?</b> <code>++x</code> בלי פרמטר ומחזיר הפניה. <code>x++</code> עם <code>int</code> מדומה ומחזיר עותק של הערך הישן.</li>\n<li><b>לאיזה כיוון ההמרה?</b> אל המחלקה: בנאי עם ארגומנט אחד (<code>explicit</code> חוסם המרה אוטומטית). מהמחלקה: <code>operator T()</code> בלי טיפוס החזרה.</li>\n</ol>\n<div class=\"lesson-rule\">🔑 בשאלת \"כמה שגיאות\": בודקים כל שורה לחוד ושואלים איזה אופרטור או המרה היא דורשת, ואם הוא מוגדר.</div>\n<div class=\"lesson-trap\">⚠️ <b>המרה אוטומטית אחת בלבד</b> ברצף, ו-<code>cout &lt;&lt; x</code> חייב להיות פונקציה חיצונית גם כש<code>friend</code> לא נדרש.</div>\n"
    },
    "questions": [
     {
      "bankId": "18A-B-Q7",
      "recap": "אופרנד שמאלי שאינו מהמחלקה: פונקציה חיצונית.",
      "recapHtml": "אופרנד שמאלי שאינו מהמחלקה: פונקציה חיצונית."
     },
     {
      "bankId": "19A-B-Q23",
      "recap": "operator<< חיצוני; friend רק אם צריך שדות פרטיים.",
      "recapHtml": "operator&lt;&lt; חיצוני; friend רק אם צריך שדות פרטיים."
     },
     {
      "bankId": "22B-B-Q11",
      "recap": "prefix מחזיר את החדש, postfix את הישן.",
      "recapHtml": "prefix מחזיר את החדש, postfix את הישן."
     },
     {
      "bankId": "21S-B-Q16",
      "recap": "x++ דורש operator++(int); cout << a דורש operator<<.",
      "recapHtml": "x++ דורש operator++(int); cout &lt;&lt; a דורש operator&lt;&lt;."
     },
     {
      "bankId": "21B-A-Q7",
      "recap": "בנאי לא explicit ו-operator int מאפשרים המרות בשני הכיוונים.",
      "recapHtml": "בנאי לא explicit ו-operator int מאפשרים המרות בשני הכיוונים."
     },
     {
      "bankId": "22B-B-Q15",
      "recap": "operator A() ממיר מ-B ל-A, לא להפך.",
      "recapHtml": "operator A() ממיר מ-B ל-A, לא להפך."
     }
    ]
   }
  ]
 },
 "virtual": {
  "levels": [
   {
    "id": "C01",
    "order": 1,
    "icon": "🎯",
    "title": "וירטואלית או לא?",
    "goal": "לקבוע בכל קריאה דרך מצביע אם הבחירה לפי הטיפוס המוצהר או לפי האובייקט האמיתי.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>הקריאה <code>p->f()</code> דרך מצביע לאב יכולה להתנהג בשתי דרכים, ותלוי בשאלה אחת: <b>האם <code>f</code> מוגדרת <code>virtual</code> במחלקת האב?</b></p>\n<table>\n<thead><tr><th>f באב</th><th>הקריאה דרך מצביע לאב</th><th>מי נבחר</th></tr></thead>\n<tbody>\n<tr><td>רגילה</td><td><code>A* p = &amp;b; p->f();</code></td><td>לפי הטיפוס <b>המוצהר</b> של המצביע (<code>A</code>), נקבע בקומפילציה</td></tr>\n<tr><td><code>virtual</code></td><td><code>A* p = &amp;b; p->f();</code></td><td>לפי הטיפוס <b>האמיתי</b> של האובייקט (<code>B</code>), נקבע בזמן ריצה</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>וירטואלי + מצביע (או הפניה) = הטיפוס האמיתי. כל השאר = הטיפוס המוצהר.</b> השאלה \"וירטואלית?\" נבדקת במחלקה של המצביע: אם <code>virtual</code> מופיעה רק במחלקה היורשת, קריאה דרך מצביע לאב עדיין לא וירטואלית.</div>\n<div class=\"lesson-ex\">נעקוב:\n<pre>struct A { virtual void f() { cout &lt;&lt; \"A \"; }  void g() { cout &lt;&lt; \"a \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; }  void g() { cout &lt;&lt; \"b \"; } };\nB b;\nA* p = &amp;b;\np-&gt;f();   // B  (f virtual, real type B)\np-&gt;g();   // a  (g not virtual, declared type A)</pre></div>\n<div class=\"lesson-trap\">⚠️ קריאה על אובייקט עצמו (<code>b.f()</code>) תמיד לפי הטיפוס שלו, כי אין כאן מצביע ולכן אין מה לבחור בזמן ריצה. גם אובייקט שהועתק בערך (<code>A a = b;</code>) הוא כבר אובייקט <code>A</code> מלא, ולכן <code>a.f()</code> היא <code>A::f</code>. וכשכותבים שם מלא (<code>p-&gt;A::f()</code>) נבחרת תמיד הגרסה של <code>A</code>, גם אם <code>f</code> וירטואלית.</div>\n"
    },
    "questions": [
     {
      "id": "C01-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    B* q = &b;\n    p->f();\n    q->f();\n    b.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B B</code>"
       },
       {
        "id": "b",
        "value": "`B B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B B</code>"
       },
       {
        "id": "c",
        "value": "`A A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A A</code>"
       },
       {
        "id": "d",
        "value": "`A A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`f` אינה וירטואלית, ולכן הקריאה נקבעת לפי הטיפוס המוצהר. `p` הוא `A*` ולכן `A::f`; `q` הוא `B*` ולכן `B::f`; ו-`b.f()` על `B`. התשובה `B B B` מניחה שהטיפוס האמיתי תמיד מנצח, וזה נכון רק לפונקציה וירטואלית. `A A A` מתעלמת מכך שהמצביע `q` ו-`b` הם מטיפוס `B`.",
      "recap": "בלי virtual: הטיפוס המוצהר קובע",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nint main() {\n    B b;\n    A* p = &amp;b;\n    B* q = &amp;b;\n    p-&gt;f();\n    q-&gt;f();\n    b.f();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">f</code> אינה וירטואלית, ולכן הקריאה נקבעת לפי הטיפוס המוצהר. <code class=\"tok\" dir=\"ltr\">p</code> הוא <code class=\"tok\" dir=\"ltr\">A*</code> ולכן <code class=\"tok\" dir=\"ltr\">A::f</code>; <code class=\"tok\" dir=\"ltr\">q</code> הוא <code class=\"tok\" dir=\"ltr\">B*</code> ולכן <code class=\"tok\" dir=\"ltr\">B::f</code>; ו-<code class=\"tok\" dir=\"ltr\">b.f()</code> על <code class=\"tok\" dir=\"ltr\">B</code>. התשובה <code class=\"tok\" dir=\"ltr\">B B B</code> מניחה שהטיפוס האמיתי תמיד מנצח, וזה נכון רק לפונקציה וירטואלית. <code class=\"tok\" dir=\"ltr\">A A A</code> מתעלמת מכך שהמצביע <code class=\"tok\" dir=\"ltr\">q</code> ו-<code class=\"tok\" dir=\"ltr\">b</code> הם מטיפוס <code class=\"tok\" dir=\"ltr\">B</code>.",
      "recapHtml": "בלי virtual: הטיפוס המוצהר קובע"
     },
     {
      "id": "C01-Q2",
      "question": "עכשיו `f` מוגדרת `virtual` באב. מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    B* q = &b;\n    p->f();\n    q->f();\n    b.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B B</code>"
       },
       {
        "id": "b",
        "value": "`B B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B B</code>"
       },
       {
        "id": "c",
        "value": "`A A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A B</code>"
       },
       {
        "id": "d",
        "value": "`A A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A A</code>"
       }
      ],
      "correctId": "b",
      "explanation": "`f` וירטואלית ו-`p` מצביע על אובייקט מטיפוס אמיתי `B`, ולכן גם הקריאה דרך `A*` מגיעה ל-`B::f`. שתי הקריאות האחרות הן ל-`B` ממילא. התשובה `A B B` היא התוצאה בלי `virtual`.",
      "recap": "virtual + מצביע = הטיפוס האמיתי",
      "questionHtml": "עכשיו <code class=\"tok\" dir=\"ltr\">f</code> מוגדרת <code class=\"tok\" dir=\"ltr\">virtual</code> באב. מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nint main() {\n    B b;\n    A* p = &amp;b;\n    B* q = &amp;b;\n    p-&gt;f();\n    q-&gt;f();\n    b.f();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">f</code> וירטואלית ו-<code class=\"tok\" dir=\"ltr\">p</code> מצביע על אובייקט מטיפוס אמיתי <code class=\"tok\" dir=\"ltr\">B</code>, ולכן גם הקריאה דרך <code class=\"tok\" dir=\"ltr\">A*</code> מגיעה ל-<code class=\"tok\" dir=\"ltr\">B::f</code>. שתי הקריאות האחרות הן ל-<code class=\"tok\" dir=\"ltr\">B</code> ממילא. התשובה <code class=\"tok\" dir=\"ltr\">A B B</code> היא התוצאה בלי <code class=\"tok\" dir=\"ltr\">virtual</code>.",
      "recapHtml": "virtual + מצביע = הטיפוס האמיתי"
     },
     {
      "id": "C01-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    virtual void f() { cout << \"Af \"; }\n    void g() { cout << \"Ag \"; }\n};\nstruct B : A {\n    void f() { cout << \"Bf \"; }\n    void g() { cout << \"Bg \"; }\n};\nint main() {\n    A a;\n    B b;\n    A* arr[2] = { &a, &b };\n    for (int i = 0; i < 2; i++) {\n        arr[i]->f();\n        arr[i]->g();\n    }\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Af Ag Bf Ag`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Af Ag Bf Ag</code>"
       },
       {
        "id": "b",
        "value": "`Af Ag Bf Bg`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Af Ag Bf Bg</code>"
       },
       {
        "id": "c",
        "value": "`Af Ag Af Ag`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Af Ag Af Ag</code>"
       },
       {
        "id": "d",
        "value": "`Af Bg Bf Bg`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Af Bg Bf Bg</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בסיבוב הראשון המצביע מצביע על `A`: `Af Ag`. בסיבוב השני הוא מצביע על `B`: `f` וירטואלית ולכן `Bf`, אבל `g` אינה וירטואלית ולכן נשארת `Ag` (טיפוס מוצהר `A`). `Af Ag Bf Bg` מתייחסת לשתי הפונקציות כוירטואליות. `Af Ag Af Ag` מתעלמת מ-`virtual` לגמרי.",
      "recap": "בכל פונקציה בנפרד שואלים: האם היא וירטואלית באב?",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    virtual void f() { cout &lt;&lt; \"Af \"; }\n    void g() { cout &lt;&lt; \"Ag \"; }\n};\nstruct B : A {\n    void f() { cout &lt;&lt; \"Bf \"; }\n    void g() { cout &lt;&lt; \"Bg \"; }\n};\nint main() {\n    A a;\n    B b;\n    A* arr[2] = { &amp;a, &amp;b };\n    for (int i = 0; i &lt; 2; i++) {\n        arr[i]-&gt;f();\n        arr[i]-&gt;g();\n    }\n}</code></pre>",
      "explanationHtml": "בסיבוב הראשון המצביע מצביע על <code class=\"tok\" dir=\"ltr\">A</code>: <code class=\"tok\" dir=\"ltr\">Af Ag</code>. בסיבוב השני הוא מצביע על <code class=\"tok\" dir=\"ltr\">B</code>: <code class=\"tok\" dir=\"ltr\">f</code> וירטואלית ולכן <code class=\"tok\" dir=\"ltr\">Bf</code>, אבל <code class=\"tok\" dir=\"ltr\">g</code> אינה וירטואלית ולכן נשארת <code class=\"tok\" dir=\"ltr\">Ag</code> (טיפוס מוצהר <code class=\"tok\" dir=\"ltr\">A</code>). <code class=\"tok\" dir=\"ltr\">Af Ag Bf Bg</code> מתייחסת לשתי הפונקציות כוירטואליות. <code class=\"tok\" dir=\"ltr\">Af Ag Af Ag</code> מתעלמת מ-<code class=\"tok\" dir=\"ltr\">virtual</code> לגמרי.",
      "recapHtml": "בכל פונקציה בנפרד שואלים: האם היא וירטואלית באב?"
     },
     {
      "id": "C01-Q4",
      "question": "הפעם `virtual` מופיעה רק במחלקה היורשת. מה מדפיסה התכנית?\n```cpp\nstruct A { void f() { cout << \"A \"; } };\nstruct B : A { virtual void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    B* q = &b;\n    p->f();\n    q->f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "b",
        "value": "`B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B</code>"
       },
       {
        "id": "c",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       },
       {
        "id": "d",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הבחירה נעשית לפי המחלקה של המצביע. ב-`A` הפונקציה `f` אינה וירטואלית, ולכן `p->f()` נקבעת בקומפילציה ל-`A::f`. `q` הוא `B*` ולכן `B::f`. `B B` מניחה ש-`virtual` ביורשת משפיעה גם על קריאות דרך האב.",
      "recap": "virtual צריכה להופיע במחלקה של המצביע (או באבותיה)",
      "questionHtml": "הפעם <code class=\"tok\" dir=\"ltr\">virtual</code> מופיעה רק במחלקה היורשת. מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { virtual void f() { cout &lt;&lt; \"B \"; } };\nint main() {\n    B b;\n    A* p = &amp;b;\n    B* q = &amp;b;\n    p-&gt;f();\n    q-&gt;f();\n}</code></pre>",
      "explanationHtml": "הבחירה נעשית לפי המחלקה של המצביע. ב-<code class=\"tok\" dir=\"ltr\">A</code> הפונקציה <code class=\"tok\" dir=\"ltr\">f</code> אינה וירטואלית, ולכן <code class=\"tok\" dir=\"ltr\">p-&gt;f()</code> נקבעת בקומפילציה ל-<code class=\"tok\" dir=\"ltr\">A::f</code>. <code class=\"tok\" dir=\"ltr\">q</code> הוא <code class=\"tok\" dir=\"ltr\">B*</code> ולכן <code class=\"tok\" dir=\"ltr\">B::f</code>. <code class=\"tok\" dir=\"ltr\">B B</code> מניחה ש-<code class=\"tok\" dir=\"ltr\">virtual</code> ביורשת משפיעה גם על קריאות דרך האב.",
      "recapHtml": "virtual צריכה להופיע במחלקה של המצביע (או באבותיה)"
     },
     {
      "id": "C01-Q5",
      "question": "בכל התוכניות `f` היא וירטואלית ב-`A`, ו-`B` יורשת מ-`A` ודורסת אותה. באיזו שורה הקריאה ל-`f` נבחרת לפי הטיפוס האמיתי של האובייקט בזמן ריצה?",
      "options": [
       {
        "id": "a",
        "value": "`A* p = &b; p->f();`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A* p = &amp;b; p-&gt;f();</code>"
       },
       {
        "id": "b",
        "value": "`A a = b; a.f();`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A a = b; a.f();</code>"
       },
       {
        "id": "c",
        "value": "`b.A::f();`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">b.A::f();</code>"
       },
       {
        "id": "d",
        "value": "`A* p = &b; p->A::f();`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A* p = &amp;b; p-&gt;A::f();</code>"
       }
      ],
      "correctId": "a",
      "explanation": "רק קריאה דרך מצביע (או הפניה) לאב, בלי שם מלא, מחפשת את הגרסה בטבלה הווירטואלית. `A a = b;` מעתיקה אובייקט בערך ולכן חותכת ל-`A` ו-`a.f()` היא `A::f`. שני האחרונים משתמשים בשם מלא `A::`, שמכריח את גרסת `A`.",
      "recap": "מצביע/הפניה + בלי שם מלא = בחירה בזמן ריצה",
      "questionHtml": "בכל התוכניות <code class=\"tok\" dir=\"ltr\">f</code> היא וירטואלית ב-<code class=\"tok\" dir=\"ltr\">A</code>, ו-<code class=\"tok\" dir=\"ltr\">B</code> יורשת מ-<code class=\"tok\" dir=\"ltr\">A</code> ודורסת אותה. באיזו שורה הקריאה ל-<code class=\"tok\" dir=\"ltr\">f</code> נבחרת לפי הטיפוס האמיתי של האובייקט בזמן ריצה?",
      "explanationHtml": "רק קריאה דרך מצביע (או הפניה) לאב, בלי שם מלא, מחפשת את הגרסה בטבלה הווירטואלית. <code class=\"tok\" dir=\"ltr\">A a = b;</code> מעתיקה אובייקט בערך ולכן חותכת ל-<code class=\"tok\" dir=\"ltr\">A</code> ו-<code class=\"tok\" dir=\"ltr\">a.f()</code> היא <code class=\"tok\" dir=\"ltr\">A::f</code>. שני האחרונים משתמשים בשם מלא <code class=\"tok\" dir=\"ltr\">A::</code>, שמכריח את גרסת <code class=\"tok\" dir=\"ltr\">A</code>.",
      "recapHtml": "מצביע/הפניה + בלי שם מלא = בחירה בזמן ריצה"
     }
    ]
   },
   {
    "id": "C02",
    "order": 2,
    "icon": "🧬",
    "title": "דריסה לאורך הירושה",
    "goal": "לעקוב אחרי דריסה בשרשרת של כמה מחלקות ולקרוא לגרסת האב מתוך דריסה.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>כשמחלקה יורשת פונקציה וירטואלית ונותנת לה מימוש חדש עם <b>אותה חתימה</b> (שם, פרמטרים, <code>const</code>), זו <b>דריסה</b> (override).</p>\n<ul>\n<li>הפונקציה בנגזרת הופכת וירטואלית אוטומטית, גם בלי לכתוב <code>virtual</code> שוב. מכאן והלאה כל דור נוסף יכול לדרוס שוב.</li>\n<li>הקריאה בוחרת את הגרסה <b>הנמוכה ביותר בשרשרת</b> שמתאימה לטיפוס האמיתי של האובייקט. אם מחלקה לא דרסה, יורשים את הגרסה של האב שלה.</li>\n<li>אפשר להמשיך לגרסת האב מתוך הדריסה בעזרת <code>Base::f()</code>.</li>\n<li>פונקציה לא וירטואלית שקוראת לפונקציה וירטואלית (תבנית \"שלד ושלבים\") מפעילה את הגרסה של הטיפוס האמיתי, כי <code>step()</code> בתוכה היא <code>this->step()</code>.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>מי נבחר? מתחילים מהטיפוס האמיתי וטיילים למעלה עד הגרסה הראשונה שנכתבה.</b></div>\n<div class=\"lesson-ex\"><pre>struct X { virtual void f() { cout &lt;&lt; \"X \"; } };\nstruct Y : X { void f() { cout &lt;&lt; \"Y \"; } };   // overrides\nstruct Z : Y { };                              // no f of its own\nX* p = new Z;\np-&gt;f();    // Z has none, goes up to Y::f -&gt; Y</pre></div>\n"
    },
    "questions": [
     {
      "id": "C02-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X { virtual void f() { cout << \"X \"; } };\nstruct Y : X { void f() { cout << \"Y \"; } };\nstruct Z : Y { void f() { cout << \"Z \"; } };\nint main() {\n    Z z;\n    X* a = &z;\n    Y* b = &z;\n    a->f();\n    b->f();\n    z.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Z Z Z`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Z Z Z</code>"
       },
       {
        "id": "b",
        "value": "`X Y Z`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X Y Z</code>"
       },
       {
        "id": "c",
        "value": "`X X Z`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X X Z</code>"
       },
       {
        "id": "d",
        "value": "`Z Y X`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Z Y X</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`f` וירטואלית ב-`X`, ו-`Y::f` ו-`Z::f` דורסות אותה בלי לכתוב `virtual` שוב. האובייקט בפועל הוא `Z`, ולכן כל שלוש הקריאות מגיעות ל-`Z::f`, גם דרך `X*` וגם דרך `Y*`. `X Y Z` הוא מה שהיה קורה בלי `virtual`.",
      "recap": "דריסה נשארת וירטואלית בכל הדורות",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X { virtual void f() { cout &lt;&lt; \"X \"; } };\nstruct Y : X { void f() { cout &lt;&lt; \"Y \"; } };\nstruct Z : Y { void f() { cout &lt;&lt; \"Z \"; } };\nint main() {\n    Z z;\n    X* a = &amp;z;\n    Y* b = &amp;z;\n    a-&gt;f();\n    b-&gt;f();\n    z.f();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">f</code> וירטואלית ב-<code class=\"tok\" dir=\"ltr\">X</code>, ו-<code class=\"tok\" dir=\"ltr\">Y::f</code> ו-<code class=\"tok\" dir=\"ltr\">Z::f</code> דורסות אותה בלי לכתוב <code class=\"tok\" dir=\"ltr\">virtual</code> שוב. האובייקט בפועל הוא <code class=\"tok\" dir=\"ltr\">Z</code>, ולכן כל שלוש הקריאות מגיעות ל-<code class=\"tok\" dir=\"ltr\">Z::f</code>, גם דרך <code class=\"tok\" dir=\"ltr\">X*</code> וגם דרך <code class=\"tok\" dir=\"ltr\">Y*</code>. <code class=\"tok\" dir=\"ltr\">X Y Z</code> הוא מה שהיה קורה בלי <code class=\"tok\" dir=\"ltr\">virtual</code>.",
      "recapHtml": "דריסה נשארת וירטואלית בכל הדורות"
     },
     {
      "id": "C02-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X { virtual void f() { cout << \"X \"; } };\nstruct Y : X { void f() { cout << \"Y \"; } };\nstruct Z : Y { };\nint main() {\n    X* p = new Z;\n    Y* q = new Z;\n    p->f();\n    q->f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Y Y`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Y Y</code>"
       },
       {
        "id": "b",
        "value": "`X Y`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X Y</code>"
       },
       {
        "id": "c",
        "value": "`X X`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X X</code>"
       },
       {
        "id": "d",
        "value": "`Y X`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Y X</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ל-`Z` אין `f` משלה, ולכן הגרסה שלה היא זו שהיא יורשת מהקרוב ביותר, `Y::f`. זה נכון גם דרך `X*` וגם דרך `Y*`. `X` לא נבחרת כי `Y` כבר דרסה אותה.",
      "recap": "בלי דריסה יורשים את הגרסה הקרובה ביותר מלמעלה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X { virtual void f() { cout &lt;&lt; \"X \"; } };\nstruct Y : X { void f() { cout &lt;&lt; \"Y \"; } };\nstruct Z : Y { };\nint main() {\n    X* p = new Z;\n    Y* q = new Z;\n    p-&gt;f();\n    q-&gt;f();\n}</code></pre>",
      "explanationHtml": "ל-<code class=\"tok\" dir=\"ltr\">Z</code> אין <code class=\"tok\" dir=\"ltr\">f</code> משלה, ולכן הגרסה שלה היא זו שהיא יורשת מהקרוב ביותר, <code class=\"tok\" dir=\"ltr\">Y::f</code>. זה נכון גם דרך <code class=\"tok\" dir=\"ltr\">X*</code> וגם דרך <code class=\"tok\" dir=\"ltr\">Y*</code>. <code class=\"tok\" dir=\"ltr\">X</code> לא נבחרת כי <code class=\"tok\" dir=\"ltr\">Y</code> כבר דרסה אותה.",
      "recapHtml": "בלי דריסה יורשים את הגרסה הקרובה ביותר מלמעלה"
     },
     {
      "id": "C02-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A {\n    void f() { A::f(); cout << \"B \"; }\n};\nint main() {\n    A* p = new B;\n    p->f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "b",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       },
       {
        "id": "c",
        "value": "`B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B</code>"
       },
       {
        "id": "d",
        "value": "`A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`p->f()` מגיעה ל-`B::f` (וירטואליות). בתוכה השורה הראשונה היא `A::f()` עם שם מלא, שמדפיסה `A`, ואחריה `B`. התשובה `B A` הופכת את הסדר, `B` ו-`A` לבד מדלגות על אחת מהשורות.",
      "recap": "Base::f() בתוך דריסה ממשיך לגרסת האב",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A {\n    void f() { A::f(); cout &lt;&lt; \"B \"; }\n};\nint main() {\n    A* p = new B;\n    p-&gt;f();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">p-&gt;f()</code> מגיעה ל-<code class=\"tok\" dir=\"ltr\">B::f</code> (וירטואליות). בתוכה השורה הראשונה היא <code class=\"tok\" dir=\"ltr\">A::f()</code> עם שם מלא, שמדפיסה <code class=\"tok\" dir=\"ltr\">A</code>, ואחריה <code class=\"tok\" dir=\"ltr\">B</code>. התשובה <code class=\"tok\" dir=\"ltr\">B A</code> הופכת את הסדר, <code class=\"tok\" dir=\"ltr\">B</code> ו-<code class=\"tok\" dir=\"ltr\">A</code> לבד מדלגות על אחת מהשורות.",
      "recapHtml": "Base::f() בתוך דריסה ממשיך לגרסת האב"
     },
     {
      "id": "C02-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    void run() { step(); cout << \"end \"; }\n    virtual void step() { cout << \"A \"; }\n};\nstruct B : A {\n    void step() { cout << \"B \"; }\n};\nint main() {\n    B b;\n    b.run();\n    A a;\n    a.run();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B end A end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B end A end</code>"
       },
       {
        "id": "b",
        "value": "`A end A end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A end A end</code>"
       },
       {
        "id": "c",
        "value": "`B end B end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B end B end</code>"
       },
       {
        "id": "d",
        "value": "`A end B end`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A end B end</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`run` אינה וירטואלית, אז היא נקראת מ-`A`, אבל בתוכה `step()` היא `this->step()` דרך מצביע, ולכן נבחרת לפי האובייקט האמיתי: `B::step` עבור `b`, `A::step` עבור `a`. `A end A end` מניחה שבגלל ש-`run` שייכת ל-`A` גם `step` תהיה של `A`.",
      "recap": "this->step() וירטואלית נבחרת לפי האובייקט האמיתי",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    void run() { step(); cout &lt;&lt; \"end \"; }\n    virtual void step() { cout &lt;&lt; \"A \"; }\n};\nstruct B : A {\n    void step() { cout &lt;&lt; \"B \"; }\n};\nint main() {\n    B b;\n    b.run();\n    A a;\n    a.run();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">run</code> אינה וירטואלית, אז היא נקראת מ-<code class=\"tok\" dir=\"ltr\">A</code>, אבל בתוכה <code class=\"tok\" dir=\"ltr\">step()</code> היא <code class=\"tok\" dir=\"ltr\">this-&gt;step()</code> דרך מצביע, ולכן נבחרת לפי האובייקט האמיתי: <code class=\"tok\" dir=\"ltr\">B::step</code> עבור <code class=\"tok\" dir=\"ltr\">b</code>, <code class=\"tok\" dir=\"ltr\">A::step</code> עבור <code class=\"tok\" dir=\"ltr\">a</code>. <code class=\"tok\" dir=\"ltr\">A end A end</code> מניחה שבגלל ש-<code class=\"tok\" dir=\"ltr\">run</code> שייכת ל-<code class=\"tok\" dir=\"ltr\">A</code> גם <code class=\"tok\" dir=\"ltr\">step</code> תהיה של <code class=\"tok\" dir=\"ltr\">A</code>.",
      "recapHtml": "this-&gt;step() וירטואלית נבחרת לפי האובייקט האמיתי"
     },
     {
      "id": "C02-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct S { virtual int v() { return 1; } };\nstruct T : S { int v() { return 2; } };\nstruct U : S { int v() { return 3; } };\nint main() {\n    S s; T t; U u;\n    S* a[4] = { &u, &s, &t, &u };\n    int num = 0;\n    for (int i = 0; i < 4; i++)\n        num = num * 10 + a[i]->v();\n    cout << num;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`3123`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3123</code>"
       },
       {
        "id": "b",
        "value": "`1111`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1111</code>"
       },
       {
        "id": "c",
        "value": "`1233`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1233</code>"
       },
       {
        "id": "d",
        "value": "`3213`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3213</code>"
       }
      ],
      "correctId": "a",
      "explanation": "כל איבר במערך נבחר לפי האובייקט שאליו הוא מצביע: `u` נותן 3, `s` נותן 1, `t` נותן 2, `u` שוב 3. הספרות נבנות משמאל לימין: 3, 31, 312, 3123. `1111` היא התוצאה אם `v` לא הייתה וירטואלית.",
      "recap": "במערך מצביעים כל קריאה נבחרת בנפרד לפי האובייקט",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct S { virtual int v() { return 1; } };\nstruct T : S { int v() { return 2; } };\nstruct U : S { int v() { return 3; } };\nint main() {\n    S s; T t; U u;\n    S* a[4] = { &amp;u, &amp;s, &amp;t, &amp;u };\n    int num = 0;\n    for (int i = 0; i &lt; 4; i++)\n        num = num * 10 + a[i]-&gt;v();\n    cout &lt;&lt; num;\n}</code></pre>",
      "explanationHtml": "כל איבר במערך נבחר לפי האובייקט שאליו הוא מצביע: <code class=\"tok\" dir=\"ltr\">u</code> נותן 3, <code class=\"tok\" dir=\"ltr\">s</code> נותן 1, <code class=\"tok\" dir=\"ltr\">t</code> נותן 2, <code class=\"tok\" dir=\"ltr\">u</code> שוב 3. הספרות נבנות משמאל לימין: 3, 31, 312, 3123. <code class=\"tok\" dir=\"ltr\">1111</code> היא התוצאה אם <code class=\"tok\" dir=\"ltr\">v</code> לא הייתה וירטואלית.",
      "recapHtml": "במערך מצביעים כל קריאה נבחרת בנפרד לפי האובייקט"
     }
    ]
   },
   {
    "id": "C03",
    "order": 3,
    "icon": "✂️",
    "title": "ערך, הפניה, מצביע וחיתוך",
    "goal": "לזהות מתי אובייקט נחתך לטיפוס האב ומתי הטיפוס האמיתי נשמר.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>וירטואליות עובדת רק כשיש <b>הפניה או מצביע</b>. כשמעתיקים אובייקט נגזר לתוך אובייקט מטיפוס האב <b>בערך</b>, נשאר רק חלק האב: זה <b>חיתוך</b> (slicing).</p>\n<table>\n<thead><tr><th>צורה</th><th>דוגמה</th><th>הטיפוס שנבחר</th></tr></thead>\n<tbody>\n<tr><td>הפניה</td><td><code>void g(A&amp; a)</code></td><td>האמיתי</td></tr>\n<tr><td>מצביע</td><td><code>void g(A* a)</code></td><td>האמיתי</td></tr>\n<tr><td>ערך</td><td><code>void g(A a)</code>, <code>A a = b;</code>, <code>vector&lt;A&gt;</code></td><td><b>A</b> (חתוך)</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>אובייקט בערך הוא תמיד מהטיפוס שהוצהר.</b> ההעתקה בונה אובייקט <code>A</code> חדש שאין בו שום זכר ל-<code>B</code>, כולל השדות הנוספים של <code>B</code>.</div>\n<div class=\"lesson-ex\"><pre>void byRef(A&amp; a) { a.f(); }   // real type\nvoid byVal(A a)  { a.f(); }   // copy of the A part only\nB b;\nbyRef(b);   // B\nbyVal(b);   // A</pre></div>\n<div class=\"lesson-trap\">⚠️ <code>vector&lt;A&gt;</code> שומר אובייקטי <code>A</code> בלבד, וכל <code>push_back(B())</code> חותך. כדי לשמור טיפוסים שונים משתמשים ב-<code>vector&lt;A*&gt;</code>.</div>\n"
    },
    "questions": [
     {
      "id": "C03-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nvoid g(A& a) { a.f(); }\nvoid h(A* a) { a->f(); }\nvoid k(A a) { a.f(); }\nint main() {\n    B b;\n    g(b);\n    h(&b);\n    k(b);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B A</code>"
       },
       {
        "id": "b",
        "value": "`B B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B B</code>"
       },
       {
        "id": "c",
        "value": "`A A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A A</code>"
       },
       {
        "id": "d",
        "value": "`B A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הפניה ומצביע שומרים על האובייקט המקורי ולכן `B` פעמיים. `k` מקבלת `A` בערך: נוצר עותק שהוא `A` בלבד (חיתוך), ולכן `A`. `B B B` שוכחת שהעברה בערך חותכת.",
      "recap": "העברה בערך חותכת, הפניה ומצביע לא",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nvoid g(A&amp; a) { a.f(); }\nvoid h(A* a) { a-&gt;f(); }\nvoid k(A a) { a.f(); }\nint main() {\n    B b;\n    g(b);\n    h(&amp;b);\n    k(b);\n}</code></pre>",
      "explanationHtml": "הפניה ומצביע שומרים על האובייקט המקורי ולכן <code class=\"tok\" dir=\"ltr\">B</code> פעמיים. <code class=\"tok\" dir=\"ltr\">k</code> מקבלת <code class=\"tok\" dir=\"ltr\">A</code> בערך: נוצר עותק שהוא <code class=\"tok\" dir=\"ltr\">A</code> בלבד (חיתוך), ולכן <code class=\"tok\" dir=\"ltr\">A</code>. <code class=\"tok\" dir=\"ltr\">B B B</code> שוכחת שהעברה בערך חותכת.",
      "recapHtml": "העברה בערך חותכת, הפניה ומצביע לא"
     },
     {
      "id": "C03-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual string name() { return \"A\"; } };\nstruct B : A { string name() { return \"B\"; } };\nint main() {\n    vector<A> v;\n    v.push_back(B());\n    vector<A*> w;\n    w.push_back(new B);\n    cout << v[0].name() << \" \" << w[0]->name();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "b",
        "value": "`B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B</code>"
       },
       {
        "id": "c",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       },
       {
        "id": "d",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`vector<A>` מאחסן אובייקטי `A`, ולכן `push_back(B())` מעתיק רק את חלק האב: `A`. `vector<A*>` מאחסן מצביעים לאובייקט האמיתי, והקריאה וירטואלית: `B`.",
      "recap": "אוסף פולימורפי = אוסף מצביעים",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual string name() { return \"A\"; } };\nstruct B : A { string name() { return \"B\"; } };\nint main() {\n    vector&lt;A&gt; v;\n    v.push_back(B());\n    vector&lt;A*&gt; w;\n    w.push_back(new B);\n    cout &lt;&lt; v[0].name() &lt;&lt; \" \" &lt;&lt; w[0]-&gt;name();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">vector&lt;A&gt;</code> מאחסן אובייקטי <code class=\"tok\" dir=\"ltr\">A</code>, ולכן <code class=\"tok\" dir=\"ltr\">push_back(B())</code> מעתיק רק את חלק האב: <code class=\"tok\" dir=\"ltr\">A</code>. <code class=\"tok\" dir=\"ltr\">vector&lt;A*&gt;</code> מאחסן מצביעים לאובייקט האמיתי, והקריאה וירטואלית: <code class=\"tok\" dir=\"ltr\">B</code>.",
      "recapHtml": "אוסף פולימורפי = אוסף מצביעים"
     },
     {
      "id": "C03-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    int x = 1;\n    virtual int get() { return x; }\n};\nstruct B : A {\n    int y = 2;\n    int get() { return x + y; }\n};\nint main() {\n    B b;\n    A a = b;\n    A& r = b;\n    cout << a.get() << \" \" << r.get();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`1 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 3</code>"
       },
       {
        "id": "b",
        "value": "`3 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 3</code>"
       },
       {
        "id": "c",
        "value": "`1 1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 1</code>"
       },
       {
        "id": "d",
        "value": "`3 1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`A a = b;` מעתיקה רק את `x`, נשאר אובייקט `A` שבו `get` מחזירה `x`, כלומר 1. ההפניה `r` קשורה ל-`b` עצמו, ולכן `B::get` מחזירה `1 + 2 = 3`.",
      "recap": "חיתוך מאבד גם שדות וגם דריסות",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    int x = 1;\n    virtual int get() { return x; }\n};\nstruct B : A {\n    int y = 2;\n    int get() { return x + y; }\n};\nint main() {\n    B b;\n    A a = b;\n    A&amp; r = b;\n    cout &lt;&lt; a.get() &lt;&lt; \" \" &lt;&lt; r.get();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">A a = b;</code> מעתיקה רק את <code class=\"tok\" dir=\"ltr\">x</code>, נשאר אובייקט <code class=\"tok\" dir=\"ltr\">A</code> שבו <code class=\"tok\" dir=\"ltr\">get</code> מחזירה <code class=\"tok\" dir=\"ltr\">x</code>, כלומר 1. ההפניה <code class=\"tok\" dir=\"ltr\">r</code> קשורה ל-<code class=\"tok\" dir=\"ltr\">b</code> עצמו, ולכן <code class=\"tok\" dir=\"ltr\">B::get</code> מחזירה <code class=\"tok\" dir=\"ltr\">1 + 2 = 3</code>.",
      "recapHtml": "חיתוך מאבד גם שדות וגם דריסות"
     },
     {
      "id": "C03-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A\"; } };\nstruct B : A { void f() { cout << \"B\"; } };\nA make() {\n    B b;\n    return b;\n}\nint main() {\n    A a = make();\n    a.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A</code>"
       },
       {
        "id": "b",
        "value": "`B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B</code>"
       },
       {
        "id": "c",
        "value": "`AB`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">AB</code>"
       },
       {
        "id": "d",
        "value": "`BA`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">BA</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הפונקציה מחזירה `A` בערך, ולכן `return b;` חותך את `b` לאובייקט `A`. לאובייקט בערך אין טיפוס אמיתי אחר, ולכן `a.f()` היא `A::f`.",
      "recap": "גם החזרה בערך חותכת",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() { cout &lt;&lt; \"A\"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B\"; } };\nA make() {\n    B b;\n    return b;\n}\nint main() {\n    A a = make();\n    a.f();\n}</code></pre>",
      "explanationHtml": "הפונקציה מחזירה <code class=\"tok\" dir=\"ltr\">A</code> בערך, ולכן <code class=\"tok\" dir=\"ltr\">return b;</code> חותך את <code class=\"tok\" dir=\"ltr\">b</code> לאובייקט <code class=\"tok\" dir=\"ltr\">A</code>. לאובייקט בערך אין טיפוס אמיתי אחר, ולכן <code class=\"tok\" dir=\"ltr\">a.f()</code> היא <code class=\"tok\" dir=\"ltr\">A::f</code>.",
      "recapHtml": "גם החזרה בערך חותכת"
     },
     {
      "id": "C03-Q5",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A a;\n    a = b;\n    A* p = &a;\n    p->f();\n    p = &b;\n    p->f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "b",
        "value": "`B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B</code>"
       },
       {
        "id": "c",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       },
       {
        "id": "d",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ההשמה `a = b;` מעתיקה רק את חלק האב, ו-`a` נשאר אובייקט `A` לכל דבר, ולכן `p->f()` הראשונה היא `A`. לאחר מכן `p` מצביע על `b` עצמו, ולכן `B`.",
      "recap": "השמה לאובייקט מטיפוס האב חותכת",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nint main() {\n    B b;\n    A a;\n    a = b;\n    A* p = &amp;a;\n    p-&gt;f();\n    p = &amp;b;\n    p-&gt;f();\n}</code></pre>",
      "explanationHtml": "ההשמה <code class=\"tok\" dir=\"ltr\">a = b;</code> מעתיקה רק את חלק האב, ו-<code class=\"tok\" dir=\"ltr\">a</code> נשאר אובייקט <code class=\"tok\" dir=\"ltr\">A</code> לכל דבר, ולכן <code class=\"tok\" dir=\"ltr\">p-&gt;f()</code> הראשונה היא <code class=\"tok\" dir=\"ltr\">A</code>. לאחר מכן <code class=\"tok\" dir=\"ltr\">p</code> מצביע על <code class=\"tok\" dir=\"ltr\">b</code> עצמו, ולכן <code class=\"tok\" dir=\"ltr\">B</code>.",
      "recapHtml": "השמה לאובייקט מטיפוס האב חותכת"
     }
    ]
   },
   {
    "id": "C04",
    "order": 4,
    "icon": "🪤",
    "title": "דריסה שלא קורית",
    "goal": "לזהות חתימות שלא דורסות, ערכי ברירת מחדל והסתרת שמות.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>דריסה קורית רק כשהחתימה <b>זהה לחלוטין</b>: אותו שם, אותם סוגי פרמטרים, ואותו <code>const</code> על הפונקציה. כל הבדל יוצר פונקציה <b>חדשה</b> שלא קשורה לוירטואלית של האב, ובדרך כלל בלי שום הודעה.</p>\n<ul>\n<li><b>חסר <code>const</code></b> או פרמטר אחר: <code>A::f</code> נשארת, ו-<code>B::f</code> היא נוספת. דרך מצביע <code>A*</code> מתבצעת <code>A::f</code>.</li>\n<li><b><code>override</code></b> בסוף החתימה מבקש מהקומפיילר לוודא שיש מה לדרוס. אם אין, יש <b>שגיאת קומפילציה</b>.</li>\n<li><b>ערך ברירת מחדל</b> של פרמטר נקבע בקומפילציה לפי הטיפוס המוצהר, גם כשהגוף של הנגזרת.</li>\n<li><b>הסתרת שמות:</b> פונקציה בנגזרת עם אותו שם (גם עם חתימה אחרת) מסתירה את כל ההעמסות של האב כשפונים דרך הנגזרת.</li>\n</ul>\n<div class=\"lesson-rule\">🔑 <b>כשמצפים לדריסה ולא מקבלים, משווים חתימה אות באות</b> (שם, פרמטרים, <code>const</code>).</div>\n<div class=\"lesson-ex\"><pre>struct A { virtual void f(int) const { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f(int)       { cout &lt;&lt; \"B \"; } };   // no const: NEW function\nA* p = new B;\np-&gt;f(1);    // A  (A::f was not overridden)</pre></div>\n"
    },
    "questions": [
     {
      "id": "C04-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() const { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    p->f();\n    b.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "b",
        "value": "`B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B</code>"
       },
       {
        "id": "c",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       },
       {
        "id": "d",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ב-`B::f` חסר `const`, ולכן החתימה שונה והיא אינה דורסת. `p->f()` רואה רק את `A::f const` ומפעילה אותה. `b.f()` על `B` מוצאת את `B::f`. התשובה `B B` מניחה שדריסה קרתה.",
      "recap": "חסר const = אין דריסה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() const { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nint main() {\n    B b;\n    A* p = &amp;b;\n    p-&gt;f();\n    b.f();\n}</code></pre>",
      "explanationHtml": "ב-<code class=\"tok\" dir=\"ltr\">B::f</code> חסר <code class=\"tok\" dir=\"ltr\">const</code>, ולכן החתימה שונה והיא אינה דורסת. <code class=\"tok\" dir=\"ltr\">p-&gt;f()</code> רואה רק את <code class=\"tok\" dir=\"ltr\">A::f const</code> ומפעילה אותה. <code class=\"tok\" dir=\"ltr\">b.f()</code> על <code class=\"tok\" dir=\"ltr\">B</code> מוצאת את <code class=\"tok\" dir=\"ltr\">B::f</code>. התשובה <code class=\"tok\" dir=\"ltr\">B B</code> מניחה שדריסה קרתה.",
      "recapHtml": "חסר const = אין דריסה"
     },
     {
      "id": "C04-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f(int) { cout << \"A \"; } };\nstruct B : A { void f(double) { cout << \"B \"; } };\nint main() {\n    B b;\n    A* p = &b;\n    p->f(1);\n    b.f(1);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "b",
        "value": "`B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B</code>"
       },
       {
        "id": "c",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       },
       {
        "id": "d",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`f(double)` אינה דורסת את `f(int)`, כי סוג הפרמטר שונה. דרך `A*` נראית רק `A::f(int)`. על `b` עצמו מוצאים רק את `f(double)` של `B` (היא מסתירה את האחרת), והארגומנט `1` מומר ל-`double`.",
      "recap": "פרמטר שונה = פונקציה חדשה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f(int) { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f(double) { cout &lt;&lt; \"B \"; } };\nint main() {\n    B b;\n    A* p = &amp;b;\n    p-&gt;f(1);\n    b.f(1);\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">f(double)</code> אינה דורסת את <code class=\"tok\" dir=\"ltr\">f(int)</code>, כי סוג הפרמטר שונה. דרך <code class=\"tok\" dir=\"ltr\">A*</code> נראית רק <code class=\"tok\" dir=\"ltr\">A::f(int)</code>. על <code class=\"tok\" dir=\"ltr\">b</code> עצמו מוצאים רק את <code class=\"tok\" dir=\"ltr\">f(double)</code> של <code class=\"tok\" dir=\"ltr\">B</code> (היא מסתירה את האחרת), והארגומנט <code class=\"tok\" dir=\"ltr\">1</code> מומר ל-<code class=\"tok\" dir=\"ltr\">double</code>.",
      "recapHtml": "פרמטר שונה = פונקציה חדשה"
     },
     {
      "id": "C04-Q3",
      "question": "מה קורה בקומפילציה של הקוד הבא?\n```cpp\nstruct A { virtual void f(int) { } };\nstruct B : A {\n    void f(long) override { }\n};\nint main() {\n    B b;\n    b.f(1);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "שגיאת קומפילציה, כי `B::f(long)` לא דורסת שום פונקציה של `A`",
        "type": "text",
        "html": "שגיאת קומפילציה, כי <code class=\"tok\" dir=\"ltr\">B::f(long)</code> לא דורסת שום פונקציה של <code class=\"tok\" dir=\"ltr\">A</code>"
       },
       {
        "id": "b",
        "value": "הקוד מתקמפל, ו-`override` מתעלמת מהבדל הטיפוס",
        "type": "text",
        "html": "הקוד מתקמפל, ו-<code class=\"tok\" dir=\"ltr\">override</code> מתעלמת מהבדל הטיפוס"
       },
       {
        "id": "c",
        "value": "הקוד מתקמפל עם אזהרה בלבד",
        "type": "text",
        "html": "הקוד מתקמפל עם אזהרה בלבד"
       },
       {
        "id": "d",
        "value": "הקוד מתקמפל, ושגיאה תתרחש בזמן ריצה",
        "type": "text",
        "html": "הקוד מתקמפל, ושגיאה תתרחש בזמן ריצה"
       }
      ],
      "correctId": "a",
      "explanation": "`override` היא הבטחה לקומפיילר שהפונקציה דורסת וירטואלית של האב. `long` ו-`int` הם טיפוסים שונים, ולכן אין מה לדרוס והקומפיילר עוצר. זו בדיוק מטרת המילה: להפוך דריסה שנכשלה בשקט לשגיאה גלויה.",
      "recap": "override הופכת דריסה שנכשלה לשגיאת קומפילציה",
      "questionHtml": "מה קורה בקומפילציה של הקוד הבא?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f(int) { } };\nstruct B : A {\n    void f(long) override { }\n};\nint main() {\n    B b;\n    b.f(1);\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">override</code> היא הבטחה לקומפיילר שהפונקציה דורסת וירטואלית של האב. <code class=\"tok\" dir=\"ltr\">long</code> ו-<code class=\"tok\" dir=\"ltr\">int</code> הם טיפוסים שונים, ולכן אין מה לדרוס והקומפיילר עוצר. זו בדיוק מטרת המילה: להפוך דריסה שנכשלה בשקט לשגיאה גלויה.",
      "recapHtml": "override הופכת דריסה שנכשלה לשגיאת קומפילציה"
     },
     {
      "id": "C04-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A {\n    virtual void f(int i = 7) { cout << \"A\" << i << \" \"; }\n};\nstruct B : A {\n    void f(int i = 9) { cout << \"B\" << i << \" \"; }\n};\nint main() {\n    B b;\n    A* p = &b;\n    p->f();\n    b.f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B7 B9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B7 B9</code>"
       },
       {
        "id": "b",
        "value": "`B9 B9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B9 B9</code>"
       },
       {
        "id": "c",
        "value": "`A7 B9`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A7 B9</code>"
       },
       {
        "id": "d",
        "value": "`B7 B7`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B7 B7</code>"
       }
      ],
      "correctId": "a",
      "explanation": "הגוף שמופעל נבחר בזמן ריצה (`B::f`), אבל ערך ברירת המחדל מוכנס בקומפילציה לפי הטיפוס המוצהר. דרך `A*` זה 7, ועל `b` זה 9 של `B`. הצירוף `B7` הוא גוף של נגזרת עם ברירת מחדל של האב.",
      "recap": "גוף בזמן ריצה, ברירת מחדל בזמן קומפילציה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A {\n    virtual void f(int i = 7) { cout &lt;&lt; \"A\" &lt;&lt; i &lt;&lt; \" \"; }\n};\nstruct B : A {\n    void f(int i = 9) { cout &lt;&lt; \"B\" &lt;&lt; i &lt;&lt; \" \"; }\n};\nint main() {\n    B b;\n    A* p = &amp;b;\n    p-&gt;f();\n    b.f();\n}</code></pre>",
      "explanationHtml": "הגוף שמופעל נבחר בזמן ריצה (<code class=\"tok\" dir=\"ltr\">B::f</code>), אבל ערך ברירת המחדל מוכנס בקומפילציה לפי הטיפוס המוצהר. דרך <code class=\"tok\" dir=\"ltr\">A*</code> זה 7, ועל <code class=\"tok\" dir=\"ltr\">b</code> זה 9 של <code class=\"tok\" dir=\"ltr\">B</code>. הצירוף <code class=\"tok\" dir=\"ltr\">B7</code> הוא גוף של נגזרת עם ברירת מחדל של האב.",
      "recapHtml": "גוף בזמן ריצה, ברירת מחדל בזמן קומפילציה"
     },
     {
      "id": "C04-Q5",
      "question": "מה קורה בקומפילציה של הקוד הבא?\n```cpp\nstruct X {\n    virtual void f(int) { cout << \"X1 \"; }\n    virtual void f(int, int) { cout << \"X2 \"; }\n};\nstruct Y : X {\n    void f(int) { cout << \"Y1 \"; }\n};\nint main() {\n    Y y;\n    y.f(1, 2);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "שגיאת קומפילציה, כי `Y::f` מסתירה את `f(int, int)` של `X`",
        "type": "text",
        "html": "שגיאת קומפילציה, כי <code class=\"tok\" dir=\"ltr\">Y::f</code> מסתירה את <code class=\"tok\" dir=\"ltr\">f(int, int)</code> של <code class=\"tok\" dir=\"ltr\">X</code>"
       },
       {
        "id": "b",
        "value": "מודפס `X2`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">X2</code>"
       },
       {
        "id": "c",
        "value": "מודפס `Y1 X2`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">Y1 X2</code>"
       },
       {
        "id": "d",
        "value": "מודפס `Y1`",
        "type": "text",
        "html": "מודפס <code class=\"tok\" dir=\"ltr\">Y1</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`Y` הגדירה פונקציה בשם `f`, ושם זה מסתיר את כל ההעמסות של `f` מ-`X` כשפונים דרך `Y`. לכן בחיפוש על `y.f(1, 2)` נראית רק `f(int)` ואין התאמה. הקריאה הייתה תקינה דרך `X*`, והמקרה בשאלה הבאה.",
      "recap": "פונקציה בנגזרת מסתירה את ההעמסות של האב",
      "questionHtml": "מה קורה בקומפילציה של הקוד הבא?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X {\n    virtual void f(int) { cout &lt;&lt; \"X1 \"; }\n    virtual void f(int, int) { cout &lt;&lt; \"X2 \"; }\n};\nstruct Y : X {\n    void f(int) { cout &lt;&lt; \"Y1 \"; }\n};\nint main() {\n    Y y;\n    y.f(1, 2);\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">Y</code> הגדירה פונקציה בשם <code class=\"tok\" dir=\"ltr\">f</code>, ושם זה מסתיר את כל ההעמסות של <code class=\"tok\" dir=\"ltr\">f</code> מ-<code class=\"tok\" dir=\"ltr\">X</code> כשפונים דרך <code class=\"tok\" dir=\"ltr\">Y</code>. לכן בחיפוש על <code class=\"tok\" dir=\"ltr\">y.f(1, 2)</code> נראית רק <code class=\"tok\" dir=\"ltr\">f(int)</code> ואין התאמה. הקריאה הייתה תקינה דרך <code class=\"tok\" dir=\"ltr\">X*</code>, והמקרה בשאלה הבאה.",
      "recapHtml": "פונקציה בנגזרת מסתירה את ההעמסות של האב"
     },
     {
      "id": "C04-Q6",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X {\n    virtual void f(int) { cout << \"X1 \"; }\n    virtual void f(int, int) { cout << \"X2 \"; }\n};\nstruct Y : X {\n    void f(int) { cout << \"Y1 \"; }\n};\nint main() {\n    Y y;\n    X* p = &y;\n    p->f(1);\n    p->f(1, 2);\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Y1 X2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Y1 X2</code>"
       },
       {
        "id": "b",
        "value": "`Y1 Y1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Y1 Y1</code>"
       },
       {
        "id": "c",
        "value": "`X1 X2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">X1 X2</code>"
       },
       {
        "id": "d",
        "value": "`Y1 Y2`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Y1 Y2</code>"
       }
      ],
      "correctId": "a",
      "explanation": "דרך `X*` שתי ההעמסות גלויות. `f(int)` דרוסה ב-`Y`, ולכן `Y1`. `f(int, int)` לא נדרסה ולכן נשארת `X2`. אין `Y2` כי `Y` לא כתבה אותה.",
      "recap": "דרך מצביע לאב רואים את כל ההעמסות של האב",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X {\n    virtual void f(int) { cout &lt;&lt; \"X1 \"; }\n    virtual void f(int, int) { cout &lt;&lt; \"X2 \"; }\n};\nstruct Y : X {\n    void f(int) { cout &lt;&lt; \"Y1 \"; }\n};\nint main() {\n    Y y;\n    X* p = &amp;y;\n    p-&gt;f(1);\n    p-&gt;f(1, 2);\n}</code></pre>",
      "explanationHtml": "דרך <code class=\"tok\" dir=\"ltr\">X*</code> שתי ההעמסות גלויות. <code class=\"tok\" dir=\"ltr\">f(int)</code> דרוסה ב-<code class=\"tok\" dir=\"ltr\">Y</code>, ולכן <code class=\"tok\" dir=\"ltr\">Y1</code>. <code class=\"tok\" dir=\"ltr\">f(int, int)</code> לא נדרסה ולכן נשארת <code class=\"tok\" dir=\"ltr\">X2</code>. אין <code class=\"tok\" dir=\"ltr\">Y2</code> כי <code class=\"tok\" dir=\"ltr\">Y</code> לא כתבה אותה.",
      "recapHtml": "דרך מצביע לאב רואים את כל ההעמסות של האב"
     }
    ]
   },
   {
    "id": "C05",
    "order": 5,
    "icon": "🏗️",
    "title": "הורסים ובנאים בהירארכיה",
    "goal": "לחזות סדר בנייה והריסה, ולדעת מתי חייב הורס וירטואלי.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p>שלושה כללים לגבי בנאים והורסים בהירארכיה עם פונקציות וירטואליות:</p>\n<ol>\n<li><b>הורס וירטואלי.</b> כשמוחקים אובייקט נגזר דרך <code>Base*</code>, חייב להיות <code>virtual ~Base()</code>. בלי זה המחיקה היא <b>התנהגות לא מוגדרת (UB)</b>: התקן לא מבטיח שום דבר, ובדרך כלל רץ רק הורס האב. עם הורס וירטואלי רצים ההורסים מהנגזרת למעלה.</li>\n<li><b>סדר.</b> בנאים: אב ואז נגזרת. הורסים: נגזרת ואז אב.</li>\n<li><b>בתוך בנאי או הורס</b> קריאה לפונקציה וירטואלית מפעילה את הגרסה של <b>המחלקה שנבנית עכשיו</b> (או נהרסת עכשיו), לא של הנגזרת העמוקה יותר. הסיבה: בזמן בניית האב החלק של הנגזרת עוד לא קיים (ובהריסה כבר לא).</li>\n</ol>\n<div class=\"lesson-rule\">🔑 <b>מחלקה שמיועדת לשמש כאב פולימורפי מקבלת הורס וירטואלי.</b> בכל קריאה וירטואלית בבנאי/הורס שואלים \"באיזה בנאי/הורס אני נמצא?\".</div>\n<div class=\"lesson-ex\"><pre>struct B { B() { f(); }  virtual void f() { cout &lt;&lt; \"Bf \"; } };\nstruct D : B { D() { f(); }  void f() { cout &lt;&lt; \"Df \"; } };\nD d;      // B() runs first, f() inside it is B::f, then D() runs: Bf Df</pre></div>\n<div class=\"lesson-trap\">⚠️ <b>בלי הורס וירטואלי אין \"פלט נכון\".</b> תשובה שאומרת \"ירוץ רק הורס האב\" מתארת מה שקורה בדרך כלל, אבל מבחינת השפה המחיקה אינה מוגדרת. אם יש אפשרות \"התנהגות לא מוגדרת\", זו התשובה.</div>\n"
    },
    "questions": [
     {
      "id": "C05-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B { virtual ~B() { cout << \"~B \"; } };\nstruct D : B { ~D() { cout << \"~D \"; } };\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">~D ~B</code>"
       },
       {
        "id": "b",
        "value": "`~B ~D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">~B ~D</code>"
       },
       {
        "id": "c",
        "value": "`~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">~B</code>"
       },
       {
        "id": "d",
        "value": "`~D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">~D</code>"
       }
      ],
      "correctId": "a",
      "explanation": "ההורס של `B` וירטואלי, ולכן `delete p` מפעיל קודם את ההורס של הטיפוס האמיתי `~D`, ואחריו `~B` של האב כרגיל. `~B ~D` הוא סדר הפוך מהנכון. `~B` לבד הוא מה שקורה (במקרה הטוב) בלי `virtual`.",
      "recap": "הורס וירטואלי: נגזרת ואז אב",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B { virtual ~B() { cout &lt;&lt; \"~B \"; } };\nstruct D : B { ~D() { cout &lt;&lt; \"~D \"; } };\nint main() {\n    B* p = new D;\n    delete p;\n}</code></pre>",
      "explanationHtml": "ההורס של <code class=\"tok\" dir=\"ltr\">B</code> וירטואלי, ולכן <code class=\"tok\" dir=\"ltr\">delete p</code> מפעיל קודם את ההורס של הטיפוס האמיתי <code class=\"tok\" dir=\"ltr\">~D</code>, ואחריו <code class=\"tok\" dir=\"ltr\">~B</code> של האב כרגיל. <code class=\"tok\" dir=\"ltr\">~B ~D</code> הוא סדר הפוך מהנכון. <code class=\"tok\" dir=\"ltr\">~B</code> לבד הוא מה שקורה (במקרה הטוב) בלי <code class=\"tok\" dir=\"ltr\">virtual</code>.",
      "recapHtml": "הורס וירטואלי: נגזרת ואז אב"
     },
     {
      "id": "C05-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { cout << \"B \"; }\n    virtual ~B() { cout << \"~B \"; }\n};\nstruct D : B {\n    D() { cout << \"D \"; }\n    ~D() { cout << \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B D ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D ~D ~B</code>"
       },
       {
        "id": "b",
        "value": "`D B ~D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">D B ~D ~B</code>"
       },
       {
        "id": "c",
        "value": "`B D ~B ~D`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D ~B ~D</code>"
       },
       {
        "id": "d",
        "value": "`B D ~B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B D ~B</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בנייה מהאב אל הנגזרת: `B D`. הריסה בסדר הפוך: `~D ~B`. ההורס הוירטואלי מבטיח ששני ההורסים רצים. `D B` הפוך בבנייה, `~B ~D` הפוך בהריסה.",
      "recap": "בונים מלמעלה למטה, הורסים מלמטה למעלה",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B() { cout &lt;&lt; \"B \"; }\n    virtual ~B() { cout &lt;&lt; \"~B \"; }\n};\nstruct D : B {\n    D() { cout &lt;&lt; \"D \"; }\n    ~D() { cout &lt;&lt; \"~D \"; }\n};\nint main() {\n    B* p = new D;\n    delete p;\n}</code></pre>",
      "explanationHtml": "בנייה מהאב אל הנגזרת: <code class=\"tok\" dir=\"ltr\">B D</code>. הריסה בסדר הפוך: <code class=\"tok\" dir=\"ltr\">~D ~B</code>. ההורס הוירטואלי מבטיח ששני ההורסים רצים. <code class=\"tok\" dir=\"ltr\">D B</code> הפוך בבנייה, <code class=\"tok\" dir=\"ltr\">~B ~D</code> הפוך בהריסה.",
      "recapHtml": "בונים מלמעלה למטה, הורסים מלמטה למעלה"
     },
     {
      "id": "C05-Q3",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    B() { f(); }\n    virtual void f() { cout << \"Bf \"; }\n};\nstruct D : B {\n    D() { f(); }\n    void f() { cout << \"Df \"; }\n};\nint main() {\n    D d;\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Bf Df`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Bf Df</code>"
       },
       {
        "id": "b",
        "value": "`Df Df`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Df Df</code>"
       },
       {
        "id": "c",
        "value": "`Df Bf`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Df Bf</code>"
       },
       {
        "id": "d",
        "value": "`Bf Bf`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Bf Bf</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בזמן שהבנאי של `B` רץ, האובייקט הוא עדיין `B` בלבד (החלק של `D` לא נבנה), ולכן `f()` בתוכו היא `B::f`. אחר כך הבנאי של `D` רץ, ושם `f()` היא `D::f`. `Df Df` היא ההנחה הטבעית (והשגויה) שהוירטואליות תפעיל את הנגזרת גם בבנאי של האב.",
      "recap": "וירטואלי בתוך בנאי = הגרסה של המחלקה הנבנית",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    B() { f(); }\n    virtual void f() { cout &lt;&lt; \"Bf \"; }\n};\nstruct D : B {\n    D() { f(); }\n    void f() { cout &lt;&lt; \"Df \"; }\n};\nint main() {\n    D d;\n}</code></pre>",
      "explanationHtml": "בזמן שהבנאי של <code class=\"tok\" dir=\"ltr\">B</code> רץ, האובייקט הוא עדיין <code class=\"tok\" dir=\"ltr\">B</code> בלבד (החלק של <code class=\"tok\" dir=\"ltr\">D</code> לא נבנה), ולכן <code class=\"tok\" dir=\"ltr\">f()</code> בתוכו היא <code class=\"tok\" dir=\"ltr\">B::f</code>. אחר כך הבנאי של <code class=\"tok\" dir=\"ltr\">D</code> רץ, ושם <code class=\"tok\" dir=\"ltr\">f()</code> היא <code class=\"tok\" dir=\"ltr\">D::f</code>. <code class=\"tok\" dir=\"ltr\">Df Df</code> היא ההנחה הטבעית (והשגויה) שהוירטואליות תפעיל את הנגזרת גם בבנאי של האב.",
      "recapHtml": "וירטואלי בתוך בנאי = הגרסה של המחלקה הנבנית"
     },
     {
      "id": "C05-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct B {\n    virtual void f() { cout << \"Bf \"; }\n    virtual ~B() { f(); }\n};\nstruct D : B {\n    void f() { cout << \"Df \"; }\n    ~D() { f(); }\n};\nint main() {\n    {\n        D d;\n    }\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`Df Bf`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Df Bf</code>"
       },
       {
        "id": "b",
        "value": "`Df Df`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Df Df</code>"
       },
       {
        "id": "c",
        "value": "`Bf Bf`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Bf Bf</code>"
       },
       {
        "id": "d",
        "value": "`Bf Df`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">Bf Df</code>"
       }
      ],
      "correctId": "a",
      "explanation": "קודם רץ `~D`, שבו `f()` היא `D::f` (`Df`). אחר כך החלק של `D` נהרס, והאובייקט הופך ל-`B`. `~B` קורא ל-`f()`, שמגיעה כבר ל-`B::f` (`Bf`). `Df Df` מתעלמת מכך שחלק הנגזרת כבר לא קיים.",
      "recap": "בהורס האב האובייקט כבר רק B",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct B {\n    virtual void f() { cout &lt;&lt; \"Bf \"; }\n    virtual ~B() { f(); }\n};\nstruct D : B {\n    void f() { cout &lt;&lt; \"Df \"; }\n    ~D() { f(); }\n};\nint main() {\n    {\n        D d;\n    }\n}</code></pre>",
      "explanationHtml": "קודם רץ <code class=\"tok\" dir=\"ltr\">~D</code>, שבו <code class=\"tok\" dir=\"ltr\">f()</code> היא <code class=\"tok\" dir=\"ltr\">D::f</code> (<code class=\"tok\" dir=\"ltr\">Df</code>). אחר כך החלק של <code class=\"tok\" dir=\"ltr\">D</code> נהרס, והאובייקט הופך ל-<code class=\"tok\" dir=\"ltr\">B</code>. <code class=\"tok\" dir=\"ltr\">~B</code> קורא ל-<code class=\"tok\" dir=\"ltr\">f()</code>, שמגיעה כבר ל-<code class=\"tok\" dir=\"ltr\">B::f</code> (<code class=\"tok\" dir=\"ltr\">Bf</code>). <code class=\"tok\" dir=\"ltr\">Df Df</code> מתעלמת מכך שחלק הנגזרת כבר לא קיים.",
      "recapHtml": "בהורס האב האובייקט כבר רק B"
     },
     {
      "id": "C05-Q5",
      "question": "מחלקה `Base` ללא הורס וירטואלי, ו-`Derived` יורשת ממנה ומנהלת זיכרון. מה אומר התקן על `Base* p = new Derived; delete p;`?",
      "options": [
       {
        "id": "a",
        "value": "התנהגות לא מוגדרת (UB)",
        "type": "text",
        "html": "התנהגות לא מוגדרת (UB)"
       },
       {
        "id": "b",
        "value": "נקרא רק ההורס של `Derived`",
        "type": "text",
        "html": "נקרא רק ההורס של <code class=\"tok\" dir=\"ltr\">Derived</code>"
       },
       {
        "id": "c",
        "value": "נקראים שני ההורסים בסדר הנכון",
        "type": "text",
        "html": "נקראים שני ההורסים בסדר הנכון"
       },
       {
        "id": "d",
        "value": "שגיאת קומפילציה",
        "type": "text",
        "html": "שגיאת קומפילציה"
       }
      ],
      "correctId": "a",
      "explanation": "מחיקת אובייקט נגזר דרך מצביע לאב כשההורס של האב אינו וירטואלי היא התנהגות לא מוגדרת. בפועל לרוב רץ רק `~Base`, אבל זו לא הבטחה של השפה ולכן אין לענות עליה כ\"הפלט\". הקוד כן מתקמפל, והקומפיילר לא חייב אפילו להזהיר.",
      "recap": "delete דרך אב בלי הורס וירטואלי = UB",
      "questionHtml": "מחלקה <code class=\"tok\" dir=\"ltr\">Base</code> ללא הורס וירטואלי, ו-<code class=\"tok\" dir=\"ltr\">Derived</code> יורשת ממנה ומנהלת זיכרון. מה אומר התקן על <code class=\"tok\" dir=\"ltr\">Base* p = new Derived; delete p;</code>?",
      "explanationHtml": "מחיקת אובייקט נגזר דרך מצביע לאב כשההורס של האב אינו וירטואלי היא התנהגות לא מוגדרת. בפועל לרוב רץ רק <code class=\"tok\" dir=\"ltr\">~Base</code>, אבל זו לא הבטחה של השפה ולכן אין לענות עליה כ\"הפלט\". הקוד כן מתקמפל, והקומפיילר לא חייב אפילו להזהיר.",
      "recapHtml": "delete דרך אב בלי הורס וירטואלי = UB"
     },
     {
      "id": "C05-Q6",
      "question": "במחלקה `Shape` יש `virtual double area()`, וקוד מוחק עצמים של `Circle` דרך `Shape*`. מה צריך להוסיף כדי שהמחיקה תהיה תקינה?",
      "options": [
       {
        "id": "a",
        "value": "`virtual ~Shape() {}` ב-`Shape`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">virtual ~Shape() {}</code> ב-<code class=\"tok\" dir=\"ltr\">Shape</code>"
       },
       {
        "id": "b",
        "value": "`virtual ~Circle()` רק ב-`Circle`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">virtual ~Circle()</code> רק ב-<code class=\"tok\" dir=\"ltr\">Circle</code>"
       },
       {
        "id": "c",
        "value": "`override` על `area` ב-`Circle`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">override</code> על <code class=\"tok\" dir=\"ltr\">area</code> ב-<code class=\"tok\" dir=\"ltr\">Circle</code>"
       },
       {
        "id": "d",
        "value": "בנאי וירטואלי ב-`Shape`",
        "type": "text",
        "html": "בנאי וירטואלי ב-<code class=\"tok\" dir=\"ltr\">Shape</code>"
       }
      ],
      "correctId": "a",
      "explanation": "המחיקה דרך `Shape*` חייבת הורס וירטואלי ב-`Shape` עצמה. הוספת `virtual` רק ב-`Circle` לא עוזרת, כי הקומפיילר מסתכל על הטיפוס המוצהר `Shape`. `override` על `area` לא קשורה להריסה. בנאי אי אפשר להפוך לוירטואלי בכלל.",
      "recap": "ההורס הוירטואלי נכתב באב",
      "questionHtml": "במחלקה <code class=\"tok\" dir=\"ltr\">Shape</code> יש <code class=\"tok\" dir=\"ltr\">virtual double area()</code>, וקוד מוחק עצמים של <code class=\"tok\" dir=\"ltr\">Circle</code> דרך <code class=\"tok\" dir=\"ltr\">Shape*</code>. מה צריך להוסיף כדי שהמחיקה תהיה תקינה?",
      "explanationHtml": "המחיקה דרך <code class=\"tok\" dir=\"ltr\">Shape*</code> חייבת הורס וירטואלי ב-<code class=\"tok\" dir=\"ltr\">Shape</code> עצמה. הוספת <code class=\"tok\" dir=\"ltr\">virtual</code> רק ב-<code class=\"tok\" dir=\"ltr\">Circle</code> לא עוזרת, כי הקומפיילר מסתכל על הטיפוס המוצהר <code class=\"tok\" dir=\"ltr\">Shape</code>. <code class=\"tok\" dir=\"ltr\">override</code> על <code class=\"tok\" dir=\"ltr\">area</code> לא קשורה להריסה. בנאי אי אפשר להפוך לוירטואלי בכלל.",
      "recapHtml": "ההורס הוירטואלי נכתב באב"
     }
    ]
   },
   {
    "id": "C06",
    "order": 6,
    "icon": "🔧",
    "title": "שם מלא ומגבלות",
    "goal": "להפעיל גרסה מסוימת בשם מלא ולדעת מה אפשר להפוך לוירטואלי.",
    "source": "ai-verified",
    "boss": false,
    "lesson": {
     "html": "\n<p><b>שם מלא</b> (<code>p->Base::f()</code>) מבטל את הבחירה בזמן ריצה ומפעיל את הגרסה של המחלקה הנקובה. אפשר לנקוב בכל מחלקה בשרשרת הירושה של האובייקט.</p>\n<p><b>מה אי אפשר להפוך לוירטואלי?</b> <b>בנאי</b>: אסור (בזמן הבנייה אין עדיין אובייקט עם טיפוס אמיתי). הורס, פונקציה <code>const</code>, פונקציה שמחזירה <code>void</code> ושאר פונקציות חבר רגילות: מותר.</p>\n<p><b>איך זה עובד:</b> למחלקה עם פונקציה וירטואלית יש <b>טבלה וירטואלית</b> (vtable) עם כתובות הגרסאות, ולכל אובייקט שלה מצביע נסתר אליה. קריאה וירטואלית היא חיפוש בטבלה של האובייקט, ולכן היא תלויה באובייקט ולא בטיפוס המצביע.</p>\n<div class=\"lesson-rule\">🔑 <b>פונקציה לא וירטואלית שקוראת לוירטואלית</b> (דרך <code>this</code>) מפעילה את הגרסה של האובייקט האמיתי, אבל על אובייקט חתוך האובייקט האמיתי הוא כבר רק האב.</div>\n<div class=\"lesson-ex\"><pre>struct A { virtual void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nA* p = new B;\np-&gt;f();       // B\np-&gt;A::f();    // A  (qualified name: no dispatch)</pre></div>\n"
    },
    "questions": [
     {
      "id": "C06-Q1",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct A { virtual void f() { cout << \"A \"; } };\nstruct B : A { void f() { cout << \"B \"; } };\nint main() {\n    A* p = new B;\n    p->f();\n    p->A::f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`B A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B A</code>"
       },
       {
        "id": "b",
        "value": "`A B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A B</code>"
       },
       {
        "id": "c",
        "value": "`B B`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">B B</code>"
       },
       {
        "id": "d",
        "value": "`A A`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">A A</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`p->f()` וירטואלית ומגיעה ל-`B`. `p->A::f()` עם שם מלא מדלגת על הטבלה ומפעילה ישירות את `A::f`. `B B` מתעלמת מהשם המלא.",
      "recap": "שם מלא Base:: מבטל וירטואליות",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct A { virtual void f() { cout &lt;&lt; \"A \"; } };\nstruct B : A { void f() { cout &lt;&lt; \"B \"; } };\nint main() {\n    A* p = new B;\n    p-&gt;f();\n    p-&gt;A::f();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">p-&gt;f()</code> וירטואלית ומגיעה ל-<code class=\"tok\" dir=\"ltr\">B</code>. <code class=\"tok\" dir=\"ltr\">p-&gt;A::f()</code> עם שם מלא מדלגת על הטבלה ומפעילה ישירות את <code class=\"tok\" dir=\"ltr\">A::f</code>. <code class=\"tok\" dir=\"ltr\">B B</code> מתעלמת מהשם המלא.",
      "recapHtml": "שם מלא Base:: מבטל וירטואליות"
     },
     {
      "id": "C06-Q2",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct X { virtual void f() { cout << \"1 \"; } };\nstruct Y : X { void f() { cout << \"2 \"; } };\nstruct Z : Y { void f() { cout << \"3 \"; } };\nint main() {\n    Z* p = new Z;\n    p->X::f();\n    p->Y::f();\n    p->f();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`1 2 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 2 3</code>"
       },
       {
        "id": "b",
        "value": "`3 3 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 3 3</code>"
       },
       {
        "id": "c",
        "value": "`3 2 1`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">3 2 1</code>"
       },
       {
        "id": "d",
        "value": "`1 1 3`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">1 1 3</code>"
       }
      ],
      "correctId": "a",
      "explanation": "השמות המלאים בוחרים בדיוק את הגרסה הנקובה, בלי תלות בטיפוס האובייקט: `X::f` מדפיסה 1, `Y::f` מדפיסה 2, והקריאה הרגילה מגיעה ל-`Z::f`, כלומר 3. הסדר לפי סדר השורות.",
      "recap": "אפשר לנקוב בכל מחלקה בשרשרת",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct X { virtual void f() { cout &lt;&lt; \"1 \"; } };\nstruct Y : X { void f() { cout &lt;&lt; \"2 \"; } };\nstruct Z : Y { void f() { cout &lt;&lt; \"3 \"; } };\nint main() {\n    Z* p = new Z;\n    p-&gt;X::f();\n    p-&gt;Y::f();\n    p-&gt;f();\n}</code></pre>",
      "explanationHtml": "השמות המלאים בוחרים בדיוק את הגרסה הנקובה, בלי תלות בטיפוס האובייקט: <code class=\"tok\" dir=\"ltr\">X::f</code> מדפיסה 1, <code class=\"tok\" dir=\"ltr\">Y::f</code> מדפיסה 2, והקריאה הרגילה מגיעה ל-<code class=\"tok\" dir=\"ltr\">Z::f</code>, כלומר 3. הסדר לפי סדר השורות.",
      "recapHtml": "אפשר לנקוב בכל מחלקה בשרשרת"
     },
     {
      "id": "C06-Q3",
      "question": "איזו מהפונקציות הבאות **אי אפשר** להגדיר כוירטואלית?",
      "options": [
       {
        "id": "a",
        "value": "בנאי",
        "type": "text",
        "html": "בנאי"
       },
       {
        "id": "b",
        "value": "הורס",
        "type": "text",
        "html": "הורס"
       },
       {
        "id": "c",
        "value": "פונקציה חבר `const`",
        "type": "text",
        "html": "פונקציה חבר <code class=\"tok\" dir=\"ltr\">const</code>"
       },
       {
        "id": "d",
        "value": "פונקציה חבר שמחזירה `void`",
        "type": "text",
        "html": "פונקציה חבר שמחזירה <code class=\"tok\" dir=\"ltr\">void</code>"
       }
      ],
      "correctId": "a",
      "explanation": "בנאי לא יכול להיות וירטואלי: בעת הבנייה עוד אין אובייקט עם טיפוס אמיתי שאפשר לחפש בטבלה שלו. הורס כן יכול ואף מומלץ, ופונקציה `const` או `void` יכולה להיות וירטואלית כרגיל.",
      "recap": "בנאי אינו וירטואלי",
      "questionHtml": "איזו מהפונקציות הבאות <strong>אי אפשר</strong> להגדיר כוירטואלית?",
      "explanationHtml": "בנאי לא יכול להיות וירטואלי: בעת הבנייה עוד אין אובייקט עם טיפוס אמיתי שאפשר לחפש בטבלה שלו. הורס כן יכול ואף מומלץ, ופונקציה <code class=\"tok\" dir=\"ltr\">const</code> או <code class=\"tok\" dir=\"ltr\">void</code> יכולה להיות וירטואלית כרגיל.",
      "recapHtml": "בנאי אינו וירטואלי"
     },
     {
      "id": "C06-Q4",
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct Shape {\n    virtual int area() { return 0; }\n    int twice() { return 2 * area(); }\n};\nstruct Sq : Shape {\n    int s;\n    Sq(int s) : s(s) {}\n    int area() { return s * s; }\n};\nint main() {\n    Shape* p = new Sq(3);\n    cout << p->area() << \" \" << p->twice() << \" \";\n    Shape sh = *p;\n    cout << sh.twice();\n}\n```",
      "options": [
       {
        "id": "a",
        "value": "`9 18 0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">9 18 0</code>"
       },
       {
        "id": "b",
        "value": "`9 18 18`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">9 18 18</code>"
       },
       {
        "id": "c",
        "value": "`0 0 0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">0 0 0</code>"
       },
       {
        "id": "d",
        "value": "`9 9 0`",
        "type": "text",
        "html": "<code class=\"tok\" dir=\"ltr\">9 9 0</code>"
       }
      ],
      "correctId": "a",
      "explanation": "`p->area()` מגיעה ל-`Sq::area` ונותנת 9. `twice` אינה וירטואלית, אבל `area()` שבתוכה כן, ולכן 18. `Shape sh = *p;` חותכת ל-`Shape` טהורה, ושם `area()` מחזירה 0 ו-`twice()` היא 0. `9 18 18` שוכחת את החיתוך.",
      "recap": "וירטואלי דרך this תלוי באובייקט, וחיתוך משנה אותו",
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct Shape {\n    virtual int area() { return 0; }\n    int twice() { return 2 * area(); }\n};\nstruct Sq : Shape {\n    int s;\n    Sq(int s) : s(s) {}\n    int area() { return s * s; }\n};\nint main() {\n    Shape* p = new Sq(3);\n    cout &lt;&lt; p-&gt;area() &lt;&lt; \" \" &lt;&lt; p-&gt;twice() &lt;&lt; \" \";\n    Shape sh = *p;\n    cout &lt;&lt; sh.twice();\n}</code></pre>",
      "explanationHtml": "<code class=\"tok\" dir=\"ltr\">p-&gt;area()</code> מגיעה ל-<code class=\"tok\" dir=\"ltr\">Sq::area</code> ונותנת 9. <code class=\"tok\" dir=\"ltr\">twice</code> אינה וירטואלית, אבל <code class=\"tok\" dir=\"ltr\">area()</code> שבתוכה כן, ולכן 18. <code class=\"tok\" dir=\"ltr\">Shape sh = *p;</code> חותכת ל-<code class=\"tok\" dir=\"ltr\">Shape</code> טהורה, ושם <code class=\"tok\" dir=\"ltr\">area()</code> מחזירה 0 ו-<code class=\"tok\" dir=\"ltr\">twice()</code> היא 0. <code class=\"tok\" dir=\"ltr\">9 18 18</code> שוכחת את החיתוך.",
      "recapHtml": "וירטואלי דרך this תלוי באובייקט, וחיתוך משנה אותו"
     },
     {
      "id": "C06-Q5",
      "question": "במצביע `Shape* s;` ובפונקציה `draw`, מתי הקריאה `s->draw()` עשויה להפעיל גרסאות שונות בריצות שונות של אותה שורה?",
      "options": [
       {
        "id": "a",
        "value": "כש-`draw` וירטואלית ב-`Shape`, ו-`s` יכול להצביע על אובייקטים מנגזרות שונות",
        "type": "text",
        "html": "כש-<code class=\"tok\" dir=\"ltr\">draw</code> וירטואלית ב-<code class=\"tok\" dir=\"ltr\">Shape</code>, ו-<code class=\"tok\" dir=\"ltr\">s</code> יכול להצביע על אובייקטים מנגזרות שונות"
       },
       {
        "id": "b",
        "value": "כשיש ל-`draw` ערך ברירת מחדל",
        "type": "text",
        "html": "כשיש ל-<code class=\"tok\" dir=\"ltr\">draw</code> ערך ברירת מחדל"
       },
       {
        "id": "c",
        "value": "כש-`draw` מוגדרת `const`",
        "type": "text",
        "html": "כש-<code class=\"tok\" dir=\"ltr\">draw</code> מוגדרת <code class=\"tok\" dir=\"ltr\">const</code>"
       },
       {
        "id": "d",
        "value": "כש-`draw` אינה וירטואלית ויש יותר מנגזרת אחת",
        "type": "text",
        "html": "כש-<code class=\"tok\" dir=\"ltr\">draw</code> אינה וירטואלית ויש יותר מנגזרת אחת"
       }
      ],
      "correctId": "a",
      "explanation": "בחירה בזמן ריצה קורית רק כשיש גם וירטואליות באב וגם אובייקטים בפועל שונים. ערך ברירת מחדל ו-`const` לא משנים את הבחירה, ופונקציה לא וירטואלית תמיד נקבעת לפי `Shape`, לא משנה כמה נגזרות יש.",
      "recap": "וירטואלית + אובייקטים בפועל שונים",
      "questionHtml": "במצביע <code class=\"tok\" dir=\"ltr\">Shape* s;</code> ובפונקציה <code class=\"tok\" dir=\"ltr\">draw</code>, מתי הקריאה <code class=\"tok\" dir=\"ltr\">s-&gt;draw()</code> עשויה להפעיל גרסאות שונות בריצות שונות של אותה שורה?",
      "explanationHtml": "בחירה בזמן ריצה קורית רק כשיש גם וירטואליות באב וגם אובייקטים בפועל שונים. ערך ברירת מחדל ו-<code class=\"tok\" dir=\"ltr\">const</code> לא משנים את הבחירה, ופונקציה לא וירטואלית תמיד נקבעת לפי <code class=\"tok\" dir=\"ltr\">Shape</code>, לא משנה כמה נגזרות יש.",
      "recapHtml": "וירטואלית + אובייקטים בפועל שונים"
     }
    ]
   },
   {
    "id": "C07",
    "order": 7,
    "icon": "🏆",
    "title": "מבחן גמר: וירטואליות ופולימורפיזם",
    "goal": "לפתור שאלות אמיתיות מהמבחנים על פונקציות וירטואליות.",
    "source": "ai-verified",
    "boss": true,
    "lesson": {
     "html": "\n<p>בשאלות המבחן על וירטואליות ופולימורפיזם, לכל קריאה <code>p->f()</code> עוברים על ארבע שאלות לפי הסדר:</p>\n<ol>\n<li><b>מה הטיפוס המוצהר של <code>p</code>?</b> ו<b>מה האובייקט בפועל?</b></li>\n<li><b>האם יש שם מלא (<code>Base::</code>) או אובייקט בערך (חיתוך)?</b> אם כן, הטיפוס המוצהר קובע.</li>\n<li><b>האם <code>f</code> וירטואלית ב-<code>Base</code>?</b> לא: <code>Base::f</code>. כן: מחפשים את הגרסה הנמוכה ביותר בשרשרת של האובייקט האמיתי.</li>\n<li><b>האם החתימות זהות</b> (כולל <code>const</code>)? אחרת אין דריסה.</li>\n</ol>\n<div class=\"lesson-rule\">🔑 <b>בכל שורה מסמנים ליד הקריאה: טיפוס מוצהר, אובייקט אמיתי, האם וירטואלית.</b> ובמערך או בלולאה מחשבים כל איבר בנפרד.</div>\n<div class=\"lesson-trap\">⚠️ <b>הורס בלי <code>virtual</code></b> ו-<code>delete</code> דרך אב הוא UB. אם שאלה כזו מופיעה, התשובה היא \"לא מוגדר\", לא \"רק הורס האב\".</div>\n"
    },
    "questions": [
     {
      "bankId": "19A-B-Q5",
      "recap": "העברה בערך חותכת לטיפוס האב.",
      "recapHtml": "העברה בערך חותכת לטיפוס האב."
     },
     {
      "bankId": "24B-A-Q1",
      "recap": "הפניה ומצביע לאב: וירטואלית נבחרת לפי האובייקט האמיתי.",
      "recapHtml": "הפניה ומצביע לאב: וירטואלית נבחרת לפי האובייקט האמיתי."
     },
     {
      "bankId": "20B-A-Q15",
      "recap": "מערך מצביעים: בוחנים כל פונקציה בנפרד, וירטואלית או לא.",
      "recapHtml": "מערך מצביעים: בוחנים כל פונקציה בנפרד, וירטואלית או לא."
     },
     {
      "bankId": "25S-A-Q3",
      "recap": "שם מלא Base:: מדלג על הקשירה הדינמית.",
      "recapHtml": "שם מלא Base:: מדלג על הקשירה הדינמית."
     },
     {
      "bankId": "21B-B-Q20",
      "recap": "פונקציה וירטואלית מול לא וירטואלית דרך מצביע לאב.",
      "recapHtml": "פונקציה וירטואלית מול לא וירטואלית דרך מצביע לאב."
     },
     {
      "bankId": "24B-B-Q8",
      "recap": "דריסה עם אותה חתימה: הקריאה דרך Base* מפעילה את Derived.",
      "recapHtml": "דריסה עם אותה חתימה: הקריאה דרך Base* מפעילה את Derived."
     }
    ]
   }
  ]
 }
};
