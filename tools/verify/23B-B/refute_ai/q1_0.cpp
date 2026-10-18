#include <iostream>
#include <vector>
using namespace std;
float f(float x) {
    return x + 1;
}
int f(float x, float y = 2) {
    int z = x + (int)y;
    return z;
}
int f(float x, int y, int z = 8) {
    int w = (int) x + y + z;
    return w;
}
int main()
{
    float x = 5.5, y = 2.5;
    int z = 3;
    cout << f(5) << endl;
    cout << f(5,6) << endl;
    cout << f(5,6,7) << endl;
}
