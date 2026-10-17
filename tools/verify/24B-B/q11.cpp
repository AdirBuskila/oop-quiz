#include <iostream>
using namespace std;
class A { public: A() { cout << "A"; } };
class B : public A { public: B() { cout << "B"; } };
class C : public B { public: C() { cout << "C"; } };
A a;
int main() { C c; static B b; return 0; }
