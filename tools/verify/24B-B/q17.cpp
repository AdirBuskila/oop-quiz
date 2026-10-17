#include <iostream>
using namespace std;
class A { public: int a; A(int a1 = 0) { cout << "A"; a = a1; } virtual ~A() = 0; };
class B : public A { public: int b; B(int b1 = 0) { cout << "B"; b = b1; } };
int main(){
	B b1;
	B* bP = new B;
	B b2 = *bP;
	return 0;
}
