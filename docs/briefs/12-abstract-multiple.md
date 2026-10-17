# מחלקות מופשטות, ממשקים וירושה מרובה

> 🔑 **בשורה אחת:** מחלקה עם פונקציה וירטואלית טהורה (`= 0`) היא **מופשטת**: אי אפשר ליצור ממנה אובייקט, ויורשת שלא דורסת את כל הטהורות נשארת מופשטת. בירושה מרובה "יהלום" יש באובייקט **שני עותקים** של הבסיס המשותף, אלא אם הירושה שלו `virtual`.

## מה המבחן שואל

- אילו מחלקות אפשר ליצור במבנה `X: pure, Y: public X { f(){} }, Z: Y` (18A-B שאלה 16, 19A-C שאלה 25: `Y` ו-`Z`).
- אילו שורות לא מתקמפלות כשיוצרים `new X(1)` מחלקה מופשטת (19A-B שאלה 15, `25S-A-Q4`: 2 שגיאות, `new B(1,2)` ו-`new D1`, כי `D1` לא דורסת `f`).
- מה נדרש כדי שקוד עם `MyClass` מופשטת יתקמפל (20B-A שאלה 9).
- כמה שדות `int` באובייקט כשהירושה רגילה/וירטואלית (19A-B שאלה 10, 19A-C שאלה 10: 2, ו-23S-A שאלה 6: `sizeof(derived)/sizeof(int)` = 20 ללא virtual).
- שדה משותף בירושה מרובה: `d.A::x` עמום, צריך `d.B::x` (22B-A שאלה 8, 19A-B שאלה 20).
- בנאי של בסיס וירטואלי נקרא פעם אחת: `d.A::a`, `d.B::a`, `d.C::a` כולם 1 (23S-A שאלה 14).
- `dynamic_cast` בין אב וירטואלי לנגזרות (`25S-A-Q10`, `25S-A-Q11`).
- אובייקט של `W` מכיל שני `X` לא בהכרח זהים (22B-A שאלה 15).

## הגדרות

- **פונקציה וירטואלית טהורה** `virtual void f() = 0;`. מחלקה עם אחת כזו מופשטת. מצביע והפניה לטיפוס מופשט מותרים (פולימורפיזם), אובייקט בערך לא.
- **ממשק:** מחלקה בלי שדות ועם פונקציות טהורות בלבד. נגזרת מממשקים רבים.
- **ירושה מרובה:** `class D : public B, public C`. סדר הבנייה לפי סדר הרשימה.
- **יהלום:** `D : B, C` כש-`B` ו-`C` יורשות מ-`A` => ב-`D` שני עותקים של `A`. גישה לחבר של `A` עמומה, פותרים עם `d.B::x`.
- **ירושה וירטואלית** `class B : virtual public A`: עותק אחד של `A` משותף. את הבנאי שלו מפעילה המחלקה היורשת ביותר (`D`), פעם אחת.
- **`dynamic_cast<T*>(p)`:** המרה בדוקה בזמן ריצה, דורשת מחלקה פולימורפית (לפחות פונקציה וירטואלית אחת). מחזירה `nullptr` כשהאובייקט בפועל אינו מהטיפוס. בצורת הפניה זורקת `bad_cast`. אפשרית גם הצידה בין אחיות (cross-cast) כשהאובייקט האמיתי הוא הנגזרת המשותפת.
- המרה כלפי מעלה (`D*` ל-`B*`) לא דורשת `dynamic_cast`.

## מתכונים

**"אפשר ליצור אובייקט?"** מחלקה שורשית עם `= 0` לא. נגזרת: האם **כל** הטהורות שלה נדרסו? אם כן, כן.

**"כמה שדות מטיפוס A באובייקט"** סופרים מסלולי ירושה רגילה מ-`A`, ו-`+1` אחד לכל בסיס וירטואלי (כולם משותפים).

**"השורה מתקמפלת?"** גישה לחבר של בסיס כפול => עמום. פתרון: שם מלא. המרה של `D*` ל-`A*` עמומה גם היא ביהלום רגיל.

**`dynamic_cast`:** מה הסוג האמיתי של האובייקט? המרה ליעד שהאובייקט האמיתי "הוא" (כולל אחות דרך בסיס) => מצביע חוקי; אחרת `nullptr`.

## דוגמה

```cpp
#include <iostream>
using namespace std;

struct A { int x = 0; };
struct B : A {};
struct C : A {};
struct D : B, C {};                  // two A subobjects
struct VB : virtual A {};
struct VC : virtual A {};
struct VD : VB, VC {};               // one shared A
int main() {
    D d;
    d.B::x = 1;
    d.C::x = 2;
    cout << d.B::x << d.C::x << " " << (&d.B::x == &d.C::x) << "\n";
    VD v;
    v.x = 5;                         // ok: only one x
    cout << v.VB::x << v.VC::x << " " << (&v.VB::x == &v.VC::x) << "\n";
    cout << sizeof(D) / sizeof(int) << "\n";   // two ints
}
```

