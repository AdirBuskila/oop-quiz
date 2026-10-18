#include <iostream>
#include <vector>
using namespace std;
class Counter;

class Box {
private:
   int length;
public:
   Box(int l = 0) : length(l){}
   friend Box operator+(const Box& b, const Counter& c);
   void print() const {
      cout << "Length: " << length << endl;
   }
};

class Counter {
private:
   int count;
public:
   Counter(int c = 0) : count(c){}
   friend Box operator+(const Box& b, const Counter& c);
};

Box operator+(const Box& b, const Counter& c) {
   return Box(b.length + c.count);
}

int main() {
   Box b1(10);
   Counter c1(5);
   Box b2 = b1 + c1;
   b2.print();
   return 0;
}
