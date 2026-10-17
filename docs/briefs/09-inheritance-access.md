# ירושה והרשאות גישה

> 🔑 **בשורה אחת:** מחלקה נגזרת מקבלת את החברים של האב, אבל הגישה אליהם מוגבלת לפי **ההרשאה במקור** ולפי **מצב הירושה**. `private` של האב לא נגיש לנגזרת בשום ירושה. מצב הירושה רק *מוריד* הרשאות: `public` נשאר, `protected` מוריד ל-`protected`, `private` מוריד הכול ל-`private`.

## מה המבחן שואל

- מי רשאי לגשת לשדה `f`: `public` לכולם, `protected` לאב ולנגזרות, `private` רק לאב (18A-A שאלות 10, 12; 18A-B שאלות 10, 11; 19A-C שאלה 9, 22S-B שאלה 6).
- מה `f` עושה בנגזרת: `class Y : protected X` ולכן `f` נגיש ב-`Y` ובנגזרות של `Y` (18A-A שאלה 10).
- אילו שורות לא מתקמפלות כשיש `class B : protected A` וקריאות מ-`main` (19A-B שאלה 11, 25S-A שאלה 7) או `class Y : private X`.
- מה נגזרת פרטית יכולה לגשת (19A-B שאלה 6), מה נשאר נגיש בשרשרת `X, Y: private, Z, W` (22B-A שאלה 5), "ירושה פרטית: כל החברים חוץ מפרטיים נגישים בתוך הנגזרת" (23S-A שאלה 7), מי רואה מה בשרשרת `protected` (23B-B שאלה 3).
- המרות בין אב לבן: `p = &b` מותר, `q = &a` אסור, `a = b` מותר (חיתוך), `b = a` אסור (19A-B שאלה 19, `25S-A-Q2`). `X &x = y` => `Y` יורשת מ-`X` (18A-C שאלה 21).
- קריאה לפונקציה של האב מתוך נגזרת: `X::f()` (18A-A שאלה 17) ו-`this->X::f()`, `y1.X::f()` (19A-A שאלה 15, 21B-B שאלה 5).
- שימוש בשדות של מחלקה שעדיין לא הוגדרה (`25S-A-Q8`) ופונקציה friend של נגזרת מול שדות האב (`25S-A-Q9`).

## הגדרות

| הרשאה באב | `public` ירושה | `protected` ירושה | `private` ירושה |
|---|---|---|---|
| public | public | protected | private |
| protected | protected | protected | private |
| private | לא נגיש | לא נגיש | לא נגיש |

- **נגיש בנגזרת (מתוך פונקציות חברות):** public ו-protected של האב, בכל מצב ירושה. מבחוץ (`main`): רק מה שנשאר `public` אחרי הטבלה.
- **ירושה ציבורית = "הוא":** מותר להמיר מצביע/הפניה לנגזרת למצביע/הפניה לאב (up-cast). בכיוון ההפוך צריך המרה מפורשת (`static_cast`). בירושה protected/private אין המרה אוטומטית מחוץ למחלקה.
- **חיתוך (slicing):** `b = d` מעתיקה רק את חלק האב. `d = b` לא מתקמפלת כי אין מאיפה למלא את חלק הנגזרת.
- **הסתרה:** פונקציה בנגזרת באותו שם מסתירה **את כל** ההעמסות של האב. פונייה לאב: `Base::f()`, או `using Base::f;` להחזרת ההעמסות.
- **`this->X::f()`** קורא לפונקציה של האב על אותו אובייקט.

## מתכונים

1. לכל שימוש בשדה/פונקציה: מי קורא (פונקציה של הנגזרת, חיצונית, friend), ומה ההרשאה בטבלה.
2. לשורת השמה/מצביע: מעבירים לכיוון אב (מותר, ירושה ציבורית) או נגזרת (אסור בלי cast).
3. כשיש שמות זהים בנגזרת ובאב: הנגזרת מסתירה. כדי להגיע לאב כותבים `Base::`.
4. שרשרת ירושה: מורידים את ההרשאה שלב אחרי שלב.

## דוגמה

