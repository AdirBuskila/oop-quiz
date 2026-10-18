#include <iostream>
#include <vector>
using namespace std;
class C {
public:
    C() : id(++count) { cout << id << " "; }
    ~C() { cout << id << " "; }
private:
    int id;
    static int count;
};
int C::count = 0;
C x;
int main() {
    C y;
    static C z;
}
