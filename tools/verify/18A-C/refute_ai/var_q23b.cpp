#include <iostream>
class X{}; std::istream& operator>>(std::istream&i,X&){return i;} int main(){X x; std::cin>>x;}
