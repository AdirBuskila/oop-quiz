#include <iostream>
#include <vector>
using namespace std;
int& f(int& x, int& y, int& z)
{
    if (x == 1) return y;
    return z;
}

int main()
{
    int a = 1, b = 2, c = 3;
    f(a, b, c)++;
    a++;
    f(a, b, c)++
    int& d = f(a, b, c);
    d++;
    cout << b << c << d;
    return 0;
}
