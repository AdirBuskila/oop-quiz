#include <iostream>
#include <vector>
using namespace std;
class A { public: int c = 1; mutable int m = 2; int nc = 3;
  int rd() const { return c + nc + m; }   // access all: ok
  void wr1() const { c = 5; }              // change const data member
  void wr2() const { nc = 5; }             // change non-const data member
};
int main() { A a; cout << a.rd() << endl; }
