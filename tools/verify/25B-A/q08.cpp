#include <iostream>
#include <vector>
using namespace std;
#include <vector>
class F {
public:
   bool operator()(int x) const {
      return x < 0;
   }
};

class A {
public:
   vector<int> x;
   A(const int arr[], int size) {
      for (int i = 0; i < size; ++i)
         x.push_back(arr[i]);
   }
};

int main() {
   int arr[] = { -5, 3, -1, 7, 0, -2 };
   A a(arr, 6);
   vector<int> y;
   F p;
   vector<int>::iterator it, end;
   for (it = a.x.begin(), end = a.x.end(); it != end; it++) {
      if (p(*it)) {
         y.push_back(*it);
      }
   }
   vector<int>::reverse_iterator rit, rend;
   for (rit = y.rbegin(), rend = y.rend(); rit != rend; rit++) {
      cout << *rit << " ";
   }
   cout << endl;
   return 0;
}
