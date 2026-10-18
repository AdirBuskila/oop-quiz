#include <iostream>
#include <vector>
using namespace std;
class B;

class A {
private:
   int value;

public:
   A() : value(42) {}
   friend class B;
};

class B {
public:
   void showValue(A a) {
      cout << a.value << endl;
   }
};

int main() {
   A a;
   B b;
   b.showValue(a);
   return 0;
}
