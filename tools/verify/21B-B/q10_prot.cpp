#include <iostream>
#include <vector>
using namespace std;
class B { protected: void f() {} };
class D : public B { public: void f(int) {} };
int main() { D d; }
