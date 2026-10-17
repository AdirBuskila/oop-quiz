#include <iostream>
using namespace std;
template <class T>
class Array {
    template <class U>
        friend ostream& operator<<(ostream&, const Array<U>&);
    template <class U>
        friend istream& operator>>(istream&, Array<U>&);
public:
    Array(int = 10);
    Array(const Array&);
    virtual ~Array();
    const Array& operator=(const Array&);
    bool operator==(const Array&) const;
    int getSize() const;
    bool operator!=(const Array& right) const;
    T& operator[](int);
    const T& operator[](int) const;
    operator int();
    static int getArrayCount();
private:
    int size;
    T* ptr;
    static int arrayCount;
};
int main() { Array<int>* p = 0; (void)p; return 0; }
