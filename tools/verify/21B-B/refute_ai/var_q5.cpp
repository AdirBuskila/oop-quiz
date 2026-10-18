#include <iostream>
class B { public: void f(){ std::cout<<"B"; } void g(){ B::f(); } };
class A : public B { public: void f(){ std::cout<<"A"; } void h(){ B::f(); } };
int main(){ A a; a.h(); B b; b.g(); }
