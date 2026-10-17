#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(int i = 0) { nA = i; }
    int nA;
};

class B {
public:
    B(int i = 0) { nB = i; }
    operator A() { return A(nB); }
    int nB;
};

int main() {
    A a1;
    B b1;
    a1 = b1;
    b1 = a1;
    return 0;
}
