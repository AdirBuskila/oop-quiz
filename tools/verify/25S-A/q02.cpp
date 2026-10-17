#include <iostream>
using namespace std;

class B {
public: B(int b = 0) :b(b) {};
private:
      int b;

};

class D : public B {
public: D(int b = 0, int d = 0) : B(b), d(d) {}
      int d;
};

int main() {
     B b1, b2;
     D d1, d2;

     B* bptr1 = &d1; // line 1
     D* dptr2 = &b2; // line 2
     b1 = d1;        // line 3
     d2 = b2;        // line 4
}
