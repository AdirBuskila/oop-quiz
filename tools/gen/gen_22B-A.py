# -*- coding: utf-8 -*-
"""Generator for tools/raw/22B-A.json -- oop (61307), 2022 semester B, moed A (19/06/2022).
Run: PYTHONUTF8=1 py tools/gen/gen_22B-A.py

Source: 15-page text PDF, 15 MCQ x 7 pts (3 or 4 options, Q2 option c is an image of the printed listing, transcribed as text).
The paper carries NO answer key. Per GATE1 the keys are derived by compiling/running each item with clang++
(tools/verify/22B-A/, run_all.py), answerSource "solved", official false.
Held: Q6 (the key depends on whether f4's by-value return counts as a copy; clang++ elides it by default, so the run cannot decide)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "22B-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, conf="high", **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "contextId": "notes",
         "answerSource": "solved", "official": False, "confidence": conf, "explanation": "", "note": note}
    if correct:
        q["correctId"] = correct
    q.update(kw)
    return q


OUTQ = "מה מדפיסה התכנית הבאה ?\n"
ERRQ = "בכמה שורות בקטע הקוד הבא יש שגיאות ?\n"
questions = []

questions.append(Q(
    1, "classes_ctor_dtor", "להלן הגדרה חלקית של מחלקה `X`:\n" + cb(r'''
class X {
public:
     int nx;
     X(int i) : nx(i) {}
     X() {}
     ...
};''') + "\nהשורה `X(){}` בהגדרה הנ\"ל, נחוצה",
    txt("כדי לאפשר להגדיר `X x1;`", "כדי לאפשר ליצור מערך של אובייקטים של המחלקה `X` בעזרת האופרטור `new`", "תשובות א ו-ב נכונות."),
    "c", "No key. clang++: without `X(){}` both `X x1;` and `new X[3]` fail to compile; with it both compile -> c."))

questions.append(Q(
    2, "virtual_polymorphism", OUTQ + cb(r'''
class B{
public:
     B();
     virtual void p() const;
     void q() const;
};
B::B() {}
void B::p() const{
     cout << "B::p\n";
}
void B::q() const{
     cout << "B::q\n";
}

class D : public B{
public:
     D();
     virtual void p() const;
     void q() const;
};
D::D(){
}
void D::p() const{
     cout << "D::p\n";
}
void D::q() const{
     cout << "D::q\n";
}
int main(){
     B b;
     D d;
     B* pb = new B;
     B* pd = new D;
     D* pd2 = new D;
     b.p(); b.q();
     d.p(); d.q();
     pb->p(); pb->q();
     pd->p(); pd->q();
     pd2->p(); pd2->q();
     return 0;
}'''),
    [{"id": "a", "type": "text", "value": "התכנית לא עוברת קומפילציה"},
     {"id": "b", "type": "text", "value": "אף תשובה אינה נכונה"},
     {"id": "c", "type": "text", "value": cb("B::p\nB::q\nD::p\nD::q\nB::p\nB::q\nD::p\nB::q\nD::p\nD::q", "")}],
    "c", "No key. clang++ run printed exactly the listing of option c (the only virtual call through B* that reaches D is `pd->p()`; `pd->q()` is non-virtual and prints B::q)."))

questions.append(Q(
    3, "virtual_polymorphism", OUTQ + cb(r'''
class Base {
     virtual void method() { std::cout << "from Base" << std::endl; }
public:
     virtual ~Base() { method(); }
     void baseMethod() { method(); }
};
class A : public Base {
     void method() { std::cout << "from A" << std::endl; }
public:
     ~A() { method(); }
};
int main(void) {
     Base* base = new A;
     base->baseMethod();
     delete base;
     return 0;
}'''),
    txt(cb("from A\nfrom A\nfrom Base", ""), cb("from A\nfrom Base\nfrom Base", ""), cb("from Base\nfrom A\nfrom Base", "")),
    "a", "No key. clang++ run printed `from A / from A / from Base` (option a)."))

questions.append(Q(
    4, "copy_control", "נניח ש- `p1,p2,p3` הם מצביעים לאובייקטים של המחלקה `A`. נניח שבבנאי המחלקה `A` יש הקצאות זיכרון דינאמיות. כדי שאפשר יהיה לבצע השמה מהסוג:\n`*p1=*p2=*p2`",
    txt("רצוי להגדיר פונקציה `A& operator=(const A& a)` במחלקה `A`.", "רצוי להגדיר פונקציה `A* operator=(const A& a)` במחלקה `A`.",
        "אין צורך להגדיר העמסת אופרטורים להשמה בין שני אוביקטים של המחלקה `A`."),
    "a", "No key. Probes: with `A& operator=` the chain compiles and (with a deep copy) no double delete; with `A* operator=` the chain does not compile "
    "(the middle result is a pointer); with no operator= it compiles but the shallow copy double-deletes the array.", conf="med"))

questions.append(Q(
    5, "inheritance_access", "נניח שקיימות 4 מחלקות לא אבסטרקטיות, שיחסי הירושה ביניהן הם כפי שמתואר להלן:\n" + cb(r'''
class X {... };
class Y : public X {... };
class Z : private Y {... };
class W : public Z {... };''') + "\nנניח שבמחלקה `X` מוגדרת פונקציה ציבורית (`public`) בשם `f()` שאינה מוגדרת באף אחת מהמחלקות האחרות. נניח שבפונקציה חברה (`member function`) של המחלקה `W` מגדירים אובייקט של המחלקה `W` בשם `w1` ולאחר מכן מבצעים את המשפט:\n`w1.f();`",
    txt("המשפט `w1.f()` יגרום לשגיאת קומפילציה", "המשפט `w1.f()` יגרום לשגיאת זמן ריצה", "המשפט `w1.f()` תקין ולא יגרום לשגיאות כלל"),
    "a", "No key. clang++: compile error (`f` became private in Z through `private Y`, so it is inaccessible in W)."))

q6 = Q(
    6, "copy_control", "להלן הצהרות של 6 פונקציות:\n" + cb(r'''
void f1(Person &p);
void f2(Person p);
void f3(Person *p);
Person f4();
Person &f5();
Person *f6();''') + "\nנניח שמפעילים (דהינו מבצעים קריאה) את כל אחת מ- 6 הפונקציות הנ\"ל. בכמה מההפעלות האלה יהיה בהכרח שימוש בבנאי ההעתקה:",
    txt("1", "2", "4", "6"), None,
    "Held. Probe (q06.cpp): only f2 (by-value parameter) always copies; f4 (by-value return) copies only with -fno-elide-constructors, "
    "so 'necessarily' reads as 1 (default clang++) or 2 (language semantics). The paper gives no function bodies and no key.",
    hold="no-key: the answer (1 vs 2) depends on whether a by-value return counts as a necessary copy (copy elision); no key and the run cannot decide")
for k in ("answerSource", "official", "confidence"):
    q6.pop(k)
questions.append(q6)

questions.append(Q(
    7, "construction_order", OUTQ + cb(r'''
class B{
public:
     B();
     B(int n);
};
B::B(){
     cout << "B::B()\n";
}
B::B(int n){ cout << "B::B(" << n << ")\n"; }

class D : public B{
public:
     D();
     D(int n);
private:
     B b;
};
D::D(){ cout << "D::D()\n"; }
D::D(int n) : B(n){
     b = B(-n);
     cout << "D::D(" << n << ")\n";
}
int main(){
     D d(3);
     return 0;
}'''),
    txt(cb("B::B(3)\nB::B()\nB::B(-3)\nD::D(3)", ""), cb("B::B(3)\nB::B(-3)\nD::D(3)", ""), cb("B::B()\nB::B(-3)\nD::D(3)", ""), "יש שגיאות בתכנית"),
    "a", "No key. clang++ run printed option a (base `B(3)`, then the member `b` default-constructed, then the temporary `B(-3)` for the assignment, then the body of D)."))

questions.append(Q(
    8, "abstract_multiple", ERRQ + cb(r'''
class A {
public: A(int _x = 0) { x = _x; }
     virtual void f() {};
protected: int x;
};
class B : public A {
public: void AddB(int y) { x += y; }
};
class C : public A {
public: void AddC(int y) { x += y; }
};
class D : public B, public C {
public: void ShowX() { cout << "x = " << x << endl; }
};
int main() {
     D d;
     d.ShowX();
     d.AddB(10); d.ShowX();
     d.AddC(5); d.ShowX();
     d.f();
}'''),
    txt("0", "1", "2", "יותר מ- 2"), "c",
    "No key. clang++: errors on exactly two lines: `cout << x` in `D::ShowX` (ambiguous `x`, two A subobjects) and `d.f()` in main (ambiguous `f`); `AddB`/`AddC` are fine."))

questions.append(Q(
    9, "operator_overloading", "נניח שהוגדרה מחלקה `A` כלשהי. עבור איזה אופרטורים אי אפשר לבצע העמסה על ידי שימוש ב- `member function` של המחלקה `A`:",
    txt("עבור אופרטורים שהאופרנד הראשון שלהם הוא אוביקט של מחלקה כלשהי", "עבור אופרטורים שהאופרנד הראשון שלהם הוא אוביקט של המחלקה `A`",
        "עבור אופרטורים שהאופרנד הראשון שלהם אינו אוביקט של המחלקה `A`", "לכל האופרטורים אפשר לבצע העמסה על ידי שימוש ב- `member function` של המחלקה `A`"),
    "c", "No key. Probes: a member `operator+(int)` works for `a + 5` and fails for `5 + a`; a member `operator<<(ostream&)` fails for `cout << a` "
    "(the left operand must be an `A`).", conf="med"))

questions.append(Q(
    10, "templates", ERRQ + cb(r'''
template<class T, class U> void f(const T& a, const U& b)
{}

int main() {
     int a[2] = { 1,2 };
     int b[3] = { 1,2,3 };
     f(a, b);
     f(&a, &b);
     f(*a, *b);
}'''),
    txt("0", "1", "2", "יותר מ- 2"), "a",
    "No key. clang++: compiles with no errors (T and U deduce as `int[2]`/`int[3]` for the by-reference arrays, as pointers-to-array for `&a`/`&b` and as `int` for `*a`/`*b`)."))

questions.append(Q(
    11, "construction_order", OUTQ + cb(r'''
class X {
public:
     X(int i = 0) : nx(i) { cout << nx; }
     virtual ~X() { cout << nx; }
     int nx;
     virtual void f() { cout << nx; }
};
class Y : public X {
public:
     Y(int i=0, int j=0) : ny(i), X(j) { cout << ny; }
     ~Y() { cout << ny; }
     int ny;
     X Xy;
     void f() { X::f();   cout << nx << Xy.nx; }
};
int main() {
     Y y1(4, 8);
     y1.X::f();
}'''),
    txt("`8048408`", "`0848480`", "`0848480`", "התכנית לא עוברת קומפילציה"), "a",
    "No key. clang++ run printed `8048408`. Options b and c are printed identically (`0848480`) in the source; both are wrong. "
    "Order: base X(8) prints 8; member Xy (default 0) prints 0; Y body prints 4; `y1.X::f()` prints 8; then ~Y prints 4, member Xy destroyed prints 0, ~X prints 8."))

questions.append(Q(
    12, "operator_overloading", OUTQ + cb(r'''
class X {
public:
     int x;
     X(int i = 0) :x(i) {}
     X& operator+=(const X b) {
          this->x += b.x;
          return *this;
     }
};

class Y : public X {
public:
     int y;
     Y(int i = 0, int j = 0) :y(i), X(j) {}
     Y& operator+=(const Y a) {
          (X&)(*this) += (const X)a;
          this->y += a.y;
          return *this;
     }
     void print() {
          cout << this->y << this ->x;
     }
};

int main() {
     X x1(1), x2(2);
     Y y1(10, 6), y2(20, 5);
     x2 += x1;
     (X&)y2 = x2;
     y2.print();
     y2 += y1;
     y2.print();
}'''),
    txt("`106206`", "`203309`", "`106306`", "התכנית לא עוברת קומפילציה"), "b",
    "No key. clang++ run printed `203309`: x2 becomes 3, `(X&)y2 = x2` copies only the X part (y2.x = 3, y stays 20) -> `203`; `y2 += y1` gives x=9, y=30 -> `309`."))

questions.append(Q(
    13, "stl_exceptions", OUTQ + cb(r'''
# include <vector>

int main() {
     int a[6] = { 10, 20, 30, 40, 50, 60 };
     vector<int> v(a+1, a + 5);
     a[2] = 20;
     vector<int>::iterator it;
     it = v.begin();
     it++;
     it++;
     int total = 0;
     while (it != v.end()) {
          total += *it;
          it++;
     }
     cout << total << endl;
}'''),
    txt("`70`", "`50`", "`90`", "התכנית לא עוברת קומפילציה"), "c",
    "No key. clang++ run printed 90: `v` is a copy of {20,30,40,50}, so `a[2] = 20` does not affect it; the loop sums elements 2 and 3 (40+50)."))

questions.append(Q(
    14, "classes_ctor_dtor", "כדי לדאוג שלא ניתן יהיה ליצור אובייקטים של מחלקה `A` בפונקציות שאינן פונקציות חברות (`member functions`) או בפונקציות שאינן פונקציות `friend` של המחלקה:",
    txt("יש לדאוג לכך שהבנאי של מחלקה `A` (`constructor`) יהיה פרטי (`private`)", "יש לדאוג לכך שהבנאי וההורס (`destructor`) של המחלקה `A` יהיו פרטיים",
        "יש לדאוג לכך שהבנאי, ההורס ובנאי ההעתקה של המחלקה `A` יהיו פרטיים", "יש לדאוג לכך שהבנאי ובנאי ההעתקה של מחלקה `A` יהיו פרטיים"),
    "a", "No key. Probe: with only the default constructor private, `A a1;` and `new A` in main both fail to compile (an `A` can only come from a member/friend), "
    "so the private constructor alone is sufficient; the extra private members in b-d are not needed. Reading of 'sufficient' is the paper's, not compiler-checkable beyond that.", conf="med"))

questions.append(Q(
    15, "abstract_multiple", "נניח שקיימות 4 מחלקות לא אבסטרקטיות, שיחסי הירושה ביניהן הם כפי שמתואר להלן:\n" + cb(r'''
class X { int x; };
class Y : public X { int y;... };
class Z : public X { int z;... };
class W : public Y, public Z { int w;... };'''),
    txt("אובייקט של המחלקה `W` מכיל בדיוק אוביקט אחד של המחלקה `X`", "אובייקט של המחלקה `W` מכיל שני אוביקטים זהים של המחלקה `X`",
        "אובייקט של המחלקה `W` מכיל שני אוביקטים לא בהכרח זהים של המחלקה `X`", "אובייקט של המחלקה `W` מכיל יותר משני אוביקטים של המחלקה `X`"),
    "c", "No key. Probe: `W` has two distinct `X` subobjects (two different addresses, sizeof(W)=20) that hold different values (1 and 2); "
    "so 'two, not necessarily identical' is the accurate statement.", conf="med"))

EXPL = {
 1: 'הבנאי `X(int i)` מוגדר, ולכן הקומפיילר לא מייצר בנאי ברירת מחדל. בלי `X(){}` שתי הפעולות נכשלות: `X x1;` (אין בנאי בלי פרמטרים) ו-`new X[3]` (גם הוא דורש בנאי ברירת מחדל לכל איבר).\nהרצה עם clang++ אישרה ששתי השורות נכשלות בלי `X(){}` ומתקמפלות איתו. לכן התשובה היא ג (גם א וגם ב).',
 2: 'הפונקציה `p` וירטואלית, ולכן קריאה דרך `B*` לאובייקט מטיפוס `D` מפעילה את `D::p`. הפונקציה `q` אינה וירטואלית, ולכן הקריאה נקבעת לפי הטיפוס הסטטי של המצביע.\n- `b`: `B::p B::q`.\n- `d`: `D::p D::q`.\n- `pb` (מצביע ל-B שמצביע ל-B): `B::p B::q`.\n- `pd` (`B*` שמצביע ל-D): `D::p` (וירטואלית) ואז `B::q` (לא וירטואלית).\n- `pd2` (`D*`): `D::p D::q`.\nזה בדיוק הרצף בתשובה ג. הרצה אישרה זאת.',
 3: 'הפונקציה `method` וירטואלית, והקריאה `baseMethod()` מפעילה אותה על אובייקט `A`, ולכן מודפס `from A`.\nב-`delete base` ההורס וירטואלי: קודם `~A`, שקורא ל-`method()` של `A` (`from A`). אחר כך `~Base`: בזמן הרצת ההורס של הבסיס חלק ה-`A` כבר הושמד, ולכן קריאה וירטואלית בתוך ההורס מגיעה ל-`Base::method` (`from Base`).\nהפלט הוא `from A / from A / from Base` (תשובה א). הרצה אישרה זאת.',
 4: 'כדי שהשרשור `*p1=*p2=*p2` יעבוד, `operator=` צריך להחזיר הפניה לאובייקט (`A&`), כך שתוצאת ההשמה הפנימית היא אובייקט שאפשר להשים ממנו שוב. עם החזרת `A*` ההשמה השנייה מנסה להשים מצביע לתוך אובייקט ולא מתקמפלת (נבדק).\nמכיוון שיש הקצאות דינמיות, אסור להסתמך על ההשמה המובנית: היא רדודה ומובילה למחיקה כפולה (נבדק: שחרור כפול).\nהתשובה היא א.',
 5: '`Z` יורשת את `Y` בירושה `private`, ולכן כל החברים של `Y` (כולל `f` שירשה מ-`X`) הופכים לפרטיים ב-`Z`. מחלקה `W`, שיורשת מ-`Z`, אינה יכולה לגשת אליהם, ולכן `w1.f()` נכשלת, גם מתוך פונקציה חברה של `W`.\nזו שגיאת קומפילציה (תשובה א), לא שגיאת זמן ריצה. הקומפילציה בהרצה אכן נכשלה.',
 7: 'סדר הבנייה: קודם הבסיס `B(n)` עם `n=3` (`B::B(3)`), אחר כך החברים לפי סדר ההצהרה: `b` נבנה בבנאי ברירת מחדל (`B::B()`), כי הוא לא מופיע ברשימת האתחול. רק אחר כך מתחיל גוף הבנאי של `D`.\nבגוף הבנאי השורה `b = B(-n)` יוצרת זמני `B(-3)` (`B::B(-3)`) ומשימה אותו ל-`b`. לבסוף מודפס `D::D(3)`.\nהפלט הוא תשובה א. תשובה ב מפספסת את בניית `b` לפני גוף הבנאי.',
 8: 'ל-`D` יש שני עותקי `A` (ירושה לא וירטואלית דרך `B` ודרך `C`). לכן:\n- `cout << x` בתוך `ShowX` דו-משמעי (איזה `x`?) ולכן שגיאה.\n- `d.f()` דו-משמעי, שגיאה.\n- הקריאות `AddB` ו-`AddC` תקינות (כל אחת פועלת על ה-`A` של מחלקת האב שלה).\nשתי שורות שגויות (תשובה ג). הרצה אישרה שהשגיאות בשתי השורות האלה בלבד.',
 9: 'אופרטור שמוגדר כפונקציה חברה של `A` תמיד מקבל אובייקט `A` כאופרנד השמאלי (`this`). לכן אי אפשר להעמיס כך אופרטורים שהאופרנד הראשון שלהם אינו `A`, כמו `5 + a` או `cout << a`.\nבהרצה: `a + 5` עם חבר התקמפל, `5 + a` לא התקמפל, ו-`cout << a` עם `operator<<` חבר לא התקמפל.\nהתשובה היא ג.',
 10: 'התבנית מקבלת את שני הארגומנטים בהפניה ל-const, ולכן כל הקריאות חוקיות:\n- `f(a, b)`: `T=int[2]`, `U=int[3]` (מערכים לא דועכים כשמקבלים בהפניה).\n- `f(&a, &b)`: מצביעים למערכים (זמניים), נקשרים ל-`const T&`.\n- `f(*a, *b)`: `int` ו-`int`.\nאין שגיאות (תשובה א). הקומפילציה בהרצה עברה ללא שגיאות.',
 11: 'סדר ההדפסה:\n- בנייה של `y1(4, 8)`: בסיס `X(8)` מדפיס `8`; החבר `Xy` נבנה בבנאי ברירת מחדל ומדפיס `0`; גוף `Y` מדפיס `4`.\n- `y1.X::f()` קורא ישירות ל-`X::f` ומדפיס `nx` שהוא `8`.\n- הריסה בסדר הפוך: `~Y` מדפיס `4`, אחר כך החבר `Xy` (`0`), אחר כך `~X` של הבסיס (`8`).\nהפלט `8048408` (תשובה א). שים לב שתשובות ב ו-ג כתובות באותו אופן בשאלה, ושתיהן שגויות.',
 12: 'השורה `x2 += x1` נותנת `x2.x = 3`. `(X&)y2 = x2` מעתיקה רק את חלק ה-`X` של `y2`: `y2.x = 3`, ו-`y2.y` נשאר 20. ההדפסה הראשונה (`y` ואז `x`): `203`.\nאחרי `y2 += y1`: חלק `X` נעשה `3+6=9` ו-`y` נעשה `20+10=30`: `309`.\nהפלט `203309` (תשובה ב). תשובות א ו-ג מניחות ש-`y` הוחלף.',
 13: 'הווקטור `v` נבנה כעותק של `a[1]..a[4]` = `{20,30,40,50}`. השינוי `a[2] = 20` אחרי הבנייה לא משפיע על `v`, כי הנתונים הועתקו.\nהאיטרטור מתקדם פעמיים ומצביע על `40`, והלולאה מסכמת `40 + 50 = 90`.\nהתשובה היא ג. תשובה א (70) מניחה ש-`v` משתנה עם `a`.',
 14: 'אם הבנאי פרטי, אי אפשר ליצור אובייקט מחוץ למחלקה (פרט לפונקציות חברות ול-friend): גם `A a1;` וגם `new A` נכשלים בקומפילציה (נבדק). הבנאי הפרטי מספיק, ואין צורך להפוך פרטיים גם את ההורס ואת בנאי ההעתקה, כי אי אפשר להשיג אובייקט קיים להעתיק ממנו.\nהתשובה היא א.',
 15: 'ירושה "יהלום" לא וירטואלית: `W` יורשת מ-`Y` ומ-`Z`, שכל אחת יורשת מ-`X`, ולכן `W` מכילה שני עותקים נפרדים של `X`. הם נפרדים בזיכרון ויכולים להחזיק ערכים שונים.\nבהרצה קיבלנו שתי כתובות שונות לשני חלקי ה-`X`, והצבנו בהם ערכים שונים (1 ו-2). לכן הטענה הנכונה היא ג (שני אובייקטים לא בהכרח זהים). א שגויה ו-ב מדויקת פחות (הם לא תמיד זהים).',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "22B-A",
    "examLabel": "2022 סמסטר ב מועד א",
    "year": 2022,
    "examDate": "19.06.2022",
    "sourceFile": "2022/סמ׳ ב מועד א_.pdf",
    "keyFile": "none (answers derived by compiling/running with clang++, tools/verify/22B-A)",
    "contexts": {
        "notes": {
            "kind": "text",
            "title": "הערות משותפות לגבי התוכן של כל השאלות",
            "text": "בכל שאלה שבה נדרש לרשום בכמה שורות יש שגיאות בקטע הקוד, יש להסתכל על כל הקוד גם זה שלפני הפונקציה `main`.\n"
                    "בכל השאלות שבהן נדרש לרשום כמה שגיאות יש בקטע הקוד או מה מדפיסה התכנית הבאה, ניתן להניח שאין שגיאה מהסוג של רווח מיותר, או חוסר ברווח, וכן אין שגיאה מהסוג של נקודה פסיק מיותרת או חוסר בנקודה פסיק, וכן אין שגיאה שנובעת מכך שחסר משפט `#include` בתחילת קטע הקוד/התכנית.\n"
                    "בכל שאלה שבה יש תשובה: \"אף תשובה אינה נכונה\" הכוונה שמבין התשובות האחרות אף תשובה אינה נכונה.\n"
                    "בכל שאלה יש רק תשובה אחת נכונה ביותר. אם יש שתי תשובות נכונות יש לסמן את התשובה הנכונה ביותר מבין השתיים.\n"
                    "כאשר נתון קטע קוד ולאחריו מספר משפטים, יש לסמן את המשפט הנכון ביותר בהקשר לקטע הקוד הנתון.\n"
                    "בכל שאלה מהסוג \"מה מדפיסה התכנית הבאה\", יש לקרוא את הפלט שמצוין בתשובות משמאל לימין.\n"
                    "בכל אחד מקטעי הקוד הבאים יש להניח ששתי השורות הבאות קיימות בתחילת הקטע:\n"
                    "```cpp\n#include <iostream>\nusing namespace std;\n```\n"
                    "בכל אחד מקטעי הקוד הבאים, ניתן להניח שהוספו כל משפטי ה-`#include` הנדרשים להרצת קטע הקוד.",
        }
    },
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
