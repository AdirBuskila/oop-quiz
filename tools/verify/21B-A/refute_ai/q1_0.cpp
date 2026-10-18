#include <iostream>
using namespace std;
void f(int& i) {
    i++;
    cout << i << endl;
};

int main()
{
    int i = 3, j = 2;
    f(i);
    f(i+j);
    f(5);
    f(i + 1);
}
