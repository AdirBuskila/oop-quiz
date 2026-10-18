class A;
class B { public: void f(A&); void g(A&); };
class A { int p; friend void B::f(A&); };
void B::g(A& a){ a.p=1; }
