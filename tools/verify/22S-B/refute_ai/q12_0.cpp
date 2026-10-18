#include <iostream>
#include <vector>
using namespace std;
class A
{
    static int counter;
    int x;
public:
    A(int x = ++counter) : x(x) { cout << "c'tor x=" << x << endl; }
    A(const A& other) : x(other.x) { cout << "copy x=" << x << endl; }
    static int getCounter() { return counter; }
    friend ostream& operator<<(ostream& os, const A& a)
    {
        os << a.x << " " << a.counter << endl;
        return os;
    }
};
int A::counter = 0;
int main()
{
    vector<A> arr;
    A a1(1);
    cout << A::getCounter() << endl;
    arr.push_back(A());
    arr.push_back(a1);
    cout << A::getCounter() << endl;
}
