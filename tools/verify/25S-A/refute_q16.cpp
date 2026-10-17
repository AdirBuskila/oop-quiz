#include <iostream>
using namespace std;

struct Num {
    int v;
    Num(int x = 0) : v(x) {}

    Num& operator++() {
        cout << "pre&\n";
        ++v;
        return *this;
    }

    Num operator++(int){
        cout << "post&\n";
        Num tmp = *this;
        ++v;
        return tmp;
    }
};

int main() {
    Num a(2);
    ++a;
    a++;
    ++Num(3);
    Num(6)++;
    const Num ca(5);
    ++ca;
}
