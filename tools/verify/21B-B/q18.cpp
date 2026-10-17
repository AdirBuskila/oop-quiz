#include <iostream>
#include <vector>
using namespace std;
class B;
class A { public: B* b; A() : b(nullptr) {} };
class B { public: A* a; B() : a(nullptr) {} };
int main() { A a; B b; a.b = &b; b.a = &a; cout << (a.b->a == &a) << endl; }
