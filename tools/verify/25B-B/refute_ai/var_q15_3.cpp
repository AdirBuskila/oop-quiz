#include <iostream>
using namespace std;
struct A
{
   int value;
   A(int x) : value(x) {}
   int operator+(const A& a) { return -a.value; }
   int operator+(int x) { return 2 * x; }
   friend ostream& operator<< (ostream& os, const A& a);
};
ostream& operator<< (ostream& os, const A& a) { return os << a.value; }
int operator+(const A& a) {
   static int counter = 1;
   return ++counter + a.value;
}
int main()
{
   A a1(4), a2(-1);
   cout<<a1 + -3;
   return 0;
}
