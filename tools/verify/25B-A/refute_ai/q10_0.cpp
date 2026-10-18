#include <iostream>
#include <vector>
using namespace std;
class Base {
public:
   Base() { cout << "Base "; }
   ~Base() { cout << "DesBase "; }

   virtual void show() { cout << "Base Show "; }
};

class Derived : public Base {
public:
   Derived() { cout << "Derived "; }
   ~Derived() { cout << "DesDerived "; }
   void show() { cout << "Derived Show "; }
};

int main() {
   Base* b = new Derived();
   b->show();
   delete b;
}
