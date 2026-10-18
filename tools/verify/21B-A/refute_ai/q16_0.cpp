#include <iostream>
using namespace std;
class B{
public:
    virtual ~B() {};
    virtual int getN() const
    { return n; }
    virtual void setN(int nn)
    {  n=nn; }
protected:
    int n;
};

class D: public B{
public:
    virtual int getN() const
    {
        return n*n;
    }

    virtual void setN(int nn)
    {
        n = 2*nn; }
};

int main()
{
    B b;
    D d;
    d.setN(5);
    b = d;
    cout << b.getN();
}
