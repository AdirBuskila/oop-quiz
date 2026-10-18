#include <iostream>
using namespace std; class X {
public:
    X() { }
    virtual void f() { cout << 1; }
    void f1() { cout << 2; }
};
class Y : public X {
public:
    Y() {}
    void f() { cout << 3; }
    virtual void f1() { cout << 4; }
};
int main() {
    X* a[2];
    X x1;   Y y1;
    a[0] = &x1; a[1] = &y1;
    for (int i = 0; i < 2; i++) {
        a[i]->f();
        a[i]->f1();
    }
}
