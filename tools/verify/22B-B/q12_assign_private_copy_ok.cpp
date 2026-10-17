#include <iostream>
using namespace std;
class A { A& operator=(const A&); public: A() {} };
int main() { A a; A b(a); cout << "copy still works"; }
