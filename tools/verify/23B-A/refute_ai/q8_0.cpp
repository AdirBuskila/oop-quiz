#include <iostream>
#include <vector>
using namespace std;
class A{
public:
    virtual void f1(void) { cout << "A"; };
};
class B : virtual public A{
public:
    void f1(void) { cout << "B"; };
};
class C : virtual public A{
public:
    void f1(void) { cout << "C"; };
};
class D : public C, public B{
public:
    void f1(void) { cout << "D"; };
};
int main(){
    A* pa;
    pa = new A;
    pa->f1();
    pa = new B;
    pa->f1();
    pa = new C;
    pa->f1();
    pa = new D::B;
    pa->f1();
    pa = new D::C;
    pa->f1();
    pa = new D;
    pa->f1();
    return 0;
}
