#include <iostream>
#include <vector>
using namespace std;
class A {
public:
    int x;
    A() {
        x = 6;
        cout << "A's Constructor " << x << endl;
    }
    A(int i) {
        cout << "A's Constructor " << i << endl;
        x = i;
    }
    A(const A& other) {
        cout << "A's copy Constructor " << endl;
    }
    A& operator=(A& other) {
        cout << "A= " << other.x << endl;
        return *this;
    }
    void virtual f(int i = 8) const {
        cout << "A's f " << i << endl;
    }
};
int main(){
    A arr[3];
    arr[0] = arr[1];
    arr[0].f();
}
