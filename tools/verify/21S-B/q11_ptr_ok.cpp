#include <iostream>
#include <vector>
using namespace std;
class Abs { public: virtual void f() = 0; int x; void g() {} };
class D : public Abs { public: void f() {} };
int main() { Abs* p = new D; Abs* q = nullptr; cout << "ok" << endl; }
