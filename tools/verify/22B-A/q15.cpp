#include <iostream>
#include <vector>
using namespace std;
class X { public: int x; X() : x(0) {} };
class Y : public X { public: int y; };
class Z : public X { public: int z; };
class W : public Y, public Z { public: int w; };
int main() { W w; static_cast<Y&>(w).x = 1; static_cast<Z&>(w).x = 2;
 cout << sizeof(W) << " " << (void*)&static_cast<Y&>(w).x << " " << (void*)&static_cast<Z&>(w).x << " values " << static_cast<Y&>(w).x << static_cast<Z&>(w).x << endl; }
