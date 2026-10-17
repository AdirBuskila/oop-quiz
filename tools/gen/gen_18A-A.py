# -*- coding: utf-8 -*-
"""Generator for tools/raw/18A-A.json -- oop (61307), 2018 semester A, moed A (printed date 06.02.2018).
Run: PYTHONUTF8=1 py tools/gen/gen_18A-A.py

Source: 11-page paper (25 MCQ, 4 options) with the correct option highlighted in yellow (official-looking key).
Page 7: Q19 is printed with the word "בוטלה" (cancelled) in red and option ד in red.
Code questions were compiled/run with clang++ (tools/verify/18A-A/verify.py reads the code straight out of this file's
questions). The exam was written for Visual Studio (`void main`); the harness rewrites it to `int main`.
Q13/Q14 (MFC classes) cannot be run; their key is the highlight only.
Held: Q19 (cancelled; no option matches the compile result)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "18A-A.json"
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

questions = []

questions.append(Q(
    1, "cpp_basics_refs", ERR_Q + numbered('''
int x = 5;
int *p;
int *q = &x;
int &r;
int &s = x;'''),
    txt("אף שורה", "שורה 3", "שורה 4", "שורות 2 ו-4"), "c",
    "Official key c (highlight). clang++ run (snippet wrapped in a function): the only error is line 4 (`int &r;` reference without initializer). Agrees."))

questions.append(Q(
    2, "cpp_basics_refs", OUT_Q + cb('''
#include <iostream>
void f(int x = 4, int y = 5) { std::cout << x << y; }
void main() { f(3); }'''),
    txt("התכנית לא עוברת קומפילציה", "`45`", "`35`", "`33`"), "c",
    "Official key c. clang++ run (`void main` rewritten to `int main`, which Visual Studio accepts): prints 35. Agrees."))

questions.append(Q(
    3, "construction_order", OUT_Q + cb('''
#include <iostream>
class X {
public:
    X(int n) : n(n) { }
    ~X() { std::cout << n; }
private:
    int n;
};
void main() {
    static X a(1);
    X b(2);
    X c(3);
}'''),
    txt("`123`", "`132`", "`231`", "`321`"), "d",
    "Official key d. clang++ run: prints 321 (c, then b at the end of main, then the static a at program exit). Agrees."))

questions.append(Q(
    4, "classes_ctor_dtor", "נתונה המחלקה\n" + numbered('''
class X {};
void main() {
    X a;
    X b();
    X c = X;
    X d = X();
}''') + "\nאילו שורות אינן יוצרות אובייקט מטיפוס `X` (עקב שגיאת קומפילציה או מסיבה אחרת)?\n",
    txt("שורות 3 ו-5", "שורות 4 ו-6", "שורות 4 ו-5", "שורות 5 ו-6"), "c",
    "Official key c. clang++ run: line 5 is a compile error; line 4 declares a function `b` (static_assert that decltype(b) is a function type passes), so no object; lines 3 and 6 create objects. Agrees."))

questions.append(Q(
    5, "friend_this_static", ERR_Q + numbered('''
class X {
    friend void f(X x);
public:
    int a;
private:
    int b;
};
void f(X x) {
    x.a = 1;
    x.b = 1;
}
void f(X x, int k) {
    x.a = 1;
    x.b = 1;
}'''),
    txt("אף שורה", "שורה 10", "שורה 14", "שורות 10 ו-14"), "c",
    "Official key c. clang++ run: only line 14 is an error (the overload `f(X, int)` is not a friend). Agrees."))

questions.append(Q(
    6, "const_references", "מה צריך להיות הטיפוס של המשתנה המקומי `x` בפונקציה `f` כדי שהמחלקה תעבור קומפילציה:\n" + cb('''
class X {
public:
    void f() const {
        ____ x = this;
    }
};'''),
    txt("`X`", "`X*`", "`const X *`", "`const X &`"), "c",
    "Official key c. clang++ run: of the four, only `const X *` compiles (in a const method `this` is `const X*`). Agrees."))

questions.append(Q(
    7, "const_references", "נתונה התכנית הבאה:\n" + numbered('''
void main() {
    int n = 5;
    ____ p = &n;
    p = &n;
    *p = 5;
}''') + "\nמה צריך להיות הטיפוס של המשתנה `p` כדי ששורה 5 תעבור קומפילציה אבל שורה 4 לא תעבור קומפילציה?\n",
    txt("`int*`", "`const int *`", "`int * const`", "`const int * const`"), "c",
    "Official key c. clang++ run: with `int * const` line 4 fails and line 5 compiles; `int*` compiles both, `const int *` fails only line 5, `const int * const` fails both. Agrees."))

questions.append(Q(
    8, "operator_overloading", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה:\n" + cb('''
X x;
x = 5;'''),
    txt("להגדיר בנאי (constructor) במחלקה `X`",
        "להגדיר פונקציה שאיננה בנאי המקבלת פרמטר אחד במחלקה `X`",
        "להגדיר פונקציה המקבלת פרמטר אחד מחוץ למחלקה `X`",
        "אף תשובה אינה נכונה"), "b",
    "Official key b. clang++ run: a member `operator=(int)` makes it compile; only a constructor `X(int)` is not enough (then `X x;` has no default constructor), and `operator=` cannot be a free function. "
    "Option b is loosely worded (it means the member assignment operator). Agrees."))

questions.append(Q(
    9, "operator_overloading", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה\n" + cb('''
X x;
x++;'''),
    txt("להגדיר אופרטור `++` שלא מקבל פרמטרים במחלקה `X`",
        "להגדיר אופרטור `++` שלא מקבל פרמטרים מחוץ למחלקה `X`",
        "להגדיר אופרטור `++` שמקבל פרמטר אחד במחלקה `X`",
        "להגדיר אופרטור `++` שמקבל פרמטר אחד מחוץ למחלקה `X`"), "c",
    "Official key c. clang++ run: the postfix `x++` compiles with member `operator++(int)` (one parameter). A member with no parameters is the prefix form and does not match `x++`. "
    "A free function with one parameter of type X only defines the prefix form. Agrees with the key."))

questions.append(Q(
    10, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `Y`:\n" + cb('''
class X {
public:
    int f;
};
class Y : protected X {};'''),
    txt("לשדה `f` אפשר לגשת מכל מקום בתכנית",
        "לשדה `f` אפשר לגשת רק מתוך המחלקות `X` ו-`Y`",
        "לשדה `f` אפשר לגשת רק מתוך המחלקה `X` אבל לא מתוך המחלקה `Y`",
        "לשדה `f` אפשר לגשת מהמחלקה `Y` ומכל מחלקה שיורשת מ-`Y`"), "d",
    "Official key d. clang++ run: with protected inheritance `f` is protected in `Y`, so `Y` and its derived classes reach it, `main` does not. Agrees."))

questions.append(Q(
    11, "construction_order", OUT_Q2 + cb('''
#include <iostream>
class X {
public:
    X() { std::cout << 1; }
    ~X() { std::cout << 2; }
};
class Y : public X {
public:
    Y() { std::cout << 3; }
    ~Y() { std::cout << 4; }
};
void main() {
    Y y;
}'''),
    txt("`34`", "`1342`", "`3124`", "אף תשובה אינה נכונה"), "b",
    "Official key b. clang++ run: prints 1342. Agrees."))

questions.append(Q(
    12, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `X`:\n" + cb('''
class X {
protected:
    int f;
};'''),
    txt("לשדה `f` אפשר לגשת מכל מקום בתכנית",
        "לשדה `f` אפשר לגשת רק מתוך המחלקה `X`",
        "לשדה `f` אפשר לגשת רק מתוך המחלקות שיורשות מהמחלקה `X` אבל לא מ-`X` עצמה",
        "לשדה `f` אפשר לגשת רק מתוך המחלקות שיורשות מהמחלקה `X` וגם מ-`X` עצמה"), "d",
    "Official key d. clang++ run: access from `X` and from a derived class compiles, access from `main` and from an unrelated class does not. Agrees."))

questions.append(Q(
    13, "stl_exceptions", "למה משמשת המחלקה `CArchive` של MFC?\n",
    txt("לציור על המסך", "לשמירה לקובץ", "לטעינה מקובץ", "תשובות ב’ וג’ נכונות"), "d",
    "Official key d (highlight). MFC concept question, no code to run; not verified by compile (MFC is not available here).",
    confidence="med"))

questions.append(Q(
    14, "stl_exceptions", "למה משמשת המחלקה `CFile` של MFC?\n",
    txt("לציור על המסך", "לשמירה לקובץ", "לטעינה מקובץ", "תשובות ב’ וג’ נכונות"), "d",
    "Official key d (highlight). MFC concept question, no code to run; not verified by compile (MFC is not available here).",
    confidence="med"))

questions.append(Q(
    15, "virtual_polymorphism", OUT_Q2 + cb('''
#include <iostream>
class X {
public:
    virtual void f() { std:: cout << 1; }
};
class Y : public X {
public:
    void f() { std::cout << 2; }
};
void main() {
    Y y;
    X *p = &y;
    p->f();
}'''),
    txt("`1`", "`2`", "`12`", "`21`"), "b",
    "Official key b. clang++ run: prints 2 (dynamic dispatch). Agrees."))

questions.append(Q(
    16, "virtual_polymorphism", OUT_Q2 + cb('''
#include <iostream>
class X {
public:
    X() { std::cout << 1; }
    ~X() { std::cout << 2; }
};
class Y : public X {
public:
    Y() { std::cout << 3; }
    ~Y() { std::cout << 4; }
};
void main() {
    X *x = new Y;
    delete x;
}'''),
    txt("`32`", "`13`", "`132`", "`1342`"), "c",
    "Official key c. clang++ run: prints 132 (the destructor of X is not virtual, so only ~X runs; formally undefined behaviour, but this is what the run prints). Agrees."))

questions.append(Q(
    17, "inheritance_access", "מה צריך להופיע במקום הריק בשורה 8 כדי שהתכנית הבאה תדפיס 12:\n" + numbered('''
#include <iostream>
class X {
public:
    void f() { std::cout << 1; }
};
class Y : public X {
public:
    void f() { ______; std::cout << 2; }
};
void main() {
    Y y;
    y.f();
}'''),
    txt("`this()`", "`X::f()`", "`this->f()`", "`x.f()`"), "b",
    "Official key b. clang++ run: with `X::f()` it prints 12; `this()` and `x.f()` do not compile and `this->f()` recurses forever. Agrees."))

questions.append(Q(
    18, "stl_exceptions", OUT_Q2 + cb('''
#include <vector>
#include <iostream>
void main() {
    std::vector<int> v;
    v.push_back(0);
    v.push_back(1);
    v.push_back(2);
    v.erase(v.begin());
    std::cout << v[1];
}'''),
    txt("התכנית לא עוברת קומפילציה", "התכנית מחוללת שגיאת זמן ריצה", "התכנית מדפיסה `1`", "התכנית מדפיסה `2`"), "d",
    "Official key d. clang++ run: prints 2. Agrees."))

questions.append(Q(
    19, "const_references", "אילו שורות בקטע הקוד הבא לא עוברות קומפילציה?\n" + numbered('''
class X {
public:
    X() : x(1), y(1) {}
    int x;
    const int y;
    void f() {
        x = 1;
        y = 1;
    }
    void g() const {
        x = 1;
        y = 1;
    }
};'''),
    txt("שורה 7", "שורות 7 ו-10", "שורות 7 ו-11", "שורות 7, 10 ו-11"), None,
    "Held. The paper prints the word בוטלה (cancelled) next to the question number, in red, and option ד in red. clang++ run: the errors are on lines 8, 11 and 12, "
    "so no option is correct.",
    hold="Cancelled on the paper (בוטלה). clang++ reports errors on lines 8, 11 and 12; no option lists that set.",
    confidence="low"))
del questions[-1]["answerSource"]

questions.append(Q(
    20, "const_references", "הסרה של איזה שדה מתוך המחלקה הבאה תגרום לתכנית לעבור קומפילציה?\n" + cb('''
class X {
    int a;
    int *b;
    int &c;
};
void main() {
    X x;
}'''),
    txt("קטע הקוד עובר קומפילציה כמו שהוא כתוב", "`int a`", "`int *b`", "`int &c`"), "d",
    "Official key d. clang++ run: removing `int &c` makes it compile; the reference member has no initializer, so the default constructor is deleted. Removing a or b does not help. Agrees."))

questions.append(Q(
    21, "stl_exceptions", OUT_Q2 + cb('''
#include <vector>
#include <iostream>
void main() {
    std::vector<int> v;
    v.push_back(0);
    v.insert(v.begin(), 1);
    std::cout << v[1];
}'''),
    txt("התכנית לא עוברת קומפילציה", "התכנית מחוללת שגיאת זמן ריצה", "התכנית מדפיסה `0`", "התכנית מדפיסה `1`"), "c",
    "Official key c. clang++ run: prints 0 (v becomes 1, 0). Agrees."))

questions.append(Q(
    22, "operator_overloading", "מה צריך להיות הטיפוס שמחזירה הפונקציה בשורה 3 כדי שהתכנית הבאה תעבור קומפילציה?\n" + numbered('''
#include <iostream>
class X {};
_____ operator<<(std::ostream &os, X x) {...}
void main() {
    X x;
    std::cout << x << x;
}'''),
    txt("`int`", "`void`", "`X`", "`std::ostream&`"), "d",
    "Official key d. clang++ run (body `{...}` replaced by a matching return statement for each option): only `std::ostream&` compiles, because the result of the first `<<` is the left operand of the second. Agrees."))

questions.append(Q(
    23, "templates", OUT_Q + cb('''
#include <iostream>
template<typename T> int f() {
    static int x = 0;
    ++x;
    return x;
}
int main() {
    int a = f<int>();
    int b = f<int>();
    double c = f<double>();
    std::cout << a << b << c;
}'''),
    txt("`000`", "`111`", "`121`", "`123`"), "c",
    "Official key c. clang++ run: prints 121 (each instantiation has its own static x). Agrees."))

questions.append(Q(
    24, "const_references", ERR_CLS + numbered('''
class X {
public:
    int x;
    const int y;
    X() : x(1), y(1) {}
    void g() const {
        x = 1;
        y = 1;
    }
};'''),
    txt("אף שורה", "שורה 7", "שורה 8", "שורות 7 ו-8"), "d",
    "Official key d. clang++ run: errors on lines 7 and 8. Agrees."))

questions.append(Q(
    25, "const_references", ERR_CLS + numbered('''
class X {
public:
    int x;
    int *p;
    X() : x(1), p(&x) {}
    void g() const {
        p = &x;
        *p = 1;
    }
};'''),
    txt("אף שורה", "שורה 7", "שורה 8", "שורות 7 ו-8"), "b",
    "Official key b. clang++ run: only line 7 fails (p becomes `int* const`; `*p = 1` writes through the pointer and is legal). Agrees."))

EXPL = {
    1: 'רק שורה 4 גורמת לשגיאה: `int &r;` מצהירה על הפניה בלי אתחול, וזה אסור. שורה 2 (מצביע לא מאותחל) ושורה 5 (הפניה מאותחלת ב-`x`) תקינות.\nלכן התשובה היא שורה 4 (תשובה ג).',
    2: 'בקריאה `f(3)` הפרמטר `x` מקבל 3 והפרמטר `y` לוקח את ערך ברירת המחדל 5, ולכן מודפס `35` (תשובה ג). התשובה `45` מניחה שערך ברירת המחדל של `x` נשאר בתוקף.',
    3: 'המשתנים המקומיים נהרסים בסדר הפוך לסדר היצירה: קודם `c` (3) ואז `b` (2). המשתנה הסטטי `a` נהרס רק בסיום התכנית, אחרון (1).\nהפלט הוא `321` (תשובה ד).',
    4: '- שורה 3: `X a;` יוצרת אובייקט.\n- שורה 4: `X b();` היא הצהרה על פונקציה בשם `b` שמחזירה `X`, ולא אובייקט.\n- שורה 5: `X c = X;` שגיאת קומפילציה, כי `X` הוא שם של טיפוס ולא ביטוי.\n- שורה 6: `X d = X();` יוצרת אובייקט.\nהשורות שלא יוצרות אובייקט הן 4 ו-5 (תשובה ג).',
    5: '`f(X x)` מוצהרת כ-friend ולכן מותרת בה גישה לשדה הפרטי `b` (שורה 10 תקינה). ההעמסה `f(X x, int k)` היא פונקציה אחרת שאינה friend, ולכן הגישה ל-`b` בשורה 14 גורמת לשגיאה.\nהתשובה היא שורה 14 (תשובה ג).',
    6: 'בתוך מתודה שהיא `const` הטיפוס של `this` הוא `const X *`. רק הטיפוס הזה מתקבל בהצבה `x = this`. הטיפוסים `X` ו-`X*` מורידים את ה-const, והפניה `const X &` לא יכולה להיקשר למצביע.\nהתשובה היא `const X *` (תשובה ג).',
    7: 'רוצים שהשמה ל-`p` (שורה 4) תיכשל אבל השמה ל-`*p` (שורה 5) תצליח: המצביע עצמו קבוע, והערך שאליו הוא מצביע ניתן לשינוי. זה בדיוק `int * const`.\n- `int*`: שתי השורות תקינות.\n- `const int *`: שורה 5 נכשלת.\n- `const int * const`: שתי השורות נכשלות.\nהתשובה היא תשובה ג.',
    8: 'כדי ש-`x = 5` תתקמפל צריך אופרטור השמה שמקבל `int`, כלומר פונקציית חבר שאינה בנאי ומקבלת פרמטר אחד (תשובה ב). בנאי `X(int)` לבדו לא מספיק, כי אז גם נעלם בנאי ברירת המחדל ו-`X x;` נכשל. את `operator=` אי אפשר להגדיר מחוץ למחלקה.',
    9: 'הביטוי `x++` (פוסטפיקס) מתקמפל כשמוגדר אופרטור `++` כפונקציית חבר עם פרמטר `int` אחד, שמשמש רק להבחנה (תשובה ג). אופרטור חבר בלי פרמטרים הוא הפרפיקס `++x`. פונקציה חיצונית עם פרמטר אחד (`X&`) היא גם פרפיקס, ופוסטפיקס חיצוני דורש שני פרמטרים.',
    10: 'בירושה `protected` השדה הציבורי `f` נעשה מוגן ב-`Y`. לכן `Y` וכל מחלקה שיורשת ממנה יכולות לגשת אליו, ואילו קוד חיצוני כמו `main` לא יכול.\nהתשובה היא תשובה ד. תשובה א שגויה כי השדה כבר לא ציבורי דרך `Y`.',
    11: 'בבנייה הבסיס נבנה לפני הנגזרת: `1` ואז `3`. בהריסה הסדר הפוך: קודם ההורס של `Y` (`4`) ואז של `X` (`2`).\nהפלט הוא `1342` (תשובה ב).',
    12: 'שדה `protected` נגיש מתוך המחלקה עצמה ומתוך מחלקות שיורשות ממנה, אבל לא מקוד חיצוני. לכן תשובה ד נכונה. תשובה ג שגויה כי גם `X` עצמה יכולה לגשת לשדה.',
    13: '`CArchive` ב-MFC משמשת לסידור (serialization): גם לכתיבה לקובץ וגם לקריאה ממנו. לכן תשובות ב’ וג’ נכונות (תשובה ד), לפי המפתח הרשמי.',
    14: '`CFile` ב-MFC היא מחלקה לגישה לקבצים, ומשמשת גם לכתיבה לקובץ וגם לקריאה ממנו. לכן תשובות ב’ וג’ נכונות (תשובה ד), לפי המפתח הרשמי.',
    15: '`f` וירטואלית, ולכן הקריאה דרך מצביע `X*` לאובייקט מטיפוס `Y` מפעילה את הגרסה של `Y`. הפלט הוא `2` (תשובה ב).',
    16: 'ההורס של `X` אינו וירטואלי, ולכן `delete x` דרך מצביע `X*` מפעיל רק את `~X`. הבנאים רצו לפי הסדר `1` ואז `3`, וההורס מדפיס `2`: הפלט `132` (תשובה ג). מבחינה פורמלית זו התנהגות לא מוגדרת, אך זה מה שהקוד מדפיס. ההורס `~Y` לא רץ, ולכן `1342` שגויה.',
    17: 'כדי לקרוא לגרסה של המחלקה הבסיסית צריך לציין אותה במפורש: `X::f()`. הפלט הוא `12` (תשובה ב).\n- `this()` ו-`x.f()` לא מתקמפלות.\n- `this->f()` קוראת שוב ל-`Y::f` ונכנסת לרקורסיה אינסופית.',
    18: 'אחרי שלוש ההוספות הווקטור הוא `0 1 2`. `erase(v.begin())` מוחק את האיבר הראשון, ונשאר `1 2`. לכן `v[1]` הוא `2` (תשובה ד).',
    20: 'לשדה מסוג הפניה (`int &c`) אין ערך התחלתי, ולכן בנאי ברירת המחדל שהקומפיילר היה יוצר נמחק והשורה `X x;` נכשלת. הסרת `int &c` פותרת את הבעיה (תשובה ד). הסרת `a` או `b` לא עוזרת, כי ההפניה נשארת.',
    21: 'אחרי `push_back(0)` הווקטור הוא `0`. `insert(v.begin(), 1)` מוסיף `1` בתחילתו, והווקטור הוא `1 0`. לכן `v[1]` הוא `0` (תשובה ג).',
    22: 'בביטוי `std::cout << x << x` התוצאה של ההדפסה הראשונה היא האופרנד השמאלי של השנייה, ולכן האופרטור חייב להחזיר `std::ostream&`. בכל טיפוס אחר (`int`, `void`, `X`) ההדפסה השנייה לא מתקמפלת. התשובה היא ד.',
    23: 'לכל מופע של התבנית (`int`, `double`) יש משתנה סטטי `x` משלו. שתי הקריאות ל-`f<int>` מחזירות 1 ואז 2, והקריאה היחידה ל-`f<double>` מחזירה 1.\nהפלט הוא `121` (תשובה ג).',
    24: 'במתודה `const` אי אפשר לשנות שדות. שורה 7 משנה את `x`, ושורה 8 משנה את `y` (שהוא גם `const`), ושתיהן שגיאות.\nהתשובה היא שורות 7 ו-8 (תשובה ד).',
    25: 'במתודה `const` המצביע `p` הופך ל-`int * const`: אי אפשר לשנות אותו, ולכן שורה 7 (`p = &x`) שגויה. שורה 8 (`*p = 1`) כותבת לערך שהמצביע מצביע עליו, והוא אינו `const`, ולכן תקינה.\nהתשובה היא שורה 7 (תשובה ב).',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
SIG_NORUN = '\n\n_(הסבר שנכתב בעזרת AI; השאלה אינה ניתנת להרצה ולכן נשענת על המפתח הרשמי)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + (SIG_NORUN if q["num"] in (13, 14) else SIG)

exam = {
    "examCode": "18A-A",
    "examLabel": "2018 סמסטר א מועד א",
    "year": 2018,
    "examDate": "06.02.2018",
    "sourceFile": "2018/סמ׳ א מועד א + פתרון.pdf",
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
