#include <iostream>
#include <vector>
using namespace std;
class Base {
public:
   Base() { cout << "Base constructor\n"; }
   ~Base() { cout << "Base destructor\n"; }
   void print() { cout << "Base::print\n"; }
};
class Derived : public Base {
public:
   Derived() { cout << "Derived constructor\n"; }
   ~Derived() { cout << "Derived destructor\n"; }
   void print() { cout << "Derived::print\n"; }
};
void callPrint(Base &b) {
   b.print();
}
int main() {
   Derived d;
   callPrint(d);
   return 0;
}
