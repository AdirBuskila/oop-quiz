#include <iostream>
#include <vector>
using namespace std;
class Counter {
private:
   static int count;
   int id;

public:
   Counter() {
      id = ++count;
   }

   static int getCount() {
      return count;
   }

   void print() const {
      cout << "Object ID: " << id << ", Current Count: " << count << endl;
   }
};

int Counter::count = 0;

int main() {
   Counter c1;
   Counter c2;
   c1.print();
   c2.print();
   cout << "Total created: " << Counter::getCount() << endl;

   Counter* c3 = new Counter();
   delete c3;

   cout << "After delete, count is: " << Counter::getCount() << endl;
   return 0;
}
