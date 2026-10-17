#include <iostream>
using namespace std;

class B1 {
public:
    B1() { cout << "B1 "; }
    ~B1() { cout << "~B1 "; }
};

class B2 {
public:
    B2() { cout << "B2 "; }
    ~B2() { cout << "~B2 "; }
};

class D : public B1, public B2 {
public:
    D() { cout << "D "; }
    ~D() { cout << "~D "; }
};

int main() {
    D d;
    return 0;
}
