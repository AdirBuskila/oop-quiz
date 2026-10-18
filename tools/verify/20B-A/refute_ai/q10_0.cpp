#include <iostream>
using namespace std; class X {
public:
    X() {}
    static int i;
};
int X::i = 0;
int main() {
    X x1; X x2;
    x1.i = 2;
    x2.i = 3;
    cout << x1.i << x2.i;
    X::i++;
    cout << X::i;
}
