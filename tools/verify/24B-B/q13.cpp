#include <iostream>
using namespace std;
template <typename T, typename T2>
T2 add(T a, T2 b, T c) { return a + b - c; }
int main() {
  cout << add(3, 4.5, 7) << endl;
  cout << add(3.5, 4.5, 3) << endl;
  cout << add(3.5, 4.5, 9.5) << endl;
  cout << add(3, 4.5, 3.5) << endl;
  return 0;
}
