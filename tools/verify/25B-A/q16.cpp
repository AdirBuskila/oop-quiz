#include <iostream>
#include <vector>
using namespace std;
class A {
public:
   virtual void f() {
      cout << "A";
   }
};

class B : public A {
public:
   void f() {
      cout << "B";
   }
};

void g(A& x) {
   x.f();
}

int main() {
   A *x = new B;
   B *y = new B;
   B z;
   g(*x);
   g(*y);
   g(z);
   return 0;
}
