#include <iostream>
#include <vector>
using namespace std;
template <class X, class Y>
Y f(X x, Y y) {
     y+=x + 1;
     return y;
}
int f(double p, int q) {
     q+=(int) p+2;
     return q;
}
int main() {
     int i=3,j=6;
     double d=4.3;
     cout << f(i, j) << f(d,j) << endl;
}
