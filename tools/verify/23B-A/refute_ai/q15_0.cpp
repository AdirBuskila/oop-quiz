#include <iostream>
#include <vector>
using namespace std;
class M
{
    float a;
    int b;
public:
    M() {
        a = 50;
        b = -100;
    }
    M(int p, int q) {
        a = p;
        b = q;
    }
    friend M operator+(M);
    void output()
    {
        cout << "a=" << a << "b=" << b;
    }
};

M operator+(M t) {
    M res;
    res.a = a + t.a;
    res.b = b + t.b;
    return res;
}

int main()
{
    M d1(10, 20);
    M d2, d3;
    d3 = d1 + d3;
    d3.output();
    return 0;
}
