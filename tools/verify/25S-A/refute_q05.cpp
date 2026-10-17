#include <iostream>
using namespace std;

class B {
public:
    B() { cout << "B "; }
    virtual ~B() { cout << "~B "; }
};

class D : public B {
public:
    D() { cout << "D "; }
    ~D() { cout << "~D "; }
};

int main() {
    B* b = new D();
    delete b;
    return 0;
}
