#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    A(int i = 0) { nA = i; }
    const A& f() const
    {
        return *this;
    }
    void g() {}
    int nA;
};

int main()
{
    const A a(2);
    a.f().g();
    return 0;
}
