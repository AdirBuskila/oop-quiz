#include <iostream>
using namespace std;
template <class T>
class A {
public:
	T z;
	T f(T y) { return y + z; }
	A(T z) { this->z = z; }
};
class B {
public:
	int x;
	B(int i = 0) { x = i; }
	B operator+(B b) {
		B bb;
		bb.x = x + b.x+1;
		return bb;
	}
};
int main() {
	B b1, b2(3);
	A<int> a1(10);
	cout << a1.f(11);
	A<B> a2(b1);
	cout << a2.f(b2).x;
	return 0;
}
