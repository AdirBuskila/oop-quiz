#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
class A { public: int v = 1; ostream& operator<<(ostream& o) { return o << v; } };
int main() { A a; cout << a << endl; }
