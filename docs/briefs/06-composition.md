# הכלה וסדר אתחול

> 🔑 **בשורה אחת:** מחלקה יכולה להכיל אובייקטים של מחלקות אחרות כשדות ("יש" = composition). שדות מאותחלים **לפי סדר ההצהרה** במחלקה, לא לפי הסדר ברשימת האתחול. שדה בלי בנאי ברירת מחדל חייב להופיע ברשימת האתחול.

## מה המבחן שואל

- מתי רשימת האתחול לא יכולה להיות ריקה: כשיש שדה `const`, שדה הפניה, או מחלקת אב בלי בנאי ברירת מחדל. שלושת המקרים נכונים (19A-A שאלה 12).
- סדר האתחול: `A() : y(++n), x(++n)` כש-`x` הוכרז לפני `y` מדפיס `12` (19A-B שאלה 21, 19A-C שאלה 22).
- כמה פעמים נקרא בנאי של שדה כשמבצעים `onx = X(i)` בגוף הבנאי: פעמיים (19A-B שאלה 16, פלט `11`).
- הדפסות בנאים של בסיס ושדה: `D(int n) : B(n) { b = B(-n); ... }` (22B-A שאלה 7); `Y` עם שדה `X Xy` (22B-A שאלה 11); `B` יורשת מ-`A` ומכילה `C` (22S-B שאלה 8).
- מבנה מחלקות מתאים: ירושה ("הוא") לעומת הכלה ("יש"); מערך חדרים בדירה (20B-A שאלות 11 ו-13, 21B-B שאלה 13).
- מצביע הדדי בין שתי מחלקות אפשרי (21B-B שאלה 18).

## הגדרות

- **הכלה** (composition): שדה מטיפוס מחלקה. השדה נבנה לפני גוף הבנאי של המחלקה המכילה ונהרס אחריו.
- **ירושה מול הכלה:** ירושה כשיש יחס "הוא" (תפוז הוא פרי). הכלה כשיש יחס "יש" (דירה יש לה חדרים).
- **רשימת אתחול:** האתחול של שדות ושל מחלקת האב. אם שדה לא ברשימה, נקרא בנאי ברירת המחדל שלו.
- **סדר:** קודם מחלקות האב (לפי סדר ברשימת הירושה), אחר כך שדות לפי סדר ההצהרה, ובסוף גוף הבנאי.
- **הצהרה מקדימה** `class B;` מאפשרת לשתי מחלקות להחזיק מצביעים זו לזו.

## מתכונים

**סדר הדפסות.** כותבים את סדר ההצהרה של השדות, מתעלמים מהסדר ברשימת האתחול. ההדפסות: בסיס, שדות לפי הצהרה, גוף.

**שדה שמוצב בגוף.** `part = X(5);` בגוף: קודם בנאי ברירת מחדל (או עם ערך ברירת המחדל), ואז בנאי של הזמני `X(5)`, ואז השמה. ברשימת האתחול: בנאי אחד.

**שדה בלי בנאי ברירת מחדל.** חובה לאתחל אותו ברשימה, אחרת שגיאה.

## דוגמה

```cpp
#include <iostream>
using namespace std;

struct Part {
    Part(int t) { cout << "Part" << t << " "; }
};
struct Whole {
    Part second;       // declared first
    Part first;        // declared second
    Whole() : first(1), second(2) { cout << "Whole\n"; }   // the list order is ignored
};
int n = 0;
struct A {
    int x;
    int y;
    A() : y(++n), x(++n) { cout << x << y << "\n"; }
};
int main() {
    Whole w;
    A a;
}
```

```text
Part2 Part1 Whole
12
```

השדה `second` מוצהר ראשון, לכן `Part2` מודפס לפני `Part1`. בבנאי של `A` השדה `x` מוצהר לפני `y`, לכן `x` מקבל 1 ו-`y` מקבל 2, והפלט `12`.

אתחול בגוף לעומת ברשימה:

```cpp
#include <iostream>
using namespace std;

struct X {
    int nx;
    X(int i = 0) : nx(i) { cout << "X(" << i << ") "; }
};
struct Y {
    X part;
    Y() { part = X(5); }             // part is built first with 0, then assigned
};
struct Z {
    X part;
    Z() : part(5) {}                 // built once, directly with 5
};
int main() {
    cout << "Y: ";  Y y;  cout << "\n";
    cout << "Z: ";  Z z;  cout << "\n";
}
```

```text
Y: X(0) X(5) 
Z: X(5) 
```

## מלכודות

> 🪤 **שדה בלי בנאי ברירת מחדל:**

```cpp
#include <iostream>
using namespace std;

struct X {
    int nx;
    X(int i = 0) : nx(i) { cout << "X(" << i << ") "; }
};
struct NoDefault {
    NoDefault(int) {}
};
struct Holder {
    NoDefault nd;
    Holder() {}                      // L1: nd has no default constructor
};
struct Holder2 {
    NoDefault nd;
    Holder2() : nd(1) {}             // ok
};
int main() {}
```

```text
L1: constructor for 'Holder' must explicitly initialize the member 'nd' which does not have a default constructor
```

> ⚠️ **רשימת האתחול לא קובעת סדר.** `Whole() : first(1), second(2)` עדיין בונה את `second` ראשון אם הוא הוצהר ראשון.

> ⚠️ **שימוש בשדה שעוד לא אותחל:** `Pair(int n) : y(n), x(y+1)` כש-`x` הוצהר ראשון, `y` עדיין זבל.

> ⚠️ **ירושה במקום הכלה.** מחלקה `Apartment` לא יורשת מ-`Room`. אוסף חדרים בדירה הוא `vector<Room>` או מערך שדות, ויחס "הוא" רק בין סוגי חדרים לבין `Room`.
