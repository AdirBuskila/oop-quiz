# -*- coding: utf-8 -*-
"""Generator for tools/raw/25B-B.json -- oop (61307), 2025 semester B, moed B (19/08/2025).
Run: PYTHONUTF8=1 py tools/gen/gen_25B-B.py

Source: 36-page scan (17 MCQ x 6 pts, 4 options; questions on the odd pages 5-35, the even pages are blank backs).
The scan is a graded student copy: the grid on page 1 carries the examinee's marks plus the grader's ticks/crosses with the
correct option circled after a wrong answer. Page 1 and the handwriting are never shipped.
Keys: the 13 code questions (Q1-Q10, Q15-Q17) are keyed from clang++ runs (tools/verify/25B-B/, run_all.py), answerSource "solved",
official:false; the grader marks agree on every one of them. The 4 concept questions (Q11-Q14) are keyed from the grader's marks
(ticked = the examinee's answer; crossed = the circled option), which also agree with the language rules.
Held: Q5 (shallow copy; the program prints twice then the double delete is undefined behaviour, so "runtime error" is
implementation-dependent). Q9 prints `'` instead of `"` after `C speaks\\n` and no `;` (a scan/typo); it is transcribed
corrected, the grader accepts option a."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "25B-B.json"
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


def held(q, reason):
    q.pop("correctId", None)
    for k in ("answerSource", "official", "confidence"):
        q.pop(k, None)
    q["hold"] = reason
    return q


PRINTS = "מה מדפיסה התכנית הבאה?\n"
NOCOMP = "התכנית לא עוברת קומפילציה."
RTERR = "בהרצת התכנית תקרה שגיאת זמן ריצה."
questions = []

# 1
questions.append(Q(1, "const_references",
    "מה יקרה אם יסירו את ההערה // שמופיעה בתחילת השורה המסומנת כשורה X (Line X) בתכנית הבאה:\n" + cb(r'''
class Matrix {
private:
   int data[2][2];

public:
   Matrix() { data[0][0] = 1; data[0][1] = 2; data[1][0] = 3; data[1][1] = 4; }

   int getValue(int row, int col) const {
      return data[row][col];
   }

   int& getValue(int row, int col) {
      return data[row][col];
   }

   void print() const {
      cout << data[0][0] << " " << data[0][1] << endl;
      cout << data[1][0] << " " << data[1][1] << endl;
   }
};

int main() {
   const Matrix m1;
   Matrix m2;
   int a = m1.getValue(1, 1);
   m2.getValue(0, 0) = 99;
   m2.print();
   // m1.getValue(0,0) = 5;   // Line X
   return 0;
}'''),
    txt("התכנית תתקמפל ותרוץ ללא שגיאות", "בהרצת התכנית תקרה שגיאת זמן ריצה.",
        "התכנית לא תעבור קומפילציה בגלל שהקריאה לפונקציה getValue היא דו משמעית (ambiguous).",
        "התכנית לא תעבור קומפילציה מסיבה שונה מהסיבה שצוינה בסעיף ג."), "d",
    "clang++: with the comment removed there is exactly one error, `expression is not assignable`: the const object picks the const overload, which returns an int rvalue (no ambiguity). Grader tick agrees."))

# 2
questions.append(Q(2, "friend_this_static", PRINTS + cb(r'''
class Counter;

class Box {
private:
   int length;
public:
   Box(int l = 0) : length(l){}
   friend Box operator+(const Box& b, const Counter& c);
   void print() const {
      cout << "Length: " << length << endl;
   }
};

class Counter {
private:
   int count;
public:
   Counter(int c = 0) : count(c){}
   friend Box operator+(const Box& b, const Counter& c);
};

Box operator+(const Box& b, const Counter& c) {
   return Box(b.length + c.count);
}

int main() {
   Box b1(10);
   Counter c1(5);
   Box b2 = b1 + c1;
   b2.print();
   return 0;
}'''), txt("Length: 15", "Length: 10", RTERR, NOCOMP), "a",
    "clang++ run: `Length: 15`. The friend function reads the private fields of both classes."))

# 3
questions.append(Q(3, "friend_this_static", "מה יודפס בשורה האחרונה של הפלט של התכנית הבאה:\n" + cb(r'''
class Counter {
private:
   static int count;
   int id;

public:
   Counter() {
      id = ++count;
   }

   static int getCount() {
      return count;
   }

   void print() const {
      cout << "Object ID: " << id << ", Current Count: " << count << endl;
   }
};

int Counter::count = 0;

int main() {
   Counter c1;
   Counter c2;
   c1.print();
   c2.print();
   cout << "Total created: " << Counter::getCount() << endl;

   Counter* c3 = new Counter();
   delete c3;

   cout << "After delete, count is: " << Counter::getCount() << endl;
   return 0;
}'''), txt("After delete, count is: 2", "After delete, count is: 3", RTERR, NOCOMP), "b",
    "clang++ run: last line `After delete, count is: 3` (nothing decrements the static counter on delete)."))

# 4
questions.append(Q(4, "operator_overloading", PRINTS + cb(r'''
class Number {
private:
   int value;
public:
   Number(int v = 0) : value(v) {}
   Number& operator+=(const Number& other) {
      value += other.value;
      return *this;
   }
   Number& operator++() {
      ++value;
      return *this;
   }
   Number operator++(int) {
      Number temp = *this;
      value++;
      return temp;
   }
   void print() const {
      cout << "Value: " << value << endl;
   }
};

int main() {
   Number a(5), b(3);
   (++a += b++)++;
   a.print();
   b.print();
   return 0;
}'''), txt("Value: 10\nValue: 4", "Value:9\nValue: 4", "Value:9\nValue:3", NOCOMP), "a",
    "clang++ run: `Value: 10` / `Value: 4`. ++a gives 6, b++ yields a copy of 3 (b becomes 4), += gives 9, the outer postfix ++ makes a 10."))

# 5 (HELD)
q5 = Q(5, "copy_control", PRINTS + cb(r'''
class Sample {
private:
   int* arr;
   int size;
public:
   Sample(int s) : size(s) {
      arr = new int[size];
      for (int i = 0; i < size; ++i) arr[i] = i * 10;
   }
   Sample(const Sample& other) {
      arr = other.arr;
      size = other.size;
   }
   void modify(int index, int value) {
      if (index >= 0 && index < size) arr[index] = value;
   }
   void print() const {
      for (int i = 0; i < size; ++i)
         cout << arr[i] << " ";
      cout << endl;
   }
   ~Sample() {
      delete[] arr;
   }
};

int main() {
   Sample a(3);
   Sample b = a;

   b.modify(0, 999);
   a.print();
   b.print();
   return 0;
}'''), txt("0 10 20\n999 10 20", "999 10 20\n999 10 20", RTERR, NOCOMP), "c",
    "clang++ run: prints `999 10 20` twice, then the process dies in the double `delete[]` (exit code 0xC0000374, heap corruption, at -O0 and -O2). The grader circled c, but whether the double delete is reported is implementation-dependent, so b vs c is not decidable by the language alone.")
questions.append(held(q5, "double delete[] at exit is undefined behaviour: b (output only) vs c (runtime error) depends on the implementation"))

# 6
questions.append(Q(6, "stl_exceptions", PRINTS + cb(r'''
#include <vector>

int main() {
   vector<double> values;
   vector<double>::reverse_iterator rit;
   values.push_back(1.1);
   values.push_back(2.2);
   values.push_back(3.3);
   values.insert(values.begin(), 0.0);
   values.erase(values.begin() + 1);
   if (!values.empty())
      values[values.size() - 1] = 9.9;

   for (rit = values.rbegin(); rit != values.rend(); ++rit)
      cout << *rit << " ";
   cout << endl;

   return 0;
}'''), txt("9.9 3.3 2.2", "9.9 2.2 0", "3.3 2.2 1.1", NOCOMP), "b",
    "clang++ run: `9.9 2.2 0`. The vector goes 1.1 2.2 3.3 -> 0 1.1 2.2 3.3 -> 0 2.2 3.3 -> 0 2.2 9.9, printed in reverse. Grader tick agrees."))

# 7
questions.append(Q(7, "templates", PRINTS + cb(r'''
template <typename T>
class MyCollection {
private:
   T* data;
   int capacity;
   int size;
public:
   MyCollection(int cap = 10) : capacity(cap), size(0) { data = new T[capacity]; }
   void push_back(const T& val) {
      if (size >= capacity) return;
      data[size++] = val;
   }
   T& operator[](int index) { return data[index]; }
   ~MyCollection() {
      delete[] data;
   }
   MyCollection(const MyCollection& other) {
      capacity = other.capacity;
      size = other.size;
      data = new T[capacity];
      for (int i = 0; i < size; ++i)
         data[i] = other.data[i];
   }
};
class SomeClass {
   int val;
public:
   SomeClass(int v) : val(v) {}
   void print() const { cout << val << endl; }
};
int main() {
   MyCollection<SomeClass> v1(3);
   v1.push_back(SomeClass(1));
   v1.push_back(SomeClass(2));
   MyCollection<SomeClass> v2 = v1;

   v2[0].print();
   v2[1].print();
   return 0;
}'''), txt("1\n2", "ערך כלשהו (זבל)", RTERR, NOCOMP), "d",
    "clang++: no matching constructor for `new T[capacity]` with T=SomeClass (SomeClass has no default constructor), reported at both `new T[...]` lines. Grader circled d."))

# 8
questions.append(Q(8, "virtual_polymorphism", PRINTS + cb(r'''
class Base {
public:
   Base() { cout << "Base constructor\n"; }
   ~Base() { cout << "Base destructor\n"; }
   void print() { cout << "Base::print\n"; }
};
class Derived : public Base {
public:
   Derived() { cout << "Derived constructor\n"; }
   ~Derived() { cout << "Derived destructor\n"; }
   void print() { cout << "Derived::print\n"; }
};
void callPrint(Base &b) {
   b.print();
}
int main() {
   Derived d;
   callPrint(d);
   return 0;
}'''), txt(
    "Base constructor\nDerived constructor\nDerived::print\nDerived destructor\nBase destructor",
    "Base constructor\nDerived constructor\nBase::print\nBase destructor\nDerived destructor\nBase destructor",
    "Base constructor\nDerived constructor\nBase::print\nBase destructor",
    "Base constructor\nDerived constructor\nBase::print\nDerived destructor\nBase destructor"), "d",
    "clang++ run: Base constructor, Derived constructor, Base::print (print is not virtual), Derived destructor, Base destructor. Grader circled d."))

# 9
questions.append(Q(9, "abstract_multiple", PRINTS + cb(r'''
class A {
public:
   A() { cout << "A constructor\n"; }
   virtual ~A() { cout << "A destructor\n"; }
   virtual void speak() const { cout << "A speaks\n"; }
};
class B : virtual public A {
public:
   B() { cout << "B constructor\n"; }
   ~B() { cout << "B destructor\n"; }
   void speak() const { cout << "B speaks\n"; }
};
class C : virtual public A {
public:
   C() { cout << "C constructor\n"; }
   ~C() { cout << "C destructor\n"; }
   void speak() const { cout << "C speaks\n"; }
};
class D : public B, public C {
public:
   D() { cout << "D constructor\n"; }
   ~D() { cout << "D destructor\n"; }
   void speak() const { cout << "D speaks\n"; }
};
int main() {
   A* a = new D();
   a->speak();
   delete a;
   return 0;
}'''), txt(
    "A constructor\nB constructor\nC constructor\nD constructor\nD speaks\nD destructor\nC destructor\nB destructor\nA destructor",
    "A constructor\nB constructor\nC constructor\nD constructor\nA speaks\nD destructor\nC destructor\nB destructor\nA destructor",
    "A constructor\nB constructor\nC constructor\nD constructor\nD speaks\nB destructor\nC destructor\nA destructor",
    NOCOMP), "a",
    "clang++ run (typo corrected): the virtual base A is built once and first, then B, C, D; destruction is the exact reverse. The printed paper has `\"C speaks\\n'  }` (a stray apostrophe and no semicolon) in C::speak, read as a typo; the grader ticked a.",
    conf="med"))

# 10
questions.append(Q(10, "templates", PRINTS + cb(r'''
template<typename T>
void func(T a) {
   cout << "Generic template\n";
}

void func(int a) {
   cout << "Non-template overload\n";
}

int main() {
   func(3.14);
   func(int(3.14));
   return 0;
}'''), txt("Generic template\nGeneric template", "Generic template\nNon-template overload", RTERR, NOCOMP), "b",
    "clang++ run: `Generic template` then `Non-template overload`. func(3.14) deduces T=double (exact match beats the int conversion); func(int(...)) prefers the non-template."))

# 11
questions.append(Q(11, "virtual_polymorphism",
    "מה קורה כאשר קוראים לפונקציה לא ויטואלית דרך מצביע למחלקה בסיסית (base class pointer)?",
    txt("יהיה שימוש במימוש של הפונקציה במחלקה הנגזרת (derived class).",
        "יהיה שימוש במימוש של הפונקציה במחלקה הבסיסית (base class).",
        "תקרה שגיאת זמן ריצה.", "תקרה שגיאת קומפילציה."), "b",
    "Concept question. Key from the grader's tick (b); static binding.", source="solution-pdf"))

# 12
questions.append(Q(12, "abstract_multiple", "כמה מהמשפטים הבאים נכונים:\n"
    "1. ב ++C אם למחלקה מסוימת יש פונקציה וירטואלית טהורה, אז אסור לממש אותה במחלקה זו.\n"
    "2. ב ++C אם למחלקה מסוימת יש פונקציה וירטואלית טהורה, אז במחלקה שיורשת ממנה באופן ישיר חייב להיות מימוש לפונקציה הזאת.\n"
    "3. ב ++C הבנאי (constructor) של מחלקה לא יכול להיות פונקציה וירטואלית טהורה.\n"
    "4. ב ++C ההורס (destructor) של מחלקה לא יכול להיות פונקציה וירטואלית טהורה.",
    txt("0", "1", "2", "יותר מ- 2"), "b",
    "Concept question. Key from the grader's circle (b = 1 true statement): only statement 3 is true (a pure virtual may have a body, a derived class may stay abstract, a destructor can be pure virtual if defined).",
    source="corrected-key"))
for _q in questions[-1:]:
    _q["note"] += " The numbering 1-4 is added; the paper uses bullets."

# 13
questions.append(Q(13, "abstract_multiple", "בהורשה מרובה ב ++C איזו בעיה פותר המנגנון של הורשה וירטואלית?",
    txt("בעית הסתרת פונקציות (Function hiding problem).", "בעית היהלום/מעוין (Diamond problem).",
        "בעית פיצול הזכרון (Memory fragmentation problem).", "בעית התנגשות שמות במרחב השמות (Name conflicts in Namespace problem)."), "b",
    "Concept question. Key from the grader's tick (b).", source="solution-pdf"))

# 14
questions.append(Q(14, "virtual_polymorphism", "איזה מנגנון ב ++C מאפשר קישור למטודות בזמן ריצה (runtime method binding)?",
    txt("תבניות (Templates).", "פונקציות inline.", "פונקציות וירטואליות.", "פונקציות friend."), "c",
    "Concept question. Key from the grader's circle (c).", source="corrected-key"))

# 15
questions.append(Q(15, "operator_overloading",
    "איזו פקודה צריכה להחליף את שורת ההערה שמסומנת ב *** בתכנית הבאה על מנת שהפלט של התכנית יהיה 1 ?\n" + cb(r'''
struct A
{
   int value;
   A(int x) : value(x) {}
   int operator+(const A& a) { return -a.value; }
   int operator+(int x) { return 2 * x; }
   friend ostream& operator<< (ostream& os, const A& a);
};

ostream& operator<< (ostream& os, const A& a) {
   return os << a.value;
}

int operator+(const A& a) {
   static int counter = 1;
   return ++counter + a.value;
}

int main()
{
   A a1(4), a2(-1);
   //*********
   return 0;
}'''), txt("cout<<a2+a1;", "cout<<+a2;", "cout<<a1 + -3;", "אף תשובה אינה נכונה."), "b",
    "clang++ runs: `a2+a1` prints -4, `+a2` prints 1 (global unary +: ++counter=2 plus -1), `a1 + -3` prints -6. Grader tick agrees."))

# 16
questions.append(Q(16, "copy_control", PRINTS + cb(r'''
class A {
public:
   int x;
   A(int x = 2) { this->x = x; }
   A(A other) { this->x = other.x; }
};

void f(A obj1, A obj2)
{
   cout << obj1.x << obj2.x;
}

int main()
{
   A a1;
   A a2(a1);
   A a3;
   A a4(a3);
   f(a2, a4);
   return 0;
}'''), txt("22", "ערך כלשהו (זבל).", RTERR, NOCOMP), "d",
    "clang++: error `copy constructor must pass its first argument by reference` (ill-formed in the standard). The grader marked the examinee's a wrong and circled d."))

# 17
questions.append(Q(17, "cpp_basics_refs", PRINTS + cb(r'''
int& DoChange(int num)
{
   return num;
}

int main()
{
   int i = 10;
   DoChange(i) = 7;
   cout << i << endl;
   return 0;
}'''), txt("7", "10", "ערך כלשהו (זבל)", RTERR), "b",
    "clang++ run (-O0 and -O2): 10. The parameter is passed by value, so the returned reference never aliases i (it dangles into the callee's copy; i itself is never written). Grader tick agrees.",
    conf="med"))

EXPL = {
    1: "לאובייקט `const` נבחרת רק הגרסה ה-`const` של `getValue`, והיא מחזירה `int` לפי ערך (ערך זמני). ניסיון להשמה לערך זמני כזה הוא שגיאת קומפילציה (`expression is not assignable`). אין עמימות בין שתי הגרסאות, כי ה-`const` הוא חלק מחתימת הפונקציה, ולכן תשובה ג שגויה. השגיאה קיימת אבל מסיבה אחרת, כלומר תשובה ד.",
    2: "`operator+` מוגדרת כ-`friend` בשתי המחלקות, ולכן יש לה גישה לשדות הפרטיים `length` ו-`count`. החישוב הוא `10 + 5`, והפלט `Length: 15` (תשובה א). בקוד שהורץ התקבל בדיוק הפלט הזה.",
    3: "`count` הוא משתנה סטטי משותף לכל האובייקטים: `c1` ו-`c2` מעלים אותו ל-2, ו-`c3` ל-3. ההורס של `Counter` לא מוגדר ולכן לא מקטין את `count`, ולכן אחרי `delete c3` הערך נשאר 3 (תשובה ב). בהרצה: `After delete, count is: 3`.",
    4: "`++a` מעלה את `a` ל-6 ומחזירה הפניה אליו. `b++` מחזיר עותק של הערך הישן 3, ו-`b` הופך ל-4. `+=` מוסיף 3 ל-`a` (9) ומחזיר הפניה אל `a`. האופרטור הפוסטפיקסי האחרון `++` מעלה את `a` ל-10. הפלט `Value: 10` ו-`Value: 4` (תשובה א), וכך גם בהרצה.",
    6: "הווקטור משתנה כך: `1.1 2.2 3.3`, אחרי `insert` בתחילה `0 1.1 2.2 3.3`, אחרי `erase` של האיבר השני `0 2.2 3.3`, ואחרי ההשמה לאיבר האחרון `0 2.2 9.9`. הלולאה עוברת באיטרטור הפוך ולכן מדפיסה `9.9 2.2 0` (תשובה ב). בהרצה: `9.9 2.2 0`.",
    7: "ב-`MyCollection<SomeClass>` הבנאי מבצע `new T[capacity]`, וזה דורש בנאי ברירת מחדל של `T`. ל-`SomeClass` יש רק בנאי שמקבל `int`, ולכן הקומפיילר מדווח שגיאה (`no matching constructor`). התכנית אינה מתקמפלת (תשובה ד), וכך גם בהרצה.",
    8: "`print` ב-`Base` אינה וירטואלית, ולכן הקריאה `b.print()` דרך הפניה ל-`Base` מפעילה תמיד את `Base::print` (קישור סטטי). הבנייה היא בסדר `Base` ואז `Derived`, וההריסה בסדר הפוך: `Derived` ואז `Base`. תשובה ד, וכך גם בהרצה.",
    9: "הבסיס הווירטואלי `A` נבנה פעם אחת ולפני כולם: `A`, ואחריו `B`, `C`, `D`. `speak` וירטואלית ולכן הקריאה דרך `A*` מפעילה את `D::speak` (ל-`D` יש דריסה, מה שפותר את העמימות בין `B` ל-`C`). `A` יש הורס וירטואלי, ולכן `delete a` מפעיל את שרשרת ההריסה המלאה בסדר הפוך: `D C B A`. תשובה א, וכך גם בהרצה. בקוד המודפס יש גרש במקום מירכאות ב-`C::speak`, וזו נראית טעות דפוס.",
    10: "בקריאה `func(3.14)` הארגומנט הוא `double`, והתבנית מתאימה בדיוק עם `T=double`, ולכן היא עדיפה על ההמרה ל-`int`. ב-`func(int(3.14))` הארגומנט הוא `int`, ושתי הפונקציות מתאימות בדיוק, ופונקציה רגילה עדיפה על תבנית. הפלט `Generic template` ואחריו `Non-template overload` (תשובה ב), וכך גם בהרצה.",
    11: "פונקציה לא וירטואלית נקבעת בזמן קומפילציה לפי טיפוס המצביע, כלומר המחלקה הבסיסית. לכן יופעל המימוש של המחלקה הבסיסית (תשובה ב), גם אם המצביע מצביע בפועל על אובייקט נגזר.",
    12: "רק משפט 3 נכון. משפט 1 שגוי: לפונקציה וירטואלית טהורה אפשר לתת גוף מחוץ למחלקה. משפט 2 שגוי: המחלקה היורשת יכולה להישאר אבסטרקטית ולא לממש. משפט 3 נכון: בנאי אינו יכול להיות וירטואלי בכלל. משפט 4 שגוי: הורס יכול להיות וירטואלי טהור, ובלבד שמוגדר לו גוף. סך הכול משפט אחד (תשובה ב).",
    13: "כשמחלקה יורשת פעמיים מאותו בסיס דרך שתי מחלקות ביניים נוצרים בה שני עותקים של הבסיס (בעיית היהלום). ירושה וירטואלית מבטיחה עותק אחד משותף. תשובה ב.",
    14: "קישור מתודות בזמן ריצה (דינמי) מתבצע באמצעות פונקציות וירטואליות. תבניות ו-`inline` נפתרות בזמן קומפילציה, ו-`friend` קשור להרשאות גישה בלבד. תשובה ג.",
    15: "הפלט צריך להיות 1. `cout<<a2+a1` מפעיל את `operator+` החבר ומדפיס `-4`. `cout<<+a2` מפעיל את `operator+` האונרי הגלובלי: `++counter` נותן 2 ועם `a.value` שהוא -1 מתקבל 1. `cout<<a1 + -3` מפעיל את `operator+(int)` ונותן `-6`. תשובה ב, וכך גם בהרצות.",
    16: "הבנאי `A(A other)` מקבל את הארגומנט לפי ערך, וזה אסור: קבלת פרמטר מסוג המחלקה עצמה בבנאי העתקה הייתה גורמת לרקורסיה אינסופית, ולכן הקומפיילר דוחה זאת (`copy constructor must pass its first argument by reference`). התכנית אינה מתקמפלת (תשובה ד).",
    17: "`num` מועבר לפי ערך, ולכן ההפניה שמוחזרת מצביעה על העותק המקומי של הפונקציה ולא על `i`. ההשמה `= 7` לא משנה את `i`, והוא נשאר 10 (תשובה ב). בהרצה (גם עם אופטימיזציה) מודפס `10`. ההפניה תלויה (dangling), וזו סיבה שהתשובה נשארת ברמת ביטחון בינונית.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL and "hold" not in q:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "25B-B",
    "examLabel": "2025 סמסטר ב מועד ב",
    "year": 2025,
    "examDate": "19.08.2025",
    "sourceFile": "2025/סמ׳ ב מועד ב + פתרון.pdf",
    "keyFile": "same file: graded copy (grader marks on the page-1 grid), cross-checked by clang++ runs (tools/verify/25B-B/)",
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
