# -*- coding: utf-8 -*-
"""Generator for tools/raw/20B-A.json -- oop (61307), 2020 moed A (Moodle-style online quiz, printed to a 10-page PDF of screenshots, 17 questions, 5 options each).
Run: PYTHONUTF8=1 py tools/gen/gen_20B-A.py

Source: the quiz PDF extracted from the course RAR (2020/"מבחן מועד א 2020.pdf"). Each question is a screenshot; a black box is drawn round one option
and hand-drawn X marks sit on the others (plus handwritten question numbers and a few scribbles). The boxes are NOT treated as an official key:
Q4/Q12/... were re-derived by compiling with clang++ (tools/verify/20B-A/check.py). Where the run (or plain C++) disagrees with the box the
question was held (Q1, Q6, Q17) until the arbiter ruling of 2026-10-18 keyed them a / b / a from the run. Q11, Q13 (class-design questions) cannot be run: the boxed option agrees with the reasoning, key kept with confidence med.
All keys are marked official:false. Options are listed in the on-screen order (top to bottom) as a-e.
No handwriting, name or ID is transcribed; no page images are shipped (all questions are re-typed)."""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "raw" / "20B-A.json"
IDS = "abcde"


def cb(code, tag="cpp"):
    """Fenced code block."""
    return "```" + tag + "\n" + code.strip("\n") + "\n```"


def txt(*vals):
    return [{"id": IDS[i], "type": "text", "value": v} for i, v in enumerate(vals)]


def Q(num, topic, question, options, correct, note, **kw):
    q = {"num": num, "topic": topic, "question": question, "options": options, "correctId": correct,
         "answerSource": "highlighted-pdf", "official": False, "confidence": "high",
         "explanation": "", "note": note}
    q.update(kw)
    return q


def held(q, reason):
    q["hold"] = reason
    q["confidence"] = "low"
    del q["correctId"], q["answerSource"], q["official"]
    return q



def ruled(q, cid, conf, note):
    """Arbiter ruling 2026-10-18: a held question shipped with a run/rule-derived key."""
    q["correctId"], q["answerSource"], q["official"], q["confidence"], q["note"] = cid, "solved", False, conf, note
    return q


PRINTS = "מה מדפיסה התכנית הבאה:"
questions = []

# 1 (HELD)
questions.append(ruled(Q(1, "templates", "במידה ושני אוביקטים (עצמים) שונים נוצרו מתוך אותה תבנית (template) יכול להיות להם משתנה static משותף במידה ו-:",
    txt("במידה והם נוצרו תוך שימוש באותם שמות של מחלקות ביצירת העצמים מהתבנית (template).",
        "המשתנים הסטטיים משותפים רק עבור פונקציות וירטואליות טהורות (pure virtual)",
        "לא יכול להיות בכלל.",
        "תלוי אם נעשה שימוש, בקובץ שמכיל את הגדרת התבנית, ב פקודה #pragma once או לא.",
        "המשתנים הסטטיים משותפים לכל העצמים שנבנים מאותה התבנית."), None,
    "Held. The boxed option is e (statics shared by all objects built from the template). clang++ run: a static member of a class template is shared only within one instantiation "
    "(X<int> objects share, X<double> has its own, different address), so e as written is false and a (same class names = same instantiation) is the true statement."),
    "a", "med", "Arbiter ruling 2026-10-18 (was held): clang++ shows a static member of a class template is shared per instantiation only "
    "(X<int> objects share it, X<double> has its own), which is option a; the box (e) is not an official key. Med: wording of a."))

# 2
questions.append(Q(2, "copy_control", "נתונה התכנית הבאה:\n" + cb(r'''
class X {
public:
    X(int i = 0) {
        p = new int[1];
        *p = i;
    }
    ~X() { delete p; }
    int* p;
    int f(X x) { return *(x.p); }
};
int main() {
    X x1(1); X x2(2); int k;
    x2 = x1;
    k = x2.f(x1);
}''') + "\nניתן לדאוג לכך שהתכנית תתקמפל ותרוץ ללא שגיאות:",
    txt("ע\"י הוספת העמסת אופרטורים לאופרטור = במחלקה X.", "ע\"י הוספת copy constructor במחלקה X והוספת העמסת אופרטורים לאופרטור = במחלקה X.",
        "אף תשובה אינה נכונה.", "ע\"י הוספת copy constructor במחלקה X."), "b",
    "Boxed option b. clang++ run with a double-delete detector (pointer freed twice): the unchanged class, assignment-only and copy-ctor-only versions all free the same pointer twice "
    "(crash); only the version with both a copy constructor and operator= is clean. Box agrees. Screenshot shows four options."))

