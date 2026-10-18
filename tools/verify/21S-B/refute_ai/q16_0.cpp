#include <iostream>
#include <vector>
using namespace std;
class A {
   int n;
public:
   A(int nn = 0) { n = nn; }
   A &operator ++() { ++n; return *this; }
};
int main()
{
   A a(5);
   A b=++a;
   A c(a++);
   cout << a;
   return 1;
}
