# STL, איטרטורים, חריגות ו-MFC

> 🔑 **בשורה אחת:** `vector` הוא מערך דינמי עם איטרטורים. `begin()` מצביע לאיבר הראשון ו-`end()` **אחרי** האחרון (ריק => `begin() == end()`). הוספה והסרה באמצע מזיזות איברים, וקריאה `*(it++)` מחזירה את האיבר שלפני ההתקדמות.

## מה המבחן שואל

- פלט של תכנית עם `vector`: `push_back`, `insert(v.begin()+1, 9)`, `erase(v.begin())`, `insert(v.end(), 9)` (18A-A שאלות 18 ו-21, 18A-B שאלה 18, 18A-C שאלה 18).
- איטרטור: `int n = *(it++);` מדפיס `1` (18A-B שאלה 21, 19A-C שאלה 24).
- `v.begin() == v.end()` אם הווקטור ריק; `v.end() == v.begin()+0` כש-`size()==0` (19A-B שאלה 25, 19A-C שאלה 13). גודל הווקטור הוא `v.size()`, לא `v.capacity`.
- מה איטרטור לא יודע לעשות: הסרת האיבר המוצבע (19A-A שאלה 25).
- `vector<float> vf(5)` ולולאה עם `--vf.end()` (21B-B שאלה 14: `00`).
- בניית וקטור מטווח של מערך ואיטרטור שמקדם פעמיים (22B-A שאלה 13: `90`), `vector<vector<int>>` והעתקה (23S-A שאלה 5).
- שגיאות בקוד שמשתמש במצביע/איטרטור אחרי שינוי הווקטור, או מכניס איטרטור למשתנה `int` (`25S-A-Q12`).
- שאלות MFC (נושא שהמבחנים של 2018-2019 שואלים): מה עושה `CArchive` (שמירה וטעינה), `CFile` (שמירה וטעינה), `CPaintDC` (ציור על המסך), איזו פונקציה נקראת אחרי `Invalidate` (`OnPaint`), ציור קו דורש שתי קריאות (18A-A שאלות 13 ו-14, 18A-B שאלות 12, 15 ו-20).
- חריגות (`try`/`catch`/`throw`): לא הופיעו בשאלות הממוקדות, אבל הנושא בסילבוס.

## הגדרות

- **`vector<T>`:** `push_back(x)`, `size()`, `v[i]`, `insert(it, x)` (מכניס לפני `it`), `erase(it)` (מסיר ומזיז). `insert(v.end(), x)` שקול ל-`push_back`.
- **איטרטור:** `v.begin()`, `v.end()`, `*it`, `++it`, `it++`, והשוואה. של `vector` תומך בחשבון (`it + 2`, `<`, `end() - begin()`); של `list`/`set`/`map` רק `++`, `--`, `==`, `!=`.
- **`it++`** מחזיר את הערך הישן של האיטרטור, ואז מקדם. **`++it`** מקדם ומחזיר את החדש.
- **העתקה:** `vector` מעתיק את האיברים. `m.push_back(v)` מכניס עותק, ושינוי של `m[1][1]` לא משנה את `v`.
- **בנאי טווח:** `vector<int> v(a+1, a+5)` מעתיק את `a[1..4]` (עד האיבר לפני `a+5`).
- **אי-תקפות איטרטור:** `push_back`/`insert` שמשנים גודל יכולים לבטל איטרטורים ומצביעים לאיברים. `erase` מבטלת מהמקום שהוסר והלאה.
- **מכלים אחרים:** `list` (רשימה מקושרת), `set` (קבוצה ממוינת בלי כפילויות), `map` (מילון ממוין לפי מפתח; `m[k]` יוצר ערך ברירת מחדל אם אין).
- **חריגות:** `throw expr;` מפסיק ומחפש `catch` מתאים בשרשרת הקריאות; בדרך נהרסים משתנים מקומיים (הורסים רצים). `catch (T&)` תופס לפי טיפוס ללא המרות רגילות, הראשון שמתאים מנצח, `catch (...)` תופס הכול, `throw;` זורק מחדש. `what()` מחזירה הודעה של `std::exception` ונגזרות.

## מתכונים

**פלט של תכנית עם `vector`.** כותבים את תוכן הווקטור אחרי כל פקודה, כמו רשימה: `[0,1,2]`, אחרי `insert(begin()+1, 9)`: `[0,9,1,2]`.

