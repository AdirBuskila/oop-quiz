#include <iostream>
using namespace std;

class B;

class A {
public:
    A(int a = 0) : a(a) {};
    int a;
    operator B() const;
};

class B {
public:
    int b;
    B(const A& a) : b(a.a) { cout << "B ctor "; }
};

A::operator B() const {
    cout << "operator B() ";
    return B(*this);
}

int main() {
    A a1;
    B b1(a1);
    b1 = a1;
    cout << endl;
    return 0;
}
