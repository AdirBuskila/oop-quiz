#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    int a;
    A() { a = 0; }
    A(int i) { a = i; }
    virtual void f() const { cout << " A.f "; }
    void g() const { cout << " A.g "; }
};
class B : public A{
public:
    B(int i) : A(i) {}
};
class C : public A{
public:
    void f() const { cout << " C.f "; }
    void g() const { cout << " C.g "; }
};
void t(A* p){
    p->f();
    p->g();
}
int main(){
    B b(10);
    C c;
    cout << b.a + c.a << " ";
    t(&c);
    return 0;
}
