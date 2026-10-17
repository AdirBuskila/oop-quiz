// Q5 statement b says: if A defines A->B, then B must also define A->B. Counter-example: only A defines it.
class B { public: B() {} };
class A { public: A() {} operator B() const { return B(); } };
int main() { A a; B b = a; return 0; }