# 3
questions.append(Q(3, "templates", PRINTS + "\n" + cb(r'''
template <class T, class U>
class X {
public:
    X(T,U) { cout << 1; }
};
template <>
class X <int,char> {
public:
    X(int i,char c) { cout << 2; }
};
int main()
{
    int i = 5; char c = 'a'; double d = 7.5;
    X<int, char> x1(i,c);
    X<char, int> x2(c,i);
    X<double, char> x3(d,c);
}'''),
    txt("211", "221", "אף תשובה אינה נכונה.", "111"), "a",
    "Boxed option a. clang++ run printed 211 (x1 uses the full specialization, x2 and x3 the generic template). Box agrees."))

# 4
questions.append(Q(4, "copy_control", "להלן הגדרה של מחלקה. המשפטים הבאים מתייחסים להגדרה זו :\n" + cb(r'''
1  class Home {
2  public:
3      Home(const int &i)  { num1 = num2 = i; }
4      Home(const int *i)  { num1 = num2 = *i; }
5      Home(const Home &h) { num1 = num2 = h.num1; }
6      Home(Home &h)       { num1 = num2 = h.num1; }
7  private :
8      int num1;
9      double num2;
10 };''', "text"),
    txt("הבנאי בשורה 4 שגוי כי יש שימוש במצביע מסוג const כדי לאתחל משתנה שאיננו מסוג const",
        "יש עמימות (ambiguity) בין הגדרות הבנאים בשורה 5 ובשורה 6.",
        "הבנאי בשורה 3 שגוי כי יש שימוש במשתנה מסוג const להצבה במשתנה מסוג private .",
        "כל ההגדרות תקינות",
        "בנאי ההעתקה בשורה 5 שגוי כי הוא לא רשאי לגשת למשתנה הפנימי h.num1"), "d",
    "Boxed option d. clang++: the class compiles; copy-initialising from a const Home picks line 5 and from a non-const Home picks line 6 (no ambiguity). Box agrees."))

# 5
questions.append(Q(5, "copy_control", "להלן הגדרה של מחלקה. המשפטים הבאים מתייחסים להגדרה זו :\n" + cb(r'''
class Memory {
public:
    Memory(int i = 0) { this->i = j = i; }
    Memory(double j) { this->j = i = j + 1; }
    Memory(const Memory& m) { j = i = m.i = m.j; }
private:
    int i, j;
};'''),
    txt("לא ניתן להגדיר שני בנאים שונים לאותה מחלקה", "בנאי ההעתקה שגוי בשל סתירה פנימית בהגדרת הבנאי", "יש עמימות (ambiguity) בין שני הבנאים",
        "ההגדרה תקינה לחלוטין", "בנאי ההעתקה שגוי כי הוא לא יכול לגשת למשתנה private של אובייקט אחר."), "b",
    "Boxed option b. clang++: the copy constructor assigns to `m.i` although `m` is `const Memory&` (error); without that assignment the class compiles, "
    "two constructors are allowed and calling Memory(3) is not ambiguous. Box agrees."))

# 6 (HELD)
questions.append(ruled(Q(6, "cpp_basics_refs", "ניתן להשתמש בשתיים או יותר הגדרות שונות לפונקציה בעלות אותו שם באותה מחלקה כאשר יש להן הגדרות שונות של סוג הפרמטר המוחזר.",
    txt("אף פעם לא נכון.", "יכול להיות אפשרי אם יש גם הבדלים בסוגי הפרמטרים המועברים לפונקציה או בכמותם", "נכון רק עבור פונקציה וירטואלית.",
        "נכון תמיד", "נכון רק עבור פונקציה שאיננה וירטואלית."), None,
    "Held. The boxed option is d ('always true'). clang++: two members that differ only in return type do not compile (virtual or not); with different parameters they do. "
    "So 'always true' is false and b (possible only if the parameters also differ) is the defensible choice."),
    "b", "med", "Arbiter ruling 2026-10-18 (was held): clang++ rejects members differing only in return type (virtual or not) and accepts them "
    "when the parameters differ -> b; the box (d) is not an official key. Med: concept wording."))

