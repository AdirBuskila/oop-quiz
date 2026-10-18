#include <iostream>
class X {
public:
    X() { std::cout << 1; }
    ~X() { std::cout << 2; }
};
class Y : public X{
public:
    Y() { std::cout << 3; }
    ~Y() { std::cout << 4; }
};
int main() {
    X *x = new Y;
}
