#include <iostream>
#include <vector>
using namespace std;
class Multiplier {
   int factor;
public:
   Multiplier(int f) : factor(f) {}

   int operator() (int x) const {
      return x * factor;
   }
};

int main() {
   Multiplier triple(3), doubleIt(2);
   cout << triple(4) << " " << doubleIt(5);
}
