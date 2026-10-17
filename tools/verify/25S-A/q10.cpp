#include <iostream>
using namespace std;

class B { virtual void f() {}; };
class D1 : virtual public B {};
class D2 : virtual public B {};
class D3 : public D1, public D2 {};

int main() {
    D3* d3ptr = new D3;
    B* b3ptr = dynamic_cast<B*> (d3ptr);
    if (b3ptr != nullptr) { cout << "0 "; }

    B* bptr = dynamic_cast<B*>
(dynamic_cast<D1*>(d3ptr));
    if (bptr != nullptr) { cout << "1 "; }

    D1* d1ptr = dynamic_cast<D1*>(bptr);
    if (d1ptr != nullptr) { cout << "2 "; }

    D2* d2ptr = dynamic_cast<D2*>(bptr);
    if (d2ptr != nullptr) { cout << "3 "; }

    D3* d3ptr2 = dynamic_cast<D3*>(bptr);
    if (d3ptr2 != nullptr) { cout << "4 "; }
    cout << endl;
    return 0;
}
