#include <iostream>
class X {
public:
    X& f() { return _____; }
};
int main() {
    X x;
    std::cout << (&x == &x.f());
}
