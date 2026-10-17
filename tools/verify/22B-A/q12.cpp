#include <iostream>
#include <vector>
using namespace std;
class X { public: int x; X(int i = 0) :x(i) {} X& operator+=(const X b) { this->x += b.x; return *this; } };
class Y : public X { public: int y; Y(int i = 0, int j = 0) :y(i), X(j) {}
 Y& operator+=(const Y a) { (X&)(*this) += (const X)a; this->y += a.y; return *this; }
 void print() { cout << this->y << this ->x; } };
int main() { X x1(1), x2(2); Y y1(10, 6), y2(20, 5); x2 += x1; (X&)y2 = x2; y2.print(); y2 += y1; y2.print(); }
