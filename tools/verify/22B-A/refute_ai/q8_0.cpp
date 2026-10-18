#include <iostream>
#include <vector>
using namespace std;
class A {
public: A(int _x = 0) { x = _x; }
     virtual void f() {};
protected: int x;
};
class B : public A {
public: void AddB(int y) { x += y; }
};
class C : public A {
public: void AddC(int y) { x += y; }
};
class D : public B, public C {
public: void ShowX() { cout << "x = " << x << endl; }
};
int main() {
     D d;
     d.ShowX();
     d.AddB(10); d.ShowX();
     d.AddC(5); d.ShowX();
     d.f();
}