```cpp
#include <iostream>
using namespace std;

class A {
public:    void pubA()  {}
protected: void protA() {}
private:   void privA() {}
};
class B : protected A {
public:
    void inside() {
        pubA();        // ok
        protA();       // ok
        privA();       // L1
    }
};
class C : public B {
    void more() {
        pubA();        // ok: still reachable from B's descendants
    }
};
int main() {
    B b;
    b.pubA();          // L2: public in A, but protected in B
    b.protA();         // L3
    A a;
    a.pubA();          // ok
    a.protA();         // L4
}
```

```text
L1: 'privA' is a private member of 'A'
L2: 'pubA' is a protected member of 'A'
L3: 'protA' is a protected member of 'A'
L4: 'protA' is a protected member of 'A'
```

- `privA()` ב-`inside` נכשל כי private של האב לא נגיש לנגזרת.
- `b.pubA()` נכשלת כי ב-`B` (ירושה protected) הפונקציה הפכה ל-`protected`.
- `b.protA()` נכשלת כי היא `protected`.
- `a.protA()` על אובייקט `A` ישירות נכשלת מאותה סיבה.
- `C` שיורשת מ-`B` עדיין רואה את `pubA` כי היא `protected` ב-`B`.

המרות בין אב לנגזרת:

```cpp
#include <iostream>
using namespace std;

class B { public: int b = 1; };
class D : public B { public: int d = 2; };
int main() {
    B b1; D d1;
    B* p1 = &d1;       // ok: up-cast
    D* p2 = &b1;       // L1: down-cast needs a cast
    b1 = d1;           // ok: slicing, only the B part is copied
    d1 = b1;           // L2: a B has no D part to give
    B& r = d1;         // ok
    D* p3 = static_cast<D*>(p1);   // ok: you promise p1 really points to a D
    cout << p3->d << r.b << "\n";
}
```

```text
L1: cannot initialize a variable of type 'D *' with an rvalue of type 'B *'
L2: no viable overloaded '='
```

## מלכודות

> 🪤 **פונקציה בנגזרת מסתירה את כל ההעמסות באב.**

```cpp
#include <iostream>
using namespace std;

struct Base {
    void f() { cout << "Base::f "; }
    void f(int) { cout << "Base::f(int) "; }
};
struct Derived : Base {
    void f() { cout << "Derived::f "; }     // hides ALL Base::f overloads
};
struct Derived2 : Base {
    using Base::f;                          // brings the hidden overloads back
    void f() { cout << "Derived2::f "; }
};
int main() {
    Derived d;
    d.f();
    d.Base::f(3);                           // qualified call reaches the base
    Derived2 e;
    e.f(); e.f(1);
    cout << "\n";
}
```

```text
Derived::f Base::f(int) Derived2::f Base::f(int) 
```

הקריאה `d.f(3)` בלי `Base::` או `using` לא מתקמפלת:

```cpp
#include <iostream>
using namespace std;

struct Base {
    void f() {}
    void f(int) {}
};
struct Derived : Base {
    void f() {}                             // hides ALL Base::f overloads
};
int main() {
    Derived d;
    d.f();
    d.f(3);                                 // L1: Derived::f hid f(int)
    d.Base::f(3);                           // ok: qualified call
}
```

```text
L1: too many arguments to function call, expected 0, have 1; did you mean 'Base::f'?
```

> ⚠️ **`private` של האב נגיש לנגזרת?** לא, בשום ירושה. וגם פונקציה friend של הנגזרת לא רואה אותו.

> ⚠️ **`protected` דרך אובייקט של האב:** פונקציה חברה של נגזרת מקבלת גישה ל-protected רק דרך אובייקט מהסוג שלה (או נגזרת ממנה), לא דרך אובייקט של האב (`25S-A-Q9`, `a.protA = 5;`).

> ⚠️ **שימוש בטיפוס שעוד לא הוגדר.** אם `A` משתמשת בגוף פונקציה בשדות של `B`, ו-`B` (שיורשת מ-`A`) מוגדרת רק אחר כך, `B` עדיין טיפוס לא שלם ושלוש השורות נכשלות, בלי קשר להרשאות (`25S-A-Q8`).
