#include <iostream>
#include <vector>
using namespace std;
class A {
public:
   int x;
   A(int x = 2) { this->x = x; }
   A(A other) { this->x = other.x; }
};

void f(A obj1, A obj2)
{
   cout << obj1.x << obj2.x;
}

int main()
{
   A a1;
   A a2(a1);
   A a3;
   A a4(a3);
   f(a2, a4);
   return 0;
}
