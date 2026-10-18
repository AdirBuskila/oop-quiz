#include <iostream>
using namespace std;
int f(int x, int y=3, int z) {
    return x + y + z;
}

int main()
{
  cout << f(1,3,5) << f(1,3) << f(1,4,2) << endl;
}
