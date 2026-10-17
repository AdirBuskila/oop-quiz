# -*- coding: utf-8 -*-
"""Generator for tools/raw/22S-B.json -- oop (61307), 2022 summer semester, moed B (25/10/2022).
Run: PYTHONUTF8=1 py tools/gen/gen_22S-B.py

Source: 15-page paper (15 MCQ x 7 pts, 4 options). The file is named "+ solution" but carries NO answer source
(the answer form on page 1 is blank), so every key here was derived by compiling/running the printed code with clang++
(tools/verify/22S-B/check.py) or by the language rule, and is stored as answerSource "solved", official:false.
`void main` in the exam is MSVC style; the harness rewrites it to `int main` for clang."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "22S-B.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


KEYS = {1: "a", 2: "d", 3: "a", 4: "a", 5: "a", 6: "b", 7: "c", 8: "c", 9: "b", 10: "c", 11: "a", 12: "b",
        13: "b", 14: "a", 15: "a"}
# Q1 is held (evaluation order of the operands of `*` is unspecified: clang prints 6561 = option a, a right-to-left
# compiler such as MSVC would print 3024 = option b); Q3/Q5/Q15 are language-rule judgement calls (confidence med).
HOLD = {1: "unspecified-evaluation-order: the operands of binary * are unsequenced even in C++17 (P0145 sequenced only <<, >>, =, op=, [], ->*, and the callee before its arguments); clang++ reads x after the call and prints 6561 (a), an order that reads x first gives 3024 (b); no key in source"}
MED = {3, 5, 15}
EXPL = {
    2: "הקוד מגיע לשורה `p[0].f(2,3)`, ושם `p` הוא מצביע מטיפוס `A*`, ולכן `p[0]` הוא אובייקט מטיפוס `A`. בשפה הפונקציה שנקראת נבחרת לפי הטיפוס הסטטי: ב-`A` הפונקציה `f` מקבלת ארגומנט אחד (`int i = 7`), והקריאה שולחת שניים. ההגדרה `f(int k, int q)` של `B` לא נראית דרך `A`. זו שגיאת קומפילציה (clang++: too many arguments to function call), ולכן התוכנית אינה מתקמפלת (תשובה ד) ואף פלט אינו מודפס. שלוש האפשרויות האחרות מתארות הרצה שלא מתרחשת.",
    3: "ה-vtable נוצרת פעם אחת לכל מחלקה שיש בה (או בבסיס שלה) לפחות פונקציה וירטואלית, ולא לכל מחלקה (ד שגויה) ולא לכל אובייקט (ב שגויה). כל אובייקט של מחלקה כזו מחזיק רק מצביע (`vptr`) אל ה-vtable של המחלקה שלו. הטענה ג שגויה כי ה-vtable מכילה מצביעים לפונקציות הוירטואליות בלבד, לא לתכונות. נשארת א כטענה הקרובה ביותר לנכון: ה-vtable קיימת עבור מחלקה שמכילה לפחות פונקציה וירטואלית אחת.",
    4: "ההצהרה `A arr[3]` מפעילה את בנאי ברירת המחדל שלוש פעמים, ומדפיסה שלוש שורות `A's Constructor 6`. אחר כך `arr[0] = arr[1]` קוראת לאופרטור ההשמה ומדפיסה `A= 6` (`other.x` הוא 6). לבסוף `arr[0].f()` מדפיסה `A's f 8` (ערך ברירת המחדל). הפלט הוא האפשרות א. בשתי האפשרויות האחרות הסדר שגוי, ואין קריסה בהרצה (הרצת clang++ הדפיסה בדיוק את הפלט של א).",
    5: "פונקציה חברה (`friend`) מוצהרת בתוך גוף המחלקה עם המילה `friend`, אבל היא אינה חלק מהמחלקה (אינה פונקציה חברה-מחלקה) ולכן היא פונקציה גלובלית שמותר לה לגשת לחברים הפרטיים. זו האפשרות א. האפשרות ג שגויה כי `friend` אינה פונקציה של המחלקה, וד הפוכה מההגדרה.",
    6: "הרשאת `protected` מאפשרת גישה לחברים רק מתוך המחלקה עצמה ומתוך מחלקות שיורשות ממנה, ולא מבחוץ. זו האפשרות ב. א מתארת את `public`, ג מתארת את `private`, ולכן ד שגויה.",
    7: "ל-`Counter<B>` ול-`Counter<C>` יש `counter` סטטי נפרד לכל אחד, כי כל מופע של התבנית הוא מחלקה נפרדת. האובייקט הגלובלי `C c` נבנה לפני `main` ומקדם את מונה `C` ל-1. ב-`main`: `B b` מקדם את מונה `B` ל-1 (`id` 1), ו-`static C c` מקדם את מונה `C` ל-2. ההדפסה הראשונה: `B::getCounter()` הוא 1, `b.getId()` הוא 1, `C::getCounter()` הוא 2, כלומר `112`. אחר כך `new C()` מקדם את מונה `C` ל-3 (`id` 3): `1`, `3`, `3`, כלומר `133`. הפלט `112133` (תשובה ג), וכך גם הרצת clang++.",
    8: "האובייקט הגלובלי `b` נבנה לפני `main`: קודם הבסיס `A` (`ea`), אחר כך החבר `C c` (`c`), ואז גוף הבנאי של `B` (`eb`), כלומר `eaceb`. ב-`main` נבנים `a` (`ea`) ו-`c` (`c`): `eac`. בסיום `main` הם נהרסים בסדר הפוך: `C` ואז `A`. לבסוף, בסיום התוכנית, נהרס `b`: קודם גוף `~B` (`B`), אחר כך החבר `c` (`C`), ואז הבסיס (`A`). הפלט הוא `eacebeacCABCA` (תשובה ג), וכך גם הרצת clang++.",
    9: "ההדפסה הראשונה `cout << c1` מדפיסה 4. אחרי `c1 = c1 + c2` הערך הוא 4+5=9, וההדפסה השנייה מדפיסה 9. הפלט הוא `49` (תשובה ב), וכך גם הרצת clang++.",
    10: "`v[0]+v[1]` הוא `C<double>` שערכו 4.2+5.1=9.3. הפונקציה `f(10)` מחזירה `int`, והביטוי `x + data` הוא `10 + 9.3 = 19.3` שנחתך להמרה ל-`int`, כלומר 19. הפלט הוא `19` (תשובה ג), וכך גם הרצת clang++. התוכנית מתקמפלת.",
    11: "בהרצה מודפס: `A: 8`, `B: hi`, אחר כך בנאי ההעתקה `A (copy)` ו-`B (copy)` (באותיות קטנות), ובסוף יוצאים מ-`main` וההורסים מדפיסים `~B: hi`, `~A 8` פעמיים. בתשובה ב חסרות שורות ההורסים, והמילה `Copy` נכתבה באות גדולה, ולכן היא אינה הפלט. לכן אין תשובה נכונה (תשובה א). התוכנית כן מתקמפלת, וגם סדר הבנייה בתשובה ד שגוי.",
    12: "`A a1(1)` מדפיס `c'tor x=1` ואינו מקדם את `counter` (ארגומנט ברירת המחדל לא מחושב), ולכן `getCounter()` מדפיס `0`. `A()` מחשב את ארגומנט ברירת המחדל `++counter` (מגיע ל-1) ומדפיס `c'tor x=1`. `push_back` של הזמני יוצר עותק (`copy x=1`). `push_back(a1)` גורם להגדלת הווקטור: מועתק האיבר הקיים ונוצר עותק של `a1`, כלומר עוד שני עותקים. בסך הכול שלושה `copy x=1`, ובסוף `getCounter()` הוא `1`. זו תשובה ב, וכך גם הרצת clang++.",
    13: "העמסת האופרטור הפוסטפיקס `++` מזוהה על ידי פרמטר `int` מדומה, והוא מחזיר את הערך הישן **לפי ערך** (עותק), בניגוד לפרפיקס שמחזיר הפניה. לכן `T operator++(int)` (תשובה ב). א חסרה את הפרמטר, ג היא פרפיקס, ו-ד מחזירה הפניה לאובייקט זמני שהוא ערך ישן, מה שאינו תקין.",
    14: "מימוש פונקציה חברה של תבנית מחוץ למחלקה דורש להצהיר מחדש `template <class T>` ולציין `abc<T>::`. זו האפשרות א, והיא מתקמפלת. בב חסר `<T>` בשם המחלקה, ובג ובד התחביר `template<T>` אינו חוקי (חסר `class` או `typename`). כל שלוש האפשרויות האלה נכשלות בקומפילציה (נבדק עם clang++).",
    15: "פונקציה שמוגדרת בתוך גוף המחלקה היא `inline` באופן מרומז, והקומפיילר יכול להטמיע את הגוף במקום הקריאה. הפונקציה `B::f1` מוגדרת מחוץ למחלקה בלי המילה `inline`, ולכן אינה כזו. בגלל זה `class A` מועדפת (תשובה א). שים לב שהשאלה מנוסחת באופן לא חד ('מעודפת'), ולכן הביטחון בתשובה בינוני.",
}


def Q(num, topic, question, options, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "correctId": KEYS.get(num, "a"), "answerSource": "solved", "official": False, "confidence": "high",
         "explanation": "", "note": note}
    q.update(kw)
    return q


TRUE = "איזה בין הטענות הבאות **הטענה הנכונה**? נא לבחור תשובה אחד בלבד!\n"
NONE = "אף תשובה אינה נכונה."
NOCOMP = "התוכנית לא מתקמפלת"
questions = []

# 1
questions.append(Q(1, "cpp_basics_refs", TRUE + "מה מדפיסה התוכנית הבאה:\n" + cb(r'''
#include <iostream>
using std::cout;

int f(int &x, int c) {
    c = c - 1;
    if (c == 0) return 1;
    x = x + 1;
    return f(x, c) * x;
}

void main() {
    int p = 5;
    cout << f(p, p);
}'''), txt("6561", "3024", "5544", NONE),
    "No key in the source; clang++ run decides."))

# 2
questions.append(Q(2, "construction_order", "מה יודפס בקטע קוד הבא ?\n" + cb(r'''
class A {
public:
    A(int i) {
        cout << "A's Constructor" << i << endl;
    }
    A(const A & other) {
        cout << "A's copy Constructor" << endl;
    }
    A& operator=(A& other) {
        cout << "A=" << endl;
        return *this;
    }
    virtual void f(int i = 7) const {
        cout << "A's f" << i << endl;
    }
};
class B:public A {
public:
    B() : A(2) {
        cout << "B's default Constructor" << endl;
    }
    B(int i,int j) : A(i) {
        cout << "B's parameter Constructor" << i << j << endl;
    }
    virtual ~B() {
        cout << "B's Destructor" << endl;
    }
    void f(int k = 9,int q = 10) const {
        cout << "B's f" << k << q << endl;
        A::f(q);
    }
};
int main() {
    B b1(19,20);
    A a1 = b1;
    A* p;
    p = new B[2];
    p[0] = b1;
    p[0].f(2,3);
    return 0;
}'''), txt(
    "A's Constructor19\nB's parameter Constructor1920\nA's copy Constructor\nA's Constructor2\nB's default Constructor\nA's Constructor2\nB's default Constructor\nA=\nB’s f23\nB’s f3\nB's Destructor",
    "B's parameter Constructor1920\nA's Constructor19\nA's copy Constructor\nB's default Constructor\nA's Constructor2\nA's Constructor2\nB's default Constructor\nA=\nB’s f23\nB’s f3\nB's Destructor",
    "A's Constructor19\nB's parameter Constructor1920\nA's copy Constructor\nB's default Constructor\nA's Constructor2\nA's Constructor2\nB's default Constructor\nB's Destructor\nA=\nB’s f23\nB’s f3",
    NOCOMP), "No key in the source; clang++ run decides."))

# 3
questions.append(Q(3, "virtual_polymorphism", TRUE, txt(
    "ה- `virtual table` נוצרת עבור האובייקט של המחלקה המכילה לפחות פונקציה וירטואלית אחת",
    "ה- `virtual table` נוצרת עבור כל אובייקט ב- C++",
    "ה- `virtual table` מציינת מצביע עבור כל הפונקציות ותכונות במחלקה וירטואלית",
    "ה- `virtual table` נוצרת עבור כל מחלקה ב- C++"), "No key in the source; language rule."))

# 4
questions.append(Q(4, "construction_order", "מה יודפס בקטע הקוד הבא?\n" + cb(r'''
class A {
public:
    int x;
    A() {
        x = 6;
        cout << "A's Constructor " << x << endl;
    }
    A(int i) {
        cout << "A's Constructor " << i << endl;
        x = i;
    }
    A(const A& other) {
        cout << "A's copy Constructor " << endl;
    }
    A& operator=(A& other) {
        cout << "A= " << other.x << endl;
        return *this;
    }
    void virtual f(int i = 8) const {
        cout << "A's f " << i << endl;
    }
};
void main(){
    A arr[3];
    arr[0] = arr[1];
    arr[0].f();
}'''), txt(
    "A's Constructor 6\nA's Constructor 6\nA's Constructor 6\nA= 6\nA's f 8",
    "A's Constructor 6\nA's Constructor 6\nA's Constructor 6\nA's f 8\nA= 6",
    "A's Constructor 6\nA's Constructor 6\nA's f 8\nA's Constructor 6\nA= 6",
    "התוכנית תקרוס תוך כדי ריצה"), "No key in the source; clang++ run decides."))

# 5
questions.append(Q(5, "friend_this_static", TRUE + "הפונקציה החברה (`friend`) היא:", txt(
    "פונקציה הנחתמת בגוף המחלקה כולל תכונת `friend`, אבל לא שייכת למחלקה והיא פונקציה גלובלית.",
    "פונקציה של מחלקה אחרת הנחתמת במחלקה הנוכחית עם תכונת `friend`.",
    "פונקציה של המחלקה כולל תכונת `friend`.",
    "הפונקציה של המחלקה הנוכחית שנחתמת במחלקה אחרת."), "No key in the source; language rule."))

# 6
questions.append(Q(6, "inheritance_access", TRUE + "הרשאה `protected` במחלקה מאפשרת:", txt(
    "תכונות ופונקציות של המחלקה ניתן לזמן גם בתוך המחלקה וגם להשתמש בהם מחוץ למחלקה.",
    "תכונות ופונקציות של המחלקה ניתן לזמן אך ורק בתוך המחלקה או במחלקות נגזרות (יורשות) ממנה.",
    "תכונות ופונקציות של המחלקה ניתן לזמן אך ורק בתוך המחלקה.",
    "אף טענה לא נכונה."), "No key in the source; language rule."))

# 7
questions.append(Q(7, "templates", "מה יודפס ?\n" + cb(r'''
template<class T>class Counter
{
    static int counter;
    const int id;
public:
    Counter() :id(++counter) {}
    int getId() { return id; }
    static int getCounter() { return counter; }
};
class B : public Counter<B> {};
class C : public Counter<C> {};
template<class T>
int Counter<T>::counter = 0;
C c;
int main()
{
    B b;
    static C c;
    cout << B::getCounter() << b.getId() ; cout << C::getCounter();
    C* pc = new C();
    cout << B::getCounter() ;
    cout << C::getCounter()  << pc->getId() ;
    return 1;
}'''), txt("התוכנית לא עוברת קומפילציה", "התוכנית זורקת הודעת חריגה", "112133", "111223"),
    "No key in the source; clang++ run decides."))

# 8
questions.append(Q(8, "construction_order", "מה יודפס ?\n" + cb(r'''
class A {
public: A() { cout << "ea"; }
    ~A() { cout << "A"; }
};
class C {
public: C() { cout << "c"; }
    ~C() { cout << "C"; }
};
class B :public A {
public:
    C c;
    B() {
        cout << "eb";
    }
    ~B() { cout << "B"; }
};
B b;
int main()
{
    A a;
    C c;
    return 0;
}'''), txt("התוכנית לא עוברת קומפילציה", "acbaceacCACBA", "eacebeacCABCA", "eacaccabCCAAB"),
    "No key in the source; clang++ run decides."))

TMPL = r'''
template <typename T>
class C {
    template <typename S>
    friend ostream& operator<<(ostream& out, C<S> c1) {
        out << c1.data;
        return out;
    }
private:
    T data;
public:
    C(T d) {
        data = d;
    }
    C(const C& other) {
        data = other.data;
    }
    C operator+(C<T>& other) {
        C res(data + other.data);
        return res;
    }
    bool operator!=(C& other) {
        return data != other.data;
    }
    int f(int x) {
        if (x < 0)
            return x;
        return x + data;
    }
};
'''
MAIN9 = r'''
int main() {
    C<int> c1(4), c2(5);
    cout << c1;
    c1 = c1 + c2;
    cout << c1;
    return 0;
}'''
MAIN10 = r'''
int main() {
    vector<C<double>> v;
    C<double> c1(4.2);
    v.push_back(c1);
    C<double> c2(5.1);
    v.push_back(c2);
    cout << (v[0]+v[1]).f(10) << endl;
    return 0;
}'''

# 9
questions.append(Q(9, "templates", "מה יודפס בקטע קוד הבא ?\n" + cb(TMPL + MAIN9),
    txt("94", "49", "904", "409"), "No key in the source; clang++ run decides."))

# 10
questions.append(Q(10, "templates", "מה יודפס באותו קטע קוד לעייל (שאלה 9) כאשר נריץ את פונקציית `main` הבאה:\n" + cb(TMPL + MAIN10),
    txt("38", "83", "19", "התוכנית לא עוברת קומפילציה"), "No key in the source; clang++ run decides."))

# 11
questions.append(Q(11, "construction_order", "מה יודפס בקטע קוד הבא ?\n" + cb(r'''
class A
{
    int x;
public:
    A(int x) : x(x) { cout << "A: " << x << "\n"; }
    A(const A& other) : x(other.x) { cout << "A (copy)\n"; }
    ~A() { cout << "~A " << x << "\n"; }
    virtual void toOs(ostream& os) const {}
    friend ostream& operator<<(ostream& os, const A& a)
    {
        os << a.x;
        a.toOs(os);
        return os;
    }
};
template<class T>
class B : public A
{
    T val;
public:
    B(const T& t, int x = 3) : A(x), val(t)
    {
        cout << "B: " << val << "\n";
    }
    B(const B& other) : A(other), val(other.val)
    {
        cout << "B (copy)\n";
    }
    ~B() { cout << "~B: " << val << "\n"; }
    virtual void toOs(ostream& os) const override
    {
        os << " " << val << endl;
    }
};
void main()
{
    B<const char*> b1("hi", 8);
    B<const char*> b2(b1);
}'''), txt("אין תשובה נכונה", "A: 8\nB: hi\nA (Copy)\nB (Copy)", "התוכנית לא מתקמפלת", "A (Copy)\nB (Copy)\nA: 8\nB: hi"),
    "No key in the source; clang++ run decides."))

# 12
questions.append(Q(12, "friend_this_static", "מה יודפס בקטע קוד הבא ?\n" + cb(r'''
class A
{
    static int counter;
    int x;
public:
    A(int x = ++counter) : x(x) { cout << "c'tor x=" << x << endl; }
    A(const A& other) : x(other.x) { cout << "copy x=" << x << endl; }
    static int getCounter() { return counter; }
    friend ostream& operator<<(ostream& os, const A& a)
    {
        os << a.x << " " << a.counter << endl;
        return os;
    }
};
int A::counter = 0;
void main()
{
    vector<A> arr;
    A a1(1);
    cout << A::getCounter() << endl;
    arr.push_back(A());
    arr.push_back(a1);
    cout << A::getCounter() << endl;
}'''), txt(
    "c'tor x=1\n2\nc'tor x=1\ncopy x=1\ncopy x=1\nc'tor x=1\n1",
    "c'tor x=1\n0\nc'tor x=1\ncopy x=1\ncopy x=1\ncopy x=1\n1",
    "c'tor x=1\n1\nc'tor x=1\ncopy x=1\ncopy x=1\n0",
    "התוכנית תופסק בזמן ריצה"), "No key in the source; clang++ run decides."))

# 13
questions.append(Q(13, "operator_overloading",
    "בחר את ההגדרה **המתאימה ביותר** ל – `overloading` של `postfix ++` , בהנחה של `Class` קוראים `T` :",
    txt("`T operator ++`", "`T operator++(int)`", "`T& operator++()`", "`T& operator++(int)`"),
    "No key in the source; language rule."))

# 14
questions.append(Q(14, "templates", "לפניך ההגדרה הבאה:\n" + cb(r'''
template <class T>
class abc{
    void f();
};''') + "\nבחר את הגדרה הנכונה למימוש הפונקציה (מתודה) `f` :", txt(
    cb("template <class T>\nvoid abc<T>::f() { }"),
    cb("template<class T>\nvoid abc::f() { }"),
    cb("template<T>\nvoid abc<class T>::f() { }"),
    cb("template<T>\nvoid abc<T>::f() { }")), "No key in the source; compile-checked."))

# 15
questions.append(Q(15, "classes_ctor_dtor", "איזה בין הגדרות הבאות של המחלקות `A` ו-`B` מעודפת:\n" + cb(r'''
class A {
public:
    void f1(){
        //code
    }
};
class B {
public:
    void f1();
};
void B::f1(){
    //code
};'''), txt("`class A`", "`class B`", "אין הבדל", "תלוי בקוד"), "No key in the source; language rule."))

SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    n = q["num"]
    if n in EXPL:
        q["explanation"] = EXPL[n] + SIG
    if n in MED:
        q["confidence"] = "med"
    if n in HOLD:
        q["hold"] = HOLD[n]
        for k in ("correctId", "answerSource", "official", "confidence", "explanation"):
            q.pop(k, None)

exam = {
    "examCode": "22S-B",
    "examLabel": "2022 סמסטר קיץ מועד ב",
    "year": 2022,
    "examDate": "25.10.2022",
    "sourceFile": "2022/סמ׳ ג מועד ב + פתרון.pdf",
    "keyFile": "none (no answer source in the file; keys derived by clang++ runs, tools/verify/22S-B/)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
