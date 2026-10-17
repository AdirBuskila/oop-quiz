// Q5 statement a: A has conversion B->A (ctor) and A->B (operator B), both defined in A
class B { public: B() {} };
class A { public: A() {} A(const B&) {} operator B() const { return B(); } };
int main() { A a; B b; a = b; b = a; return 0; }
