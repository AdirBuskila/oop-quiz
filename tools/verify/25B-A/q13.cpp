#include <iostream>
#include <vector>
using namespace std;
class MyClass {
private:
   int value;

public:
   MyClass(int v) : value(v) {}

   static void printValue() {
      cout << "Value is: " << value << endl;
   }
};

int main() {
   MyClass obj(42);
   obj.printValue();
   return 0;
}
