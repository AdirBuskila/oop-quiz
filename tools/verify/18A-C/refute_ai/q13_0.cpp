#include <iostream>
class X {
public: virtual void f() { std:: cout << 1; }
};
class Y : public X {
public: virtual void f() { std::cout << 2; }
};
int main() {
    Y y;
    X *p = &y;
    p->f();
}
