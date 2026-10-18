#include <iostream>
#include <vector>
using namespace std;
class D {
public:
    int n1;
};

class C : private D {
public:
    int n2;
    int f1() { return n1; }
};

class B : public C {
public:
    int n3;
    void f2() {
        cout << n1;
        cout << n2;
    }
};

class A : private B {
public:
    int n4;
    int f2() {
        B b1;
        cout << n2;
        cout << b1.n1;
    }
};
