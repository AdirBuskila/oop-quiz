#include <iostream>
#include <vector>
using namespace std;
int& f(int i) {
        static int x = i;
        x++;
        return x;
}

int main() {
        cout << f(5);
        cout << f(5)++;
        f(3) = 4;
        cout << f(3);
        return 0;
}
