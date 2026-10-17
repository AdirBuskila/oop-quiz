#include <iostream>
using namespace std;

class B {
public:
    B(int b) : b(b) {};
    virtual int f() = 0;
private:
    int b;
};

class D1 : public B {
public:
    D1(int b, int d) : B(b), d(d) {};
private:
    int d;
};

class D2 : public B {
public:
    D2(int b, int d) : B(b), d(d) {};
    int f() { return d; }
private:
    int d;
};

int main() {

    B* b2 = new D1(3, 4); // line 2

    return 0;
}
