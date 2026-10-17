#include <iostream>
#include <vector>
using namespace std;
class A { public: A() {} A(const A& a) { cout << "copy"; } };
int main() { A x; A y(x); }
