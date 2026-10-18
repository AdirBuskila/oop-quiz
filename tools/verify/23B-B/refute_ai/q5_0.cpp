#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    int n1;
    A(int i = 0) { n1 = i; }
    operator int() { return n1; }
};
template <class X, class Y>
void f(X i, Y j) {
    cout << i;
    cout << j;
}
template<>
void f(int x, char c) {
    cout << c;
    cout << x;
}
int main() {
    int i = 6;
    char c = 'd';
    A a1(5);
    f<A, int>(a1, i);
    f<int, char>(i, c);
    f<char, int>(c, i);
    return 0;
}
