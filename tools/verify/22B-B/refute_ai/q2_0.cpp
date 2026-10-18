#include <iostream>
#include <vector>
using namespace std;
class B {
public:
        void print(int n) const;
};

void B::print(int n) const {
        cout << n << "\n";
}

class D : public B {
public:
        void print(int n) const;
};

void D::print(int n) const {
        if (n <= 1) B::print(n);
        else if (n % 2 == 0) print(n / 2);
        else print(3 * n + 1);
}

int main() {
        D d;
        d.print(3);
        return 0;
}
