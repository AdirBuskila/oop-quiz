#include <iostream>
#include <vector>
using namespace std;
class X{};
void  operator<< (ostream& o, X x) { o << 1; }
int main() { std::cout << X(); }
