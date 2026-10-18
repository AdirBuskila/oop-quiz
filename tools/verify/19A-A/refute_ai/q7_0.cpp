#include <iostream>
using namespace std;
class X {
public:
    X(int i) { n = i;  cout << i; }
    ~X() { cout << n; }
    int n;
};
int f() {
    X x1(1);
    return x1.n;
}
X x2(2);
int main() {
    X x3(3);
    cout << f();
    static X x4(4);
}
