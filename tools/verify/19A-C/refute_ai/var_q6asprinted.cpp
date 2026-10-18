#include <iostream>
class X { X& f() { return *this; } };
int main() { X x; std::cout << (&x == x.f()); }
