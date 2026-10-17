#include <iostream>
using namespace std;
class B {
public:
	virtual void f() { cout << "A"; }
};
class A : public B {
	void f() { cout << "B"; }
};
int main()
{
	A a1;
	B b1;
	B& c1 = b1;
	B& d1 = a1;
	B* e1 = &c1;
	B* f1 = &d1;
	c1.f(); d1.f(); e1->f(); f1->f();
	return 0;
}
