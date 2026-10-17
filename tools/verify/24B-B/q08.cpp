#include <iostream>
using namespace std;
class Base { public:
  virtual void f(int &a, int &b) { a = b; b = 10*a; }
};
class Derived : public Base { public:
  virtual void f(int &a, int &b) { int temp = a; a = b; b = temp; }
};
int main() {
  int x = 10, y = 20;
  Derived d;
  d.f(x, y);
  cout << x << " " << y << " ";
  Base *b = &d;
  b->f(x, y);
  cout << x << " " << y << endl;
  return 0;
}
