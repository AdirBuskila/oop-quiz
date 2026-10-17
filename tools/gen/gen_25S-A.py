# -*- coding: utf-8 -*-
"""Generator for tools/raw/25S-A.json -- oop (61307), 2025 summer semester, moed A (30/09/2025).
Run: PYTHONUTF8=1 py tools/gen/gen_25S-A.py

Source: 19-page paper (17 MCQ x 6 pts, 4 options) + the official 2-page answer sheet (highlighted bubbles).
The paper itself carries no version label; the sheet has two versions. The paper matches the sheet
labelled version 1 (Q3 a, Q5 d, Q6 b, Q10 d, Q13 d; the version-2 sheet disagrees on those), so version 1 is the key used.
A sheet row with several highlighted bubbles = several accepted answers.
Every code question was compiled/run with clang++ (tools/verify/25S-A/, run_all.py); the result is recorded per item in `note`.
Held: Q1 (the key accepts b/c, but the program does not compile: `b1 = a1` is ambiguous)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "25S-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, accepted=None, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "answerSource": "highlighted-pdf", "official": True, "confidence": "high",
         "explanation": "", "note": note}
    if correct:
        q["correctId"] = correct
    if accepted:
        q["acceptedIds"] = accepted
    if num != 17:
        q["contextId"] = "notes"
    q.update(kw)
    return q


HDR_OUT = "מהו הפלט של התכנית הבאה:\n"
HDR_OUT_Q = "מהו הפלט של התכנית הבאה ?\n"


def hdr_err(n):
    return f"בכמה שורות (מהשורות המסומנות ב- `//line 1` ... `//line {n}`) בתכנית הבאה יש שגיאות קומפילציה ?\n"


questions = []

# ------------------------------------------------------------------ 1  (HELD)
q1 = Q(
    1, "operator_conversions", HDR_OUT + cb(r'''
#include <iostream>
using namespace std;

class B;

class A {
public:
    A(int a = 0) : a(a) {};
    int a;
    operator B() const;
};

class B {
public:
    int b;
    B(const A& a) : b(a.a) { cout << "B ctor "; }
};

A::operator B() const {
    cout << "operator B() ";
    return B(*this);
}

int main() {
    A a1;
    B b1(a1);
    b1 = a1;
    return 0;
}'''),
    txt("`B ctor operator B()`", "`B ctor operator B() B ctor`", "`B ctor B ctor`", "`B ctor`"),
    None,
    "Held. Official sheet (version 1) highlights b and c, but clang++ (c++14/17/20) rejects the program: `b1 = a1;` is ambiguous "
    "(converting constructor B(const A&) vs A::operator B, both viable for the assignment parameter). No option is a compile error.",
    hold="Official sheet accepts b (`B ctor operator B() B ctor`) and c (`B ctor B ctor`), but the program does not compile under clang++: "
         "`b1 = a1;` is ambiguous between B(const A&) and A::operator B(). Key disagrees with the run.",
    confidence="low")
del q1["answerSource"]
questions.append(q1)

# ------------------------------------------------------------------ 2
questions.append(Q(
    2, "inheritance_access", hdr_err(4) + cb(r'''
#include <iostream>
using namespace std;

class B {
public: B(int b = 0) :b(b) {};
private:
      int b;

};

class D : public B {
public: D(int b = 0, int d = 0) : B(b), d(d) {}
      int d;
};

int main() {
     B b1, b2;
     D d1, d2;

     B* bptr1 = &d1; // line 1
     D* dptr2 = &b2; // line 2
     b1 = d1;        // line 3
     d2 = b2;        // line 4
}'''),
    txt("0", "1", "2", "3"), "c",
    "Official key c. clang++ run: errors on line 2 (base pointer to derived pointer) and line 4 (no D = B), none on lines 1 and 3 -> 2. Agrees."))

# ------------------------------------------------------------------ 3
questions.append(Q(
    3, "virtual_polymorphism", HDR_OUT + cb(r'''
#include <iostream>
using namespace std;

class B {
public:
    B(int b) : b(b) {};
    virtual int f() { return b; }
private:
    int b;
};

class D : public B {
public:
    D(int b, int d) : B(b), d(d) {};
    int f() { return d; }
private:
    int d;
};

int main() {
    B* bptr1 = new B(1);
    B* bptr2 = new D(2, 3);
    cout << bptr1->f() << " " << bptr2->f() << " " <<
        bptr2->B::f() << endl;
    return 0;
}'''),
    txt("`1 3 2`", "`1 2 2`", "`1 2 3`", "`2 2 3`"), "a",
    "Official key a. clang++ run printed `1 3 2`. Agrees."))

# ------------------------------------------------------------------ 4
questions.append(Q(
    4, "abstract_multiple", hdr_err(3) + cb(r'''
#include <iostream>
using namespace std;

class B {
public:
    B(int b) : b(b) {};
    virtual int f() = 0;
private:
    int b;
};

class D1 : public B {
public:
    D1(int b, int d) : B(b), d(d) {};
private:
    int d;
};

class D2 : public B {
public:
    D2(int b, int d) : B(b), d(d) {};
    int f() { return d; }
private:
    int d;
};

int main() {
    B* b1 = new B(1, 2);  // line 1
    B* b2 = new D1(3, 4); // line 2
    B* b3 = new D2(5, 6); // line 3
    return 0;
}'''),
    txt("0", "1", "2", "יותר מ-2"), "c",
    "Official key c. clang++ run: errors on line 1 and line 2 (abstract class instantiation; line 1 also has no B(int,int) constructor) -> 2. Agrees."))

# ------------------------------------------------------------------ 5
questions.append(Q(
    5, "construction_order", HDR_OUT + cb(r'''
#include <iostream>
using namespace std;

class B {
public:
    B() { cout << "B "; }
    virtual ~B() { cout << "~B "; }
};

class D : public B {
public:
    D() { cout << "D "; }
    ~D() { cout << "~D "; }
};

int main() {
    B* b = new D();
    delete b;
    return 0;
}'''),
    txt("`B D ~B`", "`D B ~B ~D`", "`B D ~D`", "`B D ~D ~B`"), "d",
    "Official key d. clang++ run printed `B D ~D ~B`. Agrees."))

# ------------------------------------------------------------------ 6
questions.append(Q(
    6, "construction_order", HDR_OUT + cb(r'''
#include <iostream>
using namespace std;

class B1 {
public:
    B1() { cout << "B1 "; }
    ~B1() { cout << "~B1 "; }
};

class B2 {
public:
    B2() { cout << "B2 "; }
    ~B2() { cout << "~B2 "; }
};

class D : public B1, public B2 {
public:
    D() { cout << "D "; }
    ~D() { cout << "~D "; }
};

int main() {
    D d;
    return 0;
}'''),
    txt("`D B1 B2 ~B2 ~B1 ~D`", "`B1 B2 D ~D ~B2 ~B1`", "`B1 B2 D ~B1 ~B2 ~D`", "`B1 D B2 ~B2 ~D ~B1`"), "b",
    "Official key b. clang++ run printed `B1 B2 D ~D ~B2 ~B1`. Agrees."))

# ------------------------------------------------------------------ 7
questions.append(Q(
    7, "inheritance_access", hdr_err(6) + cb(r'''
class A
{
public:     void pubA() {};
protected:  void protA() {};
private:    void privA() {};
};

class B : protected A {
public:
    void accessA() {
        pubA();   // line 1
        protA();  // line 2
        privA();  // line 3
    }
};


int main()
{
     B b;
     b.pubA(); // line 4
     b.protA();// line 5
     b.privA();// line 6
}'''),
    txt("4", "3", "2", "1"), "a",
    "Official key a. clang++ run: errors on lines 3, 4, 5, 6 -> 4. Agrees."))

# ------------------------------------------------------------------ 8
questions.append(Q(
    8, "inheritance_access", hdr_err(3) + cb(r'''
class B;
class A
{
    void f(B b) {
        b.pubB = 1;   // line 1
        b.protB = 2;  // line 2
        b.privB = 3;  // line 3
    }
};

class B : public A {
public:     int pubB;
protected:  int protB;
private:    int privB;
};'''),
    txt("0", "1", "2", "3"), "d",
    "Official sheet (version 1) highlights c and d (both accepted); correctId set to d. clang++: B is incomplete inside A::f (error at the parameter, "
    "so all three member accesses are invalid: 3); with B complete (q08_complete.cpp) only lines 2 and 3 fail: 2. Consistent with the accepted pair.",
    accepted=["d", "c"]))

# ------------------------------------------------------------------ 9
questions.append(Q(
    9, "friend_this_static", hdr_err(6) + cb(r'''
class A
{
public:     int pubA;
protected:  int protA;
private:    int privA;
};

class B : public A {
    friend void funB(B& b, A& a);
};

void funB(B& b, A& a)
{
    b.pubA = 1;    // line 1
    b.protA = 2;   // line 2
    b.privA = 3;   // line 3
    a.pubA = 4;    // line 4
    a.protA = 5;   // line 5
    a.privA = 6;   // line 6
}'''),
    txt("1", "2", "3", "יותר מ-3"), "c",
    "Official key c. clang++ run: errors on lines 3, 5, 6 -> 3. Agrees."))

# ------------------------------------------------------------------ 10
questions.append(Q(
    10, "abstract_multiple", HDR_OUT_Q + cb(r'''
#include <iostream>
using namespace std;

class B { virtual void f() {}; };
class D1 : virtual public B {};
class D2 : virtual public B {};
class D3 : public D1, public D2 {};

int main() {
     D3* d3ptr = new D3;
     B* b3ptr = dynamic_cast<B*> (d3ptr);
     if (b3ptr != nullptr) { cout << "0 "; }

     B* bptr = dynamic_cast<B*>
(dynamic_cast<D1*>(d3ptr));
     if (bptr != nullptr) { cout << "1 "; }

     D1* d1ptr = dynamic_cast<D1*>(bptr);
     if (d1ptr != nullptr) { cout << "2 "; }

     D2* d2ptr = dynamic_cast<D2*>(bptr);
     if (d2ptr != nullptr) { cout << "3 "; }

     D3* d3ptr2 = dynamic_cast<D3*>(bptr);
     if (d3ptr2 != nullptr) { cout << "4 "; }

     return 0;
}'''),
    txt("`1 2 3 4`", "`1 2`", "`1 2 3`", "`0 1 2 3 4`"), "d",
    "Official key d. clang++ run printed `0 1 2 3 4`. Agrees."))

# ------------------------------------------------------------------ 11
questions.append(Q(
    11, "abstract_multiple", HDR_OUT_Q + cb(r'''
#include <iostream>
using namespace std;

class B { virtual void f() {}; };
class D1 : virtual public B {};
class D2 : virtual public B {};
class D3 : public D1, public D2 {};

int main() {
     D1* d1ptr = new D1;
     B* bptr = dynamic_cast<B*> (d1ptr);
     if (bptr != nullptr) { cout << "1 "; }

     d1ptr = dynamic_cast<D1*>(bptr);
     if (d1ptr != nullptr) { cout << "2 "; }

     D2* d2ptr = dynamic_cast<D2*>(bptr);
     if (d2ptr != nullptr) { cout << "3 "; }

     D3* d3ptr2 = dynamic_cast<D3*>(bptr);
     if (d3ptr2 != nullptr) { cout << "4 "; }

     return 0;
}'''),
    txt("`1 2`", "`1 2 3 4`", "`1 2`", "`1 2 3`"), "a",
    "Official sheet highlights a and c. Options a and c are both printed as `1 2` (identical text), so both are accepted. clang++ run printed `1 2`. Agrees.",
    accepted=["a", "c"]))

# ------------------------------------------------------------------ 12
questions.append(Q(
    12, "stl_exceptions", "כמה שגיאות יש בקוד הבא?\n" + cb(r'''
#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v;

    v.push_back(10);
    int p = &v[0];
    int it = v.begin();

    v.push_back(20);

    v.insert(v.begin(), 5);

    cout << p << " " << it << " " << v[0] << "\n";
}'''),
    txt("0", "1", "2", "יותר מ-2"), "c",
    "Official key c. clang++ run: 2 compile errors (`int p = &v[0];` and `int it = v.begin();`). Agrees."))

# ------------------------------------------------------------------ 13
questions.append(Q(
    13, "templates", HDR_OUT_Q + cb(r'''
#include <iostream>
using namespace std;

template <class T = int, int size = 1>
class A {
public:
    A(T init = 0) { for (int i = 0; i < size; i++) arr[i] = init; };
    friend ostream& operator<<(ostream& os, const A<T, size>& a) {
        for (int i = 0; i < size; i++) os << a.arr[i];
        return os;
    }
private: T arr[size];
};

int main() {
    A<> a0;
    A<char> a1('A');
    A<int, 2> a2(2);
    cout << a0 << " " << a1 << " " << a2 << endl;
    return 0;
}'''),
    txt("`0 A 222`", "`0 1 333`", "`0 11 222`", "`0 A 22`"), "d",
    "Official key d. clang++ run printed `0 A 22`. Agrees."))

# ------------------------------------------------------------------ 14
OUT14 = {
    "a": "by value\nptr to T\nptr to const T\nC-string\nC-string",
    "b": "by value\nptr to T\nptr to const T\nptr to const T\nptr to const T",
    "c": "by value\nptr to T\nptr to const T\nptr to T\nC-string",
}
questions.append(Q(
    14, "templates", "מה יודפס?\n" + cb(r'''
#include <iostream>
using namespace std;

template <typename T>
void h(T) { cout << "by value\n"; }

template <typename T>
void h(T*) { cout << "ptr to T\n"; }

template <typename T>
void h(const T*) { cout << "ptr to const T\n"; }

template <>
void h<const char*>(const char*) { cout << "C-string\n"; }

int main() {
    int x = 10;
    const int cx = 20;
    int* px = &x;
    const int* pcx = &cx;
    const char* s = "abc";

    h(x);
    h(px);
    h(pcx);
    h("abc");
    h(s);
}'''),
    [{"id": k, "type": "text", "value": cb(OUT14[k], "")} for k in "abc"]
    + [{"id": "d", "type": "text", "value": "שגיאת קומפילציה"}],
    "b",
    "The official sheet (version 1) highlights all four options (a, b, c, d), i.e. every answer is accepted. The program compiles under clang++ and prints "
    "exactly option b (the explicit specialization h<const char*> specializes the by-value template, so it never wins; `h(s)` picks `const T*`), so b is the "
    "verified answer. Option d is printed at the top of the next page in the source.",
    accepted=["b", "a", "c", "d"], confidence="med"))

# ------------------------------------------------------------------ 15
questions.append(Q(
    15, "const_references", "כמה שגיאות יש בקוד הבא?\n" + cb(r'''
#include <iostream>
using namespace std;

struct T {
    T() { cout << "def\n"; }
    T(T& c) { cout << "copy\n"; }
};

int main() {
    T a;
    const T ca;

    T b = a;
    T c = ca;
}'''),
    txt("0", "1", "2", "3"), "b",
    "Official key b. clang++ run: 1 error (`T c = ca;` -- T(T&) cannot bind a const object). Agrees."))

# ------------------------------------------------------------------ 16
questions.append(Q(
    16, "operator_overloading", "כמה שגיאות יש בקוד הבא?\n" + cb(r'''
#include <iostream>
using namespace std;

struct Num {
    int v;
    Num(int x = 0) : v(x) {}

    Num& operator++() {
        cout << "pre&\n";
        ++v;
        return *this;
    }

    Num operator++(int){
        cout << "post&\n";
        Num tmp = *this;
        ++v;
        return tmp;
    }
};

int main() {
    Num a(2);
    ++a;
    a++;
    ++Num(3);
    Num(6)++;
    const Num ca(5);
    ++ca;
}'''),
    txt("0", "1", "2", "3"), "b",
    "Official key b. clang++ run: 1 error (`++ca;` on a const object; ++Num(3) and Num(6)++ are legal member calls on temporaries). Agrees."))

# ------------------------------------------------------------------ 17
questions.append(Q(
    17, "cpp_basics_refs",
    "האם שתי פונקציות עמוסות (overloaded functions) יכולות להיות שונות בסוג ההחזרה שלהן ב-C++?\n\n"
    "1: כן, C++ מאפשרת העמסת פונקציות על סמך סוגי החזרה.\n"
    "2: לא, C++ לא מאפשרת העמסת פונקציות על סמך סוגי החזרה.\n"
    "3: זה תלוי בקומפיילר C++ שבו נעשה שימוש.\n"
    "4: אף אחת מההצהרות אינה נכונה.",
    txt("1", "2", "3", "4"), "b",
    "The official sheet (version 1) highlights a, b and d; the language rule (and the clang++ run: 'functions that differ only in their return type cannot be "
    "overloaded') gives statement 2, which is option b, so b is used as the single answer. In the source the options are labelled ה, ו, ז, ח "
    "(statements 1-4); recorded here as a-d in the same order.",
    accepted=["b", "a", "d"], confidence="med"))

EXPL = {2: 'השורות עם שגיאה הן 2 ו-4.\n- שורה 1: `B* = &d1` תקין, כי מצביע לנגזרת הומר אוטומטית למצביע לבסיס.\n- שורה 2: `D* = &b2` שגיאה, כי אין המרה משתמעת מבסיס לנגזרת.\n- שורה 3: `b1 = d1` תקין (slicing), כי `D` הוא `B`.\n- שורה 4: `d2 = b2` שגיאה, כי אין השמה של `B` לתוך `D`.\nהתשובה הנכונה היא 2. הבחירה ב-3 מתעלמת מכך ששורה 2 שגויה, והבחירה ב-1 מפספסת את שורה 4.', 3: '`f` וירטואלית, לכן `bptr2->f()` נקראת לפי הטיפוס הדינמי `D` ומחזירה `d`=3. `bptr1->f()` מחזירה 1. הקריאה `bptr2->B::f()` מבטלת את הפנייה הווירטואלית ומריצה את גרסת `B`, שמחזירה `b`=2.\nהפלט הוא `1 3 2` (תשובה א). התשובה המפתה `1 2 2` מניחה שאין דריסה, אבל `f` נדרסת ב-`D`.', 4: 'שגיאות בשורות 1 ו-2 בלבד.\n- שורה 1: `B` אבסטרקטית (`f()=0`) ואי אפשר ליצור ממנה אובייקט (וגם אין בנאי `B(int,int)`).\n- שורה 2: `D1` לא דורסת את `f`, ולכן גם היא אבסטרקטית.\n- שורה 3: `D2` דורסת את `f`, ולכן ניתן ליצור אותה.\nהתשובה היא 2. הבחירה ב-1 שוכחת ש-`D1` יורשת את הפונקציה הטהורה בלי לממש אותה.', 5: 'בבנייה הבסיס נבנה לפני הנגזרת: `B D`. בגלל ש-`~B` וירטואלי, `delete b` מפעיל את ההורס של הטיפוס הדינמי `D` קודם, ואז את זה של `B`: `~D ~B`.\nהפלט הוא `B D ~D ~B` (תשובה ד). בלי `virtual` על ההורס היה מודפס רק `~B` (התנהגות לא מוגדרת), וזו הסיבה שתשובה א מפתה אך שגויה כאן.', 6: 'סדר הבנייה הוא לפי סדר הרישום ב-`: public B1, public B2`: קודם `B1`, אחר כך `B2`, ולבסוף גוף `D`. ההריסה הפוכה בדיוק: `~D ~B2 ~B1`.\nהפלט הוא `B1 B2 D ~D ~B2 ~B1` (תשובה ב). תשובה ג הפוכה בסדר ההריסה, ותשובה א מתחילה ב-`D` כאילו הנגזרת נבנית לפני הבסיסים.', 7: 'בירושה `protected` חברי `public` ו-`protected` של `A` הופכים ל-`protected` ב-`B`, ו-`private` נשאר בלתי נגיש.\n- שורה 1 ו-2: תקינות בתוך מתודה של `B`.\n- שורה 3: `privA` פרטי ב-`A`, שגיאה.\n- שורה 4: `pubA` הפך ל-protected ולכן אסור מבחוץ, שגיאה.\n- שורות 5 ו-6: שגיאות.\nסה"כ 4 שגיאות (תשובה א). הטעות הנפוצה היא להניח ש-`pubA` נשאר ציבורי, ואז מקבלים 3.', 8: 'הפונקציה `A::f` מקבלת `B` by value בזמן ש-`B` עדיין מחלקה לא שלמה (רק הצהרה מקדימה). לכן הקומפיילר דוחה את הגישה לשלושת השדות (3 שגיאות; תשובה ד). אם `B` הייתה שלמה היו רק 2 שגיאות (`protB` ו-`privB`, שאינם נגישים ל-`A` שהיא הבסיס), וזו תשובה ג.\nהדף הרשמי מכיר בשתי התשובות. בהרצה בפועל התוצאה היא 3.', 9: '`funB` היא friend של `B` בלבד, לא של `A`. דרך `b` (מטיפוס `B`) יש לה גישה לחברי `A` הציבוריים והמוגנים, אבל לא לפרטיים.\n- שורות 1 ו-2: תקינות.\n- שורה 3: `privA` פרטי, שגיאה.\n- שורה 4: `a.pubA` תקין.\n- שורות 5 ו-6: דרך `A&` אין גישה ל-`protected` ו-`private`, שגיאות.\nסה"כ 3 שגיאות (תשובה ג). אי אפשר להניח ש-friendship ל-`B` נותנת גישה גם דרך אובייקט `A`.', 10: 'ל-`B` יש פונקציה וירטואלית, לכן המחלקה פולימורפית ו-`dynamic_cast` עובד. `D3` יורשת וירטואלית (diamond) מ-`B`, לכן יש בסיס `B` יחיד.\n- `D3*` ל-`B*`: upcast, מצליח (0).\n- `D3*` ל-`D1*` ואז ל-`B*`: מצליח (1).\n- מ-`B*` (שמצביע בפועל על אובייקט `D3`) ל-`D1*` ול-`D2*` ול-`D3*`: downcast דינמי, מצליח כי הטיפוס הדינמי הוא `D3` (2, 3, 4).\nהפלט `0 1 2 3 4` (תשובה ד). הרצת הקוד הניבה את אותו הפלט.', 11: 'האובייקט בפועל הוא `D1`. המרה ל-`B*` מצליחה (1) והחזרה ל-`D1*` מצליחה (2). המרה ל-`D2*` נכשלת (מחזירה `nullptr`) כי האובייקט אינו `D2`, וכך גם ל-`D3*` כי הוא אינו `D3`.\nהפלט הוא `1 2`. אפשרויות א ו-ג זהות והדף הרשמי מכיר בשתיהן. תשובה ב שגויה כי היא מניחה שההמרה למחלקות אחיות או יורשות מצליחה.', 12: 'שתי שורות לא מתקמפלות:\n- `int p = &v[0];` מנסה להכניס `int*` ל-`int`.\n- `int it = v.begin();` מנסה להכניס איטרטור ל-`int`.\nשאר הקוד תקין מבחינת קומפילציה (שימוש באיטרטור אחרי `push_back` הוא בעיית ריצה, לא שגיאת קומפילציה). לכן התשובה 2 (ג).', 13: "`A<>` משתמשת בברירות המחדל: `T=int`, `size=1`, ומאותחלת ל-0, ולכן מודפס `0`. `A<char>('A')` עם `size=1` מדפיסה `A`. `A<int,2>(2)` מדפיסה את שני האיברים `2` ו-`2`, כלומר `22`.\nהפלט `0 A 22` (תשובה ד). תשובה א מוסיפה איבר שלישי שאינו קיים, כי `size` הוא 2 ולא 3.", 14: 'הקוד מתקמפל ומדפיס בדיוק את אפשרות ב (נבדק בהרצה).\n- `h(x)`: `int` מתאים רק ל-`h(T)`, ולכן `by value`.\n- `h(px)`: `int*` מתאים ל-`h(T*)` טוב יותר מ-`h(T)`, ולכן `ptr to T`.\n- `h(pcx)`: `const int*` מתאים ל-`h(const T*)`, שהיא המתמחה יותר, ולכן `ptr to const T`.\n- `h("abc")` ו-`h(s)`: הארגומנט מטיפוס `const char*` (המערך דועך למצביע), ולכן נבחרת `h(const T*)`.\nההתמחות המפורשת `h<const char*>` שייכת לתבנית `h(T)` (by value), ולכן לא נבחרת מעולם: `C-string` אינו מודפס, ולכן אפשרויות א ו-ג לא מדויקות.\nהדף הרשמי סימן את כל האפשרויות כמתקבלות (כנראה בעקבות ערעור), אבל התשובה הנכונה לפי הקומפילציה וההרצה היא ב.', 15: 'בנאי ההעתקה הוא `T(T& c)` ולא `T(const T&)`, ולכן הוא לא יכול לקבל אובייקט `const`.\n- `T b = a;` תקין, כי `a` אינו const.\n- `T c = ca;` שגיאה, כי `ca` הוא `const T` ולא ניתן לקשור אותו ל-`T&`.\nיש שגיאה אחת (תשובה ב). שגיאה בשורת `const T ca;` אינה קיימת, כי ל-`T` יש בנאי ברירת מחדל מוגדר על ידי המשתמש.', 16: 'כל הקריאות ל-`operator++` הן פונקציות חבר לא-const.\n- `++a` ו-`a++` תקינים.\n- `++Num(3)` ו-`Num(6)++` תקינים: קריאה למתודה לא-const על זמני (rvalue) מותרת.\n- `++ca` שגיאה, כי `ca` const והמתודה אינה const.\nיש שגיאה אחת (תשובה ב). הטעות הנפוצה היא לחשוב שאי אפשר להפעיל `++` על זמני, ואז מקבלים 3.', 17: 'בשפת C++ אי אפשר להעמיס פונקציות לפי סוג ההחזרה בלבד, כי הקומפיילר מבחין בין העמסות לפי רשימת הפרמטרים (ובמקרה של מתודות, גם לפי const), ולא לפי הערך המוחזר. ניסיון להגדיר שתי פונקציות שנבדלות רק בסוג ההחזרה נכשל בקומפילציה (`functions that differ only in their return type cannot be overloaded`).\nלכן הטענה הנכונה היא 2 (אפשרות ב). בדף הרשמי סומנו כמתקבלות גם אפשרויות א ו-ד (כנראה בעקבות ערעור), אבל לפי השפה ולפי הקומפילציה ב היא הנכונה.'}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "25S-A",
    "examLabel": "2025 סמסטר קיץ מועד א",
    "year": 2025,
    "examDate": "30.09.2025",
    "sourceFile": "2025/סמ׳ ג מועד א.pdf",
    "keyFile": "2025/סמ׳ ג מועד א - תשובות.pdf (official answer sheet, version 1)",
    "contexts": {
        "notes": {
            "kind": "text",
            "title": "הערות משותפות לגבי התוכן של כל השאלות",
            "text": "בכל שאלה שבה נדרש לרשום בכמה שורות יש שגיאות בקטע הקוד, יש להסתכל על כל הקוד גם זה שלפני הפונקציה `main`.\n"
                    "בכל השאלות שבהן נדרש לרשום כמה שגיאות יש בקטע הקוד או מה מדפיסה התכנית הבאה, ניתן להניח שאין שגיאה מהסוג של רווח מיותר, או חוסר ברווח, "
                    "וכן אין שגיאה מהסוג של נקודה פסיק מיותרת או חוסר בנקודה פסיק, וכן אין שגיאה שנובעת מכך שחסר משפט `#include` בתחילת קטע הקוד/התכנית.\n"
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
