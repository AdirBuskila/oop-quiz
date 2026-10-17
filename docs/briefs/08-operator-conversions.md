# בנאי המרה ואופרטור המרה

> 🔑 **בשורה אחת:** יש שתי דרכים להגדיר המרה מוגדרת-משתמש: **בנאי עם פרמטר אחד** (המרה *אל* המחלקה) ו-**`operator T()`** (המרה *מן* המחלקה, בלי טיפוס החזרה). בהמרה אוטומטית מותרת רק המרה אחת מוגדרת-משתמש בשרשרת, ו-`explicit` מבטל את האוטומטיות של הבנאי.

## מה המבחן שואל

- `X x = 5;` או `X x(5);`: דרוש בנאי עם פרמטר (18A-B שאלה 8, 18A-C שאלה 8).
- `int n = x;`: דרוש אופרטור המרה `operator int()`, "פונקציה שאיננה בנאי" (19A-C שאלה 2).
- מחלקה עם `operator int()` שמשתתפת בקריאה לתבנית (23B-B שאלה 5) ובשורות כמו `int i = a1;` (23S-A שאלה 13).
- המרה כפולה בין `A` ו-`B`: ל-`A` יש `operator B()` ול-`B` יש בנאי מ-`A`: הצהרה ישירה `B b1(a1)` תקינה, אבל השמה `b1 = a1` עמומה (25S-A שאלה 1, מוחזקת בבנק; הקומפיילר כאן מדווח על עמימות ב-`b1 = a1`).
- בנאי `X(int)` ביחד עם השמה `x = 5` שבה נוצר זמני (18A-A שאלה 8).

## הגדרות

- **בנאי המרה:** בנאי שאפשר לקרוא לו בארגומנט אחד, כולל בנאי עם ערכי ברירת מחדל. הוא מגדיר המרה אוטומטית. `explicit` מונע אותה: מותר `Strict s(1)`, אסור `Strict s = 1`.
- **אופרטור המרה:** `operator double() const;` בתוך המחלקה. אין טיפוס החזרה, אין פרמטרים.
- **כלל המרה אחת:** בשרשרת המרות אוטומטית יכולה להיות לכל היותר המרה אחת מוגדרת-משתמש, ולפניה/אחריה המרות רגילות (`int` ל-`double`).
- **עמימות:** אם שני מסלולים שווים (בנאי של `B` מ-`A` מול `operator B` של `A`), הקומפיילר מדווח עמימות.
- ההמרות "בלתי תלויות": אפשר להגדיר אחת בלי השנייה, או שתיהן.

## מתכונים

1. רואים אילו טיפוסים משתתפים: `X x = 5` => צריך לעבור מ-`int` ל-`X`: בנאי.
2. `int n = x` => מ-`X` ל-`int`: `operator int()`.
3. אם נראית שרשרת `A` ל-`B` ל-`C`: סופרים המרות מוגדרות-משתמש. שתיים או יותר => שגיאה.
4. אם גם `operator B` וגם בנאי `B(A)` קיימים והמטרה `B`: עמימות בהעתקת-אתחול.

## דוגמה

```cpp
#include <iostream>
using namespace std;

struct Meters {
    double m;
    Meters(double m = 0) : m(m) { cout << "ctor "; }          // converting constructor
};
void show(Meters x) { cout << x.m << "\n"; }
int main() {
    Meters a = 5;            // implicit conversion int -> double -> Meters
    show(7);                 // the argument is converted to a temporary Meters
    a = 9;                   // converts 9 to a temporary, then the implicit assignment
    cout << a.m << "\n";
}
```

```text
ctor ctor 7
ctor 9
```

- `Meters a = 5;` מומר ל-`Meters` דרך בנאי ההמרה (`ctor`).
- `show(7)` יוצר זמני (`ctor`) ואז מדפיס `7`.
- `a = 9;` יוצר זמני `Meters(9)` (`ctor`) ומשים אותו, ואז `9`.

אופרטור המרה:

```cpp
#include <iostream>
using namespace std;

class Fraction {
    int n, d;
public:
    Fraction(int n, int d) : n(n), d(d) {}
    operator double() const { return double(n) / d; }     // conversion operator: no return type
};
int main() {
    Fraction f(3, 4);
    double x = f;              // implicit conversion
    int i = f;                 // double -> int is also applied (a standard conversion after it)
    cout << x << " " << i << " " << f + 1 << "\n";
}
```

```text
0.75 0 1.75
```

`double x = f;` נותן `0.75`; `int i = f;` נותן `0` (המרה כפולה `Fraction` ל-`double` ל-`int`, כשהשנייה סטנדרטית), ו-`f + 1` נעשה בחשבון `double`: `1.75`.

## מלכודות

> 🪤 **`explicit`:**

```cpp
#include <iostream>
using namespace std;

struct Strict {
    explicit Strict(int) { cout << "strict "; }
};
int main() {
    Strict s1(1);            // direct initialization is fine
    Strict s3 = Strict(2);   // ok
    Strict s2 = 1;           // L1: explicit forbids copy-initialization
}
```

```text
L1: no viable conversion from 'int' to 'Strict'
```

> 🪤 **שתי המרות מוגדרות-משתמש בשרשרת:**

```cpp
#include <iostream>
using namespace std;

struct A {};
struct B { B(A) {} };
struct C { C(B) {} };
void takeB(B) {}
void takeC(C) {}
int main() {
    A a;
    takeB(a);          // ok: one user-defined conversion A -> B
    takeC(B(a));       // ok: B -> C is one conversion
    takeC(a);          // L1: A -> B -> C needs two user-defined conversions
}
```

```text
L1: no matching function for call to 'takeC'
```

> 🪤 **עמימות בין בנאי לאופרטור המרה.** `B b1(a1)` (אתחול ישיר) רק בנאים של `B` נבחנים ותקין:

```cpp
#include <iostream>
using namespace std;

struct B;
struct A {
    int a;
    A(int a = 0) : a(a) {}
    operator B() const;
};
struct B {
    int b;
    B(const A& a) : b(a.a) { cout << "B ctor "; }
};
A::operator B() const { cout << "A::operator B "; return B(*this); }
int main() {
    A a1(4);
    B b1(a1);          // direct initialization: only B's constructors are considered
    cout << "\n";
}
```

```text
B ctor 
```

אבל `B b2 = a1;` עמומה:

```text
L1: conversion from 'A' to 'B' is ambiguous
```

> ⚠️ **אופרטור המרה לא מקבל טיפוס החזרה** (הוא חלק מהשם). ובשאלות שבהן הוא מוזכר, ההמרה יכולה להתבצע גם בקריאה לתבנית כשהטיפוס נתון במפורש.
