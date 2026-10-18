#include <iostream>
#include <vector>
using namespace std;
class Sample {
private:
   int value;

public:
   Sample(int v) : value(v) {}

   void show() const {
      cout << "Value: " << value << endl;
   }

   void modify() {
      value += 10;
   }
};

int main() {
   const Sample obj1(5);
   Sample obj2(7);

   obj2.modify();
   obj2.show();
   obj1.modify();
   obj1.show();

   return 0;
}
