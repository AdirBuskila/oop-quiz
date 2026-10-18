#include <iostream>
#include <vector>
using namespace std;
template <class T> T F1(T a, T b) {
        if (a > b)
                return a;
        else
                return b;
}

int main() {
        char   c1 = 'Z', c2 = 'g';
        int    n1 = 18, n2 = 72;
        long   n3 = 5000;
        float  n4 = 25.4, n5 = 6.78;

        cout << F1(c1, c2) << endl;
        cout << F1(n1, n2) << endl;
        cout << F1(c1, n1) << endl;
        cout << F1(n2, n3) << endl;
        cout << F1(n3, n4) << endl;
        cout << F1(n4, n5) << endl;
        return 0;
}
