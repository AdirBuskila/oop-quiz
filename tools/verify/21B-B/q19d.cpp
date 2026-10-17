#include <iostream>
#include <vector>
using namespace std;
class X{};
ostream *operator<< (ostream& o, X x) { o << 1;  return &o; }
int main() { std::cout << X(); }
