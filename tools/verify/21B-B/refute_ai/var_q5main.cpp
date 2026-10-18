#include <iostream>
class B { public: void f(){ std::cout<<"B"; } };
class A : public B { public: void f(){ std::cout<<"A"; } };
int main(){ B::f(); }
