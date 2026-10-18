class A;
class B { public: void f(A&); void g(A&); };
class A { int p; friend void B::f(A&); friend void f(A&); };
void B::f(A& a){ a.p=1; }
void f(A& a){ a.p=2; }
int main(){}
