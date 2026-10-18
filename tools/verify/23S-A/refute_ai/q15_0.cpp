#include <iostream>
#include <vector>
using namespace std;
template<class T = int, int N = 0>
T f(T x = 0) {
    return x + N;
}
int main() {
    double y = 1.5;
    int n = 10;
    cout << f() << endl;
    cout << f<>() << endl;
    cout << f<double, n>(y) << endl;
    cout << f<int>(y, n) << endl;
    cout << f(y) << endl;
}
