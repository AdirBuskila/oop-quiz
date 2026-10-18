#include <iostream>
#include <vector>
using namespace std;
class X {
public:
    int n1;
    virtual void f() { cout << "X"; }
};
class Y : public X {
public:
    int n2;
    void f() { cout << "Y"; }
};
class Z : public X {
public:
    int n3;
    void f() { cout << "Z"; }
};
class W : public Z {
    int n4;
    void f() { cout << "W"; }
};
void g(X &x);
int main()
{
    X* x[4];
    x[0] = new X();
    x[1] = new Y();
    x[2] = new Z();
    x[3] = new W();
    X* x1 = (X *) x[3];
    for (int i = 0; i < 4; i++) { g(*x[i]); };
    g(*x1);
}
void g(X & x) {
    x.f();
}
