// Variant of Q8: B defined before A's member body (out-of-class), to show the count when B is complete.
#include <iostream>
using namespace std;
class B;
class A { void f(B b); };
class B : public A {
public:     int pubB;
protected:  int protB;
private:    int privB;
};
void A::f(B b) {
    b.pubB = 1;   // line 1
    b.protB = 2;  // line 2
    b.privB = 3;  // line 3
}
int main() {}
