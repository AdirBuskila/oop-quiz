# העמסת אופרטורים

> 🔑 **בשורה אחת:** אופרטור הוא פונקציה בשם `operator@`. כשהאופרנד השמאלי **אינו** אובייקט של המחלקה שלכם (`2 + x`, `cout << x`) אי אפשר להגדיר אותו כחבר, וצריך פונקציה חיצונית. `<<` מחזיר `ostream&` כדי לאפשר שרשור.

## מה המבחן שואל

שאלות "מה צריך להגדיר כדי שהקוד יתקמפל":

| הקוד | ההגדרה |
|---|---|
| `x++` | חבר `operator++(int)` (פרמטר אחד, הדמה) (18A-A שאלה 9) |
| `++x` | חבר `operator++()` בלי פרמטרים (19A-C שאלה 1) |
| `x(5)` | חבר `operator()(int)` (18A-B שאלה 9) |
| `x + y` כש-`X`, `Y` שונות | חבר ב-`X`: `operator+(Y)` (18A-B שאלה 22) |
| `2 + x`, `2 << x` | **פונקציה חיצונית** `(int, X)` (18A-B שאלה 7, 18A-C שאלה 7, 19A-C שאלה 21) |
| `cout << x`, `cin >> x` | פונקציה חיצונית, לא חייבת להיות friend (18A-B שאלה 23, 19A-B שאלה 23, 19A-C שאלה 8, 21B-B שאלה 3) |
| `cout << x << x` | `ostream&` כטיפוס החזרה (18A-A שאלה 22) |

עוד:
- באילו מקרים אפשר להגדיר אופרטור בינארי כחבר: כשהאופרנד **השמאלי** הוא מהמחלקה (19A-B שאלה 22, 22B-A שאלה 9).
- כמה פרמטרים ל-`operator%` החבר: אחד (23S-A שאלה 8). חתימת `++` אחרי: `T operator++(int)` (22S-B שאלה 13).
- הפלט של `+=` בירושה עם המרה ל-`(X&)` (22B-A שאלה 12).
- שגיאות בקוד עם `++Num(3)`, `Num(6)++`, `++ca` על אובייקט const: שגיאה אחת (`25S-A-Q16`).
- תבנית `operator<<` כ-friend (22S-B שאלות 9 ו-10, 23S-A שאלה 4).
- `x = 5` על מחלקה בלי בנאי המרה (18A-A שאלה 8).

## הגדרות

- **חבר:** `A A::operator+(const B&)`. האופרנד השמאלי הוא `*this`.
- **חיצוני:** `A operator+(const A&, const B&)`. שני האופרנדים הם פרמטרים. צריך `friend` רק אם הוא ניגש לפרטי.
- **חייבים להיות חברים:** `=`, `[]`, `()`, `->`.
- **אי אפשר להעמיס:** `::`, `.`, `.*`, `?:`, `sizeof`.
- **++ ו--:** קידומת `operator++()` מחזירה `T&` (האובייקט אחרי השינוי). סיומת `operator++(int)` מחזירה `T` בערך (העותק הישן), והפרמטר `int` הוא דמה.
- **`operator<<(ostream&, const X&)`** מחזיר `ostream&` (את אותו `os`).
- **השמה:** `T& operator=(const T&)`. אופרטורים שמשנים (`+=`) כחברים ומחזירים `*this`.
- הקומפיילר **לא** מייצר `!=` מ-`==`, ולא `>` מ-`<`.
- שרשרת אופרטורים מתבצעת משמאל לימין: `(cout << a) << b` ולכן `cout << a` חייב להחזיר משהו ש-`<< b` מקבל.

## מתכונים

1. מזהים את הטיפוס של האופרנד השמאלי. אם הוא לא המחלקה: חיצוני.
2. מזהים אם צריך לשרשר: מחזירים הפניה לאופרנד השמאלי.
3. לקידומת/סיומת מסתכלים על הפרמטר: בלי = קידומת, עם `int` = סיומת.
4. אם נגשים לשדות פרטיים מפונקציה חיצונית: `friend`.

## דוגמה

