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


    B* b3 = new D2(5, 6); // line 3
    return 0;
}
