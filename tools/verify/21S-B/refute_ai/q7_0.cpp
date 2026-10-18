#include <iostream>
#include <vector>
using namespace std;
class Sample {
private:
   int var;
public:
   Sample() {
      var = 10;
   }
   friend void fun();
};
friend void fun(){
   Sample S;
   cout << S.var << endl;
}
int main()
{
   fun();
   return 0;
}
