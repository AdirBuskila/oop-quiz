# תבניות פונקציה ומחלקה

> 🔑 **בשורה אחת:** תבנית היא "מתכון" שהקומפיילר מייצר ממנו קוד לכל טיפוס שבו משתמשים. בפונקציית תבנית כל הפרמטרים מאותו `T` חייבים להסיק אותו טיפוס **בדיוק**. לכל הצבה (`X<int>`, `X<double>`) יש עותק **נפרד** של המשתנים הסטטיים.

## מה המבחן שואל

- שדה `static` בתבנית מחלקה: `X<int> a, b; X<double> c;` מדפיס `121` (18A-A שאלה 23 עם `static` מקומי בפונקציה, 18A-B שאלה 24, 19A-B שאלה 8 עם `template<int N>`: `221`, 21B-B שאלה 16: `223`, 22S-B שאלה 7). לעומת משתנה גלובלי רגיל: `123` (18A-C שאלה 24).
- אילו שורות לא מתקמפלות: `f(4)`, `f(int)`, `f<int>()`, `f<int>(4)` (18A-B שאלה 17), הצהרת משתנה מתבנית מחלקה בלי `<>` (18A-C שאלה 17, 19A-C שאלה 15), `g(5)` שבה `T` לא נגזר מהארגומנטים (19A-A שאלה 22).
- תבנית שמקבלת מערכים/מצביעים (22B-A שאלה 10), ערכי ברירת מחדל לפרמטרי תבנית ופרמטר לא-טיפוסי (23S-A שאלה 15, `25S-A-Q13`).
- התמחות (specialization): מחלקה `X<int,char>` ו-`X<char,int>` (20B-A שאלה 3: `211`), תבנית פונקציה והתמחות מפורשת (23B-B שאלה 5), בחירה בין `h(T)`, `h(T*)`, `h(const T*)` (`25S-A-Q14`).
- איזה פונקציה נבחרת: תבנית או רגילה עם אותה חתימה (21B-B שאלה 2: הרגילה ב-`f(d,j)`).
- הגדרת פונקציה חברה של תבנית מחוץ למחלקה: `template<class T> void abc<T>::f(){}` (22S-B שאלה 14), `friend ostream& operator<<` בתוך תבנית (22S-B שאלות 9 ו-10, 23S-A שאלה 4).
- יחס בין `A<X>` ל-`A<Y>` כש-`Y` יורשת מ-`X`: אין קשר (19A-A שאלה 24). תבנית עם מחלקה שלא תומכת בפעולה בה משתמשים (23B-B שאלה 11).
- חבר `friend void f<T>()` (19A-A שאלה 23). שדה סטטי משותף בין הצבות שונות (20B-A שאלה 1).

## הגדרות

- **תבנית פונקציה:** `template <class T> T f(T a, T b)`. הסקה לפי הארגומנטים; אין המרות רגילות בהסקה, כל ה-`T` חייבים להתאים בדיוק. אפשר לציין במפורש: `f<double>(1, 2.5)`.
- **תבנית מחלקה:** תמיד מציינים את הפרמטרים: `X<int>`. בלי פרמטרים (`X x;`) זו שגיאה, אלא אם יש ערכי ברירת מחדל ואז `X<> x;`.
- **פרמטר שאינו טיפוס:** `template <int N>` או `<class T, int size = 1>`. הערך חייב להיות קבוע בזמן קומפילציה.
- **כל הצבה היא מחלקה נפרדת:** `X<int>` ו-`X<double>` שני טיפוסים לא קשורים, גם אם `Y` יורש מ-`X`. שדות סטטיים נפרדים לכל הצבה.
- **סדר העדיפויות בבחירת פונקציה:** התאמה מדויקת של פונקציה רגילה מנצחת תבנית עם אותה התאמה. `f<int>(...)` מכריח תבנית.
- **התמחות מלאה** `template <> struct P<int,char> {...}` נותנת מימוש מיוחד להצבה ספציפית.
- **מימוש מחוץ למחלקה:** `template <class T> void abc<T>::f() {}`.
- **קוד מוצב רק כשמשתמשים:** שגיאה בגוף תבנית מופיעה רק בהצבה שמפעילה אותה, ופונקציה חברה שלא נקראת לא מוצבת.

