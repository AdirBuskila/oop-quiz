#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
class A { public: int v = 1; int operator+(int k) { return v + k; } };
int main() { A a; cout << (5 + a) << endl; }
