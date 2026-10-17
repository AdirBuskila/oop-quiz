#include <iostream>
#include <vector>
using namespace std;
template<class T, class U> void f(const T& a, const U& b)
{}
int main() {
 int a[2] = { 1,2 };
 int b[3] = { 1,2,3 };
 f(a, b);
 f(&a, &b);
 f(*a, *b);
}
