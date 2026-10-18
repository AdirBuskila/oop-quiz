#include <iostream>
#include <vector>
using namespace std;
class A
{
    int x;
public:
    A(int x) : x(x) { cout << "A: " << x << "\n"; }
    A(const A& other) : x(other.x) { cout << "A (copy)\n"; }
    ~A() { cout << "~A " << x << "\n"; }
    virtual void toOs(ostream& os) const {}
    friend ostream& operator<<(ostream& os, const A& a)
    {
        os << a.x;
        a.toOs(os);
        return os;
    }
};
template<class T>
class B : public A
{
    T val;
public:
    B(const T& t, int x = 3) : A(x), val(t)
    {
        cout << "B: " << val << "\n";
    }
    B(const B& other) : A(other), val(other.val)
    {
        cout << "B (copy)\n";
    }
    ~B() { cout << "~B: " << val << "\n"; }
    virtual void toOs(ostream& os) const override
    {
        os << " " << val << endl;
    }
};
int main()
{
    B<const char*> b1("hi", 8);
    B<const char*> b2(b1);
}