**איטרטור.** סופרים מ-`begin()`. `*(it++)` => משתמשים בערך הישן. אחרי השורה `it` מצביע לאיבר הבא.

**"כמה שגיאות".** האם מכניסים `&v[0]` (מצביע) ל-`int`? האם `v.begin()` (איטרטור) ל-`int`? כל אחד שגיאת קומפילציה.

**חריגות.** מסמנים איפה נזרק, עוקבים אחרי הקריאות החוצה עד `catch` שמתאים; כל מקומי בדרך נהרס.

## דוגמה

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    for (int i = 0; i < 3; i++) v.push_back(i);        // 0 1 2
    v.insert(v.begin() + 1, 9);                        // before the element at index 1
    for (int i = 0; i < v.size(); ++i) cout << v[i];
    cout << "\n";
    v.erase(v.begin());                                // removes the first element
    for (vector<int>::iterator it = v.begin(); it != v.end(); ++it) cout << *it;
    cout << "\n";
    vector<int>::iterator it = v.begin();
    int n = *(it++);                                   // post-increment: yields the old position
    cout << n << *it << " " << v.size() << " " << (v.end() - v.begin()) << "\n";
    vector<int> e;
    cout << (e.begin() == e.end()) << (e.begin() == e.begin() + 0) << "\n";
}
```

```text
0912
912
91 3 3
11
```

- הווקטור אחרי הלולאה הוא `0 1 2`; אחרי `insert` לפני אינדקס 1 הוא `0 9 1 2` (השורה הראשונה בפלט).
- אחרי `erase(begin())`: `9 1 2`.
- `n = *(it++)` נותן `9` (הישן), ו-`*it` הוא `1`; הגודל 3, ו-`end()-begin()` גם 3: `91 3 3`.
- בריק: `begin()==end()` וגם `begin()==begin()+0`: `11`.

העתקות ובניית טווח:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int a[6] = {10, 20, 30, 40, 50, 60};
    vector<int> v(a + 1, a + 5);                 // copies a[1..4]: 20 30 40 50
    a[2] = 99;                                   // the vector holds copies
    int total = 0;
    for (vector<int>::iterator it = v.begin() + 2; it != v.end(); ++it) total += *it;
    cout << total << "\n";
    vector<int> v1(2, 8), v2;                    // v1 = {8,8}
    v2.push_back(-8); v2.push_back(5);
    vector<vector<int> > m;
    m.push_back(v1); m.push_back(v2);            // copies of v1 and v2
    m[1][1] = 35;
    cout << m[1][1] << v2[1] << "\n";            // 35 and 5
    vector<float> vf(5);                         // five zeros
    vector<float>::iterator it = vf.begin() + 2;
    int shown = 0;
    while (it != --vf.end()) { cout << *it++; shown++; }
    cout << " " << shown << "\n";
}
```

```text
90
355
00 2
```

הווקטור `v` מעתיק את `a[1..4]` = `20 30 40 50`, לכן שינוי של `a[2]` לא משפיע; האיטרטור מתחיל באינדקס 2 וסוכם `40+50 = 90`. אחרי `m.push_back(v2)` שינוי של `m[1][1]` לא משנה את `v2`: `35` ו-`5`. ב-`vf(5)` הלולאה רצה מאיבר 2 עד לפני האחרון: שני אפסים.

`vector` מול `list`, `set`, `map`:

```cpp
#include <iostream>
#include <list>
#include <vector>
#include <map>
#include <set>
#include <string>
using namespace std;

int main() {
    vector<int> v(3, 1);
    list<int> l(3, 1);
    vector<int>::iterator vi = v.begin();
    list<int>::iterator li = l.begin();
    ++vi; ++li;                         // both support ++ and *
    cout << *vi << *li << "\n";
    cout << (vi < v.end()) << "\n";     // vector iterators are random access: < works
    map<string, int> words;             // ordered key -> value
    words["b"] = 2; words["a"] = 1; words["b"] += 5;
    set<int> s; s.insert(3); s.insert(1); s.insert(3);
    for (map<string, int>::iterator it = words.begin(); it != words.end(); ++it)
        cout << it->first << it->second << " ";
    cout << s.size() << "\n";
}
```

```text
11
1
a1 b7 2
```

ה-`map` ממוין לפי מפתח (`a1 b7`), ה-`set` לא שומר כפילויות (גודל 2).

חריגות והורסים:

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

