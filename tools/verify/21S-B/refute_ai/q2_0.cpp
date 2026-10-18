#include <iostream>
#include <vector>
using namespace std;
class Sample {
    static int count;

public:
    Sample()
    {
        count++;
    }

    void sayHello()
    {
        cout << "Hello, ";
    }
    static void printTotalObj()
    {
        sayHello();
        cout << count << endl;
    }
};

int Sample::count = 0;

int main()
{
    Sample S1;
    Sample S2;
    Sample.printTotalObj();
    return 0;
}
