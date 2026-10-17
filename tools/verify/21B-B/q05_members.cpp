#include <iostream>
#include <vector>
using namespace std;
class B { public: void f() { cout << "B::f "; } void h() { B::f(); } };
class A : public B { public: void f() { cout << "A::f "; } void g() { B::f(); } };
int main() { A a; a.g(); B b; b.h(); A a2; a2.B::f(); }
