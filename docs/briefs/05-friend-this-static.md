# friend, this ו-static

> 🔑 **בשורה אחת:** `friend` נותן גישה לפרטי **בכיוון אחד בלבד** ולא עובר בירושה. `this` הוא מצביע לאובייקט הנוכחי (`return *this` מאפשר שרשור). חבר `static` שייך למחלקה, משותף לכל האובייקטים ואין לו `this`.

## מה המבחן שואל

- איזו שורה לא מתקמפלת כשיש `friend void f(X)` ועומס נוסף `f(X,int)` שאינו friend (18A-A שאלה 5, 21B-B שאלה 17).
- `friend class Y` בתוך `X`: מי רשאי לגשת למי (18A-B שאלה 5, 19A-A שאלה 5, 19A-C שאלה 16).
- מה כותבים בהחזרה כדי ש-`&x == &x.f()`: `*this` (18A-B שאלה 6, 21B-B שאלה 12, שרשור `h.setRoom(5).getSize()`).
- משתנה static: משותף לכל האובייקטים, `x1.i = 2; x2.i = 3;` ואז `X::i++` נותן `334` (20B-A שאלה 10), משתנה גלובלי בשם זהה ל-static (19A-B שאלה 12), פונקציה סטטית ואובייקט מקומי (23B-B שאלה 2).
- משתנה static מקומי בתוך בנאי (`static int c`) שנשמר בין קריאות (21B-B שאלה 15).
- איזה פונקציות לא יכולות להיות static: וירטואליות (20B-A שאלה 8).
- למי גישה ליותר משתנים: friend או יורש? ל-friend גישה לכל שלושת סוגי החברים (19A-A שאלה 20).
- משפטים על חברות: אפשר לתת חברות לפונקציה בודדת של מחלקה אחרת, ופונקציה גלובלית וחברה של מחלקה בשם זהה הן שתי פונקציות שונות (23B-B שאלה 7).
- friend בירושה: `friend void funB(B&, A&)` ו-`A` עם protected ו-private (`25S-A-Q9`).

## הגדרות

- **`friend`** מוצהר **בתוך** המחלקה שנותנת גישה. אפשר פונקציה גלובלית, פונקציה חברה של מחלקה אחרת, או מחלקה שלמה. החברות **חד-כיוונית** (X נתנה ל-Y, לא להפך), **לא עוברת בירושה** ולא כוללת עומסים אחרים של אותה פונקציה.
- **`this`**: מצביע לאובייקט שעליו הופעלה הפונקציה (בפונקציה `const` הוא `const X*`). `return *this;` מחזיר את האובייקט עצמו, ועם טיפוס החזרה `X&` מאפשר `a.f().g()`.
- **שדה static:** עותק אחד למחלקה. מוגדר מחוץ למחלקה `int X::i = 0;`. נגישים דרך אובייקט או `X::i`.
- **פונקציה static:** בלי `this`, ניגשת רק לחברים סטטיים. לא יכולה להיות `const` או `virtual`.
- **משתנה static מקומי:** מאותחל פעם אחת, שומר ערך בין קריאות.

## מתכונים

**"מי רשאי".** לכל גישה: מי הפונקציה? האם היא חברה של המחלקה, או friend שהוצהר **באותה** מחלקה? היורש רואה `protected` ו-`public` של האב, לא `private`.

**שרשור.** כדי ש-`obj.f().g()` ישנה את `obj`, `f` צריכה להחזיר `X&`. החזרה `X` (בערך) משנה עותק.

**ערכי static.** כותבים טבלה: ערך המשתנה אחרי כל פקודה. כל האובייקטים רואים אותו ערך.

## דוגמה

```cpp
#include <iostream>
using namespace std;

class Counter {
    static int created;               // one copy shared by all objects
    int id;
public:
    Counter() : id(++created) {}
    ~Counter() { --created; }
    static int count() { return created; }   // no this: can only touch static members
    int myId() const { return id; }
};
int Counter::created = 0;             // the definition lives outside the class
int tick() { static int t = 0; return ++t; }   // static local: initialized once
int main() {
    Counter a, b;
    cout << a.count() << Counter::count() << b.myId() << "\n";
    {
        Counter c;
        cout << Counter::count();
    }
    cout << Counter::count() << "\n";
    tick(); tick();
    cout << tick() << "\n";
}
```

