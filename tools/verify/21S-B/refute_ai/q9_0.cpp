#include <iostream>
#include <vector>
using namespace std;
class Sample {
private:
   int number;
public:
   Sample(){
      number = 10;
   }
   void operator++(){
      number = number + 1;
   }
   void Display() const {
      cout << number << endl;
   }
};
int main(){
   Sample S;
   S++;
   S++;
   S.Display();
   return 0;
}
