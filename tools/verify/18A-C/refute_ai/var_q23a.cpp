#include <iostream>
class X{public: std::istream& operator>>(std::istream&i){return i;}}; int main(){X x; std::cin>>x;}
