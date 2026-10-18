#include <iostream>
class X { public: int x; };
class Y : public X { int y; };
class Z : public X { int z; };
class W : public Y, public Z { int w; public: void s(){ Y::x=1; Z::x=2; std::cout<<Y::x<<Z::x<<sizeof(W); } };
int main(){ W w; w.s(); }
