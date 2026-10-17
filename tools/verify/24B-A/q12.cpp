#include <iostream>
using namespace std;
// each constructor call prints a marker so the calls can be counted: C = copy ctor
class A
{
	int n;
public:
	A(int _n) {
		n = _n;
	}
	A(const A& a) {
		cout << "C";
		n = a.n;
	}
};
int main()
{
	A a1(10);
	A a2(a1);
	A a3 = a1;
}
