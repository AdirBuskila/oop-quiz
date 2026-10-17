class B { public: static void f() {} };
class A : private B { public: friend class Fr; };
class Fr { public: void g() { A::f(); } };
int main() { Fr x; x.g(); return 0; }
