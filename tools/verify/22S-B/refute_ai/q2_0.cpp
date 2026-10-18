#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(int i) {
        cout << "A's Constructor" << i << endl;
    }
    A(const A & other) {
        cout << "A's copy Constructor" << endl;
    }
    A& operator=(A& other) {
        cout << "A=" << endl;
        return *this;
    }
    virtual void f(int i = 7) const {
        cout << "A's f" << i << endl;
    }
};
class B:public A {
public:
    B() : A(2) {
        cout << "B's default Constructor" << endl;
    }
    B(int i,int j) : A(i) {
        cout << "B's parameter Constructor" << i << j << endl;
    }
    virtual ~B() {
        cout << "B's Destructor" << endl;
    }
    void f(int k = 9,int q = 10) const {
        cout << "B's f" << k << q << endl;
        A::f(q);
    }
};
int main() {
    B b1(19,20);
    A a1 = b1;
    A* p;
    p = new B[2];
    p[0] = b1;
    p[0].f(2,3);
    return 0;
}