## מתכונים

**משתנה סטטי בתבנית.** בונים רשימה: כל הצבה שונה => מונה נפרד. סופרים לפי הטיפוס (או הערך של `N`).

**האם קריאה לתבנית מתקמפלת.**
1. מסיקים `T` מכל ארגומנט. אם יוצאים טיפוסים שונים: שגיאה.
2. אם `T` לא מופיע בארגומנטים (כמו ב-`g(int n)` עם `T t = n`): חייבים לציין `<...>`.
3. בודקים שהפעולות שבגוף חוקיות עבור `T` שהוצב.

**איזו תבנית נבחרת.** המתמחה ביותר: `T*` עדיפה על `T`, `const T*` עדיפה על `T*` עבור מצביע ל-const.

## דוגמה

```cpp
#include <iostream>
using namespace std;

template <class T>
class Counted {
public:
    static int made;                   // one static per instantiation
    Counted() { cout << ++made; }
};
template <class T> int Counted<T>::made = 0;
template <int N> struct Tag { static int d; Tag() { ++d; } };
template <int N> int Tag<N>::d = 0;
template <class T = int, int size = 2>
struct Arr {
    T a[size];
    Arr(T v = 0) { for (int i = 0; i < size; i++) a[i] = v; }
    void print() const { for (int i = 0; i < size; i++) cout << a[i]; cout << " "; }
};
int main() {
    Counted<int> a, b;
    Counted<double> c;
    cout << "\n";
    Tag<0> t0, t1;
    Tag<1> t2;
    cout << Tag<0>::d << Tag<1>::d << "\n";
    Arr<> x;                 // Arr<int,2>
    Arr<char> y('A');        // Arr<char,2>
    Arr<int, 3> z(7);
    x.print(); y.print(); z.print();
    cout << "\n";
}
```

```text
121
21
00 AA 777 
```

- שורה ראשונה: `Counted<int>` נבנה פעמיים (`1`, `2`), `Counted<double>` נבנה פעם אחת עם מונה משלו (`1`). הפלט `121`.
- `Tag<0>::d` הוא 2 ו-`Tag<1>::d` הוא 1, ולכן `21`.
- `Arr<>` הוא `Arr<int,2>` עם אפסים, `Arr<char>` מדפיס `AA`, ו-`Arr<int,3>` נותן `777`.

הסקה, פונקציה רגילה מול תבנית:

```cpp
#include <iostream>
using namespace std;

template <class T>
T bigger(T a, T b) { return a > b ? a : b; }
int bigger(int a, int b) { cout << "(plain) "; return a > b ? a : b; }   // ordinary function, same name
int main() {
    cout << bigger(1, 2) << "\n";            // both fit exactly: the non-template wins
    cout << bigger(1.5, 0.5) << "\n";        // only the template matches
    cout << bigger<int>(3, 4) << "\n";       // explicit <int> forces the template
    cout << bigger<double>(1, 2.5) << "\n";  // explicit T: the int is converted
    cout << bigger('a', 'b') << "\n";
}
```

```text
(plain) 2
1.5
4
2.5
b
```

הפונקציה הרגילה נבחרת בקריאה `bigger(1,2)` (מודפס `(plain)` לפני התוצאה). עם `double` נבחרת התבנית. `bigger<int>(3,4)` מכריחה תבנית. `bigger<double>(1,2.5)` מציינת `T` במפורש ולכן ה-`int` מומר.

התמחות ובחירה בין תבניות:

