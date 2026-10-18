#include <iostream>
class X {
public:
    int f;
};
void g(X *x) { x->f = 5; }
int main() {
    X x;
    x.f = 3;
    g(x);
    std::cout << x.f;
}
