# -*- coding: utf-8 -*-
"""Generator for tools/raw/23B-B.json -- oop (61307), 2023 semester B, moed A (13/07/2023).
Run: PYTHONUTF8=1 py tools/gen/gen_23B-B.py

Source: 15-page paper (15 MCQ x 7 pts, 4 options; header says "semester A moed A" but the printed date is 13/07/2023,
which makes it the second 2023 sitting). The file carries NO answer source, so every key was derived by compiling/running
the printed code with clang++ (tools/verify/23B-B/check.py) or by the language rule, and is stored as answerSource "solved",
official:false. `void main` in the exam is MSVC style; the harness rewrites it to `int main` for clang.
Q10 prints two identical options (b and c); both are kept as printed."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "23B-B.json"
IDS = "abcd"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


KEYS = {1: "b", 2: "d", 3: "c", 4: "c", 5: "b", 6: "c", 7: "c", 8: "a", 9: "c", 10: "a", 11: "c", 12: "d",
        13: "b", 14: "d", 15: "c"}
HOLD = {}
MED = {6, 11, 14, 15}
EXPL = {
    1: "הקריאה `f(5)` עמומה: גם `f(float)` וגם `f(float, float = 2)` מתאימות לארגומנט אחד (שתיהן דורשות המרה מ-`int` ל-`float`), ולכן יש שגיאת קומפילציה בשורה הזאת. הקריאה `f(5,6)` תקינה: ב-`f(float, int, int = 8)` הארגומנט השני מתאים בדיוק (`int`), ולכן היא עדיפה על `f(float, float = 2)`. `f(5,6,7)` מתאימה רק לגרסה בעלת שלושה פרמטרים. בסך הכול שגיאה בשורה אחת (תשובה ב), וזה גם מה ש-clang++ מדווח.",
    2: "`A a1(1), a2(2)` מגדילים את `y` ל-2. `a1.f()` היא פונקציה סטטית: נוצר `a3` (`y` הופך 3), `y = y + a3.x` נותן 7, והערך 7 מוחזר (אחר כך `a3` נהרס ו-`y` יורד ל-6). בקריאה `a2.f()`: `a3` מעלה את `y` ל-7, אחרי החיבור הוא 11 והערך 11 מוחזר. ההדפסה היא `7` ואחריה `11`, כלומר `711` (תשובה ד), וכך גם הרצת clang++.",
    3: "`Y` יורשת מ-`X` ירושה `protected`, ולכן `n1` מוגן ב-`Y` ובכל יורשיה. הפונקציה `g` היא חברה של `Z` בלבד: דרך אובייקט `Z` (`z1.n1`) מותר לה לגשת ל-`n1`, אבל דרך אובייקט `Y` (`y1.n1`) לא, ולכן זו שגיאה. ב-`main` הגישה `z1.n1` נחסמת (שדה מוגן, ו-`main` אינה חברה). שאר השורות תקינות (`n2` ציבורי, והפונקציה `f` של `Z` רשאית לגשת ל-`n1`). שתי שורות שגויות (תשובה ג), וכך גם clang++.",
    4: "`f` וירטואלית במחלקת הבסיס `X`, וכל המחלקות הנגזרות דורסות אותה, ולכן הקריאה דרך הפניה `X&` נבחרת לפי הטיפוס הדינמי. ארבעת האובייקטים מדפיסים `X`, `Y`, `Z`, `W`. `x1` מצביע על האובייקט `W` (ההמרה `(X*)` היא רק המרה למצביע בסיס), ולכן הקריאה האחרונה מדפיסה `W` שוב. הפלט `XYZWW` (תשובה ג), וכך גם הרצת clang++.",
    5: "בקריאה `f<A,int>(a1, i)` נבחרת התבנית הכללית: `cout << i` מפעילה את `operator int` של `A` ומדפיסה 5, ואז מודפס `j` שהוא 6: `56`. בקריאה `f<int,char>(i, c)` קיימת התמחות מפורשת `f(int x, char c)` שמדפיסה קודם את התו ואחר כך את המספר: `d6`. הקריאה `f<char,int>(c, i)` חוזרת לתבנית הכללית עם `c` ו-`i`: `d6`. הפלט `56d6d6` (תשובה ב), וכך גם הרצת clang++.",
    6: "העיקרון הוא הסתרת מידע: פונקציות גישה לא אמורות לחשוף את השדה הפרטי לשינוי חופשי. `f` מחזירה עותק של `x`, ולכן היא תקינה. `g` מחזירה הפניה (`int&`) ל-`x`, ו-`h` מחזירה מצביע (`int*`) אליו: דרכן אפשר לשנות את השדה הפרטי בלי שהמחלקה תשלוט בכך. לכן שתי פונקציות סותרות את העיקרון (תשובה ג). השאלה עוסקת בעיקרון תכנות ולא בהרצה, והתשובה נקבעה לפי כלל זה.",
    7: "טענה א נכונה: אפשר לתת חברות לפונקציה חברה בודדת של `B`, למשל `friend void B::f();` (נבדק בקומפילציה, ופונקציה אחרת של `B` לא קיבלה גישה). טענה ב נכונה: הצהרה `friend class B;` נותנת חברות לכל הפונקציות של `B`, ואי אפשר לצמצם אותה לחלק מהן (מי שרוצה רק חלק מצהיר על כל פונקציה בנפרד, כמו בטענה א). טענה ג שגויה: פונקציה גלובלית `f` ופונקציה `B::f` הן שתי פונקציות שונות, ואפשר להצהיר על שתיהן כחברות באותה מחלקה. שתי טענות נכונות (תשובה ג).\nהערה: טענה ב דו-משמעית. אם קוראים אותה כטענה שמחלקה `A` לא יכולה לתת חברות רק לחלק מהפונקציות של `B`, היא שגויה (בגלל טענה א), ואז רק טענה אחת נכונה. לכן גם תשובה ב מתקבלת.",
    8: "המחלקה `Y` מקוננת בתוך `X`, ובמחלקה מקוננת מותר לגשת לחברים הפרטיים של המחלקה העוטפת. בביטוי `::c = t.X::c = c = r`: `::c` הוא המשתנה הגלובלי, `t.X::c` הוא השדה הפרטי של `X` (מותר מתוך `Y`), ו-`c` לבדו הוא `Y::c`. כל ההשמות חוקיות והקוד מתקמפל בלי אף שגיאה (תשובה א), וכך גם clang++.",
    9: "בנאי ההעתקה מקדם את `T::n`. `ret_obj(t1)` מחזירה את `t` לפי ערך, וזה יוצר עותק אחד (גם אם התוצאה לא נשמרת). `pass_obj(t1)` מקבלת את הארגומנט לפי ערך ויוצרת עותק נוסף. סך הכול `n = 2`, והפלט `2` (תשובה ג), וכך גם הרצת clang++.",
    10: "`b.a + c.a` הוא 10+0, ולכן מודפס `10` ואחריו רווח. ב-`t(&c)` הפונקציה `f` וירטואלית ולכן נקראת הגרסה של `C` (` C.f `), אבל `g` אינה וירטואלית, ולכן נבחרת לפי הטיפוס הסטטי `A*`: ` A.g `. הפלט `10  C.f  A.g` (תשובה א), וכך גם הרצת clang++. בתשובות ב ו-ג, שהן זהות בדפוס, מודפס `C.g`, וזה לא קורה. הערך האקראי בתשובה ד אינו אפשרי כי `A()` מאתחל את `a` ל-0.",
    11: "בתבנית `B<A*>` השדה `x` הוא מצביע (`A*`), ולכן `x.p()` שגויה (צריך `x->p()`): שגיאה אחת בשורת הבנאי. הכותרת `void f(B &r)` שגויה כי `B` היא תבנית ודורשת ארגומנט (`B<A*>&`): שגיאה שנייה. הקריאה `f(b)` נכשלת רק כתוצאה מההצהרה השגויה של `f`, ולכן לא נספרת כשורה נפרדת. שתי שורות (תשובה ג). clang++ מדווח גם על שורת הקריאה כשגיאה נגררת, ולכן הביטחון בינוני.",
    12: "האובייקט `c` הוא `const`, ולכן על אובייקט כזה אפשר לקרוא רק לפונקציות חברות שהן `const`: נבחרת `int f(int) const` שמחזירה 5. שלוש הפונקציות הגלובליות לא מעורבות כלל, כי הקריאה היא קריאה לפונקציה חברה. הפלט `5` (תשובה ד), וכך גם הרצת clang++.",
    13: "משתנה גלובלי נבנה לפני `main`: `+1`. אחר כך `main` מדפיסה `main`, נבנה `second` (`+2`), נבנה המשתנה הסטטי `third` (`+3`), ובתוך `create` נבנים `fifth` (`+5`), הסטטי `sixth` (`+6`) ו-`seventh` (`+7`). בסיום `create` נהרסים רק המשתנים האוטומטיים בסדר הפוך: `-7-5`. נבנה `fourth` (`+4`), ובסיום `main` נהרסים `fourth` ו-`second`: `-4-2`. לבסוף נהרסים הסטטיים והגלובליים בסדר הפוך לבנייה: `-6-3-1`. הפלט `+1main+2+3+5+6+7-7-5+4-4-2-6-3-1` (תשובה ב), וכך גם הרצת clang++.",
    14: "שלושת המשפטים אינם נכונים. ב-`struct` ברירת המחדל היא `public`, אבל אפשר להגדיר גם שדות `private` או `protected` (נבדק בקומפילציה), ולכן 'כל השדות הם `public`' אינו נכון. ל-`struct` ב-C++ יכולות להיות פונקציות חברות (נבדק). ו-C++ אינה דורשת את המילה `struct` בהכרזת משתנה (זו דרישת C). לכן 3 משפטים אינם נכונים (תשובה ד). הקריאה של המשפט הראשון היא קריאה מילולית, ולכן הביטחון בינוני.",
    15: "הצהרה של בנאים `private` אינה שגיאה בפני עצמה: מחלקה כזו מתקמפלת (נבדק), והשגיאה מתקבלת רק כשמנסים ליצור אובייקט מבחוץ. לכן א אינה נכונה בכלליות. גם ב אינה נכונה: פונקציה סטטית של המחלקה או פונקציה חברה (`friend`) יכולות ליצור אובייקטים (נבדק עם `static C make()`), כמו בתבנית Singleton. לכן שתי התשובות א ו-ב אינן נכונות (תשובה ג). זו שאלת ניסוח ולכן הביטחון בינוני.",
}


def Q(num, topic, question, options, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options,
         "correctId": KEYS.get(num, "a"), "answerSource": "solved", "official": False, "confidence": "high",
         "explanation": "", "note": note}
    q.update(kw)
    return q


NOKEY = "No key in the source; clang++ run decides."
RULE = "No key in the source; language rule."
ERRQ = "בכמה שורות בקטע הקוד הבא יש שגיאות?\n"
PRINTS = "מה מדפיסה התכנית הבאה?\n"
NUMS = ("0", "1", "2", "יותר מ- 2")
questions = []

# 1
questions.append(Q(1, "cpp_basics_refs", ERRQ + cb(r'''
float f(float x) {
    return x + 1;
}
int f(float x, float y = 2) {
    int z = x + (int)y;
    return z;
}
int f(float x, int y, int z = 8) {
    int w = (int) x + y + z;
    return w;
}
int main()
{
    float x = 5.5, y = 2.5;
    int z = 3;
    cout << f(5) << endl;
    cout << f(5,6) << endl;
    cout << f(5,6,7) << endl;
}'''), txt(*NUMS), NOKEY))

# 2
questions.append(Q(2, "friend_this_static", PRINTS + cb(r'''
class A {
public:
    A(int i) {x = i; y++;}
    ~A() {y--;}
    static int f() { A a3(4); y = y + a3.x; return y; }
    int x;
public:
    static int y;
};
int A::y = 0;
int main() {
    A a1(1), a2(2);
    cout << a1.f();
    cout << a2.f();
}'''), txt("התכנית לא עוברת קומפילציה.", "611", "610", "711"), NOKEY))

# 3
questions.append(Q(3, "inheritance_access", ERRQ + cb(r'''
class X {
public:
    int n1;
};
class Y : protected X {
public:
    int n2;
};
class Z : public Y {
public:
    int n3;
    friend void g();
    void f() {
        n3 = n1;
        n3 = n2;
    }
};
void g() { Y y1; Z z1;
    y1.n1 = 0;
    y1.n2 = 0;
    z1.n1 = 0;
    z1.n2 = 0;
}
int main() {
    Z z1;
    z1.n2 = 0;
    z1.n1 = 0;
    return 0;
}'''), txt(*NUMS), NOKEY))

# 4
questions.append(Q(4, "virtual_polymorphism", PRINTS + cb(r'''
class X {
public:
    int n1;
    virtual void f() { cout << "X"; }
};
class Y : public X {
public:
    int n2;
    void f() { cout << "Y"; }
};
class Z : public X {
public:
    int n3;
    void f() { cout << "Z"; }
};
class W : public Z {
    int n4;
    void f() { cout << "W"; }
};
void g(X &x);
void main()
{
    X* x[4];
    x[0] = new X();
    x[1] = new Y();
    x[2] = new Z();
    x[3] = new W();
    X* x1 = (X *) x[3];
    for (int i = 0; i < 4; i++) { g(*x[i]); };
    g(*x1);
}
void g(X & x) {
    x.f();
}'''), txt("XYZWX", "XXZWY", "XYZWW", "התכנית לא עוברת קומפילציה."), NOKEY))

# 5
questions.append(Q(5, "templates", PRINTS + cb(r'''
class A {
public:
    int n1;
    A(int i = 0) { n1 = i; }
    operator int() { return n1; }
};
template <class X, class Y>
void f(X i, Y j) {
    cout << i;
    cout << j;
}
template<>
void f(int x, char c) {
    cout << c;
    cout << x;
}
int main() {
    int i = 6;
    char c = 'd';
    A a1(5);
    f<A, int>(a1, i);
    f<int, char>(i, c);
    f<char, int>(c, i);
    return 0;
}'''), txt("566dd6", "56d6d6", "56d66d", "656dd6"), NOKEY))

# 6
questions.append(Q(6, "classes_ctor_dtor", "להלן הצהרה של המחלקה הבאה:\n" + cb(r'''
class A {
    int x;
public:
    int f() { return x;}
    int& g() {return x;}
    int* h()  {return &x;}
};''') + "\nכמה מבין הפונקציות של המחלקה הנ\"ל ממומשות באופן שנוגד עקרונות תכנות נכון?",
    txt("0", "1", "2", "3"), RULE))

# 7
questions.append(Q(7, "friend_this_static", "כמה מהמשפטים הבאים נכונים:\n"
    "א. מחלקה `A` יכולה לתת חברות (`friendship`) לחלק מהפונקציות של מחלקה `B`.\n"
    "ב. אם מחלקה `A` נותנת חברות (`friendship`) למחלקה `B`, אז היא לא יכולה להגביל את החברות רק לחלק מהפונקציות של מחלקה `B`.\n"
    "ג. אם מחלקה `A` נותנת חברות (`friendship`) לפונקציה גלובלית בשם `f` אזי היא לא יכולה לתת חברות (`friendship`) לפונקציה של מחלקה `B` בשם `f`.",
    txt("0", "1", "2", "3"), "No key in the source; language rule (friend void B::f(A&) grants only that member). Arbiter (2026-10-18): statement B is ambiguous. "
    "Read literally (`friend class B;` befriends all of B and cannot be narrowed) it is true -> 2 true -> c; read as 'A cannot befriend only part of B' it is false -> 1 -> b. "
    "The conditional wording points to the literal reading, so key c, b also accepted.", confidence="med", acceptedIds=["c", "b"]))

# 8
questions.append(Q(8, "classes_ctor_dtor", ERRQ + cb(r'''
char c;
class X {
    char c;
public:
    class Y {
    public:
        void f(char r) {
            X t;
            ::c = t.X::c = c = r;
        }
    private:
        char c;
    };
};'''), txt(*NUMS), NOKEY))

# 9
questions.append(Q(9, "copy_control", PRINTS + cb(r'''
class T{
private:
    int a;
public:
    static int n;
    int b;
    T(int i, int j) { a = i; b = j; }
    T(const T &r){
        a = r.a; b = r.b;
        n++;
    }
};
int T::n = 0;
T ret_obj(const T& t){
    return t;
}
void pass_obj(T t){
    ;
}
int main(){
    T t1(1, 2), t2(3, 4);
    ret_obj(t1);
    pass_obj(t1);
    cout << T::n;
    return 0;
}'''), txt(*NUMS[:3], "יותר מ- 2"), NOKEY))

# 10
questions.append(Q(10, "virtual_polymorphism", PRINTS + cb(r'''
class A {
public:
    int a;
    A() { a = 0; }
    A(int i) { a = i; }
    virtual void f() const { cout << " A.f "; }
    void g() const { cout << " A.g "; }
};
class B : public A{
public:
    B(int i) : A(i) {}
};
class C : public A{
public:
    void f() const { cout << " C.f "; }
    void g() const { cout << " C.g "; }
};
void t(A* p){
    p->f();
    p->g();
}
int main(){
    B b(10);
    C c;
    cout << b.a + c.a << " ";
    t(&c);
    return 0;
}''') + "\nבתשובה ד. הנ\"ל המספר -858993450 הוא מספר שלם אקראי כלשהו שהתכנית מדפיסה.",
    txt("10  C.f  A.g", "10  C.f  C.g", "10  C.f  C.g", "-858993450  C.f  C.g"), NOKEY,
    ))

# 11
questions.append(Q(11, "templates", ERRQ + cb(r'''
class A{
public:
    void p() const { cout << "p\n"; }
};
template <typename T> class B{
private:
    T x;
public:
    int k;
    B(T y) : x(y), k(2) { x.p(); }
};
void f(B &r){
    std::cout << r.k;
}
int main(){
    A a;
    B<A*> b(&a);
    f(b);
    return 0;
}'''), txt(*NUMS), NOKEY))

# 12
questions.append(Q(12, "const_references", PRINTS + cb(r'''
int f(int x) { return 1; }
int f(int& x) { return 3; }
int f(const int& x) { return 4; }
class C {
public:
    int f(int x) const { return 5; }
    int f(int x) { return 6; }
};
int main()
{
    const C c;
    int y = 7;
    cout << c.f(y);
    return 0;
}'''), txt("התכנית לא עוברת קומפילציה.", "7", "6", "5"), NOKEY))

# 13
questions.append(Q(13, "construction_order", PRINTS + cb(r'''
class CD{
public:
    CD(int value) :data(value) { cout << "+" << data; }
    ~CD() { cout << "-"<< data; }
private:
    int data;
};
void create(void);
CD first(1);
int main() {
    cout << "main";
    CD second(2);
    static CD third(3);
    create();
    CD fourth(4);
    return 0;
}
void create(void){
    CD fifth(5);
    static CD sixth(6);
    CD seventh(7);
}'''), txt("main+1+2+3+5+6+7-7-5+4-4-2-6-3-1", "+1main+2+3+5+6+7-7-5+4-4-2-6-3-1",
           "+1main+2+3+5+6+7-7-5+4-4-1-2-6-3", "התכנית לא עוברת קומפילציה"), NOKEY))

# 14
questions.append(Q(14, "cpp_basics_refs", "כמה מבין המשפטים הבאים **אינם** נכונים:\n"
    "ב- `structure` ב-C++ כל השדות הם מסוג `public`.\n"
    "`structure` ב-C++ לא יכול להכיל מטודות (`member functions`).\n"
    "כאשר מכריזים על משתנה מסוג `structure` ב-C++ חייבים להוסיף את המילה `struct` לפני ההכרזה.",
    txt(*NUMS[:3], "3"), RULE))

# 15
questions.append(Q(15, "classes_ctor_dtor", "מה קורה כאשר כל הבנאים של מחלקה `C` מוכרזים `private`?",
    txt("מתקבלת שגיאת קומפילציה.", "לא ניתן ליצור אוביקטים של המחלקה `C`.", "שתי התשובות א ו ב לא נכונות.",
        "שתי התשובות א ו ב נכונות."), RULE))

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
    "examCode": "23B-B",
    "examLabel": "2023 סמסטר ב מועד ב",
    "year": 2023,
    "examDate": "13.07.2023",
    "sourceFile": "2023/סמ׳ א מועד א_.pdf",
    "keyFile": "none (no answer source in the file; keys derived by clang++ runs, tools/verify/23B-B/)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
