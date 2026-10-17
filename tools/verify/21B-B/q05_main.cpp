#include <iostream>
#include <vector>
using namespace std;
class B { public: void f() { cout << "B::f "; } };
class A : public B { public: void f() { cout << "A::f "; } void g() { B::f(); } };
int main() { B::f(); }