```text
12 0
55 1
2
```

ברגיל: `B::x` ו-`C::x` שני משתנים נפרדים (`1` ו-`2`, כתובות שונות `0`) ו-`sizeof` שני `int`. בווירטואלית: משתנה אחד (`55`, אותה כתובת `1`).

בסיס וירטואלי נבנה פעם אחת:

```cpp
#include <iostream>
using namespace std;

struct A {
    static int c;
    int a;
    A() : a(++c) { cout << "A() "; }
};
int A::c = 0;
struct B : virtual A {};
struct C : virtual A {};
struct D : B, C {};                 // the most derived class builds the virtual base, once
int main() {
    D d;
    cout << "\n" << d.A::a << d.B::a << d.C::a << "\n";
}
```

```text
A() 
111
```

`dynamic_cast`:

```cpp
#include <iostream>
using namespace std;

struct B { virtual void f() {} };
struct D1 : virtual B {};
struct D2 : virtual B {};
struct D3 : D1, D2 {};
int main() {
    D3* d3 = new D3;
    B* b = d3;                               // up-cast, no cast needed
    D1* p1 = dynamic_cast<D1*>(b);           // down-cast: checked at run time
    D2* p2 = dynamic_cast<D2*>(b);           // cross-cast into the sibling: works, the object is a D3
    D3* p3 = dynamic_cast<D3*>(b);
    cout << (p1 != nullptr) << (p2 != nullptr) << (p3 != nullptr) << "\n";
    B* b1 = new D1;                          // a plain D1 object
    D2* q2 = dynamic_cast<D2*>(b1);          // it is not a D2
    D3* q3 = dynamic_cast<D3*>(b1);
    cout << (q2 != nullptr) << (q3 != nullptr) << "\n";
    D1& r1 = dynamic_cast<D1&>(*b1);         // reference form: ok here
    try { D2& r2 = dynamic_cast<D2&>(*b1); } // reference form throws on failure
    catch (const bad_cast&) { cout << "bad_cast\n"; }
}
```

```text
111
00
bad_cast
```

- אובייקט `D3` אמיתי: ההמרות ל-`D1`, `D2`, `D3` מצליחות (`111`), כולל המרה "הצידה" ל-`D2`.
- אובייקט `D1` אמיתי: ל-`D2` ול-`D3` נכשל (`00`). בצורת הפניה נזרק `bad_cast`.

## מלכודות

> 🪤 **מחלקה שלא דרסה את כל הטהורות נשארת מופשטת:**

```cpp
#include <iostream>
using namespace std;

struct Shape {
    virtual double area() const = 0;            // pure virtual: Shape is abstract
    virtual ~Shape() {}
};
struct Sq : Shape {
    double s;
    Sq(double s) : s(s) {}
    double area() const { return s * s; }
};
struct Half : Shape {                           // does not override area
};
int main() {
    Shape s;                 // L1
    Half h;                  // L2
    Sq q(2);                 // ok
    Shape* p = &q;           // ok: a pointer to an abstract class is fine
    Shape& r = q;            // ok
    cout << p->area() << r.area() << "\n";
}
```

```text
L1: variable type 'Shape' is an abstract class
L2: variable type 'Half' is an abstract class
```

> 🪤 **יהלום בלי virtual:** `d.x` עמום.

```cpp
#include <iostream>
using namespace std;

struct A { int x = 0; };
struct B : A {};
struct C : A {};
struct D : B, C {};                  // two A subobjects
struct VB : virtual A {};
struct VC : virtual A {};
struct VD : VB, VC {};               // one shared A
int main() {
    D d;
    d.x = 1;                         // L1: ambiguous, which x?
    d.B::x = 1;                      // ok
    d.C::x = 2;                      // ok
    cout << d.B::x << d.C::x << " " << (&d.B::x == &d.C::x) << "\n";
    VD v;
    v.x = 5;                         // ok: only one x
    cout << v.VB::x << v.VC::x << " " << (&v.VB::x == &v.VC::x) << "\n";
}
```

```text
L1: non-static member 'x' found in multiple base-class subobjects of type 'A':
```

> ⚠️ **הבדל בין `sizeof` לשדות:** עם ירושה וירטואלית `sizeof` כולל גם מצביעים נסתרים, לא רק את השדות. סופרים שדות, לא בתים.

> ⚠️ **`dynamic_cast` בלי פולימורפיזם** (בלי פונקציה וירטואלית) לא מתקמפל; ושאלות על `dynamic_cast` תלויות בסוג האמיתי של האובייקט, לא בסוג המצביע.
