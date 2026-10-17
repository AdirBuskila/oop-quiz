#include <iostream>
#include <vector>
using namespace std;
class A { public: A(int x = 1) { this->x = x; } ~A() { cout << x; } int x; };
class B { public: B(int n = 3) { this->n = n; p = new A[n]; } ~B() { delete[] p; } int n; A* p; };
int main() { B* p = new B(); cout << "[end]"; }
