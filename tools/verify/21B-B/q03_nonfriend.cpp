#include <iostream>
#include <vector>
using namespace std;
class A { public: int v = 7; };
ostream& operator<<(ostream& o, const A& a) { return o << a.v; }
int main() { A a; cout << a << endl; }
