#include <iostream>
#include <vector>
using namespace std;
class X {
public:
    X(int num = 0)
    {
        static int counter = 0;
        cout << num + ++counter;
    }
};
int main() {
    X a;
    X b(1);
    X c = b;
    X d(c);
    c = X(3);
}
