#include <iostream>
using namespace std;
class A {
public:
    A(int z) { x = z; }
    int x;
    void f() { cout << x; }
    void f() const { cout << x; }
    void setX(int z) { x = z; }
};

int main() {
    A a1(4);
    a1.setX(8);
    const A a2(6);
    a1.f();
    a2.f();
    a2.setX(5);
    A a3 = a2;
}
