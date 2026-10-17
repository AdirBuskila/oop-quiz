# -*- coding: utf-8 -*-
"""Generator for tools/raw/21B-A.json -- oop (61307), 2021 semester B, moed A (24/06/2021), version 1 (20 MCQ, 4 options).
Run: PYTHONUTF8=1 py tools/gen/gen_21B-A.py

Source: 18-page paper "גירסה 1" (page 1 is the cover with instructions, page 2 the shared notes). Version 2 of the same sitting has the same questions in another order and is not
transcribed separately. There is NO official key: the only source is a two-page file of hand-marked student answer sheets (not trusted, version unknown).
Every question was compiled/run with clang++ (tools/verify/21B-A/check.py) and the key is the result of the run, marked answerSource "solved", official false.
The student sheet 1 agrees with the run on 18 of 20 questions (the two exceptions are the undefined-behaviour questions Q6 and Q13, which are held).
Held: Q6 (heap corruption at the third call of f, so 'before the third call' is not literally true), Q13 (out-of-bounds write: prints 3 at -O0, garbage at -O2; MSVC debug would stop with a runtime error).
`void main` in the exam is MSVC style; the harness rewrites it to `int main` for clang."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "21B-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "correctId": correct,
         "answerSource": "solved", "official": False, "confidence": "high", "contextId": "notes",
         "explanation": "", "note": note}
    q.update(kw)
    return q


def held(q, reason):
    q["hold"] = reason
    q["confidence"] = "low"
    del q["correctId"], q["answerSource"], q["official"]
    return q


COUNT = "בכמה שורות בקטע הקוד הבא יש שגיאות?"
PRINTS = "מה מדפיסה התכנית הבאה?"
CNT = ("0", "1", "2", "יותר מ-2")
questions = []

questions.append(Q(1, "cpp_basics_refs", COUNT + "\n" + cb(r'''
void f(int& i) {
    i++;
    cout << i << endl;
};

int main()
{
    int i = 3, j = 2;
    f(i);
    f(i+j);
    f(5);
    f(i + 1);
}'''), txt(*CNT), "d",
    "Key from the clang++ run (student sheet agrees): errors on f(i+j), f(5), f(i + 1) -> 3."))

questions.append(Q(2, "cpp_basics_refs", PRINTS + "\n" + cb(r'''
int f(int x, int y=3, int z) {
    return x + y + z;
}

int main()
{
  cout << f(1,3,5) << f(1,3) << f(1,4,2) << endl;
}'''), txt("התכנית לא עוברת קומפילציה", "`947`", "`749`", "`944`"), "a",
    "Key from the clang++ run (student sheet agrees): error 'missing default argument on parameter z'."))

questions.append(Q(3, "classes_ctor_dtor", COUNT + "\n" + cb(r'''
class A {
public:
    A(int a, int b = 3) { x = a; y = b; }
    int x,y;
};


int main() {
    A a1;
    A a2(2);
    A a3(2, 3);
    A a4(2, 3, 4);
    A a5=a3;
    a3 = a2;
}'''), txt(*CNT), "c",
    "Key from the clang++ run (student sheet agrees): errors on `A a1;` (no default constructor) and `A a4(2, 3, 4);` -> 2."))

questions.append(Q(4, "const_references", COUNT + "\n" + cb(r'''
class A {
public:
    A(int z) { x = z; }
    int x;
    void f() { cout << x; }
    void f() const { cout << x; }
    void setX(int z) { x = z; }
};

int main() {
    A a1(4);
    a1.setX(8);
    const A a2(6);
    a1.f();
    a2.f();
    a2.setX(5);
    A a3 = a2;
}'''), txt(*CNT), "b",
    "Key from the clang++ run (student sheet agrees): only `a2.setX(5);` fails (non-const member on a const object)."))

questions.append(Q(5, "friend_this_static", COUNT + "\n" + cb(r'''
class A {
public:
    A(int i=0) { x = i;}
    A& f(int i) {
        x = 2 * i;
        return *this;
    }
    A* g(int i) {
        x = 2 + i;
        return this;
    }
    int x;
};

int main() {
    A a1;
    a1.f(5).g(4);
    (&a1)->g(3).x = 5;
    a1.f(2)->x = 6;
    a1.f(2).x.g(2);
    a1.g(3)->f(4);
}'''), txt(*CNT), "d",
    "Key from the clang++ run (student sheet agrees): errors on `(&a1)->g(3).x`, `a1.f(2)->x` and `a1.f(2).x.g(2)` -> 3."))

q6 = held(Q(6, "copy_control", "נתונה התכנית הבאה:\n" + cb(r'''
class A {
public:
    A(int i = 10) {
        n = i;
        p = new int[n];
        for (int j = 0; j < n; j++) { p[j] = 0; }
    }
    ~A() { delete p; }
    int n;
    int* p;
};

int f(A a) { return 2*a.n; }

int main() {
    A a1(5), a2(5);
    cout << 1 << endl;
    f(a1);
    cout << 2 << endl;
    f(a2);
    cout << 3 << endl;
    f(a1);
    cout << 4 << endl;
    f(a2);
}'''), txt("התכנית תתקמפל ותרוץ ללא שגיאות", "התכנית לא עוברת קומפילציה", "בזמן הרצת התכנית תקרה שגיאת זמן ריצה לפני הקריאה השלישית לפונקציה `f`", "אף תשובה אינה נכונה"), None,
    "Held. The class has no copy constructor, so every call f(a) by value shares the pointer with the argument and the destructor frees it; the first call to f(a1) and f(a2) free "
    "their pointers, the THIRD call f(a1) frees a1.p again. clang++ run: prints 1, 2, 3, then the process dies with heap corruption (exit 0xC0000374) inside the third call, before 4. "
    "Student sheet marks c, but 'before the third call' is not literally what happens (the crash is during it), and the behaviour is undefined."),
    "Undefined behaviour and wording: the runtime error happens during (not before) the third call f(a1); student sheet says c, a literal reading gives d.")
questions.append(q6)

questions.append(Q(7, "operator_conversions", COUNT + "\n" + cb(r'''
class A {
public:
    A(int i) {x=i;}
    operator int() {return x;}
    int x;
};

void main()
{
    A a1(5); int i=3;
    A a2=i;
    i=a1;
    i=(int) a1;
    a1=(A)i;
}'''), txt(*CNT), "a",
    "Key from the clang++ run (student sheet agrees): no errors."))

questions.append(Q(8, "construction_order", PRINTS + "\n" + cb(r'''
class B {
public:
    B() {cout << 1; }
    B(int i) {
        cout << 2;
        x = i;
    }
    int x;
};

class A : public B {
public:
    A(int y = 5, int x = 10) : B(x) {
        cout << 3;
        this->y = y;
        this->x = 8;
    }
    void f() const { cout << x << y; }
    int y;
};

void main()
{
    A a(5, 7);
    a.f();
}'''), txt("התכנית לא עוברת קומפילציה", "`23105`", "`123105`", "`2385`"), "d",
    "Key from the clang++ run (student sheet agrees): printed 2385."))

questions.append(Q(9, "inheritance_access", COUNT + "\n" + cb(r'''
class A {
public:
    A(int i=0) { na = i; }
protected:
    int na;
};

class B : private A {
public:
    B(int i, int j) :A(j) { nb = i; }
    int f() { return na; }
protected:
    int nb;
};

class C : private B {
public:
    C(int i, int j, int k) : B(j, k) {
        nc = i;
    }
    int f() {
        int i = nb;
        return na;
    }
protected:
    int nc;
};'''), txt(*CNT), "b",
    "Key from the clang++ run (student sheet agrees): only `return na;` in C::f fails (na became private in B)."))

questions.append(Q(10, "copy_control", PRINTS + "\n" + cb(r'''
class A {
public:
    A(int i) { na = i; }
    A& operator=(const A& a) {
        na = a.na * 2;
        return *this;
    }
    int na;
};

class B : public A {
public:
    B(int i, int j) : A(j) {
        nb = i;
    }
    int nb;
};

void main()
{
    B b1(1, 2);
    B b2(3, 4);
    b2 = b1;
    cout << b2.nb << b2.na;
}'''), txt("`14`", "`34`", "`12`", "אף תשובה אינה נכונה"), "a",
    "Key from the clang++ run (student sheet agrees): printed 14."))

questions.append(Q(11, "abstract_multiple", "כיצד ניתן לתקן שגיאות שמופיעות בקטע הקוד הבא:\n" + cb(r'''
class X
{
protected:
    int key;
public:
    X(int i = 0) { key = i;};
    void f1() { cout << "f1 from X" << endl; }
};

class Y :  public X
{
public:
    Y(int i = 0) {key = i;};
    void f1() { cout << "f1 from Y" << endl; }
};

class Z :  public X
{
public:
    Z(int i = 0) { key = i; };
    void f1() { cout << "f1 from Z" << endl; }
};

class A : public Y, public Z {
    int key;
public:
    A(int i = 0) : Y(i + 2), Z(i + 3)
    {
        key = Y::key + Z::key;
    }
    int getkey(void) { return key; }
    void f1() { cout << "f1 from A" << endl; }
};
void main() {
    A object(4);
    cout << "object.key = " << object.getkey()<<endl;
    object.f1();
}'''), txt("אין צורך לתקן שגיאות כי בקטע הקוד הנ\"ל אין שגיאות", "לדייק את הקריאה לפונקציה `f1` שמופיעה בשורה האחרונה בפונקציה `main`",
           "לשנות את ההצהרה של הפונקציה `f1` במחלקה `X` כך שתהיה פונקציה וירטואלית", "לא ניתן לתקן את השגיאות בקטע הקוד הנ\"ל"), "a",
    "Key from the clang++ run (student sheet agrees): the code compiles and prints `object.key = 13` and `f1 from A` (A::f1 hides the two inherited f1; Y::key and Z::key are named explicitly)."))

questions.append(Q(12, "const_references", COUNT + "\n" + cb(r'''
void main()
{
    int i = 12;
    const int ci = 12;
    ci = 13;
    const int* ip3 = &i;
    i = 10;
    *ip3 = 10;
}'''), txt(*CNT), "c",
    "Key from the clang++ run (student sheet agrees): `ci = 13;` and `*ip3 = 10;` fail -> 2."))

q13 = held(Q(13, "templates", PRINTS + "\n" + cb(r'''
template <class T, int n>
class Array {
public:
    T &operator[](int i)
    {
        return a_[i];
    }
    const T& operator[](int i) const
    {
        return a_[i];
    }
private:
    T a_[n];
};
void main()
{
    Array <int, 12 > ia;
    ia[20] = 3;
    ia[3] = ia[20];
    cout << ia[3];
}'''), txt("התכנית לא עוברת קומפילציה", "בתכנית יש שגיאת זמן ריצה", "`3`", "תווים בלתי צפויים (זבל) כלשהם"), None,
    "Held. The program compiles; `ia[20]` writes past the 12-element array on the stack (undefined behaviour). clang++ run: prints 3 at -O0 and a garbage number at -O2; "
    "a debug MSVC build would report a stack-corruption runtime error. Student sheet marks b, a literal run gives c or d depending on optimisation."),
    "Undefined behaviour (out-of-bounds write): clang++ prints 3 at -O0 and garbage at -O2; student sheet says b (runtime error).")
questions.append(q13)

questions.append(Q(14, "stl_exceptions", cb(r'''
void main()
{
    int* ip = new int[12];
    for (int i = 0; i < 12; i++)
        ip[i] = 2 * i;

    vector<int> iv(12);
    for (int j = 0; j < iv.size(); ++j)
        iv[j] = 2 * j;
}''') + "\n(בדף אין ניסוח של שאלה: בוחרים את המשפט הנכון לגבי הקוד)",
    txt("הקוד המוצג בשלוש השורות הראשונות בפונקציה `main` טוב יותר מהקוד המוצג בשלוש השורות האחרונות בפונקציה `main`",
        "הקוד המוצג בשלוש השורות האחרונות בפונקציה `main` טוב יותר מהקוד המוצג בשלוש השורות הראשונות בפונקציה `main`",
        "הקוד המוצג בשלוש השורות הראשונות בפונקציה `main` טוב ובאותה מידה גם הקוד המוצג בשלוש השורות האחרונות בפונקציה `main` הוא טוב",
        "הקוד המוצג בשלוש השורות הראשונות אינו טוב ובאותה מידה גם הקוד המוצג בשלוש השורות האחרונות אינו טוב"), "b",
    "Key from reasoning plus a run (student sheet agrees): an allocation counter shows the raw `new int[12]` is never freed (1 live block after its scope) while the vector releases its memory (0). "
    "The printed question has no stem line. Design/style question, so confidence med.",
    confidence="med"))

questions.append(Q(15, "classes_ctor_dtor", COUNT + "\n" + cb(r'''
class A {
    int n;
public:
    A(int m = 0) {n=m;}
};

A a1(5);
A a2;
A a3();

void main() {}'''), txt(*CNT), "a",
    "Key from the clang++ run (student sheet agrees): no errors (`A a3();` is a function declaration)."))

questions.append(Q(16, "virtual_polymorphism", PRINTS + "\n" + cb(r'''
class B{
public:
    virtual ~B() {};
    virtual int getN() const
    { return n; }
    virtual void setN(int nn)
    {  n=nn; }
protected:
    int n;
};

class D: public B{
public:
    virtual int getN() const
    {
        return n*n;
    }

    virtual void setN(int nn)
    {
        n = 2*nn; }
};

void main()
{
    B b;
    D d;
    d.setN(5);
    b = d;
    cout << b.getN();
}'''), txt("התכנית לא עוברת קומפילציה", "`25`", "`10`", "`100`"), "c",
    "Key from the clang++ run (student sheet agrees): printed 10 (slicing: b is a B holding n == 10)."))

questions.append(Q(17, "templates", "בקטע הקוד הבא ישנן שלוש קריאות לפונקציה בשם `f` בתוך הפונקציה `main`\n" + cb(r'''
template<class T>
void f(T t){}

template<class T>
void f(T* t) {};

void main()
{
    int* p, i=3;
    double d = 3.1415;
    p = &i;
    f(i);
    f(d);
    f(p);
}'''), txt("כל שלושת הקריאות פונות לאותה כתובת, ואין שגיאת קומפילציה בקטע הקוד הנ\"ל", "כל שלושת הקריאות פונות לכתובות שונות ואין שגיאת קומפילציה בקטע הקוד הנ\"ל",
           "שתיים מבין הקריאות פונות לאותה כתובת ושלישית לכתובת אחרת, ואין שגיאת קומפילציה בקטע הקוד הנ\"ל", "בקטע הקוד הנ\"ל יש שגיאת קומפילציה"), "b",
    "Key from the clang++ run (student sheet agrees): compiles; the three calls instantiate f<int>(int), f<double>(double) and f<int>(int*) (three different functions)."))

questions.append(Q(18, "operator_conversions", PRINTS + "\n" + cb(r'''
#include <string.h>

class MySting {
public:
    MySting(const char* s) {
        s_ = new char[strlen(s) + 1];
        strcpy(s_,s);
    }
    friend MySting operator+(const MySting&, const MySting&);
    operator const char* () const { return s_; }
private:
    char* s_;
};

MySting operator+(const MySting &s1, const MySting &s2)
{
    MySting sum("a");
    sum.s_=strcat(s1.s_, s2.s_);
    return sum;
}

void main()
{
    MySting s1("a"), s2("b");
    MySting temp = s1 + s2;
    const char* p = temp;
    cout<<p;
    cout << temp;
}'''), txt("התכנית לא עוברת קומפילציה", "`abab`", "`ab`", "בתכנית יש שגיאת זמן ריצה"), "b",
    "Key from the clang++ run (student sheet agrees): printed abab. strcat appends into s1's 2-byte buffer (a one-byte heap overrun that does not crash in practice); both prints give the same string through the conversion operator.",
    confidence="med"))

questions.append(Q(19, "copy_control", COUNT + "\n" + cb(r'''
class Record {
public:
    virtual ~Record() {};
    Record(const Record& that)
    {
        *this = that;
    }
    Record operator = (const Record& that)
    {
        name = that.name;
        return *this;
    }
    //...
private:
    char name[100];
    long id;
};
void main()
{
    Record r1;
    Record r2 = r1;
    Record r3;
    r3 = r2 = r1;
}'''), txt(*CNT), "d",
    "Key from the clang++ run (student sheet agrees): errors on `name = that.name;` (arrays are not assignable), `Record r1;` and `Record r3;` (no default constructor) -> 3."))

questions.append(Q(20, "virtual_polymorphism", "מהן השגיאות בקטע הקוד הבא:\n" + cb(r'''
#include <string.h>

class Base {
    int* br;
public:
    Base() { br = NULL; }
    ~Base() {
        if(br!=NULL)
            delete br; }
};

class Derived : public Base {
    int* dr;
public:
    Derived() { dr = NULL; }
    ~Derived() {
        if(dr!=NULL)
            delete[] dr; }
    void f() { dr = new int[10]; }
};

void main(){
    Base *bp = new Base;
    delete bp;
    bp = new Derived;
    delete bp;
}'''), txt("שגיאת קומפילציה בגלל חוסר של בנאי העתקה", "שגיאת קומפילציה בגלל חוסר של אופרטור השמה", "שגיאות אחרות (כולל שגיאות עקרוניות של המתכנת)", "אין שגיאות בקטע הקוד הנ\"ל"), "c",
    "Key from the clang++ run plus a trace (student sheet agrees): the program compiles (so a, b are wrong), but deleting a Derived through a Base* whose destructor is not virtual runs only ~Base "
    "(trace printed `B`): undefined behaviour, i.e. a conceptual error (c). Confidence med because 'other errors' is judged, not run.",
    confidence="med"))

EXPL = {
    1: "הפונקציה `f` מקבלת `int&`, כלומר הפניה לערך שמאלי. `f(i)` תקין. `f(i+j)`, `f(5)` ו-`f(i + 1)` מעבירים ערכים זמניים (rvalue) שאי אפשר לקשור להפניה לא-const. שלוש שגיאות, ולכן התשובה היא יותר מ-2 (ד).",
    2: "בפרמטרים של פונקציה, אחרי פרמטר עם ערך ברירת מחדל (`int y=3`) כל הפרמטרים הבאים חייבים גם הם לקבל ערך ברירת מחדל. כאן `int z` בלי ערך ברירת מחדל, ולכן ההגדרה עצמה שגויה והתכנית לא מתקמפלת (תשובה א).",
    3: "למחלקה יש בנאי יחיד `A(int a, int b = 3)`, ולכן אין בנאי ברירת מחדל. `A a1;` שגוי. `A a2(2)` ו-`A a3(2,3)` תקינים. `A a4(2,3,4)` שגוי (יותר מדי ארגומנטים). `A a5=a3` ו-`a3 = a2` משתמשים בבנאי ההעתקה ובהשמה שנוצרו אוטומטית. שתי שגיאות (תשובה ג).",
    4: "יש שתי גרסאות של `f`, אחת רגילה ואחת `const`, ולכן הקריאה `a2.f()` על אובייקט קבוע בוחרת את הגרסה ה-`const`. `setX` אינה `const`, ולכן הקריאה `a2.setX(5)` על אובייקט קבוע שגויה. כל שאר השורות תקינות, כולל `A a3 = a2` (בנאי העתקה אוטומטי). שגיאה אחת (תשובה ב).",
    5: "`f` מחזירה הפניה `A&` ו-`g` מחזירה מצביע `A*`. `a1.f(5).g(4)` תקין. `(&a1)->g(3).x` שגוי כי `g` מחזירה מצביע ויש להשתמש ב-`->`. `a1.f(2)->x` שגוי כי `f` מחזירה הפניה ויש להשתמש ב-`.`. `a1.f(2).x.g(2)` שגוי כי `x` הוא `int` ואין לו פונקציה `g`. `a1.g(3)->f(4)` תקין. שלוש שגיאות (תשובה ד).",
    6: "המחלקה מקצה זיכרון בבנאי ומשחררת בהורס, אבל אין בנאי העתקה. הקריאה `f(a1)` מעבירה עותק רדוד, וההורס של הפרמטר משחרר את `a1.p`. אותו דבר ל-`f(a2)`. בקריאה השלישית `f(a1)` ההורס משחרר שוב את אותו זיכרון, וזו שגיאת זמן ריצה (בהרצה התכנית הדפיסה 1, 2, 3 וקרסה לפני 4). אבל השגיאה קורית בתוך הקריאה השלישית ולא לפניה, וההתנהגות אינה מוגדרת, ולכן השאלה מוחזקת.",
    7: "`A a2=i;` תקין כי הבנאי `A(int)` אינו `explicit`. `i=a1` תקין כי יש אופרטור המרה `operator int()`. `i=(int) a1` תקין, וגם `a1=(A)i` תקין. אין שגיאות (תשובה א).",
    8: "הבנאי של `A` קורא ל-`B(x)` עם הפרמטר `x=7` (הפרמטר מסתיר את השדה), ולכן נבחר `B(int)` שמדפיס 2. אחר כך גוף הבנאי של `A` מדפיס 3, מציב `y=5` ו-`x=8`. הפונקציה `f` מדפיסה `x` ואז `y`: `85`. הפלט `2385` (תשובה ד).",
    9: "ב-`B` הירושה מ-`A` היא `private`, אבל `na` מוגן ב-`A`, ולכן `B::f` יכולה להחזיר אותו. ב-`C` הירושה מ-`B` היא `private`, ו-`nb` מוגן ב-`B` ולכן קריאתו תקינה. אבל `na` בתוך `B` הפך ל-`private` (בגלל הירושה הפרטית), ולכן `C` לא יכולה לגשת אליו. שגיאה אחת, `return na;` (תשובה ב).",
    10: "ל-`B` אין אופרטור השמה משלה, ולכן הקומפיילר יוצר אחד שמעתיק כל שדה ל-`nb` ומפעיל את `A::operator=` על החלק של הבסיס. `A::operator=` מציב `na = a.na * 2` = 2*2 = 4. השדה `nb` מועתק ל-1. ההדפסה היא `14` (תשובה א).",
    11: "הקוד מתקמפל. ב-`A` מוגדרת `f1` משלה, ולכן `object.f1()` אינה עמומה למרות ש-`Y` ו-`Z` מגדירות כל אחת `f1`. גם `Y::key` ו-`Z::key` מציינים במפורש איזה עותק של `key` נקרא (ל-`A` יש שני עותקים של `X`). הפלט `object.key = 13` ואחריו `f1 from A`. לכן אין צורך לתקן שגיאות (תשובה א).",
    12: "`ci = 13` שגוי כי `ci` הוא `const`. `i = 10` תקין. `*ip3 = 10` שגוי כי `ip3` מצביע ל-`const int`. שתי שגיאות (תשובה ג).",
    13: "התכנית מתקמפלת אבל הגישה `ia[20]` חורגת מהמערך בגודל 12, שזו התנהגות לא מוגדרת. בהרצה בלי אופטימיזציה הודפס 3, ועם אופטימיזציה הודפס ערך זבל, ובבניית דיבוג של MSVC הייתה יכולה להתקבל שגיאת זמן ריצה. אין תשובה יחידה שמוגדרת בשפה, ולכן השאלה מוחזקת.",
    14: "הקוד בשלוש השורות הראשונות מקצה מערך עם `new[]` ולא משחרר אותו אף פעם (דליפת זיכרון). הווקטור בשלוש השורות האחרונות מנהל את הזיכרון בעצמו ומשחרר אותו כשהוא יוצא מהתחום, והוא גם יודע את גודלו. בהרצה נספר בלוק אחד שלא שוחרר בגרסה הראשונה ואפס בגרסה השנייה. לכן הקוד האחרון טוב יותר (תשובה ב).",
    15: "`A a1(5);` ו-`A a2;` תקינים (יש ערך ברירת מחדל `m = 0`). `A a3();` אינו הגדרת אובייקט אלא הצהרה על פונקציה בשם `a3` שמחזירה `A`, וזה תקין. אין שגיאות (תשובה א).",
    16: "ההשמה `b = d` מבצעת חיתוך (slicing): `b` הוא אובייקט מטיפוס `B` שמקבל רק את חלק הבסיס של `d`, כולל `n = 10` (כי `D::setN(5)` הציבה `2*5`). הקריאה `b.getN()` על אובייקט מטיפוס `B` מפעילה את `B::getN` שמחזירה `n`, כלומר 10. הפלט `10` (תשובה ג).",
    17: "הקריאה `f(i)` מתאימה לתבנית `f(T t)` עם `T=int`. `f(d)` מתאימה לאותה תבנית עם `T=double`, כלומר פונקציה אחרת. `f(p)` עם מצביע `int*` מתאימה טוב יותר לתבנית המתמחה `f(T* t)` עם `T=int`. בהרצה הודפסו שלוש חתימות שונות. שלוש הקריאות הן לשלוש פונקציות שונות וללא שגיאה (תשובה ב).",
    18: "`strcat(s1.s_, s2.s_)` מדביק את `\"b\"` לתוך המחרוזת של `s1` (המאגר שלה מכיל רק מקום ל-`\"a\"`, גלישה של בית אחד שלא גורמת לקריסה בפועל) ומחזיר מצביע אליו. `temp` מצביע לאותה מחרוזת `\"ab\"`. ההדפסה של `p` ושל `temp` (דרך אופרטור ההמרה) נותנת `ab` פעמיים, כלומר `abab` (תשובה ב).",
    19: "`name = that.name;` שגוי כי אי אפשר להשים מערך למערך. `Record r1;` ו-`Record r3;` שגויות כי הוגדר בנאי העתקה ולכן לא נוצר בנאי ברירת מחדל. `Record r2 = r1` ו-`r3 = r2 = r1` תקינות מבחינת קומפילציה. שלוש שגיאות (תשובה ד).",
    20: "הקוד מתקמפל: בנאי העתקה ואופרטור השמה נוצרים אוטומטית ולא נדרשים, ולכן א ו-ב שגויות. אבל `Base` לא מגדירה הורס וירטואלי, ולכן `delete bp` על אובייקט `Derived` מפעיל רק את `~Base` וההתנהגות אינה מוגדרת (בהרצה נדפס רק `B`). זו שגיאה עקרונית של המתכנת (תשובה ג).",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    q["explanation"] = EXPL[q["num"]] + SIG

NOTES = ("בכל שאלה שבה נדרש לרשום בכמה שורות יש שגיאות בקטע הקוד, יש להסתכל על כל הקוד גם זה שלפני הפונקציה `main`. בנוסף לכך בכל השאלות מהסוג הזה ניתן להניח שאין שגיאה מהסוג של רווח מיותר, או חוסר ברווח, "
         "וכן אין שגיאה מהסוג של נקודה פסיק מיותרת או חוסר בנקודה פסיק.\n"
         "בכל שאלה שבה יש תשובה: \"אף תשובה אינה נכונה\" הכוונה שמבין התשובות האחרות אף תשובה אינה נכונה.\n"
         "בכל שאלה יש רק תשובה אחת נכונה ביותר. אם יש שתי תשובות נכונות יש לסמן את התשובה הנכונה ביותר מבין השתיים.\n"
         "כאשר נתון קטע קוד ולאחריו מספר משפטים, יש לסמן את המשפט הנכון ביותר בהקשר לקטע הקוד הנתון.\n"
         "בכל שאלה מהסוג \"מה מדפיסה התכנית הבאה\", יש לקרוא את הפלט שמצוין בתשובות משמאל לימין.\n"
         "בכל אחד מקטעי הקוד הבאים יש להניח ששתי השורות הבאות קיימות בתחילת הקטע:\n"
         "```cpp\n#include <iostream>\nusing namespace std;\n```")

exam = {
    "examCode": "21B-A",
    "examLabel": "2021 סמסטר ב מועד א",
    "year": 2021,
    "examDate": "24.06.2021",
    "sourceFile": "2021/סמ׳ ב מועד א גירסה 1.pdf",
    "keyFile": "no official key; every key re-derived by clang++ runs (hand-marked student answer sheets used only as a cross-check)",
    "contexts": {"notes": {"kind": "text", "title": "הערות משותפות לגבי התוכן של כל השאלות", "text": NOTES}},
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
