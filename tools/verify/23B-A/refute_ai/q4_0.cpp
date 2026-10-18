#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(int i) { this->i = i; }
    ~A() { cout << i; }
private:
    int i;
};

void f() {
    static A a1(1);
    A a2(2);
}
A a3(3);
A a7(7);

int main()
{
    static A a4(4);
    A a5(5);
    f();
    A a6(6);
    return 0;
}
