#include <iostream>
int x = 0;
template<typename T> class X {
public:
    X() { std::cout << ++x; }
};
int main() {
    X<int> a;
    X<int> b;
    X<double> c;
}
