#include <iostream>
using namespace std;

struct T {
    T() { cout << "def\n"; }
    T(T& c) { cout << "copy\n"; }
};

int main() {
    T a;
    const T ca;

    T b = a;
    T c = ca;   // line 1
}
