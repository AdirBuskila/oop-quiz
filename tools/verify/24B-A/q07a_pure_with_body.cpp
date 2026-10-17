// Q7 (held): a pure virtual function may still have a body; the class stays abstract
class A { public: virtual void f() = 0; };
void A::f() {}
class D : public A { public: void f() { A::f(); } };
int main() { D d; d.f(); return 0; }
