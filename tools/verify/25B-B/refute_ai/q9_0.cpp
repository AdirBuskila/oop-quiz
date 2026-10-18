#include <iostream>
#include <vector>
using namespace std;
class A {
public:
   A() { cout << "A constructor\n"; }
   virtual ~A() { cout << "A destructor\n"; }
   virtual void speak() const { cout << "A speaks\n"; }
};
class B : virtual public A {
public:
   B() { cout << "B constructor\n"; }
   ~B() { cout << "B destructor\n"; }
   void speak() const { cout << "B speaks\n"; }
};
class C : virtual public A {
public:
   C() { cout << "C constructor\n"; }
   ~C() { cout << "C destructor\n"; }
   void speak() const { cout << "C speaks\n"; }
};
class D : public B, public C {
public:
   D() { cout << "D constructor\n"; }
   ~D() { cout << "D destructor\n"; }
   void speak() const { cout << "D speaks\n"; }
};
int main() {
   A* a = new D();
   a->speak();
   delete a;
   return 0;
}
