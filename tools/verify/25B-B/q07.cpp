#include <iostream>
#include <vector>
using namespace std;
template <typename T>
class MyCollection {
private:
   T* data;
   int capacity;
   int size;
public:
   MyCollection(int cap = 10) : capacity(cap), size(0) { data = new T[capacity]; }
   void push_back(const T& val) {
      if (size >= capacity) return;
      data[size++] = val;
   }
   T& operator[](int index) { return data[index]; }
   ~MyCollection() {
      delete[] data;
   }
   MyCollection(const MyCollection& other) {
      capacity = other.capacity;
      size = other.size;
      data = new T[capacity];
      for (int i = 0; i < size; ++i)
         data[i] = other.data[i];
   }
};
class SomeClass {
   int val;
public:
   SomeClass(int v) : val(v) {}
   void print() const { cout << val << endl; }
};
int main() {
   MyCollection<SomeClass> v1(3);
   v1.push_back(SomeClass(1));
   v1.push_back(SomeClass(2));
   MyCollection<SomeClass> v2 = v1;

   v2[0].print();
   v2[1].print();
   return 0;
}
