#include <iostream>
#include <vector>
using namespace std;
class X{
public:
    X(int i = 0)
{ static int c = 0; std::cout << i + c++; }
};
int main() {
    X a;
    X b(1);
    X c = b;
    c = X(3); }
