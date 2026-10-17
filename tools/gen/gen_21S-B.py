# -*- coding: utf-8 -*-
"""Generator for tools/raw/21S-B.json -- oop (61307), 2021 summer semester, moed B (07.11.2021).
Run: PYTHONUTF8=1 py tools/gen/gen_21S-B.py

Source: 14-page scan (blank pages included) of a student's graded copy, 20 MCQ x 5 pts. Page 1 is NOT shipped (ID, handwriting).
The grader's total (35 = 7 correct) and the list of wrong questions identify the seven questions the student got right
(3, 4, 6, 8, 9, 15, 16): for those the student's answer is the key (answerSource solution-pdf, i.e. the graded copy). For every other question the
key is derived by compiling/running with clang++ (tools/verify/21S-B/, run_all.py), answerSource solved. All keys were also checked
against the run: the seven graded-correct answers agree with it (Q4 is a concept question: every iterator operation listed is supported).
Held: Q10 (concept, the student's marked answer was graded wrong but the scan is ambiguous between b and c; no key),
Q17 (clang counts one compile-error line, plus a link error from the never-defined non-template friend; intended count 1 vs 2 unclear)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "21S-B.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, graded=False, conf="high", **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "contextId": "notes",
         "answerSource": "solution-pdf" if graded else "solved", "official": False, "confidence": conf,
         "explanation": "", "note": note}
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


OUTQ = "מה הפלט הנכון של הקוד הנתון?\n"
questions = []

questions.append(Q(
    1, "cpp_basics_refs", "איזה מהבאים הוא תחביר (`syntax`) הנכון אם ברצוננו ליצור משתנה `reference` למשתנה `int` קיים?",
    txt("`int a = 10; int r = &a;`", "`int a = 10; int &r = a;`", "`int a = 10; int & r = & a;`", "`int a = 10; int &r; r = a;`"),
    "b", "Graded wrong for the student. clang++: only option b compiles; a, c, d are errors."))

questions.append(Q(
    2, "friend_this_static", "כמה שגיאות יש בתוכנית הבאה?\n" + cb(r'''
class Sample {
    static int count;

public:
    Sample()
    {
        count++;
    }

    void sayHello()
    {
        cout << "Hello, ";
    }
    static void printTotalObj()
    {
        sayHello();
        cout << count << endl;
    }
};

int Sample::count = 0;

int main()
{
    Sample S1;
    Sample S2;
    Sample.printTotalObj();
    return 0;
}'''),
    txt("0", "1", "2", "3"), "c",
    "Graded wrong for the student (marked b). clang++: errors on exactly two lines: `sayHello();` inside the static function (no object) and `Sample.printTotalObj();` (class name needs `::`)."))

questions.append(Q(
    3, "friend_this_static", "אילו מהטענות הבאות נכונות לגבי השימוש במילת המפתח \"this\"?\n"
    "1. מצביע המשמש להצביע על פונקציות וירטואליות.\n2. מצביע המכיל את ההפניה לאובייקט הנוכחי.\n"
    "3. מצביע שניתן להשתמש בו במחלקה בלבד.\n4. מצביע שניתן להשתמש בו בתוך המחלקה וגם מחוצה לה.",
    txt("1 ו-3.", "2 ו-3.", "1, 2 ו-4.", "1, 2 ו-3."), "b",
    "Graded correct for the student (answer b). clang++ probes agree: `this` returned from a member equals the object's address; using `this` in `main` does not compile.",
    graded=True))

questions.append(Q(
    4, "stl_exceptions", "אילו מהפעולות 1-4 הבאות הן פעולות הנתמכות על ידי איטרטורים?\n1. פעולות קריאה\n2. פעולות כתיבה\n3. פעולות הגדלה\n4. פעולות השוואה",
    txt("1, 2", "1, 3", "1, 2, 3", "1, 2, 3, 4"), "d",
    "Graded correct for the student (answer d). Concept question; an iterator supports `*it` (read), `*it = v` (write), `++it` and `it != end`.",
    graded=True, conf="med"))

questions.append(Q(
    5, "const_references", "כמה מהטענות הבאות הינן נכונות לגבי שימוש במתודה שמוגדרת כקבועה?\n"
    "1. ניתן לגשת ולא לשנות רק ל-`data members` אשר מוגדרים כקבועים.\n"
    "2. ניתן לגשת ולא לשנות לכל ה-`data members`: גם קבועים וגם לא קבועים.\n"
    "3. ניתן לשנות את כל ה-`data members`, חוץ מאשר `data members` אשר מוגדרים כקבועים.\n"
    "4. לא ניתן לגשת אף `data member` של המחלקה.",
    txt("1", "2", "3", "4"), "a",
    "Graded wrong for the student (marked 2). clang++ probe: a const method reads const and non-const members, and assigning to either kind is an error; "
    "so only statement 2 is true -> one true statement -> a."))

questions.append(Q(
    6, "classes_ctor_dtor", "מה היא ההגדרה הנכונה עבור פונקציה בונה ברירת מחדל (`default constructor`) למחלקה הבאה?\n" + cb(r'''
class sample
{
   private:
      int x,y;
};''') + "\n",
    txt("`public: sample(){}`", "`public: sample(){ x=0; y=0;}`", "`public: sample(int a, int b){ x=a; y=b;}`", "תשובות א' ו-ב'."), "d",
    "Graded correct for the student (answer d). Both a and b are constructors callable without arguments.", graded=True))

questions.append(Q(
    7, "friend_this_static", OUTQ + cb(r'''
class Sample {
private:
   int var;
public:
   Sample() {
      var = 10;
   }
   friend void fun();
};
friend void fun(){
   Sample S;
   cout << S.var << endl;
}
int main()
{
   fun();
   return 0;
}'''),
    txt("`10`", "שגיאת קומפילציה", "שגיאת זמן ריצה", "`0`"), "b",
    "Graded wrong for the student (marked a). clang++: compile error (`friend` may appear only inside a class, here on the out-of-class definition)."))

questions.append(Q(
    8, "copy_control", "אילו מהפונקציות הבאות \"חייבות\" להשתמש ב-`reference`:",
    txt("אופרטור השוואה", "פונקציה בונה מעתיקה", "פונקציה הורסת", "פונקציה בונה עם פרמטרים."), "b",
    "Graded correct for the student (answer b). A copy constructor must take its parameter by reference (by value would recurse forever).", graded=True))

questions.append(Q(
    9, "operator_overloading", OUTQ + cb(r'''
class Sample {
private:
   int number;
public:
   Sample(){
      number = 10;
   }
   void operator++(){
      number = number + 1;
   }
   void Display() const {
      cout << number << endl;
   }
};
int main(){
   Sample S;
   S++;
   S++;
   S.Display();
   return 0;
}'''),
    txt("`12`", "`10`", "שגיאת תחביר (`syntax`)", "ערך אשפה"), "c",
    "Graded correct for the student (answer c). clang++: compile errors on both `S++;` lines (postfix needs `operator++(int)`).", graded=True))

q10 = Q(
    10, "cpp_basics_refs", "אילו מהאפשרויות הבאות בתכנות מונחה עצמים מתאימה ביותר עבור נושא של העמסת פונקציות (`function overloading`) ופרמטרים ברירת מחדל (`default arguments`):",
    txt("הורשה", "פולימורפיזם", "הסתרת מידע", "יצירת עצמים"), None,
    "Held: concept question with no code to run. The student's marking on the page circles both b and c; it was graded wrong, and the scan does not show which of the two counts.")
questions.append(held(q10, "no-key: concept question, the graded student answer is unreadable (b or c) and was marked wrong; no official key"))

questions.append(Q(
    11, "abstract_multiple", "אילו מהטענות הבאות נכונות עבור מחלקה אבסטרקטית ב-C++?",
    txt("(1) ניתן לייצר מצביע מסוג המחלקה האבסטרקטית אך לא ניתן לייצר אובייקט של מחלקה אבסטרקטית.",
        "(2) מחלקה אבסטרקטית יכולה להכיל משתנים, פונקציות וירטואליות טהורות, ופונקציות אחרות נוספות.",
        "שתי התשובות (1) ו-(2) הינן נכונות.", "אף אחת מהתשובות אינה נכונה."), "c",
    "Graded wrong for the student (marked a). clang++ probes: a pointer to the abstract type compiles, an object does not; a class with data members, a pure virtual and a normal function compiles."))

questions.append(Q(
    12, "abstract_multiple", "איך \"מכריחים\" מחלקה נגזרת ממשית (`concrete derived class`) להגדיר (`to define`) מתודה וירטואלית?",
    txt("על ידי הגדרת פונקציה וירטואלית טהורה ב-`base class`.", "לא ניתן לאלץ מחלקה נגזרת להגדיר מתודה וירטואלית.",
        "כל הורשה מחייבת את המחלקה הנגזרת להגדיר את כל המתודות הוירטואליות.", "לדרוס (`override`) את הפונקציה במחלקה נגזרת."), "a",
    "Graded wrong for the student (marked c). clang++ probe: a derived class that does not define the pure virtual function stays abstract (cannot be instantiated), "
    "so a pure virtual function is the mechanism that forces it; d only restates what the derived class does.", conf="med"))

questions.append(Q(
    13, "templates", OUTQ + cb(r'''
template <class T, int b>
class Sample {
   T a;
public:
   Sample(T a) {
      this->a = a;
   }
   void print() const {
      cout << a << " " << b << endl;
   }
};
int main(){
   Sample<int, 20> S(10);
   S.print();
   return 0;
}'''),
    txt("`10 20`", "ערכי זבל", "שגיאת תחביר (`syntax`)", "שגיאה בזמן ריצה"), "a",
    "Graded wrong for the student (marked c). clang++ run printed `10 20`."))

questions.append(Q(
    14, "construction_order", OUTQ + cb(r'''
class Base {
public:
   Base(){
      cout << "Base Ctor Called" << endl;
   }
   ~Base(){
      cout << "Base Dtor Called" << endl;
   }
};
class Derived : Base {
public:
   Derived(){
      cout << "Derived Ctor Called" << endl;
   }
   ~Derived(){
      cout << "Derived Dtor Called" << endl;
   }
};
int main(){
   Base *B;
   B=new Derived;
   delete B;
   return 0;
}'''),
    [{"id": "a", "type": "text", "value": cb("Base Ctor Called\nDerived Ctor Called\nBase Dtor Called\nDerived Dtor Called", "")},
     {"id": "b", "type": "text", "value": cb("Base Ctor Called\nDerived Ctor Called\nDerived Dtor Called\nBase Dtor Called", "")},
     {"id": "c", "type": "text", "value": cb("Base Ctor Called\nDerived Ctor Called\nBase Dtor Called", "")},
     {"id": "d", "type": "text", "value": "שגיאת זמן קומפילציה"}],
    "d", "Graded wrong for the student (marked c). clang++: compile error, because `class Derived : Base` inherits privately (default for `class`), "
    "so the conversion `B = new Derived` to `Base*` is inaccessible."))

questions.append(Q(
    15, "virtual_polymorphism", OUTQ + cb(r'''
class ClassA {
public:
        void display() { cout << "Displaying Class A"; }
};

class ClassB : public ClassA {
public:
        void jump(int num) { cout << "Jumping " << num << endl; }
        void display() { ClassA::display();  cout << "Displaying Class B" << endl; }
};

void main(){
        ClassA *aPtr;
        ClassB b;
        aPtr->jump(3);
}'''),
    txt("`Jumping 3` - בגלל שמצביעים לאובייקט מסוג `ClassB`.", "`Jumping 3` – בגלל שהמצביע הוא מסוג `ClassA` והאובייקט הוא מסוג מחלקה יורשת.",
        "שגיאת קומפילציה.", "ניתן היה להריץ את התכנית אם `void jump` הייתה מוגדרת כמתודה וירטואלית במחלקה `ClassB` בלבד."), "c",
    "Graded correct for the student (answer c). clang++: `jump` is not a member of `ClassA` -> compile error on `aPtr->jump(3)` (with `main` made `int main()`; "
    "`void main` itself is rejected by clang++).", graded=True))

questions.append(Q(
    16, "operator_overloading", "כמה שגיאות יש בתוכנית הבאה?\n" + cb(r'''
class A {
   int n;
public:
   A(int nn = 0) { n = nn; }
   A &operator ++() { ++n; return *this; }
};
int main()
{
   A a(5);
   A b=++a;
   A c(a++);
   cout << a;
   return 1;
}'''),
    txt("0", "1", "2", "3"), "c",
    "Graded correct for the student (answer c). clang++: errors on `A c(a++);` (no postfix operator++) and `cout << a;` (no operator<<) -> 2.", graded=True))

q17 = Q(
    17, "templates", "כמה שגיאות יש בקטע הקוד הבא?\n" + cb(r'''
template <class T>
class A{
public:
   A(int i = 0) { ii = i; }
   A(const A& rhs);
   ~A() { ; }
   A& operator=(const A& rhs) { ii = rhs.ii; return *this; };
   friend ostream& operator<< (ostream&, A<T>&);
private:
   int ii;
};
template <class T>
ostream& operator<< (ostream& output, A<T>& arg){
   output << arg.ii << endl;
   return output;
}
template <class U> A<U>::A(const A& rhs){
   ii = rhs.ii;
}
int main(){
   A<int> aa;
   aa = 5;
   cout <<endl << aa << endl;
   return aa;
}'''),
    txt("0", "1", "2", "יותר משתיים"), None,
    "Held: clang++ reports one compile-error line (`return aa;`). With that line fixed the program still fails to LINK, because the friend declaration "
    "is a non-template function that is never defined. The student's answer (more than two) was graded wrong; the intended count (1 or 2) cannot be settled.")
questions.append(held(q17, "no-key: clang++ counts 1 compile error plus a link error (undefined non-template friend operator<<); intended answer 1 vs 2 unclear, student answer d graded wrong"))

questions.append(Q(
    18, "stl_exceptions", OUTQ + cb(r'''
#include <vector>
void func(){
   vector<int> v(5, 3);
   for (int i=0;i<v.size();i++)
      cout << v[i];
}
void main(){
   func();
}'''),
    txt("`555`", "`33333`", "שגיאת קומפילציה", "`53`"), "b",
    "Graded wrong for the student (marked c). clang++ run (with `main` made `int main()`) printed `33333`; `vector<int> v(5, 3)` is five elements of value 3."))

questions.append(Q(
    19, "templates", OUTQ + cb(r'''
template <typename T>
void fun(const T&x){
   static int count = 0;
   cout << "x = " << x << " count = " << count << endl;
   ++count;
   return;
}
int main(){
   fun<int> (1);
   cout << endl;
   fun<int>(1);
   cout << endl;
   fun<double>(1.1);
   cout << endl;
   return 0;
}'''),
    [{"id": "a", "type": "text", "value": cb("x = 1 count = 0\nx = 1 count = 1\nx = 1.1 count = 0", "")},
     {"id": "b", "type": "text", "value": cb("x = 1 count = 0\nx = 1 count = 0\nx = 1.1 count = 0", "")},
     {"id": "c", "type": "text", "value": cb("x = 1 count = 0\nx = 1 count = 1\nx = 1.1 count = 2", "")},
     {"id": "d", "type": "text", "value": "שגיאת קומפילציה"}],
    "a", "Graded wrong for the student (marked d). clang++ run: x = 1 count = 0 / x = 1 count = 1 / x = 1.1 count = 0 (blank lines between), i.e. option a: one static per instantiation."))

questions.append(Q(
    20, "friend_this_static", OUTQ + cb(r'''
class X {
public:
   X(int num = 0)
   {
      static int counter = 0;
      cout << num + ++counter;
   }
};
void main() {
   X a;
   X b(1);
   X c = b;
   X d(c);
   c = X(3);
}'''),
    txt("`136`", "`025`", "שגיאת קומפילציה", "`123`"), "a",
    "Graded wrong for the student. clang++ run (with `main` made `int main()`) printed `136`: copies (`X c = b`, `X d(c)`) do not print; a=0+1, b=1+2, `X(3)`=3+3."))

EXPL = {
 1: 'כדי ליצור משתנה הפניה (reference) כותבים `int &r = a;`: ההפניה חייבת להיות מאותחלת בהצהרה.\n- א ו-ג: `&a` הוא כתובת (מצביע) ולא ניתן לאתחל בה `int` או הפניה.\n- ד: הפניה חייבת אתחול ואי אפשר להשים אליה אחר כך.\nבהרצה רק אפשרות ב התקמפלה. התשובה היא ב.',
 2: 'יש שתי שגיאות:\n- בפונקציה הסטטית `printTotalObj` נקראת `sayHello()` שהיא פונקציה לא סטטית, ובפונקציה סטטית אין אובייקט (`this`).\n- הקריאה `Sample.printTotalObj()` שגויה, כי מפעילים פונקציה סטטית דרך שם המחלקה עם `::` (או דרך אובייקט), לא עם נקודה על שם המחלקה.\nהתשובה היא 2 (ג). הרצה הראתה שגיאות בשתי השורות האלה.',
 3: 'הטענות הנכונות: `this` הוא מצביע שמכיל את כתובת האובייקט הנוכחי (2), ושימושי רק בתוך פונקציות חברות של המחלקה (3).\nטענה 1 שגויה (`this` אינו קשור לפונקציות וירטואליות), וטענה 4 שגויה (מחוץ למחלקה אין `this`; בהרצה הדבר לא התקמפל).\nהתשובה היא ב.',
 4: 'איטרטור תומך בקריאת הערך (`*it`), בכתיבה (`*it = v`), בהגדלה (`++it`) ובהשוואה (`it != end`, `it == end`). לכן כל ארבע הפעולות נתמכות (תשובה ד).',
 5: 'במתודה const אפשר לקרוא כל `data member` (גם קבוע וגם לא קבוע), אבל אי אפשר לשנות אף אחד מהם (חוץ מ-`mutable`). הרצה הראתה ששתי ההשמות בתוך מתודה const (לחבר קבוע ולחבר לא קבוע) נכשלות בקומפילציה.\nמבין הטענות רק טענה 2 נכונה: 1 שגויה (אפשר לגשת גם ללא קבועים), 3 שגויה (אי אפשר לשנות), 4 שגויה (אפשר לגשת).\nהשאלה שואלת כמה טענות נכונות: אחת (תשובה א).',
 6: 'בנאי ברירת מחדל הוא בנאי שאפשר לקרוא לו בלי ארגומנטים. גם `sample(){}` וגם `sample(){ x=0; y=0; }` הם כאלה. `sample(int a, int b)` דורש שני ארגומנטים ולכן אינו בנאי ברירת מחדל.\nהתשובה היא ד (גם א וגם ב).',
 7: 'המילה `friend` מופיעה רק בהצהרה בתוך המחלקה. בהגדרה של `fun` מחוץ למחלקה אסור לכתוב `friend`, וזו שגיאת קומפילציה (בהרצה אכן נכשלה).\nהתשובה היא ב. לא מגיעים לשלב הריצה ולכן `10` אינו נכון.',
 8: 'בנאי העתקה חייב לקבל את הפרמטר בהפניה (`const A&`). אם יקבל by value, ההעברה של הארגומנט עצמה תקרא לבנאי ההעתקה שוב ושוב, ללא סוף.\nשאר הפונקציות (אופרטור השוואה, הורס, בנאי עם פרמטרים) יכולות לעבוד גם בלי הפניה. התשובה היא ב.',
 9: 'האופרטור `operator++()` ללא פרמטר מעמיס רק את ההגדלה הקדמית (`++S`). הביטוי `S++` הוא הגדלה אחורית ודורש `operator++(int)`, ולכן יש שגיאת קומפילציה בשתי השורות.\nהתשובה היא ג (שגיאת תחביר). בהרצה אכן נכשלו שתי השורות.',
 11: 'שתי הטענות נכונות. אפשר להכריז על מצביע (או הפניה) מטיפוס מחלקה אבסטרקטית, אבל לא ליצור ממנה אובייקט (הרצה: שגיאת קומפילציה). מחלקה אבסטרקטית יכולה להכיל גם משתנים וגם פונקציות רגילות לצד הפונקציה הוירטואלית הטהורה.\nהתשובה היא ג.',
 12: 'כדי להכריח מחלקה נגזרת ממשית לממש פונקציה, מגדירים אותה בבסיס כוירטואלית טהורה (`= 0`). אם הנגזרת לא תממש, היא עצמה נשארת אבסטרקטית ואי אפשר ליצור ממנה אובייקט (נבדק בהרצה: ההצהרה על אובייקט מהנגזרת שלא מימשה נכשלה).\nב שגויה (אפשר להכריח). ג שגויה (הירושה לא מחייבת מימוש). ד היא מה שהנגזרת עושה, לא האמצעי שמכריח.\nהתשובה היא א.',
 13: 'התבנית מקבלת סוג `T` וערך שלם `b` כפרמטרים. עם `Sample<int, 20>` הערך `a` הוא 10 ו-`b` הוא 20. הפונקציה `print` היא `const` וקוראת רק, ולכן תקינה.\nהפלט `10 20` (תשובה א). הרצה אישרה זאת.',
 14: '`Derived` יורשת מ-`Base` בלי מילת הגישה, ולכן בירושה של `class` זו ירושה `private`. ההמרה מ-`Derived*` ל-`Base*` בהשמה `B=new Derived` אסורה מחוץ למחלקה.\nזו שגיאת קומפילציה (תשובה ד). בהרצה הקומפילציה אכן נכשלה. תשובה ג (שאולי מסמנים כי אין הורס וירטואלי) תהיה נכונה רק אם הירושה הייתה `public`.',
 15: '`aPtr` הוא מצביע ל-`ClassA`, ולמחלקה `ClassA` אין פונקציה בשם `jump` (היא קיימת רק ב-`ClassB`). הקומפיילר בודק לפי הטיפוס הסטטי של המצביע, ולכן הקריאה `aPtr->jump(3)` היא שגיאת קומפילציה.\nהתשובה היא ג. גם אם `jump` הייתה וירטואלית רק ב-`ClassB` זה לא עוזר, כי היא צריכה להיות מוצהרת בבסיס (אפשרות ד שגויה).',
 16: 'יש רק `operator++()` קדמי. השורה `A b=++a;` תקינה. השורה `A c(a++);` שגויה (אין `operator++(int)`). השורה `cout << a;` שגויה (אין `operator<<` למחלקה). `return 1;` תקין.\nשתי שגיאות (תשובה ג). הרצה הראתה שגיאות בשתי השורות האלה בדיוק.',
 18: '`vector<int> v(5, 3)` יוצר חמישה איברים שערכם 3, והלולאה מדפיסה אותם ברצף: `33333`.\nהתשובה היא ב. `555` מבלבל בין הכמות לערך, ו-`53` מניח שהמספרים הם הערך והגודל.\nשים לב: ב-clang `void main` נדחה, לכן הבדיקה בוצעה עם `int main`.',
 19: 'המשתנה `static int count` הוא אחד לכל מופע של התבנית. `fun<int>` נקראת פעמיים, ולכן הספירה שלה 0 ואז 1. `fun<double>` היא מופע נפרד עם משתנה סטטי נפרד, ולכן הספירה שלו מתחילה מ-0.\nהפלט: `x = 1 count = 0`, `x = 1 count = 1`, `x = 1.1 count = 0` (תשובה א). תשובה ג מניחה משתנה סטטי משותף לכל המופעים.',
 20: 'המשתנה הסטטי `counter` משותף לכל הקריאות לבנאי. `X a;` מדפיס `0+1=1`, `X b(1);` מדפיס `1+2=3`. `X c = b;` ו-`X d(c);` משתמשים בבנאי ההעתקה המובנה שלא מדפיס כלום. `c = X(3);` יוצר זמני: `3+3=6`.\nהפלט `136` (תשובה א). תשובה ב מניחה שגם ההעתקות מדפיסות.',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    if q["num"] in EXPL:
        q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "21S-B",
    "examLabel": "2021 סמסטר קיץ מועד ב",
    "year": 2021,
    "examDate": "07.11.2021",
    "sourceFile": "2021/סמ׳ ג מועד ב + פתרון.pdf (graded student scan, page 1 not used)",
    "keyFile": "graded-student marks for Q3,4,6,8,9,15,16; the rest derived by compiling/running with clang++ (tools/verify/21S-B)",
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
