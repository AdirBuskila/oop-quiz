#include <iostream>
#include <vector>
using namespace std;
class A {
        int x;
public:
        A() {
                cout << "A"; x = 0;
        }
        ~A() { cout << "~A"; }
};
class B {
public:
        B() { cout << "B"; }
        ~B() { cout << "~B"; }
};
class C : public A, public B {
public:
        int y;
        B b1;
        A a1;
        C() { cout << "C"; y = 0; }
        ~C() { cout << "~C"; }
};
int main() {
        C c1;
        return 0;
}
