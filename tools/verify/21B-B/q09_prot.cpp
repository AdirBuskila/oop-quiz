#include <iostream>
#include <vector>
using namespace std;
class B { protected: void f() {} };
class D : public B { public: virtual void f() {} };
int main() { D d; }
