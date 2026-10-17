# -*- coding: utf-8 -*-
"""Generator for tools/raw/18A-B.json -- oop (61307), 2018 semester A, moed B (printed date 13.03.2018).
Run: PYTHONUTF8=1 py tools/gen/gen_18A-B.py

Source: 11-page paper (25 MCQ, 4 options) with the correct option highlighted in yellow (official-looking key).
Code questions were compiled/run with clang++ (tools/verify/18A-B/verify.py reads the code straight out of this file's
questions). The exam targets Visual Studio (`void main`); the harness rewrites it to `int main`.
Q12, Q15, Q20 (MFC) cannot be run; their key is the highlight only."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "18A-B.json"
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
         "answerSource": "highlighted-pdf", "official": True, "confidence": "high",
         "explanation": "", "note": note, "contextId": "notes"}
    if correct:
        q["correctId"] = correct
    q.update(kw)
    return q


OUT_Q = "מה מדפיסה התכנית?\n"
OUT_Q2 = "מה מדפיסה התכנית הבאה:\n"
ERR_Q = "אילו שורות גורמות לשגיאת קומפילציה בקטע הקוד הבא:\n"
ERR_CLS = "אילו שורות במחלקה הבאה גורמות לשגיאת קומפילציה?\n"
MFC = "Official key {} (highlight). MFC concept question, no code to run; not verified by compile (MFC is not available here)."
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
    "Official key c. clang++ run: only `int&` compiles (`f() = 5` needs an lvalue); `int` and `int*` are rejected, `T` is undeclared. Agrees."))

questions.append(Q(
    2, "cpp_basics_refs", OUT_Q + cb('''
#include <iostream>
class X {
public:
    int f;
};
void g(X x) { x.f = 5; }
void main() {
    X x;
    x.f = 3;
    g(x);
    std::cout << x.f;
}'''),
    txt("התכנית לא עוברת קומפילציה", "`3`", "`5`", "אף תשובה אינה נכונה"), "b",
    "Official key b. clang++ run: prints 3 (`g` gets a copy). Agrees."))

questions.append(Q(
    3, "construction_order", OUT_Q + cb('''
#include <iostream>
class X {
public: X(int n) { std::cout << n; }
};
X a(1);
void main() {
    X a(2);
    X b(3);
}'''),
    txt("`123`", "`23`", "`231`", "`321`"), "a",
    "Official key a. clang++ run: prints 123 (the global is constructed before main, then the locals in order). Agrees."))

questions.append(Q(
    4, "const_references", ERR_Q.replace("בקטע הקוד הבא", "במחלקה הבאה") + numbered('''
class X {
public:
    X() : x(1) {}
    X(int a) { x = 1; }
    X(int a, int b) { }
    const int x;
};'''),
    txt("שורה 3", "שורה 4", "שורה 5", "שורות 4 ו-5"), "d",
    "Official key d. clang++ run: errors on lines 4 (assignment to a const member in the body) and 5 (const member not initialized); line 3 is fine. Agrees."))

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
    "Official key b. clang++ run: only line 4 is an error (`Y` is not a complete type there, and X is not a friend of Y); line 8 is fine because Y is X's friend. Agrees."))

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
    "Official key d. clang++ run: only `*this` compiles and prints 1; `new X` and `this` are pointers, `X()` is a temporary that cannot bind to `X&`. Agrees."))

questions.append(Q(
    7, "operator_overloading", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה:\n" + cb('''
X x;
2 << x;'''),
    txt("להגדיר במחלקה `X` אופרטור `<<` שמקבל פרמטר מטיפוס `int`",
        "להגדיר במחלקה `X` אופרטור `<<` שמקבל שני פרמטרים: מטיפוס `int` ומטיפוס `X`",
        "להגדיר מחוץ למחלקה `X` אופרטור `<<` שמקבל פרמטר מטיפוס `int` ופרמטר מטיפוס `X`",
        "תשובות (א) ו-(ג) נכונות"), "c",
    "Official key c. clang++ run: a free `operator<<(int, X)` compiles; a member `operator<<(int)` makes `x << 2` work, not `2 << x`; a member with two parameters is invalid. Agrees.",
    lockOrder=True))

questions.append(Q(
    8, "operator_conversions", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה:\n" + cb("X x = 5;"),
    txt("להגדיר בנאי (constructor) במחלקה `X`",
        "להגדיר אופרטור השמה (`=`) במחלקה `X`",
        "להגדיר אופרטור השמה (`=`) מחוץ למחלקה `X`",
        "אף תשובה אינה נכונה"), "a",
    "Official key a. clang++ run: `X x = 5;` compiles with a converting constructor `X(int)`; an `operator=` (member or free) does not help, it is initialization, not assignment. Agrees."))

questions.append(Q(
    9, "operator_overloading", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה\n" + cb('''
X x;
x(5);'''),
    txt("להגדיר בנאי (constructor) שמקבל פרמטר אחד",
        "להגדיר אופרטור `()` שמקבל פרמטר אחד",
        "להגדיר פונקציה מחוץ למחלקה `X` שמקבלת פרמטר אחד",
        "לא ניתן לעשות דבר כדי שקטע הקוד יעבור קומפילציה"), "b",
    "Official key b. clang++ run: a member `operator()(int)` makes `x(5)` compile; a constructor or a free function does not. Agrees."))

questions.append(Q(
    10, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `X`:\n" + cb('''
class X {
public:
    int f;
};'''),
    txt(*FIELD_OPTS), "a",
    "Official key a. clang++ run: a public field is reachable from `main`. Agrees."))

questions.append(Q(
    11, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `X`:\n" + cb('''
class X {
private:
    int f;
};'''),
    txt(*FIELD_OPTS), "b",
    "Official key b. clang++ run: access from `X` compiles; from `main` or a derived class it does not. Agrees."))

questions.append(Q(
    12, "stl_exceptions", "למה משמשת המחלקה `CPaintDC` של MFC?\n",
    txt("לציור על המסך", "לשמירה לקובץ", "לטעינה מקובץ", "תשובות ב’ וג’ נכונות"), "a",
    MFC.format("a"), confidence="med"))

questions.append(Q(
    13, "virtual_polymorphism", OUT_Q2 + cb('''
#include <iostream>
class X {
public:
    void f() { std:: cout << 1; }
};
class Y : public X {
public:
    virtual void f() { std::cout << 2; }
};
void main() {
    Y y;
    X *p = &y;
    p->f();
}'''),
    txt("`1`", "`2`", "`12`", "`21`"), "a",
    "Official key a. clang++ run: prints 1 (`f` is not virtual in X, so the call is bound statically to X::f). Agrees."))

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
    "Official key b. clang++ run: prints 13 (no delete, so no destructor runs). Agrees."))

questions.append(Q(
    15, "stl_exceptions", "ב-MFC איזו פונקציה נקראת בעקבות קריאה לפונקציה `Invalidate`?\n",
    txt("`OnInitDialog`", "`OnPaint`", "`OnLButtonDown`", "`OnMouseMove`"), "b",
    MFC.format("b"), confidence="med"))

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
    "Official key b. clang++ run: `X x;` fails (abstract), `Y y;` and `Z z;` compile. Agrees."))

questions.append(Q(
    17, "templates", "אילו שורות בתכנית הבאה לא עוברות קומפילציה\n" + numbered('''
template<typename T> void f(T t) {}
void main() {
    f(4);
    f(int);
    f<int>();
    f<int>(4);
}'''),
    txt("שורה 4", "שורות 4 ו-5", "שורות 3, 4 ו-5", "שורות 3 ו-4"), "b",
    "Official key b. clang++ run: errors on lines 4 (`f(int)` passes a type) and 5 (`f<int>()` has no argument); lines 3 and 6 compile. Agrees."))

questions.append(Q(
    18, "stl_exceptions", OUT_Q2 + cb('''
#include <vector>
#include <iostream>
void main() {
    std::vector<int> v;
    v.push_back(0);
    v.push_back(1);
    v.push_back(2);
    v.insert(v.begin() + 1, 9);
    for (int i = 0; i < v.size(); ++i) std::cout << v[i];
}'''),
    txt("`9012`", "`0912`", "`0192`", "`0129`"), "b",
    "Official key b. clang++ run: prints 0912. Agrees."))

questions.append(Q(
    19, "cpp_basics_refs", "איזו שורה בתכנית הבאה לא עוברת קומפילציה:\n" + numbered('''
void main() {
    int n;
    int &m;
    int *k;
}'''),
    txt("כל השורות עוברות קומפילציה", "שורה 2", "שורה 3", "שורה 4"), "c",
    "Official key c. clang++ run: only line 3 (`int &m;`, reference without initializer) is an error. Agrees."))

questions.append(Q(
    20, "stl_exceptions", "ציור של איזו צורה באמצעות MFC דורש קריאה לשתי פונקציות?\n",
    txt("קו", "מלבן", "אליפסה", "אף תשובה אינה נכונה"), "a",
    MFC.format("a"), confidence="med"))

questions.append(Q(
    21, "stl_exceptions", OUT_Q2 + cb('''
#include <iostream>
#include <vector>
void main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(4);
    std::vector<int>::iterator it = v.begin();
    int n = *(it++);
    std::cout << n;
}'''),
    txt("`1`", "`2`", "`4`", "`5`"), "a",
    "Official key a. clang++ run: prints 1 (post-increment returns the old iterator). Agrees."))

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
    "Official key a. clang++ run: member `X::operator+(Y)` compiles; `Y::operator+(X)` is the wrong direction and a member operator+ with two parameters is invalid. Agrees."))

questions.append(Q(
    23, "operator_overloading", "מה צריך לעשות כדי שהתכנית הבאה תעבור קומפילציה?\n" + cb('''
#include <iostream>
class X{};
void main() {
    X x;
    std::cout << x;
}'''),
    txt("להגדיר פונקציה חדשה במחלקה `X`",
        "להגדיר פונקציה חדשה מחוץ למחלקה שאיננה חברה של המחלקה `X`",
        "להגדיר פונקציה חדשה מחוץ למחלקה שהיא חברה של המחלקה `X`",
        "אף תשובה אינה נכונה"), "b",
    "Official key b. clang++ run: a free `operator<<(ostream&, const X&)` compiles, with or without friend (so option c also works for this program; the key marks only b and the instructions ask for the best answer). "
    "A member function cannot do it (it would need `x << cout`).",
    confidence="med"))

questions.append(Q(
    24, "templates", OUT_Q + cb('''
#include <iostream>
template<typename T> class X {
public:
    static int x;
    X() { std::cout << ++x; }
};
template<typename T> int X<T>::x = 0;
void main() {
    X<int> a;
    X<int> b;
    X<double> c;
}'''),
    txt("`000`", "`111`", "`121`", "`123`"), "c",
    "Official key c. clang++ run: prints 121 (each instantiation has its own static). Agrees."))

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
    "Official key c. clang++ run: only line 8 fails (`y` is const; `g` is not a const method so `x = 1` is fine). Agrees."))

EXPL = {
    1: 'ההשמה `f() = 5` דורשת שהקריאה תחזיר ערך שמאלי (lvalue). רק הפניה (`int&`) מקיימת זאת, והיא מצביעה על המשתנה הסטטי `x`. החזרה לפי ערך (`int`) מחזירה זמני שאי אפשר להשים אליו, ב-`int*` ה-`return x` לא מתקמפל, ו-`T` אינו מוגדר.\nהתשובה היא `int&` (תשובה ג).',
    2: '`g` מקבלת את `x` לפי ערך, כלומר עותק, ולכן השינוי ל-5 נעשה על העותק בלבד. ב-`main` נשאר `x.f` = 3.\nהפלט הוא `3` (תשובה ב).',
    3: 'המשתנה הגלובלי `a(1)` נבנה לפני תחילת `main` ומדפיס `1`. אחר כך נבנים המקומיים בסדר ההצהרה: `a(2)` ואז `b(3)`. הבנאי מדפיס, וההורס לא מדפיס כלום.\nהפלט הוא `123` (תשובה א).',
    4: '- שורה 3: `X() : x(1) {}` תקינה, כי השדה ה-`const` מאותחל ברשימת האתחול.\n- שורה 4: `x = 1` בגוף הבנאי היא השמה לשדה `const`, שגיאה.\n- שורה 5: הבנאי לא מאתחל את `x`, ולשדה `const` חייב להיות אתחול, שגיאה.\nהתשובה היא שורות 4 ו-5 (תשובה ד).',
    5: 'בשורה 4 השם `Y` עדיין לא מוכר (המחלקה `Y` מוגדרת רק אחרי `X`), ולכן `void f(Y y)` לא מתקמפל. שורה 8 תקינה: `Y` היא friend של `X`, ולכן יש לה גישה ל-`x.a`.\nהתשובה היא שורה 4 (תשובה ב).',
    6: 'הפונקציה מחזירה `X&`, ולכן צריך להחזיר את האובייקט עצמו ולא מצביע אליו: `*this`. התנאי `&x == &x.f()` נכון והפלט הוא `1`.\n`new X` ו-`this` הם מצביעים, ו-`X()` הוא זמני שאי אפשר לקשור להפניה לא-const.',
    7: 'בביטוי `2 << x` האופרנד השמאלי הוא `int`, ולכן אופרטור חבר במחלקה `X` לא יכול לטפל בו (פונקציית חבר נקראת על האופרנד השמאלי). צריך פונקציה חיצונית `operator<<(int, X)`.\nהתשובה היא ג. תשובה ד שגויה כי א אינה נכונה.',
    8: 'השורה `X x = 5;` היא אתחול ולא השמה, ולכן אופרטור `=` לא רלוונטי. כדי שהיא תתקמפל צריך בנאי המרה `X(int)`.\nהתשובה היא תשובה א.',
    9: 'הביטוי `x(5)` קורא לאובייקט `x` כמו לפונקציה, ולכן צריך להגדיר במחלקה אופרטור קריאה `operator()` שמקבל פרמטר אחד.\nהתשובה היא תשובה ב. בנאי לא עוזר כי `x` כבר נוצר, ופונקציה חיצונית אינה מאפשרת את התחביר `x(5)`.',
    10: 'שדה `public` נגיש מכל מקום בתכנית, גם מ-`main`.\nהתשובה היא תשובה א.',
    11: 'שדה `private` נגיש רק מתוך המחלקה עצמה (ומ-friend), ולא ממחלקות יורשות.\nהתשובה היא תשובה ב.',
    12: '`CPaintDC` ב-MFC היא הקשר התקן (device context) שמשמש לציור על המסך בתוך הטיפול ב-`OnPaint`. התשובה היא א, לפי המפתח הרשמי.',
    13: 'הפונקציה `f` ב-`X` אינה וירטואלית (ה-`virtual` מופיע רק ב-`Y`). לכן הקריאה דרך מצביע `X*` נקשרת בזמן הקומפילציה ל-`X::f`.\nהפלט הוא `1` (תשובה א).',
    14: 'האובייקט נוצר ב-`new Y`, ולכן הבנאים רצים בסדר `1` ואז `3`. אין `delete`, ולכן ההורסים לא רצים בכלל.\nהפלט הוא `13` (תשובה ב).',
    15: 'קריאה ל-`Invalidate` מסמנת את החלון כדורש ציור מחדש, ו-MFC קוראת בעקבות זה ל-`OnPaint`. התשובה היא ב, לפי המפתח הרשמי.',
    16: '`X` אבסטרקטית בגלל `= 0`, ולכן אי אפשר ליצור ממנה אובייקט. `Y` ממשת את `f`, ולכן אפשר ליצור ממנה אובייקט, וכך גם מ-`Z` שיורשת ממנה.\nהתשובה היא תשובה ב.',
    17: '- שורה 3: `f(4)` תקינה, `T` מוסק כ-`int`.\n- שורה 4: `f(int)` מעבירה טיפוס במקום ערך, שגיאה.\n- שורה 5: `f<int>()` חסר ארגומנט, שגיאה.\n- שורה 6: `f<int>(4)` תקינה.\nהתשובה היא שורות 4 ו-5 (תשובה ב).',
    18: 'אחרי שלוש ההוספות הווקטור הוא `0 1 2`. `insert(v.begin() + 1, 9)` מוסיף 9 לפני האיבר באינדקס 1, ומתקבל `0 9 1 2`.\nהפלט הוא `0912` (תשובה ב).',
    19: 'רק שורה 3 שגויה: הפניה (`int &m;`) חייבת להיות מאותחלת. משתנה `int` ומצביע בלי אתחול מתקמפלים.\nהתשובה היא שורה 3 (תשובה ג).',
    20: 'לפי המפתח הרשמי, ציור קו ב-MFC דורש שתי פונקציות: `MoveTo` להזזת נקודת ההתחלה ו-`LineTo` לציור הקו. מלבן ואליפסה מצוירים בפונקציה אחת. התשובה היא א.',
    21: 'האופרטור `it++` מחזיר את הערך הישן של האיטרטור, ולכן `*(it++)` הוא האיבר הראשון, `1`, ורק אחר כך האיטרטור מתקדם.\nהפלט הוא `1` (תשובה א).',
    22: 'בביטוי `x + y` האופרנד השמאלי הוא `x` מטיפוס `X`, ולכן אופרטור `+` חבר ב-`X` שמקבל פרמטר `Y` מתאים. אופרטור חבר מקבל רק פרמטר אחד (הנוסף הוא `this`), ולכן אפשרויות עם שני פרמטרים שגויות, ואופרטור ב-`Y` מתאים לביטוי `y + x`.\nהתשובה היא תשובה א.',
    23: 'ההדפסה `std::cout << x` דורשת פונקציה `operator<<` שהאופרנד השמאלי שלה הוא `ostream`, ולכן היא לא יכולה להיות חבר ב-`X`. צריך פונקציה חיצונית. בתכנית הזו פונקציה חיצונית רגילה מספיקה, כי אין גישה לשדות פרטיים (פונקציה friend עובדת גם כן).\nהתשובה לפי המפתח היא ב.',
    24: 'שדה סטטי בתבנית משותף לכל האובייקטים של אותו מופע של התבנית. `X<int>` מדפיסה `1` ו-`2`, ו-`X<double>` היא מופע נפרד עם ספירה משלו ומדפיסה `1`.\nהפלט הוא `121` (תשובה ג).',
    25: 'המתודה `g` אינה `const`, ולכן שורה 7 (`x = 1`) תקינה. שורה 8 (`y = 1`) משנה שדה `const`, שגיאה.\nהתשובה היא שורה 8 (תשובה ג).',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
SIG_NORUN = '\n\n_(הסבר שנכתב בעזרת AI; השאלה אינה ניתנת להרצה ולכן נשענת על המפתח הרשמי)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + (SIG_NORUN if q["num"] in (12, 15, 20) else SIG)

exam = {
    "examCode": "18A-B",
    "examLabel": "2018 סמסטר א מועד ב",
    "year": 2018,
    "examDate": "13.03.2018",
    "sourceFile": "2018/סמ׳ א מועד ב + פתרון.pdf",
    "keyFile": "same file (correct option highlighted in yellow on the paper)",
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
