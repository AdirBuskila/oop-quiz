#include <iostream>
#include <vector>
using namespace std;
class A { public: A() {} A(int) {} A(int, int) {} };
int main() { A a; A b(1); A c(1, 2); }
