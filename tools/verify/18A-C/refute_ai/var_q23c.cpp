#include <iostream>
class X{friend std::istream& operator>>(std::istream&i,X&); }; std::istream& operator>>(std::istream&i,X&){return i;} int main(){X x; std::cin>>x;}