# 7
questions.append(Q(7, "cpp_basics_refs", "להלן קטע קוד ובו הגדרה חסרה מסומנת בקו תחתון. מה צריך להיות במקום הקו התחתון על מנת שהתוצאה של ההדפסה תהיה 2\n" + cb(r'''
int f1(int& i, int j = 1) { return i + j; }
int f1(double& i, int j = 1) { return i * j; }
void main() {
    double k = 2;
    int l = 1;
    cout << f1(________________);
}'''),
    txt("k,l", "l,k", "k&", "l*", "l*k"), "a",
    "Boxed option a. clang++ run of each option: `k,l` prints 2 (f1(double&, int) -> 2*1), `l,k` prints 3 (f1(int&, int) with k converted to 2 -> 1+2), the other three do not compile. Box agrees."))

# 8
questions.append(Q(8, "friend_this_static", "אילו סוגים של פונקציות (method) של מחלקה  לא יכולות להיות מסוג static",
    txt("רק פונקציות וירטואליות שאינן וירטואליות טהורות (pure virtual).", "אין שום מגבלה", "פונקציות שיש להן overloading (כלומר שתי פונקציות בעלות אותו שם אבל עם פרמטרים שונים).",
        "פונקציות מסוג const", "כל הפונקציות הוירטואליות"), "e",
    "Boxed option e. clang++ compile tests: `static virtual` (pure or not) is rejected, overloaded static members are fine. Option d (const) is also true for a const-qualified member "
    "function (`static void f() const` is rejected), though a function that merely returns const can be static; the box keeps e. Confidence med because of that ambiguity in option d. "
    "Arbiter (2026-10-18): d accepted as well (a const member function cannot be static).",
    confidence="med", acceptedIds=["e", "d"]))

# 9
questions.append(Q(9, "abstract_multiple", "מה נדרש לשנות בקטע הקוד הבא כדי שהוא יעבור הידור (קומפילציה)\n" + cb(r'''
class MyClass { virtual int f() = 0; };
class MyClass1 : public MyClass {
};
class Myclass2 :public MyClass {
};
class MyClass3 :public MyClass {
};
const MyClass * f1(const MyClass1&, const Myclass2 ) {return new MyClass3();}'''),
    txt("להגדיר מימוש של הפונקציה f גם עבור המחלקה MyClass1 וגם עבור MyClass3", "להגדיר מימוש של הפונקציה f גם עבור המחלקה MyClass2 וגם עבור MyClass3 .",
        "להגדיר מימוש של הפונקציה f רק עבור מחלקה MyClass2", "להגדיר מימוש של הפונקציה f רק עבור מחלקה MyClass1", "להגדיר מימוש של הפונקציה f רק עבור MyClass3"), "b",
    "Boxed option b. clang++: `new MyClass3()` needs MyClass3 to implement f; the second parameter is an abstract class passed BY VALUE, so MyClass2 must implement f as well; "
    "the first parameter is a reference and needs nothing. Of the five option sets only {MyClass2, MyClass3} compiles (the class is spelled `Myclass2` in the screenshot, both in its header and in the parameter; transcribed as printed). Box agrees."))
# 10
questions.append(Q(10, "friend_this_static", PRINTS + "\n" + cb(r'''
class X {
public:
    X() {}
    static int i;
};
int X::i = 0;
int main() {
    X x1; X x2;
    x1.i = 2;
    x2.i = 3;
    cout << x1.i << x2.i;
    X::i++;
    cout << X::i;
}'''),
    txt("אף תשובה אינה נכונה.", "334", "331", "231"), "b",
    "Boxed option b. clang++ run printed 334 (one shared static: 3 3, then 4). Box agrees."))

