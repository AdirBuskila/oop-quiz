#include <iostream>
#include <vector>
using namespace std;
class X { public: X(int i = 0) : nx(i) { cout << nx; } virtual ~X() { cout << nx; } int nx; virtual void f() { cout << nx; } };
class Y : public X { public: Y(int i=0, int j=0) : ny(i), X(j) { cout << ny; } ~Y() { cout << ny; } int ny; X Xy; void f() { X::f();   cout << nx << Xy.nx; } };
int main() { Y y1(4, 8); y1.X::f(); }
