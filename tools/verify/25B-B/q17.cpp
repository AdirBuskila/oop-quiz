#include <iostream>
#include <vector>
using namespace std;
int& DoChange(int num)
{
   return num;
}

int main()
{
   int i = 10;
   DoChange(i) = 7;
   cout << i << endl;
   return 0;
}
