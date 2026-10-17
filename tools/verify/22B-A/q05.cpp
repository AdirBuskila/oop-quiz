#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
class X { public: void f() { cout << "X::f\n"; } };
class Y : public X {};
class Z : private Y {};
class W : public Z { public: void g() { W w1; w1.f(); } };
int main() { W w; w.g(); }
