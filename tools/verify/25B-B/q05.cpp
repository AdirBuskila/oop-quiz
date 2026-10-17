#include <iostream>
#include <vector>
using namespace std;
class Sample {
private:
   int* arr;
   int size;
public:
   Sample(int s) : size(s) {
      arr = new int[size];
      for (int i = 0; i < size; ++i) arr[i] = i * 10;
   }
   Sample(const Sample& other) {
      arr = other.arr;
      size = other.size;
   }
   void modify(int index, int value) {
      if (index >= 0 && index < size) arr[index] = value;
   }
   void print() const {
      for (int i = 0; i < size; ++i)
         cout << arr[i] << " ";
      cout << endl;
   }
   ~Sample() {
      delete[] arr;
   }
};

int main() {
   Sample a(3);
   Sample b = a;

   b.modify(0, 999);
   a.print();
   b.print();
   return 0;
}
