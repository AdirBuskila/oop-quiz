#include <iostream>
using namespace std; template <class T, class U>
class X {
public:
    X(T,U) { cout << 1; }
};
template <>
class X <int,char> {
public:
    X(int i,char c) { cout << 2; }
};
int main()
{
    int i = 5; char c = 'a'; double d = 7.5;
    X<int, char> x1(i,c);
    X<char, int> x2(c,i);
    X<double, char> x3(d,c);
}
