#include <iostream>
class C {
public:
	int x;
};
C operator+(double d, const C& c) { C r; r.x = (int)d + c.x; return r; }
int main() {
	C c1;
	c1.x = 2;
	c1 = 3.2 + c1;
	std::cout << c1.x;
	return 0;
}
