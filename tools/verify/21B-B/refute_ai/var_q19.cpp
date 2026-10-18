#include <iostream>
using namespace std;
class X{};
#ifdef VA
ostream &operator<< (ostream& o, X x) { o << 1;  return o; }
#elif defined(VB)
void  operator<< (ostream& o, X x) { o << 1; }
#else
ostream *operator<< (ostream& o, X x) { o << 1;  return &o; }
#endif
int main(){ std::cout << X(); }
