#include <iostream>
#include <vector>
using namespace std;
class Utest { public: Utest(int i = 40) { d = i; cout << "d = " << i; } private: int d; };
int main() { Utest ut = Utest(20); }
