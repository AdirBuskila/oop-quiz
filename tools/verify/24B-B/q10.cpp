#include <iostream>
using namespace std;
class A { public: void show() { cout << "A"; } };
class B : public A { public: void show() { cout << "B"; } };
int main() {
  A b; B d; A *ptr = &d;
  b.show(); ptr->show(); d.show(); ptr = &b; ptr->show();
  return 0;
}
