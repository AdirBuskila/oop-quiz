# -*- coding: utf-8 -*-
"""Generator for tools/raw/19A-C.json -- oop (61307), 2019 semester A, moed C (27/05/2019).
Run: PYTHONUTF8=1 py tools/gen/gen_19A-C.py

Source: 11-page paper (25 MCQ, 4 options) with the official correct option highlighted in yellow (page 11 is a scratch page, page 1 the answer sheet).
Every code question was compiled/run with clang++ (tools/verify/19A-C/check.py); the results agree with the key except as noted:
 - Q6 has NO highlighted option and no option compiles as printed (`&x == x.f()` compares X* with X&) -> held.
 - Q1: the key is a; option d (free operator++ with one parameter) also compiles (note only).
`void main` in the exam is MSVC style; the harness rewrites it to `int main` for clang."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "19A-C.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "correctId": correct,
         "answerSource": "highlighted-pdf", "official": True, "confidence": "high",
         "explanation": "", "note": note}
    q.update(kw)
    return q


PRINTS = "מה מדפיסה התכנית"
CMP = "בתכנית מוגדרת מחלקה `X`. מה צריך לעשות כדי שקטע הקוד הבא יעבור קומפילציה"
questions = []

# 1
questions.append(Q(1, "operator_overloading", CMP + "\n" + cb(r'''
1. X x;
2. ++x;''', "text"),
    txt("להגדיר אופרטור `++` שלא מקבל פרמטרים במחלקה `X`", "להגדיר אופרטור `++` שלא מקבל פרמטרים מחוץ למחלקה `X`",
        "להגדיר אופרטור `++` שמקבל פרמטר אחד במחלקה `X`", "להגדיר אופרטור `++` שמקבל פרמטר אחד מחוץ למחלקה `X`"), "a",
    "Official key a. clang++ compile tests: a (member operator++()) compiles; b (free, no parameter) does not; c (member taking one parameter = postfix form) does not; "
    "d (free operator++(X&), one parameter) ALSO compiles, so d is arguably correct too. Key kept as printed.",
    confidence="med"))

# 2
questions.append(Q(2, "operator_conversions", CMP + ":\n" + cb(r'''
1. X x;
2. int n = x;''', "text"),
    txt("להגדיר בנאי (constructor) במחלקה `X`", "להגדיר פונקציה שאיננה בנאי במחלקה `X`", "להגדיר פונקציה חברה במחלקה `X`", "להגדיר פונקציה במחלקה `int`"), "b",
    "Official key b. clang++ compile tests: only a conversion operator (`operator int()`) makes `int n = x;` compile; a constructor, a plain member function and nothing in int do not. Agrees."))

# 3
questions.append(Q(3, "classes_ctor_dtor", "בקטע הקוד הבא, קומפילציה של אילו פונקציות גורמת לשגיאות?\n" + cb(r'''
1.  class C {
2.  public:
3.      int x;
4.      void f() {
5.          x = 1;
6.          y = 2;
7.      }
8.  private:
9.      int y;
10. }
11. void g() {
12.     C c;
13.     c.x = 1;
14.     c.y = 2;
15. }''', "text"),
    txt("אף פונקציה, הקומפילציה מצליחה", "הפונקציה `f` בלבד", "הפונקציה `g` בלבד", "הפונקציות `f` ו-`g`"), "c",
    "Official key c. clang++ run (lines tagged; the class-closing `;` after line 10 added so only real errors show): only line 14 (`c.y` from outside) fails. Agrees."))

# 4
questions.append(Q(4, "const_references", "מה הטיפוס של `this` בפונקציה `f` במחלקה הבאה?\n" + cb(r'''
class A { void f() const {…} };'''),
    txt("`A`", "`A*`", "`const A&`", "`const A*`"), "d",
    "Official key d. clang++ static_assert on decltype(this) inside a const member: only const A* accepted. Agrees."))

# 5
questions.append(Q(5, "inheritance_access", "אילו שורות בתכנית הבאה גורמות לשגיאת קומפילציה?\n" + cb(r'''
1    class A { public: int I;};
2    class B : protected A { private: int J;};
3    void main () {
4      A t;
5      B tt;
6      t.I = 3;
7      tt.I = 3;
8    }''', "text"),
    txt("אף שורה", "שורות 2 ו-6", "שורות 2 ו-5", "שורה 7"), "d",
    "Official key d. clang++ run (lines tagged): only line 7 fails. Agrees."))

# 6 (HELD)
q6 = Q(6, "friend_this_static", "מה צריך להיכתב בשורה 4 כדי שהתכנית הבאה תתקמפל ותדפיס 1:\n" + cb(r'''
1. #include <iostream>
2. class X {
3.     X& f() {
4.         return _____;
5.     }
6. };
7. void main() {
8.     X x;
9.     std::cout << (&x == x.f());
10. }''', "text"),
    txt("`new X`", "`X()`", "`this`", "`*this`"), None,
    "Held. No option is highlighted on the paper. clang++: with each of the four options the program fails to compile, because `&x == x.f()` compares an `X*` with an `X&`. "
    "(With the repaired comparison `&x == &x.f()` and `*this` it prints 1.)",
    hold="no-key: no highlighted option on the paper, and as printed none of the four options compiles (`&x == x.f()` compares X* with X&).",
    confidence="low")
del q6["answerSource"], q6["official"], q6["correctId"]
questions.append(q6)

# 7
questions.append(Q(7, "templates", PRINTS + "?\n" + cb(r'''
#include <iostream>
template<int N> class X {
public:
X() { ++d; }
static int d;
};
template<int N> int X<N>::d = 0;
void main() {
X<0> a, b;
X<1> c;
std::cout << a.d << b.d << c.d;
}'''),
    txt("`000`", "`123`", "`221`", "`333`"), "c",
    "Official key c. clang++ run printed 221. Agrees."))

# 8
questions.append(Q(8, "operator_overloading", "מה נכון לגבי הגדרת האופרטור `>>` עבור המחלקה `X`?",
    txt("הפונקציה צריכה להיות מוגדרת בתוך `X`", "הפונקציה צריכה להיות מוגדרת מחוץ ל-`X` ובהכרח צריכה להיות מוגדרת כ-`friend` ב-`X`",
        "הפונקציה צריכה להיות מוגדרת מחוץ ל-`X` ולא בהכרח צריכה להיות מוגדרת כ-`friend` ב-`X`",
        "הפונקציה צריכה להיות מוגדרת גם בתוך `X` וגם מחוץ ל-`X`"), "c",
    "Official key c. clang++ compile tests (istream >>): a member form does not make `cin >> x` compile; a free function over public members compiles without friend. Agrees."))

# 9
questions.append(Q(9, "classes_ctor_dtor", "מה נכון לגבי השדה `f` במחלקה `X`:\n" + cb(r'''
class X {
private:
int f;
};'''),
    txt("לשדה `f` אפשר לגשת מכל מקום בתכנית", "לשדה `f` אפשר לגשת רק מתוך המחלקה `X`",
        "לשדה `f` אפשר לגשת רק מתוך המחלקות שיורשות מהמחלקה `X` אבל לא מ-`X` עצמה",
        "לשדה `f` אפשר לגשת מתוך המחלקות שיורשות מהמחלקה `X` וגם מ-`X` עצמה"), "b",
    "Official key b. clang++ compile tests: access from outside fails, from inside X compiles, from a derived class fails. Agrees."))

# 10
questions.append(Q(10, "abstract_multiple", "נתונות הגדרות של 5 רשומות:\n" + cb(r'''
class A { public: int x; };
class B : public virtual A {};
class C : public virtual A {};
class D : public A {};
class E : public B, public C, public D {};''') + "\nכמה שדות מטיפוס `int` קיימים באובייקט מטיפוס `E`?",
    txt("1", "2", "3", "אף תשובה אינה נכונה"), "b",
    "Official key b. clang++ run: &e.B::x == &e.C::x and &e.D::x differs -> 2. Agrees."))

# 11
questions.append(Q(11, "inheritance_access", "בתכנית מוגדרות שתי מחלקות `X` ו-`Y`. מה ניתן להגיד על היחס ביניהן בהנחה הקטע הקוד הבא מתקמפל:\n" + cb(r'''
1. Y y;
2. X &x = y;''', "text"),
    txt("המחלקה `X` יורשת מהמחלקה `Y`", "המחלקה `Y` יורשת מהמחלקה `X`", "במחלקה `X` יש שדה מטיפוס `Y`", "במחלקה `Y` יש שדה מטיפוס `X`"), "b",
    "Official key b. clang++ compile tests of the four relations: only 'Y derives from X' lets `X &x = y;` compile. Agrees."))

# 12
questions.append(Q(12, "cpp_basics_refs", PRINTS + "\n" + cb(r'''
int funC(int i=10) {return i+1;}
int funC() {return 8;}
#include <iostream>
void main () { int j= 8; std::cout << funC() << funC(j); }'''),
    txt("התכנית לא עוברת קומפילציה", "`89`", "`88`", "`99`"), "a",
    "Official key a. clang++: call to funC() is ambiguous. Agrees."))

# 13
questions.append(Q(13, "stl_exceptions", "בתכנית מוגדר משתנה `v` מטיפוס `vector<int>`. איזו מהטענות נכונה?",
    txt("`v.begin()==v.end()` אם כמות האיברים בווקטור היא 0", "`v.begin()==v.end()` אם כמות האיברים בווקטור היא 1",
        "כמות האיברים בווקטור מוחזרת ע\"י `v.capacity`", "אף תשובה אינה נכונה"), "a",
    "Official key a. clang++ run: begin()==end() is true for an empty vector, false for a vector of one element; capacity() is not the element count. Agrees."))

# 14
questions.append(Q(14, "const_references", "מה ניתן לכתוב כך שהקוד יעבור קומפילציה\n" + cb(r'''
class A {
int K ;
const int* f(const int *k) const { return _____; }
};'''),
    txt("`this->K`", "`K+*k`", "`&K`", "`*k`"), "c",
    "Official key c. clang++ compile test of each option: only `&K` compiles. Agrees."))

# 15
questions.append(Q(15, "templates", "אילו שורות בתכנית הבאה לא עוברות קומפילציה?\n" + cb(r'''
1. template<typename T> class X {};
2. void main() {
3.     X x;
4.     X x(int);
5.     X x<int>;
6.     X<int> x;
7. }''', "text"),
    txt("שורה 4", "שורות 4 ו-5", "שורות 3, 4 ו-5", "אף תשובה אינה נכונה"), "c",
    "Official key c. clang++ compile test of each statement alone: lines 3, 4 and 5 fail, line 6 compiles. Agrees."))

# 16
questions.append(Q(16, "friend_this_static", "אילו שורות גורמות לשגיאת קומפילציה בקטע הקוד הבא:\n" + cb(r'''
1. class X {
2.     friend class Y;
3.     int a;
4.     void f(Y y) { y.a = 1; }
5. };
6. class Y {
7.     int a;
8.     void f(X x) { x.a = 1; }
9. };''', "text"),
    txt("אף שורה", "שורה 4", "שורה 8", "שורות 4 ו-8"), "b",
    "Official key b. clang++ run (lines tagged): only line 4 fails (Y is incomplete where `f(Y y)` is defined by value); line 8 is fine because X declared Y a friend. Agrees."))

# 17
questions.append(Q(17, "cpp_basics_refs", "נתונות הגדרה של פונקציית `main` והגדרה של פונקציה `f` בה הושמט טיפוס החזרה:\n" + cb(r'''
___ f() {
static int x = 0;
return x;
}
void main() { f() = 5; }''') + "\nמה צריך להיות הטיפוס שהפונקציה `f` מחזירה כדי שהתוכנית תעבור קומפילציה?",
    txt("`int`", "`int*`", "`int&`", "`T`"), "c",
    "Official key c. clang++ compile test: only int& makes `f() = 5;` compile. Agrees."))

# 18
questions.append(Q(18, "virtual_polymorphism", PRINTS + "?\n" + cb(r'''
#include <iostream>
class A {
public:
  virtual void f() { std::cout << "A"; }
};
class B : public A {
public:
  void f() { std::cout << "B"; }
};
void g(A a) { a.f(); }
int main() {
  B b;
  g(b);
}'''),
    txt("`A`", "`B`", "`AB`", "`BA`"), "a",
    "Official key a. clang++ run printed A (slicing). Agrees."))

# 19
questions.append(Q(19, "inheritance_access", "כמה שורות בתכנית לא עוברות קומפילציה?\n" + cb(r'''
class A {};
class B : public A {};
void main() {
A a, *p;
B b, *q;
p = &b;
q = &a;
a = b;
b = a;
}'''),
    txt("0", "1", "2", "3"), "c",
    "Official key c. clang++ run (lines tagged): `q = &a;` and `b = a;` fail. Agrees."))

# 20
questions.append(Q(20, "const_references", "נתונות 4 טענות לגבי הפונקציה `f` במחלקה הבאה:\n" + cb(r'''
class A { public: void f() const {…} …};''') + "\n"
    "(1) את הפונקציה אפשר להפעיל על אובייקט שהוגדר כ-`const`\n"
    "(2) את הפונקציה אפשר להפעיל על אובייקט שלא הוגדר כ-`const`\n"
    "(3) בפונקציה אפשר לשנות שדות שמסומנים כ-`const`\n"
    "(4) בפונקציה אפשר לשנות שדות שלא מסומנים כ-`const`\n"
    "כמה מהטענות נכונות?",
    txt("1", "2", "3", "4"), "b",
    "Official key b. clang++ compile tests: statements 1 and 2 hold; 3 and 4 are errors. Agrees."))

# 21
questions.append(Q(21, "operator_overloading", CMP + ":\n" + cb(r'''
X x;
2 << x;''', "text"),
    txt("להגדיר במחלקה `X` אופרטור `<<` שמקבל פרמטר מטיפוס `int`", "להגדיר במחלקה `X` אופרטור `<<` שמקבל שני פרמטרים: מטיפוס `int` ומטיפוס `X`",
        "להגדיר מחוץ למחלקה `X` אופרטור `<<` שמקבל פרמטר מטיפוס `int` ופרמטר מטיפוס `X`", "תשובות (א) ו-(ג) נכונות"), "c",
    "Official key c. clang++ compile tests: a member operator<<(int) does not make `2 << x` compile (x would have to be the left operand); a two-parameter member is illegal; only the free operator<<(int, X) works. Agrees.",
    lockOrder=True))

# 22
questions.append(Q(22, "composition", PRINTS + "?\n" + cb(r'''
#include <iostream>
int n = 0;
class A {
public:
A() : y(++n), x(++n) { std::cout << x << y; }
int x;
int y;
};
void main() { A a; }'''),
    txt("`11`", "`12`", "`21`", "`22`"), "b",
    "Official key b. clang++ run printed 12 (declaration order: x before y). Agrees."))

# 23
questions.append(Q(23, "const_references", "כמה שורות בקטע תכנית לא עוברות קומפילציה?\n" + cb(r'''
int a = 42, *p;
const int b = 24, *q;
p = &a;
p = &b;
q = &a;
q = &b;'''),
    txt("0", "1", "2", "3"), "b",
    "Official key b. clang++ run (lines tagged): only `p = &b;` fails. Agrees."))

# 24
questions.append(Q(24, "stl_exceptions", PRINTS + " הבאה:\n" + cb(r'''
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
    "Official key a. clang++ run printed 1. Agrees."))

# 25
questions.append(Q(25, "abstract_multiple", "בתכנית מוגדרות שלוש מחלקות:\n" + cb(r'''
class X {
public:
virtual void f() = 0;
};
class Y : public X {
void f() { }
};
class Z : public Y {};''') + "\nאיזו מהטענות נכונה:",
    txt("ניתן ליצור אובייקט מטיפוס `Y` אבל לא מטיפוסים `X` ו-`Z`", "ניתן ליצור אובייקט מטיפוסים `Y` ו-`Z` אבל לא מטיפוס `X`",
        "ניתן ליצור אובייקט מטיפוסים `X`, `Y` ו-`Z`", "לא ניתן ליצור אובייקט מטיפוסים `X`, `Y` ו-`Z`"), "b",
    "Official key b. clang++ compile tests: X is abstract (fails); Y and Z compile. Agrees."))

EXPL = {
    1: "ההגדרה `++x` היא פעולה מסוג prefix. כדי שתתקמפל צריך `operator++` שמופעל על האובייקט עצמו. כפונקציה חברה זה אופרטור ללא פרמטרים (תשובה א). אופרטור חבר עם פרמטר אחד (ג) הוא צורת ה-postfix `x++` ולא `++x`. אופרטור חיצוני ללא פרמטרים (ב) אינו חוקי. הערה: בהרצה גם אופרטור חיצוני `operator++(X&)` עם פרמטר אחד (ד) מתקמפל, אבל הדף הרשמי מסמן את א.",
    2: "`int n = x;` דורש המרה מ-`X` ל-`int`. מי שמגדיר זאת הוא אופרטור המרה (`operator int()`) בתוך `X`, כלומר פונקציה שאינה בנאי (תשובה ב). בנאי ב-`X` מייצר `X` מ-משהו ולא להפך. פונקציה חברה רגילה לא נקראת אוטומטית, ולא ניתן להגדיר פונקציה בתוך הטיפוס `int`.",
    3: "ב-`f` הגישה ל-`y` תקינה, כי פונקציה חברה ניגשת גם לשדות `private` של המחלקה שלה (גם אם `y` מוצהר אחרי הפונקציה). ב-`g` הגישה `c.x` תקינה (`public`) אבל `c.y` שגויה מכיוון ש-`y` הוא `private` וגישה מחוץ למחלקה אסורה. לכן רק `g` (תשובה ג).",
    4: "בפונקציה חברה `const`, הטיפוס של `this` הוא מצביע לאובייקט קבוע: `const A*` (תשובה ד). `A*` הוא הטיפוס בפונקציה רגילה, ו-`this` הוא מצביע ולא הפניה (ג שגויה).",
    5: "בירושה `protected` החבר הציבורי `I` של `A` הופך ל-`protected` ב-`B`, ולכן `tt.I` בשורה 7 אסור מחוץ למחלקה. `t.I` (שורה 6) תקין כי `t` מטיפוס `A`. השורות 2 ו-5 תקינות. לכן רק שורה 7 (תשובה ד).",
    6: "השאלה לא נפתרת כפי שהודפסה: בשורה 9 משווים `&x`, שהוא מצביע `X*`, עם `x.f()`, שהוא הפניה `X&` לאובייקט, ואין השוואה כזאת. לכן בכל אחת מארבע האפשרויות התכנית לא מתקמפלת. עם ההשוואה המתוקנת `&x == &x.f()` האפשרות `*this` מדפיסה 1. אין סימון בדף ולכן השאלה מוחזקת.",
    7: "לכל מופע של התבנית יש משתנה סטטי `d` משלו. `a` ו-`b` הם `X<0>` וחולקים `d` שהגיע ל-2, ו-`c` הוא `X<1>` עם `d` שהגיע ל-1. הפלט `221` (תשובה ג).",
    8: "האופרטור `>>` לקריאה מ-`cin` (`cin >> x`) חייב להיות פונקציה חיצונית, כי האופרנד השמאלי הוא `istream` ולא `X`. אם הפונקציה משתמשת רק בחברים ציבוריים לא חייבים להצהיר עליה כ-`friend` (תשובה ג). `friend` נחוץ רק לגישה לחברים פרטיים.",
    9: "שדה `private` נגיש רק מתוך המחלקה עצמה (ומחברים שהוכרזו `friend`). מחלקות יורשות אינן ניגשות אליו, ובוודאי שלא קוד חיצוני. לכן התשובה ב. התשובות ג ו-ד שגויות כי מחלקה יורשת אינה ניגשת לשדה פרטי של הבסיס.",
    10: "`B` ו-`C` יורשות את `A` ירושה וירטואלית ולכן חולקות עותק אחד של `x` ב-`E`, ו-`D` יורשת את `A` ירושה רגילה ומוסיפה עותק נוסף. סך הכול שני שדות `int` (תשובה ב). בהרצה הכתובות של `e.B::x` ושל `e.C::x` זהות, ושל `e.D::x` שונה.",
    11: "השורה `X &x = y;` מתקמפלת רק אם אפשר להמיר את `Y` ל-`X&`, וזה חוקי כשהמחלקה `Y` יורשת מ-`X` (תשובה ב). שדה מטיפוס אחר בתוך המחלקה לא יוצר המרה, וכיוון הירושה ההפוך (א) לא מתקמפל.",
    12: "הקריאה `funC()` עמומה: גם `funC(int i=10)` (עם ערך ברירת מחדל) וגם `funC()` מתאימות בלי ארגומנטים. הקומפיילר לא יכול לבחור ולכן התכנית לא מתקמפלת (תשובה א).",
    13: "בווקטור ריק `begin()==end()`, ולכן הטענה הראשונה נכונה (תשובה א). בווקטור עם איבר אחד הם שונים (ב שגויה). `capacity` היא הקיבולת ולא מספר האיברים, ומספר האיברים נתון ב-`size()` (ג שגויה, וגם נכתבה בלי סוגריים).",
    14: "הפונקציה `f` היא `const`, ולכן `K` בתוכה הוא `const int`. הביטוי `&K` הוא `const int*`, בדיוק טיפוס ההחזרה, ומתקמפל (תשובה ג). `this->K`, `K+*k` ו-`*k` הם `int` ולא מצביע, ולכן שגיאת המרה.",
    15: "תבנית מחלקה חייבת לקבל ארגומנט תבנית כדי ליצור משתנה. שורה 3 (`X x;`) שגויה כי חסר `<int>`. שורה 4 (`X x(int);`) שגויה מאותה סיבה, ושורה 5 (`X x<int>;`) היא תחביר לא חוקי. שורה 6 (`X<int> x;`) תקינה. לכן שורות 3, 4 ו-5 (תשובה ג).",
    16: "בשורה 4 הפונקציה `f` מקבלת `Y` לפי ערך בעוד `Y` עדיין לא מוגדרת (רק הוצהרה כ-friend), ולכן הטיפוס אינו שלם והשורה שגויה. בשורה 8 `Y` היא חברה (friend) של `X` ולכן יכולה לגשת ל-`x.a`, והשורה תקינה. רק שורה 4 (תשובה ב).",
    17: "השמה `f() = 5;` דורשת ש-`f()` תחזיר ערך שמאלי (lvalue). רק הפניה `int&` להחזרת `x` (משתנה סטטי שחי אחרי היציאה) עושה זאת (תשובה ג). `int` ו-`int*` מחזירים ערך זמני שאי אפשר להשים אליו, ו-`T` אינו טיפוס מוגדר.",
    18: "`g` מקבלת `A` לפי ערך, ולכן האובייקט `b` נחתך (slicing) ל-`A`, והקריאה `a.f()` מופעלת על אובייקט מטיפוס `A`. מודפס `A` (תשובה א). `B` היה מודפס רק אילו `g` הייתה מקבלת הפניה או מצביע.",
    19: "`p = &b` תקין (מצביע לנגזרת הומר למצביע לבסיס). `q = &a` שגוי (אין המרה מבסיס לנגזרת). `a = b` תקין (slicing). `b = a` שגוי (אין השמה של `A` ל-`B`). שתי שורות (תשובה ג).",
    20: "פונקציה `const` אפשר להפעיל על אובייקט `const` וגם על אובייקט רגיל (טענות 1 ו-2 נכונות). בפונקציה `const` אי אפשר לשנות שדה רגיל (4 שגויה) ואי אפשר לשנות שדה `const` בשום מקרה (3 שגויה). שתי טענות נכונות (תשובה ב).",
    21: "בביטוי `2 << x` האופרנד השמאלי הוא `int`, ולכן לא ניתן להגדיר את האופרטור בתוך `X` (אופרטור חבר נקרא על האופרנד השמאלי). צריך אופרטור חיצוני שמקבל `(int, X)` (תשובה ג). אופרטור חבר עם שני פרמטרים אינו חוקי לאופרטור בינארי, ולכן ב ו-א אינן נכונות, וגם ד.",
    22: "השדות מאותחלים לפי סדר ההצהרה במחלקה (קודם `x` ואז `y`) ולא לפי סדר רשימת האיתחול. `x` מקבל 1 ו-`y` מקבל 2, והפלט `12` (תשובה ב).",
    23: "`p` הוא `int*` ולא יכול להצביע על `b` הקבוע (שורה `p = &b` שגויה). `q` הוא `const int*` ויכול להצביע גם על `a` וגם על `b`. שורה אחת (תשובה ב).",
    24: "`it++` מחזיר את הערך הקודם של האיטרטור (שמצביע על האיבר הראשון), ולכן `*(it++)` הוא `1`. הפלט `1` (תשובה א). הערך 4 הוא האיבר שהאיטרטור מצביע עליו אחרי ההגדלה.",
    25: "`X` מופשטת (`f()=0`) ולא ניתן ליצור ממנה אובייקט. `Y` דורסת את `f` ולכן אינה מופשטת, ו-`Z` יורשת את המימוש של `Y` ולכן גם היא ניתנת ליצירה. התשובה היא ב. הגדרת `f` ב-`Y` בלי `public` לא משפיעה על היכולת ליצור אובייקט.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "19A-C",
    "examLabel": "2019 סמסטר א מועד ג",
    "year": 2019,
    "examDate": "27.05.2019",
    "sourceFile": "2019/סמ׳ א מועד ג + פתרון.pdf",
    "keyFile": "2019/סמ׳ א מועד ג + פתרון.pdf (official correct options highlighted in yellow)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
