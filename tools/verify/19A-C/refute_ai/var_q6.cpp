#include <iostream>
class X { public: X& f() { return *this; } };
int main() { X x; std::cout << (&x == &x.f()); }
