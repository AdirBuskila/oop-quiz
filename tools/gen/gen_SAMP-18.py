# -*- coding: utf-8 -*-
"""Generator for tools/raw/SAMP-18.json -- oop (61307), 2018 semester A sample exam (מבחן לדוגמא, no date printed).
Run: PYTHONUTF8=1 py tools/gen/gen_SAMP-18.py

Source: 11-page paper (pages 8-11 are blank scratch pages) with 20 MCQ, 4 options. NO answer source exists, so every key
was derived with clang++ (tools/verify/SAMP-18/check.py, std c++11/14/17/20 sweeps where relevant) and is stored as
answerSource "solved", official:false. `void main` is MSVC style; the harness rewrites it to `int main`.
Q3 and Q9 are the same printed question (Q9 is numbered from line 3); both are kept.
Keys that agree with the official highlighted key of the same question in 19A-C: Q3 (a), Q6 (b), Q12 (b), Q20 (c).
Held (5): Q4 (answer is the undefined behaviour itself), Q8 and Q17 (the printed code compiles with no option),
Q11 (compile result {A,B,C} matches no option; class definitions are also printed without the closing semicolon),
Q13 (private inheritance: f is reachable only inside Y, no option says that)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "SAMP-18.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def numbered(code, tag="cpp", start=1):
    lines = code.strip("\n").split("\n")
    w = 2 if len(lines) + start - 1 >= 10 else 1
    return cb("\n".join(f"{i:>{w}}. {t}" for i, t in enumerate(lines, start)), tag)


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


NOKEY = "No key in the source (sample exam); "


def Q(num, topic, question, options, correct, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "answerSource": "solved", "official": False, "confidence": "high", "explanation": "", "note": note,
         "contextId": "notes"}
    if correct:
        q["correctId"] = correct
    q.update(kw)
    return q


def held(num, topic, question, options, reason, note):
    return {"num": num, "topic": topic, "question": question, "options": options, "hold": reason, "note": note,
            "contextId": "notes"}


ERRF = "בקטע הקוד הבא, קומפילציה של אילו פונקציות גורמת לשגיאות?\n"
PRINTS = "מה מדפיסה התכנית הבאה:\n"
ADDOP = "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה\n"
ADDOPS = ("להגדיר אופרטור `++` שלא מקבל פרמטרים במחלקה `X`", "להגדיר אופרטור `++` שלא מקבל פרמטרים מחוץ למחלקה `X`",
          "להגדיר אופרטור `++` שמקבל פרמטר אחד במחלקה `X`", "להגדיר אופרטור `++` שמקבל פרמטר אחד מחוץ למחלקה `X`")

questions = []

# 1
questions.append(Q(1, "classes_ctor_dtor", ERRF + numbered('''
class C {
public:
    int x;
    void f() {
        x = 1;
        y = 2;
    }
private:
    int y;
}
void g() {
    C c;
    c.x = 1;
    c.y = 2;
}'''), txt("אף פונקציה, הקומפילציה מצליחה", "הפונקציה `f` בלבד", "הפונקציה `g` בלבד", "הפונקציות `f` ו-`g`."), "c",
    NOKEY + "clang++: the only access error is `c.y` in g (line 14); `f` may touch the private `y` of its own class. "
    "The paper prints no `;` after the class (line 10): clang reports that separately and recovers; with the `;` added the only error is still g. "
    "Intended key c; confidence med because of the printed typo.", confidence="med"))

# 2
questions.append(Q(2, "classes_ctor_dtor", "כמה נקודות מדפיסה התכנית הבאה:\n" + numbered('''
#include <iostream>
class X {
public:
    X() { std::cout << "."; }
    ~X() { std::cout << "."; }
};
void main() {
    X a;
    X *b = new X;
}'''), txt("2", "3", "4", "התכנית לא מתקמפלת"), "b",
    NOKEY + "clang++ run prints 3 dots (a: ctor + dtor, *b: ctor only, never deleted)."))

# 3
questions.append(Q(3, "operator_overloading", ADDOP + numbered('''
X x;
++x;'''), txt(*ADDOPS), "a",
    NOKEY + "clang++: both (a) member `operator++()` and (d) free `operator++(X&)` make `++x` compile; (b) and (c) do not. "
    "The official key of the same question in 19A-C is a; d is also accepted because it compiles.", acceptedIds=["a", "d"]))

# 4 (held)
questions.append(held(4, "copy_control", "איזו טענה נכונה לגבי התכנית הבאה:\n" + numbered('''
class X {
public:
    X() : arr(new int[1]) {}
    ~X() { delete[] arr; }
    int *arr;
};
void main() {
    X a;
    a.arr[0] = 1;
    {
        X b = a;
        b.arr[0] = 1;
    }
    a.arr[0] = 1;
}'''), txt("התכנית לא מתקמפלת", "התכנית ניגשת לכתובת לא חוקית בזיכרון בשורה 9",
           "התכנית ניגשת לכתובת לא חוקית בזיכרון בשורה 12", "התכנית ניגשת לכתובת לא חוקית בזיכרון בשורה 14"),
    "ub-answer",
    "Shallow copy: `b` shares `arr` with `a`, and b's destructor frees it at line 13, so the write at line 14 touches freed memory "
    "(option d by the language rule); the exit then frees it twice. The answer IS the undefined behaviour and clang++ cannot show it "
    "(no AddressSanitizer in this toolchain), so it is held. Suggested key if Adir accepts the rule: d."))

# 5
questions.append(Q(5, "const_references", "אילו שורות בתכנית הבאה גורמות לשגיאת קומפילציה:\n" + numbered('''
class X {
public:
    void f() {}
    void g() const {}
};
void main() {
    const X a;
    X b;
    a.f();
    a.g();
    b.f();
    b.g();
}'''), txt("שורה 9", "שורה 12", "שורות 9 ו-12", "אף תשובה אינה נכונה"), "a",
    NOKEY + "clang++ (c++11/14/17/20): the only error is line 9 (`a.f()` non-const method on a const object)."))

# 6
questions.append(Q(6, "operator_conversions", "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה:\n" + numbered('''
X x;
int n = x;'''), txt("להגדיר בנאי (constructor) במחלקה `X`", "להגדיר פונקציה שאיננה בנאי במחלקה `X`",
                     "להגדיר פונקציה חברה במחלקה `X`", "להגדיר פונקציה במחלקה `int`"), "b",
    NOKEY + "clang++: a member `operator int()` makes it compile; a constructor `X(int)` and a friend function do not. The official key of the same "
    "question in 19A-C is b (a non-constructor member function = the conversion operator).", confidence="med"))

# 7
questions.append(Q(7, "composition", "נתונות שתי מחלקות:\n" + numbered('''
class X {
public:
    X(int a) {}
};
class Y {
public:
    Y() : x(2) {}
    Y() : X(2) {}
    Y() { X x(2); }
    Y() { x = 2; }
    X x;
};''') + "\nאיזו שורה מבין השורות 7-10 מכילה את הדרך הנכונה לאתחל את השדה `x` שמוגדר במחלקה `Y`?",
    txt("7", "8", "9", "10"), "a",
    NOKEY + "clang++, each constructor alone: only line 7 (member initializer list) compiles; X has no default constructor."))

# 8 (held)
questions.append(held(8, "friend_this_static", "מה צריך להיכתב בשורה 4 כדי שהתכנית תתקמפל ותדפיס 1:\n" + numbered('''
#include <iostream>
class X {
    X& f() {
        return _____;
    }
};
void main() {
    X x;
    std::cout << (&x == x.f());
}'''), txt("`new X`", "`X()`", "`this`", "`*this`"),
    "no-option-compiles",
    "clang++: every option fails, because `&x == x.f()` compares an `X*` with an `X&` (and `new X`, `X()`, `this` cannot bind to `X&` anyway). "
    "Only `*this` becomes valid and prints 1 once the comparison is `&x == &x.f()`. Same printed defect as 19A-C Q6, which the arbiter "
    "shipped as d (`*this`); apply the same ruling here if wanted."))

# 9
questions.append(Q(9, "operator_overloading", ADDOP + numbered('''
X x;
++x;''', start=3), txt(*ADDOPS), "a",
    NOKEY + "Same printed question as Q3 (the lines are numbered 3-4). clang++: (a) and (d) compile; 19A-C official key a.",
    acceptedIds=["a", "d"]))

# 10
questions.append(Q(10, "friend_this_static", "אילו שורות גורמות לשגיאת קומפילציה במחלקה הבאה:\n" + numbered('''
class X {
    static int x;
    int y;
    void f() {
        x = 1;
        y = 1;
    }
    static void g() {
        x = 1;
        y = 1;
    }
};
int X::x;'''), txt("אף שורה", "שורה 5", "שורה 10", "שורות 5 ו-10"), "c",
    NOKEY + "clang++ (c++11/14/17/20): the only error is line 10 (non-static `y` inside a static method)."))

# 11 (held)
questions.append(held(11, "inheritance_access", "נתונים 4 קטעי תכנית A-D. בכל קטע מוגדרות שתי מחלקות. אילו קטעים עוברים קומפילציה:\n" + cb('''
A:
class X {
public: X(int n) {}
};
class Y : public X {}

B:
class X {
public: X(int n = 0) {}
};
class Y : public X {}

C:
class X {
public: X(int n) {}
};
class Y : public X {
    Y() : X(0) {}
}

D:
class X {
public: X(int n) {}
};
class Y : public X {
    Y() { X(0); }
}'''), txt("A", "B ו-D", "C ו-D", "B ו-C"), "no-option-matches",
    "clang++ with the closing `;` added (the printed snippets omit it on class Y in all four): A, B and C compile, D does not "
    "(the base X has no default constructor, `X(0);` only builds a temporary). The set {A,B,C} matches no option (a: A, b: B+D, c: C+D, d: B+C); "
    "d is the nearest if A were wrongly assumed to fail. Held; as printed none compiles at all."))

# 12
questions.append(Q(12, "inheritance_access", "בתכנית מוגדרות שתי מחלקות `X` ו-`Y`. מה ניתן להגיד על היחס ביניהן בהנחה הקטע הקוד הבא מתקמפל:\n" + numbered('''
Y y;
X &x = y;'''), txt("המחלקה `X` יורשת מהמחלקה `Y`", "המחלקה `Y` יורשת מהמחלקה `X`", "במחלקה `X` יש שדה מטיפוס `Y`", "במחלקה `Y` יש שדה מטיפוס `X`"), "b",
    NOKEY + "clang++: it compiles when Y derives publicly from X; the other three relations (X derives Y, field of the other type) do not compile. "
    "Same as the official key b of 19A-C Q11."))

# 13 (held)
questions.append(held(13, "inheritance_access", "מה נכון לגבי השדה `f` במחלקה `Y`:\n" + numbered('''
class X { public: int f; };
class Y : private X {};'''), txt("לשדה `f` אפשר לגשת מכל מקום בתכנית", "לשדה `f` אפשר לגשת רק מתוך המחלקות `X` ו-`Y`",
                                 "לשדה `f` אפשר לגשת רק מתוך המחלקה `X` אבל לא מתוך המחלקה `Y`",
                                 "לשדה `f` אפשר לגשת מהמחלקות `X`, `Y` ומכל מחלקה שיורשת מ-`Y`"),
    "no-option-matches",
    "clang++: with private inheritance `f` is reachable inside Y only; not from main, not from a class derived from Y, and not from X through a Y object. "
    "No option states that; b (X and Y) is the nearest if the question means 'f of X, and f inside Y'. Held."))

# 14
questions.append(Q(14, "virtual_polymorphism", "מה מדפיסה התכנית הבאה:\n" + numbered('''
#include <iostream>
class X {
public:
    virtual void f() { std::cout << 1; }
};
class Y : public X {
public:
    void f() { std::cout << 2; }
};
class Z : public Y {
public:
    void f() { std::cout << 3; }
};
void main() {
    Z z;
    Y *p = &z;
    p->f();
}'''), txt("1", "2", "3", "התכנית לא עוברת קומפילציה"), "c",
    NOKEY + "clang++ run prints 3: f is virtual from X on, so the call through Y* picks Z::f."))

# 15
questions.append(Q(15, "stl_exceptions", "בתכנית מוגדר משתנה `v` מטיפוס `vector<int>`. איזו מהטענות נכונה?", txt(
    "`v.begin()==v.end()` אם כמות האיברים בווקטור היא 0", "`v.begin()==v.end()` אם כמות האיברים בווקטור היא 1",
    "כמות האיברים בווקטור מוחזרת ע\"י `v.capacity()`", "אף תשובה אינה נכונה"), "a",
    NOKEY + "clang++ run: an empty vector has begin()==end() (1); with one element it is 0; capacity() is the allocated size and can exceed size() "
    "in general, so c is wrong."))

# 16
questions.append(Q(16, "construction_order", PRINTS + numbered('''
#include <iostream>
class X {
public:
    X() { std::cout << 1; }
    ~X() { std::cout << 2; }
};
class Y {
public:
    Y() { std::cout << 3; }
    ~Y() { std::cout << 4; }
};
void main() {
    Y y;
}'''), txt("34", "134", "1324", "1342"), "a",
    NOKEY + "clang++ run prints 34: Y has no X member and no X base, so X's constructor never runs."))

# 17 (held)
questions.append(held(17, "virtual_polymorphism", PRINTS + numbered('''
#include <iostream>
class X {
public:
    X() { std::cout << 1; }
    virtual ~X() { std::cout << 2; }
};
class Y {
public:
    Y() { std::cout << 3; }
    ~Y() { std::cout << 4; }
};
void main() {
    X *x = new Y;
    delete x;
}'''), txt("32", "13", "132", "1342"),
    "no-option-compiles",
    "clang++: as printed, `class Y` does not derive from X, so `X *x = new Y;` does not compile and no option says so. "
    "With `class Y : public X` (the shape of the same question in 18A-A/18A-B) it prints 1342 (d). Held; apply the arbiter's repair ruling "
    "(as for 19A-C Q6) if wanted."))

# 18
questions.append(Q(18, "friend_this_static", "אילו פונקציות נקראות בהכרח בעקבות פתיחת חלון באמצעות MFC?", txt(
    "`OnInitDialog`", "`OnPaint`", "`OnLButtonDown`", "תשובות א' וב' נכונות"), "d",
    NOKEY + "MFC framework fact, cannot be run. Opening a dialog sends WM_INITDIALOG (OnInitDialog) and WM_PAINT (OnPaint); OnLButtonDown needs a mouse click. "
    "Same ruling as 18A-C Q12.", confidence="med"))

# 19
questions.append(Q(19, "friend_this_static", "מה צריך להופיע במקום הריק בשורה 4 כדי שהתכנית הבאה תדפיס 12:\n" + numbered('''
#include <iostream>
class X {
public:
    X(int n) { ____ = n; }
    int n;
};
void main() {
    X x(12);
    std::cout << x.n;
}'''), txt("`n`", "`X::n`", "`x.n`", "`this.n`"), "b",
    NOKEY + "clang++ runs: `n = n` assigns the parameter to itself (field stays uninitialised); `X::n` prints 12; `x.n` and `this.n` do not compile."))

# 20
questions.append(Q(20, "templates", "אילו שורות בתכנית הבאה לא עוברות קומפילציה\n" + numbered('''
template<typename T> class X {};
void main() {
    X x;
    X x(int);
    X x<int>;
    X<int> x;
}'''), txt("שורה 4", "שורות 4 ו-5", "שורות 3, 4 ו-5", "אף תשובה אינה נכונה"), "c",
    NOKEY + "clang++ (c++11/14/17/20), each line alone in a function: lines 3, 4 and 5 fail, line 6 compiles (it only reports an error in the full "
    "program as a redeclaration of x). Official key of the same question in 19A-C is c."))


EXPL = {
    1: "הפונקציה `f` היא חברה במחלקה `C`, ולכן מותר לה לגשת לשדה הפרטי `y`. הפונקציה `g` היא פונקציה חיצונית ו-`c.y` פונה לשדה פרטי, ולכן רק היא גורמת לשגיאה. (בקטע המודפס חסר `;` אחרי סגירת המחלקה, וזו שגיאה תחבירית נפרדת שאינה שייכת לאף אחת מהפונקציות.) התשובה היא `g` בלבד (תשובה ג).",
    2: "האובייקט `a` נבנה (נקודה) ונהרס בסוף `main` (נקודה). האובייקט `*b` נוצר ב-`new` ומודפסת נקודה בבנאי, אבל אין `delete`, ולכן ההורס לא נקרא. בסך הכול 3 נקודות (תשובה ב), וכך גם הרצת clang++.",
    3: "בביטוי `++x` נקרא `operator++` ללא פרמטר מלאכותי: כחבר במחלקה (בלי פרמטרים) או כפונקציה חיצונית שמקבלת את האובייקט כפרמטר אחד. תשובה א נכונה. גם תשובה ד (פונקציה חיצונית עם פרמטר אחד) מתקמפלת בפועל, ולכן היא מתקבלת. תשובה ב לא מתקמפלת, ותשובה ג (חבר עם פרמטר אחד) היא הצורה של `x++` ולא של `++x`.",
    5: "האובייקט `a` הוא `const`, ולכן אפשר לקרוא עליו רק לפונקציות `const`. שורה 9 (`a.f()`) קוראת לפונקציה שאינה `const` ולכן שגויה. שורה 10 תקינה כי `g` היא `const`. על האובייקט הלא קבוע `b` מותר לקרוא לשתי הפונקציות. רק שורה 9 גורמת לשגיאה (תשובה א).",
    6: "כדי שההשמה `int n = x` תתקמפל צריך להמיר אובייקט `X` ל-`int`, וזה נעשה באמצעות אופרטור המרה `operator int()`, שהוא פונקציה חברה שאינה בנאי. בנאי במחלקה `X` ממיר אל `X` ולא ממנה, ופונקציית `friend` לא משפיעה על המרה. נבדק עם clang++: רק אופרטור ההמרה החבר מאפשר קומפילציה (תשובה ב).",
    7: "למחלקה `X` אין בנאי ברירת מחדל, ולכן השדה `x` חייב להיות מאותחל ברשימת האתחול של הבנאי של `Y`: `Y() : x(2) {}` (שורה 7). שורה 8 מנסה לאתחל מחלקת בסיס שאינה קיימת, שורה 9 מגדירה משתנה מקומי בלבד, ושורה 10 היא השמה לשדה שכבר נבנה בלי בנאי ברירת מחדל. נבדק עם clang++: רק שורה 7 מתקמפלת (תשובה א).",
    9: "זו אותה שאלה כמו שאלה 3 (השורות ממוספרות 3-4). `++x` מתקמפל אם מוגדר `operator++` כחבר ללא פרמטרים (תשובה א), וגם אם מוגדר כפונקציה חיצונית עם פרמטר אחד (תשובה ד, שמתקמפלת בפועל ולכן מתקבלת). אופרטור חיצוני בלי פרמטרים וחבר עם פרמטר אחד לא יתקמפלו.",
    10: "בפונקציה סטטית אין `this`, ולכן היא יכולה לגשת רק לשדות סטטיים. שורה 10 (`y = 1` בתוך `g`) פונה לשדה לא סטטי ולכן שגויה. שורה 5 תקינה (שדה סטטי בפונקציה רגילה), שורה 6 תקינה, שורה 9 תקינה, וההגדרה `int X::x;` תקינה. נבדק עם clang++: רק שורה 10 (תשובה ג).",
    12: "ההפניה `X &x = y` קושרת אובייקט מטיפוס `Y` להפניה למחלקה `X`, וזה אפשרי כש-`Y` יורשת מ-`X` ירושה ציבורית (המרה למחלקת בסיס). אם `X` הייתה יורשת מ-`Y`, או אם רק היה שדה מהטיפוס האחר, הקוד לא היה מתקמפל. נבדק עם clang++ (תשובה ב).",
    14: "הפונקציה `f` וירטואלית כבר ב-`X`, ולכן גם `Y::f` ו-`Z::f` וירטואליות. הקריאה `p->f()` דרך מצביע `Y*` לאובייקט `Z` נבחרת לפי הטיפוס הדינמי ומדפיסה 3 (תשובה ג), וכך גם הרצת clang++.",
    15: "בווקטור ריק `begin()` שווה ל-`end()`, ולכן טענה א נכונה. בווקטור עם איבר אחד הם שונים, ולכן טענה ב שגויה. `capacity()` היא הקיבולת שהוקצתה ויכולה להיות גדולה מכמות האיברים (`size()`), ולכן טענה ג שגויה. נבדק עם clang++.",
    16: "במחלקה `Y` אין שדה או בסיס מטיפוס `X`, ולכן הבנאי של `X` לא נקרא כלל. נבנה רק `y` (מודפס 3) ובסוף `main` הוא נהרס (מודפס 4): `34` (תשובה א), וכך גם הרצת clang++.",
    19: "הפרמטר `n` מסתיר את השדה `n`, ולכן `n = n` משנה רק את הפרמטר והשדה נשאר לא מאותחל. `X::n` פונה לשדה של האובייקט הנוכחי ומדפיס 12 (תשובה ב). `x.n` לא מתקמפל כי `x` לא מוגדר בתוך הבנאי, ו-`this.n` לא מתקמפל כי `this` הוא מצביע (צריך `this->n`). נבדק עם clang++.",
    20: "בקטע הזה `X` היא תבנית ולכן חייבים לציין טיפוס. שורה 3 (`X x;`) חסרה ארגומנט לתבנית, שורה 4 (`X x(int);`) וגם שורה 5 (`X x<int>;`) אינן תחביר חוקי. שורה 6 (`X<int> x;`) תקינה. נבדק עם clang++ בכל התקנים (c++11 עד c++20): שורות 3, 4 ו-5 לא מתקמפלות (תשובה ג).",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
SIG_NORUN = '\n\n_(הסבר שנכתב בעזרת AI; השאלה אינה ניתנת להרצה ולכן נשענת על עקרונות השפה)_'
EXPL[18] = "בפתיחת חלון דיאלוג ב-MFC נשלחת ההודעה `WM_INITDIALOG`, ולכן נקראת `OnInitDialog`, ומיד אחריה `WM_PAINT` כדי לצייר את החלון, ולכן נקראת `OnPaint`. `OnLButtonDown` נקראת רק כשהמשתמש לוחץ על כפתור העכבר השמאלי. לכן תשובות א ו-ב נכונות (תשובה ד)."
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + (SIG_NORUN if q["num"] == 18 else SIG)

exam = {
    "examCode": "SAMP-18",
    "examLabel": "מבחן לדוגמא תשע\"ח",
    "year": 2018,
    "examDate": "",
    "sourceFile": "2018/מבחן לדוגמא סמ׳ א.pdf",
    "keyFile": "none (keys derived by clang++ runs, see tools/verify/SAMP-18)",
    "contexts": {"notes": {"kind": "text", "title": "הוראות לנבחן",
                           "text": "משך המבחן הוא 3 שעות. כל חומר עזר אסור בשימוש. בכל אחת מהשאלות להלן עליך לסמן את התשובה הנכונה ביותר."}},
    "questions": questions,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
