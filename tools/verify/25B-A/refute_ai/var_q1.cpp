#include <iostream>
class A { int x; public: A(int v):x(v){} int get() const { return x; } };   // no member function writes x
int main(){
  A a(1), b(2);
  A& (A::*p)(const A&) = &A::operator=;   // implicit copy assignment is a (public) member function
  (a.*p)(b);                              // changes x; statement 3 'must call a public member function' still holds
  std::cout << a.get();
}
