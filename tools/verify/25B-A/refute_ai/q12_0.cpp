#include <iostream>
#include <vector>
using namespace std;
class A {
public:
   void display() {
      cout << "Class A" << endl;
   }
};

class B {
public:
   void display() {
      cout << "Class B" << endl;
   }
};

class C : public A, public B {
};

int main() {
   C obj;
   obj.display();
   return 0;
}
