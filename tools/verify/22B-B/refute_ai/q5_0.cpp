#include <iostream>
#include <vector>
using namespace std;
class B {
public:
        B(int i) { nB = i; }
        int nB;
};
class A : public B {
public:
        A(int i = 1, int j = 2) { nA = 1; nB = j; }
        A(const A& a) {
                this->nA = a.nA + 1; this->nB = a.nB + 2;
        }
        int nA;
};

int main() {
        A a1(1, 2);
        A a2 = a1;
        cout << a2.nA << a2.nB;
        return 0;
}
