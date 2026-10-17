# -*- coding: utf-8 -*-
"""Generator for tools/raw/23B-A.json -- oop (61307), 2023 semester B, moed A (22/06/2023).
Run: PYTHONUTF8=1 py tools/gen/gen_23B-A.py

Source: 30-page scan (15 MCQ x 7 pts, 4 options; questions on the odd pages 5-29, even pages are blank backs). The scan is a
graded copy: the answer grid on page 1 carries the examinee's X marks plus the grader's red ticks (correct) / crosses
(wrong, with the correct option circled in red). Keys: ticked answers -> the marked option (answerSource solution-pdf, the
graded copy); crossed answers -> the option circled by the grader (answerSource corrected-key). Page 1 itself is never
shipped (ID, handwriting). Every code question was also compiled/run with clang++ (tools/verify/23B-A/check.py) and all
results agree with the graded key. Printed typos kept: Q2 shows `int n1,` / `int n2,` where `;` is meant (the exam's own
common note says to ignore missing/extra semicolons; the harness reads them as `;`); Q9 has a scribbled-over string in
printValue (read as "Value: ", irrelevant: that program does not compile)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "23B-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


# grader marks on the page-1 grid: ticked (answer = student's X) / crossed (answer = red circle)
KEYS = {1: "b", 2: "c", 3: "c", 4: "a", 5: "a", 6: "c", 7: "b", 8: "d", 9: "d", 10: "a", 11: "b", 12: "c",
        13: "c", 14: "d", 15: "d"}
TICKED = {1, 2, 3, 4, 7, 8, 12}
HOLD = {}
MED = {5, 10, 11, 12}
EXPL = {
    1: "ל-`B` אין `f` משלה, ולכן `b.f()` וגם `a.B::f()` מגיעות ל-`C::f` שבבסיס, ומדפיסות `C`. רק `a.f()` מוצאת את `A::f` (ה-`f` של `A` מסתירה את הבסיס) ומדפיסה `A`. `a.C::f()` ו-`b.C::f()` מציינות במפורש את `C`. הפלט `ACCCC` (תשובה ב), וכך גם הרצת clang++.",
    2: "`C` יורשת מ-`D` ירושה `private`, ולכן `n1` פרטי ב-`C` ואינו נגיש ביורשות שלה. ב-`B::f2` השורה `cout << n1` שגויה, ו-`cout << n2` תקינה (`n2` ציבורי). ב-`A` (ירושה פרטית מ-`B`) הגישה ל-`n2` תקינה מבפנים, אבל `b1.n1` שגויה כי `n1` אינו נגיש. שתי שורות שגויות (תשובה ג), וכך גם clang++. בקוד המודפס מופיע פסיק במקום נקודה-פסיק אחרי `n1` ו-`n2`, והשאלה מורה להתעלם מכך.",
    3: "הפונקציה מחזירה הפניה ל-`y` כש-`x == 1`, ואחרת הפניה ל-`z`. בקריאה הראשונה `a = 1`, ולכן `f(a,b,c)++` מגדילה את `b` ל-3. אחרי `a++` מתקבל `a = 2`, ולכן הקריאה השנייה מחזירה הפניה ל-`c`, ו-`++` מגדיל אותו ל-4. `d` הוא כינוי ל-`c`, ו-`d++` מעלה אותו ל-5. ההדפסה `b c d` נותנת `3`, `5`, `5`, כלומר `355` (תשובה ג), וכך גם הרצת clang++.",
    4: "הגלובליים `a3` ו-`a7` נבנים לפני `main`. ב-`main` נבנים הסטטי `a4` והאוטומטי `a5`, אחר כך נקראת `f` שבונה את הסטטי `a1` ואת האוטומטי `a2`. בסיום `f` נהרס `a2`: `2`. אחר כך נבנה `a6`. בסיום `main` נהרסים האוטומטיים בסדר הפוך: `a6` ואז `a5`: `65`. לבסוף נהרסים הסטטיים והגלובליים בסדר הפוך לבנייתם: `a1`, `a4`, `a7`, `a3`: `1473`. הפלט `2651473` (תשובה א), וכך גם הרצת clang++.",
    5: "השדות `marks` ו-`age` פרטיים, כלומר המידע מוסתר (`Encapsulation`), והמחלקה `topper` יורשת מ-`student` (`Inheritance`). אין פונקציות וירטואליות ולכן אין רב-צורתיות. לכן התשובה היא א. זו שאלת מושגים (בלי הרצה), והתשובה נקבעה לפי סימון הבודק בטופס.",
    6: "`push_back` שומר עותקים: `A[1]` הוא עותק של `v2` ברגע ההוספה, כלומר `-8 5 51 3`, והוספת 10 אחר כך אל `v2` לא משפיעה עליו. הלולאה מקדמת את האיטרטור בשניים: מדפיסה `-8` (מקום 0) ו-`51` (מקום 2), ואז מגיעה בדיוק ל-`end()` ונעצרת. הפלט `-8 51` (תשובה ג), וכך גם הרצת clang++.",
    7: "ב-`Array<int>(3)` האיברים הם `0, 2, 4`, וב-`Array<double>(2)` האיברים הם `0, 0.5` (כי `i / 2.0`). הפונקציה `infiltrate` היא תבנית חברה של המחלקה ולכן מותר לה לגשת לשדות הפרטיים. כל איבר מודפס ואחריו `; `, ולכן השורה הראשונה `0; 2; 4;` והשנייה `0; 0.5;`. התוכנית מתקמפלת ורצה בלי שגיאה. התשובה המתאימה היא ב (בהרצה מופיע `;` גם בסוף השורה השנייה, ובתשובה ב הוא לא מודפס, אבל זו האפשרות היחידה שמתאימה לערכים).",
    8: "`new D::B` ו-`new D::C` יוצרים אובייקטים מטיפוס `B` ו-`C` (השם `D::B` הוא שם המחלקה `B` שבבסיס, דרך שם המחלקה היורשת). הקוד מתקמפל: לאחר ירושה וירטואלית מ-`A`, הקריאה `pa->f1()` נבחרת לפי הטיפוס האמיתי. הפלט הוא: `A` עבור `new A`, `B` עבור `new B`, `C` עבור `new C`, `B` עבור `new D::B`, `C` עבור `new D::C`, ו-`D` עבור `new D`. כלומר `ABCBCD` (תשובה ד), וכך גם הרצת clang++.",
    9: "השורה `TestClass obj();` אינה יוצרת אובייקט: היא מצהירה על **פונקציה** בשם `obj` שמחזירה `TestClass` (the most vexing parse). לכן `obj.printValue()` היא שגיאת קומפילציה (clang++: base of member reference is a function). התוכנית אינה מתקמפלת (תשובה ד), ואף אחת משלוש האפשרויות האחרות אינה פלט אפשרי. בסריקה יש קשקוש בצבע כחול על מחרוזת בתוך `printValue`, והוא אינו משפיע על התשובה.",
    10: "פונקציה וירטואלית היא ממשק שנקרא דרך מצביע או הפניה לבסיס, ולכן על פי רוב מגדירים אותה `public`. אפשר להגדיר גם `private` או `protected` (בתבנית NVI למשל), ולכן השאלה מנוסחת 'על פי רוב'. `default` אינו מפרט גישה ב-C++. התשובה לפי סימון הבודק היא א. זו שאלת מושגים בלי הרצה.",
    11: "בעיית המעוין היא מצב שבו מחלקה יורשת פעמיים מאותו בסיס דרך שתי מחלקות ביניים, ומקבלת שני עותקים שלו. הפתרון הוא ירושה **וירטואלית** (`virtual`) של הבסיס בשתי מחלקות הביניים, כך שיש רק עותק אחד (התשובה ב). זו שאלת מושגים בלי הרצה.",
    12: "קריאה לבנאי יוצרת אובייקט של המחלקה (תשובה ג), ולא רק מצביע או הפניה אליו. זו שאלת מושגים בלי הרצה.",
    13: "טענה א נכונה: `cout << a1` הוא קיצור לקריאה `operator<<(cout, a1)` של האופרטור הגלובלי. טענה ב שגויה: ל-`cin >> a1` מתאימה הקריאה `operator>>(cin, a1)`, כלומר הזרם הוא הארגומנט הראשון, ואילו בשורה המודפסת הסדר הפוך (נבדק: היא אינה מתקמפלת). טענה ג נכונה: `cout << a1 << a2` שקול לקריאה מקוננת, כי האופרטור מחזיר את הזרם (נבדק: אותו פלט). שתי טענות נכונות (תשובה ג).",
    14: "ההורסים נקראים בסדר הפוך לבנאים: קודם ההורס של המחלקה הנגזרת ביותר, ואחר כך הורסי הבסיסים בסדר עולה בשרשרת. לכן `D dtor; C dtor; B dtor; ` (תשובה ד), וכך גם הרצת clang++.",
    15: "הפונקציה `operator+(M t)` מוגדרת עם פרמטר אחד, כלומר זהו `+` אונרי ולא בינארי. בנוסף היא פונקציה חברה (`friend`) ולא חבר, ולכן בתוכה השמות `a` ו-`b` לא מוגדרים (שגיאות בשתי שורות), והשורה `d3 = d1 + d3` נכשלת כי אין `operator+` בינארי. סך הכול שלוש שורות שגויות, כלומר יותר מ-2 (תשובה ד), וכך גם clang++.",
}


def Q(num, topic, question, options, note, **kw):
    ticked = num in TICKED
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "correctId": KEYS[num], "answerSource": "solution-pdf" if ticked else "corrected-key", "official": False,
         "confidence": "high", "explanation": "", "note": note}
    q.update(kw)
    return q


GRADE_T = "Key = the examinee's marked option, ticked by the grader (graded copy)."
GRADE_C = "Key = the option circled in red by the grader after a wrong examinee answer (graded copy)."
PRINTS = "מה מדפיסה התכנית הבאה?\n"
ERRQ = "בכמה שורות בקטע הקוד הבא יש שגיאות?\n"
questions = []


def note(n, extra=""):
    return (GRADE_T if n in TICKED else GRADE_C) + extra


# 1
questions.append(Q(1, "inheritance_access", PRINTS + cb(r'''
class C {
public:
    void f() { cout << "C"; }
};

class B : public C {};

class A : public B {
public:
    void f() { cout << "A"; }
};

int main() {
    A a; B b;
    a.f(); a.B::f(); a.C::f(); b.f();
    b.C::f();
    return 0;
}'''), txt("AACCC", "ACCCC", "CCCCC", "התכנית לא עוברת קומפילציה."), note(1, " clang++ run: ACCCC. Agrees.")))

# 2
questions.append(Q(2, "inheritance_access", ERRQ + cb(r'''
class D {
public:
    int n1;
};

class C : private D {
public:
    int n2;
    int f1() { return n1; }
};

class B : public C {
public:
    int n3;
    void f2() {
        cout << n1;
        cout << n2;
    }
};

class A : private B {
public:
    int n4;
    int f2() {
        B b1;
        cout << n2;
        cout << b1.n1;
    }
};'''), txt("0", "1", "2", "יותר מ- 2"), note(2, " Printed `int n1,` / `int n2,` read as `;`. clang++: 2 error lines. Agrees.")))

# 3
questions.append(Q(3, "cpp_basics_refs", PRINTS + cb(r'''
int& f(int& x, int& y, int& z)
{
    if (x == 1) return y;
    return z;
}

int main()
{
    int a = 1, b = 2, c = 3;
    f(a, b, c)++;
    a++;
    f(a, b, c)++
    int& d = f(a, b, c);
    d++;
    cout << b << c << d;
    return 0;
}'''), txt("334", "444", "355", "התכנית לא עוברת קומפילציה."), note(3, " Printed `f(a, b, c)++` without `;` (the exam's note says to ignore it); run with `;`: 355. Agrees.")))

# 4
questions.append(Q(4, "construction_order", PRINTS + cb(r'''
class A {
public:
    A(int i) { this->i = i; }
    ~A() { cout << i; }
private:
    int i;
};

void f() {
    static A a1(1);
    A a2(2);
}
A a3(3);
A a7(7);

int main()
{
    static A a4(4);
    A a5(5);
    f();
    A a6(6);
    return 0;
}'''), txt("2651473", "2654137", "2561743", "6254137"), note(4, " clang++ run: 2651473. Agrees.")))

# 5
questions.append(Q(5, "inheritance_access", "אילו מאפיינים של תכנות מונחה עצמים (`OOP`) ממומשים בקטע הקוד הבא:\n" + cb(r'''
class student { int marks; };

class topper : public student {
    int age;
    topper(int age) {
        this->age = age;
    }
};'''), txt("הסתרת מידע (`Encapsulation`) והורשה (`Inheritance`).",
            "הורשה (`Inheritance`) ורב צורתיות (`Polymorphism`).",
            "רב צורתיות (`Polymorphism`).",
            "הורשה (`Inheritance`)."), note(5, " Concept question (no run): private members = encapsulation, `: public student` = inheritance, no virtual functions = no polymorphism.")))

# 6
questions.append(Q(6, "stl_exceptions", PRINTS + cb(r'''
#include <vector>
int main()
{
    vector <int> v1;
    v1.push_back(8);
    v1.push_back(9);
    vector <int> v2;
    v2.push_back(-8);
    v2.push_back(5);
    v2.push_back(51);
    v2.push_back(3);
    vector<vector<int> > A;
    A.push_back(v1);
    A.push_back(v2);
    A.push_back(v1);
    v2.push_back(10);
    vector<int>::iterator i;
    for (i = A[1].begin(); i != A[1].end(); i+=2)
        cout << *i << " ";
    return 0;
}'''), txt("-8 51 10", "-8 5 51 3", "-8 51", "-8 5 51 3 19 20"), note(6, " clang++ run: `-8 51 `. Agrees.")))

# 7
questions.append(Q(7, "templates", PRINTS + cb(r'''
const int DefaultSize = 10;
template <class T>
class Array{
public:
    Array(int itsSize = DefaultSize);
    ~Array() { delete[] pType; }
    T& operator[](int offSet) { return pType[offSet]; }
    const T& operator[](int offSet) const {
        return pType[offSet];
    }
    int GetSize() const { return itsSize; }
    template <class NET>
      friend void infiltrate(const Array<NET> &);
private:
    T* pType;
    int  itsSize;
};
template <class WWW>
void infiltrate(const Array<WWW> &theArray) {
    for (int i = 0; i < theArray.itsSize; i++)
        cout <<  theArray.pType[i] << "; ";
    cout << "\n"; }
template <class T>
Array<T>::Array(int size):itsSize(size){
    pType = new T[size];
    for (int i = 0; i < size; i++)
        pType[i] = 0;
}
int main(){
    Array<int> theArray(3);
    Array<double> theArrayD(2);
    for (int i = 0; i < theArray.GetSize(); i++){
        theArray[i] = i * 2;
    }
    for (int i = 0; i < theArrayD.GetSize(); i++) {
        theArrayD[i] = i / 2.0;
    }
    infiltrate(theArray);
    infiltrate(theArrayD);  return 0;
}'''), txt("0; 2; 4;\n0; 0;", "0; 2; 4;\n0; 0.5", "התכנית לא עוברת קומפילציה.", "בהפעלת התכנית מתקבלת שגיאת זמן ריצה."),
    note(7, " clang++ run: `0; 2; 4; ` / `0; 0.5; ` (option b prints no trailing `;` on line 2, as printed). Agrees with b.")))

# 8
questions.append(Q(8, "abstract_multiple", "עבור התכנית הבאה מתקיים:\n" + cb(r'''
class A{
public:
    virtual void f1(void) { cout << "A"; };
};
class B : virtual public A{
public:
    void f1(void) { cout << "B"; };
};
class C : virtual public A{
public:
    void f1(void) { cout << "C"; };
};
class D : public C, public B{
public:
    void f1(void) { cout << "D"; };
};
int main(){
    A* pa;
    pa = new A;
    pa->f1();
    pa = new B;
    pa->f1();
    pa = new C;
    pa->f1();
    pa = new D::B;
    pa->f1();
    pa = new D::C;
    pa->f1();
    pa = new D;
    pa->f1();
    return 0;
}'''), txt("יש שגיאת קומפילציה בשורה אחת.", "יש שגיאת קומפילציה ביותר משורה אחת.",
            "אין שגיאת קומפילציה והתכנית מדפיסה `ABCACD`", "אין שגיאת קומפילציה והתכנית מדפיסה `ABCBCD`"),
    note(8, " clang++ run: ABCBCD. Agrees.")))

# 9
questions.append(Q(9, "classes_ctor_dtor", PRINTS + cb(r'''
class TestClass
{
public:
    TestClass() :x(0) { cout<<x<<" "; }
    TestClass(int a) :x(a) { cout<<x<<" "; }
    void printValue()
    {
        cout << "Value: " << x <<" ";
    }
private:
    int x;
};

int main()
{
    TestClass s1(100);
    TestClass s2;
    TestClass s3 = 100;
    TestClass obj();
    obj.printValue();
    return 0;
}'''), txt("100 0 100", "100", "100 0 100 0 0", "התכנית לא עוברת קומפילציה."),
    note(9, " clang++: compile error (`TestClass obj();` declares a function). Agrees with d. The scan has a scribbled-over string in printValue, read as `Value: `.")))

# 10
questions.append(Q(10, "virtual_polymorphism", "על פי רוב עדיף שפונקציה וירטואלית תהיה:", txt("`public`", "`private`", "`protected`", "`default`"),
    note(10, " Concept question (no run).")))

# 11
questions.append(Q(11, "abstract_multiple", "כיצד ניתן להתגבר על בעית המעוין (`diamond`) של הורשה מרובה:", txt(
    "להשתמש במחלקות נגזרות נפרדות.", "להשתמש במילה השמורה `virtual`.", "בלתי אפשרי.", "להשתמש בשם מחלקה נוסף (`alias`)."),
    note(11, " Concept question (no run).")))

# 12
questions.append(Q(12, "classes_ctor_dtor", "מה קורה כאשר קוראים לבנאי (`constructor`) ?", txt(
    "לא קורה כלום.", "נוצר מצביע לאוביקט של מחלקה.", "נוצר אוביקט של מחלקה.", "נוצר `reference` לאוביקט של מחלקה שכבר קיים."),
    note(12, " Concept question (no run).")))

# 13
questions.append(Q(13, "operator_overloading",
    "נניח ש `a1` ו- `a2` הם שני אובייקטים של מחלקה.\nכמה מהמשפטים הבאים נכונים:\n"
    "א. שתי השורות הבאות שקולות (מבצעות את אותה פעולה):\n" + cb("cout << a1;\noperator<<(cout,a1);") + "\n"
    "ב. שתי השורות הבאות שקולות (מבצעות את אותה פעולה):\n" + cb("cin >> a1;\noperator>>(a1,cin);") + "\n"
    "ג. שתי השורות הבאות שקולות (מבצעות את אותה פעולה):\n" + cb("cout<<a1<<a2;\noperator<<(operator<<(cout, a1), a2);"),
    txt(*"0123"), note(13, " Rule + clang++ check of the three equivalences (tools/verify/23B-A/check.py).")))

# 14
questions.append(Q(14, "construction_order", PRINTS + cb(r'''
class B {
public:
    ~B() { cout << "B dtor; ";}
};

class C:public B{
public:
    ~C() { cout << "C dtor; "; }
};

class D :public C {
public:
    ~D() { cout << "D dtor; "; }
};

int main(){
    D d;
    return 0;
}'''), txt("B dtor;", "D dtor;", "B dtor; C dtor; D dtor;", "D dtor; C dtor; B dtor;"),
    note(14, " clang++ run: `D dtor; C dtor; B dtor; `. Agrees.")))

# 15
questions.append(Q(15, "friend_this_static", ERRQ + cb(r'''
class M
{
    float a;
    int b;
public:
    M() {
        a = 50;
        b = -100;
    }
    M(int p, int q) {
        a = p;
        b = q;
    }
    friend M operator+(M);
    void output()
    {
        cout << "a=" << a << "b=" << b;
    }
};

M operator+(M t) {
    M res;
    res.a = a + t.a;
    res.b = b + t.b;
    return res;
}

int main()
{
    M d1(10, 20);
    M d2, d3;
    d3 = d1 + d3;
    d3.output();
    return 0;
}'''), txt("0", "1", "2", "יותר מ- 2"), note(15)))

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
    "examCode": "23B-A",
    "examLabel": "2023 סמסטר ב מועד א",
    "year": 2023,
    "examDate": "22.06.2023",
    "sourceFile": "2023/סמ׳ א מועד א + פתרון.pdf",
    "keyFile": "same file: the grader's marks on the answer grid of page 1 (graded student copy), cross-checked with clang++ (tools/verify/23B-A/)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
