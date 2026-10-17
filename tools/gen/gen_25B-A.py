# -*- coding: utf-8 -*-
"""Generator for tools/raw/25B-A.json -- oop (61307), 2025 semester B, moed A (22/07/2025).
Run: PYTHONUTF8=1 py tools/gen/gen_25B-A.py

Source: 38-page scan (17 MCQ x 6 pts, 4 options; questions on the odd pages 5-37). Graded student copy: the page-1 grid
carries the examinee's X marks and the grader's note "17-1=16" (Q2 was wrong). The paper's own header says moed A, 1/07/2025,
while the printed slot stamp reads 22/07/2025 (the date the triage uses); the code stays 25B-A and examDate 22.07.2025.
Page 1 (barcodes, handwriting) is never shipped; handwritten notes on the question pages are not copied.
Keys: the 14 code questions are keyed from clang++ runs (tools/verify/25B-A/, run_all.py), answerSource "solved", official:false;
all 14 agree with the graded copy (16 of 17 right). The 3 concept questions (Q1, Q3, Q15) are keyed from the graded copy
(the examinee's answer, which the grader counted correct).
Q10 deletes a Derived through a Base* with a non-virtual destructor (undefined behaviour by the standard, but every
implementation prints option b); kept at confidence med."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "25B-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, source="solved", conf="high", **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "contextId": "notes",
         "answerSource": source, "official": False, "confidence": conf, "explanation": "", "note": note}
    if correct:
        q["correctId"] = correct
    q.update(kw)
    return q


PRINTS = "מה מדפיסה התכנית הבאה?\n"
ERRQ = "בכמה שורות בקטע הקוד הבא יש שגיאות?\n"
NOCOMP = "התכנית לא עוברת קומפילציה"
GARB = "זבל (ערך כלשהו)"
CNT = ("0", "1", "2", "יותר מ- 2")
questions = []

# 1
questions.append(Q(1, "friend_this_static",
    "נניח ש x הוא שדה פרטי (private member data) של מחלקה A. כמה מהמשפטים הבאים נכונים:\n"
    "1. נניח שבפונקציה חיצונית שאינה friend של המחלקה A, מגדירים אובייקט של המחלקה A. אזי בהמשך הפונקציה הזו לא ניתן לשנות את הערך של השדה x של האובייקט.\n"
    "2. נניח שלא קימת במחלקה A מטודה (member function) שמשנה את הערך של השדה x. נניח שבפונקציה חיצונית שאינה friend של המחלקה A, מגדירים אובייקט של המחלקה A. אזי בהמשך הפונקציה הזו לא ניתן לשנות את הערך של השדה x של האובייקט.\n"
    "3. נניח שבפונקציה חיצונית שאינה friend של המחלקה A, מגדירים אובייקט של המחלקה A. בהמשך הפונקציה, כדי לשנות את הערך של השדה x של האובייקט חייבים לבצע לפחות קריאה אחת למטודה (member function) ציבורית של המחלקה A.",
    txt(*CNT), "a",
    "Concept question, no code to run. Key = the examinee's answer (a), ticked by the grader (16 of 17 right, only Q2 wrong). The numbering 1-3 is added; the paper uses bullets. All three statements are false: a public setter changes x (1), and the implicit copy assignment `a1 = a2` changes x without any member function being written or called (2, 3).",
    source="solution-pdf", conf="med"))

# 2
questions.append(Q(2, "templates", ERRQ + cb(r'''
template<typename U>
void f(U);

template<typename T>
class A {
private:
   T x;

public:
   A(T x1) : x(x1) {}

   template<typename U>
   friend void f(U);
};

template<typename U>
void f(U u) {
   A<int> obj1(5);
   A<U> obj2(u);
   cout << obj1.x;
       cout << obj2.x;
}

int main() {
   f(3.14);
   f("test");
   return 0;
}'''), txt(*CNT), "a",
    "clang++ run: compiles and prints `53.145test`. The friend template declaration makes every specialization of f a friend of every A<T>. The examinee answered c and the grader marked it wrong."))

# 3
questions.append(Q(3, "classes_ctor_dtor", "להלן תאור חלקי של המחלקה A:\n" + cb(r'''
class A {
  A() {}
...
};'''), txt("ניתן ליצור אובייקטים של המחלקה A בכל מקום.",
            "רק במחלקות שיורשות מהמחלקה A ניתן ליצור אובייקטים של המחלקה A.",
            "רק פונקציות friend של המחלקה A יכולות ליצור אובייקטים של המחלקה A.",
            "אף אחת מהתשובות אינה נכונה."), "d",
    "clang++: `class A { A() {} };` has a private constructor (class default access): `A a;` in main fails, a static member function can create objects (so c is incomplete), and a derived class cannot either. Key d = the examinee's ticked answer.",
    source="solution-pdf"))

# 4
questions.append(Q(4, "cpp_basics_refs", "בכמה שורות של פונקציה main בקטע הקוד הבא יש שגיאות?\n" + cb(r'''
class A {
   int a;
};

class B : public A {
   int b;
};

void f(A& a, int x = 1, int y = 3) {
   cout << x;
}

void f(A& a, int x = 2) {
   cout << x;
}

int main() {
   A* a = new A;
   B* b = new B;
   f(*a, 5, 7);
   f(*b ,6, 8);
   f(*a ,9);
   f(*b ,10);
}'''), txt(*CNT), "c",
    "clang++ run: 2 errors, `f(*a,9)` and `f(*b,10)` are ambiguous (both overloads accept A& and one int). The three-argument calls are fine."))

# 5
questions.append(Q(5, "construction_order", PRINTS + cb(r'''
class A {
   const char* id;
public:
   A(const char* id) : id(id) {}
   ~A() { cout << "A(" << id << ") "; }
};

class B {
   const char* id;
public:
   B(const char* id) : id(id) {}
   ~B() { cout << "B(" << id << ") "; }
};

class C : public A {
   B b;
   const char* id;
public:
   C(const char* id) : A("C->A"), b("C->B"), id(id) {}
   ~C() { cout << "C(" << id << ") "; }
};

static A sg("sg");
A g("g");

void func() {
   static A s("s");
   A I("I");
}

int main() {
   C x("x");
   func();
   return 0;
}'''), txt("A(I) C(x) B(C->A) A(C->B) A(s) A(g) A(sg)",
            "C(x) A(I) B(C->A) A(C->B) A(s) A(g) A(sg)",
            "A(I) C(x) B(C->B) A(C->A) A(s) A(g) A(sg)",
            "A(I) C(x) B(C->B) A(C->A) A(s) A(sg) A(g)"), "c",
    "clang++ run: `A(I) C(x) B(C->B) A(C->A) A(s) A(g) A(sg) `. I dies at the end of func, then x (C, then member b, then base A), then the statics/globals in reverse construction order s, g, sg."))

# 6
questions.append(Q(6, "friend_this_static", PRINTS + cb(r'''
class B;

class A {
private:
   int value;

public:
   A() : value(42) {}
   friend class B;
};

class B {
public:
   void showValue(A a) {
      cout << a.value << endl;
   }
};

int main() {
   A a;
   B b;
   b.showValue(a);
   return 0;
}'''), txt("0", "42", GARB, NOCOMP), "b",
    "clang++ run: 42 (B is a friend of A, so it may read the private field)."))

# 7
questions.append(Q(7, "operator_overloading", PRINTS + cb(r'''
class Complex {
private:
   int real, imag;

public:
   Complex(int r, int i) : real(r), imag(i) {}

   friend Complex operator+(const Complex& c1, const Complex& c2);

   void display() const {
      cout << real << " + " << imag << "i" << endl;
   }
};

Complex operator+(const Complex& c1, const Complex& c2) {
   return Complex(c1.real + c2.real, c1.imag + c2.imag);
}

int main() {
   Complex c1(3, 4), c2(1, 2);
   Complex c3 = c1 + c2;
   c3.display();
   return 0;
}'''), txt("4 + 6i", "3 + 4i", "1 + 2i", NOCOMP), "a",
    "clang++ run: `4 + 6i`."))

# 8
questions.append(Q(8, "stl_exceptions", PRINTS + cb(r'''
#include <vector>
class F {
public:
   bool operator()(int x) const {
      return x < 0;
   }
};

class A {
public:
   vector<int> x;
   A(const int arr[], int size) {
      for (int i = 0; i < size; ++i)
         x.push_back(arr[i]);
   }
};

int main() {
   int arr[] = { -5, 3, -1, 7, 0, -2 };
   A a(arr, 6);
   vector<int> y;
   F p;
   vector<int>::iterator it, end;
   for (it = a.x.begin(), end = a.x.end(); it != end; it++) {
      if (p(*it)) {
         y.push_back(*it);
      }
   }
   vector<int>::reverse_iterator rit, rend;
   for (rit = y.rbegin(), rend = y.rend(); rit != rend; rit++) {
      cout << *rit << " ";
   }
   cout << endl;
   return 0;
}'''), txt("-5 -1 -2", "-2 -1 -5", "בהרצת התכנית תקרה שגיאת זמן ריצה.", "התכנית לא עוברת קומפילציה."), "b",
    "clang++ run: `-2 -1 -5 ` (the negatives -5 -1 -2 in order, printed in reverse)."))

# 9
questions.append(Q(9, "operator_overloading", PRINTS + cb(r'''
class Multiplier {
   int factor;
public:
   Multiplier(int f) : factor(f) {}

   int operator() (int x) const {
      return x * factor;
   }
};

int main() {
   Multiplier triple(3), doubleIt(2);
   cout << triple(4) << " " << doubleIt(5);
}'''), txt("12 10", "7 10", "4 5", NOCOMP), "a",
    "clang++ run: `12 10` (function-call operator)."))

# 10
questions.append(Q(10, "virtual_polymorphism", PRINTS + cb(r'''
class Base {
public:
   Base() { cout << "Base "; }
   ~Base() { cout << "DesBase "; }

   virtual void show() { cout << "Base Show "; }
};

class Derived : public Base {
public:
   Derived() { cout << "Derived "; }
   ~Derived() { cout << "DesDerived "; }
   void show() { cout << "Derived Show "; }
};

int main() {
   Base* b = new Derived();
   b->show();
   delete b;
}'''), txt("Base Derived Derived Show DesDerived DesBase",
            "Base Derived Derived Show DesBase",
            "Base Derived Base Show DesDerived DesBase",
            "התכנית לא עוברת קומפילציה."), "b",
    "clang++ run: `Base Derived Derived Show DesBase `. show is virtual (dynamic), the destructor is not, so only ~Base runs; deleting a Derived through a Base* without a virtual destructor is formally undefined behaviour, but this is the exam's intended outcome and the observed one.",
    conf="med"))

# 11
questions.append(Q(11, "copy_control", PRINTS + cb(r'''
class A
{
public:
   int x;

   A() { x = 10; }
   A(const A& a){x=a.x+1;}

   A f() {
      x++;
      return *this;
   }
};

int main()
{
   A obj;
   obj.f().f();
   cout << obj.x << endl;
   return 0;
}'''), txt("10", "11", "12", NOCOMP), "b",
    "clang++ run: 11. obj.f() increments obj to 11 and returns a copy (the copy constructor gives 12); the second f() acts on that temporary, not on obj."))

# 12
questions.append(Q(12, "abstract_multiple", PRINTS + cb(r'''
class A {
public:
   void display() {
      cout << "Class A" << endl;
   }
};

class B {
public:
   void display() {
      cout << "Class B" << endl;
   }
};

class C : public A, public B {
};

int main() {
   C obj;
   obj.display();
   return 0;
}'''), txt("Class A", "Class B", "בהרצת התכנית תקרה שגיאת זמן ריצה.", "התכנית לא עוברת קומפילציה."), "d",
    "clang++: `member 'display' found in multiple base classes of different types` (ambiguous call)."))

# 13
questions.append(Q(13, "friend_this_static", PRINTS + cb(r'''
class MyClass {
private:
   int value;

public:
   MyClass(int v) : value(v) {}

   static void printValue() {
      cout << "Value is: " << value << endl;
   }
};

int main() {
   MyClass obj(42);
   obj.printValue();
   return 0;
}'''), txt("42", "זבל (ערך כלשהו)", "התכנית לא עוברת קומפילציה.", "בהרצת התכנית תקרה שגיאת זמן ריצה."), "c",
    "clang++: `invalid use of member 'value' in static member function`."))

# 14
questions.append(Q(14, "copy_control", ERRQ + cb(r'''
class A {};
int main()
{
   A a;
   A b = a;
   A c(b);
   a = b;
   return 0;
}'''), txt(*CNT), "a",
    "clang++: compiles with 0 errors (implicit default/copy constructor and copy assignment)."))

# 15
questions.append(Q(15, "abstract_multiple", "כמה מהמשפטים הבאים נכונים:\n"
    "1. ב ++C מחלקה נגזרת, יכולה לרשת רק מחלקה אחת.\n"
    "2. הורשה מרובה (multiple inheritance) לא קיימת ב ++C סטנדרטי ודורשת שימוש בספריות חיצוניות.\n"
    "3. אם לשתי מחלקות בסיס יש פונקציה באותו שם, וישנה מחלקה שיורשת משתי מחלקות אלה, יתכנו מקרים שבהם תקרה שגיאת קומפילציה בגלל ambiguity (רב משמעות).\n"
    "4. כאשר מחלקה נגזרת משתמשת בהורשה מרובה מטודות שלה חייבות לקרוא באופן מפורש לבנאים של מחלקות הבסיס שמהן היא יורשת.",
    txt(*CNT), "b",
    "Concept question. Key = the examinee's answer (b), ticked by the grader: only statement 3 is true (Q12 shows the ambiguity). The numbering 1-4 is added; the paper uses bullets.",
    source="solution-pdf"))

# 16
questions.append(Q(16, "virtual_polymorphism", PRINTS + cb(r'''
class A {
public:
   virtual void f() {
      cout << "A";
   }
};

class B : public A {
public:
   void f() {
      cout << "B";
   }
};

void g(A& x) {
   x.f();
}

int main() {
   A *x = new B;
   B *y = new B;
   B z;
   g(*x);
   g(*y);
   g(z);
   return 0;
}'''), txt("ABB", "BAB", "BBB", NOCOMP), "c",
    "clang++ run: BBB. f is virtual in A, so B::f overrides it (the `virtual` keyword is optional in B) and all three calls dispatch to B."))

# 17
questions.append(Q(17, "const_references", ERRQ + cb(r'''
class Sample {
private:
   int value;

public:
   Sample(int v) : value(v) {}

   void show() const {
      cout << "Value: " << value << endl;
   }

   void modify() {
      value += 10;
   }
};

int main() {
   const Sample obj1(5);
   Sample obj2(7);

   obj2.modify();
   obj2.show();
   obj1.modify();
   obj1.show();

   return 0;
}'''), txt(*CNT), "b",
    "clang++: exactly 1 error, `obj1.modify()` (non-const method on a const object); `obj1.show()` is a const method and is fine."))

EXPL = {
    1: "אף אחד מהמשפטים אינו נכון, ולכן תשובה א. משפט 1 שגוי: פונקציה חיצונית יכולה לשנות את `x` בעקיפין, למשל דרך מתודה ציבורית (setter). משפטים 2 ו-3 שגויים בגלל השמה: `a1 = a2` מפעילה את אופרטור ההשמה שמוגדר אוטומטית, והוא מעתיק גם את `x` הפרטי, בלי שנכתבה מתודה ששינתה אותו ובלי קריאה למתודה ציבורית של הפונקציה החיצונית. זו שאלת מושגים (בלי הרצה), והתשובה נקבעה לפי סימון הבודק בטופס.",
    2: "הצהרת `friend` כתבנית (`template<typename U> friend void f(U);`) הופכת כל התמחות של `f` לחברה של כל התמחות של `A`. לכן `f` רשאית לגשת ל-`x` הפרטי גם של `A<int>` וגם של `A<U>`. אין שגיאות (תשובה א): בהרצה מתקבל `53.145test`.",
    3: "ב-`class` ברירת המחדל היא `private`, ולכן הבנאי `A() {}` פרטי. הקוד `A a;` ב-`main` נכשל. אפשר ליצור אובייקט גם מתוך פונקציה סטטית של המחלקה עצמה, ולכן המשפט 'רק פונקציות friend' אינו מדויק (ג). מחלקה יורשת גם היא לא יכולה לגשת לבנאי פרטי (ב). לכן אף תשובה מהראשונות אינה נכונה: תשובה ד. זו שאלת מושגים, ובדקנו את הטענות בקומפילציה.",
    4: "`f(*a, 5, 7)` ו-`f(*b, 6, 8)` מתאימות רק לפונקציה בעלת שלושה פרמטרים. `f(*a, 9)` ו-`f(*b, 10)` מתאימות לשתי הפונקציות (הראשונה עם `y` ברירת מחדל, השנייה עם שני פרמטרים), ולכן הקריאה דו-משמעית (שגיאה). סך הכול שתי שורות שגויות (תשובה ג). הקומפיילר דיווח בדיוק על שתי הקריאות האלה.",
    5: "סדר ההריסה הפוך לסדר הבנייה. `I` מקומי ב-`func` ולכן נהרס ראשון: `A(I)`. אחר כך נהרס `x` ב-`main`: קודם גוף `~C` (`C(x)`), אחר כך החברים (`b`: `B(C->B)`) ולבסוף הבסיס (`A(C->A)`). לבסוף נהרסים האובייקטים הסטטיים והגלובליים בסדר הפוך לבנייתם: `s`, אחר כך `g`, ואז `sg`. הפלט `A(I) C(x) B(C->B) A(C->A) A(s) A(g) A(sg)` (תשובה ג), וכך גם בהרצה.",
    6: "`B` היא `friend` של `A`, ולכן `showValue` רשאית לקרוא את `value` הפרטי של `A`. הערך 42 מאותחל בבנאי של `A`, והפלט `42` (תשובה ב), וכך גם בהרצה.",
    7: "האופרטור `+` מוגדר כפונקציה `friend` ולכן ניגש לשדות הפרטיים. `(3,4) + (1,2) = (4,6)`, והפלט `4 + 6i` (תשובה א), וכך גם בהרצה.",
    8: "המחלקה `F` היא פונקטור (אובייקט עם `operator()`) שמחזיר אמת למספרים שליליים. הלולאה הראשונה מעתיקה ל-`y` את השליליים לפי הסדר: `-5 -1 -2`. הלולאה השנייה מדפיסה את `y` באיטרטור הפוך, ולכן `-2 -1 -5` (תשובה ב), וכך גם בהרצה.",
    9: "`Multiplier` מגדירה `operator()`, ולכן אפשר לקרוא לאובייקט כמו לפונקציה. `triple(4) = 12` ו-`doubleIt(5) = 10`, והפלט `12 10` (תשובה א), וכך גם בהרצה.",
    10: "`show` וירטואלית, לכן `b->show()` מפעילה את `Derived::show`. ההורס `~Base` אינו וירטואלי, ולכן `delete b` דרך `Base*` מפעיל רק את `~Base` (`DesBase`), בלי `~Derived`. פורמלית זו התנהגות לא מוגדרת, אבל זו התוצאה המתוכננת והנצפית: `Base Derived Derived Show DesBase` (תשובה ב). בהרצה: אותו פלט.",
    11: "`obj.f()` מגדילה את `obj.x` ל-11 ומחזירה העתק של `*this` לפי ערך (בנאי ההעתקה נותן `x = 12` לעותק). הקריאה השנייה `.f()` פועלת על העותק הזמני ולא על `obj`, ולכן `obj.x` נשאר 11 (תשובה ב), וכך גם בהרצה.",
    12: "ל-`C` יש שתי פונקציות `display` שנורשות מ-`A` ומ-`B`, והקריאה `obj.display()` דו-משמעית. הקומפיילר מדווח על שגיאה (`member 'display' found in multiple base classes`). לכן התכנית לא עוברת קומפילציה (תשובה ד).",
    13: "`printValue` היא פונקציה סטטית, ולכן אין לה `this` והיא לא יכולה לגשת לשדה הלא-סטטי `value`. זו שגיאת קומפילציה (`invalid use of member 'value' in static member function`), תשובה ג.",
    14: "`A` ריקה, והקומפיילר מייצר לה בנאי ברירת מחדל, בנאי העתקה ואופרטור השמה. `A b = a;` ו-`A c(b);` קוראות לבנאי ההעתקה, ו-`a = b;` להשמה. אין אף שגיאה (תשובה א), והקוד מתקמפל.",
    15: "רק משפט 3 נכון. משפט 1 שגוי: ב-C++ מותרת הורשה מרובה. משפט 2 שגוי: הורשה מרובה קיימת בשפה הסטנדרטית. משפט 3 נכון: אם יש פונקציה באותו שם בשני הבסיסים, קריאה אליה דרך האובייקט הנגזר דו-משמעית (ראו את השאלה על `display`). משפט 4 שגוי: אם לבסיסים יש בנאי ברירת מחדל, הוא נקרא אוטומטית ולא חייבים לקרוא להם במפורש. תשובה ב.",
    16: "`f` וירטואלית ב-`A`, ו-`B::f` דורסת אותה (המילה `virtual` ב-`B` אינה חובה). `g` מקבלת הפניה ל-`A`, והקריאה `x.f()` נקבעת לפי הטיפוס האמיתי של האובייקט, שהוא `B` בכל שלוש הקריאות. הפלט `BBB` (תשובה ג), וכך גם בהרצה.",
    17: "`obj1` הוא `const`, ולכן מותר לקרוא עליו רק למתודות `const`. `obj1.show()` תקינה כי היא `const`. `obj1.modify()` אינה `const`, ולכן זו שגיאה. `obj2` אינו `const` ושתי הקריאות אליו תקינות. יש בדיוק שגיאה אחת (תשובה ב), וכך גם בהרצה.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "25B-A",
    "examLabel": "2025 סמסטר ב מועד א",
    "year": 2025,
    "examDate": "22.07.2025",
    "sourceFile": "2025/סמ׳ ב מועד א + פתרון .pdf",
    "keyFile": "same file: graded copy (grader marks, 16 of 17 right), cross-checked by clang++ runs (tools/verify/25B-A/)",
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
