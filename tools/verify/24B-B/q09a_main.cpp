class B { public: static void f() {} };
class A : private B { public: };
int main() { A::f(); return 0; }
