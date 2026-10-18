#include <iostream>
#include <vector>
using namespace std;
class A {
public: A() { cout << "ea"; }
    ~A() { cout << "A"; }
};
class C {
public: C() { cout << "c"; }
    ~C() { cout << "C"; }
};
class B :public A {
public:
    C c;
    B() {
        cout << "eb";
    }
    ~B() { cout << "B"; }
};
B b;
int main()
{
    A a;
    C c;
    return 0;
}