# 11
questions.append(Q(11, "inheritance_access", "בפרויקט מסוים יש ליצג את האובייקטים הבאים בעולם האמיתי: תפוזים (Orange), לימונים (Lemon), תפוחים (Apple), ומלפפונים (Cucumber). איזה ארגון של מחלקות יתאים ביותר לפרויקט?",
    txt("למחלקה מסוג Fruit יש שני Data Members האחד מסוג Orange והשני מסוג Vegetable",
        "Orange Lemon ו-Apple יורשים מ-Fruit (פרי) ו-Cucumber יורש מ-Vegetable (ירק). Fruit ו-Vegetable יורשים מ-Food (מאכל).",
        "אם יש בתכנית מחלקה מסוג Food היא בהכרח אבסטרקטית.", "לא ניתן ליצור עץ ירושות שמתאים לפרויקט שתואר.",
        "למחלקה מסוג Food יש ירושה כפולה גם מהמחלקה Fruit וגם מהמחלקה Vegetable."), "b",
    "Boxed option b. Class-design question, not runnable; the boxed hierarchy (leaf fruits derive from Fruit, Cucumber from Vegetable, both from Food) is the only coherent one "
    "(a uses data members for an is-a relation, c is not forced, d is false, e reverses the direction). Key kept, confidence med.",
    confidence="med"))

# 12
questions.append(Q(12, "cpp_basics_refs", "להלן קטע קוד ובו הגדרה חסרה מסומנת בקו תחתון. מה צריך להיות במקום הקו התחתון על מנת שהתוצאה של ההדפסה תהיה 7\n" + cb(r'''
double m1(int i = 0) { return i + 1; }
int m1(double d = 0) { return d + 2; }
int m2(______________) { return i + 2 * d; }
int m2(int i) { return 7; }
int main()
{
    int i = 1;
    std::cout << m2(1.0+m1(i));
}'''),
    txt("int i , double d", "double d, int i=1", "double d=0, int i=1", "double d, int i", "כל התשובות נכונות"), "e",
    "Boxed option e. clang++ run of each of the four blanks: all print 7 (with two required parameters the new m2 is not viable for the one-argument call, so m2(int) returns 7; "
    "with a defaulted int i=1 the double overload is chosen and 1 + 2*3.0 = 7). Box agrees."))

# 13
questions.append(Q(13, "inheritance_access", "התבקשת לכתוב תוכנה למעקב אחר בדיקות. קיימות בדיקות מסוגים שונים – בדיקות דם (Blood Test), בדיקות נשימה (Breath Test), בדיקות רנטגן (Xray Test). "
    "לכל בדיקה יש תאריך שבו התבצעה הבדיקה וכן התאריך שבו פוענחה הבדיקה. יש צורך לשמור את מספר הבדיקות הכולל שבוצעו וכן את מספר הבדיקות לפי סוג בדיקה. "
    "לבדיקות דם יש לשמור את מספר המבחנות שנלקחו (יכול להיות שונה בין בדיקות דם שונות). לבדיקות נשימה יש לשמור את משך זמן ביצוע הבדיקה בפועל (בדקות שלמות). לבדיקות רנטגן אין לשמור נתונים נוספים.\n"
    "מבנה המחלקות המתאים ביותר יהיה:",
    txt("מגדירים מחלקה GeneralTest שמכילה משתנים סטטים ורגילים. בונים מחלקות BloodTest, XRayTest, BreathTest שלא יורשות מאף מחלקה אחרת. מגדירים לכל אחת מהמחלקות אובייקט פנימי מסוג GeneralTest. "
        "BloodTest ו-BreathTest מכילות בנוסף גם משתנים סטטיים וגם משתנים שאינם סטטיים. המחלקה XrayTest מכילה בנוסף רק משתנה סטטי אחד.",
        "בונים מחלקות BloodTest, XRayTest, BreathTest שלא יורשות מאף מחלקה אחרת. BloodTest ו-BreathTest מכילות משתנים סטטיים וגם משתנים שאינם סטטיים. המחלקה XrayTest מכילה רק משתנה סטטי אחד. "
        "מגדירים מחלקה מסוג GeneralTest שיורשת מכל המחלקות שהוגדרו קודם לכן.",
        "בונים מחלקות BloodTest, XRayTest, BreathTest שלא יורשות מאף מחלקה אחרת. כל אחת מהמחלקות BloodTest ו-BreathTest מכילה גם משתנים סטטיים וגם משתנים שאינם סטטיים. המחלקה XrayTest מכילה רק משתנה סטטי אחד.",
        "הבעיה שתוארה מסובכת מדי ולא מתאימה לתכנות בשפה מונחית עצמים. יותר מתאים לתכנת אותה בשפה פרוצדורלית (למשל C).",
        "BloodTest, XRayTest, BreathTest יורשים מ-GeneralTest. GeneralTest היא מחלקה וירטואלית טהורה והיא מכילה משתנים רגילים ומשתנים סטטיים. כל אחת מהמחלקות BloodTest ו-BreathTest מכילה גם משתנים סטטיים וגם משתנים שאינם סטטיים. "
        "המחלקה XrayTest מכילה רק משתנה סטטי אחד."), "e",
    "Boxed option e. Class-design question, not runnable. e is the one that shares the common fields once in an abstract base GeneralTest and gives each test its own extras; "
    "a/c duplicate the common fields or give no common base, b inverts inheritance, d is wrong. Key kept, confidence med.",
    confidence="med"))

