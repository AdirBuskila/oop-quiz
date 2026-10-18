#include <iostream>
#include <vector>
using namespace std;
class B {
public:
    ~B() { cout << "B dtor; ";}
};

class C:public B{
public:
    ~C() { cout << "C dtor; "; }
};

class D :public C {
public:
    ~D() { cout << "D dtor; "; }
};

int main(){
    D d;
    return 0;
}
