#include <iostream>
using namespace std;
class A { A(const A&); public: A() {} };
int main() { A a; A c; c = a; cout << "assign still works"; }
