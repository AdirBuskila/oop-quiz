# בנאי העתקה, השמה והעתקה עמוקה

> 🔑 **בשורה אחת:** יש שלוש פעולות "העתקה": בנאי העתקה (אובייקט חדש מאובייקט קיים), אופרטור השמה (שני האובייקטים כבר קיימים) והורס. אם המחלקה מחזיקה מצביע לזיכרון דינמי צריך לכתוב את **שלושתן** (חוק השלושה), אחרת ההעתקה רדודה והזיכרון משוחרר פעמיים.

## מה המבחן שואל

- באיזה מקרה בנאי העתקה **לא** נקרא: בהשמה בין אובייקטים קיימים (19A-A שאלה 9).
- שגיאת זמן ריצה אחרי `x2 = x1` במחלקה עם `new` בבנאי ו-`delete` בהורס: השגיאה בהורס, כי שני האובייקטים מחזיקים אותו מצביע (19A-A שאלה 19, 20B-A שאלה 2).
- מה חייבים להוסיף כדי שמחלקה עם מצביע תעבוד: בנאי העתקה **וגם** אופרטור השמה (20B-A שאלה 2, 21B-B שאלה 1, 22B-A שאלה 4).
- החתימה הנכונה של השמה: `C& operator=(const C&)` (19A-A שאלה 21).
- מה הצורה החוקית של בנאי העתקה: רק `Point(const Point&)`. `Point(Point src)` בערך ו-`Point(Point*)` אינם בנאי העתקה (23S-A שאלה 2).
- ספירת העתקות: `ret_obj` שמחזירה לפי ערך ו-`pass_obj` שמקבלת לפי ערך (23B-B שאלה 9, התשובה 2), וכמה פונקציות מתוך שש משתמשות בהכרח בבנאי העתקה (22B-A שאלה 6).
- `X b = a;` הוא בנאי העתקה, לא השמה (18A-C שאלה 3, 22S-B שאלות 2 ו-4).
- בנאי העתקה עם פרמטר שאינו `const`: `T(T& c)` לא יכול לקבל `const T` (`25S-A-Q15`, 23S-A שאלה 13, 20B-A שאלות 4 ו-5).

## הגדרות

- **בנאי העתקה** `T(const T& o)`: נקרא בהצהרה `T b = a;` ו-`T b(a);`, בהעברת פרמטר **לפי ערך**, ובהחזרה לפי ערך (אלא אם הקומפיילר מבטל את ההעתקה, ראו למטה). הפרמטר חייב להיות הפניה, אחרת הוא היה קורא לעצמו בלי סוף.
- **אופרטור השמה** `T& operator=(const T& o)`: נקרא כשהשמאלי כבר קיים. מחזיר `*this` בהפניה כדי שתעבוד שרשרת `a = b = c`.
- **העתקה רדודה** (ברירת המחדל): מעתיקה שדה שדה, כולל ערך המצביע. שני אובייקטים מצביעים לאותו זיכרון.
- **העתקה עמוקה:** מקצה זיכרון חדש ומעתיקה את התוכן.
- **חוק השלושה:** הורס, בנאי העתקה, השמה. אם צריך אחד מהם, כנראה צריך את כולם.
- **בדיקת השמה עצמית** `if (this != &o)` מונעת מחיקת הזיכרון לפני שמעתיקים ממנו.
- **ביטול העתקה (copy elision):** מ-C++17 ההחזרה `return T();` ואתחול `T d = make();` בונים ישירות את האובייקט, בלי העתקה. מבחני 2018-2023 נכתבו לפני כן ולפעמים סופרים העתקה שכבר לא קורית. כשהשאלה אומרת "בהכרח" אל תספרו העתקות שהקומפיילר רשאי לבטל.

## מתכונים

**מי נקרא בכל שורה.** לכל שורה שואלים: האם נוצר אובייקט חדש (בנאי העתקה / בנאי רגיל) או שמשימים לקיים (השמה)? העברה לפי ערך = בנאי העתקה לפרמטר, ובסוף הפונקציה הורס.

**האם מחלקה צריכה את השלושה.** מחפשים `new` בבנאי. יש? כותבים הורס, בנאי העתקה, השמה. אין (רק שדות פשוטים או `vector`)? ברירת המחדל מספיקה.

**כתיבת השמה עמוקה.**
1. `if (this != &o)`.
2. משחררים את הישן (`delete p`).
3. מקצים חדש ומעתיקים את התוכן.
4. `return *this;`.

## דוגמה

עוקבים אחרי כל שורה:

```cpp
#include <iostream>
using namespace std;

struct T {
    T()               { cout << "def "; }
    T(const T&)       { cout << "copy "; }
    T& operator=(const T&) { cout << "assign "; return *this; }
    ~T()              { cout << "dtor "; }
};
T make() { return T(); }          // C++17: the temporary is built directly in the caller
void byValue(T t) {}
void byRef(const T& t) {}
int main() {
    T a;            cout << "| ";
    T b = a;        cout << "| ";   // initialization => copy ctor, NOT assignment
    T c(a);         cout << "| ";
    c = a;          cout << "| ";   // both exist already => assignment
    byValue(a);     cout << "| ";   // the parameter is a copy
    byRef(a);       cout << "| ";
    T d = make();   cout << "| ";
    cout << "end\n";
}
```

```text
def | copy | copy | assign | copy dtor | | def | end
dtor dtor dtor dtor 
```

- `T a;` נותן `def`.
- `T b = a;` ו-`T c(a);` נותנים `copy copy` (אתחול, לא השמה).
- `c = a;` נותן `assign`.
- `byValue(a)` יוצר פרמטר: `copy`, ובסיום הפונקציה `dtor`.
- `byRef(a)` לא מעתיק.
- `T d = make();` רק `def`, בלי העתקה (C++17).
- בסוף ארבעה הורסים (`d`, `c`, `b`, `a`).

רדודה מול עמוקה:

```cpp
#include <iostream>
using namespace std;

struct Shallow {
    int* p;
    Shallow(int v) : p(new int(v)) {}
    // no copy ctor / operator=: the compiler copies the pointer value
};
struct Deep {
    int* p;
    Deep(int v) : p(new int(v)) {}
    Deep(const Deep& o) : p(new int(*o.p)) {}                 // copy constructor
    Deep& operator=(const Deep& o) {                          // copy assignment
        if (this != &o) { delete p; p = new int(*o.p); }
        return *this;
    }
    ~Deep() { delete p; }                                     // destructor
};
int main() {
    Shallow s1(5);
    Shallow s2 = s1;
    *s2.p = 9;
    cout << (s1.p == s2.p) << " " << *s1.p << "\n";   // same block: 1 9

    Deep d1(5);
    Deep d2 = d1;
    *d2.p = 9;
    cout << (d1.p == d2.p) << " " << *d1.p << " " << *d2.p << "\n";
    Deep d3(1);
    d3 = d1;  d3 = d3;                                // self-assignment is safe
    cout << *d3.p << "\n";
}
```

```text
1 9
0 5 9
5
```

אצל `Shallow` שני האובייקטים חולקים בלוק אחד (`1`) ושינוי דרך `s2` נראה גם ב-`s1` (`9`). אילו היה ל-`Shallow` הורס עם `delete`, היו שני `delete` לאותו בלוק: שגיאת זמן ריצה. אצל `Deep` הבלוקים שונים (`0`), והערכים `5` ו-`9`.

שרשרת השמה:

```cpp
#include <iostream>
using namespace std;

struct Num {
    int v;
    Num(int v = 0) : v(v) {}
    Num& operator=(const Num& o) { v = o.v; return *this; }   // returns *this by reference
};
int main() {
    Num a(1), b(2), c(3);
    a = b = c;                  // right to left: b = c, then a = (result of b = c)
    cout << a.v << b.v << c.v << "\n";
    (a = Num(8)).v = 9;         // the result is an lvalue, so this changes a
    cout << a.v << "\n";
}
```

```text
333
9
```

## מלכודות

> 🪤 **`T b = a;` אינה השמה.** זה אתחול, ולכן בנאי העתקה. רק `b = a;` אחרי ההצהרה היא השמה.

> 🪤 **שני בנאי העתקה לא תקינים:** פרמטר בערך, ופרמטר שאינו const שלא מקבל אובייקט const.

```text
L1: copy constructor must pass its first argument by reference
L2: no matching constructor for initialization of 'Q'
```

> ⚠️ **ב-C++ לפני 17** `A a1 = 1;` עם בנאי `A(A&)` נכשל כי הערך הזמני לא נקשר להפניה שאינה const. בקומפיילר מודרני אותה שורה מתקמפלת. מפתחות 23S-A שאלה 13 נכתבו לפי הכלל הישן (שתי שגיאות). אם השאלה לא אומרת אחרת, ענו לפי המפתח שמוכר בתשובות המבחן.

> ⚠️ **שכחו אחד מהשלושה.** עם בנאי העתקה בלי השמה (או להפך) עדיין נוצרת שגיאה בזמן ריצה (20B-A שאלה 2: צריך את שניהם).

> ⚠️ **העתקה רדודה של מצביע:** בנאי ההעתקה האוטומטי מעתיק את הכתובת בלבד. שינוי דרך אחד משנה את השני.