struct Guard {
    const char* name;
    Guard(const char* n) : name(n) { cout << "open-" << name << " "; }
    ~Guard() { cout << "close-" << name << " "; }
};
int divide(int a, int b) {
    if (b == 0) throw runtime_error("div by zero");
    return a / b;
}
void work(int b) {
    Guard g("work");
    cout << divide(10, b) << " ";
    cout << "after ";
}
int main() {
    try { work(2); } catch (const exception& e) { cout << "caught " << e.what() << " "; }
    cout << "\n";
    try { work(0); } catch (const exception& e) { cout << "caught " << e.what() << " "; }
    cout << "\n";
    try {
        try { throw 42; }
        catch (const char*) { cout << "char* "; }
        catch (int i) { cout << "int" << i << " "; throw; }     // rethrow the same exception
    } catch (...) { cout << "outer "; }
    cout << "\n";
}
```

```text
open-work 5 after close-work 
open-work close-work caught div by zero 
int42 outer 
```

בשורה השנייה: `Guard` נפתח, `divide` זורקת, וה-`Guard` נסגר (`close-work`) **לפני** שהחריגה נתפסת; `after` לא מודפס. בשלישית: `catch(int)` תופס `42`, זורק מחדש, והחיצוני תופס.

סדר ה-`catch` וטיפוסים:

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

struct Base {};
struct Derived : Base {};
int main() {
    try { throw Derived(); }
    catch (Base&)    { cout << "Base "; }       // the first matching handler wins
    catch (Derived&) { cout << "Derived "; }    // never reached
    try { throw 1.5; }
    catch (int)    { cout << "int "; }
    catch (double) { cout << "double "; }
    try { throw 'a'; }
    catch (int)    { cout << "int "; }          // no implicit conversion char -> int in catch matching
    catch (...)    { cout << "other "; }
    cout << "\n";
}
```

```text
Base double other 
```

`Base&` תופס גם `Derived` ולכן הראשון מנצח; `double` תואם בדיוק; `'a'` (char) לא מומר ל-`int` ב-`catch`, לכן נתפס רק ב-`...`.

## מלכודות

> 🪤 **איטרטור של `list` לא תומך ב-`<`:**

```cpp
#include <iostream>
#include <list>
#include <vector>
#include <map>
#include <set>
using namespace std;

int main() {
    vector<int> v(3, 1);
    list<int> l(3, 1);
    vector<int>::iterator vi = v.begin();
    list<int>::iterator li = l.begin();
    ++vi; ++li;                         // both support ++ and *
    cout << *vi << *li << "\n";
    cout << (vi < v.end());             // vector iterators are random access: < works
    cout << (li < l.end());             // L1: list iterators only support == and !=
    map<string, int> words;             // ordered key -> value
    words["b"] = 2; words["a"] = 1; words["b"] += 5;
    set<int> s; s.insert(3); s.insert(1); s.insert(3);
    for (map<string, int>::iterator it = words.begin(); it != words.end(); ++it)
        cout << it->first << it->second;
    cout << " " << s.size() << "\n";
}
```

```text
L1: invalid operands to binary expression ('list<int>::iterator' (aka '_List_iterator<_List_val<std::_List_simple_types<int>>>') and 'iterator' (aka '_List_iterator<_List_val<std::_List_simple_types<int>>>'))
```

> ⚠️ **`insert` מכניס לפני המיקום.** `v.insert(v.begin()+1, 9)` על `0 1 2` נותן `0 9 1 2`. `insert(v.end(), 9)` מוסיף בסוף.

> ⚠️ **`v.end()` אינו איבר.** הפנייה `*v.end()` אסורה. `--v.end()` הוא האיבר האחרון (21B-B שאלה 14).

> ⚠️ **איטרטור ומצביע אחרי הוספה:** `v.push_back(20)` או `v.insert(...)` יכולים להעביר את כל האיברים לזיכרון חדש, והישנים אינם תקפים (`25S-A-Q12`).

> ⚠️ **MFC (כל שאלות MFC הן ידע עובדתי):** `CPaintDC` לציור במסך, `CFile` ו-`CArchive` לשמירה *וגם* לטעינה, `Invalidate()` גורם לקריאה ל-`OnPaint`. שאלות כמו "איזו פונקציה *לא* נקראת בפתיחת חלון" (18A-C שאלה 12) מוחזקות בבנק כי אין מפתח מהימן. כאן אין דוגמת קוד: MFC לא מתקמפל מחוץ ל-Visual Studio.
