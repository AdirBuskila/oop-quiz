#include <iostream>
#include <vector>
using namespace std;
class A { public: int v = 3; A* me() { return this; } };
int main() { A a; cout << (a.me() == &a) << endl; }
