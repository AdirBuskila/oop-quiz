# const והפניות לזמניים

> 🔑 **בשורה אחת:** `const` אומר "לא משנים דרך השם הזה". פונקציה חברה `const` לא משנה שדות (`this` שלה הוא `const X*`), שדה `const` והפניה חברה חייבים אתחול ברשימת האתחול, וערך זמני נקשר רק ל-`const T&`.

## מה המבחן שואל

הנושא הנפוץ ביותר בצורת "כמה שורות לא מתקמפלות":

- שדות `const` ופונקציות `const`: מי מהשורות `x = 1;` ו-`y = 1;` בפונקציה רגילה ובפונקציה `const` נכשלת (18A-A שאלות 19, 24; 18A-B שאלה 25; 18A-C שאלה 25).
- בנאים שלא מאתחלים שדה `const` או הפניה (18A-B שאלה 4, 18A-C שאלה 4) ומחלקה עם שדה הפניה שאין לה בנאי (18A-A שאלה 20).
- הטיפוס של `this` בפונקציה `const`: `const A*` (18A-A שאלה 6, 19A-B שאלה 7, 19A-C שאלה 4).
- הבדל בין `const int*` ל-`int* const` (18A-A שאלה 7, 19A-B שאלה 18).
- מה אפשר להחזיר מפונקציה `const` (19A-A שאלה 10, 19A-B שאלה 13).
- העמסה לפי `const`: אובייקט const קורא רק לגרסת ה-`const`, אובייקט רגיל לגרסה הרגילה (19A-A שאלה 14, 23B-B שאלה 12, 23S-A שאלה 12).
- האם אפשר לבצע השמה לשדה `const`: רק באתחול ברשימת האתחול (19A-A שאלה 11).
- הפניות וזמניים: `f1(2, 3)` עם `int&` לא מתקמפלת (21B-B שאלה 6), בנאי העתקה שאינו const מול `const T` (`25S-A-Q15`).

## הגדרות

- **`const int* p`** ו-**`int const* p`:** מצביע לערך const. `*p = 1` אסור, `p = &b` מותר.
- **`int* const p`:** מצביע const. `*p = 1` מותר, `p = &b` אסור.
- **`const int* const p`:** שניהם אסורים.
- **פונקציה חברה `const`** `void f() const`: אסור לשנות שדות לא-`mutable`, ואסור לקרוא בה לפונקציה לא-const של אותו אובייקט. אפשר לקרוא לה על אובייקט const ועל אובייקט רגיל.
- **שדה `const` או הפניה** חייבים להיות מאותחלים ברשימת האתחול של **כל** בנאי (לא בגוף).
- **הפניה לא-const** `T&` נקשרת רק ל-lvalue. **`const T&`** נקשרת גם לערך זמני וזה מאריך את חייו עד סוף ההפניה.
- **העמסה לפי const:** `show() const` ו-`show()` הן שתי פונקציות שונות. הבחירה לפי האובייקט הקורא.

## מתכונים

**כמה שורות לא מתקמפלות.**
1. מסמנים אילו משתנים הם const (או מצביע/הפניה ל-const).
2. עוברים שורה שורה: האם יש כתיבה (`=`, `++`, העברה לפונקציה שמקבלת הפניה רגילה)?
3. בתוך פונקציה `const` כל שדה נחשב const.

**איזו העמסה נבחרת.** אובייקט `const` => רק הגרסה `const`. אובייקט רגיל => הגרסה הרגילה אם קיימת, אחרת ה-`const`.

**מה אפשר להחזיר מפונקציה const.** בתוך פונקציה const שדה כמו `K` הוא const, ולכן `&K` הוא `const int*`: מתאים רק לטיפוס החזרה `const int*`. `new int(...)` יוצר אובייקט חדש ומתאים ל-`int*`.

## דוגמה

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 1, b = 2;
    const int* p1 = &a;       // pointer to const int
    int* const p2 = &a;       // const pointer to int
    const int* const p3 = &a; // both
    p1 = &b;                  // ok: the pointer may move
    *p1 = 5;                  // L1
    *p2 = 5;                  // ok: the pointee may change
    p2 = &b;                  // L2
    p3 = &b;                  // L3
    *p3 = 5;                  // L4
}
```

```text
L1: read-only variable is not assignable
L2: cannot assign to variable 'p2' with const-qualified type 'int *const'
L3: cannot assign to variable 'p3' with const-qualified type 'const int *const'
L4: read-only variable is not assignable
```

כל ארבע השגיאות הן ניסיון לשנות דרך שם שהוגדר const, ושורה `p1 = &b;` תקינה כי המצביע עצמו לא const.

שדות ופונקציות:

```cpp
#include <iostream>
using namespace std;

struct X {
    int x;
    const int y;
    int& r;
    X(int a) : x(1), y(2), r(x) {}      // ok: const and reference members are initialized here
    X(int a, int b) { x = 1; }          // L1
    void g() const { x = 1; }           // L2
    void h() { y = 1; }                 // L3
};
int main() {}
```

```text
L1: constructor for 'X' must explicitly initialize the const member 'y'
L1: constructor for 'X' must explicitly initialize the reference member 'r'
L2: cannot assign to non-static data member within const member function 'g'
L3: cannot assign to non-static data member 'y' with const-qualified type 'const int'
```

העמסה לפי const ו-`this`:

```cpp
#include <iostream>
using namespace std;

struct Box {
    int n;
    Box(int n = 0) : n(n) {}
    void show() const { cout << "const:" << n << " "; }
    void show()       { cout << "plain:" << n * 2 << " "; }
    const Box* self() const { const Box* p = this; return p; }   // this is const Box* here
};
int main() {
    Box a(2);
    const Box b(3);
    a.show();        // non-const object picks the non-const overload
    b.show();        // const object can only use the const overload
    cout << (b.self() == &b) << "\n";
}
```

```text
plain:4 const:3 1
```

האובייקט הרגיל `a` קורא לגרסה הרגילה (`2*2=4`), האובייקט const `b` לגרסת ה-const (`3`).

## מלכודות

> 🪤 **פרמטר זמני.** `const T&` מקבלת גם זמני, `T&` לא:

```cpp
#include <iostream>
using namespace std;

void f(int&)       { cout << "int& "; }
void f(const int&) { cout << "const int& "; }
int main() {
    int y = 7;
    const int cy = 7;
    f(y);              // best match: non-const lvalue
    f(cy);             // only the const overload fits
    f(5);              // a temporary cannot bind to int&
    f(y + 1);
    cout << "\n";
    const int& r = y + 1;      // legal: the temporary lives as long as r
    cout << r << "\n";
    y = 100;
    cout << r << "\n";         // r refers to the temporary, not to y
}
```

```text
int& const int& const int& const int& 
8
8
```

`f(y)` בוחרת `int&`. `f(cy)`, `f(5)` ו-`f(y+1)` נכנסות ל-`const int&`. ההפניה `r` מחזיקה את הזמני, ולכן לא משתנה כש-`y` משתנה.

> 🪤 **פונקציה שמקבלת `int&` לא מקבלת מספר.**

```text
L1: no matching function for call to 'big'
L2: non-const lvalue reference to type 'int' cannot bind to a temporary of type 'int'
```

> ⚠️ **`int*` ו-`const int*`:** השמה `int* p = &constVar` לא תקינה (הוצאת const). השמה `const int* q = &nonConst` תקינה.

> ⚠️ **`this` בפונקציה const** הוא מצביע ל-const, לכן `X x = this;` בתוכה דורש `const X*`.
