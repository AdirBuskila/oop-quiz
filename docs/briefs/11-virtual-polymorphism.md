# פונקציות וירטואליות, פולימורפיזם וחיתוך

> 🔑 **בשורה אחת:** קריאה לפונקציה **וירטואלית** דרך מצביע או הפניה נבחרת לפי **הטיפוס האמיתי** של האובייקט (בזמן ריצה). קריאה לפונקציה רגילה, או על אובייקט בערך, נבחרת לפי **הטיפוס המוצהר** (בזמן קומפילציה).

## מה המבחן שואל

- `X *p = &y; p->f();` עם `f` וירטואלית באב (18A-A שאלה 15: `2`), וירטואלית רק בנגזרת (18A-B שאלה 13: `1`), בשניהם (18A-C שאלה 13).
- פונקציה `g(A &a)` מול `g(A a)` עם `f` וירטואלית: בהפניה נבחר הסוג האמיתי, בערך נחתך ויוצא `A` (19A-A שאלה 17, 19A-B שאלה 5, 19A-C שאלה 18).
- שלוש קריאות על אובייקט, מצביע לנגזרת ומצביע לאב (19A-A שאלה 18, 19A-B שאלה 9).
- מערך מצביעים לאב עם אובייקטים שונים ושתי פונקציות, אחת וירטואלית ואחת לא (20B-A שאלה 15: `1232`).
- מתי `ptr->myRun()` יכולה להפעיל פונקציות שונות (20B-A שאלה 14).
- אילו פונקציות לא יכולות להיות וירטואליות: בנאי (21B-B שאלה 9). העמסות מעורבות וירטואליות/לא (21B-B שאלה 20: `32`).
- טבלה וירטואלית: נוצרת למחלקה עם לפחות פונקציה וירטואלית אחת (22S-B שאלה 3).
- פלט עם קריאה וירטואלית מתוך בנאי/הורס (22B-A שאלה 3), וערכי ברירת מחדל בפונקציה וירטואלית (22S-B שאלה 2).
- קריאה מוגדרת `bptr2->B::f()` (`25S-A-Q3`: `1 3 2`), `p->f()` שמגיע לגרסה בנגזרת (23B-B שאלה 4, 23B-B שאלה 10).

## הגדרות

- **`virtual`** באב: כל פונקציה בנגזרת עם **אותה חתימה** (אותו שם, אותם פרמטרים, אותו `const`) דורסת (override) אותה אוטומטית, גם בלי לכתוב `virtual` שוב. `override` בסוף חתימה מבקש מהקומפיילר לוודא שזו באמת דריסה.
- **קשירה דינמית** רק דרך מצביע או הפניה. אובייקט בערך תמיד סטטי.
- **חיתוך (slicing):** העתקת נגזרת לאובייקט אב בערך (פרמטר, `A a = *p`, `vector<A>`) משאירה רק חלק האב.
- **טבלה וירטואלית (vtable):** לכל מחלקה עם פונקציה וירטואלית טבלה של כתובות הפונקציות; לכל אובייקט מצביע נסתר אליה. הבחירה בריצה היא קריאה דרך הטבלה.
- **הורס וירטואלי** באב נחוץ ל-`delete` דרך מצביע לאב.
- **`p->Base::f()`** (שם מלא) מבטל את הקשירה הדינמית וקורא לגרסת `Base`.
- **ערכי ברירת מחדל** נקבעים בזמן קומפילציה לפי הטיפוס המוצהר, גם כשהגוף הוא של הנגזרת.
- **בנאי** לא יכול להיות וירטואלי; **הורס** יכול ורצוי.

## מתכונים

לכל קריאה `p->f()`:
1. הטיפוס המוצהר של `p` (`A*`) ושל האובייקט בפועל (`B`).
2. האם `f` וירטואלית ב-`A`? לא => `A::f`. כן => הגרסה של הטיפוס בפועל.
3. אם הקריאה על אובייקט (לא מצביע/הפניה) => גרסת הטיפוס המוצהר.
4. אם יש `Base::` => גרסת `Base`.
5. אם ה-`f` בנגזרת עם חתימה שונה (חסר `const` או פרמטר אחר) זו פונקציה חדשה ולא דריסה.

## דוגמה

```cpp
#include <iostream>
using namespace std;

struct A {
    void plain()         { cout << "A::plain "; }
    virtual void virt()  { cout << "A::virt "; }
};
struct B : A {
    void plain()         { cout << "B::plain "; }
    void virt()          { cout << "B::virt "; }      // overrides A::virt
};
void byRef(A& a)   { a.plain(); a.virt(); cout << "| "; }
void byPtr(A* a)   { a->plain(); a->virt(); cout << "| "; }
void byValue(A a)  { a.plain(); a.virt(); cout << "| "; }   // slicing: a copy of the A part
int main() {
    B b;
    b.plain(); b.virt(); cout << "| ";     // static type B
    byRef(b);
    byPtr(&b);
    byValue(b);
    cout << "\n";
}
```

