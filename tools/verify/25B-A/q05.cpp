#include <iostream>
#include <vector>
using namespace std;
class A {
   const char* id;
public:
   A(const char* id) : id(id) {}
   ~A() { cout << "A(" << id << ") "; }
};

class B {
   const char* id;
public:
   B(const char* id) : id(id) {}
   ~B() { cout << "B(" << id << ") "; }
};

class C : public A {
   B b;
   const char* id;
public:
   C(const char* id) : A("C->A"), b("C->B"), id(id) {}
   ~C() { cout << "C(" << id << ") "; }
};

static A sg("sg");
A g("g");

void func() {
   static A s("s");
   A I("I");
}

int main() {
   C x("x");
   func();
   return 0;
}
