#include <iostream>
using namespace std;
class X
{
protected:
    int key;
public:
    X(int i = 0) { key = i;};
    void f1() { cout << "f1 from X" << endl; }
};

class Y :  public X
{
public:
    Y(int i = 0) {key = i;};
    void f1() { cout << "f1 from Y" << endl; }
};

class Z :  public X
{
public:
    Z(int i = 0) { key = i; };
    void f1() { cout << "f1 from Z" << endl; }
};

class A : public Y, public Z {
    int key;
public:
    A(int i = 0) : Y(i + 2), Z(i + 3)
    {
        key = Y::key + Z::key;
    }
    int getkey(void) { return key; }
    void f1() { cout << "f1 from A" << endl; }
};
int main() {
    A object(4);
    cout << "object.key = " << object.getkey()<<endl;
    object.f1();
}
