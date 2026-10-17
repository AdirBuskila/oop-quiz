#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
class B{ public: B(); virtual void p() const; void q() const; };
B::B() {}
void B::p() const{ cout << "B::p\n"; }
void B::q() const{ cout << "B::q\n"; }
class D : public B{ public: D(); virtual void p() const; void q() const; };
D::D(){ }
void D::p() const{ cout << "D::p\n"; }
void D::q() const{ cout << "D::q\n"; }
int main(){ B b; D d; B* pb = new B; B* pd = new D; D* pd2 = new D;
 b.p(); b.q(); d.p(); d.q(); pb->p(); pb->q(); pd->p(); pd->q(); pd2->p(); pd2->q(); return 0; }
