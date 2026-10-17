# -*- coding: utf-8 -*-
"""Generator for tools/raw/24B-A.json -- oop (61307), 2024 semester B, moed A (25/07/2024).
Run: PYTHONUTF8=1 py tools/gen/gen_24B-A.py

Source: 38-page scan (17 MCQ x 6 pts, 4 options; questions on the odd pages 5-37). Graded student copy; the grader wrote
"6*17=102" (full marks), so every circled answer is a graded-correct answer. Page 1 (barcodes, ID, grid) is never shipped and the
pencil scribbles on the question pages are not copied. The same sitting also exists as a second copy (the "version 2" file, 38 pages, same questions).
Keys: the code questions are keyed from clang++ runs (tools/verify/24B-A/, run_all.py), answerSource "solved", official:false; all agree with the
circled answers. Q5 and Q17 (concept) are keyed from the graded circles.
`void main()` in the paper (Q12, Q16) is MSVC style; the harness runs it as `int main()`.
Held: Q7 (circled b = 1 true statement, but statements a and c are both true by the language rules) and Q14 (circled b = 1 true statement, no statement is
unambiguously the single true one)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "24B-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, source="solved", conf="high", **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "contextId": "notes",
         "answerSource": source, "official": False, "confidence": conf, "explanation": "", "note": note}
    q["correctId"] = correct
    q.update(kw)
    return q


def held(q, reason):
    q.pop("correctId", None)
    for k in ("answerSource", "official", "confidence"):
        q.pop(k, None)
    q["hold"] = reason
    return q


PRINTS = "מה מדפיסה התכנית הבאה?\n"
ERRQ = "בכמה שורות בקטע הקוד הבא יש שגיאות?\n"
CNT = ("0", "1", "2", "יותר מ- 2")
KEY = "Key = the graded copy's circled answer (full marks), confirmed by clang++. "
questions = []

# 1
questions.append(Q(1, "virtual_polymorphism", PRINTS + cb(r'''
class B {
public:
        virtual void f() { cout << "A"; }
};
class A : public B {
        void f() { cout << "B"; }
};
int main()
{
        A a1;
        B b1;
        B& c1 = b1;
        B& d1 = a1;
        B* e1 = &c1;
        B* f1 = &d1;
        c1.f(); d1.f(); e1->f(); f1->f();
        return 0;
}'''), txt("התכנית לא עוברת קומפילציה.", "BBBB", "ABAB", "BBAB"), "c",
    KEY + "clang++ run: `ABAB` (A::f is private but overrides the virtual B::f; the calls go through B references/pointers)."))

# 2
questions.append(Q(2, "inheritance_access", ERRQ + cb(r'''
class A {
        int x;
public:
        A(int i = 0) { x = i; }
};
class B : private A {
        int y;
public:
        B(int i = 0, int j = 0) {
                x = i;
                y = j;
        }
};
class C : public B {
        int z;
public:
        C(int i = 0, int j = 0, int k = 0) {
                z = i;
                y = j;
                x = k;
        }
};'''), txt(*CNT), "d",
    KEY + "clang++: 3 error lines (`x = i` in B: x is private in A; `y = j` and `x = k` in C: y is private in B and x is not accessible)."))

# 3
questions.append(Q(3, "const_references", ERRQ + cb(r'''
class A {
        int x;
public:
        int f(int i) { return i + x; }
        int& g() { return x; }
        const int& h(int i) { return x+i; }
};
int main() {
        A a1;
        a1.g() = 5;
        a1.h(3)= 6;
        cout << a1.f(3) + a1.h(3);
        return 0;
}'''), txt(*CNT), "b",
    KEY + "clang++: 1 error line, `a1.h(3) = 6` (assignment through a const reference)."))

# 4
questions.append(Q(4, "cpp_basics_refs", PRINTS + cb(r'''
int& f(int i) {
        static int x = i;
        x++;
        return x;
}

int main() {
        cout << f(5);
        cout << f(5)++;
        f(3) = 4;
        cout << f(3);
        return 0;
}'''), txt("654", "563", "564", "675"), "d",
    KEY + "clang++ run: `675` (the static x is initialized once to 5; f returns a reference to it, so f(3)=4 sets it to 4 and the last call gives 5)."))

# 5
questions.append(Q(5, "operator_conversions", "כמה מהמשפטים הבאים נכונים:\n"
    "1. בהגדרה של מחלקה A ניתן להגדיר המרה מאוביקט של מחלקה B לאוביקט של מחלקה A וגם (בהגדרה של אותה מחלקה A) ניתן להגדיר המרה מאוביקט של מחלקה A לאוביקט של מחלקה B.\n"
    "2. אם בהגדרה של מחלקה A מוגדרת המרה של אוביקט של מחלקה A לאוביקט של מחלקה B אזי הגדרה של המרה של אוביקט של מחלקה B לאוביקט של מחלקה A חיבת להיות בהגדרת מחלקה B.\n"
    "3. אם בהגדרה של מחלקה A מוגדרת המרה של אוביקט של מחלקה A לאוביקט של מחלקה B אזי לא ניתן להגדיר המרה של אוביקט של מחלקה B לאוביקט של מחלקה A.",
    txt("0", "1", "2", "3"), "b",
    KEY + "clang++ compile checks: a conversion constructor A(const B&) plus `operator B()` in A compile together (1 true); `operator B()` in A alone is enough (2 false); both directions can be defined at once (3 false). The numbering 1-3 is added (the paper lists א-ג).",
    source="solution-pdf"))

# 6
questions.append(Q(6, "construction_order", PRINTS + cb(r'''
class A {
        int x;
public:
        A() {
                cout << "A"; x = 0;
        }
        ~A() { cout << "~A"; }
};
class B {
public:
        B() { cout << "B"; }
        ~B() { cout << "~B"; }
};
class C : public A, public B {
public:
        int y;
        B b1;
        A a1;
        C() { cout << "C"; y = 0; }
        ~C() { cout << "~C"; }
};
int main() {
        C c1;
        return 0;
}'''), txt("BABAC~C~A~B~A~B", "ABBAC~C~A~B~B~A", "BABAC~C~A~B~B~A", "התכנית לא עוברת קומפילציה."), "b",
    KEY + "clang++ run: `ABBAC~C~A~B~B~A` (bases A then B, then members b1 then a1, then the body; destruction in exact reverse)."))

# 7 (HELD)
q7 = Q(7, "abstract_multiple", "כמה מהמשפטים הבאים נכונים:\n"
    "1. למחלקה אבסטרקטית חייבת להיות לפחות פונקציה אחת וירטואלית טהורה (pure virtual).\n"
    "2. למחלקה אבסטרקטית חייבת להיות לפחות פונקציה אחת שלא הוגדר לה מימוש.\n"
    "3. מחלקה שיורשת ממחלקה אבסטרקטית ולא מממשת את כל הפונקציות אותן היא יורשת היא בהכרח מחלקה אבסטרקטית.",
    txt("0", "1", "2", "3"), "b",
    "The graded copy circles b (1 true statement). By the language rules statements 1 and 3 are true (2 is false: a pure virtual function may have a body), which would make c; the held entry asks which reading the exam intends. clang++ confirms that a pure virtual with a body compiles and that a derived class missing one override cannot be instantiated.")
questions.append(held(q7, "graded key (b: one true statement) disagrees with the language rules (statements 1 and 3 are both true, giving c)"))

# 8
questions.append(Q(8, "inheritance_access", ERRQ + cb(r'''
class B {
public:
        int x;
        B(int x=0) { this->x = x; }
};
class A : public B {
public:
        int y;
        A(int y) { this->y = y; }
};

int main() {
        A a1(4);
        A a2(5);
        B b1;
        A* p1=&b1;
        B* q1=&a1;
        A* p2 = &a1;
        B* q2 = &a2;
        p2 = q2;
        q2 = p2;
        p2 = (A*)q2;
        p2->y = 9;
}'''), txt(*CNT), "c",
    KEY + "clang++: 2 error lines, `A* p1=&b1;` and `p2 = q2;` (no implicit base-to-derived pointer conversion); the explicit cast is fine."))

# 9
questions.append(Q(9, "templates", PRINTS + cb(r'''
template <class T>
class A {
public:
        T z;
        T f(T y) { return y + z; }
        A(T z) { this->z = z; }
};
class B {
public:
        int x;
        B(int i = 0) { x = i; }
        B operator+(B b) {
                B bb;
                bb.x = x + b.x+1;
                return bb;
        }
};
int main() {
        B b1, b2(3);
        A<int> a1(10);
        cout << a1.f(11);
        A<B> a2(b1);
        cout << a2.f(b2).x;
        return 0;
}'''), txt("214", "103", "213", "התכנית לא עוברת קומפילציה."), "a",
    KEY + "clang++ run: `214` (21, then B(3)+B(0)+1 = 4)."))

# 10
questions.append(Q(10, "stl_exceptions", PRINTS + cb(r'''
int main() {
        int temp,n=6;
        vector<int> the_vector;
        vector<int>::iterator the_iterator;
        vector<int>::reverse_iterator rev_iterator;
        for (int i = 0; i < n; i++)
                the_vector.push_back(i);
        the_iterator = the_vector.begin();
        rev_iterator = the_vector.rbegin();
        for(int i=0;i<n/2;i++){
                temp = *the_iterator;
                *the_iterator = *rev_iterator;
                *rev_iterator = temp;
                the_iterator++;
                rev_iterator++;
        }
        the_iterator = the_vector.begin();
        while (the_iterator < the_vector.end()) {
                cout << *the_iterator++;
        }
        return 0;
}'''), txt("012345", "345345", "543210", "012012"), "c",
    KEY + "clang++ run: `543210` (the first half is swapped with the second half, i.e. the vector is reversed)."))

# 11
questions.append(Q(11, "templates", ERRQ + cb(r'''
template <class T> T F1(T a, T b) {
        if (a > b)
                return a;
        else
                return b;
}

int main() {
        char   c1 = 'Z', c2 = 'g';
        int    n1 = 18, n2 = 72;
        long   n3 = 5000;
        float  n4 = 25.4, n5 = 6.78;

        cout << F1(c1, c2) << endl;
        cout << F1(n1, n2) << endl;
        cout << F1(c1, n1) << endl;
        cout << F1(n2, n3) << endl;
        cout << F1(n3, n4) << endl;
        cout << F1(n4, n5) << endl;
        return 0;
}'''), txt(*CNT), "d",
    KEY + "clang++: 3 error lines (F1(c1,n1), F1(n2,n3), F1(n3,n4): the two arguments deduce different T)."))

# 12
questions.append(Q(12, "copy_control", "כמה פעמים בתכנית הבאה מופעל בנאי ההעתקה?\n" + cb(r'''
class A
{
        int n;
public:
        A(int _n) {
                n = _n;
        }
        A(const A& a) {
                n = a.n;
        }
};
void main()
{
        A a1(10);
        A a2(a1);
        A a3 = a1;
}'''), txt("1", "2", "3", "התכנית לא עוברת קומפילציה."), "b",
    KEY + "clang++ run (the copy constructor given a marker print, `void main` run as `int main`): 2 copies (`A a2(a1)` and `A a3 = a1`)."))

# 13
questions.append(Q(13, "const_references", "באיזו שורה יש שגיאה בתכנית הבאה?\n" + cb(r'''
1  class A {
2   public:
3     A(int x = 5) : x_(x) {}
4     int getX() const { x_ += 2; return x_; }
5     void setX(int x) { x_ = x; }
6   private:
7     int x_;
8   };

9   int main() {
10        A a1(10);
11        A a2;
12        cout << a1.getX() << " " << a2.getX() << endl;
13        a2.setX(30);
14        cout << a2.getX() << endl;
15  }'''), txt("שורה 12", "שורה 10", "שורה 4", "שורה 3"), "c",
    KEY + "clang++: the only error is line 4 (`x_ += 2` inside a const method)."))

# 14 (HELD)
q14 = Q(14, "operator_overloading", "נתונה התכנית הבאה:\n" + cb(r'''
class C {
public:
        int x;
};
void main() {
        C c1;
        c1.x = 2;
        c1 = 3.2 + c1;
}''') + "\nכמה מהמשפטים הבאים נכונים:\n"
    "1. התכנית יכולה להתקמפל ולרוץ ללא שגיאות.\n"
    "2. כדי שהתכנית תוכל להתקמפל ולרוץ חייבים להוסיף פונקציה חיצונית שהיא פונקציה friend של המחלקה C.\n"
    "3. כדי שהתכנית תוכל להתקמפל ולרוץ חייבים להוסיף פונקציה חיצונית שאינה בהכרח פונקצה friend של המחלקה C.\n"
    "4. כדי שהתכנית תוכל להתקמפל ולרוץ חייבים להוסיף פונקציה חברה (member function) למחלקה C.",
    txt(*CNT), "b",
    "The graded copy circles b (1 true statement); the numbering 1-4 is added (the paper lists א-ד). clang++: as written the program does not compile (`3.2 + c1` has no operator); a non-friend external `operator+(double, const C&)` compiles and runs (x is public), so the intended single true statement is 3, but 'must add' in 3 versus an external friend (2) is a matter of wording.")
questions.append(held(q14, "wording-dependent: the graded key says one true statement (3, a non-friend external function), but statement 2 (a friend function) would also compile"))

# 15
questions.append(Q(15, "copy_control", PRINTS + cb(r'''
class Box{
public:
        double width;
        double length;
        double height;
        Box(double w, double l, double h)
        {
                width = w; length = l; height = h;
        }
        Box(Box b)
        {
                width = b.width;
                length = b.length;
                height = b.height;
        }
        //... Other member functions follow ...
};
int main() {
        Box b1(1.1, 2.2, 3.3);
        Box b2 = b1;
        cout << b1.height++;
        cout << b1.height--;
        return 0;
}'''), txt("3.34.3", "4.33.3", "4.32.3", "התכנית לא עוברת קומפילציה"), "d",
    KEY + "clang++: error `copy constructor must pass its first argument by reference` (`Box(Box b)`)."))

# 16
questions.append(Q(16, "const_references", ERRQ + cb(r'''
class A
{
        int n;
public:
        A(int _n) : n(_n) {}
        const int& f1(const int& a) const {
                int y = a;
                return n;
        }
};
void main() {
        A a1(10);
        int y = a1.f1(5);
        a1.f1(5) = 7;
}'''), txt(*CNT), "b",
    KEY + "clang++ (with `void main` read as `int main`): 1 error, `a1.f1(5) = 7` (assignment through a const reference)."))

# 17
questions.append(Q(17, "inheritance_access", "מי המשפט הנכון מבין המשפטים הבאים:",
    txt("Protected members של מחלקה A הם כמו private members למעט העובדה שניתן לגשת אליהם מפונקציות חברות (member functions) של מחלקה שיורשת (באופן ישיר) מהמחלקה A.",
        "Protected members של מחלקה A הם כמו public members למעט העובדה שניתן לגשת אליהם מפונקציות חברות (member functions) של מחלקה שיורשת (באופן ישיר) מהמחלקה A.",
        "Protected members של מחלקה A הם לא ניתנים לגישה על ידי פונקציות של מחלקות אחרות.",
        "מבין שלושת המשפטים האחרים אין אף משפט נכון."), "a",
    KEY + "Concept question; clang++ confirms: a derived member function reads a protected member, while an unrelated class or main gets `'p' is a protected member of 'A'` (so b is false). Statement c is false because derived classes are 'other classes' that can access it.",
    source="solution-pdf"))

EXPL = {
    1: "`f` וירטואלית ב-`B`, ו-`A::f` דורסת אותה (גם כשהיא `private`, הגישה נבדקת לפי הטיפוס הסטטי `B`). `c1` ו-`e1` מצביעים על `b1` (`B`) ולכן מדפיסים `A`, ו-`d1` ו-`f1` מצביעים על `a1` (`A`) ולכן מדפיסים `B`. הפלט `ABAB` (תשובה ג), וכך גם בהרצה.",
    2: "`B` יורשת פרטית מ-`A`, ולכן `x` (פרטי ב-`A`) אינו נגיש ב-`B`: השורה `x = i` שגויה. `C` יורשת מ-`B`, ולכן `y` (פרטי ב-`B`) ו-`x` אינם נגישים בה: `y = j` ו-`x = k` שגויות. שלוש שורות שגויות, כלומר יותר מ-2 (תשובה ד), וכך גם בקומפילציה.",
    3: "`g()` מחזירה הפניה לא-קבועה, ולכן `a1.g() = 5` תקינה. `h()` מחזירה `const int&`, ולכן `a1.h(3) = 6` שגויה: אי אפשר להשים להפניה קבועה. זו שורה שגויה אחת (תשובה ב).",
    4: "`static int x = i` מאותחל פעם אחת בלבד, בקריאה הראשונה, ל-5. הקריאה הראשונה מעלה ל-6 ומדפיסה `6`. השנייה מעלה ל-7, ו-`f(5)++` מדפיסה את הערך `7` לפני ההגדלה ל-8 (ההפניה מחזירה את `x` עצמו). אחר כך `f(3) = 4` מציבה 4 ב-`x`, והקריאה האחרונה מעלה ל-5 ומדפיסה `5`. הפלט `675` (תשובה ד), וכך גם בהרצה.",
    5: "רק משפט 1 נכון. בתוך `A` אפשר להגדיר גם בנאי המרה מ-`B` ל-`A` וגם אופרטור המרה `operator B()` מ-`A` ל-`B`. משפט 2 שגוי: מספיק שהמרה אחת מוגדרת במקום אחד. משפט 3 שגוי: אפשר להגדיר גם את ההמרה ההפוכה. תשובה ב. בדקנו בקומפילציה את כל המקרים.",
    6: "הסדר בבנייה: קודם הבסיסים לפי סדר הרישום, `A` ואז `B`, אחר כך החברים לפי סדר ההצהרה, `b1` ואז `a1`, ולבסוף גוף הבנאי `C`. הפלט `ABBAC`. ההריסה בסדר הפוך: `~C`, אחר כך החברים `~A` (`a1`) ו-`~B` (`b1`), ואז הבסיסים `~B` ו-`~A`: `~C~A~B~B~A`. תשובה ב, וכך גם בהרצה.",
    8: "ההמרה מנגזרת לבסיס (`B* q1 = &a1`) תקינה. ההמרה מבסיס לנגזרת אסורה בלי המרה מפורשת: `A* p1 = &b1` שגויה, וגם `p2 = q2` שגויה. `q2 = p2` תקינה, ו-`p2 = (A*)q2` תקינה (המרה מפורשת). שתי שורות שגויות (תשובה ג).",
    9: "`a1.f(11)` מחזירה `11 + 10 = 21`. עבור `A<B>` הפעולה `y + z` קוראת ל-`B::operator+`, שמחשבת `3 + 0 + 1 = 4`. הפלט `21` ואחריו `4`, כלומר `214` (תשובה א), וכך גם בהרצה.",
    10: "הלולאה מחליפה בין האיטרטור הרגיל לאיטרטור ההפוך שלוש פעמים (n/2), כלומר מהפכת את הווקטור: `5 4 3 2 1 0`. ההדפסה היא `543210` (תשובה ג), וכך גם בהרצה.",
    11: "בתבנית `F1(T a, T b)` שני הארגומנטים חייבים להיות מאותו טיפוס. הקריאות עם `char` ו-`int`, עם `int` ו-`long`, ועם `long` ו-`float` מסיקות שני טיפוסים שונים ל-`T` ונכשלות. שלוש הקריאות הללו שגויות, כלומר יותר מ-2 (תשובה ד).",
    12: "`A a2(a1)` ו-`A a3 = a1` מפעילות שתיהן את בנאי ההעתקה, ולכן הוא מופעל פעמיים (תשובה ב). `A a1(10)` קוראת לבנאי הרגיל. בהרצה, עם הדפסה בבנאי ההעתקה, התקבל `CC`. (`void main` בשאלה הוא סגנון MSVC.)",
    13: "`getX` מוגדרת `const`, אבל היא משנה את השדה `x_` (`x_ += 2`), וזו שגיאה. השורה השגויה היחידה היא שורה 4 (תשובה ג), וכך גם בקומפילציה.",
    15: "הבנאי `Box(Box b)` מקבל את הארגומנט לפי ערך, וזה אסור: בנאי העתקה חייב לקבל הפניה, אחרת העתקת הארגומנט תקרא לו שוב ושוב. הקומפיילר דוחה זאת (`copy constructor must pass its first argument by reference`). התכנית אינה מתקמפלת (תשובה ד).",
    16: "`f1` היא פונקציה `const` שמחזירה `const int&`. `int y = a1.f1(5)` תקינה (העתקה). `a1.f1(5) = 7` שגויה, כי אי אפשר להשים להפניה קבועה. שורה שגויה אחת (תשובה ב). `void main` הוא סגנון MSVC ואינו נחשב כאן.",
    17: "משפט א נכון: חברי `protected` הם כמו `private`, למעט העובדה שפונקציות חברות של מחלקה יורשת (ישירה) יכולות לגשת אליהם. משפט ב שגוי: הם לא נגישים מבחוץ כמו `public`. משפט ג שגוי: מחלקה יורשת היא מחלקה אחרת ויש לה גישה. תשובה א. בדקנו בקומפילציה: מחלקה לא קשורה מקבלת שגיאה.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL and "hold" not in q:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "24B-A",
    "examLabel": "2024 סמסטר ב מועד א",
    "year": 2024,
    "examDate": "25.07.2024",
    "sourceFile": "2024/סמ׳ ב מועד א + פתרון_.pdf",
    "keyFile": "same file: graded student copy (full marks); cross-checked by clang++ runs (tools/verify/24B-A/)",
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
