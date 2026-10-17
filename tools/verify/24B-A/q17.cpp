// Q17: protected members are like private, except member functions of derived classes can access them
class A { protected: int p; public: A() : p(1) {} };
class D : public A { public: int get() { return p; } };           // ok (a)
int main() { D d; return d.get() - 1; }