# 14
questions.append(Q(14, "virtual_polymorphism", "בהינתן מצביע מסוג `myEx2 *ptr;` יתכן שהפעולה `ptr->myRun();` לא תמיד תפעיל את אותה הפונקציה:",
    txt("רק כאשר הפונקציות סטטיות.", "רק כאשר השיטה myRun מוגדרת virtual במחלקה שיורשת מהמחלקה myEx2.",
        "רק כאשר המחלקה myEx2 יורשת משתי מחלקות שונות שיש להן מימושים שונים של השיטה (Method) myRun().",
        "כאשר השיטה (Method) myRun מוגדרת וירטואלית במחלקה myEx2 וקיימת לפחות מחלקה אחת אחרת שיורשת מ-myEx2 שיש לה מימוש שונה של ()myRun.",
        "רק כאשר השיטה myEx2::myRun() הינה וירטואלית טהורה."), "d",
    "Boxed option d. clang++ runs: with a non-virtual myRun the call always runs the pointer type's version; with myRun virtual in myEx2 and overridden in a derived class the version "
    "depends on the dynamic type; virtual only in a derived class does not change calls through myEx2*; calling a method defined in two bases is ambiguous (does not compile). Box agrees."))

# 15
questions.append(Q(15, "virtual_polymorphism", PRINTS + "\n" + cb(r'''
class X {
public:
    X() { }
    virtual void f() { cout << 1; }
    void f1() { cout << 2; }
};
class Y : public X {
public:
    Y() {}
    void f() { cout << 3; }
    virtual void f1() { cout << 4; }
};
int main() {
    X* a[2];
    X x1;   Y y1;
    a[0] = &x1; a[1] = &y1;
    for (int i = 0; i < 2; i++) {
        a[i]->f();
        a[i]->f1();
    }
}'''),
    txt("אף תשובה אינה נכונה.", "1232", "1234", "1212"), "b",
    "Boxed option b. clang++ run printed 1232 (f is virtual in X so a[1]->f() prints 3; f1 is not virtual in X so a[1]->f1() prints X's 2). Box agrees."))

# 16
questions.append(Q(16, "construction_order", "בשאלה אחרת בבחינה זו מופיעה הגדרה של המחלקה Home ודרוש להשיב האם ההגדרה תקינה. להלן ההגדרה של המחלקה Home:\n" + cb(r'''
class Home {
public:
    Home(const int &i)  { num1 = num2 = i; }
    Home(const int *i)  { num1 = num2 = *i; }
    Home(const Home &h) { num1 = num2 = h.num1; }
    Home(Home &h)       { num1 = num2 = h.num1; }
private :
    int num1;
    double num2;
};''') + "\nבהינתן מחלקה Room שיורשת באופן public מהמחלקה Home הנ\"ל (בהנחה שהגדרה תוקנה במידת הצורך) - ניתן לכתוב בנאי ()Room שיאתחל את ערכו של num1 ל-3 באופן הבא:",
    txt("אפשרי ברשימת האיתחול באופן הבא: `Room() : Home(3) { }`", "אפשרי ברשימת האיתחול באופן הבא: `Room() : num1=3 { }`",
        "אפשרי (לא ברשימת האיתחול) באופן הבא: `Room(): {(Home)(*this).num1 = 3; }`", "לא ניתן", "אפשרי ברשימת האיתחול באופן הבא: `Room() : num1(3) { }`"), "a",
    "Boxed option a. clang++ compile tests: `Room() : Home(3) {}` compiles; `num1=3`, `num1(3)` and `((Home)*this).num1 = 3` fail (num1 is private to Home). Box agrees."))

