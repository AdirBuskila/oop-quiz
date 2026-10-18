#include <iostream>
using namespace std;
class B {
public:
    B() {cout << 1; }
    B(int i) {
        cout << 2;
        x = i;
    }
    int x;
};

class A : public B {
public:
    A(int y = 5, int x = 10) : B(x) {
        cout << 3;
        this->y = y;
        this->x = 8;
    }
    void f() const { cout << x << y; }
    int y;
};

int main()
{
    A a(5, 7);
    a.f();
}