```cpp
#include <iostream>
using namespace std;

class V2 {
    int x, y;
public:
    V2(int x = 0, int y = 0) : x(x), y(y) {}
    V2& operator+=(const V2& o) { x += o.x; y += o.y; return *this; }   // member: changes the left operand
    V2& operator++() { ++x; ++y; return *this; }                         // prefix: returns the new object
    V2 operator++(int) { V2 old = *this; ++x; ++y; return old; }         // postfix: dummy int, returns the old value
    int& operator[](int i) { return i == 0 ? x : y; }
    int operator()(int k) const { return x * k + y; }                    // function-call operator
    friend ostream& operator<<(ostream& os, const V2& v) {               // must be a non-member
        return os << "(" << v.x << "," << v.y << ")";
    }
};
V2 operator+(V2 a, const V2& b) { return a += b; }     // non-member: both operands can convert
int main() {
    V2 a(1, 2), b(10, 20);
    cout << a + b << "\n";
    a += b;
    cout << a << " " << a++ << " " << a << " " << ++a << "\n";
    a[0] = 0;
    cout << a << " " << a(2) << "\n";
    cout << 5 + V2(1, 1) << "\n";                       // V2(int) converts 5, so a non-member works
}
```

```text
(11,22)
(11,22) (11,22) (12,23) (13,24)
(0,24) 24
(6,1)
```

- `a + b` נותן `(11,22)` (האופרטור החיצוני).
- `a += b` משנה את `a` ל-`(11,22)`.
- בשורה הבאה: מודפס `a` (11,22), אחר כך `a++` מדפיסה את הערך הישן `(11,22)` ו-`a` הופך ל-`(12,23)`, ואז `a` מדפיסה `(12,23)`, ו-`++a` מדפיסה `(13,24)`.
- `5 + V2(1,1)` עובד כי `5` מומר ל-`V2(5,0)` בבנאי, ופונקציה חיצונית מאפשרת המרה לאופרנד השמאלי.

## מלכודות

> 🪤 **`2 + x` עם אופרטור חבר:** האופרנד השמאלי הוא `int`, לכן אין מועמד:

```cpp
#include <iostream>
using namespace std;

struct X {
    int v;
    X(int v = 0) : v(v) {}
    X operator+(int n) const { return X(v + n); }        // member: left operand must be an X
};
int main() {
    X x(1);
    X a = x + 2;       // ok: x.operator+(2)
    X b = 2 + x;       // L1: left operand is an int, a member cannot be chosen
}
```

```text
L1: invalid operands to binary expression ('int' and 'X')
```

> 🪤 **`<<` שמחזיר `void`** מאפשר שימוש אחד בלבד. לשרשרת:

```text
L1: invalid operands to binary expression ('void' and 'X')
```

(גם `ostream*` שמוחזר לא יעבוד בשרשרת, אבל `cout << X();` בודד תקין עם כל אחת מהחתימות, 21B-B שאלה 19.)

> 🪤 **אופרטורים לא חופפים:**

```text
L1: invalid operands to binary expression ('Wrap' and 'Wrap')
L2: invalid operands to binary expression ('Wrap' and 'Wrap')
```

> ⚠️ **קידומת וסיומת על זמני ועל const.**

```cpp
#include <iostream>
using namespace std;

struct Num {
    int v;
    Num(int x = 0) : v(x) {}
    Num& operator++()    { ++v; return *this; }
    Num  operator++(int) { Num t = *this; ++v; return t; }
};
int main() {
    Num a(2);
    ++a;
    a++;
    ++Num(3);          // ok: a member function may be called on a temporary
    Num(6)++;          // ok for the same reason
    const Num ca(5);
    ++ca;              // L1: operator++ is not const
}
```

```text
L1: cannot increment value of type 'const Num'
```

`++Num(3)` ו-`Num(6)++` מתקמפלות כי פונקציה חברה רגילה מותר להפעיל על אובייקט זמני. השגיאה היחידה היא על האובייקט ה-const.

> ⚠️ **הגדרת בנאי מבטלת את בנאי ברירת המחדל,** ולכן "להגדיר בנאי" אינה הפתרון ל-`X x; x = 5;` (18A-A שאלה 8). מה שעוזר הוא אופרטור השמה שמקבל `int` (פונקציה שאיננה בנאי עם פרמטר אחד).
