#include <iostream>
#include <vector>
using namespace std;
class A
{
public:
   int x;

   A() { x = 10; }
   A(const A& a){x=a.x+1;}

   A f() {
      x++;
      return *this;
   }
};

int main()
{
   A obj;
   obj.f().f();
   cout << obj.x << endl;
   return 0;
}