```text
222
32
3
```

אחרי `a, b`: `count()` הוא 2 דרך האובייקט ודרך המחלקה, ו-`b.myId()` הוא 2. בבלוק נוסף `c` (3), ביציאה ההורס מוריד ל-2. הפונקציה `tick` שומרת את `t` בין הקריאות: 1, 2, ואז 3.

שרשור והחזרת `*this`:

```cpp
#include <iostream>
using namespace std;

class House {
    int rooms;
public:
    House(int r = 1) : rooms(r) {}
    House& setRooms(int r) { rooms = r; return *this; }   // returns the object itself
    House& add(int k)      { rooms += k; return *this; }
    int get() const { return rooms; }
    House copyOf() const { return *this; }                // returns a copy
};
int main() {
    House h(4);
    h.setRooms(5).add(2).add(1);
    cout << h.get() << "\n";           // 8
    h.copyOf().setRooms(100);          // changes a temporary copy only
    cout << h.get() << "\n";           // still 8
    cout << (&h == &h.setRooms(1)) << "\n";
}
```

```text
8
8
1
```

`setRooms(5).add(2).add(1)` משנה את `h` ל-8. `copyOf()` מחזירה עותק, והשינוי עליו לא נראה. ההשוואה האחרונה (`1`) מראה ש-`setRooms` מחזירה את אותו אובייקט.

חברות:

```cpp
#include <iostream>
using namespace std;

class Y;
class X {
    friend class Y;               // every member of Y may touch X's private part
    friend void peek(const X&);   // one global function may as well
    int secret = 1;
public:
    int open = 2;
};
class Y {
    int mine = 3;
public:
    int look(const X& x) { return x.secret; }       // allowed
};
void peek(const X& x) { cout << x.secret << x.open << "\n"; }
int main() {
    X x; Y y;
    peek(x);
    cout << y.look(x) << "\n";
}
```

```text
12
1
```

## מלכודות

> 🪤 **החברות לא כוללת עומסים אחרים ולא סימטרית.**

```cpp
#include <iostream>
using namespace std;

class Y;
class X {
    friend class Y;
    int a = 1;
    void f(Y y);
};
class Y {
    int a = 2;
    void g(X x) { x.a = 5; }      // ok: Y is a friend of X
    friend class X;
};
class Z;
class W {
    friend class Z;
    int a = 1;
};
class Z {
    int b = 2;
    void g(W w) { w.a = 5; }      // ok: Z is a friend of W
};
void h(W w, Z z) {
    w.a = 1;                      // L1: global h is not a friend of W
    z.b = 1;                      // L2
}
class V {
    int a;
    friend void f(V v);
};
void f(V v) { v.a = 1; }          // ok
void f(V v, int k) { v.a = 1; }   // L3: an overload is a different function
int main() {}
```

```text
L1: 'a' is a private member of 'W'
L2: 'b' is a private member of 'Z'
L3: 'a' is a private member of 'V'
```

> 🪤 **חברות לא עוברת בירושה.** פונקציה שהיא friend של הנגזרת רואה את החברים של האב רק דרך אובייקט נגזרת, ורק `public` ו-`protected` (`25S-A-Q9`):

```cpp
#include <iostream>
using namespace std;

class A {
public:  int pubA = 1;
protected: int protA = 2;
private: int privA = 3;
};
class B : public A {
    friend void funB(B& b, A& a);
};
void funB(B& b, A& a) {
    b.pubA = 1;      // ok
    b.protA = 2;     // ok: friend of B sees B's inherited protected member
    b.privA = 3;     // L1: private to A, B's friend has no access
    a.pubA = 4;      // ok
    a.protA = 5;     // L2: protected access only through a B object
    a.privA = 6;     // L3
}
int main() {}
```

```text
L1: 'privA' is a private member of 'A'
L2: 'protA' is a protected member of 'A'
L3: 'privA' is a private member of 'A'
```

> ⚠️ **`static` מקומי שמאותחל בהצהרה** (`static int c = 0;` בתוך בנאי) מאותחל פעם אחת בלבד, לא בכל קריאה (21B-B שאלה 15: הפלט `025`).

> ⚠️ **בנאי העתקה לא קורא לבנאי הרגיל,** ולכן מונה שנספר בבנאי הרגיל לא גדל בהעתקה.
