#include <iostream>
class A { public: int x; int operator<<(int){return 0;} };
std::ostream& operator<<(std::ostream&o, const A&){return o;}
int main(){ A a; a<<3; std::cout<<a; }
