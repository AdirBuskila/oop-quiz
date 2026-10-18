#include <iostream>
using namespace std;
class A {
public:
    A(int i) { na = i; }
    A& operator=(const A& a) {
        na = a.na * 2;
        return *this;
    }
    int na;
};

class B : public A {
public:
    B(int i, int j) : A(j) {
        nb = i;
    }
    int nb;
};

int main()
{
    B b1(1, 2);
    B b2(3, 4);
    b2 = b1;
    cout << b2.nb << b2.na;
}
