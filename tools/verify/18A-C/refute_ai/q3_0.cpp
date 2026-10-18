#include <iostream>
class X {
public: X(int n) { std::cout << n; }
};
X a(1);
int main() {
    X a(2);
    X b = a;
}
