#include <iostream>
using namespace std;

class B {
public:
    B(int b) : b(b) {};
    virtual int f() { return b; }
private:
    int b;
};

class D : public B {
public:
    D(int b, int d) : B(b), d(d) {};
    int f() { return d; }
private:
    int d;
};

int main() {
    B* bptr1 = new B(1);
    B* bptr2 = new D(2, 3);
    cout << bptr1->f() << " " << bptr2->f() << " " <<
        bptr2->B::f() << endl;
    return 0;
}
