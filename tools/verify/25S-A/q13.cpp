#include <iostream>
using namespace std;

template <class T = int, int size = 1>
class A {
public:
    A(T init = 0) { for (int i = 0; i < size; i++) arr[i] = init; };
    friend ostream& operator<<(ostream& os, const A<T, size>& a) {
        for (int i = 0; i < size; i++) os << a.arr[i];
        return os;
    }
private: T arr[size];
};

int main() {
    A<> a0;
    A<char> a1('A');
    A<int, 2> a2(2);
    cout << a0 << " " << a1 << " " << a2 << endl;
    return 0;
}
