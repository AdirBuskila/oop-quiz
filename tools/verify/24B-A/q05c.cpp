// Q5 statement c says: if A defines A->B then B->A cannot be defined. Counter-example: both defined (operator A in B, operator B in A).
class A; class B;
class B { public: B() {} operator A() const; };
class A { public: A() {} operator B() const { return B(); } };
B::operator A() const { return A(); }
int main() { A a; B b; B b2 = a; A a2 = b; return 0; }
