#include <iostream>
#include <vector>
using namespace std;
template <typename T>
class C {
    template <typename S>
    friend ostream& operator<<(ostream& out, C<S> c1) {
        out << c1.data;
        return out;
    }
private:
    T data;
public:
    C(T d) {
        data = d;
    }
    C(const C& other) {
        data = other.data;
    }
    C operator+(C<T>& other) {
        C res(data + other.data);
        return res;
    }
    bool operator!=(C& other) {
        return data != other.data;
    }
    int f(int x) {
        if (x < 0)
            return x;
        return x + data;
    }
};

int main() {
    C<int> c1(4), c2(5);
    cout << c1;
    c1 = c1 + c2;
    cout << c1;
    return 0;
}
