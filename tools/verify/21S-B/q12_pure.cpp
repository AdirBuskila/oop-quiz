#include <iostream>
#include <vector>
using namespace std;
class B { public: virtual void f() = 0; };
class D1 : public B { };
class D2 : public B { public: void f() {} };
int main() { D2 d; D1 e; }
