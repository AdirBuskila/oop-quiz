# -*- coding: utf-8 -*-
"""Generator for tools/raw/23S-A.json -- oop (61307), 2023 summer semester, moed A (13/09/2023).
Run: PYTHONUTF8=1 py tools/gen/gen_23S-A.py

Source: 12-page paper (15 MCQ, 4 options). The file carries NO answer source, so every key was derived by
compiling/running the printed code with clang++ (tools/verify/23S-A/check.py) or by the language rule, and is
stored as answerSource "solved", official:false. `void main` in the exam is MSVC style; the harness rewrites it
to `int main` for clang. Q8's code is printed with a duplicated `class A {` line; kept as printed."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "23S-A.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


KEYS = {1: "a", 2: "b", 3: "a", 4: "a", 5: "c", 6: "d", 7: "b", 8: "b", 9: "b", 10: "d", 11: "d", 12: "b",
        13: "c", 14: "d", 15: "c"}
# Q13 is held: `A(A&)` cannot bind a temporary, so the answer depends on the language standard / compiler
# (clang++ -std=c++17: 0 lines, -std=c++14: 1 line, MSVC accepts binding a temporary to A& as an extension).
HOLD = {13: "standard-dependent: `A a1 = 1;` needs a copy from a temporary that A(A&) cannot bind: an error in C++11/14 (1 line, b), legal in C++17 by guaranteed elision (0 lines, a); `A a2 = A(2);` compiles in both via operator int + A(int). The course gives no evidence of its standard (exams target MSVC, whose default is C++14 but which also accepts temporary-to-A& as an extension); no key in source"}
MED = {3, 4}
EXPL = {
    1: "הפונקציה `smallest` מחזירה הפניה לאחד הארגומנטים. בקריאה הראשונה `r` הוא `k` (6) ו-`s` הוא `m` (5), התנאי `6 < 5` לא מתקיים ולכן מוחזרת ההפניה ל-`m`, וההשמה `= 10` משנה את `m` ל-10. בקריאה השנייה `6 < 10` מתקיים, מוחזרת ההפניה ל-`k`, ו-`--` מקטין אותו ל-5. הפלט `k=5, m=10` (תשובה א), וכך גם הרצת clang++.",
    2: "בנאי העתקה הוא בנאי שהפרמטר הראשון שלו הוא הפניה למחלקה עצמה (בדרך כלל `const &`). `Point(Point const src)` מקבל לפי ערך, וזה אסור לבנאי העתקה (clang++ דוחה אותו, כי העתקת הארגומנט הייתה קוראת שוב לבנאי ההעתקה בלי סוף). `Point(Point const *src)` מקבל מצביע, ולכן הוא בנאי רגיל ולא בנאי העתקה. רק `Point(Point const &src)` הוא בנאי העתקה: 1 (תשובה ב).",
    3: "הפונקציה הגלובלית `operator*(double, vector)` מאפשרת את הביטוי `3.1415927 * k`, כאשר האופרנד השמאלי הוא `double` (פונקציה חברה לא הייתה מתאימה לכך). הכינוי `vector` כאן הוא `struct` של התוכנית עצמה, ובלי הכללת `<vector>` אין התנגשות. אין שגיאות קומפילציה (תשובה א), וכך גם clang++. הביטחון בינוני כי התשובה מניחה שרק `<iostream>` נכלל.",
    4: "ההצהרה `friend ostream& operator<<(ostream&, const B<T>&)` בתוך תבנית מצהירה על פונקציה חברה **שאינה תבנית** לכל מופע `B<T>`, והאופרטור שמוגדר בהמשך כתבנית הוא פונקציה אחרת. הקומפיילר לא מדווח על שגיאת קומפילציה אחת (clang++ -fsyntax-only: 0 שגיאות), והאתחול `B<int> intB = 5` תקין כי הבנאי `B(int)` אינו `explicit`. הבעיה מתגלה רק בשלב הקישור (`undefined reference` לאופרטור). לכן מספר שגיאות הקומפילציה הוא 0 (תשובה א), אבל התוכנית אינה נבנית. הביטחון בינוני כי הנוסח 'שגיאות קומפילציה' אינו כולל שגיאת קישור.",
    5: "`A` הוא וקטור של וקטורים, ו-`push_back` שומר **עותקים**: `A[1]` הוא עותק של `v2`. השינוי `A[1][1] = 35` משנה את העותק בלבד. ההדפסה הלולאתית מציגה `8 9`, אחר כך `-8 35 51`, ואז `8 9`, ובסוף `v2[1]` שנשאר 5. הפלט בתשובה ג, וכך גם הרצת clang++. בתשובה ד מודפס 35 בסוף, וזה יקרה רק אם `A` היה שומר הפניות.",
    6: "המחלקה `base` מכילה `int arr[10]`, כלומר 40 בתים (כש-`int` הוא 4 בתים). `b1` ו-`b2` יורשות מ-`base` בירושה רגילה (לא וירטואלית), ולכן `derived` מכילה שני עותקים נפרדים של `base`: 80 בתים. 80 חלקי 4 הם 20 (תשובה ד), וכך גם הרצת clang++.",
    7: "בירושה `private` חברי `public` ו-`protected` של הבסיס עוברים למחלקה הנגזרת (הופכים ל-`private` בה) ונגישים מתוך הפונקציות שלה, בעוד חברי `private` של הבסיס אינם נגישים (נבדק בקומפילציה). לכן רק טענה 2 נכונה (תשובה ב). טענה 1 ו-3 שגויות כי החברים כן עוברים בהורשה ונגישים מבפנים, וטענה 4 שגויה כי הגזירה מתקמפלת.",
    8: "אופרטור בינארי כמו `%` שמוגדר כפונקציה חברה מקבל ארגומנט אחד בלבד: האופרנד הימני. האופרנד השמאלי הוא האובייקט עצמו (`this`). הצהרה עם 0 או עם 2 ארגומנטים לא מתקמפלת (נבדק עם clang++), ולכן התשובה היא 1 (ב). האפשרות 'יכול להיות 1 או 2' מתאימה רק לאופרטור גלובלי. השורה `class A {` שמופיעה פעמיים בקוד המודפס היא טעות דפוס.",
    9: "השורה `B b1();` מצהירה על **פונקציה** בשם `b1` (ולא על אובייקט), והיא תקינה כהצהרה. `new B[2]` תקין כי ל-`B` יש בנאי ברירת מחדל. `A a1(0)` תקין. השורה `p[0] = b1;` שגויה: מנסים להשים שם של פונקציה לתוך `A`, ואין אופרטור השמה שמתאים לכך. שגיאה אחת בלבד (תשובה ב), וכך גם clang++.",
    10: "`arrRef` היא הפניה למערך `arr`, ו-`r0` היא הפניה ל-`arr[0]`. ההשמה `r0 = arrRef[1] = arr[2] = 5` מתבצעת מימין לשמאל: `arr[2]` הופך 5, אחר כך `arrRef[1]` (שהוא `arr[1]`) הופך 5, ולבסוף `r0` (שהוא `arr[0]`) הופך 5. הפלט `555` (תשובה ד), וכך גם הרצת clang++.",
    11: "המשתנה הגלובלי `x` נבנה לפני `main` ומדפיס `1`. ב-`main` נבנה `y` (מדפיס `2`) ואחריו הסטטי `z` (מדפיס `3`). בסיום `main` נהרס רק האוטומטי `y` (מדפיס `2`). לבסוף, בסיום התוכנית, נהרסים הסטטי והגלובלי בסדר הפוך לבנייה: `z` (`3`) ואז `x` (`1`). הפלט `1 2 3 2 3 1` (תשובה ד), וכך גם הרצת clang++.",
    12: "האובייקט `m` הוא `const`. הקריאה `m.f()` תקינה כי `f` מוגדרת `const`. הקריאה `m.g()` שגויה: `g` אינה `const`, ולא ניתן לקרוא לה על אובייקט קבוע. שורה אחת שגויה (תשובה ב), וכך גם clang++.",
    14: "ל-`B` ול-`C` יש ירושה **וירטואלית** מ-`A`, ולכן ב-`D` יש תת-אובייקט אחד בלבד של `A`, והוא נבנה פעם אחת על ידי המחלקה היורשת הסופית `D`: `a = ++c = 1`. הביטויים `d.A::a`, `d.B::a` ו-`d.C::a` מתייחסים לאותו שדה, ולכן מודפס `1 1 1` (תשובה ד), וכך גם הרצת clang++.",
    15: "הקריאות `f()`, `f<>()` ו-`f(y)` תקינות (`T` ו-`N` מקבלים ברירות מחדל או נגזרים מהארגומנט). בקריאה `f<double, n>(y)` הארגומנט `n` הוא משתנה רגיל ולא קבוע בזמן קומפילציה, ולכן אי אפשר להשתמש בו כפרמטר תבנית. בקריאה `f<int>(y, n)` שולחים שני ארגומנטים לפונקציה שמקבלת אחד. שתי שורות שגויות (תשובה ג), וכך גם clang++.",
}


def Q(num, topic, question, options, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "correctId": KEYS.get(num, "a"), "answerSource": "solved", "official": False, "confidence": "high",
         "explanation": "", "note": note}
    q.update(kw)
    return q


NOKEY = "No key in the source; clang++ run decides."
RULE = "No key in the source; language rule."
RUNQ = "מה יודפס לאחר הרצת התכנית הבאה?\n"
ERRQ = "כמה שגיאות קומפילציה יש בתכנית הבאה?\n"
LINEQ = "בכמה שורות בקטע הקוד הבא יש שגיאות קומפילציה ?\n"
N4 = ("0", "1", "2", "3")
questions = []

# 1
questions.append(Q(1, "cpp_basics_refs", RUNQ + cb(r'''
int& smallest(int& r, int& s){
    if (r < s) return r;
    else       return s;
}
void main(){
    int k = 6;
    int m = 5;
    smallest(k, m) = 10;
    smallest(k, m)--;
    cout << "k=" << k << ", m=" << m << endl;
}'''), txt("k=5, m=10", "k=6,m=5", "k=5, m=9", "התכנית לא עוברת קומפילציה"), NOKEY))

# 2
questions.append(Q(2, "copy_control", "כמה בנאי עותק (`copy constructors`) ברשימה הבאה?\n"
    "- `Point(Point const src)`\n- `Point(Point const *src)`\n- `Point(Point const &src)`", txt(*N4), RULE))

# 3
questions.append(Q(3, "operator_overloading", ERRQ + cb(r'''
struct vector{
    double x;
    double y;
};
vector operator * (double a, vector b)
{
    vector r;
    r.x = a * b.x;
    r.y = a * b.y;
    return r;
}
void main(){
    vector k, m;
    k.x = 2;
    k.y = -1;
    m = 3.1415927 * k;
    cout << "(" << m.x << ", " << m.y << ")" << endl;
}'''), txt(*N4), NOKEY))

# 4
questions.append(Q(4, "templates", ERRQ + cb(r'''
template <class T> class B{
public:
    B(int nn = 0):n(nn){}
    friend ostream& operator<<(ostream&, const B<T>&);
private:
    int  n;
};
template <class T> ostream& operator<<(ostream& output, const B<T>& theB){
    output << theB.n << endl;
    return output;
}
int main(){
    B<int> intB=5;
    cout << "intB = " << intB;
    return 0;
}'''), txt(*N4), NOKEY))

# 5
questions.append(Q(5, "stl_exceptions", RUNQ + cb(r'''
#include <vector>
int main(){
    vector <int> v1;
    v1.push_back(8);
    v1.push_back(9);
    vector <int> v2;
    v2.push_back(-8);
    v2.push_back(5);
    v2.push_back(51);
    vector<vector<int> > A;
    A.push_back(v1);
    A.push_back(v2);
    A.push_back(v1);
    A[1][1] = 35;
    for (int i = 0; i < A.size(); i++)
    {
        for (int j = 0; j < A[i].size(); j++)
            cout << A[i][j] << " ";
        cout << endl;
    }
    cout << v2[1];
    return 0;
}'''), txt("8 9\n-8 5 51\n8 9\n35", "התכנית לא עוברת קומפילציה", "8 9\n-8 35 51\n8 9\n5", "8 9\n-8 35 51\n8 9\n35"), NOKEY))

# 6
questions.append(Q(6, "abstract_multiple", RUNQ + cb(r'''
class base {
    int arr[10];
};
class b1 : public base { };
class b2 : public base { };
class derived : public b1, public b2 {};
int main(void){
    int intSize = sizeof(int);
    cout << sizeof(derived)/intSize;
    return 0;
}'''), txt("0", "1", "10", "20"), NOKEY))

# 7
questions.append(Q(7, "inheritance_access", "אם מחלקה נגזרת (יורשת) באופן פרטי (`private inheritance`) ממחלקת בסיס, אז\n"
    "1) אף חבר (`member`) במחלקת הבסיס לא עובר בהורשה.\n"
    "2) כל החברים (`members`) במחלקת הבסיס חוץ מפרטיים (`private members`) נגישים בתוך הפונקציות של המחלקה הנגזרת.\n"
    "3) כל החברים (`members`) במחלקת הבסיס עוברים בהורשה למחלקה הנגזרת, אך אינם נגישים בתוך הפונקציות של המחלקה הנגזרת.\n"
    "4) גזירת המחלקה נותנת שגיאה.", txt("1", "2", "3", "4"), NOKEY))

# 8
questions.append(Q(8, "operator_overloading", "כמה ארגומנטים יש לכתוב בתוך הסוגריים של `operator%( )` ?\n" + cb(r'''
class A {

class A {
public:
    A operator%(...);
};'''), txt("0", "1", "2", "יכול להיות 1 או 2"), NOKEY + " (the duplicated `class A {` line is as printed; the check uses the single-line class.)"))

# 9
questions.append(Q(9, "classes_ctor_dtor", ERRQ + cb(r'''
class A {
public:
    A(int i) {
        cout << "A's Constructor" << i << endl;
    }
    A(const A& other) {
        cout << "A's copy Constructor" << endl;
    }
    A& operator=(A& other) {
        cout << "A=" << endl;
        return *this;
    }
    void virtual f(int i = 7) const {
        cout << "A's f" << i << endl;
    }
};
class B :public A {
public:
    B() : A(1) {
        cout << "B's Constructor" << endl;
    }
    virtual ~B() {
        cout << "B's Destructor" << endl;
    }
    void f(int i = 7) const {
        cout << "B's f" << i << endl;
    }
};
int main() {
    B b1();
    A a1(0);
    A* p;
    p = new B[2];
    p[0] = b1;
    return 0;
}'''), txt(*N4), NOKEY))

# 10
questions.append(Q(10, "cpp_basics_refs", "מה יהיה הפלט של התכנית הבאה ?\n" + cb(r'''
#include <iostream>
using namespace std;
void main() {
    int arr[] = { 1, 2, 3 };
    int(&arrRef)[3] = arr;
    int &r0 = arrRef[0];
    r0 = arrRef[1] = arr[2] = 5;
    cout << arr[0] << arr[1] << arr[2];
}'''), txt("123", "125", "155", "555"), NOKEY))

# 11
questions.append(Q(11, "construction_order", "מה יהיה הפלט של התכנית הבאה ?\n" + cb(r'''
class C {
public:
    C() : id(++count) { cout << id << " "; }
    ~C() { cout << id << " "; }
private:
    int id;
    static int count;
};
int C::count = 0;
C x;
void main() {
    C y;
    static C z;
}'''), txt("0 1 2 1 2 0", "1 2 3 3 2 1", "1 2 3 3 1 2", "1 2 3 2 3 1"), NOKEY))

# 12
questions.append(Q(12, "const_references", "בכמה שורות של פונקציית `main()` בקטע הקוד הבא יש שגיאות קומפילציה ?\n" + cb(r'''
class M {
public:
    M(int n = 0) { i = n; }
    const M& f() const
    {
        return *this;
    }
    void g() {}
    int i;
};
int main(){
    const M m(2);
    m.f();
    m.g();
    return 0;
}'''), txt(*N4), NOKEY))

# 13
questions.append(Q(13, "copy_control", LINEQ + cb(r'''
class A {
public:
    A(int x):v(x) {};
    A(A& a): v(a.v){};
    void operator=(A& a) { v = a.v; };
    operator int() { return v; };
    int v;
};
void main(){
    A a1 = 1;
    int i = a1;
    A a2 = A(2);
    A a3(a2);
    a3 = a2;
}'''), txt(*N4), NOKEY + " Count depends on the language standard (see explanation)."))

# 14
questions.append(Q(14, "abstract_multiple", "מה יהיה הפלט של התכנית הבאה:\n" + cb(r'''
class A {
public:
    A(): a(++c) {};
    int a;
    static int c;
};
int A::c = 0;
class B : virtual public A {public: B(){}; };
class C : virtual public A {public: C(){}; };
class D : public B, public C {public: D(){} };
int main() {
    D d;
    cout << d.A::a << " " << d.B::a << " " << d.C::a;
}'''), txt("1 2 3", "1 1 2", "1 2 2", "1 1 1"), NOKEY))

# 15
questions.append(Q(15, "templates", LINEQ + cb(r'''
template<class T = int, int N = 0>
T f(T x = 0) {
    return x + N;
}
void main() {
    double y = 1.5;
    int n = 10;
    cout << f() << endl;
    cout << f<>() << endl;
    cout << f<double, n>(y) << endl;
    cout << f<int>(y, n) << endl;
    cout << f(y) << endl;
}'''), txt(*N4), NOKEY))

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
    "examCode": "23S-A",
    "examLabel": "2023 סמסטר קיץ מועד א",
    "year": 2023,
    "examDate": "13.09.2023",
    "sourceFile": "2023/סמ׳ ג מועד א_.pdf",
    "keyFile": "none (no answer source in the file; keys derived by clang++ runs, tools/verify/23S-A/)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
