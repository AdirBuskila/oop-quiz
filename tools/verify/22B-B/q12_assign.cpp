#include <iostream>
#include <vector>
using namespace std;
class A { A& operator=(const A&); public: A() {} };
int main() { A a; A b(a); A c; c = a; }
