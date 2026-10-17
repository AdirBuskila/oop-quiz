#include <iostream>
#include <vector>
using namespace std;
class A {
public:
        A() { x = 2; y = 5; };
        A(int x=3, int y = 6) { this->x = x; this->y = y; }
        int x = 8;
        int y = 10;
};

int main() {
        A a1;
        cout << a1.x << a1.y << endl;
        return 0;
}
