#include <iostream>
using namespace std;
class A {
 public:
  A(int x = 5) : x_(x) {}
  int getX() const { x_ += 2; return x_; }
  void setX(int x) { x_ = x; }
 private:
  int x_;
};

int main() {
	A a1(10);
	A a2;
	cout << a1.getX() << " " << a2.getX() << endl;
	a2.setX(30);
	cout << a2.getX() << endl;
}
