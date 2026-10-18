#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(int i) {
        cout << "A's Constructor" << i << endl;
    }
    A(const A& other) {
        cout << "A's copy Constructor" << endl;
    }
    A& operator=(A& other) {
        cout << "A=" << endl;
        return *this;
    }
    void virtual f(int i = 7) const {
        cout << "A's f" << i << endl;
    }
};
class B :public A {
public:
    B() : A(1) {
        cout << "B's Constructor" << endl;
    }
    virtual ~B() {
        cout << "B's Destructor" << endl;
    }
    void f(int i = 7) const {
        cout << "B's f" << i << endl;
    }
};
int main() {
    B b1();
    A a1(0);
    A* p;
    p = new B[2];
    p[0] = b1;
    return 0;
}
