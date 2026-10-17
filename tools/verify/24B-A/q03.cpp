#include <iostream>
using namespace std;
class A {
	int x;
public:
	int f(int i) { return i + x; }
	int& g() { return x; }
	const int& h(int i) { return x+i; }
};
int main() {
	A a1;
	a1.g() = 5;
	a1.h(3)= 6;
	cout << a1.f(3) + a1.h(3);
	return 0;
}
