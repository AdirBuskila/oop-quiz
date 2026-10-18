class X { public: void f(){} };
class Y : public X {};
class Z : private Y {};
class W : public Z { public: void g(){ W w1; w1.f(); } };
