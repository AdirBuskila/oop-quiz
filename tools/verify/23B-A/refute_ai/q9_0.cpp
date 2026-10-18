#include <iostream>
#include <vector>
using namespace std;
class TestClass
{
public:
    TestClass() :x(0) { cout<<x<<" "; }
    TestClass(int a) :x(a) { cout<<x<<" "; }
    void printValue()
    {
        cout << "Value: " << x <<" ";
    }
private:
    int x;
};

int main()
{
    TestClass s1(100);
    TestClass s2;
    TestClass s3 = 100;
    TestClass obj();
    obj.printValue();
    return 0;
}
