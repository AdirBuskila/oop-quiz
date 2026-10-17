# -*- coding: utf-8 -*-
"""Generator for tools/raw/19A-B.json -- oop (61307), 2019 semester A, moed B (28/03/2019).
Run: PYTHONUTF8=1 py tools/gen/gen_19A-B.py

Source: 12-page paper (25 MCQ, 4 options) with the official correct option highlighted in yellow (page 12 is a scratch page, page 1 the answer sheet).
Every code question was compiled/run with clang++ (tools/verify/19A-B/check.py); all 25 results agree with the highlighted key.
`void main` in the exam is MSVC style; the harness rewrites it to `int main` for clang."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "19A-B.json"
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
questions = []

# 1
questions.append(Q(1, "cpp_basics_refs", PRINTS + "\n" + cb(r'''
#include <iostream>
int f(char c, int i) {return i++;}
int &f(int &i, char c) {return ++i;}
void main() {int x=4; std::cout << f(x,'x'); std::cout<< f('x',x); }'''),
    txt("התכנית לא עוברת קומפילציה", "`45`", "`44`", "`55`"), "d",
    "Official key d. clang++ run printed 55. Agrees."))

# 2
questions.append(Q(2, "cpp_basics_refs", PRINTS + "\n" + cb(r'''
int funC(int i=10) {return i+1;}
int funC() {return 8;}
#include <iostream>
void main () { int j= 8; std::cout << funcC() << funC(j); }'''),
    txt("התכנית לא עוברת קומפילציה", "`89`", "`88`", "`99`"), "a",
    "Official key a. clang++: compile error (funcC undeclared). With the typo fixed the call funC() is still ambiguous (also a compile error). Agrees."))

# 3
questions.append(Q(3, "cpp_basics_refs", PRINTS + "?\n" + cb(r'''
#include <iostream>
using namespace std;
void f(int i, double j) { cout << i << j << endl; }
void f(double i, int j) { cout << j << i << endl; }
void main() {
int i = 1, j = 2;
f(i, j);
}'''),
    txt("`12`", "`21`", "`1221`", "התכנית לא עוברת קומפילציה"), "d",
    "Official key d. clang++: call to 'f' is ambiguous. Agrees."))

# 4
questions.append(Q(4, "cpp_basics_refs", PRINTS + "?\n" + cb(r'''
#include <iostream>
using namespace std;
class X {
public:
X(int i) { n=i; }
int & f() { return n; }
private:
int n;
};
int main() {
X x1(5);
int &j = x1.f();
j += 2;
cout << j << x1.f() << endl;
}'''),
    txt("`57`", "`77`", "`75`", "התכנית גורמת לשגיאת קומפילציה/זמן ריצה"), "b",
    "Official key b. clang++ run printed 77. Agrees."))

# 5
questions.append(Q(5, "virtual_polymorphism", PRINTS + "?\n" + cb(r'''
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

# 6
questions.append(Q(6, "inheritance_access", "נתונות הגדרות של שתי מחלקות:\n" + cb(r'''
class A {…};
class B : private A { void f() {...} …};''') + "\nלאילו משתנים של המחלקה `A` הפונקציה `f` יכולה לגשת?",
    txt("רק לאלו שמוגדרים `public`", "רק לאלו שמוגדרים `protected`", "תשובות (א) ו-(ב) נכונות", "אף תשובה אינה נכונה"), "c",
    "Official key c. clang++ (compile test, class B : private A): B::f reaches public and protected members of A, not private. Agrees.",
    lockOrder=True))

# 7
questions.append(Q(7, "const_references", "מה הטיפוס של `this` בפונקציה `f` במחלקה הבאה?\n" + cb(r'''
class A { void f() const {…} };'''),
    txt("`A`", "`A*`", "`const A&`", "`const A*`"), "d",
    "Official key d. clang++ static_assert on decltype(this) inside a const member: const A* accepted, A*, A& and A rejected. Agrees."))

# 8
questions.append(Q(8, "templates", PRINTS + "?\n" + cb(r'''
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

# 9
questions.append(Q(9, "virtual_polymorphism", PRINTS + "?\n" + cb(r'''
#include <iostream>
class B
{ public: virtual void disp() { std::cout<<"B"; } };
class D : public B
{ public:
  void disp()
{ std::cout<<"D"; } };
void main(){
    D d;
    d.disp();
    D *pd=&d;
    pd->disp();
    B *pb=pd;
    pb->disp();
}'''),
    txt("התכנית לא עוברת קומפילציה", "`DDB`", "`DDD`", "`BBB`"), "c",
    "Official key c. clang++ run printed DDD. Agrees."))

# 10
questions.append(Q(10, "abstract_multiple", "נתונות הגדרות של 5 רשומות:\n" + cb(r'''
struct A { int x; };
struct B : virtual A {};
struct C : virtual A {};
struct D : A {};
struct E : B, C, D {};''') + "\nכמה שדות מטיפוס `int` קיימים באובייקט מטיפוס `E`?",
    txt("1", "2", "3", "אף תשובה אינה נכונה"), "b",
    "Official key b. clang++ run: &e.B::x == &e.C::x (shared virtual A) and &e.D::x differs -> 2 distinct int fields; plain e.x is ambiguous. Agrees."))

# 11
questions.append(Q(11, "inheritance_access", "אילו שורות בתכנית הבאה גורמות לשגיאת קומפילציה?\n" + cb(r'''
1    class A { public: int I;};
2    class B : protected A { private: int J;};
3    void main () {
4      A t;
5      B tt;
6      t.I = 3;
7      tt.I = 3;
8    }''', "text"),
    txt("אף שורה", "שורות 2 ו-6", "שורות 2 ו-5", "שורה 7"), "d",
    "Official key d. clang++ run (lines tagged): only line 7 fails (protected inheritance hides I). Agrees."))

# 12
questions.append(Q(12, "friend_this_static", PRINTS + " הבאה?\n" + cb(r'''
#include <iostream>
static int K = 1;
struct A {
static int K;
    A(){K++;}
};
int A::K = 1;
void main () {
A a;
A *b=&a;
A &c=*b;
std::cout << K << c.K << A::K;
}'''),
    txt("התכנית לא עוברת קומפילציה", "`132`", "`211`", "`122`"), "d",
    "Official key d. clang++ run printed 122. Agrees."))

# 13
questions.append(Q(13, "const_references", "מה ניתן לכתוב כך שהקוד יעבור קומפילציה\n" + cb(r'''
class A {
int K ;
const int* f(const int *k) const { return _____; }
};'''),
    txt("`this->K`", "`K+*k`", "`&K`", "`*k`"), "c",
    "Official key c. clang++ compile test of each option: only `&K` compiles. Agrees."))

# 14
questions.append(Q(14, "construction_order", PRINTS + " הבאה?\n" + cb(r'''
#include  <iostream>
class A {
public:
A(int) {std::cout << " A int ";}
A() {std::cout << "A empty ";}
~A() {std::cout << " destroy A";}
};
class B : public A{
public:
B(int) {std::cout << "B int ";}
B() {std::cout << "B empty ";}
~B() {std::cout << " destroy B";}
};
void main() {
B *b;
A a(3);
b = new B();
A *ap=b;
delete ap;
}'''),
    txt("`A int B empty destroy A destroy B destroy B`", "`A int A empty B empty  destroy A destroy A`",
        "`B int A int destroy A destroy B`", "`A int B int destroy A destroy B destroy A`"), "b",
    "Official key b. clang++ run printed ` A int A empty B empty  destroy A destroy A`. Agrees. (The exam prints curly quotes in the string literals; straight quotes were used to compile.)"))

# 15
questions.append(Q(15, "abstract_multiple", "בקטע הקוד הבא:\n" + cb(r'''
1.  #include <iostream>
2.  using namespace std;
3.  class X {
4.  public:
5.   X(int i = 0) { nx = i; }
6.   virtual void f() = 0;
7.   int nx;
8.  };
9.  class Y : public X {
10.  public:
11.   Y(int i = 0, int j=0) : X(i), ny(j) { }
12.   virtual void f() { cout << "Y" << ny; }
13.   int ny;
14.  };
15.  int main() {
16.   X *x[2];
17.   x[0] = new X(1);
18.   x[1] = new Y(2, 3);
19.   X x2(2);
20.  }''', "text"),
    txt("מתקבלת שגיאת קומפילציה בשורות 16,17,18,19", "מתקבלת שגיאת קומפילציה בשורות 17,18,19",
        "מתקבלת שגיאת קומפילציה בשורות 17,19", "לא מתקבלת שגיאת קומפילציה"), "c",
    "Official key c. clang++ run (lines tagged): errors on 17 and 19 only (abstract X). Agrees."))

# 16
questions.append(Q(16, "composition", PRINTS + "?\n" + cb(r'''
#include <iostream>
using namespace std;
class X {
public:
X(int i = 0) : nx(i) { cout << 1; }
int nx;
};
class Y {
public:
Y(int i = 0) : ny(i) { onx=X(i); }
int ny;
X onx;
};
int main() {
Y y1(2);
y1.onx.nx = 3;
}'''),
    txt("`1`", "`11`", "`13`", "`111`"), "b",
    "Official key b. clang++ run printed 11. Agrees."))

# 17
questions.append(Q(17, "const_references", "נתונות 4 טענות לגבי הפונקציה `f` במחלקה הבאה:\n" + cb(r'''
class A { public: void f() const {…} …};''') + "\n"
    "(1) את הפונקציה אפשר להפעיל על אובייקט שהוגדר כ-`const`\n"
    "(2) את הפונקציה אפשר להפעיל על אובייקט שלא הוגדר כ-`const`\n"
    "(3) בפונקציה אפשר לשנות שדות שמסומנים כ-`const`\n"
    "(4) בפונקציה אפשר לשנות שדות שלא מסומנים כ-`const`\n"
    "כמה מהטענות נכונות?",
    txt("1", "2", "3", "4"), "b",
    "Official key b. clang++ compile tests: statements 1 and 2 hold; modifying a const field (3) or a plain field inside a const member (4) is an error. Agrees."))

# 18
questions.append(Q(18, "const_references", "כמה שורות בקטע תכנית לא עוברות קומפילציה?\n" + cb(r'''
int a = 42, *p;
const int b = 24, *q;
p = &a;
p = &b;
q = &a;
q = &b;'''),
    txt("0", "1", "2", "3"), "b",
    "Official key b. clang++ run (lines tagged): only `p = &b;` fails. Agrees."))

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
questions.append(Q(20, "abstract_multiple", "כמה מהשורות 7-9 עוברות קומפילציה ומשימות 42 לשדה `x` של המחלקה `C` במשתנה `d`?\n" + cb(r'''
1. class A { public: int x; };
2. class B : public A {};
3. class C : public A {};
4. class D : public B, public C {};
5. void main() {
6.     D d;
7.     d.C::x = 42;
8.     ((C)d).x = 42;
9.     ((C*)&d)->x = 42;
10. }''', "text"),
    txt("0", "1", "2", "3"), "c",
    "Official key c. clang++ run: line 7 and line 9 compile and set the C::x subobject of d to 42; line 8 does not compile under clang++ (assignment to a member of a temporary copy `(C)d`: expression is not assignable), and would only change a copy anyway. -> 2. Agrees."))

# 21
questions.append(Q(21, "composition", PRINTS + "?\n" + cb(r'''
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
    "Official key b. clang++ run printed 12 (members are initialised in declaration order, x before y). Agrees."))

# 22
questions.append(Q(22, "operator_overloading", "באילו מקרים ניתן להגדיר אופרטור בינארי בתוך המחלקה `X`?",
    txt("כאשר `X` הוא הטיפוס של האופרנד השמאלי אבל לא הימני", "כאשר `X` הוא הטיפוס של האופרנד הימני אבל לא השמאלי",
        "כאשר `X` הוא הטיפוס של האופרנד השמאלי", "כאשר `X` הוא הטיפוס של האופרנד הימני"), "c",
    "Official key c. clang++ compile tests with a member operator+: `x + 1` and `x + x` compile, `1 + x` does not. Agrees."))

# 23
questions.append(Q(23, "operator_overloading", "מה נכון לגבי הגדרת האופרטור `<<` עבור המחלקה `X`?",
    txt("הפונקציה צריכה להיות מוגדרת בתוך `X`", "הפונקציה צריכה להיות מוגדרת מחוץ ל-`X` ובהכרח צריכה להיות מוגדרת כ-`friend` ב-`X`",
        "הפונקציה צריכה להיות מוגדרת מחוץ ל-`X` ולא בהכרח צריכה להיות מוגדרת כ-`friend` ב-`X`",
        "הפונקציה צריכה להיות מוגדרת גם בתוך `X` וגם מחוץ ל-`X`"), "c",
    "Official key c. clang++ compile tests: a member operator<< does not make `cout << x` compile; a free function using only public members compiles without friend. Agrees."))

# 24
questions.append(Q(24, "inheritance_access", "נתונה תכנית עם קטעי קוד מושמטים. חלק מהקטעים המושמטים מסומנים בספרות רומיות I, II ו-III.\n" + cb(r'''
1. class A {...};
2. class B : public A {… I ...};
3. class C : public B {… II ...};
4. void main() { … III ... }''', "text") +
    "\nבשורה 2 החלפנו את המילה `public` ב-`protected` וכעת יש בתכנית שורת קוד שלא עוברת קומפילציה באחד מהקטעים המושמטים. מה נכון לגבי הימצאות השורה שגורמת לשגיאת קומפילציה?",
    txt("היא יכולה להימצא בקטע I", "היא יכולה להימצא בקטע II אבל לא בקטעים I ו-III",
        "היא יכולה להימצא בקטע III אבל לא בקטעים I ו-II", "היא יכולה להימצא בקטעים II ו-III אבל לא בקטע I"), "c",
    "Official key c. clang++ compile tests with class B : protected A: access to A's public member compiles inside B (I) and inside C (II), fails in main (III). Agrees.",
    lockOrder=True))

# 25
questions.append(Q(25, "stl_exceptions", "ידוע שטיפוס המשתנה `v` הוא `vector<int>` וכן ש-`v.size()==0`. מה מהבאים נכון?",
    txt("בהכרח `v.end()==v.begin()+0`", "בהכרח `v.end()==v.begin()+1`", "בהכרח `v.begin()==v.end()+1`", "אף תשובה אינה נכונה"), "a",
    "Official key a. clang++ run: v.end()==v.begin()+0 is true for an empty vector. Agrees."))

EXPL = {
    1: "שתי הקריאות: `f(x,'x')` מתאימה במדויק ל-`f(int&, char)` (הפניה ל-`x`), שמעלה את `x` ל-5 ומחזירה אותו. `f('x',x)` מתאימה במדויק ל-`f(char, int)`, שמחזירה את `i++` כלומר 5 (הערך לפני ההגדלה).\nהפלט הוא `55` (תשובה ד). `45` ו-`44` מניחים שאחת הקריאות נבחרת אחרת, והתכנית כן עוברת קומפילציה כי אין עמימות.",
    2: "בקוד כתוב `funcC()` (עם c נוסף) ואילו הפונקציה מוגדרת בשם `funC`. השם `funcC` לא מוכר, ולכן שגיאת קומפילציה (תשובה א). גם אם מתקנים את שגיאת ההקלדה, הקריאה `funC()` עמומה בין `funC(int i=10)` לבין `funC()`, ולכן הקוד לא מתקמפל בכל מקרה. הפלטים `89`, `88` ו-`99` מניחים שהתכנית מתקמפלת.",
    3: "הקריאה `f(i, j)` עם שני `int` דורשת המרה אחת בכל אחת משתי ההעמסות: בהעמסה הראשונה `j` הופך ל-`double`, בשנייה `i` הופך ל-`double`. אף העמסה לא טובה יותר בשני הארגומנטים, ולכן הקריאה עמומה (ambiguous) והתכנית לא מתקמפלת (תשובה ד). `12`, `21` ו-`1221` מניחים שנבחרה העמסה אחת או ששתיהן רצות.",
    4: "`f` מחזירה הפניה ל-`n`, ו-`j` הוא כינוי ל-`n` של `x1`. הפעולה `j += 2` משנה את `n` ל-7, ולכן גם `j` וגם `x1.f()` מציגים 7. הפלט הוא `77` (תשובה ב). `57` ו-`75` מניחים ש-`j` הוא עותק ולא הפניה.",
    5: "הפונקציה `g` מקבלת `A` לפי ערך, ולכן `b` מועתק ל-`A` ונחתך (slicing): נשאר אובייקט מטיפוס `A` בלבד. הקריאה `a.f()` על אובייקט (לא על הפניה או מצביע) נפתרת לפי הטיפוס `A`, ולכן מודפס `A` (תשובה א). הדפסת `B` הייתה קורית רק אם `g` הייתה מקבלת הפניה או מצביע.",
    6: "פונקציה של `B` יכולה לגשת לחברי `public` ול-`protected` של הבסיס `A`, גם בירושה `private` (הירושה רק משנה את הנגישות מבחוץ). לכן שתי הטענות א ו-ב נכונות, והתשובה היא ג. חברי `private` של `A` אינם נגישים ל-`B` בשום סוג ירושה.",
    7: "בפונקציה חברה שמוגדרת `const`, `this` הוא מצביע לאובייקט קבוע: `const A*`. לכן התשובה ד. `A*` הוא הטיפוס של `this` בפונקציה שאינה `const`, `this` הוא מצביע ולא הפניה (ג שגויה), ו-`A` לבדו אינו מצביע.",
    8: "לכל מופע של התבנית (`X<0>`, `X<1>`) יש משתנה סטטי `d` נפרד. `a` ו-`b` הם מטיפוס `X<0>` ולכן חולקים את אותו `d`, שגדל ל-2. `c` מטיפוס `X<1>` ויש לו `d` משלו, שגדל ל-1. ההדפסה היא `a.d` אחרי שנבנו כולם: `2`, `2`, `1`, כלומר `221` (תשובה ג).",
    9: "`disp` וירטואלית ב-`B` ו-`D` דורסת אותה. הקריאה דרך האובייקט `d.disp()` מדפיסה `D`, דרך מצביע `D*` מדפיסה `D`, ודרך מצביע `B*` שמצביע על אובייקט מטיפוס `D` נבחרת הגרסה לפי הטיפוס הדינמי, כלומר `D`. הפלט `DDD` (תשובה ג). `DDB` ו-`BBB` מניחים שאין קריאה וירטואלית.",
    10: "ל-`B` ול-`C` יש בסיס וירטואלי `A` משותף, ולכן הם תורמים ל-`E` עותק אחד של `A::x`. `D` יורשת את `A` ירושה רגילה ומוסיפה עותק נוסף. בסך הכול שני שדות `int` (תשובה ב). בהרצה הכתובות של `e.B::x` ושל `e.C::x` זהות, וזו של `e.D::x` שונה; הגישה הפשוטה `e.x` עמומה.",
    11: "ב-`B` הירושה היא `protected`, ולכן החבר הציבורי `I` של `A` הופך ל-`protected` ב-`B` ואי אפשר לגשת אליו מחוץ למחלקה. שורה 6 (`t.I`, אובייקט מטיפוס `A`) תקינה. שורה 7 (`tt.I`) שגויה. שורות 2 ו-5 תקינות. לכן רק שורה 7 (תשובה ד).",
    12: "בתוך `main` השם `K` מתייחס למשתנה הגלובלי, שנשאר 1. `c.K` ו-`A::K` הם אותו משתנה סטטי של `A`, שהתחיל ב-1 ועלה ל-2 כשנבנה `a`. הפלט `1` ואז `2` ואז `2`, כלומר `122` (תשובה ד).",
    13: "הפונקציה `f` היא `const`, ולכן בתוכה `K` נחשב `const int`. הביטוי `&K` הוא `const int*`, בדיוק טיפוס ההחזרה, ולכן מתקמפל (תשובה ג). `this->K` ו-`*k` הם `int` ולא מצביע, ו-`K+*k` הוא `int`. כל אחד מהם גורם לשגיאת המרה.",
    14: "`A a(3)` מדפיס ` A int `. `new B()` בונה קודם את הבסיס בבנאי ברירת המחדל שלו (כי `B()` לא מציין בנאי אחר): `A empty `, ואז `B empty `. `delete ap` על מצביע `A*` כשההורס אינו וירטואלי מפעיל רק את `~A`: ` destroy A`. בסוף `main` נהרס `a`: ` destroy A`. הפלט הוא ` A int A empty B empty  destroy A destroy A` (תשובה ב). `~B` לא רץ בכלל.",
    15: "`X` מופשטת (`f()=0`), ולכן אסור ליצור ממנה אובייקט: שורה 17 (`new X(1)`) ושורה 19 (`X x2(2)`) הן שגיאות. מצביע ל-`X` (שורה 16) תקין, ו-`new Y(2,3)` (שורה 18) תקין כי `Y` ממשת את `f`. התשובה היא שורות 17,19 (ג).",
    16: "בבנאי של `Y`, השדה `onx` נבנה קודם ברשימת האיתחול בבנאי ברירת המחדל של `X` (מדפיס `1`), ואז `X(i)` יוצר זמני שמדפיס `1` נוסף, ומועתק ל-`onx`. בסך הכול `11` (תשובה ב). השורה `y1.onx.nx = 3` לא מדפיסה דבר.",
    17: "פונקציה `const` אפשר להפעיל גם על אובייקט `const` וגם על אובייקט רגיל, ולכן טענות 1 ו-2 נכונות. בתוך פונקציה `const` אי אפשר לשנות אף שדה (גם לא שדה שאינו `const`, אלא אם הוא `mutable`), ולכן טענה 4 שגויה, וגם טענה 3 שגויה (שדה `const` אי אפשר לשנות בשום פונקציה). בסך הכול שתי טענות (תשובה ב).",
    18: "`p` הוא `int*` ו-`q` הוא `const int*`. `p = &a` תקין. `p = &b` שגוי, כי `b` קבוע ו-`int*` אינו יכול להצביע על קבוע. `q = &a` ו-`q = &b` תקינים (מצביע לקבוע יכול להצביע גם על לא קבוע). שורה אחת (תשובה ב).",
    19: "`p = &b` תקין (מצביע לנגזרת הומר למצביע לבסיס). `q = &a` שגוי (אין המרה מבסיס לנגזרת). `a = b` תקין (slicing). `b = a` שגוי (אין השמה של `A` לתוך `B`). שתי שורות (תשובה ג).",
    20: "שורה 7: `d.C::x` מציין במפורש את ה-`x` של התת-אובייקט `C` בתוך `d`, ולכן תקינה ומשנה אותו. שורה 9: ההמרה ל-`C*` מצביעה על התת-אובייקט `C` של `d`, ולכן גם היא תקינה ומשנה אותו. שורה 8: `(C)d` יוצר עותק זמני, ושינוי שדה שלו אינו חוקי (clang מדווח `expression is not assignable`), ובכל מקרה לא היה משנה את `d`. לכן 2 שורות (תשובה ג).",
    21: "השדות מאותחלים לפי סדר ההצהרה במחלקה ולא לפי סדר רשימת האיתחול: קודם `x` (מקבל 1) ואז `y` (מקבל 2). ההדפסה `x` ואז `y`: `12` (תשובה ב). `21` הייתה נכונה אילו האיתחול היה לפי סדר הרשימה.",
    22: "אופרטור בינארי שמוגדר כפונקציה חברה ב-`X` נקרא על האופרנד השמאלי, ולכן האופרנד השמאלי חייב להיות מטיפוס `X` (התשובה ג). הטיפוס של האופרנד הימני אינו מוגבל. בהרצה `x + 1` ו-`x + x` מתקמפלים, ו-`1 + x` לא.",
    23: "האופרטור `<<` לפלט (`cout << x`) חייב להיות פונקציה חיצונית, כי האופרנד השמאלי הוא `ostream`. אם הפונקציה משתמשת רק בחברים ציבוריים אין צורך ב-`friend` (תשובה ג). `friend` נדרש רק כשצריך גישה לחברים פרטיים. גרסה חברה בתוך `X` הייתה מאפשרת רק `x << cout`.",
    24: "בירושה `protected` חברי `public` של `A` הופכים ל-`protected` ב-`B`. בתוך `B` (קטע I) וגם בתוך `C` שיורשת מ-`B` (קטע II) עדיין אפשר לגשת אליהם. רק מחוץ למחלקות, ב-`main` (קטע III), הגישה נחסמת. לכן השגיאה יכולה להופיע רק בקטע III (תשובה ג).",
    25: "בווקטור ריק `begin()` ו-`end()` שווים, ולכן `v.end()==v.begin()+0` נכון תמיד (תשובה א). `v.begin()+1` הוא מעבר לסוף, כך ששתי הטענות האחרות שגויות.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "19A-B",
    "examLabel": "2019 סמסטר א מועד ב",
    "year": 2019,
    "examDate": "28.03.2019",
    "sourceFile": "2019/סמ׳ א מועד ב + פתרון.pdf",
    "keyFile": "2019/סמ׳ א מועד ב + פתרון.pdf (official correct options highlighted in yellow)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
