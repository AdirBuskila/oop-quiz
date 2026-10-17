# -*- coding: utf-8 -*-
"""Generator for tools/raw/18A-C.json -- oop (61307), 2018 semester A, moed C (printed date 17.05.2018).
Run: PYTHONUTF8=1 py tools/gen/gen_18A-C.py

Source: 12-page scan of a student's copy (25 MCQ, 4 options). The scan carries the student's own boxes/scribbles, NOT a grader's marks,
so no key is taken from them (several are wrong). The ID area on page 1 is blacked out in the scan and no page image is shipped.
Keys:
- Q1-Q11, Q13, Q14, Q16-Q19, Q21, Q22, Q24, Q25: derived from a clang++ compile/run (tools/verify/18A-C/verify.py reads the code out of this
  file's questions); answerSource "solved", official False. Where the run differs from the student's box, the run wins.
- Q15 and Q20 (MFC): same stem and options as 18A-B Q15 / Q20, whose official highlighted key is used (note says so).
- Q23: analogous to 18A-B Q23 (cin instead of cout); keyed b like that sitting, but c also compiles (noted, confidence med).
- Q12 (MFC, no official source, no way to run it): keyed c by the arbiter from the MFC message order (confidence med).
Handwriting added by the student to the code (an extra `*`, `private:`, `g(&x)`) is ignored; the printed code is transcribed.
The exam targets Visual Studio (`void main`); the harness rewrites it to `int main`."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "18A-C.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def numbered(code, tag="cpp"):
    """Fenced block with the printed line numbers `1. ...` in front of each line."""
    lines = code.strip("\n").split("\n")
    w = 2 if len(lines) >= 10 else 1
    return cb("\n".join(f"{i:>{w}}. {t}" for i, t in enumerate(lines, 1)), tag)


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "answerSource": "solved", "official": False, "confidence": "high",
         "explanation": "", "note": note, "contextId": "notes"}
    if correct:
        q["correctId"] = correct
    q.update(kw)
    return q


OUT_Q = "מה מדפיסה התכנית?\n"
OUT_Q2 = "מה מדפיסה התכנית הבאה:\n"
ERR_Q = "אילו שורות גורמות לשגיאת קומפילציה בקטע הקוד הבא:\n"
ERR_CLS = "אילו שורות במחלקה הבאה גורמות לשגיאת קומפילציה?\n"
OFFICIAL_COPY = ("Key transferred from the official highlighted key of {} (same stem and options); MFC question, cannot be run. The student's box on this scan agrees.")
FIELD_OPTS = ["לשדה `f` אפשר לגשת מכל מקום בתכנית",
              "לשדה `f` אפשר לגשת רק מתוך המחלקה `X`",
              "לשדה `f` אפשר לגשת רק מתוך המחלקות שיורשות מהמחלקה `X` אבל לא מ-`X` עצמה",
              "לשדה `f` אפשר לגשת מתוך המחלקות שיורשות מהמחלקה `X` וגם מ-`X` עצמה"]

questions = []

questions.append(Q(
    1, "cpp_basics_refs", "נתונות הגדרה של פונקציית `main` והגדרה של פונקציה `f` בה הושמט טיפוס החזרה:\n" + cb('''
___ f() {
    static int x = 0;
    return x;
}
void main() { f() = 5; }''') + "\nמה צריך להיות הטיפוס שהפונקציה `f` מחזירה כדי שהתוכנית תעבור קומפילציה?\n",
    txt("`int`", "`int*`", "`int&`", "`T`"), "c",
    "Key from the clang++ run: only `int&` compiles. The student's box agrees."))

questions.append(Q(
    2, "cpp_basics_refs", OUT_Q + cb('''
#include <iostream>
class X {
public:
    int f;
};
void g(X *x) { x->f = 5; }
void main() {
    X x;
    x.f = 3;
    g(x);
    std::cout << x.f;
}'''),
    txt("התכנית לא עוברת קומפילציה", "`3`", "`5`", "אף תשובה אינה נכונה"), "a",
    "Key from the clang++ run: `g(x)` passes an `X` where `X*` is expected, a compile error. The student boxed b (reading the call as `g(&x)`, which is handwritten next to the code, not printed); the printed call is `g(x);`."))

questions.append(Q(
    3, "copy_control", OUT_Q + cb('''
#include <iostream>
class X {
public: X(int n) { std::cout << n; }
};
X a(1);
void main() {
    X a(2);
    X b = a;
}'''),
    txt("`123`", "`122`", "`12`", "התכנית לא עוברת קומפילציה"), "c",
    "Key from the clang++ run: prints 12 (global a(1), local a(2); `X b = a` uses the implicit copy constructor, which prints nothing). The student's box agrees."))

questions.append(Q(
    4, "const_references", ERR_CLS + numbered('''
class X {
public:
    X() : x(*this) {}
    X(int a) { x = this; }
    X(int a, int b) { }
    X &x;
};'''),
    txt("שורה 3", "שורה 4", "שורה 5", "שורות 4 ו-5"), "d",
    "Key from the clang++ run: errors on lines 4 (reference member left uninitialized, and `x = this` assigns a pointer to a reference) and 5 (reference member not initialized); line 3 is fine. The student boxed b."))

questions.append(Q(
    5, "friend_this_static", ERR_Q + numbered('''
class X {
    friend class Y;
    int a;
    void f(Y y) { y.a = 1; }
};
class Y {
    int a;
    void f(X x) { x.a = 1; }
};'''),
    txt("אף שורה", "שורה 4", "שורה 8", "שורות 4 ו-8"), "b",
    "Key from the clang++ run: only line 4 is an error (`Y` is not a complete type there); line 8 is fine because Y is X's friend. The student's box agrees."))

questions.append(Q(
    6, "friend_this_static", "מה צריך להיכתב בשורה 3 כדי שהתכנית הבאה תתקמפל ותדפיס 1:\n" + cb('''
#include <iostream>
class X {
public:
    X& f() { return _____; }
};
void main() {
    X x;
    std::cout << (&x == &x.f());
}'''),
    txt("`new X`", "`X()`", "`this`", "`*this`"), "d",
    "Key from the clang++ run: only `*this` compiles and prints 1. The student's box agrees."))

questions.append(Q(
    7, "operator_overloading", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה:\n" + cb('''
X x;
2 + x;'''),
    txt("להגדיר במחלקה `X` אופרטור `+` שמקבל פרמטר מטיפוס `int`",
        "להגדיר במחלקה `X` אופרטור `+` שמקבל שני פרמטרים: מטיפוס `int` ומטיפוס `X`",
        "להגדיר מחוץ למחלקה `X` אופרטור `+` שמקבל פרמטר מטיפוס `int` ופרמטר מטיפוס `X`",
        "תשובות (א) ו-(ג) נכונות"), "c",
    "Key from the clang++ run: a free `operator+(int, X)` compiles; a member `operator+(int)` serves `x + 2`, not `2 + x`; a member with two parameters is invalid. The student boxed b.",
    lockOrder=True))

questions.append(Q(
    8, "operator_conversions", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה:\n" + cb('''
class X {};
X x(5);'''),
    txt("להגדיר בנאי (constructor) במחלקה `X`",
        "להגדיר אופרטור השמה (`=`) במחלקה `X`",
        "להגדיר אופרטור השמה (`=`) מחוץ למחלקה `X`",
        "אף תשובה אינה נכונה"), "a",
    "Key from the clang++ run: `X x(5);` compiles with a constructor `X(int)`; assignment operators do not help. The student's box agrees."))

questions.append(Q(
    9, "copy_control", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה\n" + cb('''
class X {};
X x, y(x);'''),
    txt("להגדיר בנאי (constructor) שמקבל פרמטר אחד",
        "להגדיר אופרטור `()` שמקבל פרמטר אחד",
        "להגדיר פונקציה מחוץ למחלקה `X` שמקבלת פרמטר אחד",
        "התכנית עוברת קומפילציה כמו שהיא כתובה"), "d",
    "Key from the clang++ run: `X x, y(x);` already compiles (y is copy-constructed with the implicit copy constructor). The student boxed b and c."))

questions.append(Q(
    10, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `X`:\n" + cb('''
class X {
public:
    int f;
};'''),
    txt(*FIELD_OPTS), "a",
    "Key from the clang++ run: a public field is reachable from `main`. The student's box agrees."))

questions.append(Q(
    11, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `X`:\n" + cb('''
class X {
    int f;
};'''),
    txt(*FIELD_OPTS), "b",
    "Key from the clang++ run: the default access of a class is private; `X` reaches `f`, `main` and a derived class do not. The student's box agrees (the student also wrote `private:` next to the code; it is not printed)."))

questions.append(Q(
    12, "stl_exceptions", "איזו פונקציה **לא** נקראת בעקבות פתיחת חלון באמצעות MFC?\n",
    txt("`OnInitDialog`", "`OnPaint`", "`OnLButtonDown`", "תשובות א' וב' נכונות"), "c",
    "Arbiter ruling 2026-10-18 (was held): MFC framework fact, cannot be run. Opening a dialog sends WM_INITDIALOG (OnInitDialog) and WM_PAINT (OnPaint); "
    "OnLButtonDown needs a mouse click -> c. No official source; the student's boxes (c and d) are not a key.",
    confidence="med", lockOrder=True))

questions.append(Q(
    13, "virtual_polymorphism", OUT_Q2 + cb('''
#include <iostream>
class X {
public: virtual void f() { std:: cout << 1; }
};
class Y : public X {
public: virtual void f() { std::cout << 2; }
};
void main() {
    Y y;
    X *p = &y;
    p->f();
}'''),
    txt("`1`", "`2`", "`12`", "`21`"), "b",
    "Key from the clang++ run: prints 2 (virtual dispatch). The student boxed a."))

questions.append(Q(
    14, "construction_order", OUT_Q2 + cb('''
#include <iostream>
class X {
public:
    X() { std::cout << 1; }
    ~X() { std::cout << 2; }
};
class Y : public X{
public:
    Y() { std::cout << 3; }
    ~Y() { std::cout << 4; }
};
void main() {
    X *x = new Y;
}'''),
    txt("`34`", "`13`", "`134`", "`1342`"), "b",
    "Key from the clang++ run: prints 13 (no delete). The student's box agrees."))

questions.append(Q(
    15, "stl_exceptions", "ב-MFC איזו פונקציה נקראת בעקבות קריאה לפונקציה `Invalidate`?\n",
    txt("`OnInitDialog`", "`OnPaint`", "`OnLButtonDown`", "`OnMouseMove`"), "b",
    OFFICIAL_COPY.format("18A-B Q15"), answerSource="highlighted-pdf", official=True, confidence="med"))

questions.append(Q(
    16, "abstract_multiple", "בתכנית מוגדרות שלוש מחלקות:\n" + cb('''
class X {
public:
    virtual void f() = 0;
};
class Y : public X {
    void f() { }
};
class Z : public Y {};''') + "\nאיזו מהטענות נכונה:\n",
    txt("ניתן ליצור אובייקט מטיפוס `Y` אבל לא מטיפוסים `X` ו-`Z`",
        "ניתן ליצור אובייקט מטיפוסים `Y` ו-`Z` אבל לא מטיפוס `X`",
        "ניתן ליצור אובייקט מטיפוסים `X`, `Y` ו-`Z`",
        "לא ניתן ליצור אובייקט מטיפוסים `X`, `Y` ו-`Z`"), "b",
    "Key from the clang++ run: `X x;` fails (abstract), `Y y;` and `Z z;` compile. The student's box agrees."))

questions.append(Q(
    17, "templates", "אילו שורות בתכנית הבאה לא עוברות קומפילציה\n" + numbered('''
template<typename T> class X {};
void main() {
    X x;
    X x(int);
    X x<int>;
    X<int> x;
}'''),
    txt("שורה 4", "שורות 4 ו-5", "שורות 3, 4 ו-5", "אף תשובה אינה נכונה"), "c",
    "Key from the clang++ run (each of lines 3-6 compiled on its own): lines 3 (no template argument), 4 and 5 are errors; line 6 compiles. The student boxed b."))

questions.append(Q(
    18, "stl_exceptions", OUT_Q2 + cb('''
#include <vector>
#include <iostream>
void main() {
    std::vector<int> v;
    v.push_back(0);
    v.push_back(1);
    v.push_back(2);
    v.insert(v.end(), 9);
    for (int i = 0; i < v.size(); ++i) std::cout << v[i];
}'''),
    txt("`9012`", "`0912`", "`0192`", "`0129`"), "d",
    "Key from the clang++ run: prints 0129. The student's box agrees."))

questions.append(Q(
    19, "cpp_basics_refs", "איזו שורה בתכנית הבאה לא עוברת קומפילציה:\n" + numbered('''
void main() {
    int n;
    int &m;
    int *k;
}'''),
    txt("כל השורות עוברות קומפילציה", "שורה 2", "שורה 3", "שורה 4"), "c",
    "Key from the clang++ run: only line 3 is an error. The student's box agrees."))

questions.append(Q(
    20, "stl_exceptions", "ציור של איזו צורה באמצעות MFC דורש קריאה לשתי פונקציות?\n",
    txt("קו", "מלבן", "אליפסה", "אף תשובה אינה נכונה"), "a",
    OFFICIAL_COPY.format("18A-B Q20"), answerSource="highlighted-pdf", official=True, confidence="med"))

questions.append(Q(
    21, "inheritance_access", "בתכנית מוגדרות שתי מחלקות `X` ו-`Y`. מה ניתן להגיד על היחס ביניהן בהנחה הקטע הקוד הבא מתקמפל:\n" + numbered('''
Y y;
X &x = y;'''),
    txt("המחלקה `X` יורשת מהמחלקה `Y`", "המחלקה `Y` יורשת מהמחלקה `X`", "במחלקה `X` יש שדה מטיפוס `Y`", "במחלקה `Y` יש שדה מטיפוס `X`"), "b",
    "Key from the clang++ run: `X &x = y;` compiles when Y derives from X; it fails when X derives from Y or when either class merely holds a field of the other type "
    "(a conversion operator in Y could also make it compile, but that is not among the options). The student boxed a."))

questions.append(Q(
    22, "operator_overloading", "מה צריך לעשות כדי שהתכנית הבאה תעבור קומפילציה?\n" + cb('''
class X{};
class Y{};
void main() {
    X x;
    Y y;
    x + y;
}'''),
    txt("להגדיר במחלקה `X` אופרטור `+` שמקבל פרמטר מטיפוס `Y`",
        "להגדיר במחלקה `Y` אופרטור `+` שמקבל פרמטר מטיפוס `X`",
        "להגדיר במחלקה `X` אופרטור `+` שמקבל פרמטר מטיפוס `X` ופרמטר מטיפוס `Y`",
        "להגדיר במחלקה `Y` אופרטור `+` שמקבל פרמטר מטיפוס `X` ופרמטר מטיפוס `Y`"), "a",
    "Key from the clang++ run: member `X::operator+(Y)` compiles; the others do not. The student's box agrees."))

questions.append(Q(
    23, "operator_overloading", "מה צריך לעשות כדי שהתכנית הבאה תעבור קומפילציה?\n" + cb('''
#include <iostream>
class X{};
void main() {
    X x;
    std::cin >> x;
}'''),
    txt("להגדיר פונקציה חדשה במחלקה `X`",
        "להגדיר פונקציה חדשה מחוץ למחלקה שאיננה חברה של המחלקה `X`",
        "להגדיר פונקציה חדשה מחוץ למחלקה שהיא חברה של המחלקה `X`",
        "אף תשובה אינה נכונה"), "b",
    "Key b by analogy with the official key of 18A-B Q23 (same options, `cout <<`); the clang++ run shows that a free non-friend `operator>>(istream&, X&)` compiles, "
    "and so does a friend one (option c), while a member function does not. The student's box agrees with b.",
    confidence="med"))

questions.append(Q(
    24, "templates", OUT_Q + cb('''
#include <iostream>
int x = 0;
template<typename T> class X {
public:
    X() { std::cout << ++x; }
};
void main() {
    X<int> a;
    X<int> b;
    X<double> c;
}'''),
    txt("`000`", "`111`", "`121`", "`123`"), "d",
    "Key from the clang++ run: prints 123 (here `x` is one global variable, not a static member of the template, so all instantiations share it). The student boxed c."))

questions.append(Q(
    25, "const_references", ERR_CLS + numbered('''
class X {
public:
    int x;
    const int y;
    X() : x(1), y(1) {}
    void g() {
        x = 1;
        y = 1;
    }
};'''),
    txt("אף שורה", "שורה 7", "שורה 8", "שורות 7 ו-8"), "c",
    "Key from the clang++ run: only line 8 fails. The student's box agrees."))

EXPL = {
    1: 'ההשמה `f() = 5` דורשת שהקריאה תחזיר ערך שמאלי, ולכן הפונקציה חייבת להחזיר הפניה: `int&`. החזרה לפי ערך מחזירה זמני שאי אפשר להשים אליו, ב-`int*` ה-`return x` לא מתקמפל, ו-`T` אינו מוגדר.\nהתשובה היא תשובה ג.',
    2: 'הפונקציה `g` מקבלת מצביע `X*`, אבל הקריאה `g(x)` מעבירה אובייקט `X` ולא את כתובתו. אין המרה מאובייקט למצביע, ולכן יש שגיאת קומפילציה. אילו הקריאה הייתה `g(&x)` היה מודפס `5`.\nהתשובה היא שהתכנית לא עוברת קומפילציה (תשובה א).',
    3: 'המשתנה הגלובלי `a(1)` נבנה לפני `main` ומדפיס `1`. ב-`main` נבנה `a(2)` ומדפיס `2`. השורה `X b = a` יוצרת עותק בעזרת בנאי ההעתקה שהקומפיילר מייצר, והוא לא מדפיס כלום.\nהפלט הוא `12` (תשובה ג).',
    4: '- שורה 3: `x(*this)` מאתחל את שדה ההפניה, תקין.\n- שורה 4: שדה ההפניה לא מאותחל ברשימת האתחול, ובנוסף `x = this` מנסה להשים מצביע להפניה. שגיאה.\n- שורה 5: שדה ההפניה לא מאותחל, שגיאה.\nהתשובה היא שורות 4 ו-5 (תשובה ד).',
    5: 'בשורה 4 המחלקה `Y` עדיין לא מוכרת (היא מוגדרת רק אחרי `X`), ולכן `void f(Y y)` לא מתקמפל. שורה 8 תקינה: `Y` היא friend של `X`, ולכן יש לה גישה ל-`x.a`.\nהתשובה היא שורה 4 (תשובה ב).',
    6: 'הפונקציה מחזירה `X&`, ולכן צריך להחזיר את האובייקט עצמו: `*this`. התנאי `&x == &x.f()` נכון, והפלט הוא `1`. `new X` ו-`this` הם מצביעים, ו-`X()` הוא זמני שאי אפשר לקשור להפניה לא-const.\nהתשובה היא תשובה ד.',
    7: 'בביטוי `2 + x` האופרנד השמאלי הוא `int`, ולכן אופרטור חבר ב-`X` לא יכול לטפל בו (פונקציית חבר נקראת על האופרנד השמאלי). צריך פונקציה חיצונית `operator+(int, X)`.\nהתשובה היא תשובה ג.',
    8: 'כדי ש-`X x(5);` יתקמפל צריך בנאי שמקבל `int`. אופרטורי השמה לא רלוונטיים, כי זו הגדרה של אובייקט חדש.\nהתשובה היא תשובה א.',
    9: 'השורה `X x, y(x);` יוצרת את `y` כעותק של `x`, וזה מתבצע בבנאי ההעתקה שהקומפיילר מייצר אוטומטית. לכן הקוד מתקמפל כמו שהוא כתוב.\nהתשובה היא תשובה ד.',
    10: 'שדה `public` נגיש מכל מקום בתכנית, גם מ-`main`.\nהתשובה היא תשובה א.',
    11: 'במחלקה (`class`) ברירת המחדל היא `private`. שדה פרטי נגיש רק מתוך המחלקה עצמה (ומ-friend), ולא ממחלקות יורשות.\nהתשובה היא תשובה ב.',
    12: 'בפתיחת חלון דיאלוג ב-MFC נשלחת ההודעה `WM_INITDIALOG`, ולכן נקראת `OnInitDialog`, ומיד אחריה `WM_PAINT` כדי לצייר את החלון, ולכן נקראת `OnPaint`. `OnLButtonDown` נקראת רק כשהמשתמש לוחץ על כפתור העכבר השמאלי, ולא בעקבות פתיחת החלון. לכן הפונקציה שלא נקראת היא `OnLButtonDown` (תשובה ג). תשובה ד שגויה כי `OnInitDialog` ו-`OnPaint` כן נקראות.',
    13: 'הפונקציה `f` וירטואלית ב-`X`, ולכן הקריאה דרך מצביע `X*` לאובייקט מטיפוס `Y` מפעילה את `Y::f`.\nהפלט הוא `2` (תשובה ב).',
    14: 'האובייקט נוצר ב-`new Y`, ולכן הבנאים רצים בסדר `1` ואז `3`. אין `delete`, ולכן ההורסים לא רצים.\nהפלט הוא `13` (תשובה ב).',
    15: 'קריאה ל-`Invalidate` מסמנת את החלון כדורש ציור מחדש, ו-MFC קוראת בעקבות זה ל-`OnPaint`. התשובה היא ב, לפי המפתח הרשמי של שאלה זהה.',
    16: '`X` אבסטרקטית בגלל `= 0`, ולכן אי אפשר ליצור ממנה אובייקט. `Y` ממשת את `f`, ולכן אפשר ליצור ממנה אובייקט, וכך גם מ-`Z` שיורשת ממנה.\nהתשובה היא תשובה ב.',
    17: '`X` היא תבנית מחלקה, ולכן חייבים לציין את הארגומנט שלה: `X<int>`.\n- שורה 3: `X x;` בלי ארגומנט, שגיאה.\n- שורה 4: `X x(int);` בלי ארגומנט, שגיאה.\n- שורה 5: `X x<int>;` תחביר שגוי, שגיאה.\n- שורה 6: `X<int> x;` תקינה.\nהתשובה היא שורות 3, 4 ו-5 (תשובה ג).',
    18: 'אחרי שלוש ההוספות הווקטור הוא `0 1 2`. `insert(v.end(), 9)` מוסיף את 9 בסוף, ומתקבל `0 1 2 9`.\nהפלט הוא `0129` (תשובה ד).',
    19: 'רק שורה 3 שגויה: הפניה (`int &m;`) חייבת להיות מאותחלת. משתנה `int` ומצביע בלי אתחול מתקמפלים.\nהתשובה היא שורה 3 (תשובה ג).',
    20: 'לפי המפתח הרשמי של שאלה זהה, ציור קו ב-MFC דורש שתי פונקציות: `MoveTo` להזזת נקודת ההתחלה ו-`LineTo` לציור הקו. התשובה היא א.',
    21: 'כדי ש-`X &x = y;` יתקמפל, צריך שאפשר יהיה להמיר אובייקט `Y` להפניה ל-`X`. זה קורה כש-`Y` יורשת מ-`X` (המרה מנגזרת לבסיס). אם ל-`X` או ל-`Y` רק יש שדה מהטיפוס של השנייה, אין המרה כזו.\nהתשובה היא תשובה ב.',
    22: 'בביטוי `x + y` האופרנד השמאלי הוא `x` מטיפוס `X`, ולכן אופרטור `+` חבר ב-`X` שמקבל פרמטר `Y` מתאים. אופרטור חבר מקבל פרמטר אחד בלבד (השני הוא `this`), ואופרטור ב-`Y` מתאים לביטוי `y + x`.\nהתשובה היא תשובה א.',
    23: 'הביטוי `std::cin >> x` דורש `operator>>` שהאופרנד השמאלי שלה הוא `istream`, ולכן היא לא יכולה להיות חבר ב-`X`. צריך פונקציה חיצונית. כאן פונקציה חיצונית רגילה מספיקה, כי אין גישה לשדות פרטיים (פונקציה friend עובדת גם כן). התשובה ב נבחרה בהתאם למפתח של שאלה דומה במבחן אחר.',
    24: 'כאן `x` הוא משתנה גלובלי יחיד ולא שדה סטטי של התבנית, ולכן כל שלושת האובייקטים (גם מופעים שונים של התבנית) מגדילים אותו. מודפס `1`, `2`, `3`.\nהפלט הוא `123` (תשובה ד).',
    25: 'המתודה `g` אינה `const`, ולכן שורה 7 (`x = 1`) תקינה. שורה 8 (`y = 1`) משנה שדה `const`, שגיאה.\nהתשובה היא שורה 8 (תשובה ג).',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
SIG_NORUN = '\n\n_(הסבר שנכתב בעזרת AI; השאלה אינה ניתנת להרצה ולכן נשענת על המפתח הרשמי של שאלה זהה)_'
SIG_MFC = '\n\n_(הסבר שנכתב בעזרת AI; השאלה אינה ניתנת להרצה ולכן נשענת על עקרונות השפה)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + (SIG_NORUN if q["num"] in (15, 20) else SIG_MFC if q["num"] == 12 else SIG)

exam = {
    "examCode": "18A-C",
    "examLabel": "2018 סמסטר א מועד ג",
    "year": 2018,
    "examDate": "17.05.2018",
    "sourceFile": "2018/סמ׳ א מועד ג + פתרון.pdf",
    "keyFile": "none official in this file (student-marked scan); keys from clang++ runs, MFC items from the official keys of 18A-B",
    "contexts": {
        "notes": {
            "kind": "text",
            "title": "הוראות לנבחן",
            "text": "בכל אחת מהשאלות להלן עליך לסמן את התשובה הנכונה ביותר.",
        }
    },
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
