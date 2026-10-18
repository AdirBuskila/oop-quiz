#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(): a(++c) {};
    int a;
    static int c;
};
int A::c = 0;
class B : virtual public A {public: B(){}; };
class C : virtual public A {public: C(){}; };
class D : public B, public C {public: D(){} };
int main() {
    D d;
    cout << d.A::a << " " << d.B::a << " " << d.C::a;
}
