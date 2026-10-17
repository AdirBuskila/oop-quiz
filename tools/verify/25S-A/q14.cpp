#include <iostream>
using namespace std;

template <typename T>
void h(T) { cout << "by value\n"; }

template <typename T>
void h(T*) { cout << "ptr to T\n"; }

template <typename T>
void h(const T*) { cout << "ptr to const T\n"; }

template <>
void h<const char*>(const char*) { cout << "C-string\n"; }

int main() {
    int x = 10;
    const int cx = 20;
    int* px = &x;
    const int* pcx = &cx;
    const char* s = "abc";

    h(x);
    h(px);
    h(pcx);
    h("abc");
    h(s);
}