```text
B::plain B::virt | A::plain B::virt | A::plain B::virt | A::plain A::virt | 
```

- `b.plain(); b.virt()` על `B` עצמו: `B::plain B::virt`.
- דרך הפניה או מצביע ל-`A`: `plain` נבחרת לפי `A` (לא וירטואלית), `virt` לפי `B`.
- `byValue` מקבלת עותק `A` (חיתוך): `A::plain A::virt`.

ערכי ברירת מחדל נקבעים סטטית:

```cpp
#include <iostream>
using namespace std;

struct A {
    virtual void f(int i = 7) const { cout << "A::f" << i << " "; }
};
struct B : A {
    void f(int i = 9) const { cout << "B::f" << i << " "; }
};
int main() {
    B b;
    A* p = &b;
    p->f();          // body chosen at run time (B), default argument chosen at compile time (A's 7)
    b.f();           // static type B: B's default
    p->f(1);
    cout << "\n";
}
```

```text
B::f7 B::f9 B::f1 
```

## מלכודות

> 🪤 **חתימה שונה = לא דריסה.** בלי `const` ב-`B::f` זו פונקציה חדשה ו-`A* p; p->f(1)` מפעילה את `A::f`. עם `override` אפשר לגלות את זה בקומפילציה:

```cpp
#include <iostream>
using namespace std;

struct A {
    virtual void f(int) const { cout << "A::f "; }
};
struct B : A {
    void f(int) { cout << "B::f "; }            // forgot const: a NEW function, not an override
};
struct C : A {
    void f(int) const override { cout << "C::f "; }   // override makes the compiler check
};
int main() {
    B b; C c;
    A* p = &b; p->f(1);
    p = &c;    p->f(1);
    cout << "\n";
}
```

```text
A::f C::f 
```

```cpp
#include <iostream>
using namespace std;

struct A {
    virtual void f(int) const {}
};
struct D : A {
    void f(int) override { cout << "D::f "; }   // L1: does not override anything
};
int main() {}
```

```text
L1: non-virtual member function marked 'override' hides virtual member function
```

> 🪤 **שם מלא וחיתוך מבטלים וירטואליות:**

```cpp
#include <iostream>
using namespace std;

struct A {
    virtual void f() { cout << "A "; }
};
struct B : A {
    void f() { cout << "B "; }
};
int main() {
    A* p = new B;
    p->f();          // virtual call: B
    p->A::f();       // qualified name switches the dispatch off: A
    A a = *p;        // slicing: a is a plain A
    a.f();
    A& r = *p;
    r.f();
    cout << "\n";
}
```

```text
B A A B 
```

הקריאה הרגילה בוחרת `B`; `p->A::f()` בוחרת `A`; ההעתקה `A a = *p` חותכת ו-`a.f()` נותנת `A`; הפניה שומרת על `B`.

> 🪤 **`vector<Shape>` חותך.** אוסף של אובייקטים בערך מאבד את הסוג האמיתי, אוסף של מצביעים לא:

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Shape {
    virtual double area() const { return 0; }
    virtual ~Shape() {}
};
struct Sq : Shape {
    double s;
    Sq(double s) : s(s) {}
    double area() const { return s * s; }
};
int main() {
    vector<Shape> byValue;           // stores Shape objects: every Sq is sliced
    byValue.push_back(Sq(3));
    vector<Shape*> byPtr;            // stores pointers: dynamic type is kept
    byPtr.push_back(new Sq(3));
    cout << byValue[0].area() << " " << byPtr[0]->area() << "\n";
    delete byPtr[0];
}
```

```text
0 9
```

> ⚠️ **הקריאה לפונקציה שאינה וירטואלית דרך מצביע לאב** (בקוד כמו `X *p = &y; p->f();` כש-`f` לא וירטואלית באב) תמיד תפעיל את גרסת האב, גם אם הנגזרת מגדירה `virtual` (18A-B שאלה 13: `1`).

> ⚠️ **ב-`p[0].f(2,3)` כש-`p` הוא `A*`** הקומפיילר בודק מול `A::f`. אם ב-`A::f` יש פרמטר אחד, שני ארגומנטים הם שגיאה, גם אם בנגזרת יש יותר (22S-B שאלה 2: "התכנית לא מתקמפלת").
