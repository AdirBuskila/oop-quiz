#include <iostream>
using namespace std;
class B;
class A
{
    void f(B b) {
        b.pubB = 1;   // line 1
        b.protB = 2;  // line 2
        b.privB = 3;  // line 3
    }
};
class B : public A {
public:     int pubB;
protected:  int protB;
private:    int privB;
};
int main() {}
