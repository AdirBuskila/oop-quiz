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
     "html": "\n<p>כשעובדים עם אובייקטים יש שלוש פעולות שקשורות ל\"העתקה\". כדי לדעת איזו נקראת בכל שורה שואלים שאלה אחת: <b>האם האובייקט בצד שמאל כבר קיים?</b></p>\n<table>\n<thead><tr><th>השורה</th><th>מה קורה</th><th>מי נקרא</th></tr></thead>\n<tbody>\n<tr><td><code>T b = a;</code></td><td>נוצר אובייקט חדש <code>b</code></td><td>בנאי העתקה</td></tr>\n<tr><td><code>T b(a);</code></td><td>נוצר אובייקט חדש <code>b</code></td><td>בנאי העתקה</td></tr>\n<tr><td><code>b = a;</code> (אחרי ש-<code>b</code> הוגדר)</td><td>שני האובייקטים כבר קיימים</td><td>אופרטור השמה</td></tr>\n</tbody></table>\n<div class=\"lesson-rule\">🔑 <b>אובייקט חדש = בנאי. אובייקט קיים = השמה.</b> סימן ה-<code>=</code> בשורת הצהרה (<code>T b = a;</code>) הוא אתחול, ולכן נקרא בנאי העתקה ולא אופרטור ההשמה.</div>\n<div class=\"lesson-ex\">נעקוב אחרי מחלקה שמדפיסה בכל פעולה:\n<pre>struct T {\n    T()                    { cout &lt;&lt; \"D \"; }\n    T(const T&amp;)            { cout &lt;&lt; \"C \"; }\n    T&amp; operator=(const T&amp;) { cout &lt;&lt; \"A \"; return *this; }\n};\nT a;       // D\nT b = a;   // C\nb = a;     // A</pre></div>\n<div class=\"lesson-trap\">⚠️ <b>אם לא כתבתם בנאי העתקה</b>, הקומפיילר יוצר אחד בעצמו, והוא <b>לא מדפיס כלום</b>. העתקה שקרתה בשקט עדיין נחשבת העתקה.</div>\n"
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
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nK id(K k) { return k; }\nint main() {\n    K a;\n    K b = id(a);\n    cout << K::n;\n}\n```",
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
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nK id(K k) { return k; }\nint main() {\n    K a;\n    K b = id(a);\n    cout &lt;&lt; K::n;\n}</code></pre>",
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
      "question": "מה מדפיסה התכנית?\n```cpp\nstruct K {\n    static int n;\n    K() {}\n    K(const K&) { n++; }\n};\nint K::n = 0;\nvoid f1(K& k) {}\nvoid f2(K k) {}\nvoid f3(K* k) {}\nK    f4() { return K(); }\nK&   f5(K& k) { return k; }\nK*   f6(K* k) { return k; }\nint main() {\n    K a;\n    f1(a);\n    f2(a);\n    f3(&a);\n    f4();\n    f5(a);\n    f6(&a);\n    cout << K::n;\n}\n```",
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
      "questionHtml": "מה מדפיסה התכנית?<pre class=\"code-block\" dir=\"ltr\" data-lang=\"cpp\"><code>struct K {\n    static int n;\n    K() {}\n    K(const K&amp;) { n++; }\n};\nint K::n = 0;\nvoid f1(K&amp; k) {}\nvoid f2(K k) {}\nvoid f3(K* k) {}\nK    f4() { return K(); }\nK&amp;   f5(K&amp; k) { return k; }\nK*   f6(K* k) { return k; }\nint main() {\n    K a;\n    f1(a);\n    f2(a);\n    f3(&amp;a);\n    f4();\n    f5(a);\n    f6(&amp;a);\n    cout &lt;&lt; K::n;\n}</code></pre>",
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
 }
};
