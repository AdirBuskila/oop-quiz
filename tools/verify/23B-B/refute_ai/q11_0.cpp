#include <iostream>
#include <vector>
using namespace std;
class A{
public:
    void p() const { cout << "p\n"; }
};
template <typename T> class B{
private:
    T x;
public:
    int k;
    B(T y) : x(y), k(2) { x.p(); }
};
void f(B &r){
    std::cout << r.k;
}
int main(){
    A a;
    B<A*> b(&a);
    f(b);
    return 0;
}
