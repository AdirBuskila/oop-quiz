#include <iostream>
#include <vector>
using namespace std;
class A { A() {} public: static A* make() { return new A; } };
int main() { A a1; }