# 17 (HELD)
questions.append(ruled(Q(17, "construction_order", "בהינתן מחלקה RAM שיורשת באופן public מהמחלקה Memory שמתוארת להלן (מחלקה זו מופיעה בשאלה אחרת והניחו שבמידה ויש בה שגיאה היא תוקנה) - ניתן לכתוב בנאי ()RAM שיאתחל את ערכו של i ל-3 באופן הבא :\n" + cb(r'''
class Memory {
public:
    Memory(int i = 0) { this->i = j = i; }
    Memory(double j) { this->j = i = j + 1; }
    Memory(const Memory& m) { j = i = m.i = m.j; }
private:
    int i, j;
};'''),
    txt("אפשרי ברשימת האיתחול באופן הבא: `RAM() : Memory(3) { }`", "לא ניתן", "אפשרי ברשימת האיתחול באופן הבא: `RAM() : i(3) { };`",
        "אפשרי (לא ברשימת האיתחול) באופן הבא: `RAM(): {Memory::i=3 }`", "אפשרי ברשימת האיתחול באופן הבא: `RAM() : i=3{ };`"), None,
    "Held. The boxed option is b ('not possible', with a handwritten 'private' note beside it). clang++: with the copy constructor repaired, `RAM() : Memory(3) {}` compiles "
    "and leaves i == 3 (the base constructor Memory(int) sets i), so option a works; the other three fail because i is private. Box disagrees with the run."),
    "a", "high", "Arbiter ruling 2026-10-18 (was held): clang++ with the copy ctor repaired: `RAM() : Memory(3) {}` compiles and leaves i == 3; "
    "c, d, e fail (i is private). The box (b) is not an official key."))

