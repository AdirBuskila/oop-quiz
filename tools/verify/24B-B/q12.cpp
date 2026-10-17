#include <iostream>
#include <vector>
using namespace std;
int main() {
   vector<int> vec;
   for (int i = 0; i < 5; ++i) { vec[i] = i * 2; }
   for (int i = 1; i < vec.size()-1; ++i) { cout << vec[i] << " "; }
   cout << endl;
   return 0;
}