```cpp
#include <iostream>
using namespace std;

template <class T, class U>
struct P { P(T, U) { cout << "general "; } };
template <>
struct P<int, char> { P(int, char) { cout << "special "; } };   // full specialization
template <class T> void h(T)        { cout << "value "; }
template <class T> void h(T*)       { cout << "pointer "; }
template <class T> void h(const T*) { cout << "const-pointer "; }
int main() {
    P<int, char> a(1, 'a');
    P<char, int> b('a', 1);
    P<double, char> c(1.5, 'a');
    cout << "\n";
    int x = 1; const int cx = 2;
    h(x);
    h(&x);
    h(&cx);
    h("abc");                // const char[4] decays to const char*
    cout << "\n";
}
```

```text
special general general 
value pointer const-pointer const-pointer 
```

`P<int,char>` משתמשת בהתמחות, שני ההצבות האחרות בתבנית הכללית. `h(&x)` מתאימה ל-`T*`, `h(&cx)` ל-`const T*`, וגם `h("abc")` (מערך שמתפרק ל-`const char*`) בוחרת `const T*`.

## מלכודות

> 🪤 **שני טיפוסים שונים לאותו `T`** (כשאין פונקציה רגילה שמתאימה אחרי המרה):

```cpp
#include <iostream>
using namespace std;

template <class T>
T bigger(T a, T b) { return a > b ? a : b; }
int main() {
    cout << bigger(1, 2) << "\n";            // T = int
    cout << bigger(1.5, 0.5) << "\n";        // T = double
    cout << bigger(1, 2.5) << "\n";          // L1: T would be int and double
}
```

```text
L1: no matching function for call to 'bigger'
```

> 🪤 **`T` שלא ניתן להסיק, וגוף שלא חוקי עבור ההצבה:**

```cpp
#include <iostream>
using namespace std;

template <class T> void f(T t) { int n = t; }        // L2 (reported here): T must convert to int
template <class T> void g(int n) { T t = n; }         // T cannot be deduced
int main() {
    f(5);               // ok
    g(5);               // L1: T cannot be deduced from the arguments
    g<double>(5);       // ok
    f("text");          // instantiates f<const char*>
}
```

```text
L1: no matching function for call to 'g'
L2: cannot initialize a variable of type 'int' with an lvalue of type 'const char *'
```

> ⚠️ **פונקציה חברה שאינה נקראת לא מוצבת,** לכן `show()` שמשתמשת ב-`v.name()` לא גורמת שגיאה כל עוד אף אחד לא קורא לה:

```cpp
#include <iostream>
using namespace std;

template <class T>
class Box {
    T v;
public:
    Box(T v) : v(v) {}
    T twice() const;
    void show() const { cout << v.name() << "\n"; }       // needs T::name(), only checked if used
    friend ostream& operator<<(ostream& os, const Box& b) { return os << "[" << b.v << "]"; }
};
template <class T>
T Box<T>::twice() const { return v + v; }                 // definition outside the class
int main() {
    Box<int> a(21);
    Box<double> b(1.25);
    cout << a << b << " " << a.twice() << " " << b.twice() << "\n";   // show() is never instantiated: fine
}
```

```text
[21][1.25] 42 2.5
```

> ⚠️ **`static` מקומי בפונקציית תבנית:** כל הצבה (`f<int>`, `f<double>`) מחזיקה משתנה סטטי נפרד (18A-A שאלה 23: `121`).

> ⚠️ **משתנה גלובלי** (לא שדה של התבנית) משותף לכל ההצבות, ולכן 18A-C שאלה 24 נותנת `123` ולא `121`.

> ⚠️ **`template <typename T>` ו-`template <class T>` זהים** בפרמטר של תבנית. שניהם מצהירים על פרמטר טיפוס, וההצבה `twice<int>(2)` (4) ו-`twice<double>(1.5)` (3) עובדת אותו דבר (24B-B שאלה 1, 25B-B שאלה 7).
