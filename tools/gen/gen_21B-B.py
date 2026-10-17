# -*- coding: utf-8 -*-
"""Generator for tools/raw/21B-B.json -- oop (61307), 2021 semester B, moed B (26/07/2021).
Run: PYTHONUTF8=1 py tools/gen/gen_21B-B.py

Source: 10-page text PDF, 20 MCQ x 4 options. The paper carries NO answer key.
Per GATE1 the keys are derived by compiling/running every item with clang++ (tools/verify/21B-B/, run_all.py), marked
answerSource "solved", official false. Concept questions (1, 3, 5, 9, 10, 18) were settled with compile/run probes of each option's claim.
Held: Q13 (class-hierarchy design preference, cannot be compiled -> no-key)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "21B-B.json"
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


OUTQ = "מה מדפיסה התכנית הבאה?\n"
questions = []

questions.append(Q(
    1, "copy_control", "נתונה המחלקה הבאה:\n" + cb(r'''
class A {
     int* p;
     A(int n=1) { p = new int[n]; }
     ~A() { delete [] p; }
     A f() { return *this; }
     int g() { A a1; A a2; a2=f(); }
     // ...
};''') + "\nכדי שניתן יהיה להשתמש במחלקה הנ\"ל ובכל הפונקציות שלה באופן תקין ולפי עקרונות תכנות נכון **חייבים**:",
    txt("להוסיף העמסת אופרטורים לאופרטור =.", "להוסיף העמסת אופרטורים לאופרטור = ולאופרטור ==", "להוסיף בנאי העתקה והעמסת אופרטורים לאופרטור =", "לשנות את ההורס."),
    "c", "No key in the paper. Probe (q01_rule.cpp, counting every delete[]): with only operator= (a) or operator= and == (b) the by-value return of `f()` "
    "copies `p` shallowly -> a double delete[]; copy ctor + operator= (c) -> 0 double deletes, 0 leaks. Rule of three -> c.", conf="med"))

questions.append(Q(
    2, "templates", OUTQ + cb(r'''
template <class X, class Y>
Y f(X x, Y y) {
     y+=x + 1;
     return y;
}
int f(double p, int q) {
     q+=(int) p+2;
     return q;
}
void main() {
     int i=3,j=6;
     double d=4.3;
     cout << f(i, j) << f(d,j) << endl;
}'''),
    txt("`1111`", "`1011`", "`1211`", "`1012`"), "d",
    "No key. clang++ run printed `1012`: f(i,j) picks the template (exact match, 6+3+1=10); f(d,j) matches both exactly and the non-template wins (6+4+2=12)."))

questions.append(Q(
    3, "operator_overloading", "נתונה המחלקה הבאה:\n" + cb("class A {\n// ...\n};") +
    "\nכדי להוסיף העמסת אופרטורים לאופרטור `<<` עבור המחלקה הנ\"ל חייבים להוסיף:",
    txt("פונקציה חיצונית שהיא פונקציית `friend` של המחלקה.", "פונקציה חיצונית שאינה בהכרח פונקציית `friend` של המחלקה.",
        "פונקציה חברה (`member function`) של המחלקה או פונקציה חיצונית שהיא פונקציית `friend` של המחלקה.",
        "פונקציה חברה (`member function`) של המחלקה או פונקציה חיצונית שאינה בהכרח פונקציית `friend` של המחלקה."),
    "b", "No key. Probes: a non-friend external `operator<<(ostream&, const A&)` compiles and runs (so a and c are wrong); a member `operator<<` cannot take `cout` "
    "on the left (`cout << a` does not compile), so d is wrong. -> b.", conf="med"))

questions.append(Q(
    4, "classes_ctor_dtor", OUTQ + cb(r'''
class A {
public:
     A(int x = 1) {
          this->x = x;
     }
     ~A() {
          cout << x;
     }
     int x;
};

class B {
public:
     B(int n = 3) {
          this->n = n;
          p = new A[n];
     }
     ~B() {
          delete[] p;
     }
     int n;
     A* p;
};

void main() {
     B* p = new B();
}'''),
    txt("התכנית לא מדפיסה כלום.", "`1`", "`111`", "`3`"), "a",
    "No key. clang++ run printed nothing: the heap `B` is never deleted, so neither `~B` nor the `~A` calls run."))

questions.append(Q(
    5, "inheritance_access", "להלן תיאור חלקי של מחלקות `A` ו- `B` והפונקציה `main`.\n" + cb(r'''
class B {
public:
     ...
     void f() { ... }
};

class A : public B {
public:
     ...
     void f() { ... }
};

void main()
{
     ...
}''') + "\nבשאלה זו במונח פונקציות חברות הכוונה ל- `member functions`.\n\nאת המשפט `B::f();` ניתן לבצע",
    txt("מתוך הפונקציה `main` וגם מתוך כל הפונקציות החברות של המחלקה `A`.",
        "מתוך כל הפונקציות החברות של המחלקה `A` אבל לא מתוך כל הפונקציות החברות של המחלקה `B`.",
        "מתוך כל הפונקציות החברות של המחלקה `B` אבל לא מתוך כל הפונקציות החברות של המחלקה `A`.",
        "אף תשובה אינה נכונה."),
    "d", "No key. Probes: `B::f();` inside `main` does not compile (no object); inside a member of A and inside a member of B it compiles and runs. "
    "So a (main), b (not from B) and c (not from A) are all false -> d.", conf="med"))

questions.append(Q(
    6, "const_references", "מה יודפס לאחר ביצוע הקטע:\n" + cb(r'''
int& f1(int& x, int& y)
       { static int t = x > y ? x : y; return t; }
void main() {
    std::cout << (f1(2, 3) + 4);
}'''),
    txt("`7`", "`4`", "התכנית רצה אבל הפלט הוא ערך בלתי מוגדר (זבל)", "שגיאת הידור (קומפילציה)"), "d",
    "No key. clang++: compile error (`int&` cannot bind to the temporaries 2 and 3)."))

questions.append(Q(
    7, "cpp_basics_refs", "מה יודפס לאחר ביצוע הקטע\n" + cb(r'''
int& f1(int& x, int& y)
{ static int t = x > y ? x : y; return t; }
int& f1(int x, int y)
{ static int t = x > y ? x : y; return t; }
void main() {
    std::cout << (f1(2, 3) = 4);
}'''),
    txt("שגיאת מהדר (קומפילציה)", "התכנית רצה אבל הפלט הוא ערך בלתי מוגדר (זבל)", "התכנית לא כתובה טוב אבל היא תרוץ ותדפיס `4`", "`0`"), "c",
    "No key. clang++ run printed `4`: only the by-value overload accepts the literals, and it returns a reference to its static `t`, which is assigned 4."))

questions.append(Q(
    8, "construction_order", "מה יודפס לאחר ביצוע הקטע\n" + cb(r'''
class One {
public:
    int one;
    One() { one = 1; }
};
class Two :public One {
public:
    int two;
    Two() { this->two = 2; }
};
void main() {
    Two* two = new Two();
    std::cout << two->one << two->two;
}'''),
    txt("שגיאת מהדר (קומפילציה)", "התכנית רצה אבל הפלט הוא ערך בלתי מוגדר (זבל)", "`12`", "`22`"), "c",
    "No key. clang++ run printed `12`."))

questions.append(Q(
    9, "virtual_polymorphism", "אילו מהפונקציות הבאות לא יכולה להיות וירטואלית?",
    txt("פונקציה בונה מכל סוג שהוא (`constructor`)", "פונקציה הורסת (`destructor`)", "פונקציה טהורה (`pure virtual`)",
        "פונקציה שיורשת ממחלקת אב שהוגדרה במחלקה האב כ `protected`."),
    "a", "No key. Probes: `virtual A() {}` does not compile; `virtual ~A()`, a pure virtual function and a virtual override of an inherited protected function all compile.", conf="med"))

questions.append(Q(
    10, "classes_ctor_dtor", "לאיזה מהפונקציות הבאות לא יכולה להיות העמסה (`overloading`)?",
    txt("פונקציה בונה מכל סוג שהוא (`constructor`)", "פונקציה הורסת (`destructor`)", "פונקציה טהורה (`pure virtual`)",
        "פונקציה שיורשת ממחלקת אב שהוגדרה במחלקה האב כ `protected`"),
    "b", "No key. Probes: constructors with three signatures, overloaded pure virtual functions and an overload of an inherited protected name all compile; "
    "a second destructor `~A(int)` does not compile.", conf="med"))

questions.append(Q(
    11, "classes_ctor_dtor", OUTQ + cb(r'''
class Utest {
public:
    Utest(int i = 40) { d = i; cout << "d = " << i; }
private:
    int d;
};
void main() {
    Utest ut = Utest(20);
}'''),
    txt("שגיאת מהדר", "`d=40 d=20`", "`d=20 d=20`", "`d=20`"), "d",
    "No key. clang++ run (c++17) printed `d = 20`: the temporary is elided into `ut`, so the constructor runs once. The printed spacing `d = 20` is written `d=20` in the options."))

questions.append(Q(
    12, "friend_this_static", "התוכנית הבאה יוצרת רק אוביקט אחד מהמחלקה `House` ומדפיסה \"120\". מה כתוב בשורה עם \"???\"\n" + cb(r'''
class House {
public:
    int rooms;
    const int size;
    House(int r, int s = 0) :rooms(r), size(s) {  }
    ? ? ? ? ? setRoom(int r) { rooms = r; ? ? ? ? ? ; }
    int getSize() { return size; }
};

void main()
{
    House h(4, 120);
    std::cout << h.setRoom(5).getSize();
}'''),
    txt("`House &setRoom(int r) { rooms = r; return *this; }`", "`House *setRoom(int r) { rooms = r; return *this; }`",
        "`void   setRoom(int r) { rooms = r; }`", "`House  setRoom(int r) { rooms = r; return *this; }`"), "a",
    "No key. clang++: a prints 120; b and c do not compile; d compiles and also prints 120 but returns a copy, i.e. creates a second object, which the stem rules out -> a."))

q13 = Q(
    13, "composition", "יש צורך לכתוב פרויקט שתפקידו לנהול דירות. לכל דירה (`apartment`) יכולים להיות מספר חדרים. כל חדר יכול להיות מסוג חדר שינה (`bed room`) או חדר מגורים (`living room`) או חדר אמבטיה (`bath room`). הפרויקט יכיל כמובן מחלקות מסוג `Apartment, LivingRoom, BathRoom, BedRoom`.\nמה יהיה מבנה הירושה המיטבי של המחלקות בפרויקט זה?",
    txt("תבנה מחלקה אב `Room` שממנה ירשו כל המחלקות מסוג `xxxRoom`. במחלקה `Apartment` יהיה `data member` - מערך של איברים (`vector`) מסוג `Room`.",
        "במחלקה `Apartment` יהיו `data member` מסוג מערך של `BedRoom` וכן `data member` מסוג מערך של `LivingRoom` וכן `data member` מסוג מערך של `BathRoom`",
        "המחלקה `Apartment` תירש בצורה של \"ירושה מרובה\" מכל המחלקות מסוג `LivingRoom, BathRoom, BedRoom`",
        "המחלקות `LivingRoom, BathRoom, BedRoom` ירשו כל אחת מהן בנפרד מהמחלקה `Apartment`."),
    None, "Held: design-preference question, no key and nothing to compile.",
    hold="no-key: design question (best class structure), the paper has no key and it cannot be settled by running code")
for k in ("answerSource", "official", "confidence"):
    q13.pop(k)
questions.append(q13)

questions.append(Q(
    14, "stl_exceptions", OUTQ + cb(r'''
#include <vector>
void main()
{
    vector<float> vf(5);
    vector<float>::iterator iter = vf.begin() + 2;
    while (iter != --vf.end())
        cout << *iter++; }'''),
    txt("שגיאת מהדר", "`12345`", "`00000`", "`00`"), "d",
    "No key. clang++ run printed `00` (elements 2 and 3 of the five zero-initialised floats; the loop stops at the last element)."))

questions.append(Q(
    15, "friend_this_static", OUTQ + cb(r'''
class X{
public:
    X(int i = 0)
{ static int c = 0; std::cout << i + c++; }
};
void main() {
    X a;
    X b(1);
    X c = b;
    c = X(3); }'''),
    txt("שגיאת מהדר", "`0246`", "`025`", "`0237`"), "c",
    "No key. clang++ run printed `025`: `X c = b;` uses the implicit copy constructor (prints nothing, `c` unchanged); `X(3)` prints 3+2=5."))

questions.append(Q(
    16, "templates", OUTQ + cb(r'''
template <class T>
class Uone {
public:
    static  int uone;
    Uone(int ut) { uone = ut; }
};

template <class T>
int Uone<T>::uone = 0;

void main()
{
    Uone<int> u1(1);
    Uone<int> u2(2);
    Uone<float> u3(3);
    cout << u1.uone << u2.uone << u3.uone;   }'''),
    txt("שגיאת מהדר", "`000`", "`123`", "`223`"), "d",
    "No key. clang++ run printed `223`: one static per instantiation (`Uone<int>` shared by u1 and u2, `Uone<float>` separate)."))

questions.append(Q(
    17, "friend_this_static", "כמה שורות גורמות לשגיאת קומפילציה בקטע הקוד הבא:\n" + cb(r'''
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
    txt("אף שורה", "שורה אחת", "שתי שורות", "שלוש שורות"), "b",
    "No key. clang++: one error line (`x.b = 1;` in `f(X, int)`, which is not a friend; the friend is only the one-argument overload)."))

questions.append(Q(
    18, "composition",
    "האם יכול להיות שאובייקט ממחלקה `A` יכיל מצביע לאובייקט מהמחלקה `B`, וכל אובייקט ממחלקה `B` יכיל מצביע לאובייקט ששייך למחלקה `A`?",
    txt("בלתי אפשרי (אסור לולאה בהגדרות).",
        "אפשרי אבל רק אם הלולאה איננה בעצמים (כלומר יכול להיות שעצם ששייך למחלקה `B` יצביע לעצם ששייך למחלקה `A`. אבל אז העצם ששייך למחלקה `A` לא יכול להצביע חזרה על אותו העצם שמצביע עליו).",
        "קצת מורכב אבל אפשרי.",
        "זה אפשרי אבל רק אם המצביעים הם מסוג `public` ולא מסוג `private` או `protected`."),
    "c", "No key. Probe (q18.cpp): `class B;` forward declaration, `A` holds `B*`, `B` holds `A*`, and the objects point at each other at run time (prints 1). "
    "The compiler needs the forward declaration, hence 'a bit complicated but possible'.", conf="med"))

questions.append(Q(
    19, "operator_overloading", "על מנת שהתוכנית הבאה תדפיס \"1\" מה צריך להופיע בשורה עם ????\n" + cb(r'''
class X{};
?????????????????
void main()
{
    std::cout << X();
}'''),
    txt("`ostream &operator<< (ostream& o, X x) { o << 1;  return o; }`", "`void  operator<< (ostream& o, X x) { o << 1; }`",
        "גם א' וגם ב' וגם ד' (למרות שא' יתאים באופן כללי)", "`ostream *operator<< (ostream& o, X x) { o << 1;  return &o; }`"),
    "c", "No key. clang++: each of the options a, b and d compiles and prints `1` for this exact `main` (only chaining would need the reference return), "
    "so c (all three) is the accurate statement.", conf="med"))

questions.append(Q(
    20, "virtual_polymorphism", "מה תדפיס התכנית הבאה?\n" + cb(r'''
class X {
public:
    virtual void f1(int i) { cout << i; }
    void f1(int i, int j) { cout << i; }
};
class Y :public X {
public:
    virtual void f1(int i) { cout << i + 1; }
    virtual void f1(int i, int j) { cout << i + 1; }
};

void main() {
    X* x = new Y;
    x->f1(2);
    x->f1(2, 3);}'''),
    txt("`22`", "`33`", "`23`", "`32`"), "d",
    "No key. clang++ run printed `32`: `f1(int)` is virtual in X (Y's version runs, 3); `f1(int,int)` is not virtual in X, so the call through `X*` runs X's version (2)."))

EXPL = {
 1: 'הפונקציה `f` מחזירה `A` by value, ולכן נוצר עותק של האובייקט. בלי בנאי העתקה מוגדר, ההעתקה רדודה: שני האובייקטים מצביעים על אותו מערך, וההורס `delete[] p` נקרא פעמיים על אותו מערך. גם ההשמה `a2=f()` דורשת `operator=` שמעתיק לעומק.\nהרצת בדיקה שסופרת כל `delete[]` הראתה: עם `operator=` בלבד (א) או עם `=` ו-`==` (ב) יש מחיקה כפולה; עם בנאי העתקה ו-`operator=` (ג) אין. שינוי ההורס (ד) לא פותר את הבעיה.\nהתשובה היא ג (כלל שלושת הגדולים).',
 2: 'הקריאה `f(i, j)` מתאימה בדיוק לתבנית עם `X=int, Y=int`, ולכן נבחרת התבנית: `6 + 3 + 1 = 10`. הקריאה `f(d, j)` מתאימה בדיוק גם לתבנית וגם לפונקציה הרגילה `f(double,int)`, ובמקרה כזה הפונקציה הרגילה מועדפת: `6 + 4 + 2 = 12`.\nהפלט הוא `1012` (תשובה ד). תשובה א ו-ג מתעלמות מההעדפה לפונקציה הלא-תבניתית בקריאה השנייה.',
 3: 'כדי ש-`cout << a` יעבוד, האופרטור צריך לקבל את `ostream` כארגומנט שמאלי, ולכן אי אפשר שהוא יהיה פונקציה חברה של `A`. נדרשת פונקציה חיצונית, אבל היא לא חייבת להיות `friend`: אם היא משתמשת רק בחברים ציבוריים (או בפונקציית עזר ציבורית) היא מתקמפלת.\nבהרצה: גרסה חיצונית שאינה friend התקמפלה ופעלה, וגרסה חברה לא התקמפלה עבור `cout << a`.\nהתשובה היא ב. תשובה א דורשת friend יותר מדי, ותשובות ג ו-ד כוללות פונקציה חברה שאינה אפשרית.',
 4: 'האובייקט `B` נוצר ב-`new` ואף פעם לא נמחק. ללא `delete`, ההורס `~B` לא מופעל, ולכן גם `delete[] p` לא מופעל וההורסים של איברי `A` לא נקראים. בנאי `A` לא מדפיס כלום.\nהתכנית לא מדפיסה כלום (תשובה א). הרצת הקוד אישרה פלט ריק.',
 5: 'בתוך `main` הביטוי `B::f();` שגוי כי הפונקציה חברה לא סטטית וצריך אובייקט שיפעיל אותה. בתוך פונקציה חברה של `A` או של `B` הוא תקין (בתוך `B` זו פשוט קריאה לגרסה של `B`; בתוך `A` זו גישה מפורשת לפונקציה של הבסיס).\nלכן א שגויה (`main`), ב שגויה (אפשר גם מתוך `B`), ו-ג שגויה (אפשר גם מתוך `A`). התשובה היא ד. בהרצה: `main` לא התקמפלה, ושתי הפונקציות החברות כן.',
 6: '`f1` מקבלת הפניות לא-const (`int&`), והארגומנטים `2` ו-`3` הם ערכים זמניים (rvalues) שאי אפשר לקשור להפניה לא-const. הקומפיילר דוחה את הקריאה.\nהתשובה היא ד (שגיאת קומפילציה). הרצה עם clang++ אישרה זאת.',
 7: 'יש שתי העמסות: `f1(int&, int&)` ו-`f1(int, int)`. הארגומנטים `2` ו-`3` הם ערכים זמניים, ולכן רק הגרסה by-value ניתנת לקריאה. היא מחזירה הפניה למשתנה הסטטי `t`, שערכו 3, וההשמה `= 4` משנה אותו ל-4. הפלט `4`.\nהתכנית "לא כתובה טוב" (מחזירה הפניה למשתנה סטטי ושתי העמסות מבלבלות), אבל היא מתקמפלת ורצה: תשובה ג.',
 8: 'בנאי הבסיס `One` רץ ראשון ומציב `one=1`, אחר כך בנאי `Two` מציב `two=2`. ההדפסה מציגה `one` ואחריו `two`: `12`.\nהתשובה היא ג. אין כאן שגיאת קומפילציה והערכים אינם זבל, כי שניהם מאותחלים בבנאים.',
 9: 'בנאי לא יכול להיות וירטואלי: הוא רץ בזמן שהאובייקט עדיין נבנה, ואין עדיין טבלת פונקציות וירטואליות מלאה. הרצה אישרה ש-`virtual A() {}` לא מתקמפל.\nהורס יכול להיות (ואף רצוי), פונקציה טהורה היא וירטואלית מעצם הגדרתה, ופונקציה שנורשת כ-`protected` אפשר להפוך לוירטואלית בנגזרת (הכול התקמפל).\nהתשובה היא א.',
 10: 'בנאים אפשר להעמיס (הרצנו שלוש חתימות), פונקציה טהורה אפשר להעמיס, ופונקציה מורשית מוגנת אפשר להעמיס. להורס יש חתימה אחת בלבד: בלי פרמטרים. הגדרה של `~A(int)` לא התקמפלה.\nהתשובה היא ב.',
 11: 'השורה `Utest ut = Utest(20);` יוצרת זמני ומעתיקה אותו, אך הקומפיילר מבטל את ההעתקה (copy elision, מובטח מ-C++17) ולכן הבנאי רץ פעם אחת בלבד עם 20.\nהפלט הוא `d = 20` (תשובה ד). תשובה ב מניחה שבנאי ברירת המחדל רץ גם הוא, ותשובה ג מניחה הדפסה כפולה. הרצה עם clang++ הדפיסה פעם אחת.',
 12: 'הביטוי `h.setRoom(5).getSize()` מפעיל מתודה על ערך ההחזרה של `setRoom`. אם ההחזרה היא הפניה (`House&`), זה אותו אובייקט `h` ולכן `getSize()` מחזיר 120, ונוצר רק אובייקט אחד.\n- ב מחזירה `House*` ולכן `.getSize()` לא מתקמפל.\n- ג מחזירה `void`, לא מתקמפל.\n- ד מחזירה עותק: זה מתקמפל ומדפיס 120, אבל נוצר אובייקט שני, בניגוד לנאמר בשאלה.\nהתשובה היא א.',
 14: '`vector<float> vf(5)` מאותחל לחמישה אפסים. האיטרטור מתחיל באינדקס 2, והלולאה רצה כל עוד הוא לא שווה ל-`--vf.end()`, כלומר לאיבר האחרון (אינדקס 4). לכן מודפסים האיברים באינדקסים 2 ו-3: `00`.\nהתשובה היא ד. הפלט `00000` מניח שמדפיסים את כל המערך, ו-`12345` מניח אתחול שונה.',
 15: 'המשתנה `static int c` משותף לכל הקריאות לבנאי. `X a;` מדפיס `0+0=0`. `X b(1);` מדפיס `1+1=2`. `X c = b;` משתמש בבנאי העתקה מובנה שלא מדפיס כלום. `c = X(3);` יוצר זמני: `3+2=5`, וההשמה המובנית לא מדפיסה.\nהפלט `025` (תשובה ג). תשובה ב ו-ד מניחות שגם ההעתקה מדפיסה.',
 16: 'לכל מופע של התבנית (`Uone<int>` ו-`Uone<float>`) יש משתנה סטטי נפרד. `u1` ו-`u2` חולקים את `Uone<int>::uone`, ולכן אחרי `u2(2)` ערכו 2 וגם `u1.uone` מחזיר 2. `u3` שייך ל-`Uone<float>` וערכו 3.\nהפלט `223` (תשובה ד). תשובה ג מניחה שלכל אובייקט יש עותק משלו.',
 17: 'ההצהרה `friend void f(X x);` מקנה גישה רק להעמסה בעלת הפרמטר היחיד. ב-`f(X x)` גישה ל-`b` תקינה. ב-`f(X x, int k)`, שהיא פונקציה אחרת ואינה friend, השורה `x.b = 1;` היא שגיאה.\nשורה אחת (תשובה ב). הגישה ל-`x.a` ציבורית ולכן תקינה בשתי הפונקציות.',
 18: 'מחלקה `A` יכולה להחזיק `B*` ומחלקה `B` יכולה להחזיק `A*` בעזרת הצהרה מקדימה (`class B;`). מצביעים הם בעלי גודל ידוע, ולכן אין בעיית הגדרה מעגלית כמו בהכלה לפי ערך. בהרצה הצבנו את האובייקטים זה על זה וקיבלנו שהקשר דו-כיווני.\nהתשובה היא ג (אפשרי, אך דורש הצהרה מקדימה). תשובה א שגויה, ב שגויה כי גם `A` יכול להצביע חזרה, ו-ד שגויה כי סוג הגישה של המצביעים אינו משנה.',
 19: 'ב-`main` מבוצע `cout << X();` בלבד, בלי שרשור. לכן כל אחת מהחתימות א, ב ו-ד מתקמפלת ומדפיסה `1`: ערך ההחזרה פשוט נזרק. הגרסה הכללית והמומלצת היא א (מחזירה `ostream&` ומאפשרת שרשור), אבל לא היא היחידה שעובדת כאן.\nהתשובה היא ג (כל שלוש). הרצת שלוש הגרסאות הדפיסה `1`.',
 20: '`f1(int)` וירטואלית ב-`X` ולכן הקריאה דרך `X*` שמצביע על `Y` מפעילה את הגרסה של `Y`: `2+1=3`. לעומת זאת `f1(int,int)` אינה וירטואלית ב-`X` (ה-`virtual` ב-`Y` לא משנה את הקריאה דרך `X*`), ולכן רצה הגרסה של `X`: `2`.\nהפלט `32` (תשובה ד). תשובה ב מניחה שגם השנייה דינמית.',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "21B-B",
    "examLabel": "2021 סמסטר ב מועד ב",
    "year": 2021,
    "examDate": "26.07.2021",
    "sourceFile": "2021/סמ׳ ב מועד ב.pdf",
    "keyFile": "none (answers derived by compiling/running with clang++, tools/verify/21B-B)",
    "contexts": {
        "notes": {
            "kind": "text",
            "title": "הערות משותפות לגבי התוכן של כל השאלות",
            "text": "בכל שאלה שבה נדרש לרשום בכמה שורות יש שגיאות בקטע הקוד, יש להסתכל על כל הקוד גם זה שלפני הפונקציה `main`. בנוסף לכך בכל השאלות מהסוג הזה ניתן להניח שאין שגיאה מהסוג של רווח מיותר, או חוסר ברווח, וכן אין שגיאה מהסוג של נקודה פסיק מיותרת או חוסר בנקודה פסיק.\n"
                    "בכל שאלה שבה יש תשובה: \"אף תשובה אינה נכונה\" הכוונה שמבין התשובות האחרות אף תשובה אינה נכונה.\n"
                    "בכל שאלה יש רק תשובה אחת נכונה ביותר. אם יש שתי תשובות נכונות יש לסמן את התשובה הנכונה ביותר מבין השתיים.\n"
                    "כאשר נתון קטע קוד ולאחריו מספר משפטים, יש לסמן את המשפט הנכון ביותר בהקשר לקטע הקוד הנתון.\n"
                    "בכל שאלה מהסוג \"מה מדפיסה התכנית הבאה\", יש לקרוא את הפלט שמצוין בתשובות משמאל לימין.\n"
                    "בכל אחד מקטעי הקוד הבאים יש להניח ששתי השורות הבאות קיימות בתחילת הקטע:\n"
                    "```cpp\n#include <iostream>\nusing namespace std;\n```",
        }
    },
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
