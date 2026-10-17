#include <iostream>
using namespace std;
class A { public: int a; A(int a1 = 0) { a = a1; } };
class B : virtual public A { public: int b; B(int b1 = 0) { b = b1; } };
class C : virtual public A {};
class D : public B, public C {};
int main() {
	D d1;
	d1.a++;
	d1.B::a++;
	d1.C::a++;
	cout << d1.a << d1.B::a << d1.C::a;
	return 0;
}
