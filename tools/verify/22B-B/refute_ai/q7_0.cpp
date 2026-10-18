#include <iostream>
#include <vector>
using namespace std;
class A {
public:
        A(int i = 0) { nA = i; }
        int nA;
        void f() { cout << "abc"; }
};

class B : virtual public A {
public:
        B(int i = 0) { nB = i; }
        int nB;
};

class C : virtual public A {
public:
        C(int i = 0) { nC = i; }
        int nC;
};

class D : virtual public A {
public:
        D(int i = 0) { nD = i; }
        int nD;
};

class E : public B, C, D {
public:
        E(int i = 0) { nE = i; }
        int nE;
};

int main() {
        E e1;
        e1.f();
        cout << e1.nA;
        return 0;
}
