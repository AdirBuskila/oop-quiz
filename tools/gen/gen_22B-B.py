# -*- coding: utf-8 -*-
"""Generator for tools/raw/22B-B.json -- oop (61307), 2022 semester B, moed B (19.07.2022).
Run: PYTHONUTF8=1 py tools/gen/gen_22B-B.py

Source: 28-page scan of a student's graded copy (every other page blank), 15 MCQ x 7 pts, grade 78 (= 105 - 4*7 + 1 bonus).
Page 1 (ID, barcodes, answer sheet) is NOT shipped. The grader's red marks on the answer sheet correct four answers
(Q5 -> d, Q7 -> a, Q8 -> b, Q12 -> c); every other question was graded correct, so the student's answer is the key.
Every code question was compiled/run with clang++ (tools/verify/22B-B/, run_all.py) and all 15 keys agree with the run."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "22B-B.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, corrected=False, conf="high", **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "contextId": "notes",
         "answerSource": "corrected-key" if corrected else "solution-pdf", "official": False, "confidence": conf,
         "explanation": "", "note": note, "correctId": correct}
    q.update(kw)
    return q


OUTQ = "מה מדפיסה התכנית הבאה?\n"
ERRM = "בכמה שורות בפונקציה main בקטע הקוד הבא יש שגיאות?\n"
questions = []

questions.append(Q(
    1, "const_references", ERRM + cb(r'''
class A {
public:
    A(int i = 0) { nA = i; }
    const A& f() const
    {
        return *this;
    }
    void g() {}
    int nA;
};

int main()
{
    const A a(2);
    a.f().g();
    return 0;
}'''),
    txt("0", "1", "2"), "b", "Graded correct (student b). clang++: one error (`g()` is not const, but `a.f()` returns `const A&`)."))

questions.append(Q(
    2, "inheritance_access", OUTQ + cb(r'''
class B {
public:
        void print(int n) const;
};

void B::print(int n) const {
        cout << n << "\n";
}

class D : public B {
public:
        void print(int n) const;
};

void D::print(int n) const {
        if (n <= 1) B::print(n);
        else if (n % 2 == 0) print(n / 2);
        else print(3 * n + 1);
}

int main() {
        D d;
        d.print(3);
        return 0;
}'''),
    txt("התכנית לא עוברת קומפילציה.", "`1`", "`3`"), "b",
    "Graded correct (student b). clang++ run printed `1` (the Collatz chain 3,10,5,16,8,4,2,1 ends in `B::print(1)`; `print` is non-virtual and the recursive calls resolve to `D::print`)."))

questions.append(Q(
    3, "copy_control", "הארגומנטים של בנאי העתקה",
    txt("חייבים להיות מועברים `by reference`", "חייבים להיות מועברים `by value`", "יכולים להיות מועברים `by reference` או `by value`"), "a",
    "Graded correct (student a). clang++ probe: a copy constructor taking its parameter by value is rejected (`A(A a)`).", conf="high"))

questions.append(Q(
    4, "templates", OUTQ + cb(r'''
template <class T, int max> int arrMin(T arr[], int n)
{
    int m = max;
    for (int i = 0; i < n; i++)
        if (arr[i] < m)
            m = arr[i];
    return m;
}

int main()
{
    int arr1[] = { 10, 20, 15, 12 };
    int n1 = sizeof(arr1) / sizeof(arr1[0]);

    char arr2[] = { 1, 2, 3 };
    int n2 = sizeof(arr2) / sizeof(arr2[0]);

    // Second template parameter to arrMin must be a
    // constant
    cout << arrMin<int, 10000>(arr1, n1) << endl;
    cout << arrMin<char, 256>(arr2, n2);
    return 0;
}'''),
    [{"id": "a", "type": "text", "value": "`10`"}, {"id": "b", "type": "text", "value": "`1`"},
     {"id": "c", "type": "text", "value": cb("10\n1", "")}, {"id": "d", "type": "text", "value": "התכנית לא עוברת קומפילציה."}],
    "c", "Graded correct (student c). clang++ run printed `10` then `1`."))

questions.append(Q(
    5, "construction_order", OUTQ + cb(r'''
class B {
public:
        B(int i) { nB = i; }
        int nB;
};
class A : public B {
public:
        A(int i = 1, int j = 2) { nA = 1; nB = j; }
        A(const A& a) {
                this->nA = a.nA + 1; this->nB = a.nB + 2;
        }
        int nA;
};

int main() {
        A a1(1, 2);
        A a2 = a1;
        cout << a2.nA << a2.nB;
        return 0;
}'''),
    txt("`14`", "`24`", "`23`", "התכנית לא עוברת קומפילציה."), "d",
    "Student marked b; the grader's red mark corrects it to d. clang++: compile errors in both `A` constructors (`B` has no default constructor and neither initializer list calls `B(int)`).",
    corrected=True))

questions.append(Q(
    6, "inheritance_access", "בכמה שורות מבין 4 השורות האחרונות בפונקציה `f` בקטע הקוד הבא יש שגיאות:\n" + cb(r'''
class A {
public:
        A(int i = 0) { nap = i; }
        int nA;
};

class B : protected A {
public:
        B(int i = 0) { nB = i; }
        int nB;
};

class C : public B {
public:
        C(int i = 0) { nC = i; }
        int nC;
};

void f() {
        B b1;
        C c1;
        b1.nA = 8;
        b1.nB = 9;
        c1.nA = 10;
        c1.nB = 11;
}

int main() {
        f();
        return 0;
}'''),
    txt("0", "1", "2", "יותר מ- 2"), "c",
    "Graded correct (student c). The printed constructor of A reads `nap = i` (a typo in the paper, transcribed as printed); the keyed count is for the four lines of `f` and the harness uses `nA`. clang++: errors on `b1.nA = 8;` and `c1.nA = 10;` (protected after `protected A`) -> 2.",
    conf="med"))

questions.append(Q(
    7, "abstract_multiple", ERRM + cb(r'''
class A {
public:
        A(int i = 0) { nA = i; }
        int nA;
        void f() { cout << "abc"; }
};

class B : virtual public A {
public:
        B(int i = 0) { nB = i; }
        int nB;
};

class C : virtual public A {
public:
        C(int i = 0) { nC = i; }
        int nC;
};

class D : virtual public A {
public:
        D(int i = 0) { nD = i; }
        int nD;
};

class E : public B, C, D {
public:
        E(int i = 0) { nE = i; }
        int nE;
};

int main() {
        E e1;
        e1.f();
        cout << e1.nA;
        return 0;
}'''),
    txt("0", "1", "2", "3"), "a",
    "Student marked b; the grader's red mark corrects it to a. clang++: compiles and prints `abc0` (single shared virtual `A`; the public path through `B` makes `f` and `nA` accessible).",
    corrected=True))

questions.append(Q(
    8, "virtual_polymorphism", OUTQ + cb(r'''
class My {
public:
    ~My() {
        std::cout << "Hello from ~My()" << std::endl;
    }
};
class Derived : public My {
public:
    ~Derived() {
        std::cout << "Hello from ~Derived()" << std::endl;
    }
};
int main() {
    My* obj = new Derived();
    delete obj;
    return 0;
}'''),
    [{"id": "a", "type": "text", "value": "`Hello from ~Derived()`"}, {"id": "b", "type": "text", "value": "`Hello from ~My()`"},
     {"id": "c", "type": "text", "value": cb("Hello from ~Derived()\nHello from ~My()", "")}, {"id": "d", "type": "text", "value": "התכנית לא עוברת קומפילציה."}],
    "b", "Student marked c; the grader's red mark corrects it to b. clang++ run printed only `Hello from ~My()` (non-virtual destructor, deleting through the base pointer; formally undefined behaviour).",
    corrected=True))

questions.append(Q(
    9, "stl_exceptions", OUTQ + cb(r'''
#include <vector>

int main()
{
    vector<int> v{ 1, 2, 3, 4, 5 };
    vector<int>::iterator it;

    it = v.begin();
    it++;
    v.erase(it);

    for (vector<int>::iterator it = v.begin(); it != v.end(); ++it)
        cout << ' ' << *it;
    return 0;
}'''),
    txt("`2 3 4 5`", "`1 2 4 5`", "`1 3 4 5`", "התכנית לא עוברת קומפילציה."), "c",
    "Graded correct (student c). clang++ run printed ` 1 3 4 5` (each number preceded by a space; the second element is erased). The options are printed without the leading spaces."))

questions.append(Q(
    10, "classes_ctor_dtor", OUTQ + cb(r'''
class A {
public:
        A() { x = 2; y = 5; };
        A(int x=3, int y = 6) { this->x = x; this->y = y; }
        int x = 8;
        int y = 10;
};

int main() {
        A a1;
        cout << a1.x << a1.y << endl;
        return 0;
}'''),
    txt("`25`", "`36`", "`810`", "התכנית לא עוברת קומפילציה"), "d",
    "Graded correct (student d). clang++: compile error, `A a1;` is ambiguous between `A()` and `A(int=3, int=6)`."))

questions.append(Q(
    11, "operator_overloading", OUTQ + cb(r'''
class A {
public:
        int num;
        A(int i = 0) {
                num = i;
        }
};

A& operator++(A& a) {
        a.num++;
        return a;
}

A operator++(A& a, int) {
        A temp = a;
        a.num += 2;
        return temp;
}

A operator+(const A& a1, const A& a2) {
        A temp;
        temp.num = a1.num + a2.num;
        return temp;
}

int main()
{
        A a1(1), a2(2), a3, a4;
        a3 = a1++ + ++a2;
        a4 = operator++(a1, 0) + operator++(a2);
        cout << a3.num << a4.num;
        return 0;
}'''),
    txt("`47`", "`46`", "`36`", "`56`"), "a",
    "Graded correct (student a). clang++ run printed `47` (a3 = 1 + 3 = 4; then a1: 3 -> returns 3, a2 becomes 4, so a4 = 3 + 4 = 7)."))

questions.append(Q(
    12, "copy_control", "כיצד ניתן לגרום לכך שכל אוביקט של מחלקה `A` יהיה בלתי ניתן להעתקה?",
    txt("להגדיר את בנאי ההעתקה של המחלקה `A` כ- `private`", "להגדיר את אופרטור ההשמה (האופרטור `=`) במחלקה `A` כ- `private`",
        "להגדיר את בנאי ההעתקה של המחלקה `A` כ- `private` ולהגדיר את אופרטור ההשמה במחלקה `A` כ- `private`", "אף תשובה אינה נכונה."),
    "c", "Student marked d; the grader's red mark corrects it to c. clang++ probes: with only the copy constructor private, assignment still works; with only `operator=` private, copy construction still works; both private blocks both.",
    corrected=True))

questions.append(Q(
    13, "composition", "כמה משפטים מבין שלושת המשפטים הבאים נכונים:\n"
    "1. יחס `IS-A` בין מחלקות מתקיים כאשר ישנה הורשה בין המחלקות.\n2. יחס `IS-A` בין מחלקות מתקיים כאשר ישנה הכלה בין המחלקות.\n"
    "3. שימוש ברב צורתיות (`polymorphism`) מתבצע כאשר מתקיים יחס `IS-A` בין מחלקות שקשורות לשימוש זה.",
    txt("0", "1", "2", "3"), "c", "Graded correct (student c). Concept question: statements 1 and 3 are true, 2 is false (containment is HAS-A).", conf="med"))

questions.append(Q(
    14, "friend_this_static", "כמה משפטים מבין שלושת המשפטים הבאים נכונים (עבור שפת C++):\n"
    "1. במילת המפתח `friend` ניתן להשתמש בתוך הגדרת מחלקה כדי לאפשר גישה למחלקה אחרת.\n"
    "2. במילת המפתח `friend` ניתן להשתמש בחלק ה- `public` של הגדרת המחלקה.\n"
    "3. במילת המפתח `friend` ניתן להשתמש בחלק ה- `private` של הגדרת המחלקה.",
    txt("0", "1", "2", "3"), "d",
    "Graded correct (student d). clang++ probe: `friend` declarations (class and function) inside the public section and inside the private section both compile and work.", conf="med"))

questions.append(Q(
    15, "operator_conversions", ERRM + cb(r'''
class A {
public:
    A(int i = 0) { nA = i; }
    int nA;
};

class B {
public:
    B(int i = 0) { nB = i; }
    operator A() { ... // קטע קוד תקין כלשהו }
    int nB;
};

int main() {
    A a1;
    B b1;
    a1 = b1;
    b1 = a1;
    return 0;
}'''),
    txt("0", "1", "2", "3"), "b",
    "Graded correct (student b). clang++ (with a valid body for `operator A()`): `a1 = b1;` is fine through the conversion operator; `b1 = a1;` fails (no conversion from `A` to `B` or to `int`) -> 1."))

EXPL = {
 1: 'האובייקט `a` הוא `const`, ולכן אפשר לקרוא עליו רק למתודות const. `f()` היא const ומחזירה `const A&`. אבל `g()` אינה const, והקריאה `a.f().g()` מפעילה אותה על הפניה ל-const, וזו שגיאה אחת.\nהתשובה היא ב. הרצה אישרה שגיאה בשורה זו בלבד.',
 2: 'הקריאה `d.print(3)` מפעילה את `D::print` (הפונקציה אינה וירטואלית, אבל הקריאה היא על אובייקט `D`). 3 הוא אי-זוגי, ולכן נקרא `print(10)`, אחר כך 5, 16, 8, 4, 2, 1. כשמגיעים ל-1 נקרא `B::print(1)` שמדפיס את `1`.\nרק הערך האחרון מודפס: `1` (תשובה ב). הרצה אישרה. תשובה ג מניחה שמדפיסים את הערך הראשון.',
 3: 'בנאי העתקה חייב לקבל את הארגומנט בהפניה. אם הוא היה מקבל by value, כדי להעביר את הארגומנט היה צריך לקרוא שוב לבנאי ההעתקה, וכך הלאה בלי סוף. לכן הקומפיילר אוסר זאת (בהרצה: `A(A a)` נדחה).\nהתשובה היא א.',
 4: 'הפונקציה מחפשת מינימום ומתחילה מערך ההתחלה `max`. במערך `{10,20,15,12}` עם `max=10000` המינימום הוא 10. במערך ה-`char` `{1,2,3}` עם `max=256` המינימום הוא 1 (ההשוואה נעשית כ-`int`).\nהפלט: `10` ובשורה הבאה `1` (תשובה ג). הרצה אישרה.',
 5: 'בנאי של `A` לא מזכיר את בנאי הבסיס בצורה מפורשת, ולכן הקומפיילר מנסה לקרוא לבנאי ברירת המחדל של `B`. אבל ל-`B` יש רק `B(int i)` ואין בנאי ברירת מחדל, ולכן שני הבנאים של `A` (הרגיל ובנאי ההעתקה) נכשלים בקומפילציה.\nהתשובה היא ד. הרצה אישרה את שגיאת הקומפילציה.',
 6: 'המחלקה `B` יורשת את `A` בירושה `protected`, ולכן החבר `nA` נגיש רק בתוך `B` ובנגזרות שלה, לא מבחוץ (מתוך `f`). שורות `b1.nA = 8;` ו-`c1.nA = 10;` שגויות. השדות `nB` הם ציבוריים ולכן תקינים.\nשתי שגיאות (תשובה ג). שים לב: בקטע הנסרק בנאי `A` כתוב עם `nap` (שגיאת הקלדה), אבל ההתייחסות היא לארבע השורות האחרונות בלבד.',
 7: 'שלושת המחלקות `B`, `C`, `D` יורשות את `A` בירושה וירטואלית, ולכן ב-`E` יש עותק אחד בלבד של `A` והגישה ל-`nA` ול-`f` חד-משמעית. הנתיב דרך `B` ציבורי, ולכן הגישה מותרת גם אם `C` ו-`D` נורשות באופן פרטי.\nאין שגיאות (תשובה א). הרצה הדפיסה `abc0`.',
 8: 'ההורס של `My` אינו וירטואלי, ולכן `delete obj` דרך מצביע מסוג `My*` קורא רק להורס של `My`. ההורס של `Derived` לא נקרא (בפועל זו התנהגות לא מוגדרת, אך כך מתנהגת ההרצה).\nהפלט הוא `Hello from ~My()` (תשובה ב). לא היו מודפסות שתי השורות אילו ההורס היה וירטואלי.',
 9: 'הווקטור הוא `{1,2,3,4,5}`. האיטרטור מצביע על האיבר השני (`2`) ואחר כך `erase` מוחק אותו, ונשאר `{1,3,4,5}`. ההדפסה מוסיפה רווח לפני כל מספר.\nהפלט `1 3 4 5` (תשובה ג).',
 10: 'ב-`A` יש שני בנאים שאפשר לקרוא להם בלי ארגומנטים: `A()` ו-`A(int x=3, int y=6)` (כל הפרמטרים עם ברירת מחדל). ההגדרה `A a1;` דו-משמעית, ולכן יש שגיאת קומפילציה.\nהתשובה היא ד. הרצה אישרה.',
 11: 'מתחילים עם `a1=1`, `a2=2`. בשורה הראשונה: `a1++` מחזיר עותק ישן (1) ומגדיל את `a1` ב-2 (ל-3). `++a2` מגדיל ל-3. לכן `a3 = 1 + 3 = 4`.\nבשורה השנייה: `operator++(a1, 0)` מחזיר 3 ומגדיל את `a1` ל-5; `operator++(a2)` מגדיל ל-4. לכן `a4 = 3 + 4 = 7`.\nהפלט הוא `47` (תשובה א). הרצה אישרה.',
 12: 'כדי שאי אפשר יהיה להעתיק אובייקט צריך לחסום שני דברים: יצירה בהעתקה (בנאי העתקה) והשמה (`operator=`). אם רק אחד מהם פרטי, האחר עדיין מאפשר להעתיק. בהרצה: עם בנאי העתקה פרטי בלבד ההשמה עדיין עבדה, ועם השמה פרטית בלבד בנאי ההעתקה עדיין עבד.\nהתשובה היא ג (שניהם פרטיים).',
 13: 'יחס `IS-A` מתקיים בהורשה (טענה 1 נכונה). בהכלה מתקיים יחס `HAS-A`, לא `IS-A` (טענה 2 שגויה). פולימורפיזם מתבצע על מחלקות הקשורות ביחס `IS-A` בהורשה (טענה 3 נכונה).\nשתי טענות נכונות (תשובה ג).',
 14: 'המילה `friend` מופיעה בתוך הגדרת המחלקה כדי להעניק גישה לפונקציה או למחלקה אחרת. אין חשיבות לאזור הגישה (`public` או `private`) שבו היא כתובה: ההצהרה נכונה בשניהם. בהרצה, הצהרות `friend` בשני האזורים התקמפלו ופעלו.\nכל שלוש הטענות נכונות (תשובה ד).',
 15: 'השורה `a1 = b1;` תקינה: אופרטור ההמרה `operator A()` ממיר `B` ל-`A`. השורה `b1 = a1;` שגויה: אין המרה מ-`A` ל-`B` (הבנאי של `B` מקבל `int`, ול-`A` אין אופרטור המרה ל-`int`).\nשגיאה אחת (תשובה ב). הרצה אישרה (עם גוף תקין ל-`operator A()`).',
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "22B-B",
    "examLabel": "2022 סמסטר ב מועד ב",
    "year": 2022,
    "examDate": "19.07.2022",
    "sourceFile": "2022/סמ׳ ב מועד ב + פתרון.pdf (graded student scan, page 1 not used)",
    "keyFile": "student-solution-1 (graded copy: the grader's red corrections on the answer sheet; all keys re-checked with clang++, tools/verify/22B-B)",
    "contexts": {
        "notes": {
            "kind": "text",
            "title": "הערות משותפות לגבי התוכן של כל השאלות",
            "text": "בכל שאלה שבה נדרש לרשום בכמה שורות יש שגיאות בקטע הקוד, יש להסתכל על כל הקוד גם זה שלפני הפונקציה `main`.\n"
                    "בכל השאלות שבהן נדרש לרשום כמה שגיאות יש בקטע הקוד או מה מדפיסה התכנית הבאה, ניתן להניח שאין שגיאה מהסוג של רווח מיותר, או חוסר ברווח, וכן אין שגיאה מהסוג של נקודה פסיק מיותרת או חוסר בנקודה פסיק, וכן אין שגיאה שנובעת מכך שחסר משפט `#include` בתחילת קטע הקוד/התכנית.\n"
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
