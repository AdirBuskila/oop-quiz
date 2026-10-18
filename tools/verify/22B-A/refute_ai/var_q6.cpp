#include <iostream>
struct Person { int n; Person():n(0){} Person(const Person&o):n(o.n){ std::cout<<"C"; } };
Person g;
void f1(Person &p){}
void f2(Person p){}
void f3(Person *p){}
Person f4(){ Person l; return l; }
Person &f5(){ return g; }
Person *f6(){ return &g; }
int main(){ std::cout<<"[f1]"; f1(g); std::cout<<"[f2]"; f2(g); std::cout<<"[f3]"; f3(&g); std::cout<<"[f4]"; f4(); std::cout<<"[f5]"; f5(); std::cout<<"[f6]"; f6(); }
