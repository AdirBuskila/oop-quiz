#include <iostream>
#include <vector>
using namespace std;
class Number {
private:
   int value;
public:
   Number(int v = 0) : value(v) {}
   Number& operator+=(const Number& other) {
      value += other.value;
      return *this;
   }
   Number& operator++() {
      ++value;
      return *this;
   }
   Number operator++(int) {
      Number temp = *this;
      value++;
      return temp;
   }
   void print() const {
      cout << "Value: " << value << endl;
   }
};

int main() {
   Number a(5), b(3);
   (++a += b++)++;
   a.print();
   b.print();
   return 0;
}
