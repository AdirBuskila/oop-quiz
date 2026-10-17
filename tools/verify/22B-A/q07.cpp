#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
class B{ public: B(); B(int n); };
B::B(){ cout << "B::B()\n"; }
B::B(int n){ cout << "B::B(" << n << ")\n"; }
class D : public B{ public: D(); D(int n); private: B b; };
D::D(){ cout << "D::D()\n"; }
D::D(int n) : B(n){ b = B(-n); cout << "D::D(" << n << ")\n"; }
int main(){ D d(3); return 0; }
