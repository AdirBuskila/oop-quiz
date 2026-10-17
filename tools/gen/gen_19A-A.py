# -*- coding: utf-8 -*-
"""Generator for tools/raw/19A-A.json -- oop (61307), 2019 semester A, moed A (printed date 27/02/2019).
Run: PYTHONUTF8=1 py tools/gen/gen_19A-A.py

Source: 11-page paper (25 MCQ, 4 options, page 1 = answer-form layout, p.11 = scratch page) with the correct option highlighted
in yellow (official-looking key). Q7 has NO highlight on the paper: its key comes from the clang++ run (answerSource "solved").
Code questions were compiled/run with clang++ (tools/verify/19A-A/verify.py reads the code straight out of this file's
questions). The exam targets Visual Studio (`void main`); the harness rewrites it to `int main`.
Printed oddities kept as printed: Q1 line 5 has no `;`; Q8 prints `A{};` without `class`; Q16/Q13/Q17/Q18 use curly quotes in the
source (written here with ASCII quotes so the code compiles). Q25 is a library-knowledge question (checked against the headers)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "19A-A.json"
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


OUT_Q = "מה מדפיסה התוכנית\n"
OUT_QQ = "מה מדפיסה התכנית?\n"

questions = []

questions.append(Q(
    1, "cpp_basics_refs", "מה גורם לשגיאת קומפילציה\n" + numbered('''
int x = 5;
int &r = x;
r = 7;
int &s = x;
s = 7'''),
    txt("אף שורה", "שורות 2 ו-4", "שורה 4", "שורה 5"), "a",
    "Official key a. clang++ run: the snippet is printed with no `;` after `s = 7` on line 5 (a typo; with the `;` added there is no error on any line). "
    "Agrees with the key on that reading."))

questions.append(Q(
    2, "cpp_basics_refs", OUT_Q + cb('''
#include <iostream>
int & f(int &x, int  y) { x=--y; return x; }
void main() { int x=4; std::cout << f(x,x)++ ; std::cout << ++x;}'''),
    txt("התכנית לא עוברת קומפילציה", "`45`", "`44`", "`35`"), "d",
    "Official key d. clang++ run: prints 35 (y is a copy: x = 3, f returns x, post-increment prints 3, then ++x prints 5). Agrees."))

questions.append(Q(
    3, "cpp_basics_refs", OUT_Q + cb('''
int funC(int i=10) {return i+1;}
int funC() {return 8;}
#include <iostream>
void main () { std::cout << funC() << funC(8); }'''),
    txt("התכנית לא עוברת קומפילציה", "`89`", "`88`", "`99`"), "a",
    "Official key a. clang++ run: `funC()` is ambiguous between `funC()` and `funC(int i=10)`: compile error. Agrees."))

questions.append(Q(
    4, "cpp_basics_refs", OUT_QQ + cb('''
#include <iostream>
using namespace std;
int &f(int &i)
{
    static int r = 0;
    r+=i;
    return r;
}
void main()
{
    int i = 5;
    f(i) += i;
    cout << f(i) << endl;
}'''),
    txt("`5`", "`10`", "`15`", "`20`"), "c",
    "Official key c. clang++ run: prints 15 (r = 5, then `+= i` makes it 10, the second call adds 5 more). Agrees."))

questions.append(Q(
    5, "friend_this_static", "נתונות הגדרות של מחלקות `A` ו-`B`:\n" + cb('''
class A { … };
class B { friend class A; …};''') + "\nמשמעות הגדרות היא:\n",
    txt("למחלקה `A` מותר לגשת לכל משתני המחלקה `B`",
        "למחלקה `B` מותר לגשת לכל משתני המחלקה `A`",
        "למחלקה `A` מותר לגשת לכל משתני המחלקה `B` ולהיפך",
        "למחלקה `A` מותר לגשת למשתני המחלקה `B` שמוגדרים `public` ו-`protected` אבל לא `private`"), "a",
    "Official key a. clang++ run: with `friend class A;` inside B, A's members read B's private fields; B cannot read A's private fields. Agrees."))

questions.append(Q(
    6, "classes_ctor_dtor", "הנח שהוגדרה מחלקה בשם `A` (בעלת בנאי ברירת מחדל (default constructor)) והתבונן במשפט הבא:\n" + cb("A *a = new A;") +
    "\nמתי ייקרא ההורס (destructor) של המחלקה `A`?\n",
    txt("בעקבות הפעלת אופרטור `delete` על ההמשתנה `a`",
        "בסוף תחום ההגדרה בו הוגדר המשתנה `a`",
        "תשובות (א) ו-(ב) נכונות",
        "אף תשובה אינה נכונה"), "a",
    "Official key a. clang++ run: the destructor message appears only after `delete a`; a pointer leaving its scope destroys nothing. Agrees.",
    lockOrder=True))

questions.append(Q(
    7, "construction_order", OUT_QQ + cb('''
#include <iostream>
using namespace std;
class X {
public:
    X(int i) { n = i;  cout << i; }
    ~X() { cout << n; }
    int n;
};
int f() {
    X x1(1);
    return x1.n;
}
X x2(2);
int main() {
    X x3(3);
    cout << f();
    static X x4(4);
}'''),
    txt("`231114342`", "`23411142`", "`23114342`", "אף תשובה אינה נכונה"), "a",
    "No highlight on the paper for this question. Key derived from the clang++ run: 231114342 (x2, x3, then f: x1 ctor 1, x1 dtor 1, prints 1; x4 ctor 4; at exit x3, x4, x2 destroyed: 3 4 2). "
    "Option a matches exactly.",
    answerSource="solved", official=False))

questions.append(Q(
    8, "classes_ctor_dtor", "איזו מהפונקציות הבאות לא קיימת במחלקה שמוגדרת באופן הבא: `A{};`\n",
    txt("בנאי (constructor)", "אופרטור השמה (`=`)", "אופרטור השוואה (`==`)", "הורס (destructor)"), "c",
    "Official key c. clang++ run on `class A{};`: construction, assignment and destruction compile; `a == b` does not. Agrees (the paper prints `A{};` without `class`)."))

questions.append(Q(
    9, "copy_control", "באיזה מקרה **לא** נקרא בנאי העתקה (copy constructor) של מחלקה `A`?\n",
    txt("כאשר פונקציה מחזירה אובייקט מטיפוס `A`.",
        "כאשר לפונקציה מועבר ארגומנט (פרמטר) מטיפוס `A`.",
        "כאשר מתבצעת השמה בין אובייקטים מטיפוס `A`.",
        "בכל המקרים שמופיעים בתשובות (א)-(ג) נקרא בנאי העתקה"), "c",
    "Official key c. clang++ run with a counting copy constructor: passing by value and (with -fno-elide-constructors) returning by value call it; assignment `a = b` calls only operator=. Agrees.",
    lockOrder=True))

questions.append(Q(
    10, "const_references", cb('''
class A {
  int K ;
  int* f(const int *k) const { return _____; }
};''') + "\nמה ניתן לכתוב ב-`_____` כך שהקוד יעבור קומפילציה\n",
    txt("`this->K`", "`K+k`", "`new int(*k+K)`", "`k`"), "c",
    "Official key c. clang++ run: only `new int(*k+K)` compiles (returns `int*`); `this->K` is an int, `K+k` and `k` are `const int*` and cannot convert to `int*`. Agrees."))

questions.append(Q(
    11, "const_references", "למשתני מחלקה שמוגדרים כ-`const` ניתן לבצע **השמה**:\n",
    txt("מכל מקום בתכנית במידה והם מוגדרים כ-`public`",
        "רק מתוך פונקציות המוגדרות באותה מחלקה",
        "רק מתוך בנאי שמוגדר באותה מחלקה",
        "אף תשובה אינה נכונה"), "d",
    "Official key d. clang++ run: assignment to a const member fails in main, in a member function and in a constructor body (only initialization in the init list is allowed). Agrees."))

questions.append(Q(
    12, "composition", "בשאלה זו הנח שלא ניתן לאתחל שדות במקום הגדרתם.\n"
    "שלוש תלמידות נשאלו מתי רשימת אתחול של בנאי מחלקה לא יכולה להיות ריקה? הן השיבו:\n"
    "תלמידה 1: כאשר במחלקה קיים שדה שמוגדר כ-`const`.\n"
    "תלמידה 2: כאשר במחלקה קיים שדה הפנייה (reference).\n"
    "תלמידה 3: כאשר המחלקה יורשת ממחלקה אחרת, בה אין בנאי ברירת מחדל.\n"
    "כמה מהתלמידות צדקו?\n",
    txt("`0`", "`1`", "`2`", "`3`"), "d",
    "Official key d. clang++ run: with an empty init list each of the three situations fails to compile. Agrees."))

questions.append(Q(
    13, "construction_order", OUT_Q + cb('''
#include <iostream>
class A {
public:
    A() { std::cout << "a"; }
    ~A() { std::cout << "A"; }
};
class B {
public:
    B() { std::cout << "b"; }
    ~B() { std::cout << "B"; }
};
class C {
public:
    C() { std::cout << "c"; }
    ~C() { std::cout << "C"; }
};
A a;
int main() {
    C c;
    B b;
}'''),
    txt("`cba`", "`abc`", "`cbaBCA`", "`acbBCA`"), "d",
    "Official key d. clang++ run: prints acbBCA (global a first; locals c, b; destroyed b, c, then the global). Agrees."))

questions.append(Q(
    14, "const_references", OUT_QQ + cb('''
#include <iostream>
using namespace std;
class X {
public:
    X(int i=0) : n(i) { }
    void f() const { cout << n; }
    void f() { cout << n*2; }
    int n;
};
int main() {
    X x1(2);
    const X x2(3);
    x1.f();
    x2.f();
}'''),
    txt("`43`", "`34`", "`26`", "`42`"), "a",
    "Official key a. clang++ run: prints 43 (non-const object picks the non-const f: 2*2; the const object picks the const f: 3). Agrees."))

questions.append(Q(
    15, "inheritance_access", "אילו שורות גורמות לשגיאת קומפילציה בקטע הקוד הבא:\n" + numbered('''
#include <iostream>
using namespace std;
class X {
public:
    X(int i = 0) : nx(i) {}
    void f() { cout << nx; }
    int nx;
};
class Y : public X {
public:
    Y(int i = 0, int j = 0) : X(i),ny(j) {}
    void h() {
      this->X::f();
      cout << ny; }
    int ny;
};
int main() {
    Y y1(2);
    y1.X::f();
    X::f();
    y1.f();
    y1.X::h();
}'''),
    txt("שורות 13,19,20,21,22", "שורות 13,19,20,22", "שורות 13,20,22", "שורות 20 ו-22"), "d",
    "Official key d. clang++ run: errors on lines 20 (`X::f()` without an object) and 22 (`h` is not a member of X); lines 13, 19 and 21 compile. Agrees."))

questions.append(Q(
    16, "construction_order", "מה יודפס עבור הקוד\n" + cb('''
#include <iostream>
class A {
public:
    A(int) {std::cout << " A int ";}
    A() {std::cout << "A empty ";}
    virtual ~A() {std::cout << " destroy A";}
};
class B : public A{
public:
    B(int):A() {std::cout << "B int ";}
    B() {std::cout << "B empty ";}
    virtual ~B() {std::cout << " destroy B";}
};
B b(3);
void main() { A a(3); }'''),
    txt("`A empty B int A int destroy A destroy B destroy A`",
        "`A int A int destroy B destroy A`",
        "`B int A int destroy A destroy B`",
        "`A int B int destroy A destroy B destroy A`"), "a",
    "Official key a. clang++ run (curly quotes of the source replaced by ASCII quotes): the output, with runs of spaces collapsed, is exactly option a. Agrees."))

questions.append(Q(
    17, "virtual_polymorphism", OUT_Q + cb('''
#include <iostream>
class A {
public: void f() { std::cout << "A"; }
};
class B : public A {
public: void f() { std::cout << "B"; }
};
void g(A &a) { a.f(); }
int main() {
    B b;
    g(b);
}'''),
    txt("`A`", "`B`", "`AB`", "`BA`"), "a",
    "Official key a. clang++ run: prints A (`f` is not virtual, so the call through `A&` binds to A::f). Agrees."))

questions.append(Q(
    18, "virtual_polymorphism", OUT_Q + cb('''
#include <iostream>
class B{
public:
    void disp() { std::cout<<"B"; }
};
class D:public B{
public:
    void disp() { std::cout<<"D"; }
};
void main(){
    D d;
    d.disp();
    D *pd=&d;
    pd->disp();
    B *pb=pd;
    pb->disp();
}'''),
    txt("התכנית לא עוברת קומפילציה", "`DDB`", "`DDD`", "`BBB`"), "b",
    "Official key b. clang++ run: prints DDB (static binding by pointer type). Agrees."))

questions.append(Q(
    19, "copy_control", "בקטע הקוד הבא:\n" + cb('''
#include <iostream>
using namespace std;
class X {
public:
    X(int i = 0) { p = new(int);
                   *p = i;
    }
    ~X() { delete p; }
    int* p;
};

int main() {
    X x1(1);
    X x2(2);
    x2 = x1;
}'''),
    txt("מתקבלת שגיאה בזמן ביצוע שורת קוד של ה-constructor",
        "מתקבלת שגיאה בזמן ביצוע שורת קוד של ה-destructor",
        "מתקבלת שגיאה בזמן ביצוע שורת קוד של הפונקציה `main`",
        "לא מתקבלת שגיאה"), "b",
    "Official key b. clang++ run: the default assignment copies the pointer, so at the end both objects `delete` the same block; the double delete aborts the program from inside the destructor. Agrees."))

questions.append(Q(
    20, "friend_this_static", "נתונה מחלקה `C` בה יש 3 משתני מחלקה שמוגדרים כ-`public`, `protected` ו-`private`. למי מבין הבאים יש גישה למספר גדול יותר של משתנים במחלקה `C`?\n",
    txt("למחלקה `D` שיורשת מ-`C` ירושת `public`",
        "לפונקציה `F` שמוגדרת כ-`friend` במחלקה `C`",
        "למחלקה `X` שמוגדרת כ-`friend` במחלקה `C`",
        "התשובות (ב) ו-(ג) נכונות."), "d",
    "Official key d. clang++ run: the derived class reaches 2 of the 3 fields (public, protected); a friend function and a friend class reach all 3. Agrees.",
    lockOrder=True))

questions.append(Q(
    21, "copy_control", "מהי ההצהרה הנכונה ביותר (שתואמת את התנהגות הטיפוס `int`) של אופרטור השמה (`=`) עבור המחלקה `C`?\n",
    txt("`C &operator=( const C & )`", "`const C &operator=( const C & )`", "`const C &operator=( C & )`", "`const C &operator=( const C & ) const`"), "a",
    "Official key a. clang++ run: like `int`, the chained forms `(a = b) = c` and `a = b = c` compile only with a non-const reference result; the other declarations return const (no `(a = b) = c`) or are const members that cannot modify the object. Agrees."))

questions.append(Q(
    22, "templates", "נתון קטע תכנית:\n" + numbered('''
template<typename T> void f(T t) { int n = t; }
template<typename T> void g(int n) { T t = n; }
int main() {
    f(5);
    g(5);
}''') + "\nאילו שורות גורמות לשגיאת קומפילציה?\n",
    txt("אף שורה", "שורה 4", "שורה 5", "שורות 4 ו-5"), "c",
    "Official key c. clang++ run: line 5 fails (`T` cannot be deduced for `g`); line 4 compiles. Agrees."))

questions.append(Q(
    23, "templates", "נתון קטע תכנית:\n" + cb('''
template<typename T> void f() {}
template<typename T> class X { friend void f<T>(); };''') + "\nאיזו מהטענות נכונה?\n",
    txt("הפונקציה `f<double>` היא חברה של המחלקה `X<double>`",
        "הפונקציה `f<int>` היא חברה של המחלקה `X<double>`",
        "תשובות (א) ו-(ב) נכונות",
        "אף תשובה אינה נכונה"), "a",
    "Official key a. clang++ run: with a private field added to X and f reading it, `f<double>` can read `X<double>`'s field and `f<int>` cannot. Agrees.",
    lockOrder=True))

questions.append(Q(
    24, "templates", "נתונות מחלקה `X` ומחלקה `Y` שיורשת מ-`X`. כמו כן, נתונה תבנית מחלקה `A<T>`.\nאיזו מהטענות נכונה?\n",
    txt("ניתן לבצע השמה ממשתנה מטיפוס `A<Y>` למשתנה מטיפוס `A<X>`",
        "ניתן לבצע השמה ממשתנה מטיפוס `A<X>` למשתנה מטיפוס `A<Y>`",
        "תשובות (א) ו-(ב) נכונות",
        "אף תשובה אינה נכונה"), "d",
    "Official key d. clang++ run: `A<X> = A<Y>` and `A<Y> = A<X>` both fail (different, unrelated instantiations). Agrees.",
    lockOrder=True))

questions.append(Q(
    25, "stl_exceptions", "איזו פעולה איטרטור (iterator) לא יודע לעשות (כלומר לא מוגדרת במחלקה שלו)?\n",
    txt("התקדמות לאיבר הבא", "הסרת האיבר המוצבע", "איחזור ערך האיבר המוצבע", "השוואה עם איטרטור אחר"), "b",
    "Official key b. clang++ run: `++it`, `*it` and `it == it2` compile on a vector iterator; `it.erase()` does not (removal is done by the container, `v.erase(it)`). Agrees."))

EXPL = {
    1: 'הקוד מתקמפל: `r` ו-`s` הן הפניות מאותחלות ל-`x`, וההשמות דרכן תקינות. (בשורה 5 מודפס בדף `s = 7` בלי נקודה-פסיק, כנראה טעות דפוס, ואם משלימים אותה אין שגיאה באף שורה.)\nהתשובה היא אף שורה (תשובה א).',
    2: 'בקריאה `f(x,x)` הפרמטר `x` הוא הפניה ל-`x` של `main`, ו-`y` הוא עותק. `x = --y` נותן `y` = 3 ו-`x` = 3, והפונקציה מחזירה הפניה ל-`x`. הביטוי `f(x,x)++` מדפיס את הערך 3 ואז מגדיל את `x` ל-4. אחר כך `++x` מדפיס 5.\nהפלט הוא `35` (תשובה ד).',
    3: 'הקריאה `funC()` דו-משמעית: היא מתאימה גם ל-`funC()` וגם ל-`funC(int i=10)` עם ערך ברירת המחדל. הקומפיילר מדווח על שגיאה.\nהתשובה היא שהתכנית לא עוברת קומפילציה (תשובה א).',
    4: 'המשתנה `r` סטטי ושומר את ערכו בין קריאות. הקריאה הראשונה מוסיפה 5 ל-`r` (5) ומחזירה הפניה אליו, ו-`+= i` מעלה אותו ל-10. הקריאה השנייה מוסיפה עוד 5 ומדפיסה 15.\nהפלט הוא `15` (תשובה ג).',
    5: 'ההצהרה `friend class A;` בתוך `B` נותנת למחלקה `A` גישה לכל החברים של `B`, כולל הפרטיים. הידידות חד-כיוונית, ולכן ל-`B` אין גישה אוטומטית לחברי `A`.\nהתשובה היא תשובה א.',
    6: 'עבור אובייקט שנוצר ב-`new`, ההורס נקרא רק כשמפעילים `delete`. כשהמצביע `a` יוצא מהתחום האובייקט לא נהרס (דליפת זיכרון).\nהתשובה היא תשובה א.',
    7: 'הסדר: המשתנה הגלובלי `x2(2)` נבנה קודם (2), ואז `x3(3)` ב-`main` (3). הקריאה ל-`f` בונה את `x1` (1), מעתיקה את `n`, והורסת את `x1` (1) לפני שהערך המוחזר מודפס (1). אחר כך נבנה הסטטי `x4(4)` (4). בסיום `main` נהרס `x3` (3), ואחריו הסטטי `x4` (4) והגלובלי `x2` (2), בסדר הפוך לבנייה.\nהפלט הוא `231114342` (תשובה א). בדף לא סומנה תשובה לשאלה זו, והתשובה נקבעה מהרצת הקוד.',
    8: 'הקומפיילר מייצר למחלקה ריקה בנאי, אופרטור השמה והורס. הוא לא מייצר אופרטור השוואה `==`, ולכן `a == b` לא מתקמפל.\nהתשובה היא תשובה ג.',
    9: 'בנאי העתקה נקרא בהעברת אובייקט לפי ערך, ובהחזרת אובייקט לפי ערך (אלא אם הקומפיילר מבטל את ההעתקה). השמה בין אובייקטים קיימים קוראת לאופרטור ההשמה ולא לבנאי ההעתקה.\nהתשובה היא תשובה ג.',
    10: 'הפונקציה מחזירה `int*` והיא `const`, ולכן `K` הוא `const int` בתוכה. רק `new int(*k+K)` מחזיר `int*`. הביטוי `this->K` הוא `int`, ואילו `K+k` ו-`k` הם `const int*` שלא ניתן להמיר ל-`int*`.\nהתשובה היא תשובה ג.',
    11: 'שדה `const` אי אפשר להשים אליו מאף מקום, לא מ-`main`, לא ממתודה ולא מגוף הבנאי. אפשר רק לאתחל אותו ברשימת האתחול של הבנאי.\nהתשובה היא אף תשובה אינה נכונה (תשובה ד).',
    12: 'שלושת המקרים דורשים רשימת אתחול: שדה `const` חייב אתחול, שדה הפניה חייב אתחול, ומחלקת בסיס בלי בנאי ברירת מחדל דורשת קריאה מפורשת לבנאי שלה. כל שלוש התלמידות צדקו.\nהתשובה היא `3` (תשובה ד).',
    13: 'המשתנה הגלובלי `a` נבנה לפני `main` (`a`). בתוך `main` נבנים `c` ואז `b`. ההריסה בסדר הפוך: `b` (`B`), `c` (`C`), ובסוף הגלובלי (`A`).\nהפלט הוא `acbBCA` (תשובה ד).',
    14: 'בעומס יתר לפי `const`, אובייקט לא-const קורא לגרסה הלא-const (`n*2`), ואובייקט `const` קורא לגרסת ה-`const`. `x1.f()` מדפיס 4, ו-`x2.f()` מדפיס 3.\nהפלט הוא `43` (תשובה א).',
    15: '- שורה 13: `this->X::f()` תקינה.\n- שורה 19: `y1.X::f()` תקינה.\n- שורה 20: `X::f()` ב-`main` קוראת לפונקציה לא סטטית בלי אובייקט, שגיאה.\n- שורה 21: `y1.f()` תקינה, כי `f` עוברת בירושה.\n- שורה 22: `y1.X::h()` שגויה, כי `h` שייכת ל-`Y` ולא ל-`X`.\nהתשובה היא שורות 20 ו-22 (תשובה ד).',
    16: 'המשתנה הגלובלי `b(3)` נבנה לפני `main`: קודם הבסיס `A()` מדפיס `A empty`, ואז `B int`. ב-`main` נבנה `A a(3)` ומדפיס `A int`, ובסוף `main` ההורס שלו מדפיס `destroy A`. בסיום התכנית נהרס הגלובלי: `destroy B` ואז `destroy A`.\nהפלט הוא הפלט שבתשובה א.',
    17: 'הפונקציה `f` אינה וירטואלית, לכן הקריאה דרך הפניה מטיפוס `A&` נקשרת סטטית ל-`A::f`.\nהפלט הוא `A` (תשובה א).',
    18: 'בקריאות דרך `d` ודרך `pd` (טיפוס `D`) נבחרת `D::disp`. הקריאה דרך `pb` מטיפוס `B*` נקשרת ל-`B::disp`, כי הפונקציה אינה וירטואלית.\nהפלט הוא `DDB` (תשובה ב).',
    19: 'ההשמה `x2 = x1` היא השמה רדודה: המצביע `p` מועתק, כך שהבלוק של `x2` דולף ושני האובייקטים מצביעים לאותו בלוק. בסוף `main` ההורס של כל אחד מהם מבצע `delete` לאותו בלוק, וההרצה קורסת בתוך ההורס.\nהתשובה היא תשובה ב.',
    20: 'מחלקה יורשת בירושה ציבורית רואה את החברים הציבוריים והמוגנים (2 מתוך 3). פונקציה ידידה ומחלקה ידידה רואות את כולם (3 מתוך 3).\nלכן תשובות ב ו-ג נכונות (תשובה ד).',
    21: 'כדי להתנהג כמו `int` (שבו `(a = b) = c` ו-`a = b = c` חוקיים), אופרטור ההשמה מקבל `const C &` ומחזיר `C &` לא קבועה. החזרת `const C &` חוסמת את `(a = b) = c`, פרמטר לא קבוע לא מקבל אובייקט `const`, ואופרטור `const` לא יכול לשנות את האובייקט.\nהתשובה היא תשובה א.',
    22: 'בקריאה `f(5)` הטיפוס `T` מוסק כ-`int`, והקוד תקין. בקריאה `g(5)` אין פרמטר מטיפוס `T`, ולכן הקומפיילר לא יכול להסיק אותו, והשורה שגויה.\nהתשובה היא שורה 5 (תשובה ג).',
    23: 'ההצהרה `friend void f<T>();` בתוך `X<T>` מצהירה על ידידות לאותו מופע של התבנית `f` עם אותו `T`. לכן `f<double>` היא חברה של `X<double>`, ו-`f<int>` אינה חברה של `X<double>`.\nהתשובה היא תשובה א.',
    24: 'שני מופעים שונים של תבנית (`A<X>` ו-`A<Y>`) הם טיפוסים לא קשורים, גם אם `Y` יורשת מ-`X`. אין המרה או השמה ביניהם, בשני הכיוונים.\nהתשובה היא אף תשובה אינה נכונה (תשובה ד).',
    25: 'איטרטור יודע להתקדם (`++it`), לאחזר את הערך (`*it`) ולהשוות (`==`). הסרת האיבר נעשית דרך המכל, `v.erase(it)`, ואינה פעולה של האיטרטור.\nהתשובה היא תשובה ב.',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "19A-A",
    "examLabel": "2019 סמסטר א מועד א",
    "year": 2019,
    "examDate": "27.02.2019",
    "sourceFile": "2019/סמ׳ א מועד א + פתרון.pdf",
    "keyFile": "same file (correct option highlighted in yellow on the paper; Q7 has no highlight, key from the clang++ run)",
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
