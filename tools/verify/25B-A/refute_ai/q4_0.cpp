#include <iostream>
#include <vector>
using namespace std;
class A {
   int a;
};

class B : public A {
   int b;
};

void f(A& a, int x = 1, int y = 3) {
   cout << x;
}

void f(A& a, int x = 2) {
   cout << x;
}

int main() {
   A* a = new A;
   B* b = new B;
   f(*a, 5, 7);
   f(*b ,6, 8);
   f(*a ,9);
   f(*b ,10);
}