EXPL = {
    1: "משתנה סטטי בתבנית מחלקה משותף לכל העצמים של אותו מופע (instantiation) של התבנית, כלומר לעצמים שנוצרו עם אותם שמות מחלקות כארגומנטים לתבנית: שני `X<int>` חולקים אותו משתנה, ולכן תשובה א נכונה. `X<int>` ו-`X<double>` הן מחלקות שונות עם משתנים סטטיים נפרדים (בהרצה גם הכתובות שונות), ולכן תשובה ה (משותף לכל העצמים מאותה תבנית) שגויה. ג שגויה כי שיתוף כן אפשרי, וב ו-ד אינן קשורות לשאלה (פונקציות וירטואליות טהורות ו-`#pragma once` לא משפיעים על כך). בקובץ המקורי מסומנת תשובה ה, אך הסימון אינו מפתח רשמי ואינו מתיישב עם ההרצה.",
    2: "במחלקה יש מצביע שמוקצה בבנאי ומשוחרר בהורס, ולכן ההעתקה ברירת המחדל (shallow) יוצרת שני אובייקטים שמחזיקים אותו מצביע, והשחרור כפול. יש שני מקומות שבהם קורית העתקה: ההשמה `x2 = x1` והעברה לפי ערך `f(x1)` או `x2.f(x1)`, שקוראת לבנאי ההעתקה. בהרצה, תיקון רק של ההשמה או רק של בנאי ההעתקה עדיין שחרר את אותו מצביע פעמיים, ורק הוספת שניהם עבדה נכון (תשובה ב).",
    3: "`X<int, char>` הוא ההתמחות המלאה ולכן מדפיסה 2. `X<char, int>` ו-`X<double, char>` משתמשים בתבנית הכללית ומדפיסים 1 כל אחד. הפלט `211` (תשובה א).",
    4: "הבנאים בשורות 3 ו-4 מקבלים הפניה או מצביע ל-const ומעתיקים ערך, וזה חוקי (קריאה מ-const תמיד מותרת). בשורות 5 ו-6 יש שני בנאי העתקה, אחד עם `const` ואחד בלי: אובייקט const בוחר את הראשון ואובייקט רגיל את השני, ולכן אין עמימות. גם הגישה ל-`h.num1` של אובייקט אחר מאותה מחלקה מותרת. כל ההגדרות תקינות (תשובה ד).",
    5: "בבנאי ההעתקה `m` הוא `const Memory&`, ולכן ההשמה `m.i = ...` לשדה של `m` אסורה (שגיאת קומפילציה). זו הסתירה בהגדרה (תשובה ב). שני בנאים שונים מותרים (א שגויה), הקריאה ל-`Memory(3)` אינה עמומה כי `int` מתאים בדיוק (ג שגויה), וגישה לשדה פרטי של אובייקט אחר מאותה מחלקה מותרת (ה שגויה).",
    6: "העמסת פונקציות נקבעת לפי רשימת הפרמטרים ולא לפי סוג ההחזרה, ולכן שתי הגדרות עם אותו שם וסוגי החזרה שונים אפשריות רק אם הן נבדלות גם בסוג הפרמטרים או במספרם (תשובה ב). שתי פונקציות שנבדלות רק בסוג ההחזרה הן שגיאת קומפילציה (clang++: functions that differ only in their return type cannot be overloaded), וזה נכון גם לפונקציות וירטואליות וגם לפונקציות רגילות, ולכן ג, ד וה שגויות. א שגויה כי עם פרמטרים שונים זה כן אפשרי. בקובץ המקורי מסומנת תשובה ד, אך הסימון אינו מפתח רשמי ואינו מתיישב עם השפה.",
    7: "אפשרות `k,l`: `k` הוא `double` ולכן נבחרת `f1(double&, int)` שמחזירה `i*j` = 2*1 = 2 (תשובה א). אפשרות `l,k`: נבחרת `f1(int&, int)` כש-`k` מומר ל-2, והתוצאה `1+2` = 3. האפשרויות `k&`, `l*` ו-`l*k` אינן ביטויים חוקיים בקריאה.",
    8: "פונקציה סטטית אינה קשורה לאובייקט מסוים, ולכן אין לה `this` ואי אפשר להפוך אותה לווירטואלית (בלי קשר אם היא טהורה). לכן אף פונקציה וירטואלית לא יכולה להיות סטטית (תשובה ה). overloading מותר גם בפונקציות סטטיות. פונקציה חברה מסוג `const` (שמצהירה שהיא לא משנה את `this`) גם היא לא יכולה להיות סטטית, אבל אם הכוונה לפונקציה שמחזירה `const` היא כן יכולה, ולכן הבחירה היא ה.\nהערה: `static void f() const;` נדחה בקומפילציה, כלומר פונקציה חברה מסוג `const` לא יכולה להיות סטטית, ולכן גם תשובה ד מתקבלת.",
    9: "`MyClass3` נוצרת עם `new`, ולכן חייבת לממש את `f` (אחרת היא אבסטרקטית). הפרמטר השני מועבר לפי ערך, וגם אותו אי אפשר לקבל כסוג אבסטרקטי, ולכן גם המחלקה שלו חייבת לממש את `f`. הפרמטר הראשון מועבר בהפניה, ושם מחלקה אבסטרקטית מותרת. בהרצה רק צירוף המימושים בשתי המחלקות האלה התקמפל (תשובה ב).",
    10: "המשתנה `i` סטטי ולכן משותף לכל העצמים. `x1.i = 2` ואז `x2.i = 3` כותבים לאותו משתנה (נשאר 3), ולכן ההדפסה הראשונה היא `33`. אחרי `X::i++` הערך 4. הפלט `334` (תשובה ב).",
    11: "יחס של `is-a` (תפוז הוא פרי) מתבטא בירושה ולא בהכלה (א שגויה). הארגון הטבעי: `Orange`, `Lemon`, `Apple` יורשים מ-`Fruit`, `Cucumber` יורש מ-`Vegetable`, ושתיהן יורשות מ-`Food` (תשובה ב). אין צורך שהמחלקה `Food` תהיה אבסטרקטית (ג), אפשר ליצור עץ ירושה מתאים (ד), ו-`Food` היא הבסיס ולא יורשת מאף אחת (ה).",
    12: "בכל ארבע האפשרויות הפלט הוא 7. הביטוי `m1(i)` מחזיר `double` ולכן `1.0+m1(i)` הוא `double`. כשחתימת `m2` הנוספת דורשת שני ארגומנטים (`int i, double d` או `double d, int i`), היא לא מתאימה לקריאה עם ארגומנט אחד ונבחרת `m2(int)` שמחזירה 7. כשיש ערך ברירת מחדל (`double d, int i=1` או `double d=0, int i=1`) היא מתאימה בדיוק, והתוצאה `1 + 2*3.0` = 7. לכן כל התשובות נכונות (ה).",
    13: "מחלקות הבדיקה חולקות נתונים משותפים (תאריך ביצוע, תאריך פענוח, מספר כולל של בדיקות), ולכן מגדירים להן מחלקת בסיס `GeneralTest` שמכילה אותם, בנוסף למשתנים סטטיים למעקב אחר המספרים. המחלקה היא וירטואלית טהורה כי אין בדיקה כללית שנוצרת בפני עצמה. `BloodTest` ו-`BreathTest` מוסיפות כל אחת את המשתנים הרגילים והסטטיים שלה, ו-`XRayTest` רק משתנה סטטי (תשובה ה). אפשרויות א-ג משכפלות או מחברות את הנתונים הכלליים בדרך גרועה, ו-ד שגויה כי זו בדיוק בעיה שמתאימה לשפה מונחית עצמים.",
    14: "הפעלת `ptr->myRun()` נבחרת בזמן ריצה לפי הטיפוס האמיתי רק כשהפונקציה וירטואלית ב-`myEx2` ויש מחלקה יורשת שדורסת אותה (תשובה ד). אם היא לא וירטואלית, הקריאה תמיד מפעילה את הגרסה של `myEx2` (בהרצה נדפס `BB`). אם וירטואלית רק במחלקה היורשת, גם אז הקריאה דרך `myEx2*` לא משתנה. ירושה משתי מחלקות עם אותו שם פונקציה גורמת לעמימות ולא לבחירה דינמית.",
    15: "`f` וירטואלית ב-`X`. עבור `a[0]` (אובייקט `X`) מודפס 1 ואז `f1` של `X`: 2. עבור `a[1]` (אובייקט `Y` דרך מצביע `X*`) הקריאה הוירטואלית `f` מפעילה את `Y::f` ומדפיסה 3. `f1` לא וירטואלית ב-`X` (ההצהרה `virtual` ב-`Y` לא משפיעה על מצביע `X*`), ולכן מופעל `X::f1` ומודפס 2. הפלט `1232` (תשובה ב).",
    16: "המשתנה `num1` הוא `private` ב-`Home`, ולכן מחלקה יורשת לא יכולה לגשת אליו ישירות: לא ברשימת האיתחול ולא בגוף הבנאי. הדרך היחידה היא להפעיל בנאי של `Home` ברשימת האיתחול, כמו `Home(3)` (תשובה א). `Home(3)` בוחר את `Home(const int&)`.",
    17: "אפשר להפעיל את בנאי הבסיס ברשימת האיתחול: `RAM() : Memory(3) {}` מתקמפל, והבנאי `Memory(int)` מציב `i` = 3 (תשובה א, נבדק בהרצה). המשתנה `i` פרטי ב-`Memory`, ולכן הניסיונות לגשת אליו ישירות מ-`RAM`, `i(3)`, `i=3` או `Memory::i=3`, נכשלים בקומפילציה. האפשרות ״לא ניתן״ (ב) שגויה, כי הגישה עוברת דרך הבנאי של הבסיס ולא דרך השדה. בקובץ המקורי מסומנת תשובה ב, אך הסימון אינו מפתח רשמי ואינו מתיישב עם ההרצה.",
}
SIG = '\n\n_(הסבר שנכתב בעזרת AI ונבדק מול הרצת הקוד)_'
for q in questions:
    q["explanation"] = EXPL[q["num"]] + SIG

exam = {
    "examCode": "20B-A",
    "examLabel": "2020 סמסטר ב מועד א",
    "year": 2020,
    "examDate": "2020",
    "sourceFile": "2020/מבחן מועד א 2020.pdf",
    "keyFile": "same PDF: box drawn round one option per question (not treated as an official key; re-derived by clang++ runs)",
    "questions": questions,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(exam, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"wrote {OUT.name}: {len(questions)} questions")
