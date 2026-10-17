class A { public: virtual void f() = 0; virtual void g() = 0; };
class D : public A { public: void f() {} };    // g not implemented -> D is abstract
int main() { D d; return 0; }
