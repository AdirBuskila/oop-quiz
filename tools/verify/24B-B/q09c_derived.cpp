class B { public: static void f() {} };
class A : private B { public: };
class Dd : public A { public: void g() { A::f(); } };
int main() { Dd x; x.g(); return 0; }
