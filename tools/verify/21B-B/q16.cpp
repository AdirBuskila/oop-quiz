#include <iostream>
#include <vector>
using namespace std;
template <class T> class Uone { public: static int uone; Uone(int ut) { uone = ut; } };
template <class T> int Uone<T>::uone = 0;
int main() { Uone<int> u1(1); Uone<int> u2(2); Uone<float> u3(3); cout << u1.uone << u2.uone << u3.uone; }
