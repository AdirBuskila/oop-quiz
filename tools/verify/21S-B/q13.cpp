#include <iostream>
#include <vector>
using namespace std;
template <class T, int b>
class Sample {
    T a;
public:
    Sample(T a) {
        this->a = a;
    }
    void print() const {
        cout << a << " " << b << endl;
    }
};
int main(){
    Sample<int, 20> S(10);
    S.print();
    return 0;
}
