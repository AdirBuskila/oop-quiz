#include <iostream>
#include <vector>
using namespace std;
class C {
public:
    void f() { cout << "C"; }
};

class B : public C {};

class A : public B {
public:
    void f() { cout << "A"; }
};

int main() {
    A a; B b;
    a.f(); a.B::f(); a.C::f(); b.f();
    b.C::f();
    return 0;
}
