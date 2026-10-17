#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
class A { public: A* operator=(const A& a) { return this; } };
int main() { A *p1 = new A, *p2 = new A; *p1=*p2=*p2; }
