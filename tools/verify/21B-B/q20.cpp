#include <iostream>
#include <vector>
using namespace std;
class X { public: virtual void f1(int i) { cout << i; } void f1(int i, int j) { cout << i; } };
class Y :public X { public: virtual void f1(int i) { cout << i + 1; } virtual void f1(int i, int j) { cout << i + 1; } };
int main() { X* x = new Y; x->f1(2); x->f1(2, 3);}
