#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(int i) {x = i; y++;}
    ~A() {y--;}
    static int f() { A a3(4); y = y + a3.x; return y; }
    int x;
public:
    static int y;
};
int A::y = 0;
int main() {
    A a1(1), a2(2);
    cout << a1.f();
    cout << a2.f();
}
