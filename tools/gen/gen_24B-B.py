# -*- coding: utf-8 -*-
"""Generator for tools/raw/24B-B.json -- oop (61307), 2024 semester B, moed B (15/08/2024).
Run: PYTHONUTF8=1 py tools/gen/gen_24B-B.py

Source: 18-page PDF (17 MCQ x 6 pts, 4 options). Page 1 carries the answer grid with the TRUE answers marked in red
(a note says the examinee's pencil marks on the other pages are not necessarily right); page 1 and the pencil marks are
never shipped. Key = the red circle / red tick per question on that grid. Every code question was also run or compiled
with clang++ (tools/verify/24B-B/, run_all.py) and agrees, except Q14 (held). Q17: the red key is d (does not compile): the
program builds but does not link (~A is pure virtual with no definition).
Held: Q14 (`MyClass<char*> obj4("Hello!")`): the key d follows the ISO C++11 rule (string literal to char* is ill-formed), but
clang++ -std=c++17 only warns by default and prints `10 15.5 Hello!`, so the answer depends on the language standard/compiler mode."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "24B-B.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, conf="high", **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "contextId": "notes",
         "answerSource": "highlighted-pdf", "official": True, "confidence": conf, "explanation": "", "note": note}
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
ERRQ = "בכמה שורות יש שגיאות?\n"
CNT = ("0", "1", "2", "יותר מ- 2")
KEY = "Official key: the red mark on the page-1 grid. "
questions = []

# 1
questions.append(Q(1, "templates", "להלן הכרזה של מחלקה. בכמה שורות יש שגיאות בהכרזה זו?\n" + cb(r'''
template <class T>
class Array {
    template <class U>
        friend ostream& operator<<(ostream&, const Array<U>&);
    template <class U>
        friend istream& operator>>(istream&, Array<U>&);
public:
    Array(int = 10);
    Array(const Array&);
    virtual ~Array();
    const Array& operator=(const Array&);
    bool operator==(const Array&) const;
    int getSize() const;
    bool operator!=(const Array& right) const;
    T& operator[](int);
    const T& operator[](int) const;
    operator int();
    static int getArrayCount();
private:
    int size;
    T* ptr;
    static int arrayCount;
};'''), txt(*CNT), "a", KEY + "clang++ (declaration compiled alone): 0 error lines."))

# 2
questions.append(Q(2, "operator_conversions", "להלן הכרזה של מחלקה. בכמה שורות יש שגיאות בהכרזה זו?\n" + cb(r'''
class YARD
{
private:
        float length;
public:
        yard(float l)
        {
                length = l;
        }
        float operator float()
        {
                return length;
        }
        //... Other member functions follow ...
};'''), txt(*CNT), "c", KEY + "clang++: 2 error lines (`yard(float l)` has no type specifier because the constructor name is YARD, and `float operator float()` gives a return type to a conversion operator)."))

# 3
questions.append(Q(3, "construction_order",
    "באיזה סדר יקראו ה- destructors של המחלקות בקטע הקוד הבא (הסדר של התשובות הוא משמאל לימין)?\n" + cb(r'''
class A {...};
class B {...};
class C : public B, public A {...};
class D {...};
class E : public D {...};
class F : public E {...};
class G : public F, public C {...};

int main()
{
  G g;
  return 0;
}'''), txt("D, E, F, B, A, C, G", "G, C, A, B, F, E, D", "D, E, B, F, A, C, G", "אף תשובה אינה נכונה"), "b",
    KEY + "clang++ run (every class prints its letter in ctor and dtor): construction D E F B A C G, destruction G C A B F E D."))

# 4
questions.append(Q(4, "cpp_basics_refs", "כמה מהמשפטים הבאים נכונים:\n"
    "1. לשתי overloaded functions יכול להיות טיפוס ערך מוחזר שונה בתנאי שטיפוסי הפרמטרים שמועברים לפונקציות זהים לפי הסדר.\n"
    "2. לשתי overloaded functions חייב להיות טיפוס ערך מוחזר שונה אם שמות הפונקציות זהים.\n"
    "3. לשתי overloaded functions יכול להיות טיפוס ערך מוחזר שונה בתנאי שטיפוסי הפרמטרים שמועברים לפונקציות אינם זהים לפי הסדר.\n"
    "4. לשתי overloaded functions אסור שטיפוסי הפרמטרים שמועברים אליהן יהיו זהים לפי הסדר.",
    txt(*CNT), "c",
    KEY + "clang++ checks: two functions that differ only in the return type do not compile (statements 1, 2 false); `int f(int)` with `double f(double)` compiles (3, 4 true). The numbering 1-4 is added (the paper lists א-ד)."))

# 5
questions.append(Q(5, "classes_ctor_dtor", "ההבדל ב- C++ בין class ל struct הוא:",
    txt("ב C++ ב struct ברירת המחדל עבור ה members היא public בעוד שב class ברירת המחדל עבור ה members היא private.",
        "ב C++ ב- class משתמשים לתכנות מונחה עצמים וב- struct משתמשים לתכנות פרוצדורלי.",
        "ב C++ class תומכת בהורשה בעוד ש struct לא.",
        "ב C++ ל- struct לא יכולים להגדיר member functions בעוד של- class יכולים."), "a",
    KEY + "Concept question: the language defines the difference only by default access (public for struct, private for class)."))

# 6
questions.append(Q(6, "operator_overloading", "כמה מהמשפטים הבאים נכונים לגבי הפונקציה operator+ של מחלקה A:\n"
    "1. יתכן שהפונקציה operator+ היא member function (method) של מחלקה A.\n"
    "2. יתכן שהפונקציה operator+ אינה member function של מחלקה A והיא friend של המחלקה A.\n"
    "3. יתכן שהפונקציה operator+ אינה member function של מחלקה A ואינה friend של המחלקה A.",
    txt("0", "1", "2", "3"), "d",
    KEY + "clang++ compile check: a member operator+, a friend operator+ and a plain non-member operator+ (using a public getter) all compile. The numbering 1-3 is added."))

# 7
questions.append(Q(7, "virtual_polymorphism", "נתונה התכנית הבאה:\n" + cb(r'''
class Widget {
public:
        virtual int f() { return 1; }   // 1-st
};
class Gadget : public Widget {
public:
        virtual int f() { return 2; }   // 2-nd
};
class Gizmo : public Widget {
public:
        virtual int f() { return 3; }   // 3-rd
};
void do_it(Widget* w) {
        std::cout << w->f() << " ";
}
int main() {
        std::vector<Widget*> widgets;
        Widget wid;
        Gadget gad;
        Gizmo giz;
        widgets.push_back(&wid);
        widgets.push_back(&gad);
        widgets.push_back(&giz);
        for (int i = 0; i < widgets.size(); i++)
                do_it(widgets[i]);
        return 0;
}'''), txt(
    "הפלט של התכנית יישאר זהה אם נמחק את המילה virtual בשורה שבה רשום בהערה 1-st",
    "הפלט של התכנית יישאר זהה אם נמחק את המילה virtual בשתי שורות: בשורה שבה רשום בהערה 2-nd ובשורה שבה רשום בהערה 3-rd.",
    "הפלט של התכנית יישאר זהה אם נמחק את המילה virtual בשלוש שורות: בשורה שבה רשום בהערה 1-st , בשורה שבה רשום בהערה 2-nd ובשורה שבה רשום בהערה 3-rd",
    "אף אחד משלושת המשפטים הקודמים אינו נכון."), "b",
    KEY + "clang++ runs: original `1 2 3`; without virtual in the 1-st line `1 1 1`; without it in the 2-nd and 3-rd lines `1 2 3` (the overrides stay virtual); in all three `1 1 1`. Statement (b) holds."))
questions[-1]["question"] = questions[-1]["question"]

# 8
questions.append(Q(8, "virtual_polymorphism", PRINTS + cb(r'''
class Base {
public:
    virtual void f(int &a, int &b) {
        a = b;
        b = 10*a;
   }
};

class Derived : public Base {
public:
    virtual void f(int &a, int &b) {
        int temp = a;
        a = b;
        b = temp;
    }
};

int main() {
    int x = 10, y = 20;
    Derived d;
    d.f(x, y);
    cout  << x << " "<< y << " ";

    Base *b = &d;
    b->f(x, y);
    cout  << x << " "<< y << endl;
    return 0;
}'''), txt("10 20 10 20", "20 10 10 100", "20 10 10 20", "20 10 20 10"), "c",
    KEY + "clang++ run: `20 10 10 20` (both calls reach Derived::f and swap)."))

# 9
questions.append(Q(9, "inheritance_access", "להלן תיאור חלקי של מחלקות A ו- B והפונקציה main.\n" + cb(r'''
class B {
   public:
      static  void f() { ... }
   ...
};

class A : private B {
public:
   ...
};

void main()
{
   ....
}''') + "\nאת המשפט A::f() ניתן לבצע:",
    txt("מתוך הפונקציה main", "מתוך כל מחלקה שהיא friend של A", "מתוך כל מחלקה שיורשת את A", "אף תשובה אינה נכונה"), "b",
    KEY + "clang++ compile checks (f given an empty body): from main `'f' is a private member of 'B'`; from a class derived from A the same error; from a friend class of A it compiles."))

# 10
questions.append(Q(10, "virtual_polymorphism", PRINTS + cb(r'''
class A {
public:
   void show() { cout << "A"; }
};

class B : public A {
public:
   void show() { cout << "B"; }
};

int main() {
   A b;
   B d;
   A *ptr = &d;
   b.show();
   ptr->show();
   d.show();
   ptr = &b;
   ptr->show();
   return 0;
}'''), txt("ABBA", "ABBB", "AABA", "BBBA"), "c",
    KEY + "clang++ run: `AABA` (show is not virtual, so ptr->show() always calls A::show)."))

# 11
questions.append(Q(11, "construction_order", PRINTS + cb(r'''
class A {
public:
   A() { cout << "A"; }
};

class B : public A {
public:
   B() { cout << "B"; }
};

class C : public B {
public:
   C() { cout << "C"; }
};

A a;

int main() {
   C c;
   static B b;
   return 0;
}'''), txt("CABABC", "CBAABA", "AABCAB", "AABABC"), "c",
    KEY + "clang++ run: `AABCAB` (the global a, then c = A B C, then the static b = A B)."))

# 12
questions.append(Q(12, "stl_exceptions", PRINTS + cb(r'''
int main() {
   vector<int> vec;

   for (int i = 0; i < 5; ++i) {
       vec[i] = i * 2;
   }

   for (int i = 1; i < vec.size()-1; ++i) {
       cout << vec[i] << " ";

   }
   cout << endl;
   return 0;
}'''), txt("2 4 6", "0 2 3 4 6 8", "התכנית לא עוברת קומפילציה", "שגיאה בזמן ריצה"), "d",
    KEY + "clang++ run: the program crashes (exit code 0xC0000005): `vec[i] = ...` writes through the null buffer of an empty vector (formally undefined behaviour; the crash is what every implementation produces here).",
    conf="med"))

# 13
questions.append(Q(13, "templates", "בכמה שורות בקטע הקוד הבא יש שגיאות?\n" + cb(r'''
template <typename T, typename T2>
T2 add(T a, T2 b, T c) {
   return a + b - c;
}

int main() {
   cout << add(3, 4.5, 7) << endl;
   cout << add(3.5, 4.5, 3) << endl;
   cout << add(3.5, 4.5, 9.5) << endl;
   cout << add(3, 4.5, 3.5) << endl;

   return 0;
}'''), txt(*CNT), "c",
    KEY + "clang++: errors on the 2nd and 4th calls (`no matching function for call to 'add'`: T deduced as double and int from the first and third arguments)."))

# 14 (HELD)
q14 = Q(14, "templates", PRINTS + cb(r'''
template <typename T>
class MyClass {
        T x;
public:
        MyClass(T val) : x(val) {}
        T getX() { return x; }
        void setX(T val) { x = val; }
};

int main() {
        MyClass<int> obj1(10);
        MyClass<double> obj2(15.5);
        cout << obj1.getX() << " " << obj2.getX() << " ";
        MyClass<char*> obj4("Hello!");
        cout << obj4.getX() << endl;

        return 0;
}'''), txt("10 15.5 Hello!", "10 15 Hello!", "1015.5 Hello!", "התוכנית לא עוברת קומפילציה."), "d",
    KEY + "The key d is the ISO C++11+ rule (a string literal does not convert to `char*`; `clang++ -Werror=writable-strings` rejects it), but clang++ -std=c++17 by default only warns and prints `10 15.5 Hello!`, and before C++11 the conversion was legal.")
questions.append(held(q14, "answer depends on the language standard/compiler mode: key d (ill-formed since C++11) vs clang++ default (warning only, prints 10 15.5 Hello!)"))

# 15
questions.append(Q(15, "abstract_multiple", PRINTS + cb(r'''
class A {
public:
        int a;
        A(int a1 = 0) { a = a1; }
};
class B : virtual public A {
public:
        int b;
        B(int b1 = 0) { b = b1; }
};
class C : virtual public A {};
class D : public B, public C {};

int main() {
        D d1;
        d1.a++;
        d1.B::a++;
        d1.C::a++;
        cout << d1.a << d1.B::a << d1.C::a;
        return 0;
}'''), txt("333", "311", "111", "התכנית לא עוברת קומפילציה"), "a",
    KEY + "clang++ run: `333` (virtual inheritance: one shared A::a, incremented three times)."))

# 16
questions.append(Q(16, "inheritance_access", "כמה מהמשפטים הבאים נכונים:\n"
    "1. המוטיבציה לשימוש בהורשה היא שימוש חוזר בקוד (code reuse)\n"
    "2. המוטיבציה לשימוש בהורשה היא הכמסה (encapsulation)\n"
    "3. נניח שקיים יחס isA בין מחלקה A למחלקה B, כך שאובייקט של מחלקה A הוא גם אובייקט של מחלקה B, אזי בתכנות מונחה עצמים רצוי שמחלקה B תירש ממחלקה A.",
    txt("0", "1", "2", "3"), "b",
    KEY + "Concept question (no code). Only statement 1 is true; in statement 3 the direction is reversed (if every A is a B, A should inherit from B). The numbering 1-3 is added (the paper lists א-ג)."))

# 17
questions.append(Q(17, "abstract_multiple", PRINTS + cb(r'''
class A {
public:
        int a;
        A(int a1 = 0) { cout << "A"; a = a1; }
        virtual ~A()=0;
};

class B : public A {
public:
        int b;
        B(int b1 = 0) { cout << "B"; b = b1; }
};

int main(){
        B b1;
        B* bP = new B;
        B b2 = *bP;
        return 0;
}'''), txt("ABAB", "BABA", "BABABA", "התכנית לא עוברת קומפילציה"), "d",
    KEY + "clang++: the translation unit compiles but the build fails at link time (`~A()` is pure virtual and never defined, but B's destructor calls it), so no program is produced. With a body for ~A it would print `ABAB` (the examinee's pencil answer a)."))

EXPL = {
    1: "ההצהרה תקינה: תבנית המחלקה `Array` עם שתי הצהרות `friend` כתבניות (`template <class U> friend ...`), בנאי, הורס וירטואלי, אופרטורים, אופרטור המרה `operator int()` ושדה סטטי. אין בה שגיאה (תשובה א). הקומפיילר קיבל אותה ללא שגיאות.",
    2: "יש שתי שורות שגויות (תשובה ג). הראשונה: `yard(float l)` נראית כבנאי, אבל שם המחלקה הוא `YARD` באותיות גדולות, ולכן זו הצהרה של פונקציה בלי טיפוס מוחזר. השנייה: `float operator float()`, כי לאופרטור המרה אסור להגדיר טיפוס מוחזר. הקומפיילר דיווח על שתי השורות האלה.",
    3: "ההורסים נקראים בסדר הפוך לסדר הבנייה. סדר הבנייה של `G` הוא: הבסיסים לפי סדר הרישום, `F` (שבנויה מ-`D`, `E`, `F`) ואחר כך `C` (שבנויה מ-`B`, `A`, `C`), ואז `G`: `D E F B A C G`. ההריסה הפוכה: `G C A B F E D` (תשובה ב), וכך גם בהרצה.",
    4: "משפטים 3 ו-4 נכונים. משפט 1 ו-2 שגויים: אי אפשר להעמיס פונקציות רק לפי טיפוס הערך המוחזר (הקומפיילר דוחה: `functions that differ only in their return type cannot be overloaded`). העמסה אפשרית רק כאשר רשימת הפרמטרים שונה, ואז טיפוס ההחזרה יכול להיות שונה. שני משפטים נכונים (תשובה ג).",
    5: "ההבדל היחיד בשפה בין `struct` ל-`class` הוא ברירת המחדל של ההרשאה: ב-`struct` היא `public` וב-`class` היא `private` (גם ב-`struct` אפשר ירושה ופונקציות חברות). תשובה א. תשובה ב מתארת מוסכמת שימוש ולא הבדל בשפה.",
    6: "כל שלושת המשפטים נכונים (תשובה ד). `operator+` יכול להיות פונקציה חברה, פונקציית `friend`, או פונקציה גלובלית רגילה שמשתמשת רק בממשק הציבורי של `A` (למשל דרך getter). בדקנו בקומפילציה את שלושת הצורות, והן עוברות.",
    7: "רק משפט ב נכון. כשמוחקים `virtual` רק מהמחלקה `Widget` (משפט א), הפונקציה כבר לא וירטואלית ומודפס `1 1 1`. כשמוחקים `virtual` משתי הנגזרות (משפט ב), הפונקציות עדיין דורסות את הפונקציה הווירטואלית של `Widget` (המילה `virtual` ביורשות אופציונלית), ולכן הפלט נשאר `1 2 3`. כשמוחקים מהשלוש (משפט ג) מתקבל `1 1 1`. בהרצה אישרנו את שלושת המקרים.",
    8: "`d.f(x,y)` קוראת ל-`Derived::f`, שמחליפה בין `x` ל-`y`: `20 10`. `b` מצביע לאובייקט `Derived`, ו-`f` וירטואלית, ולכן `b->f(x,y)` שוב נקראת ל-`Derived::f` ומחליפה שוב: `10 20`. הפלט `20 10 10 20` (תשובה ג), וכך גם בהרצה.",
    9: "`A` יורשת מ-`B` ירושה פרטית, ולכן `f` (החברה הציבורית של `B`) הופכת לפרטית ב-`A`. מותר לגשת אליה מתוך `A` ומתוך `friend` של `A`. אסור מ-`main` ואסור ממחלקה שיורשת מ-`A`. תשובה ב. בקומפילציה: מ-`main` ומנגזרת התקבלה שגיאה `'f' is a private member of 'B'`, ומ-`friend` הקוד עבר.",
    10: "`show` אינה וירטואלית, ולכן הקריאה נקבעת לפי טיפוס המצביע ולא לפי האובייקט. `b.show()` מדפיסה `A`. `ptr->show()` (מצביע ל-`A` לאובייקט `B`) מדפיסה `A`. `d.show()` מדפיסה `B`. אחרי `ptr = &b` מודפס `A`. הפלט `AABA` (תשובה ג), וכך גם בהרצה.",
    11: "האובייקט הגלובלי `a` נבנה לפני `main`: `A`. אחר כך `C c` בונה את השרשרת `A B C`. אחר כך `static B b` בונה `A B`. הפלט `AABCAB` (תשובה ג), וכך גם בהרצה.",
    12: "הווקטור `vec` ריק, ולכן `vec[i] = i * 2` כותב לאזור זיכרון שלא הוקצה (ל-`vector` ריק אין מערך). זו התנהגות לא מוגדרת, ובהרצה התוכנית קורסת (תשובה ד, שגיאה בזמן ריצה). `operator[]` אינו מוסיף איברים, בניגוד ל-`push_back`.",
    13: "ב-`add(T a, T2 b, T c)` הארגומנטים הראשון והשלישי חייבים להיות מאותו טיפוס. הקריאה השנייה `add(3.5, 4.5, 3)` מנסה `T=double` ו-`T=int`, והרביעית `add(3, 4.5, 3.5)` מנסה `T=int` ו-`T=double`. שתיהן נכשלות (`no matching function`). הראשונה והשלישית תקינות. שתי שגיאות (תשובה ג).",
    15: "ב-`B` וב-`C` יש ירושה וירטואלית מ-`A`, ולכן ב-`D` יש עותק יחיד של `A::a`. `d1.a`, `d1.B::a` ו-`d1.C::a` הם אותו שדה, ושלוש ההגדלות מעלות אותו מ-0 ל-3. מודפס `3` שלוש פעמים: `333` (תשובה א), וכך גם בהרצה.",
    16: "משפט 1 נכון: המוטיבציה להורשה היא שימוש חוזר בקוד. משפט 2 שגוי: הכמסה היא עיקרון נפרד. משפט 3 שגוי: הכיוון הפוך. אם כל אובייקט `A` הוא גם אובייקט `B`, אז `A` צריכה לרשת מ-`B` ולא להפך. משפט אחד נכון (תשובה ב).",
    17: "`A` מכילה הורס וירטואלי טהור `virtual ~A()=0` בלי גוף. כל הורס של נגזרת קורא להורס של הבסיס, ולכן חייבת להיות הגדרה ל-`~A`. בלעדיה הקוד מתקמפל אבל הקישור (linker) נכשל (`undefined symbol`), ולכן אין תכנית להריץ (תשובה ד). אילו הייתה הגדרה, היה מודפס `ABAB`.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL and "hold" not in q:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "24B-B",
    "examLabel": "2024 סמסטר ב מועד ב",
    "year": 2024,
    "examDate": "15.08.2024",
    "sourceFile": "2024/סמ׳ ב מועד ב + פתרון.pdf",
    "keyFile": "same file: the true answers marked in red on the page-1 answer grid; cross-checked with clang++ runs (tools/verify/24B-B/)",
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
