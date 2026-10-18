#include <iostream>
#include <vector>
using namespace std;
int f(int x) { return 1; }
int f(int& x) { return 3; }
int f(const int& x) { return 4; }
class C {
public:
    int f(int x) const { return 5; }
    int f(int x) { return 6; }
};
int main()
{
    const C c;
    int y = 7;
    cout << c.f(y);
    return 0;
}
